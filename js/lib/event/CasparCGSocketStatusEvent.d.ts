import { Event as BaseEventNS } from './BaseEvent';
export declare namespace Event {
    interface ConnectionStatus {
        connected: boolean;
        virginServer?: boolean;
    }
    /**
     *
     */
    class CasparCGSocketStatusEvent extends BaseEventNS.BaseEvent {
        socketStatus: ConnectionStatus;
        static readonly STATUS: string;
        static readonly STATUS_CHANGED: string;
        static readonly CONNECTED: string;
        static readonly DISCONNECTED: string;
        static readonly TIMEOUT: string;
        /**
         *
         */
        constructor(socketStatus: ConnectionStatus);
        /**
         *
         */
        valueOf(): ConnectionStatus;
    }
}
