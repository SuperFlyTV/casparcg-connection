import * as BaseEventNS from './BaseEvent'
import { IAMCPCommand } from '../AbstractCommand'
import { CasparCGSocketResponse } from '../AMCPUtil'


/**
 *
 */
export class CasparCGSocketCommandEvent extends BaseEventNS.BaseEvent {

	static readonly RESPONSE = 'casparcgsocketcommandeventresponse'

	/**
	 *
	 */
	constructor(public command: IAMCPCommand) {
		super({ command })
	}

	/**
	 *
	 */
	valueOf(): IAMCPCommand {
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
