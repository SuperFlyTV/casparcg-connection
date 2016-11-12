import {parseString as xmlParser} from "xml2js";
import {AMCP, AMCPUtil as AMCPUtilNS} from "./AMCP";
// AMCPUtilNS
import CasparCGSocketResponse = AMCPUtilNS.CasparCGSocketResponse;
import {Command  as CommandNS} from "./AbstractCommand";
import IAMCPResponse = CommandNS.IAMCPResponse;

export namespace Response {

	/**
	 * 
	 */
	export interface IResponseValidator {
		resolve(response: CasparCGSocketResponse): Object;
	}

	/**
	 * 
	 */
	export class StatusValidator implements IResponseValidator {

		/**
		 * 
		 */
		public resolve(response: CasparCGSocketResponse): Object {
			return null;
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

			let parseNumbers = function(str) {
				if (!isNaN(str)) {
					str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
				}
				return str;
			};

			let returnFalse;
			let returnData;

			xmlParser(
				response.items[0].replace("\n", ""),
				{explicitRoot: false, async: false, trim: true, explicitArray: false, valueProcessors: [parseNumbers]},
				(error, result) => {
					returnFalse = error;
					returnData = result;
				});

			return (returnFalse !== null) ? false : returnData;
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
			let stringItems: Array<string> = response.items.filter((i) => typeof i === "string");
			return stringItems;
		}
	}

	/**
	 * 
	 */
	export class DataValidator implements IResponseValidator {

		/**
		 * 
		 */
		public resolve(response: CasparCGSocketResponse): Object {
			return null;
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
			return response.items[0];
		}
	}

	/**
	 * 
	 */
	export class SomeThingValidator implements IResponseValidator {

		/**
		 * 
		 */
		public resolve(response: CasparCGSocketResponse): Object {
			return null;
		}
	}
}