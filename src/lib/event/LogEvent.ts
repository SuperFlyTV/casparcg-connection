import {Event as BaseEventNS} from "./BaseEvent";

export namespace Event {
	/**
	 * 
	 */
	export class LogEvent extends BaseEventNS.BaseEvent {

		/**
		 * 
		 */
		constructor(public logString: string) {
			super({logString: logString});
		}

		/**
		 * 
		 */
		valueOf(): string {
			return this.logString;
		}

		static LOG = "logeventlog";
	}
}