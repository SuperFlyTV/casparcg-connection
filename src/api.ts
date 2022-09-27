import { EventEmitter } from 'eventemitter3'
import { AMCPCommand, Commands } from './commands'
import { Connection, ResponseTypes } from './connection'

export interface Options {
	/** Host name of the machine to connect to. Defaults to 127.0.0.1 */
	host?: string
	/** Port number to connect to. Defaults to 5250 */
	port?: number
	/** If true, the library will not use request id's and instead wait for the command to return before sending the next */
	useSequential?: boolean
	/** Minimum amount of time before a request is considered to be timed out */
	timeoutTime?: number
}

export interface SendResult {
	sentOk: boolean
	error?: Error
}

export interface Request {
	/**
	 * The generated request ID
	 */
	requestId?: string
	/**
	 * Resolves when the request is sent to CasparCG, result is true if it was sent successfully
	 */
	sent: Promise<SendResult>
	/**
	 * Added to the object after the sent promise has resolved, this resolves when CasparCG has executed the request
	 */
	response?: Promise<Response>
	/**
	 * Removes the request from the request queue
	 */
	cancel: () => void
}

interface InternalRequest {
	requestId?: string
	command: AMCPCommand
	request: Request

	resolve: (response: Response) => void
	reject: (error: Error) => void

	processed: boolean
	processedTime?: number
	sentResolve: (sent: SendResult) => void
	// sentReject: (error: Error) => void
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

	private readonly _useSequential: boolean
	private _requestQueue: Array<InternalRequest> = []
	private _timeoutTimer: NodeJS.Timer
	private _timeoutTime: number

	constructor(options?: Options) {
		super()

		this._host = options?.host || '127.0.0.1'
		this._port = options?.port || 5250
		this._useSequential = options?.useSequential || false

		this._connection = new Connection(this._host, this._port)

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

			this._processQueue().catch(() => null)
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

	/** Stops internal timers so that the class is ready for garbage disposal */
	discard(): void {
		clearInterval(this._timeoutTimer)
	}

	executeCommand(command: AMCPCommand): Request {
		const reqId = Math.random().toString(35).slice(2, 7)

		let outerResolve: InternalRequest['sentResolve'] = () => null
		// outerReject: InternalRequest['sentReject'] = () => null
		const s = new Promise<SendResult>((resolve) => {
			outerResolve = resolve
			// outerReject = reject
		})

		const internalRequest: InternalRequest = {
			requestId: reqId,
			command,

			// stubs to be replaced
			resolve: () => null,
			reject: () => null,

			processed: false,
			sentResolve: outerResolve,
			// sentReject: outerReject,

			request: {
				requestId: reqId,
				cancel: () =>
					this._requestQueue.splice(
						this._requestQueue.findIndex((r) => r.requestId === reqId),
						1
					),

				sent: s,
			},
		}

		this._requestQueue.push(internalRequest)
		this._processQueue().catch((e) => this.emit('error', e))

		return internalRequest.request
	}

	private async _processQueue(): Promise<void> {
		if (this._requestQueue.length < 1) return

		if (this._useSequential) {
			if (!this._requestQueue[0].processed) {
				this._requestQueue[0].processedTime = Date.now()
				this._requestQueue[0].processed = true

				const sentOk = await this._connection.sendCommand(this._requestQueue[0].command)

				if (!sentOk) {
					const req = this._requestQueue.shift()
					req?.reject(new Error('Error while sending command')) // todo - this promise doesn't exist yet?
					this._processQueue().catch((e) => this.emit('error', e))
				} else {
					this._requestQueue[0].request.response = new Promise<Response>((resolve, reject) => {
						this._requestQueue[0].resolve = resolve
						this._requestQueue[0].reject = reject
					})
				}

				this._requestQueue[0].sentResolve({ sentOk })
			}
		} else {
			this._requestQueue.forEach((r) => {
				if (!r.processed) {
					this._connection
						.sendCommand(r.command, r.requestId)
						.then(
							(sentOk) => {
								if (!sentOk) {
									r.reject(new Error('Error while sending command')) // todo - promise doesnt exist yet?
									this._requestQueue = this._requestQueue.filter((req) => req !== r)
								} else {
									this._requestQueue[0].request.response = new Promise<Response>(
										(resolve, reject) => {
											this._requestQueue[0].resolve = resolve
											this._requestQueue[0].reject = reject
										}
									)
								}
								r.sentResolve({ sentOk })
							},
							(e) => {
								r.sentResolve({ sentOk: false })
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
