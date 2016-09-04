import {Validation} from "./ParamValidators";
import IValidator = Validation.IValidator;
import AbstractValidator = Validation.AbstractValidator;


/**
 * 
 */
export namespace Param {
	/**
	 * 
	 */
	export class Optional {

		/**
		 * 
		 */
		static valueOf(): boolean {
			return false;
		}
	}

	/**
	 *  
	 */
	export class Required {

		/**
		 * 
		 */
		static valueOf(): boolean {
			return true;
		}
	}

	/**
	 * 
	 */
	export interface IParamSignature {
		required: (Required|Optional);
		name: string;
		key: string;
		validation: IValidator;
		resolved: boolean;
		payload: Object;
	}

	/**
	 * 
	 */
	export type Param = {[k: string]: (string|number|boolean|Object)};
	export type Payload = {key: string, value: (string|number|boolean|Object)};
	export type PayloadVO = {[k: string]: Payload};

	/**
	 * 
	 */
	export type ParamData = (string|boolean|number);

	/**
	 * 
	 */
	export type TemplateData = Object|String;

	/**
	 * 
	 */
	export class ParamSignature implements IParamSignature {

		public validation: IValidator;
		public payload = null;

		/**
		 * 
		 */
		constructor(public required: (Required|Optional),
					public name: string,
					public key: string,
					validation: (IValidator|Object)) {
			if (validation instanceof AbstractValidator) {
				this.validation = validation;
			}else if (typeof validation === "function") {
				let proto = Object.create(validation["prototype"]);
				this.validation = new proto.constructor();
			}
		}

		/**
		 * 
		 */
		public get resolved(): boolean {
			return this.validation.resolved;
		}
	}
}