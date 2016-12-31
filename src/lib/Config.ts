import {create as xmlbuilder} from "xmlbuilder";
import {Options as OptionsNS} from "./AMCPConnectionOptions";
// Options NS
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
			import(): void;
			importFromV207Xml(): void;
			importFromV210Xml(): void;
			importFromV207Vo(): void;
			importFromV210Vo(): void;
			readonly vo: v207.CasparCGConfigVO | v21x.CasparCGConfigVO;
			readonly v207Vo: v207.CasparCGConfigVO;
			readonly v210Vo: v21x.CasparCGConfigVO;
			readonly xml: Object;
			readonly v207Xml: Object;
			readonly v210Xml: Object;
			readonly xmlString: string;
			readonly v207XmlString: string;
			readonly v210XmlString: string;
		}

		/** */
		export class CasparCGConfig {
			/** */
			public constructor(version: string);
			public constructor(initConfigVO: Config207VO | Config210VO | {});
			public constructor(initConfigVOOrString?: Config207VO | Config210VO | {} | string) {

			}
		}
	}

}