import { EventEmitter } from 'eventemitter3'
import { AMCPCommand, Commands } from './commands'
import { Connection, ResponseTypes } from './connection'

export interface Options {
	/** Host name of the machine to connect to. Defaults to 127.0.0.1 */
	host?: string
	/** Port number to connect to. Defaults to 5250 */
	port?: number
	/**
	 * If true, the library will not use request id's and instead wait for the command to return before sending the next.
	 * This mode is compatible with older CasparCG-versions (<=2.1), but is slower.
	 * (Defaults to false)
	 */
	useSequential?: boolean
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

// const { error, request } = await ccg.play() // If this throws, its a BAAAAAAAAD error
// if (error) {
// 	// not connected or something
// }
// const response = await request

// const commandsToSend = []

// const errReq: {err, req}[] = await Promise.all(commandsToSend.map(c => CasparCG.executeCommand(c)))

// const responses = await Promise.all(
// 	errReq.filter(({err}) => !!err).map(({ req }) => req)
// )

// export type Request = Promise<Response>
// {
// 	/**
// 	 * The generated request ID
// 	 */
// 	requestId: string
// 	/**
// 	 * Added to the object after the sent promise has resolved, this resolves when CasparCG has executed the request
// 	 */
// 	response: Promise<Response>
// }

interface InternalRequest {
	requestId?: string
	command: AMCPCommand

	resolve: (response: Response) => void
	reject: (error: Error) => void

	processed: boolean
	processedTime?: number
	sentResolve: (sent: SendResult) => void
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
		this._useSequential = options?.useSequential || false

		this._connection = new Connection(this._host, this._port, !(options?.autoConnect === false))

		this._connection.on('connect', () => {
			this.emit('connect')
			this._processQueue().catch((e) => this.emit('error', e))
		})
		this._connection.on('disconnect', () => this.emit('disconnect'))

		this._connection.on('data', (response) => {
			if (this._useSequential) {
				const request = this._requestQueue.shift()

				if (request) {
					request.resolve(response)
				}
			} else {
				const request = this._requestQueue.find((req) => req.requestId === response.reqId)

				if (request) {
					request.resolve(response)
					this._requestQueue = this._requestQueue.filter((req) => req.requestId !== response.reqId)
				}
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

	connect(host?: string, port?: number): void {
		this._host = host ? host : this._host
		this._port = port ? port : this._port
		this._connection.changeConnection(this._host, this._port)
	}

	disconnect(): void {
		this._connection.disconnect()
		this._requestQueue.forEach((r) => {
			if (r.request.response) {
				r.reject(new Error('Disconnected before response was received'))
			} else {
				r.sentResolve({ sentOk: false, error: new Error('Disconnected before response was received') })
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
									this._requestQueue[0].resolve = resolve
									this._requestQueue[0].reject = reject
								})
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
			req.sentResolve({ sentOk: false, error: new Error('Time out') })
		})
		this._requestQueue = this._requestQueue.filter((req) => !deadRequests.includes(req))
	}
}
