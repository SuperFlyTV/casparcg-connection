export namespace Response {

	/**
	 * 
	 */
	export interface IResponseParser {
		parse(data: Object): Object;
	}

	/**
	 * 
	 */
	export class ChannelParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {

			console.log(data.toString());
			

			return null;
		}
	}

	/**
	 * 
	 */
	export class ConfigParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {

			return null;
		}
	}
}