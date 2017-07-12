import {Event as BaseEventNS} from "./BaseEvent";

export namespace Event {

	export interface SocketStatus {
		connected: boolean;
		triggeredByConnectionLoss?: boolean;
	}

	/**
	 *
	 */
	export class CasparCGSocketStatusEvent extends BaseEventNS.BaseEvent {

		/**
		 *
		 */
		constructor(public socketStatus: SocketStatus) {
			super(socketStatus);
		}

		/**
		 *
		 */
		valueOf(): SocketStatus {
			return this.socketStatus;
		}

		static STATUS = "casparcgsocketconnectioneventstatus";
		static STATUS_CHANGED = "casparcgsocketconnectioneventstatuschanged";
		static CONNECTED = "casparcgsocketconnectioneventstatusconnected";
		static DISCONNECTED = "casparcgsocketconnectioneventstatusdisconnected";
		static TIMEOUT = "casparcgsocketconnectioneventstatustimeout";
	}
}