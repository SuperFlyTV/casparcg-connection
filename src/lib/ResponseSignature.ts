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
		// @todo: change :any to "typeof IResponseValidator" and same for parser
		constructor(public code: number = 202, public validator: any  = StatusValidator, public parser: any = null) {

		}
	}
}