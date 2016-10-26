import {Event as BaseEventNS} from "./BaseEvent";
import {SocketState} from "../CasparCGSocket";

export namespace Event {

	/**
	 * 
	 */
	export class CasparCGSocketStatusEvent extends BaseEventNS.BaseEvent {

		/**
		 * 
		 */
		constructor(public socketStatus: SocketState) {
			super({socketStatus});
		}

		/**
		 * 
		 */
		valueOf(): SocketState {
			return this.socketStatus;
		}

		static STATUS = "casparcgsocketconnectioneventstatus";
		static STATUS_CHANGED = "casparcgsocketconnectioneventstatuschanged";
		static CONNECTED = "casparcgsocketconnectioneventstatusconnected";
		static DISCONNECTED = "casparcgsocketconnectioneventstatusdisconnected";
		static TIMEOUT = "casparcgsocketconnectioneventstatustimeout";
	}
}