import { EventEmitter } from 'events'
import * as net from 'net'
import * as _ from 'highland'
import * as AMCPUtil from './AMCPUtil'
// Command NS
import * as CommandNS from './AbstractCommand'
import IAMCPCommand = CommandNS.IAMCPCommand
import IAMCPStatus = CommandNS.IAMCPStatus
// Event NS
import { CasparCGSocketStatusEvent, CasparCGSocketResponseEvent, SocketStatusOptions } from './event/Events'
// Param NS
import { Payload } from './ParamSignature'
import { QueueMode } from './AMCPConnectionOptions'

/**
 *
 */
export interface ICasparCGSocket {
	host: string
	port: number
	socketStatus: SocketStatusOptions
	connect (): void
	disconnect (): void
	dispose (): void
	log (args: any): void
	executeCommand (command: IAMCPCommand): IAMCPCommand
}

/**
 *
 */
export class CasparCGSocket extends EventEmitter implements ICasparCGSocket {
	public queueMode?: QueueMode
	private _client: net.Socket
	private _host: string
	private _port: number
	private _connected: boolean
	private _autoReconnect: boolean
	private _reconnectDelay: number
	private _lastConnectionAttempt: number
	private _reconnectAttempts: number
	private _reconnectAttempt: number = 0
	private _connectionAttemptTimer: NodeJS.Timer
	private _commandTimeoutTimer: NodeJS.Timer
	private _commandTimeout: number = 5000 // @todo make connectionOption!
	private _parsedResponse: AMCPUtil.CasparCGSocketResponse | undefined
	private _shouldBeConnected: boolean = false

	/**
	 *
	 */
	public constructor (host: string, port: number, autoReconnect: boolean, autoReconnectInterval: number, autoReconnectAttempts: number, queueMode?: QueueMode) {
		super()
		this._host = host
		this._port = port
		this._reconnectDelay = autoReconnectInterval
		this._autoReconnect = autoReconnect
		this._reconnectAttempts = autoReconnectAttempts
		this.queueMode = queueMode
	}

	/**
	 *
	 */
	public set autoReconnect (autoReconnect: boolean) {
		this._autoReconnect = autoReconnect
	}

	/**
	 *
	 */
	public set autoReconnectInterval (autoReconnectInterval: number) {
		this._reconnectDelay = autoReconnectInterval
	}

	/**
	 *
	 */
	public set autoReconnectAttempts (autoReconnectAttempts: number) {
		this._reconnectAttempts = autoReconnectAttempts
	}

	/**
	 *
	 */
	public connect (): void {
		// prevents manipulation of active socket
		if (!this.connected) {
			// throthling attempts
			if (!this._lastConnectionAttempt || (Date.now() - this._lastConnectionAttempt) >= this._reconnectDelay) { // !_lastReconnectionAttempt means first attempt, OR > _reconnectionDelay since last attempt
				// recereates client if new attempt
				if (this._client && this._client.connecting) {
					this._client.destroy()
					this._client.removeAllListeners()
					delete this._client
					// @todo: fire event telling it gives up!
				}

				// (re)creates client, either on first run or new attempt
				if (!this._client) {
					this._client = new net.Socket()
					this._client.on('close', (hadError: boolean) => this._onClose(hadError))
					this._client.on('connect', () => this._onConnected())
					this._client.on('error', (error: Error) => this._onError(error))
				}

				// connects
				this.log('Socket attempting connection')
				this._client.connect(this._port, this._host)
				this._shouldBeConnected = true
				this._lastConnectionAttempt = Date.now()
			}

			// sets timer to retry when needed
			if (!this._connectionAttemptTimer) {
				this._connectionAttemptTimer = global.setInterval(() => this._autoReconnectionAttempt(), this._reconnectDelay)
			}
		}
	}

	/**
	 *
	 */
	public disconnect(): void {
		this.dispose()
	}

	/**
	 *
	 */
	public get host(): string {
		if (this._client) {
			return this._host
		}
		return this._host
	}

	/**
	 *
	 */
	public get port(): number {
		if (this._client) {
			return this._port
		}
		return this._port
	}

	/**
	 *
	 */
	public dispose(): void {
		this._shouldBeConnected = false
		this._clearConnectionAttemptTimer()
		if (this._client) {
			this._client.destroy()
			delete this._client
		}
	}

	/**
	 *
	 */
	public log(args: any): void {
		// fallback, this method will be remapped to CasparCG.log by CasparCG on instantiation of socket oject
		console.log(args)
	}

	/**
	 */
	private set connected(connected: boolean) {
		this._connected = connected === true
		this.emit(CasparCGSocketStatusEvent.STATUS, new CasparCGSocketStatusEvent(this.socketStatus))
	}

	/**
	 *
	 */
	private get connected(): boolean {
		return this._connected
	}

	/**
	 *
	 */
	get socketStatus(): SocketStatusOptions {
		return {
			connected: this._connected
		}
	}

