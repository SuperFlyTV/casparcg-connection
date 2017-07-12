import {EventEmitter} from "events";
import * as net from "net";
import * as _ from "highland";
import {AMCP, AMCPUtil} from "./AMCP";
// Command NS
import {Command as CommandNS} from "./AbstractCommand";
import IAMCPCommand = CommandNS.IAMCPCommand;
import IAMCPStatus = CommandNS.IAMCPStatus;
// Event NS
import {CasparCGSocketStatusEvent, CasparCGSocketResponseEvent, SocketStatusOptions} from "./event/Events";
// Param NS
import {Param as ParamNS} from "./ParamSignature";
import Payload = ParamNS.Payload;

/**
 *
 */
export interface ICasparCGSocket {
	connected: boolean;
	host: string;
	port: number;
	isRestarting: boolean;
	reconnecting: boolean;
	socketStatus: SocketStatusOptions;
	connect(): void;
	disconnect(): void;
	dispose(): void;
	log(args: any): void;
	executeCommand(command: IAMCPCommand): IAMCPCommand;
}

/**
 *
 */
export class CasparCGSocket extends EventEmitter implements ICasparCGSocket {
	public isRestarting: boolean = false;
	private _client: net.Socket;
	private _host: string;
	private _port: number;
	private _connected: boolean;
	private _autoReconnect: boolean;
	private _reconnectDelay: number;
	private _reconnectAttempts: number;
	private _reconnectAttempt: number = 0;
	private _reconnectInterval: NodeJS.Timer;
	private _commandTimeoutTimer: NodeJS.Timer;
	private _commandTimeout: number = 5000; // @todo make connectionOption!
	private _parsedResponse: AMCPUtil.CasparCGSocketResponse | undefined;

	/**
	 *
	 */
	public constructor(host: string, port: number, autoReconnect: boolean, autoReconnectInterval: number, autoReconnectAttempts: number) {
		super();
		this._host = host;
		this._port = port;
		this._reconnectDelay = autoReconnectInterval;
		this._autoReconnect = autoReconnect;
		this._reconnectAttempts = autoReconnectAttempts;
		this._client = new net.Socket();
		this._client.on("lookup", () => this._onLookup());
		this._client.on("connect", () => this._onConnected());
		this._client.on("error", (error: Error) => this._onError(error));
		this._client.on("drain", () => this._onDrain());
		this._client.on("close", (hadError: boolean) => this._onClose(hadError));
	}

	/**
	 *
	 */
	public set autoReconnect(autoReconnect: boolean) {
		this._autoReconnect = autoReconnect;
	}

	/**
	 *
	 */
	public set autoReconnectInterval(autoReconnectInterval: number) {
		this._reconnectDelay = autoReconnectInterval;
	}

	/**
	 *
	 */
	public set autoReconnectAttempts(autoReconnectAttempts: number) {
		this._reconnectAttempts = autoReconnectAttempts;
	}

	/**
	 *
	 */
	public connect(): void {
		this._client.connect(this._port, this._host);
		if (this._reconnectAttempt === 0) {
			this._reconnectInterval = global.setInterval(() => this._autoReconnection(), this._reconnectDelay);
		}
	}

	/**
	 *
	 */
	public disconnect(): void {
		if (this._client !== undefined) {
			this.dispose();
		}
	}

	/**
	 *
	 */
	private _startReconnection(): void {
		// create interval if doesn't exist
		if (!this._reconnectInterval) {
			// @todo: create event telling reconection is in action with interval time
			this._reconnectInterval = global.setInterval(() => this._autoReconnection(), this._reconnectDelay);
		}
	}

	/**
	 *
	 */
	private _autoReconnection(): void {
		if (this._autoReconnect) {
			if (this._reconnectAttempts > 0) {								// no reconnection if no valid reconnectionAttemps is set
				if ((this._reconnectAttempt >= this._reconnectAttempts)) {	// if current attempt is not less than max attempts
					// reset reconnection behaviour
					this._clearReconnectInterval();
					return;
				}
				// new attempt if not allready connected
				if (!this.connected) {
					this.log("Socket attempting reconnection");
					this._reconnectAttempt++;
					this.connect();
				}
			}
		}
	}

	/**
	 *
	 */
	private _clearReconnectInterval(): void {
		// @todo create event telling reconnection ended with result: true/false
		// only in reconnectio intervall is true
		this._reconnectAttempt = 0;
		global.clearInterval(this._reconnectInterval);
		delete this._reconnectInterval;
	}

	/**
	 *
	 */
	public get host(): string{
		if (this._client) {
			return this._host;
		}
		return this._host;
	}

	/**
	 *
	 */
	public get port(): number{
		if (this._client) {
			return this._port;
		}
		return this._port;
	}

