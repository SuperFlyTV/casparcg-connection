import { EventEmitter } from "hap";
export interface IOscSocket {
    listening: boolean;
    port: number;
    address: string;
}
export declare class OSCSocket extends EventEmitter implements IOscSocket {
    private _socket;
    private _listening;
    private _port;
    private _address;
    constructor(port: number, address?: string);
    private _onReceivedCallback(msg);
    private _errorHandler(error);
    address: string;
    port: number;
    readonly listening: boolean;
    listen(port?: number, address?: string): void;
    close(): void;
}
