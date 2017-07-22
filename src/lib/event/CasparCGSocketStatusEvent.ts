import {Event as BaseEventNS} from "./BaseEvent";

export namespace Event {

	export interface ConnectionStatus {
		connected: boolean;
		virginServer?: boolean;
	}

	/**
	 *
	 */
	export class CasparCGSocketStatusEvent extends BaseEventNS.BaseEvent {

		/**
		 *
		 */
		constructor(public socketStatus: ConnectionStatus) {
			super(socketStatus);
		}

		/**
		 *
		 */
		valueOf(): ConnectionStatus {
			return this.socketStatus;
		}

		static STATUS = "casparcgsocketconnectioneventstatus";
		static STATUS_CHANGED = "casparcgsocketconnectioneventstatuschanged";
		static CONNECTED = "casparcgsocketconnectioneventstatusconnected";
		static DISCONNECTED = "casparcgsocketconnectioneventstatusdisconnected";
		static TIMEOUT = "casparcgsocketconnectioneventstatustimeout";
	}
}