	/**
	 *
	 */
	public dispose(): void {
		this._clearReconnectInterval();
		this._client.destroy();
	}

	/**
	 *
	 */
	public log(args: any): void {
		// fallback, this method will be remapped to CasparCG.log by CasparCG on instantiation of socket oject
		console.log(args);
	}

	/**
	 */
	set connected(connected: boolean){
		this._connected = connected === true;
		this.emit(CasparCGSocketStatusEvent.STATUS, new CasparCGSocketStatusEvent(this.socketStatus));
	}

	/**
	 *
	 */
	get socketStatus(): SocketStatusOptions {
		return {
			connected: this._connected,
		};
	}

	/**
	 *
	 */
	public get reconnecting(): boolean {
		return this._reconnectInterval !== undefined;
	}

	/**
	 *
	 */
	public executeCommand(command: IAMCPCommand): IAMCPCommand {
		let commandString: string = command.constructor["commandString"] + (command.address ? " " + command.address : "");
		for (let i in command.payload) {
			let payload: Payload = command.payload[i];
			commandString += (commandString.length > 0 ? " " : "");
			commandString += (payload.key ? payload.key + " " : "") + payload.value;
		}

		if (command instanceof AMCP.RestartCommand) {
			this.isRestarting = true;
		}
		this._commandTimeoutTimer = global.setTimeout(() => this._onTimeout(), this._commandTimeout);
		this._client.write(`${commandString}\r\n`);
		command.status = IAMCPStatus.Sent;
		this.log(commandString);
		return command;
	}

	/**
	 *
	 */
	private _onTimeout() {
		global.clearTimeout(this._commandTimeoutTimer);
		this.emit(CasparCGSocketStatusEvent.TIMEOUT, new CasparCGSocketStatusEvent(this.socketStatus));
	}

	/**
	 *@todo:::
	 */
	private _onLookup() {
		this.log("Socket event lookup");
	}

	/**
	 *
	 */
	private _onConnected() {
		this.isRestarting = false;
		this._clearReconnectInterval();
		_(this._client).splitBy(/(?=\r\n)/).errors((error: Error) => this._onError(error)).each((i: string) => this._parseResponseGroups(i));
		this.connected = true;
	}

	/**
	 *
	 */
	private _parseResponseGroups(i: string): void {
		global.clearTimeout(this._commandTimeoutTimer);
		i = (i.length > 2 && i.slice(0, 2) === "\r\n") ? i.slice(2) : i;
		if (AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 200) {
			this._parsedResponse = new AMCPUtil.CasparCGSocketResponse(i);
			return;
		} else if (this._parsedResponse && this._parsedResponse.statusCode === 200) {
			if (i !== "\r\n") {
				this._parsedResponse.items.push(i);
				return;
			} else {
				this.emit(CasparCGSocketResponseEvent.RESPONSE, new CasparCGSocketResponseEvent(this._parsedResponse));
				this._parsedResponse = undefined;
				return;
			}
		}
		if (AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 201 || AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 400 || AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 101) {
			this._parsedResponse = new AMCPUtil.CasparCGSocketResponse(i);
			return;
		} else if (this._parsedResponse && this._parsedResponse.statusCode === 201 || this._parsedResponse && this._parsedResponse.statusCode === 400 || this._parsedResponse && this._parsedResponse.statusCode === 101) {
			this._parsedResponse.items.push(i);
			this.emit(CasparCGSocketResponseEvent.RESPONSE, new CasparCGSocketResponseEvent(this._parsedResponse));
			this._parsedResponse = undefined;
			return;
		} else {
			let parsedResponse: AMCPUtil.CasparCGSocketResponse = new AMCPUtil.CasparCGSocketResponse(i);
			if (!isNaN(parsedResponse.statusCode)) {
				this.emit(CasparCGSocketResponseEvent.RESPONSE, new CasparCGSocketResponseEvent(parsedResponse));
			}else {
				this.emit(CasparCGSocketResponseEvent.INVALID_RESPONSE, new CasparCGSocketResponseEvent(parsedResponse));
			}
			return;
		}
	}

	/**
	 *@todo:::
	 */
	private _onError(error: Error) {
		// dispatch error!!!!!
		this.log(`Socket event error: ${error.message}`);
	}

	/**
	 *@todo:::
	 */
	private _onDrain() {
		// @todo: implement
		this.log("Socket event drain");
	}

	/**
	 *
	 */
	private _onClose(hadError: boolean) {
		this.connected = false;
		if (hadError || this.isRestarting) {
			// error message, not "log"
			// dispatch (is it done through error handler first????)
			this.log(`Socket close with error: ${hadError}`);
			if (this._autoReconnect) {
				this._startReconnection();
			}
		}else {
			this._clearReconnectInterval();
		}
	}
}