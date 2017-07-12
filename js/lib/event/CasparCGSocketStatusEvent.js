import { Event as BaseEventNS } from "./BaseEvent";
export var Event;
(function (Event) {
    /**
     *
     */
    class CasparCGSocketStatusEvent extends BaseEventNS.BaseEvent {
        /**
         *
         */
        constructor(socketStatus) {
            super(socketStatus);
            this.socketStatus = socketStatus;
        }
        /**
         *
         */
        valueOf() {
            return this.socketStatus;
        }
    }
    CasparCGSocketStatusEvent.STATUS = "casparcgsocketconnectioneventstatus";
    CasparCGSocketStatusEvent.STATUS_CHANGED = "casparcgsocketconnectioneventstatuschanged";
    CasparCGSocketStatusEvent.CONNECTED = "casparcgsocketconnectioneventstatusconnected";
    CasparCGSocketStatusEvent.RECONNECTED = "casparcgsocketconnectioneventstatusreconnected";
    CasparCGSocketStatusEvent.DISCONNECTED = "casparcgsocketconnectioneventstatusdisconnected";
    CasparCGSocketStatusEvent.TIMEOUT = "casparcgsocketconnectioneventstatustimeout";
    Event.CasparCGSocketStatusEvent = CasparCGSocketStatusEvent;
})(Event || (Event = {}));
