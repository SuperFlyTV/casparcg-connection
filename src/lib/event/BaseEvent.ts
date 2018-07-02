export namespace Event {
	/**
	 *
	 */
	export class BaseEvent {
		public _val: Object

		/**
		 *
		 */
		constructor(params: Object) {
			this._val = params
		}

		/**
		 *
		 */
		valueOf(): Object {
			return this._val
		}
	}
}
