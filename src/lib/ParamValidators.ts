import { ParamData, Payload } from './ParamSignature'
import { ChannelFormat, AllEnums, Reverse } from './ServerStateEnum'

import { isIAMCPCommand } from './AMCPCommand'

export interface IValidator {
	(data: Object, key?: string): ParamData
}

/**
 *
 */
export const stringValidator: (lazy?: boolean) => IValidator =
  (lazy: boolean = true): IValidator =>
		(data: Object | string | undefined): ParamData => {
			let textstring: string = ''

			function checkTextstring(rawClipNameString: string | null): string {
				if (rawClipNameString === null) {
					return ''
				}

				// trim all non-textual content
				rawClipNameString = rawClipNameString.trim()

				// check length
				if (rawClipNameString.length === 0) {
					return ''
				}
				return rawClipNameString
			}

			if (Array.isArray(data)) {
				let i: number = 0

				// switch lazy/greedy mode
				if (lazy) {
					// lazy = return first valid hit
					do {
						textstring = checkTextstring(data[i])
						i++
					} while (textstring.length === 0)
				} else {
					// greedy
					textstring = ''
					data.forEach(i => {
						let o = checkTextstring(i)
						textstring += (o) ? o + ' ' : ''
					})
				}

			} else if (typeof data === 'object' || typeof data === 'string') {
				textstring = data.toString()
			}

			if (!checkTextstring(textstring)) {
				return false
			}

			return textstring
		}

/***/
export const filterValidator = stringValidator

/***/
export const urlValidator: IValidator =
	(data: Object): ParamData => {
		let url: string = stringValidator()(data).toString()

		// add quotation
		let quotedUrl: string = `"${url}"`
		return { raw: url, payload: quotedUrl }
	}

/***/
	// @todo: a combination of string and enum!
export const channelLayoutValidator = stringValidator

function checkClipNameString(rawClipNameString: string | null): string {
	if (rawClipNameString === null) {
		return ''
	}

	// trim all non-textual content
	rawClipNameString = rawClipNameString.trim()

	// check length
	if (rawClipNameString.length === 0) {
		return ''
	}
	return rawClipNameString
}

/**
 *
 */
export const clipNameValidator: IValidator =
	(data: any): ParamData => {

		let clipName: string = ''

		if (typeof data === 'object' || typeof data === 'string') {
			clipName = data !== null ? data.toString() : ''
		}

		if (!checkClipNameString(clipName)) {
			return false
		}

		// add quotation
		let quotedClipName: string = `"${clipName}"`
		return { raw: clipName, payload: quotedClipName }
	}

/**
 *
 */
export const clipNameEmptyStringValidator: IValidator =
	(data: any): ParamData => {
		let clipName: string = ''

		if (typeof data === 'object' || typeof data === 'string') {
			clipName = data !== null ? data.toString() : ''
		}

		if (!checkClipNameString(clipName) && clipName !== '') {
			return false
		}

		// add quotation
		let quotedClipName: string = `"${clipName}"`
		return { raw: clipName, payload: quotedClipName }
	}

/**
 *
 */
export const templateNameValidator = clipNameValidator

/**
 *
 */
export const dataNameValidator = clipNameValidator

/**
 *
 */
export const enumValidator: (lookup: Reverse<AllEnums>) => IValidator =
	(lookup: Reverse<AllEnums>) =>
		(data: any): ParamData => {
			if (typeof data === 'string') {
				// TODO: data is known to be string here;
				let stringCast = data // !== null ? data.toString() : ''
				// format stringy enum value
				stringCast = stringCast.toUpperCase()
				stringCast = stringCast.replace(' ', '_')
				if (lookup(stringCast)) {
					return lookup(stringCast) as string
				}
			}
			return false
		}

/**
 *
 */
