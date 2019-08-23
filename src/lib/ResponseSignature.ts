import { IResponseValidator, statusValidator } from './ResponseValidators'
import { IResponseParser } from './ResponseParsers'

/**
 *
 */
export class ResponseSignature {

	/**
	 *
	 */
	// @todo: change :any to "typeof IResponseValidator" and same for parser
	constructor(public code: number = 202, public validator: IResponseValidator = statusValidator, public parser: IResponseParser | null = null) {

	}
}
