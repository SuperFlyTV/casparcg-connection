/* eslint @typescript-eslint/ban-types: 0 */
import { StatusValidator } from './ResponseValidators'

/**
 *
 */
export class ResponseSignature {
	// @todo: change :any to "typeof IResponseValidator" and same for parser
	constructor(public code: number = 202, public validator: any = StatusValidator, public parser: any = null) {}
}
