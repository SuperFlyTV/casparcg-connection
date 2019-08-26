import { Event as BaseEventNS } from './BaseEvent'
import { IAMCPCommand, CommandOptions } from '../AMCPCommand'
import { CasparCGSocketResponse } from '../AMCP'
import { Command } from '../ServerStateEnum'

export namespace Event {

	/**
	 *
	 */
	export class CasparCGSocketCommandEvent extends BaseEventNS.BaseEvent {

		static readonly RESPONSE = 'casparcgsocketcommandeventresponse'

		/**
		 *
		 */
		constructor(public command: IAMCPCommand<Command, CommandOptions, CommandOptions>) {
			super({ command })
		}

		/**
		 *
		 */
		valueOf(): IAMCPCommand<Command, CommandOptions, CommandOptions> {
			return this.command
		}
	}

	/**
	 *
	 */
	export class CasparCGSocketResponseEvent extends BaseEventNS.BaseEvent {

		static readonly RESPONSE = 'casparcgsocketresponseeventresponse'
		static readonly INVALID_RESPONSE = 'casparcgsocketcommandeventresponseinvalid'

		/**
		 *
		 */
		constructor(public response: CasparCGSocketResponse) {
			super({ response })
		}

		/**
		 *
		 */
		valueOf(): CasparCGSocketResponse {
			return this.response
		}

	}
}
