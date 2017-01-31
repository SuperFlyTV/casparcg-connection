import { Event as BaseEventNS } from "./BaseEvent";
import { SocketState } from "../CasparCGSocket";
export declare namespace Event {
    /**
     *
     */
    class CasparCGSocketStatusEvent extends BaseEventNS.BaseEvent {
        socketStatus: SocketState;
        /**
         *
         */
        constructor(socketStatus: SocketState);
        /**
         *
         */
        valueOf(): SocketState;
        static STATUS: string;
        static STATUS_CHANGED: string;
        static CONNECTED: string;
        static DISCONNECTED: string;
        static TIMEOUT: string;
    }
}
