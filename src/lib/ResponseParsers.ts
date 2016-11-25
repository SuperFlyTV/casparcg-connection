import {TypedJSON} from "typedjson-npm";
import * as _ from "highland";

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
		private childrenToArray(root: Object, childIndices: Array<string>): Object {
			_.pairs(root).map((i) => {
				let outerKey: string = i[0].toString();
				let outerValue: Object = i[1];
				// filter top-level possible arrays
				if (childIndices.indexOf(outerKey) > -1) {
					let flatArray: Array<Object> = [];
					for (let innerKey in outerValue) {
						let innerValue: Object = outerValue[innerKey];
						if (typeof innerValue === "object") {
							if (Array.isArray(innerValue)) { // multiple innervalues
								innerValue.forEach((o: Object) => {
									o["type"] = innerKey;
									flatArray.push(o);
								});
							} else { // single inner object
								innerValue["type"] = innerKey;
								flatArray.push(innerValue);
							}
						// update outer member with transformed array of inner members
						}else {
							flatArray.push({type: innerKey});
						}
						i[1] = flatArray;
					}
				}
				return i;
			}).toArray((i) => {
					root = {};
					i.forEach((o) => {
						root![(<string>o[0])] = o[1];
					});
				});
			return root;
		}

		/**
		 * 
		 */
		public parse(data: Object): Object {

			data = this.childrenToArray(data, ["channels", "controllers", "template-hosts"]);
			if (data.hasOwnProperty("channels")) {
				for (let i in data["channels"]) {
					data["channels"][i] = this.childrenToArray(data["channels"][i], ["consumers"]);
				}
			}
			if (data.hasOwnProperty("osc")) {
				for (let i in data["osc"]) {
					data["osc"][i] = this.childrenToArray(data["osc"][i], ["predefined-clients"]);
				}
			}
			if (data.hasOwnProperty("audio")) {
				for (let i in data["audio"]) {
					data["audio"][i] = this.childrenToArray(data["audio"][i], ["channel-layouts"]);
				}
			}

			let dataString: string = JSON.stringify(data).toLowerCase();
			console.log("FØØØRRRRR:::::", dataString);
			let result: Config207 | Config210 | {}  = {};
			try {
				result = TypedJSON.parse(dataString, Config207);
			}catch (e) {
				console.log("CONFIG PARSE ERROR: ", e);
			}
			console.log("PARSED:::::", TypedJSON.stringify(result));
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