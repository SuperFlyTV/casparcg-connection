import * as osc from "osc-min";
import * as udp from "dgram";

import {EventEmitter} from "hap";
import {IConnectionOptions, ConnectionOptions} from "./AMCPConnectionOptions";
import {OSCSocketEvent} from "./event/Events";

/**
 * 
 */
export interface IOscSocket {
	port: number;
	address: string;
}

/**
 * 
 */
export class OSCSocket extends EventEmitter implements IOscSocket {
	private _listening = false;
	private _port = 6250;
	private _address = "0.0.0.0";
	private _socket: udp.Socket;

	/**
	 * 
	 */
	public constructor(port: number, address?: string) {
		super();
		this._port = port;
		if (address) this._address = address;

		this._createSocket();
	}

	/**
	 * 
	 */
	private _createSocket(): void {
		if (this._socket) {
			this.close();
		}
		this._socket = udp.createSocket("udp4", (msg, rinfo) => this._onReceivedCallback(msg, rinfo));
		this._socket.on("error", (error) => this._errorHandler(error));
		this._listening = true;
		try {
			this._socket.bind(this._port, this._address);
		} catch (e) {
			this._errorHandler(e);
		}
	}

	/**
	 * 
	 */
	private _onReceivedCallback(msg, rinfo): void {
		let bundle: any = osc.fromBuffer(msg);

		for (let element of bundle.elements) {
			let adress = element.address.split("/");
			if (adress[3] === "stage") {
				this.fire(OSCSocketEvent.newStageMessage, new OSCSocketEvent(element.address, element.args));
			} else if (adress[3] === "mixer") {
				this.fire(OSCSocketEvent.newMixerMessage, new OSCSocketEvent(element.address, element.args));
			} else if (adress[1] === "diag") {
				this.fire(OSCSocketEvent.newDiagMessage, new OSCSocketEvent(element.address, element.args));
			} else {
				this.fire(OSCSocketEvent.newOutputMessage, new OSCSocketEvent(element.address, element.args));
			}
		}
	}

	/**
	 * 
	 */
	private _errorHandler(error): void {
		console.log("FOO", error);
	}

	/**
	 * 
	 */
	public set address(address: string) {
		if (address && this._address !== address) {
			this._address = address;
			// recreates socket if address changes after creation
			if	(this._socket) {
				this._createSocket();
			}
		}
	}

	/**
	 * 
	 */
	public get address() {
		return this._address;
	}

	/**
	 * 
	 */
	public set port(port: number) {
		if (port && this._port !== port) {
			this._port = port;
			if (this._socket) {
				this._createSocket();
			}
		}
	}

	/**
	 * 
	 */
	public get port() {
		return this._port;
	}

	/**
	 * 
	 */
	public listen()
	public listen(port?: number, address?: string) {
		if (port && address) {
			this.close();
		}

		this.port = port;
		this.address = address;

		if (!this._listening) {
			this._socket.bind(this._port, this._address);
		}
	}

	/**
	 * 
	 */
	public close() {
		if (this._socket) {
			this._socket.close();
			delete this._socket;
			this._listening = false;
		}
	}
}