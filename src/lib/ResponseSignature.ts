import {Response as ResponseValidatorNS} from "./ResponseValidators";
import StatusValidator = ResponseValidatorNS.StatusValidator;

/**
 * 
 */
export namespace Response {
	/**
	 * 
	 */
	export class ResponseSignature {


		/**
		 * 
		 */
		constructor(public code: number = 202, public validator: ResponseValidator = StatusValidator, public parser: ResponseParser = null) {

		}
	}

	/**
	 * 
	 */
	export class ResponseValidator {


		/**
		 * 
		 */
		constructor() {

		}
	}

	/**
	 * 
	 */
	export class ResponseParser {


		/**
		 * 
		 */
		constructor() {

		}
	}
}