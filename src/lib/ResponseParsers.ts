import {TypedJSON} from "typedjson-npm";
import * as _ from "highland";
import {Options as OptionsNS} from "./AMCPConnectionOptions";
// Options NS
import ServerVersion = OptionsNS.ServerVersion;
// config NS
import {Config as ConfigNS} from "./Config";
import CasparCGConfig = ConfigNS.CasparCGConfig;
import Config207VO = ConfigNS.Config207VO;
import Config210VO = ConfigNS.Config210VO;

export namespace Response {

	/**
	 * 
	 */
	export interface IResponseParser {
		context?: Object;
		parse(data: Object): Object;
	}

	/**
	 * 
	 */
	export abstract class AbstractParser {
		context?: Object;
	}

	/**
	 * 
	 */
	export class ChannelParser extends AbstractParser implements IResponseParser {

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
	export class ConfigParser extends AbstractParser implements IResponseParser {

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
									if (typeof o !== "object") {	// "" string values, i.e. empty screen consumers
										o = {};
									}
									o["_type"] = innerKey;
									flatArray.push(o);
								});
							} else { // single inner object
								innerValue["_type"] = innerKey;
								flatArray.push(innerValue);
							}
						// update outer member with transformed array of inner members
						}else {
							flatArray.push({_type: innerKey});
						}
					}
					i[1] = flatArray;
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
				data["osc"] = this.childrenToArray(data["osc"], ["predefined-clients"]);
			}
			if (data.hasOwnProperty("audio")) {
				data["audio"] = this.childrenToArray(data["audio"], ["channel-layouts", "mix-configs"]);
				if (data["audio"].hasOwnProperty("channel-layouts")) {
					let o: string;
					for (let i in data["audio"]["channel-layouts"]) {
						if (data["audio"]["channel-layouts"][i]["type"] && !isNaN(data["audio"]["channel-layouts"][i]["type"])) {
							o = (data["audio"]["channel-layouts"][i]["type"]).toString();
							o += o.indexOf(".") === -1 ? ".0" : "";		// 
							data["audio"]["channel-layouts"][i]["type"] = o;
						}
					}
				}
				if (data["audio"].hasOwnProperty("mix-configs")) {
					let o: string;
					for (let i in data["audio"]["mix-configs"]) {
						if (data["audio"]["mix-configs"][i]["to"] && !isNaN(data["audio"]["mix-configs"][i]["to"])) {
							o = (data["audio"]["mix-configs"][i]["to"]).toString();
							o += o.indexOf(".") === -1 ? ".0" : "";
							data["audio"]["mix-configs"][i]["to"] = o;
						}
						if (data["audio"]["mix-configs"][i]["from"] && !isNaN(data["audio"]["mix-configs"][i]["from"])) {
							o = (data["audio"]["mix-configs"][i]["from"]).toString();
							o += o.indexOf(".") === -1 ? ".0" : "";
							data["audio"]["mix-configs"][i]["from"] = o;
						}
						if (data["audio"]["mix-configs"][i]["to-types"] && !isNaN(data["audio"]["mix-configs"][i]["to-types"])) {
							o = (data["audio"]["mix-configs"][i]["to-types"]).toString();
							o += o.indexOf(".") === -1 ? ".0" : "";
							data["audio"]["mix-configs"][i]["to-types"] = o;
						}
						if (data["audio"]["mix-configs"][i]["from-type"] && !isNaN(data["audio"]["mix-configs"][i]["from-type"])) {
							o = (data["audio"]["mix-configs"][i]["from-type"]).toString();
							o += o.indexOf(".") === -1 ? ".0" : "";
							data["audio"]["mix-configs"][i]["from-type"] = o;
						}

						data["audio"]["mix-configs"][i] = this.childrenToArray(data["audio"]["mix-configs"][i], ["mappings"]);
					}
				}
			}
			if (data.hasOwnProperty("flash") && data["flash"].hasOwnProperty("buffer-depth")) {
					data["flash"]["buffer-depth"] = (data["flash"]["buffer-depth"]).toString();
			}
			let dataString: string = JSON.stringify(data).toLowerCase();
			let configVOClass: any;

			if (this.context && this.context.hasOwnProperty("serverVersion") && this.context["serverVersion"] > ServerVersion.V21x) {
				configVOClass = Config210VO;
			}else {
				configVOClass = Config207VO;
			}
			let configVO: Config207VO | Config210VO | {}  = {};

			// errors thrown in parsing bubbles and rejects the promise for the active command
			configVO = TypedJSON.parse(dataString, configVOClass);

			let configResult: CasparCGConfig = new CasparCGConfig(configVO);
			return configResult;
		}
	}

	/**
	 * 
	 */
	export class DataParser extends AbstractParser implements IResponseParser {

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
	export class DataListParser extends AbstractParser implements IResponseParser {

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
	export class InfoTemplateParser extends AbstractParser implements IResponseParser {

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
	export class HelpParser extends AbstractParser implements IResponseParser {

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
	export class GLParser extends AbstractParser implements IResponseParser {

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
	export class InfoDelayParser extends AbstractParser implements IResponseParser {

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
	export class InfoParser extends AbstractParser implements IResponseParser {

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
	export class InfoThreadsParser extends AbstractParser implements IResponseParser {

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
	export class ThumbnailParser extends AbstractParser implements IResponseParser {

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
	export class VersionParser extends AbstractParser implements IResponseParser {

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
	export class PathParser extends AbstractParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Array<string>): Object {

			return data.map((i: string) => {
				let components: RegExpMatchArray|null = i.match(/\"([\s\S]*)\" +([\s\S]*)/);
				
				if(components === null) {
					return null;
				}

				let name: string = components[1].replace(/\\/g, "/");
				let typeData: Array<string> = components[2].split(/\s+/);


				// is font
				if (typeData.length === 1) {
					return {name: name, type: "font"};
				 }

				// is template
				if (typeData.length === 3) {
					return {name: name, type: "template"};
				}

				// is media
				return {name: name, type: typeData[0].toLowerCase() === "movie" ? "video" : typeData[0].toLowerCase() === "still" ? "image" : typeData[0].toLowerCase()};
			});
		}
	}

	/**
	 * 
	 */
	export class CinfParser extends AbstractParser implements IResponseParser {

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
	export class InfoQueuesParser extends AbstractParser implements IResponseParser {

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
	export class InfoServerParser extends AbstractParser implements IResponseParser {

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
	export class InfoPathsParser extends AbstractParser implements IResponseParser {

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
	export class InfoSystemParser extends AbstractParser implements IResponseParser {

		/**
		 * 
		 */
		public parse(data: Object): Object {
			return data;
		}
	}

}