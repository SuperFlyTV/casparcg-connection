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
			console.log("Status", response);

			return false;
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
			console.log("XML", response);
			
			return false;
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
			if (stringItems.length > 0) {
				return stringItems;
			}

			return false;
		}
	}
}