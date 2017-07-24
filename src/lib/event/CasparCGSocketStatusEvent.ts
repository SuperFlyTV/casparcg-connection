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

		static readonly STATUS = "casparcgsocketconnectioneventstatus";
		static readonly STATUS_CHANGED = "casparcgsocketconnectioneventstatuschanged";
		static readonly CONNECTED = "casparcgsocketconnectioneventstatusconnected";
		static readonly DISCONNECTED = "casparcgsocketconnectioneventstatusdisconnected";
		static readonly TIMEOUT = "casparcgsocketconnectioneventstatustimeout";
	}
}