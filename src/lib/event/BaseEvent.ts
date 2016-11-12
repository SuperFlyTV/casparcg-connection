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
		valueOf(): Object {
			return this.val();
		}
	}
}