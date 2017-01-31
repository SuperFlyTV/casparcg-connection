// Callback NS
import {Callback as CallbackNS} from "./global/Callback";
import IBooleanCallback = CallbackNS.IBooleanCallback;
import IErrorCallback = CallbackNS.IErrorCallback;
import IStringCallback = CallbackNS.IStringCallback;
import ISocketStatusCallback = CallbackNS.ISocketStatusCallback;
import IOSCCallback = CallbackNS.IOSCCallback;

/**
 * 
 */
export namespace Options {

	/**
	 * 
	 */
	export enum QueueMode  {
		// SALVO 		= 1,
		SEQUENTIAL 	= 2,
		// SMART 		= 3
	}

	/**
	 * 
	 */
	export enum ServerVersion  {
		V2xx = 2000,
		V207 = 2007,
		V21x = 2100,
		V210 = 2110
	}
}

/**
 * 
 */
export interface IConnectionOptions {
	host?: string;
	port?: number;
	osc?: number;
	autoConnect?: boolean;
	autoReconnect?: boolean;
	autoReconnectInterval?: number;
	autoReconnectAttempts?: number;
	autoServerVersion?: boolean;
	serverVersion?: Options.ServerVersion;
	queueMode?: Options.QueueMode;
	debug?: boolean;
	onStageMessage?: IOSCCallback;
	onMixerMessage?: IOSCCallback;
	onDiagMessage?: IOSCCallback;
	onOutputMessage?: IOSCCallback;
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
	public osc: number | undefined = undefined;
	public onStageMessage: IOSCCallback | undefined = undefined;
	public onDiagMessage: IOSCCallback | undefined = undefined;
	public onMixerMessage: IOSCCallback | undefined = undefined;
	public onOutputMessage: IOSCCallback | undefined = undefined;
	public host: string | undefined = "localhost";
	public port: number | undefined = 5250;
	public autoConnect: boolean | undefined = true;
	public autoReconnect: boolean | undefined = true;
	public autoReconnectInterval: number | undefined = 1000;
	public autoReconnectAttempts: number | undefined = Infinity;
	public autoServerVersion?: boolean = true;
	public serverVersion?: Options.ServerVersion | undefined = Options.ServerVersion.V2xx;
	public queueMode: Options.QueueMode | undefined = Options.QueueMode.SEQUENTIAL;	// @todo: change to SALVO once server has command UIDs https://github.com/CasparCG/Server/issues/475
	public debug: boolean | undefined = false;
	public onLog: IStringCallback | undefined = undefined;
	public onConnectionStatus: ISocketStatusCallback | undefined = undefined;
	public onConnectionChanged: IBooleanCallback | undefined = undefined;
	public onConnected: IBooleanCallback | undefined = undefined;
	public onDisconnected: IBooleanCallback | undefined = undefined;
	public onError: IErrorCallback | undefined = undefined;

	/**
	 * 
	 */
	constructor(host?: string, port?: number);
	constructor(options?: IConnectionOptions);
	constructor(hostOrOptions?: IConnectionOptions|string, port?: number) {
		// if object
		if (hostOrOptions && typeof hostOrOptions === "object") {
			if (hostOrOptions.hasOwnProperty("host") && hostOrOptions.host !== undefined) {
				let host: string = hostOrOptions!.host!;
				let dnsValidation: Array<string> | null = /((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?)(?:\:([0-9]{4}))?/.exec(host);
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

			// @todo: object assign
			for (let key in hostOrOptions) {
				if (!hostOrOptions.hasOwnProperty(key)) {
					continue;
				}
				if (this.hasOwnProperty(key)) {
					this[key] = hostOrOptions[key];
				}
			}
			return;
		}

		// else
		if (typeof hostOrOptions === "string") {
			let dnsValidation: Array<string> | null = /((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?)(?:\:([0-9]{4}))?/.exec(hostOrOptions.toString());
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