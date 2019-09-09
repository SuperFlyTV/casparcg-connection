import { IResponseValidator, statusValidator } from './ResponseValidators'
import { IResponseParser } from './ResponseParsers'
import { CommandOptions } from './AMCPCommand'

/**
 *
 */
export class ResponseSignature<RES extends CommandOptions> {

	/**
	 *
	 */
	constructor(public code: number = 202, public validator: IResponseValidator = statusValidator, public parser: IResponseParser<RES> | null = null) {

	}
}
