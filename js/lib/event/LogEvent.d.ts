import { Event as BaseEventNS } from "./BaseEvent";
export declare namespace Event {
    /**
     *
     */
    class LogEvent extends BaseEventNS.BaseEvent {
        logString: string;
        /**
         *
         */
        constructor(logString: string);
        /**
         *
         */
        valueOf(): string;
        static LOG: string;
    }
}
