import { parseString as xmlParser } from 'xml2js'
import { CasparCGSocketResponse } from './AMCP'

/**
 *
 */
export interface IResponseValidator {
	(response: CasparCGSocketResponse): Object
}

/**
 *
 */
export const statusValidator: IResponseValidator =
	(response: CasparCGSocketResponse): Object => response.statusCode < 400

/**
 *
 */
export const stringValidator: IResponseValidator =
	(response: CasparCGSocketResponse): Object => {
		let result: String = response.items[0].toString()
		return result.length > 0 ? result : false
	}

/**
 *
 */
export const xmlValidator: IResponseValidator =
	(response: CasparCGSocketResponse): Object => {
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
			{
				explicitRoot: false,
				async: false, trim: true,
				explicitArray: false,
				mergeAttrs: true,
				attrValueProcessors: [parseNumbers],
				valueProcessors: [parseNumbers, parseBooleans],
				tagNameProcessors: [parseLowerCase],
				attrNameProcessors: [parseLowerCase]
			},
			(error, result) => {
				returnFalse = error
				returnData = result
			})

		return returnFalse ? {} : returnData || {}
	}

/**
 *
 */
export const listValidator: IResponseValidator =
	(response: CasparCGSocketResponse): Object => {
		// filters on stringitems in items-list and validates if any items present
		let stringItems = response.items
		return stringItems
	}

/**
 *
 */
export const dataValidator: IResponseValidator = // todo?
	(response: CasparCGSocketResponse): Object => {
		let result: String = response.items[0].toString()
		return result.length > 0 ? result : false
	}

/**
 *
 */
export const base64Validator: IResponseValidator =
	(response: CasparCGSocketResponse): Object => response.items[0]

/**
 *
 */
export const mixerStatusValidator: IResponseValidator =
	(response: CasparCGSocketResponse): Object => {
		let result: Array<number> = response.items[0].split(' ').map(value => Number.parseFloat(value))
		return result.length > 0 && result.every(value => !isNaN(value)) ? result : false
	}
