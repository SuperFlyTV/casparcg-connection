import { parseString as xmlParser } from 'xml2js'
import { AMCPUtil as AMCPUtilNS } from './AMCP'
// AMCPUtilNS
import CasparCGSocketResponse = AMCPUtilNS.CasparCGSocketResponse

export namespace Response {

	/**
	 *
	 */
	export interface IResponseValidator {
		resolve(response: CasparCGSocketResponse): Object
	}

	/**
	 *
	 */
	export class StatusValidator implements IResponseValidator {

		/**
		 *
		 */
		public resolve(response: CasparCGSocketResponse): Object {
			return response.statusCode < 400
		}
	}

	/**
	 *
	 */
	export class StringValidator implements IResponseValidator {

		/**
		 *
		 */
		public resolve(response: CasparCGSocketResponse): Object {
			let result: String = response.items[0].toString()
			return result.length > 0 ? result : false
		}
	}

	/**
	 *
	 */
	export class XMLValidator implements IResponseValidator {

		/**
		 *
		 */
		public resolve(response: CasparCGSocketResponse): Object {
			let parseNumbers = function (str: any) {
				if (!isNaN(str)) {
					str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str)
				}
				return str
			}
			let parseBooleans = function (str: any) {
				if (str === true || str.toString().toLowerCase() === 'true') {
					return true
				} else if (str === false || str.toString().toLowerCase() === 'false') {
					return false
				}
				return str
			}
			let parseLowerCase = function (str: any) {
				return str.toString().toLowerCase()
			}

			let returnFalse: Error | undefined
			let returnData: Object | undefined

			xmlParser(
				response.items[0].replace('\n', ''),
				{ explicitRoot: false, async: false, trim: true, explicitArray: false, mergeAttrs: true, attrValueProcessors: [parseNumbers], valueProcessors: [parseNumbers, parseBooleans], tagNameProcessors: [parseLowerCase], attrNameProcessors: [parseLowerCase] },
				(error, result) => {
					returnFalse = error
					returnData = result
				})

			return returnFalse ? {} : returnData || {}
		}
	}

	/**
	 *
	 */
	export class ListValidator implements IResponseValidator {

		/**
		 *
		 */
		public resolve(response: CasparCGSocketResponse): Object {
			// filters on stringitems in items-list and validates if any items present
			let stringItems = response.items
			return stringItems
		}
	}

	/**
	 *
	 */
	export class DataValidator implements IResponseValidator {	// @todo

		/**
		 *
		 */
		public resolve(response: CasparCGSocketResponse): Object {
			let result: String = response.items[0].toString()
			return result.length > 0 ? result : false
		}
	}

	/**
	 *
	 */
	export class Base64Validator implements IResponseValidator {

		/**
		 *
		 */
		public resolve(response: CasparCGSocketResponse): Object {
			return response.items[0]
		}
	}

	/**
	 *
	 */
	export class MixerStatusValidator implements IResponseValidator {

		/**
		 *
		 */
		public resolve(response: CasparCGSocketResponse): Object {
			let result: Array<number> = response.items[0].split(' ').map(value => Number.parseFloat(value))
			return result.length > 0 && result.every(value => !isNaN(value)) ? result : false
		}
	}
}
