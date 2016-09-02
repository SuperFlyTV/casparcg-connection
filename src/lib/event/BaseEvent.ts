import {EventFacade} from "hap";

export namespace Event {
	/**
	 * 
	 */
	export class BaseEvent extends EventFacade {

		/**
		 * 
		 */
		constructor(params: Object) {
			super(params);
			this.val(params);
		}

		/**
		 * 
		 */
		get value(): Object{
			return this.valueOf();
		}

		/**
		 * 
		 */
		valueOf(): Object {
			return this.val();
		}
	}
}