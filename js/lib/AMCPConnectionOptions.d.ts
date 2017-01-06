import { Callback as CallbackNS } from "./global/Callback";
import IBooleanCallback = CallbackNS.IBooleanCallback;
import IErrorCallback = CallbackNS.IErrorCallback;
import IStringCallback = CallbackNS.IStringCallback;
import ISocketStatusCallback = CallbackNS.ISocketStatusCallback;
/**
 *
 */
export declare namespace Options {
    /**
     *
     */
    enum QueueMode {
        SEQUENTIAL = 2,
    }
    /**
     *
     */
    enum ServerVersion {
        V2xx = 2000,
        V207 = 2007,
        V21x = 2100,
        V210 = 2110,
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
    autoServerVersion?: boolean;
    serverVersion?: Options.ServerVersion;
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
export declare class ConnectionOptions implements IConnectionOptions {
    host: string | undefined;
    port: number | undefined;
    autoConnect: boolean | undefined;
    autoReconnect: boolean | undefined;
    autoReconnectInterval: number | undefined;
    autoReconnectAttempts: number | undefined;
    autoServerVersion?: boolean;
    serverVersion?: Options.ServerVersion | undefined;
    queueMode: Options.QueueMode | undefined;
    debug: boolean | undefined;
    onLog: IStringCallback | undefined;
    onConnectionStatus: ISocketStatusCallback | undefined;
    onConnectionChanged: IBooleanCallback | undefined;
    onConnected: IBooleanCallback | undefined;
    onDisconnected: IBooleanCallback | undefined;
    onError: IErrorCallback | undefined;
    /**
     *
     */
    constructor(host?: string, port?: number);
    constructor(options?: IConnectionOptions);
}
