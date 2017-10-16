import { Event as BaseEventNS } from './BaseEvent';
export declare namespace Event {
    /**
     *
     */
    class LogEvent extends BaseEventNS.BaseEvent {
        logString: string;
        static readonly LOG: string;
        /**
         *
         */
        constructor(logString: string);
        /**
         *
         */
        valueOf(): string;
    }
}