	/**
	 *
	 */
	public executeCommand(command: IAMCPCommand): IAMCPCommand {
		let commandString: string
		if (this.queueMode === QueueMode.SALVO) commandString = `REQ ${command.token} ` + (command.constructor as any)['commandString'] + (command.address ? ' ' + command.address : '')
		else commandString = (command.constructor as any)['commandString'] + (command.address ? ' ' + command.address : '')

		for (let i in command.payload) {
			let payload: Payload = command.payload[i]
			commandString += (commandString.length > 0 ? ' ' : '')
			commandString += (payload.key ? payload.key + ' ' : '') + payload.value
		}

		global.clearTimeout(this._commandTimeoutTimer)
		this._commandTimeoutTimer = global.setTimeout(() => this._onTimeout(), this._commandTimeout)
		this._client.write(`${commandString}\r\n`)
		command.status = IAMCPStatus.Sent
		this.log(commandString)
		return command
	}

	/**
	 *
	 */
	private _autoReconnectionAttempt(): void {
		if (this._autoReconnect) {
			if (this._reconnectAttempts > 0) {								// no reconnection if no valid reconnectionAttemps is set
				if ((this._reconnectAttempt >= this._reconnectAttempts)) {	// if current attempt is not less than max attempts
					// reset reconnection behaviour
					this._clearConnectionAttemptTimer()
					return
				}
				// new attempt if not allready connected
				if (!this.connected) {
					this._reconnectAttempt++
					this.connect()
				}
			}
		}
	}

	/**
	 *
	 */
	private _clearConnectionAttemptTimer(): void {
		// @todo create event telling reconnection ended with result: true/false
		// only if reconnection interval is true
		this._reconnectAttempt = 0
		global.clearInterval(this._connectionAttemptTimer)
		delete this._connectionAttemptTimer
	}

	/**
	 *
	 */
	private _onTimeout() {
		global.clearTimeout(this._commandTimeoutTimer)
		this.emit(CasparCGSocketStatusEvent.TIMEOUT, new CasparCGSocketStatusEvent(this.socketStatus))
	}

	/**
	 *
	 */
	private _onConnected() {
		this._clearConnectionAttemptTimer()
		_(this._client).splitBy(/(?=\r\n)/).errors((error: Error) => this._onError(error)).each((i: string) => this._parseResponseGroups(i))
		this.connected = true
	}

	/**
	 *
	 */
	private _parseResponseGroups(i: string): void {
		global.clearTimeout(this._commandTimeoutTimer)
		i = (i.length > 2 && i.slice(0, 2) === '\r\n') ? i.slice(2) : i
		if (AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 200) {
			this._parsedResponse = new AMCPUtil.CasparCGSocketResponse(i)
			this._commandTimeoutTimer = global.setTimeout(() => this._onTimeout(), this._commandTimeout)
			return
		} else if (this._parsedResponse && this._parsedResponse.statusCode === 200) {
			if (i !== '\r\n') {
				this._parsedResponse.items.push(i)
				this._commandTimeoutTimer = global.setTimeout(() => this._onTimeout(), this._commandTimeout)
				return
			} else {
				this.emit(CasparCGSocketResponseEvent.RESPONSE, new CasparCGSocketResponseEvent(this._parsedResponse))
				this._parsedResponse = undefined
				return
			}
		} else if (AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 201 || AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 400 || AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 101) {
			this._parsedResponse = new AMCPUtil.CasparCGSocketResponse(i)
			this._commandTimeoutTimer = global.setTimeout(() => this._onTimeout(), this._commandTimeout)
			return
		} else if (this._parsedResponse && this._parsedResponse.statusCode === 201 || this._parsedResponse && this._parsedResponse.statusCode === 400 || this._parsedResponse && this._parsedResponse.statusCode === 101) {
			this._parsedResponse.items.push(i)
			this.emit(CasparCGSocketResponseEvent.RESPONSE, new CasparCGSocketResponseEvent(this._parsedResponse))
			this._parsedResponse = undefined
			return
		} else {
			let parsedResponse: AMCPUtil.CasparCGSocketResponse = new AMCPUtil.CasparCGSocketResponse(i)
			if (!isNaN(parsedResponse.statusCode)) {
				this.emit(CasparCGSocketResponseEvent.RESPONSE, new CasparCGSocketResponseEvent(parsedResponse))
				return
			} else {
				this.emit(CasparCGSocketResponseEvent.INVALID_RESPONSE, new CasparCGSocketResponseEvent(parsedResponse))
				return
			}
		}
	}

	/**
	 * @todo:::
	 */
	private _onError(error: Error) {
		// dispatch error!!!!!
		this.log(`Socket event error: ${error.message}`)
	}

	/**
	 *
	 */
	private _onClose(hadError: boolean) {
		this.connected = false
		if (hadError) {
			this.log('Socket closed with error')
		} else {
			this.log('Socket closed without error')
		}
		if (this._shouldBeConnected === true) {
			this.log('Socket should reconnect')
			this.connect()
		}
	}
}
