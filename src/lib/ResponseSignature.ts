import {Response as ResponseValidatorNS} from "./ResponseValidators";
import IResponseValidator = ResponseValidatorNS.IResponseValidator;
import StatusValidator = ResponseValidatorNS.StatusValidator;


import {Response as ResponseParserNS} from "./ResponseParsers";
import IResponseParser = ResponseParserNS.IResponseParser;

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