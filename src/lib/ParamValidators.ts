import {Param as ParamNS} from "./ParamSignature";
import ParamData = ParamNS.ParamData;
import {Enum} from "./ServerStateEnum";
import AbstractEnum = Enum.AbstractEnum;

export namespace Validation {
	/**
	 * 
	 */
	export interface IValidator {
		resolve(data: Object, key?: string): ParamData;
		resolved: boolean;
	}

	/**
	 * 
	 */
	export abstract class AbstractValidator implements IValidator {

		public resolved = false;

		abstract resolve(value: number, key?: string): ParamData;
	}

	/**
	 * 
	 */
	export class StringValidator extends AbstractValidator {

		/**
		 * 
		 */
		constructor(private lazy: Boolean = true) {
			super();
		}

		/**
		 *
		 */
		resolve(data: Object): ParamData {
			let textstring: string = "";

			function checkTextstring(rawClipNameString: string): string {
				if (rawClipNameString ==  null) {
					return "";
				}

				// trim all non-textual content
				rawClipNameString = rawClipNameString.replace(/(^[\s\W]+|[\s\W]+$)/gi, "");

				// check length
				if (rawClipNameString.length === 0) {
					return "";
				}
				return rawClipNameString;
			}


			if (Array.isArray(data)) {
				let i: number = 0;

				// switch lazy/greedy mode
				if (this.lazy) {
					// lazy = return first valid hit
					do {
						textstring = checkTextstring(data[i]);
						i++;
					}while (textstring == null);
				}else {
					// greedy 
					textstring = "";
					data.forEach(i => {
						let o = checkTextstring(i);
						textstring += (o) ? o + " " : "";
					});
				}

			}else if (typeof data === "object" ||  typeof data === "string") {
				textstring = data !== null ? data.toString() : "";
			}

			if (!checkTextstring(textstring)) {
				return false;
			}

			return textstring;
		}
	}

	/**
	 * 
	 */
	export class ClipNameValidator extends AbstractValidator {

		/**
		 *
		 */
		resolve(data: Object): ParamData {
			let clipName: string = "";

			function checkClipNameString(rawClipNameString: string): string {
				if (rawClipNameString ==  null) {
					return "";
				}

				// trim all non-textual content
				rawClipNameString = rawClipNameString.replace(/(^[\s\W]+|[\s\W]+$)/gi, "");

				// check length
				if (rawClipNameString.length === 0) {
					return "";
				}
				return rawClipNameString;
			}


			if (Array.isArray(data)) {
				let i: number = 0;
				do {
					clipName = checkClipNameString(data[i]);
					i++;
				}while (clipName == null);

			}else if (typeof data === "object" ||  typeof data === "string") {
				clipName = data !== null ? data.toString() : "";
			}

			if (!checkClipNameString(clipName)) {
				return false;
			}

			// add quotation
			clipName = `"${clipName}"`;

			return clipName;
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
			super();
		}

		/**
		 *
		 */
		resolve(data: Object): ParamData {
			if (data instanceof this._enumClass) {
				return data.value;
			}else if (typeof data === "string") {
				let stringCast = data !== null ? data.toString() : "";
				// format stringy enum value
				stringCast = stringCast.toUpperCase();
				stringCast = stringCast.replace(" ", "_");
				if (this._enumClass.hasOwnProperty(stringCast)) {
					return this._enumClass[stringCast].value;
				}
			}
			return false;
		}
	}

	/**
	 * 
	 */
	export class KeywordValidator extends AbstractValidator {
		private _keyword: string;
		private _caseSensitive: boolean;

		/**
		 * 
		 */
		constructor(keyword: string, caseSensitive: boolean = false) {
			super();
			this._keyword = keyword;
			this._caseSensitive = caseSensitive;
		}

