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
			let result: Array<Object> = new Array<Object>();
			let components: Array<string> = data.toString().split(/\s|,/);

			while (components.length > 0) {
				result.push({channel: components.shift(), format: components.shift(), status: components.shift()});
			}

			if (result.length > 0) {
				return result;
			}

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
			return data;
		}
	}
}