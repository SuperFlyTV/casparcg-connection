import { Event as BaseEventNS } from "./BaseEvent";
export var Event;
(function (Event) {
    /**
     *
     */
    class CasparCGSocketCommandEvent extends BaseEventNS.BaseEvent {
        /**
         *
         */
        constructor(command) {
            super({ command });
            this.command = command;
        }
        /**
         *
         */
        valueOf() {
            return this.command;
        }
    }
    CasparCGSocketCommandEvent.RESPONSE = "casparcgsocketcommandeventresponse";
    Event.CasparCGSocketCommandEvent = CasparCGSocketCommandEvent;
    /**
     *
     */
    class CasparCGSocketResponseEvent extends BaseEventNS.BaseEvent {
        /**
         *
         */
        constructor(response) {
            super({ response });
            this.response = response;
        }
        /**
         *
         */
        valueOf() {
            return this.response;
        }
    }
    CasparCGSocketResponseEvent.RESPONSE = "casparcgsocketresponseeventresponse";
    CasparCGSocketResponseEvent.INVALID_RESPONSE = "casparcgsocketcommandeventresponseinvalid";
    Event.CasparCGSocketResponseEvent = CasparCGSocketResponseEvent;
})(Event || (Event = {}));