		/**
		 *
		 */
		resolve(data: Object): ParamData {
			let keywordCopy: string = this._keyword;
			if (!this._caseSensitive) {
				keywordCopy = keywordCopy.toLowerCase();
			}

			if (Array.isArray(data)) {
				if (!this._caseSensitive) {
					data = data.map(value => String(value).toLowerCase());
				}
				if ((<Array<string>>data).indexOf(keywordCopy) > -1) {
					return this._keyword;
				}
			}else if (typeof data === "object" && data !== null) {
				let objectCast = data;
				if (!this._caseSensitive) {
					for (let key in objectCast) {
						objectCast[key] = String(objectCast[key]).toLowerCase();
					}
				}
				if (objectCast.hasOwnProperty(keywordCopy)) {
					return this._keyword;
				}

			}else if (typeof data === "string") {
				if (!this._caseSensitive) {
					data = String(data).toLowerCase();
				}
				if (data === keywordCopy) {
					return this._keyword;
				}
			}

			return false;
		}
	}

	/**
	 * 
	 */
	export class FrameValidator extends AbstractValidator {
		private _keyword: string;

		/**
		 * 
		 */
		constructor(keyword: string) {
			super();
			this._keyword = keyword;
		}

		/**
		 *
		 */
		resolve(data: Object): ParamData {
			if (Array.isArray(data)) {
				let index: number;
				data = data.map(element => String(element).toLowerCase());
				if ((index = (<Array<string>>data).indexOf(this._keyword.toLowerCase())) > -1) {
					data = parseInt(data[index + 1], 10);
				}
			}else if (typeof data === "object" && data !== null) {
				let objectCast = data;
				if (objectCast.hasOwnProperty(this._keyword)) {
					(data = objectCast[this._keyword]) as number;
				}
			}else if (typeof data === "string") {
				data = Number(data);
			}

			if (typeof data === "number") {
				let numberCast: number;
				if ((numberCast = data as number) >= 0) {
					return numberCast;
				}
			}

			return false;
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
			super();
		}

		/**
		 *
		 */
		resolve(data: Object): ParamData {
			if (typeof data === "number") {
				let numberCast: number = Math.max(Math.min(data as number, this._max), this._min);
				if (numberCast >= 0) {
					return numberCast;
				}
			}

			return false;
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
			super();
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
				return Number(super.resolve(data)).toFixed();
			}
			return NaN;
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
			super();
		}

		/**
		 *
		 */
		resolve(data: Object): ParamData {
			if (typeof data === "number") {
				let numberCast: number = Math.max(Math.min(data as number, this._max), this._min);
				return numberCast;
			}

			return false;
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
			super();
		}
	}

	/**
	 * 
	 */
	export class BooleanValidatorWithDefaults extends AbstractValidator {

		/**
		 * 
		 */
		constructor(private _valueOnSuccess?: (string | number | boolean), private _valueOnFail?: (string | number | boolean)) {
			super();
		}

		/**
		 *
		 */
		resolve(data: Object, key: string): ParamData {
			if (Array.isArray(data)) {
				let index: number;
				data = data.map(element => String(element).toLowerCase());
				if ((index = (<Array<string>>data).indexOf(key.toLowerCase())) > -1) {
					data = data[index + 1];
					if (data === undefined) {
						data = 	data[index];
					}
				}
				// @todo: probably add some string-parsing logic:
				// if just a single boolean param in protocol, try to parse arrayCast[0] which should hold it
				else {
					// can't resolve array
					data = false;
				}
			}

			let isValid: boolean = false;
			if (typeof data === "string") {
				if (data === "true") {
					isValid = true;
				}else if (data === "1") {
					isValid = true;
				}else if (data === key) {
					isValid = true;
				}
			}else {
				isValid = (!!data.valueOf());
			}
			if (isValid) {
				return (this._valueOnSuccess !== undefined) ? this._valueOnSuccess : isValid;
			}else {
				return (this._valueOnFail !== undefined) ? this._valueOnFail : isValid;
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
			super();
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
			let stringCast = data.toString();

			// data is object: serialize
			if (typeof data === "object" && data !== null) {
				stringCast = JSON.stringify(data);
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

			// add qoutation 
			stringCast = stringCast.replace(/\"/g, "\\\"");
			return `"${stringCast}"`;
		}
	}
}