/// <reference types="node" />
import { Command as CommandNS } from "./AbstractCommand";
import IAMCPCommand = CommandNS.IAMCPCommand;
import { SocketStatusOptions } from "./event/Events";
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
export declare class CasparCGSocket extends NodeJS.EventEmitter implements ICasparCGSocket {
    isRestarting: boolean;
    private _client;
    private _host;
    private _port;
    private _connected;
    private _autoReconnect;
    private _reconnectDelay;
    private _reconnectAttempts;
    private _reconnectAttempt;
    private _reconnectInterval;
    private _commandTimeoutTimer;
    private _commandTimeout;
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
    readonly socketStatus: SocketStatusOptions;
    /**
     *
     */
    readonly reconnecting: boolean;
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
