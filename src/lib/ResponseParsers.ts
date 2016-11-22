import {TypedJSON} from "typedjson-npm";

// config NS
import {Config as ConfigNS} from "./Config";
import Config207 = ConfigNS.Config207;
import Config210 = ConfigNS.Config210;

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
			let result: Array<Object> = [];
			let components: Array<string> = data.toString().split(/\s|,/);

			while (components.length > 0) {
				result.push({channel: components.shift(), format: components.shift(), status: components.shift()});
			}

			if (result.length > 0) {
				return result;
			}

			return {};
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

			console.log("RAW::::", JSON.stringify(data));


			if (data.hasOwnProperty("channels")) {
				if (!Array.isArray(data["channels"])) {
					data["channels"] = [data["channels"]];
				}
				(<Array<Object>>data["channels"]).map((i: Object) => {
					if (i.hasOwnProperty("consumers")) {
						let consumers: Object = i["consumers"];
						if (!Array.isArray(consumers)) {
							let wrap: Array<Object> = [];
							for (let o in consumers) {
								let u: Object = {};
								u[o] = consumers[o] === "" ? {} : consumers[o];
								wrap.push(u);
							}
							i["consumers"] = wrap;
						}
					}
					return i;
				});
			}
			let dataString: string = TypedJSON.stringify(data).toLowerCase();
			console.log("FØØØRRRRR:::::", dataString);
			let result: Config207 | Config210 | {}  = {};
			try {
				result = TypedJSON.parse(dataString, Config207);
			}catch (e) {
				console.log("CONFIG PARSE ERROR: ", e);
			}
			console.log("ETTER:::::", TypedJSON.stringify(result));
			return result;
		}
	}

	/**
	 * 
	 */
	export class DataParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

	/**
	 * 
	 */
	export class DataListParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

	/**
	 * 
	 */
	export class InfoTemplateParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

	/**
	 * 
	 */
	export class HelpParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

	/**
	 * 
	 */
	export class GLParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

	/**
	 * 
	 */
	export class InfoDelayParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

	/**
	 * 
	 */
	export class InfoParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

	/**
	 * 
	 */
	export class InfoThreadsParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

	/**
	 * 
	 */
	export class ThumbnailParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return `data:image/png;base64,${data}`;
		}
	}

	/**
	 * 
	 */
	export class VersionParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

	/**
	 * 
	 */
	export class PathParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Array<any>): Object {

			return data.map((i) => {
				let components: Array<string> = i.split(" ");

				// is font
				if (components.length === 2) {
					return {name: components[1].replace(/\"/g, ""), type: "font"};
				 }

				// is template
				if (components.length === 4) {
					return {name: components[0].replace(/\"/g, ""), type: "template"};
				}

				// is media
				return {name: components[0].replace(/\"/g, ""), type: components[1].toLowerCase() === "movie" ? "video" : components[1].toLowerCase() === "still" ? "image" : components[1].toLowerCase()};

			});
		}
	}

	/**
	 * 
	 */
	export class CinfParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

	/**
	 * 
	 */
	export class InfoQueuesParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

	/**
	 * 
	 */
	export class InfoServerParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

	/**
	 * 
	 */
	export class InfoPathsParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

	/**
	 * 
	 */
	export class InfoSystemParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

}