export const channelFormatValidator: IValidator =
	(data: any): ParamData => {
		if (typeof data === 'string') {
			let stringCast = data.toString()
			// format stringy enum value
			stringCast = stringCast.toUpperCase()
			stringCast = stringCast.replace(' ', '_')
			if (ChannelFormat.hasOwnProperty(stringCast)) {
				return (ChannelFormat as any)[stringCast].value
			} else if (ChannelFormat.hasOwnProperty('SD_' + stringCast)) {
				return (ChannelFormat as any)['SD_' + stringCast].value
			} else if (ChannelFormat.hasOwnProperty('HD_' + stringCast)) {
				return (ChannelFormat as any)['HD_' + stringCast].value
			} else if (ChannelFormat.hasOwnProperty('UHD_' + stringCast)) {
				return (ChannelFormat as any)['UHD_' + stringCast].value
			}
		}
		return false
	}

/**
 *
 */
export const keywordValidator: (keyword: string, caseSensitive?: boolean) => IValidator =
	(keyword: string, caseSensitive: boolean = false) => {
		return (data: Array<any> | Object | string | null): ParamData => {
			let keywordCopy = keyword
			if (caseSensitive) {
				keywordCopy = keywordCopy.toLowerCase()
			}

			if (Array.isArray(data)) {
				if (!caseSensitive) {
					data = data.map(value => String(value).toLowerCase())
				}
				if ((data as Array<string>).indexOf(keywordCopy) > -1) {
					return keyword
				}
			} else if (typeof data === 'object' && data !== null) {
				let objectCast = data
				if (!caseSensitive) {
					for (let key in objectCast) {
						(objectCast as any)[key] = String((objectCast as any)[key]).toLowerCase()
					}
				}
				if (objectCast.hasOwnProperty(keywordCopy)) {
					return keyword
				}

			} else if (typeof data === 'string') {
				if (!caseSensitive) {
					data = String(data).toLowerCase()
				}
				if (data === keywordCopy) {
					return keyword
				}
			}

			return false
		}
	}

/**
 *
 */
export const frameValidator: (keyword: string) => IValidator =
	(keyword: string) =>
		(data: any): ParamData => {
			if (Array.isArray(data)) {
				data = data.map(element => String(element).toLowerCase())
				let index: number = (data as Array<string>).indexOf(keyword.toLowerCase())
				if (index > -1) {
					data = parseInt(data[index + 1], 10)
				}
			} else if (typeof data === 'object' && data !== null) {
				let objectCast = data
				if (objectCast.hasOwnProperty(keyword)) {
					data = objectCast[keyword] as number
				}
			} else if (typeof data === 'string') {
				data = Number(data)
			}

			if (typeof data === 'number') {
				let numberCast: number = data as number
				if (numberCast >= 0) {
					return numberCast
				}
			}

			return false
		}

/**
 *
 */
export const positiveNumberValidatorBetween: (min?: number, max?: number) => IValidator =
	(min: number = Number.NEGATIVE_INFINITY, max: number = Number.POSITIVE_INFINITY) =>
		(data: Object | number | null): ParamData => {
			if (typeof data === 'number') {
				let numberCast: number = Math.max(Math.min(data as number, max), min)
				if (numberCast >= 0) {
					return numberCast
				}
			}

			return false
		}

/**
 *
 */
export const positiveNumberValidator: IValidator = positiveNumberValidatorBetween()

/**
 *
 */
export const positiveNumberRoundValidatorBetween: (min?: number, max?: number) => IValidator =
	(min?: number, max?: number) =>
		(data: number) => Number(positiveNumberValidatorBetween(min, max)(data)).toFixed()

/**
 *
 */
export const numberValidatorBetween: (min?: number, max?: number) => IValidator =
	(min: number = Number.NEGATIVE_INFINITY, max: number = Number.POSITIVE_INFINITY) =>
		(data: Object | number | null): ParamData => {
			if (typeof data === 'number') {
				let numberCast: number = Math.max(Math.min(data as number, max), min)
				return numberCast
			}

			return false
		}

/**
 *
 */
export const numberValidator = numberValidatorBetween

