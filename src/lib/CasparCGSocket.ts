import * as net from "net";
import * as _ from "highland";
import {EventEmitter} from "hap";
import {IConnectionOptions, ConnectionOptions} from "./AMCPConnectionOptions";
import {AMCPUtil} from "./AMCP";
// Command NS
import {Command as CommandNS} from "./AbstractCommand";
import IAMCPCommand = CommandNS.IAMCPCommand;
import IAMCPResponse = CommandNS.IAMCPResponse;
import AMCPResponse = CommandNS.AMCPResponse;
import IAMCPStatus = CommandNS.IAMCPStatus;
// Event NS
import {CasparCGSocketStatusEvent, CasparCGSocketCommandEvent, CasparCGSocketResponseEvent} from "./event/Events";
// Callback NSIAMCPResponse
import {Callback as CallbackNS} from "./global/Callback";
import IResponseCallback = CallbackNS.IResponseCallback;
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
	socketStatus: SocketState;
	connect(): void;
	disconnect(): void;
	dispose(): void;
	log(args: any): void;
	executeCommand(command: IAMCPCommand): IAMCPCommand;
}

export enum SocketState {
		unconfigured	= 0,
		configured		= 1 << 0,
		hostFound		= 1 << 1,		// @todo: implement
		connectionAttempt = 1 << 2,		// @todo: implement
		connected		= 1 << 3,
		disconnected	= 1	<< 4,
		lostConnection	= 1 << 5,
		reconnecting	= 1 << 6
}

/**
 * 
 */
export class CasparCGSocket extends EventEmitter implements ICasparCGSocket {
	private _client: net.Socket;

	private _host: string;
	private _port: number;
	private _autoReconnect: boolean;
	private _reconnectDelay: number;
	private _reconnectAttempts: number;
	private _reconnectAttempt: number = 0;
	private _reconnectInterval: NodeJS.Timer;
	private _socketStatus: SocketState = SocketState.unconfigured;

	private _parsedResponse: AMCPUtil.CasparCGSocketResponse;

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

		_(this._client)["splitBy"](/(?=\r\n)/).errors((error) => this._onError(error)).each((i) => this._parseResponseGroups(i));	// @todo: ["splitBy] hack due to missing type
		this.socketStatus = SocketState.configured;
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
		this.socketStatus |= SocketState.connectionAttempt;	// toggles triedConnection on
		this.socketStatus &= ~SocketState.lostConnection;	// toggles triedConnection on
		this._client.connect(this._port, this._host);
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
			this.socketStatus |= SocketState.reconnecting;
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

			// new attempt
			this.log("Socket attempting reconnection");
			this._reconnectAttempt++;
			this.connect();
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
		this.socketStatus &= ~SocketState.reconnecting;
		delete this._reconnectInterval;
	}

	/**
	 * 
	 */
	public get host(): string{
		if (this._client) {
			return this._host;
		}
		return null;
	}

	/**
	 * 
	 */
	public get port(): number{
		if (this._client) {
			return this._port;
		}
		return null;
	}

	/**
	 * 
	 */
	public get socketStatus(): SocketState{
		return this._socketStatus;
	}

	/**
	 * 
	 */
	public set socketStatus(statusMask: SocketState){
		if (this._socketStatus !== statusMask) {
			this._socketStatus = statusMask;
			this.fire(CasparCGSocketStatusEvent.STATUS, new CasparCGSocketStatusEvent(this._socketStatus));
		}
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
		this.socketStatus = connected ? this.socketStatus | SocketState.connected : this.socketStatus &= ~SocketState.connected;
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

		this._client.write(`${commandString}\r\n`);
		command.status = IAMCPStatus.Sent;

		console.log(commandString);
		return command;
	}

	/**
	 * @todo:::
	 */
	private _onLookup() {
		this.log("Socket event lookup");
	}

	/**
	 * 
	 */
	private _onConnected() {
		this._clearReconnectInterval();
		this.connected = true;
	}

	/**
	 * 
	 */
	private _parseResponseGroups(i: string): void {
		i = (i.length > 2 && i.slice(0, 2) === "\r\n") ? i.slice(2) : i;
		if (AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 200) {
			this._parsedResponse = new AMCPUtil.CasparCGSocketResponse(i);
			return;
		} else if (this._parsedResponse && this._parsedResponse.statusCode === 200) {
			if (i !== "\r\n") {
				this._parsedResponse.items.push(i);
				return;
			} else {
				this.fire(CasparCGSocketResponseEvent.RESPONSE, new CasparCGSocketResponseEvent(this._parsedResponse));
				this._parsedResponse = null;
				return;
			}
		}
		if (AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 201) {
			this._parsedResponse = new AMCPUtil.CasparCGSocketResponse(i);
			return;
		} else if (this._parsedResponse && this._parsedResponse.statusCode === 201) {
			this._parsedResponse.items.push(i);
			this.fire(CasparCGSocketResponseEvent.RESPONSE, new CasparCGSocketResponseEvent(this._parsedResponse));
			this._parsedResponse = null;
			return;
		} else {
			this.fire(CasparCGSocketResponseEvent.RESPONSE, new CasparCGSocketResponseEvent(new AMCPUtil.CasparCGSocketResponse(i)));
			return;
		}
	}

	/**
	 * @todo:::
	 */
	private _onError(error: Error) {
		// dispatch error!!!!!
		this.log(`Socket event error: ${error.message}`);
	}

	/**
	 * @todo:::
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
		if (hadError) {
			this.socketStatus |= SocketState.lostConnection;
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