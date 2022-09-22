import { EventEmitter } from 'events'
import { AMCPCommand, Commands } from './commands'
import { Connection, ResponseTypes } from './connection'

export interface Options {
	/** Host name of the machine to connect to. Defaults to 127.0.0.1 */
	host?: string
	/** Port number to connect to. Defaults to 5250 */
	port?: number
	useSequential?: boolean
}

export interface Request {
	requestId?: string
	sent: Promise<boolean>
	response?: Promise<Response>
	cancel: () => void
}

interface InternalRequest {
	requestId?: string
	command: AMCPCommand

	resolve: (response: Response) => void
	reject: (error: Error) => void

	sent: boolean
	sentResolve: (sent: boolean) => void
	sentReject: (error: Error) => void
}

export interface Response {
	reqId?: string
	command: Commands
	responseCode: number
	data: any[]

	type: ResponseTypes
	message: string
}

export class BasicCasparCGAPI extends EventEmitter {
	private _connection: Connection
	private _host: string
	private _port: number

	private readonly _useSequential: boolean
	private _requestQueue: Array<InternalRequest> = []

	constructor(options?: Options) {
		super()

		this._host = options?.host || '127.0.0.1'
		this._port = options?.port || 5250
		this._useSequential = options?.useSequential || false

		this._connection = new Connection(this._host, this._port)

		this._connection.on('connect', () => this.emit('connect'))
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

			this._processQueue().catch(() => null)
		})
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

	async executeCommand(command: AMCPCommand): Promise<Request> {
		const reqId = Math.random().toString(35).slice(2, 7)
		const internalRequest: InternalRequest = {
			requestId: reqId,
			command,

			// stubs to be replaced
			resolve: () => null,
			reject: () => null,

			sent: false,
			// stubs to be replaced
			sentResolve: () => null,
			sentReject: () => null,
		}
		const request: Request = {
			requestId: reqId,
			cancel: () => this._requestQueue.findIndex((r) => r.requestId === reqId),

			sent: new Promise<boolean>((resolve, reject) => {
				internalRequest.sentResolve = resolve
				internalRequest.sentReject = reject
			}),
		}

		const p = new Promise<Response>((resolve, reject) => {
			internalRequest.resolve = resolve
			internalRequest.reject = reject
		})
		request.response = p

		this._requestQueue.push(internalRequest)
		this._processQueue().catch(() => null) // nothing to go wrong

		return request
	}

	private async _processQueue(): Promise<void> {
		if (this._requestQueue.length < 1) return

		if (this._useSequential) {
			if (!this._requestQueue[0].sent) {
				const sentOk = this._connection.sendCommand(this._requestQueue[0].command)
				this._requestQueue[0].sent = true
				this._requestQueue[0].sentResolve(sentOk)

				if (!sentOk) {
					const req = this._requestQueue.shift()
					req?.reject(new Error('Error while sending command'))
					this._processQueue().catch(() => null)
				}
			}
		} else {
			this._requestQueue.forEach((r) => {
				if (!r.sent) {
					const sentOk = this._connection.sendCommand(r.command, r.requestId)
					r.sent = true
					r.sentResolve(sentOk)

					if (!sentOk) {
						r.reject(new Error('Error while sending command'))
						this._requestQueue = this._requestQueue.filter((req) => req !== r)
					}
				}
			})
		}
	}
}
