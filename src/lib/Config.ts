import {JsonObject, JsonMember} from "typedjson-npm";

/**  */
export namespace Config {

	/** */
	export namespace v20x {
		/** */
		export class Paths {
			"media-path": string;
			"log-path": string;
			"data-path": string;
			"template-path": string;
		};

		/** */
		export class Channel {
			"video-mode": v20x.VideoMode;
			"straight-alpha-output"?: boolean;
			"consumers": Array<v20x.Consumer>;
		}

		/** */
		export enum VideoMode {
			_PAL,
			_NTSC,
			_576p2500,
			_720p2398,
			_720p2400,
			_720p2500,
			_720p5000,
			_720p2997,
			_720p5994,
			_720p3000,
			_720p6000,
			_1080p2398,
			_1080p2400,
			_1080i5000,
			_1080i5994,
			_1080i6000,
			_1080p2500,
			_1080p2997,
			_1080p3000,
			_1080p5000,
			_1080p5994,
			_1080p6000,
			_1556p2398,
			_1556p2400,
			_1556p2500,
			_dci1080p2398,
			_dci1080p2400,
			_dci1080p2500,
			_2160p2398,
			_2160p2400,
			_2160p2500,
			_2160p2997,
			_2160p3000,
			_dci2160p2398,
			_dci2160p2400,
			_dci2160p2500
		}

		/** */
		export enum ChannelLayout {
			_mono,
			_stereo,
			_dts,
			_dolbye,
			_dolbydigital,
			_smpte,
			_passthru
		}

		/** */
		export interface Consumer {

		}
	}

	/** */
	export namespace v207 {
		/** */
		export class Paths extends v20x.Paths {
			"thumbnails-path": string;
		};

		/** */
		export class Channel extends v20x.Channel {
			"channel-layout"?: v20x.ChannelLayout;
		}
	}

	/** */
	export namespace v21x {
		/** */
		export class Paths extends v20x.Paths {
			"thumbnail-path": string;
			"font-path": string;
		};

		/** */
		export class Channel extends v20x.Channel {
			"channel-layout"?: v21x.ChannelLayout;
		};

		/** */
		export enum ChannelLayout {
			_mono,
			_stereo,
			_matrix,
			_film,
			_smpte,
			_ebu_r123_8a,
			_ebu_r123_8b,
			_8ch,
			_16ch
		}
	}


	/** */
	export namespace v210 {
		/** */
		export class Paths extends v21x.Paths {

		}
	}

	/**  */
	const defaultPaths_207: v207.Paths = {"media-path": "media\\", "log-path": "log\\", "data-path": "data\\", "template-path": "templates\\", "thumbnails-path": "thumbnails\\"};
	const defaultPaths_210: v210.Paths = {"media-path": "media/", "log-path": "log/", "data-path": "data/", "template-path": "template/", "thumbnail-path": "thumbnail/", "font-path": "font/"};
	const defaultChannel_207: v207.Channel = {"video-mode": v20x.VideoMode._PAL, "consumers": []};
	const defaultChannel_21x: v21x.Channel = {"video-mode": v20x.VideoMode._PAL, "consumers": []};

	/**  */
	export interface IConfig20x {
		paths: v20x.Paths;
	}

	/**  */
	export interface IConfig21x extends IConfig20x {
		paths: v210.Paths;

	}

	/**  */
	export interface IConfig207 extends IConfig20x {
		paths: v207.Paths;
		channels: Array<v207.Channel>;
	}

	/**  */
	export interface IConfig210 extends IConfig21x {
		channels: Array<v21x.Channel>;
	}

	/** */
	@JsonObject
	export class Config207 implements IConfig207 {
		@JsonMember({type: v207.Paths})
		public paths: v207.Paths = defaultPaths_207;
		@JsonMember({type: Array, elementType: v207.Channel})
		public channels: Array<v207.Channel> = [defaultChannel_207];
	}

	/**  */
	export class Config210 implements IConfig210 {
		public paths: v210.Paths = defaultPaths_210;
		public channels: Array<v21x.Channel> = [defaultChannel_21x];
	}
}