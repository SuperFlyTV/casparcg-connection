/**  */
export namespace config {
	export namespace v20x {
		export type paths = {"media-path": string, "log-path": string, "data-path": string, "template-path": string, "thumbnails-path"?: string};
	}
	export namespace v21x {
		export type paths = {"thumbnail-path": string, "font-path": string};

	}
	export namespace v207 {
		export type paths = v20x.paths & {"thumbnails-path": string};

	}
	export namespace v210 {
		export type paths = v20x.paths & v21x.paths;
	}

	/**  */
	export interface IConfig20x {
		paths: v20x.paths;
	}

	/**  */
	export interface IConfig21x extends IConfig20x {
		paths: v210.paths;
	}

	/**  */
	export interface IConfig207 extends IConfig20x {
		paths: v207.paths;
	}

	/**  */
	export interface IConfig210 extends IConfig21x {

	}

	/** */
	export class Config207 implements IConfig207 {
		public paths: v207.paths;
	}

	/** */
	export class Config210 implements IConfig210 {
		public paths: v210.paths;
	}
}

let bar: config.Config207 = new config.Config207();
bar.paths = {"media-path": "foo", "template-path": "bar", "log-path": "foo", "data-path": "lol", "thumbnails-path": "ja"};

let foo: config.Config210 = new config.Config210();
foo.paths = {"media-path": "foo", "template-path": "bar", "log-path": "foo", "data-path": "lol", "font-path": "loL"};