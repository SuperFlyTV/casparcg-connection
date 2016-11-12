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
		constructor(public code: number = 202, public validator: any  = StatusValidator, public parser: any = null) {

		}
	}
}