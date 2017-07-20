import { Event as BaseEventNS } from "./BaseEvent";
export declare namespace Event {
    interface SocketStatus {
        connected: boolean;
        triggeredByConnectionLoss?: boolean;
    }
    /**
     *
     */
    class CasparCGSocketStatusEvent extends BaseEventNS.BaseEvent {
        socketStatus: SocketStatus;
        /**
         *
         */
        constructor(socketStatus: SocketStatus);
        /**
         *
         */
        valueOf(): SocketStatus;
        static STATUS: string;
        static STATUS_CHANGED: string;
        static CONNECTED: string;
        static DISCONNECTED: string;
        static TIMEOUT: string;
    }
}
