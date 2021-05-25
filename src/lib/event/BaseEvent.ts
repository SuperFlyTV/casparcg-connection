/**
 *
 */
export class BaseEvent {
	public _val: Record<string, unknown> | unknown

	constructor(params: Record<string, unknown> | unknown) {
		this._val = params
	}

	valueOf(): Record<string, unknown> | unknown {
		return this._val
	}
}
