import {create as XMLBuilder} from "xmlbuilder";
// Options NS
import {Options as OptionsNS} from "./AMCPConnectionOptions";
import ServerVersion = OptionsNS.ServerVersion;


/** */
export namespace Config {

	/** */
	export namespace v2xx {

	}

	/** */
	export namespace v207 {
		/** */
		export class CasparCGConfigVO {

		}
	}

	/** */
	export namespace v21x {

	}

	/** */
	export namespace v21x {

		/** */
		export class CasparCGConfigVO {

		}
	}

	/** */
	export namespace Intermediate {
		import Config207VO = v207.CasparCGConfigVO;
		import  Config210VO = v21x.CasparCGConfigVO;

		/** */
		export interface ICasparCGConfig {
			import(configVO: Object): void;
			importFromV207VO(configVO: Object): void;
			importFromV210VO(configVO: Object): void;
			readonly VO: v207.CasparCGConfigVO | v21x.CasparCGConfigVO;
			readonly v207VO: v207.CasparCGConfigVO;
			readonly v210VO: v21x.CasparCGConfigVO;
			readonly XML: Object | null;
			readonly v207XML: Object;
			readonly v210XML: Object;
			readonly XMLString: string;
			readonly v207XMLString: string;
			readonly v210XMLString: string;
			readonly _version: ServerVersion;
		}

		/** */
		export class CasparCGConfig implements ICasparCGConfig {

			private __version: ServerVersion;

			/** */
			public constructor(version: ServerVersion);
			public constructor(initConfigVO: Config207VO | Config210VO | {});
			public constructor(initVersionOrConfigVO?: Config207VO | Config210VO | {} | ServerVersion) {
				// is a version
				if (typeof initVersionOrConfigVO === "number") {
					if (initVersionOrConfigVO >= 2100) {
						this.__version = ServerVersion.V210;
					} else if (initVersionOrConfigVO === 2007) {
						this.__version = ServerVersion.V207;
					}
					return;
				}
				// is initVO
				if (initVersionOrConfigVO) {
					if (initVersionOrConfigVO instanceof Config207VO) {
						this.__version = ServerVersion.V207;
					} else if (initVersionOrConfigVO instanceof Config210VO) {
						this.__version = ServerVersion.V210;
					} else if ((typeof initVersionOrConfigVO === "object") && initVersionOrConfigVO["_version"]) {
						if (initVersionOrConfigVO["_version"] >= 2100) {
							this.__version = ServerVersion.V210;
						} else if (initVersionOrConfigVO["_version"] >= 2007) {
							this.__version = ServerVersion.V207;
						}
					}
					this.import(initVersionOrConfigVO);
				}
			}

			/** */
			public import(configVO: Object): void {
				if (this.__version === ServerVersion.V207) {
					this.importFromV207VO(configVO);
				} else if (this.__version === ServerVersion.V210) {
					this.importFromV210VO(configVO);
				}

				// @todo: throw error
			}

			/** */
			public importFromV207VO(configVO: Object): void {
				console.log(configVO);
			}

			/** */
			public importFromV210VO(configVO: Object): void {
				console.log(configVO);
			}

			/** */
			public get VO(): Config207VO | Config210VO {
				if (this.__version === ServerVersion.V207) {
					return this.v207VO;
				} else if (this.__version === ServerVersion.V210) {
					return this.v210VO;
				}
				return {}; // @todo: throw error
			}

			/** */
			public get v207VO(): Config207VO {
				let configVO: Config207VO = {};

				return configVO;
			}

			/** */
			public get v210VO(): Config210VO {
				let configVO: Config210VO = {};

				return configVO;
			}

			/** */
			public get XML(): Object | null {
				if (this.__version === ServerVersion.V207) {
					return this.v207XML;
				} else if (this.__version === ServerVersion.V210) {
					return this.v210XML;
				}
				return null; // @todo: throw error
			}

			/** */
			public get v207XML(): Object {
				let xml = XMLBuilder("configuration");

				return xml;
			}

			/** */
			public get v210XML(): Object {
				let xml = XMLBuilder("configuration");

				return xml;
			}

			/** */
			public get XMLString(): string {
				if (this.__version === ServerVersion.V207) {
					return this.v207XMLString;
				} else if (this.__version === ServerVersion.V210) {
					return this.v210XMLString;
				}
				return ""; // @todo: throw error
			}

			/** */
			public get v207XMLString(): string {
				return this.v207XML["end"]({pretty: true});
			}

			/** */
			public get v210XMLString(): string {
				return this.v210XML["end"]({pretty: true});
			}

			/** */
			public get _version(): ServerVersion {
				return this.__version;
			}

		}

	}
}