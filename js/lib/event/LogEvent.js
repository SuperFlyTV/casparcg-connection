import { Event as BaseEventNS } from "./BaseEvent";
export var Event;
(function (Event) {
    /**
     *
     */
    class LogEvent extends BaseEventNS.BaseEvent {
        /**
         *
         */
        constructor(logString) {
            super({ logString: logString });
            this.logString = logString;
        }
        /**
         *
         */
        valueOf() {
            return this.logString;
        }
    }
    LogEvent.LOG = "logeventlog";
    Event.LogEvent = LogEvent;
})(Event || (Event = {}));
