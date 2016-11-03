// Callback NS
import * as _ from "highland";
import {Callback as CallbackNS} from "./global/Callback";
import IBooleanCallback = CallbackNS.IBooleanCallback;
import IErrorCallback = CallbackNS.IErrorCallback;
import IStringCallback = CallbackNS.IStringCallback;
import ISocketStatusCallback = CallbackNS.ISocketStatusCallback;

/**
 * 
 */
export namespace Options {

	/**
	 * 
	 */
	export enum QueueMode  {
		SALVO 		= 1,
		SEQUENTIAL 	= 2,
		SMART 		= 3
	}
}

/**
 * 
 */
export interface IConnectionOptions {
	host?: string;
	port?: number;
	autoConnect?: boolean;
	autoReconnect?: boolean;
	autoReconnectInterval?: number;
	autoReconnectAttempts?: number;
	queueMode?: Options.QueueMode;
	debug?: boolean;
	onLog?: IStringCallback;
	onConnectionStatus?: ISocketStatusCallback;
	onConnectionChanged?: IBooleanCallback;
	onConnected?: IBooleanCallback;
	onDisconnected?: IBooleanCallback;
	onError?: IErrorCallback;
}

/**
 * 
 */
export class ConnectionOptions implements IConnectionOptions {
	public host: string = "localhost";
	public port: number = 5250;
	public autoConnect: boolean = true;
	public autoReconnect: boolean = true;
	public autoReconnectInterval: number = 1000;
	public autoReconnectAttempts: number = Infinity;
	public queueMode: Options.QueueMode = Options.QueueMode.SEQUENTIAL;	// @todo: change to SALVO once server has command UIDs https://github.com/CasparCG/Server/issues/475
	public debug: boolean = false;
	public onLog: IStringCallback = undefined;
	public onConnectionStatus: ISocketStatusCallback = undefined;
	public onConnectionChanged: IBooleanCallback;
	public onConnected: IBooleanCallback = undefined;
	public onDisconnected: IBooleanCallback = undefined;
	public onError: IErrorCallback = undefined;

	/**
	 * 
	 */
	constructor(options: IConnectionOptions);
	constructor(host?: string, port?: number);
	constructor(hostOrOptions: (IConnectionOptions|string), port?: number) {

		// if object
		if (hostOrOptions && typeof hostOrOptions === "object") {
			if (hostOrOptions.hasOwnProperty("host")) {
				let dnsValidation: Array<string> = /((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?)(?:\:([0-9]{4}))?/.exec(hostOrOptions["host"]);
				if (dnsValidation) {
					delete hostOrOptions["host"];
					// host
					if (!!dnsValidation[1]) {
						this.host = dnsValidation[1];
					}
					// port
					if (!!dnsValidation[2]) {
						this.port = parseInt(dnsValidation[2], 10);
					}
				}
			}

			// assign new values
			// @todo: make sure to filter out only valid params
			_.extend(hostOrOptions, this);
			return;
		}

		// else
		if (typeof hostOrOptions === "string") {
			let dnsValidation: Array<string> = /((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?)(?:\:([0-9]{4}))?/.exec(hostOrOptions.toString());
			if (dnsValidation) {
				// host
				if (!!dnsValidation[1]) {
					this.host = dnsValidation[1];
				}
				// port
				if (!!dnsValidation[2]) {
					this.port = parseInt(dnsValidation[2], 10);
				}
			}
			if (port) {
				this.port = port;
			}
		}
	}
}