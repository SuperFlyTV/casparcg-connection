import { parseString as xmlParser } from 'xml2js'
import { CasparCGSocketResponse } from './CasparCGSocketResponse'
import { Command } from './ServerStateEnum'

/**
 *
 */
export interface IResponseValidator {
	(response: CasparCGSocketResponse, command?: Command): boolean
}

/**
 *
 */
export const statusValidator: IResponseValidator =
	(response: CasparCGSocketResponse): boolean => response.statusCode < 400

/**
 *
 */
export const stringValidator: IResponseValidator =
	(response: CasparCGSocketResponse): boolean => {
		let result: string = response.items[0].toString()
		return result.length > 0
	}

/**
 *
 */
export const xmlValidator: IResponseValidator =
	(response: CasparCGSocketResponse): boolean => {
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

		// FIXME
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
				console.log(returnFalse, returnData)
			})

		return true // FIXME this should be an XML validator! THIS NEVER WORKED BEFORE!
	}

/**
 *
 */
export const listValidator: IResponseValidator =
	(response: CasparCGSocketResponse): boolean => {
		// filters on stringitems in items-list and validates if any items present
		let stringItems = response.items
		return stringItems.length > 0
	}

/**
 *
 */
export const dataValidator: IResponseValidator = // todo?
	(response: CasparCGSocketResponse): boolean => {
		let result: String = response.items[0].toString()
		return result.length > 0
	}
/**
 *
 */
export const base64Validator: IResponseValidator =
	(response: CasparCGSocketResponse): boolean => !!response.items[0]

/**
 *
 */
export const mixerStatusValidator: IResponseValidator =
	(response: CasparCGSocketResponse): boolean => {
		let result: Array<number> = response.items[0].split(' ').map(value => Number.parseFloat(value))
		return result.length > 0 && result.every(value => !isNaN(value))
	}

export const pingValidator: IResponseValidator =
	(response: CasparCGSocketResponse): boolean => {
		let result: Array<string> = response.responseString.split(/\s+/)
		return result.length > 0 && result[0] === 'PONG'
	}