/***/
export const decklinkDeviceValidator = positiveNumberValidator

/**
 *
 */
export const booleanValidatorWithDefaults: (valueOnSuccess?: (string | number | boolean), valueOnFail?: (string | number | boolean)) => IValidator =
	(valueOnSuccess?: (string | number | boolean), valueOnFail?: (string | number | boolean)) =>
		(data: any, key: string): ParamData => {
			if (Array.isArray(data)) {
				data = data.map(element => String(element).toLowerCase())
				let index: number = (data as Array<string>).indexOf(key.toLowerCase())
				if (index > -1) {
					data = data[index + 1]
					if (data === undefined) {
						data = data[index]
					}
					// @todo: probably add some string-parsing logic:
					// if just a single boolean param in protocol, try to parse arrayCast[0] which should hold it
				} else {
					// can't resolve array
					data = false
				}
			}

			let isValid: boolean = false
			if (typeof data === 'string') {
				if (data === 'true') {
					isValid = true
				} else if (data === '1') {
					isValid = true
				} else if (data === key) {
					isValid = true
				}
			} else {
				isValid = (!!data.valueOf())
			}
			if (isValid) {
				return (valueOnSuccess !== undefined) ? valueOnSuccess : isValid
			} else {
				return (valueOnFail !== undefined) ? valueOnFail : isValid
			}
		}

/**
 *
 */
export const booleanValidator = booleanValidatorWithDefaults()

/**
 *
 */
export const templateDataValidator =
	(data: Object | string): ParamData => {
		let stringCast = data.toString()

		// data is object: serialize
		if (typeof data === 'object') {
			stringCast = JSON.stringify(data)
		} else {
			stringCast = stringCast.replace(/\r|\n/g, charToEscape => {
				return charToEscape === '\r' ? '\\r' : '\\n'
			})
		}

		/*	// data is string, try to de-serialize to validate as JSON
			try {
				let objectCast = JSON.parse(stringCast);
				return stringCast;
			} catch (e) {}

			// data is string, try to de-serialize to validate as XML
			let xmlCast;
			parseString(stringCast, {async: false}, (err, res) => {
				if (res) {
					xmlCast = res;
				}
			});
			if (xmlCast) {
				return stringCast;
			}*/

		// escaping
		stringCast = stringCast.replace(/([\\\"])/g, '\\$1')

		// add qoutation
		let quotedString: string = `"${stringCast}"`
		return { raw: stringCast, payload: quotedString }
	}

// TODO?
export const timecodeValidator = stringValidator()

const regex = /(route:\/\/)\d+((-)\d+)?/g
const regex2 = /\d+((-)\d+)?/g

export const routeValidato: IValidator =
	(data: any): ParamData => {
		if (typeof data === 'string') {
			if (regex.test(data)) {
				return { raw: data, payload: data }
			} else if (regex2.test(data)) {
				return { raw: data, payload: 'route://' + data }
			} else {
				return false
			}
		} else if (typeof data === 'object') { // data is an object
			let routeStr = 'route://'
			if (data.channel) {
				routeStr += data.channel
				if (data.layer) {
					routeStr += '-' + data.layer
				}
				return { raw: data.toString(), payload: routeStr }
			} else {
				return false
			}
		} else {
			return false
		}
	}

export const routeModeValidator = stringValidator()

export const commandValidator: IValidator =
	(command: any): ParamData => {
		if (isIAMCPCommand(command)) {
			command.validateParams()
			// TODO: The `command.constructor.commandString` is probably a bug, or at best bad pratice to name a paramter "constructur", as it is reserved.
			let commandString: string = (command.constructor as any).commandString + (command.address ? ' ' + command.address : '')
			for (let i in command.payload) {
				let payload: Payload = command.payload[i]
				commandString += (commandString.length > 0 ? ' ' : '')
				commandString += (payload.key ? payload.key + ' ' : '') + payload.value
			}
			return commandString
		} else {
			throw new Error('Argument 0 was not an amcp command.')
		}
	}
