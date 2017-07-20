/// <reference types="node" />
import { EventEmitter } from "events";
import { Command as CommandNS } from "./AbstractCommand";
import IAMCPCommand = CommandNS.IAMCPCommand;
import { SocketStatusOptions } from "./event/Events";
/**
 *
 */
export interface ICasparCGSocket {
    host: string;
    port: number;
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
export declare class CasparCGSocket extends EventEmitter implements ICasparCGSocket {
    private _client;
    private _host;
    private _port;
    private _connected;
    private _autoReconnect;
    private _reconnectDelay;
    private _lastConnectionAttempt;
    private _reconnectAttempts;
    private _reconnectAttempt;
    private _connectionAttemptTimer;
    private _commandTimeoutTimer;
    private _commandTimeout;
    private _parsedResponse;
    private _shouldBeConnected;
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
    private _autoReconnectionAttempt();
    /**
     *
     */
    private _clearConnectionAttemptTimer();
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
     *
     */
    /**
     */
    private connected;
    /**
     *
     */
    readonly socketStatus: SocketStatusOptions;
    /**
     *
     */
    executeCommand(command: IAMCPCommand): IAMCPCommand;
    /**
     *
     */
    private _onTimeout();
    /**
     *
     */
    private _onConnected();
    /**
     *
     */
    private _parseResponseGroups(i);
    /**
     *@todo:::
     */
    private _onError(error);
    /**
     *
     */
    private _onClose(hadError);
}
