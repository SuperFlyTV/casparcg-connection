import * as BaseEventNS from './BaseEvent'

/**
 *
 */
export class LogEvent extends BaseEventNS.BaseEvent {
	static readonly LOG = 'logeventlog'

	constructor(public logString: string) {
		super({ logString: logString })
	}

	valueOf(): string {
		return this.logString
	}
}
