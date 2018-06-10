import { Param as ParamNS } from './ParamSignature'
import ParamData = ParamNS.ParamData
import { Enum } from './ServerStateEnum'
import AbstractEnum = Enum.AbstractEnum

import { Command as CommandNS } from './AbstractCommand'

export namespace Validation {
	/**
	 *
	 */
	export interface IValidator {
		resolved: boolean
		resolve(data: Object | CommandNS.IAMCPCommand, key?: string): ParamData
	}

	/**
	 *
	 */
	export abstract class AbstractValidator implements IValidator {

		public resolved = false

		abstract resolve(value: number, key?: string): ParamData
	}

	/**
	 *
	 */
	export class StringValidator extends AbstractValidator {

		/**
		 *
		 */
		constructor(private lazy: Boolean = true) {
			super()
		}

		/**
		 *
		 */
		resolve(data: Object): ParamData {
			let textstring: string = ''

			function checkTextstring(rawClipNameString: string): string {
				if (rawClipNameString == null) {
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
				if (this.lazy) {
					// lazy = return first valid hit
					do {
						textstring = checkTextstring(data[i])
						i++
					} while (textstring == null)
				} else {
					// greedy
					textstring = ''
					data.forEach(i => {
						let o = checkTextstring(i)
						textstring += (o) ? o + ' ' : ''
					})
				}

			} else if (typeof data === 'object' || typeof data === 'string') {
				textstring = data !== null ? data.toString() : ''
			}

			if (!checkTextstring(textstring)) {
				return false
			}

			return textstring
		}
	}

	/***/
	export class FilterValidator extends StringValidator { }

	/***/
	export class URLValidator extends StringValidator {

		resolve(data: Object): ParamData {
			let url: string = super.resolve(data).toString()

			// add quotation
			let quotedUrl: string = `"${url}"`
			return { raw: url, payload: quotedUrl }
		}
	}

	/***/
	export class ChannelLayoutValidator extends StringValidator {
		// @todo: a combination of string and enum!
	}

	/**
	 *
	 */
	export class ClipNameValidator extends AbstractValidator {

		/**
		 *
		 */
		resolve(data: any): ParamData {
			let clipName: string = ''

			function checkClipNameString(rawClipNameString: string): string {
				if (rawClipNameString == null) {
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
				while (clipName === null) {
					clipName = checkClipNameString(data[i])
					i++
				}

			} else if (typeof data === 'object' || typeof data === 'string') {
				clipName = data !== null ? data.toString() : ''
			}

			if (!checkClipNameString(clipName)) {
				return false
			}

			// add quotation
			let quotedClipName: string = `"${clipName}"`
			return { raw: clipName, payload: quotedClipName }
		}
	}

	/**
	 *
	 */
	export class TemplateNameValidator extends ClipNameValidator {
	}

	/**
	 *
	 */
	export class DataNameValidator extends ClipNameValidator {
	}

	/**
	 *
	 */
	export class EnumValidator extends AbstractValidator {

		/**
		 *
		 */
		constructor(private _enumClass: typeof AbstractEnum) {
			super()
		}

		/**
		 *
		 */
		resolve(data: any): ParamData {
			if (data instanceof this._enumClass) {
				return data.value
			} else if (typeof data === 'string') {
				// TODO: data is known to be string here;
				let stringCast = data // !== null ? data.toString() : ''
				// format stringy enum value
				stringCast = stringCast.toUpperCase()
				stringCast = stringCast.replace(' ', '_')
				if (this._enumClass.hasOwnProperty(stringCast)) {
					return (this._enumClass as any)[stringCast].value
				}
			}
			return false
		}
	}

	/**
	 *
	 */
	export class ChannelFormatValidator extends AbstractValidator {

		/**
		 *
		 */
		constructor() {
			super()
		}

		/**
		 *
		 */
		resolve(data: Object): ParamData {
			if (data instanceof Enum.ChannelFormat) {
				return data.value
			} else if (typeof data === 'string') {
				let stringCast = data !== null ? data.toString() : ''
				// format stringy enum value
				stringCast = stringCast.toUpperCase()
				stringCast = stringCast.replace(' ', '_')
				if (Enum.ChannelFormat.hasOwnProperty(stringCast)) {
					return (Enum.ChannelFormat as any)[stringCast].value
				} else if (Enum.ChannelFormat.hasOwnProperty('SD_' + stringCast)) {
					return (Enum.ChannelFormat as any)['SD_' + stringCast].value
				} else if (Enum.ChannelFormat.hasOwnProperty('HD_' + stringCast)) {
					return (Enum.ChannelFormat as any)['HD_' + stringCast].value
				} else if (Enum.ChannelFormat.hasOwnProperty('UHD_' + stringCast)) {
					return (Enum.ChannelFormat as any)['UHD_' + stringCast].value
				}
			}
			return false
		}
	}

	/**
	 *
	 */
	export class KeywordValidator extends AbstractValidator {
		private _keyword: string
		private _caseSensitive: boolean

		/**
		 *
		 */
		constructor(keyword: string, caseSensitive: boolean = false) {
			super()
			this._keyword = keyword
			this._caseSensitive = caseSensitive
		}

