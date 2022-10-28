import { EventEmitter } from 'eventemitter3'
import { AMCPCommand, Commands } from './commands'
import { Connection, ResponseTypes } from './connection'
import { Version } from './enums'

export interface Options {
	/** Host name of the machine to connect to. Defaults to 127.0.0.1 */
	host?: string
	/** Port number to connect to. Defaults to 5250 */
	port?: number
	/** Minimum amount of time before a request is considered to be timed out */
	timeoutTime?: number
	/** Immediately connects after instantiating the class, defaults to false */
	autoConnect?: boolean
}

export type SendResult =
	| {
			error: Error
			request: undefined
	  }
	| {
			error: undefined
			request: Promise<Response>
	  }

interface InternalRequest {
	requestId?: string
	command: AMCPCommand

	resolve: (response: Response) => void
	reject: (error: Error) => void

	processed: boolean
	processedTime?: number
	sentResolve: (sent: SendResult) => void
	sentTime?: number
}

export interface Response {
	reqId?: string
	command: Commands
	responseCode: number
	data: any[]

	type: ResponseTypes
	message: string
}

export type ConnectionEvents = {
	connect: []
	disconnect: []
	error: [error: Error]
}

export class BasicCasparCGAPI extends EventEmitter<ConnectionEvents> {
	private _connection: Connection
	private _host: string
	private _port: number

	private _requestQueue: Array<InternalRequest> = []
	private _timeoutTimer: NodeJS.Timer
	private _timeoutTime: number

	constructor(options?: Options) {
		super()

		this._host = options?.host || '127.0.0.1'
		this._port = options?.port || 5250

		this._connection = new Connection(this._host, this._port, !(options?.autoConnect === false))

		this._connection.on('connect', () => {
			this.emit('connect')
			this.executeCommand({ command: Commands.Version, params: {} })
				.then(async ({ request, error }) => {
					if (error) {
						throw error
					}
					const result = await request
					const version = await result.data[0]

					this._connection.version = version.version as Version
				})
				.catch((e) => this.emit('error', e))
			this._processQueue().catch((e) => this.emit('error', e))
		})
		this._connection.on('disconnect', () => this.emit('disconnect'))

		this._connection.on('data', (response) => {
			const request = this._requestQueue.find((req) => req.requestId === response.reqId)

			if (request) {
				request.resolve(response)
				this._requestQueue = this._requestQueue.filter((req) => req.requestId !== response.reqId)
			}

			this._processQueue().catch((e) => this.emit('error', e))
		})

		this._timeoutTime = options?.timeoutTime || 5000
		this._timeoutTimer = setInterval(() => this._checkTimeouts(), this._timeoutTime)
	}

	get host(): string {
		return this._host
	}

	set host(host: string) {
		this._host = host
		this._connection.changeConnection(this._host, this._port)
	}

	get port(): number {
		return this._port
	}

	set port(port: number) {
		this._port = port
		this._connection.changeConnection(this._host, this._port)
	}

	get connected(): boolean {
		return this._connection.connected
	}

	connect(host?: string, port?: number): void {
		this._host = host ? host : this._host
		this._port = port ? port : this._port
		this._connection.changeConnection(this._host, this._port)
	}

	disconnect(): void {
		this._connection.disconnect()
		this._requestQueue.forEach((r) => {
			if (r.processed) {
				r.reject(new Error('Disconnected before response was received'))
			} else {
				r.sentResolve({ request: undefined, error: new Error('Disconnected before response was received') })
			}
		})
	}

	/** Stops internal timers so that the class is ready for garbage disposal */
	discard(): void {
		this._connection.disconnect()
		clearInterval(this._timeoutTimer)
	}

	/**
	 * Sends a command to CasparCG
	 * @return { error: Error } if there was an error when sending the command (such as being disconnected)
	 * @return { request: Promise<Response> } a Promise that resolves when CasparCG replies after a command has been sent.
	 * If this throws, there's something seriously wrong :)
	 */
	async executeCommand(command: AMCPCommand): Promise<SendResult> {
		const reqId = Math.random().toString(35).slice(2, 7)

		let outerResolve: InternalRequest['sentResolve'] = () => null
		const s = new Promise<SendResult>((resolve) => {
			outerResolve = resolve
		})

		const internalRequest: InternalRequest = {
			requestId: reqId,
			command,

			// stubs to be replaced
			resolve: () => null,
			reject: () => null,

			processed: false,
			sentResolve: outerResolve,
		}

		this._requestQueue.push(internalRequest)
		this._processQueue().catch((e) => this.emit('error', e))

		return s
	}

	private async _processQueue(): Promise<void> {
		if (this._requestQueue.length < 1) return

		this._requestQueue.forEach((r) => {
			if (!r.processed) {
				this._connection
					.sendCommand(r.command, r.requestId)
					.then(
						(sentOk) => {
							if (!sentOk) {
								this._requestQueue = this._requestQueue.filter((req) => req !== r)
								r.sentResolve({ error: new Error('Error while sending command'), request: undefined })
							} else {
								const request = new Promise<Response>((resolve, reject) => {
									r.resolve = resolve
									r.reject = reject
								})
								r.sentTime = Date.now()
								r.sentResolve({ error: undefined, request })
							}
						},
						(e: string) => {
							r.sentResolve({ error: Error(e), request: undefined })
							r.reject(new Error(e))
							this._requestQueue = this._requestQueue.filter((req) => req !== r)
						}
					)
					.catch((e) => this.emit('error', e))

				r.processed = true
				r.processedTime = Date.now()
			}
		})
	}

	private _checkTimeouts() {
		const deadRequests = this._requestQueue.filter(
			(req) => req.processed && req.processedTime && req.processedTime < Date.now() - this._timeoutTime
		)
		deadRequests.forEach((req) => {
			req.reject(new Error('Time out'))
			req.sentResolve({ request: undefined, error: new Error('Time out') })
		})
		this._requestQueue = this._requestQueue.filter((req) => !deadRequests.includes(req))
	}
}
