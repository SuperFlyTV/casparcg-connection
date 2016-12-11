import {TypedJSON} from "typedjson-npm";
import * as Path from "path";
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

	/** */
	export class CasparCGPaths {
		media: string;
		data: string;
		log: string;
		template: string;
		thumbnail: string;
		font?: string | undefined;
		root: string;

		/** */
		get thumbnails(): string {
			return this.thumbnail;
		}

		/** */
		get absoluteMedia(): string{
			return this.absolutePath(this.media);
		}

		/** */
		get absoluteData(): string {
			return this.absolutePath(this.data);
		}

		/** */
		get absoluteLog(): string {
			return this.absolutePath(this.log);
		}

		/** */
		get absoluteTemplate(): string {
			return this.absolutePath(this.template);
		}

		/** */
		get absoluteThumbnail(): string {
			return this.absolutePath(this.thumbnail);
		}

		/** */
		get absoluteThumbnails(): string {
			return this.absolutePath(this.thumbnails);
		}

		/** */
		get absoluteFont(): string | undefined {
			return this.font ? this.absolutePath(this.font) : undefined;
		}

		/** */
		private absolutePath(relativeOrAbsolutePath: string): string {
			if (Path.isAbsolute(relativeOrAbsolutePath)) {
				return CasparCGPaths.ensureTrailingSlash(relativeOrAbsolutePath);
			}

			return CasparCGPaths.ensureTrailingSlash(Path.join(this.root, relativeOrAbsolutePath));
		}

		/** */
		static ensureTrailingSlash(path: string): string {
			return ((path.slice(-1) === "/" || path.slice(-1) === "\\") ? path : path + "/");
		}
	}

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
			let configVO: Config207VO | Config210VO;

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

				if (components === null) {
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
			if (data && Array.isArray(data)) {
				let components: RegExpMatchArray|null = data[0].match(/\"([\s\S]*)\" +([\s\S]*)/);

				if (components === null) {
					return {};
				}

				// let name: string = components[1].replace(/\\/g, "/");
				let typeData: Array<string> = components[2].split(/\s+/);
			return {size: parseInt(typeData[1]), created: typeData[2], duration: parseInt(typeData[3]), fps: typeData[4]};
			}
			return {};
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
			let paths = new CasparCGPaths();

			if (data.hasOwnProperty("initial-path")) {
				paths.root = data["initial-path"];
			}

			if (data.hasOwnProperty("media-path")) {
				paths.media = data["media-path"];
			}

			if (data.hasOwnProperty("data-path")) {
				paths.data = data["data-path"];
			}

			if (data.hasOwnProperty("log-path")) {
				paths.log = data["log-path"];
			}

			if (data.hasOwnProperty("template-path")) {
				paths.template = data["template-path"];
			}

			if (data.hasOwnProperty("thumbnails-path")) {
				paths.thumbnail = data["thumbnails-path"];
			}

			if (data.hasOwnProperty("thumbnail-path")) {
				paths.thumbnail = data["thumbnail-path"];
			}

			if (data.hasOwnProperty("font-path")) {
				paths.font = data["font-path"];
			}

			return paths;
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

			// wrap devices in arrays (if single device of a type)
			if (data.hasOwnProperty("decklink") && data["decklink"].hasOwnProperty("device")) {
				if (!Array.isArray(data["decklink"]["device"])) {
					data["decklink"]["device"] = [data["decklink"]["device"]];
				}
			}
			if (data.hasOwnProperty("bluefish") && data["bluefish"].hasOwnProperty("device")) {
				if (!Array.isArray(data["bluefish"]["device"])) {
					data["bluefish"]["device"] = [data["bluefish"]["device"]];
				}
			}
			return data;
		}
	}

}