		/**
		 *
		 */
		resolve(data: Object): ParamData {
			let keywordCopy: string = this._keyword
			if (!this._caseSensitive) {
				keywordCopy = keywordCopy.toLowerCase()
			}

			if (Array.isArray(data)) {
				if (!this._caseSensitive) {
					data = data.map(value => String(value).toLowerCase())
				}
				if ((data as Array<string>).indexOf(keywordCopy) > -1) {
					return this._keyword
				}
			} else if (typeof data === 'object' && data !== null) {
				let objectCast = data
				if (!this._caseSensitive) {
					for (let key in objectCast) {
						(objectCast as any)[key] = String((objectCast as any)[key]).toLowerCase()
					}
				}
				if (objectCast.hasOwnProperty(keywordCopy)) {
					return this._keyword
				}

			} else if (typeof data === 'string') {
				if (!this._caseSensitive) {
					data = String(data).toLowerCase()
				}
				if (data === keywordCopy) {
					return this._keyword
				}
			}

			return false
		}
	}

	/**
	 *
	 */
	export class FrameValidator extends AbstractValidator {
		private _keyword: string

		/**
		 *
		 */
		constructor(keyword: string) {
			super()
			this._keyword = keyword
		}

		/**
		 *
		 */
		resolve(data: any): ParamData {
			if (Array.isArray(data)) {
				data = data.map(element => String(element).toLowerCase())
				let index: number = (data as Array<string>).indexOf(this._keyword.toLowerCase())
				if (index > -1) {
					data = parseInt(data[index + 1], 10)
				}
			} else if (typeof data === 'object' && data !== null) {
				let objectCast = data
				if (objectCast.hasOwnProperty(this._keyword)) {
					data = objectCast[this._keyword] as number
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
	}

	/**
	 *
	 */
	export class PositiveNumberValidatorBetween extends AbstractValidator {

		/**
		 *
		 */
		constructor(private _min: number = Number.NEGATIVE_INFINITY, private _max: number = Number.POSITIVE_INFINITY) {
			super()
		}

		/**
		 *
		 */
		resolve(data: Object): ParamData {
			if (typeof data === 'number') {
				let numberCast: number = Math.max(Math.min(data as number, this._max), this._min)
				if (numberCast >= 0) {
					return numberCast
				}
			}

			return false
		}
	}

	/**
	 *
	 */
	export class PositiveNumberValidator extends PositiveNumberValidatorBetween {

		/**
		 *
		 */
		constructor() {
			super()
		}
	}

	/**
	 *
	 */
	export class PositiveNumberRoundValidatorBetween extends PositiveNumberValidatorBetween {

		/**
		 *
		 */
		resolve(data: Object | undefined): ParamData {
			if (data) {
				return Number(super.resolve(data)).toFixed()
			}
			return NaN
		}
	}

	/**
	 *
	 */
	export class NumberValidatorBetween extends AbstractValidator {

		/**
		 *
		 */
		constructor(private _min: number = Number.NEGATIVE_INFINITY, private _max: number = Number.POSITIVE_INFINITY) {
			super()
		}

		/**
		 *
		 */
		resolve(data: Object): ParamData {
			if (typeof data === 'number') {
				let numberCast: number = Math.max(Math.min(data as number, this._max), this._min)
				return numberCast
			}

			return false
		}
	}

	/**
	 *
	 */
	export class NumberValidator extends NumberValidatorBetween {

		/**
		 *
		 */
		constructor() {
			super()
		}
	}

	/***/
	export class DecklinkDeviceValidator extends PositiveNumberValidator { }

	/**
	 *
	 */
	export class BooleanValidatorWithDefaults extends AbstractValidator {

		/**
		 *
		 */
		constructor(private _valueOnSuccess?: (string | number | boolean), private _valueOnFail?: (string | number | boolean)) {
			super()
		}

		/**
		 *
		 */
		resolve(data: any, key: string): ParamData {
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
				return (this._valueOnSuccess !== undefined) ? this._valueOnSuccess : isValid
			} else {
				return (this._valueOnFail !== undefined) ? this._valueOnFail : isValid
			}
		}
	}

	/**
	 *
	 */
	export class BooleanValidator extends BooleanValidatorWithDefaults {

		/**
		 *
		 */
		constructor() {
			super()
		}
	}

	/**
	 *
	 */
	export class TemplateDataValidator extends AbstractValidator {

		/**
		 *
		 */
		resolve(data: Object): ParamData {
			let stringCast = data.toString()

			// data is object: serialize
			if (typeof data === 'object' && data !== null) {
				stringCast = JSON.stringify(data)
			} else if (typeof data === 'string' && data !== null) {
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
	}
	export class TimecodeValidator extends StringValidator {
		// nothing
	}
	export class CommandValidator extends AbstractValidator {
		resolve(command: any): ParamData {
			if (CommandNS.isIAMCPCommand(command)) {
				command.validateParams()
				// TODO: The `command.constructor.commandString` is probably a bug, or at best bad pratice to name a paramter "constructur", as it is reserved.
				let commandString: string = (command.constructor as any).commandString + (command.address ? ' ' + command.address : '')
				for (let i in command.payload) {
					let payload: ParamNS.Payload = command.payload[i]
					commandString += (commandString.length > 0 ? ' ' : '')
					commandString += (payload.key ? payload.key + ' ' : '') + payload.value
				}
				return commandString
			} else {
				throw new Error('Argument 0 was not an amcp command.')
			}
		}
	}
}
