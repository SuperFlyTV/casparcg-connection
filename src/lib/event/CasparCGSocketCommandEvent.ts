import {Event as BaseEventNS} from "./BaseEvent";
import {Command as CommandNS} from "../AbstractCommand";
import IAMCPCommand = CommandNS.IAMCPCommand;

export namespace Event {

	/**
	 * 
	 */
	export class CasparCGSocketCommandEvent extends BaseEventNS.BaseEvent {

		/**
		 * 
		 */
		constructor(public command: IAMCPCommand) {
			super({command});
		}

		/**
		 * 
		 */
		valueOf(): IAMCPCommand {
			return this.command;
		}

		static RESPONSE = "casparcgsocketcommandeventresponse";
	}

	/**
	 * 
	 */
	export class CasparCGSocketResponseEvent extends BaseEventNS.BaseEvent {

		/**
		 * 
		 */
		constructor(public response: string) {
			super({response});
		}

		/**
		 * 
		 */
		valueOf(): string {
			return this.response;
		}

		static RESPONSE = "casparcgsocketresponseeventresponse";
	}
}