import { EventEmitter } from "hap";
import { Command as CommandNS } from "./AbstractCommand";
import IAMCPCommand = CommandNS.IAMCPCommand;
/**
 *
 */
export interface ICasparCGSocket {
    connected: boolean;
    host: string;
    port: number;
    socketStatus: SocketState;
    isRestarting: boolean;
    connect(): void;
    disconnect(): void;
    dispose(): void;
    log(args: any): void;
    executeCommand(command: IAMCPCommand): IAMCPCommand;
}
export declare enum SocketState {
    unconfigured = 0,
    configured = 1,
    hostFound = 2,
    connectionAttempt = 4,
    connected = 8,
    lostConnection = 32,
    reconnecting = 64,
}
/**
 *
 */
export declare class CasparCGSocket extends EventEmitter implements ICasparCGSocket {
    isRestarting: boolean;
    private _client;
    private _host;
    private _port;
    private _autoReconnect;
    private _reconnectDelay;
    private _reconnectAttempts;
    private _reconnectAttempt;
    private _reconnectInterval;
    private _commandTimeoutTimer;
    private _commandTimeout;
    private _socketStatus;
    private _parsedResponse;
    /**
     *
     */
    constructor(host: string, port: number, autoReconnect: boolean, autoReconnectInterval: number, autoReconnectAttempts: number);
    /**
     *
     */
    autoReconnect: boolean;
    /**
     *
     */
    autoReconnectInterval: number;
    /**
     *
     */
    autoReconnectAttempts: number;
    /**
     *
     */
    connect(): void;
    /**
     *
     */
    disconnect(): void;
    /**
     *
     */
    private _startReconnection();
    /**
     *
     */
    private _autoReconnection();
    /**
     *
     */
    private _clearReconnectInterval();
    /**
     *
     */
    readonly host: string;
    /**
     *
     */
    readonly port: number;
    /**
     *
     */
    /**
     *
     */
    socketStatus: SocketState;
    /**
     *
     */
    dispose(): void;
    /**
     *
     */
    log(args: any): void;
    /**
     */
    connected: boolean;
    /**
     *
     */
    executeCommand(command: IAMCPCommand): IAMCPCommand;
    /**
     *
     */
    private _onTimeout();
    /**
     * @todo:::
     */
    private _onLookup();
    /**
     *
     */
    private _onConnected();
    /**
     *
     */
    private _parseResponseGroups(i);
    /**
     * @todo:::
     */
    private _onError(error);
    /**
     * @todo:::
     */
    private _onDrain();
    /**
     *
     */
    private _onClose(hadError);
}
