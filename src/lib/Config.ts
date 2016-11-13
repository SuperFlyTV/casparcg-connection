import {JsonObject, JsonMember} from "typedjson-npm";

/**  */
export namespace Config {

	/** */
	export namespace v20x {
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
		@JsonObject
		export class Consumer {
			public foo: String;
		}

		/** */
		export class Decklink {

		}

		/** */
		export class Bluefish {

		}

		/** */
		export class SystemAudio {

		}

		/** */
		export class Screen {

		}

		/** */
		export class NewtekIvga {

		}

		/** */
		export class Ffmpeg {

		}

		/** */
		export class Syncto { // @todo: 2.1 ns

		}

		/** */
		@JsonObject
		export class Channel {
			@JsonMember({type: String, isRequired: true, name: "video-mode"})	// @todo: custom "enum"-class
			videoMode: string = "PAL";

			@JsonMember({type: Boolean, name: "straight-alpha-output"})
			straightAlphaOutput?: boolean = false;

			@JsonMember({type: Array, elements: Object, isRequired: true})
			consumers: Array<Object> = [];
		}
	}

	/** */
	export namespace v207 {
		/** */
		@JsonObject
		export class Paths {
			@JsonMember({type: String, name: "media-path"})
			mediaPath: string = "media\\";

			@JsonMember({type: String, name: "log-path"})
			logPath: string = "log\\";

			@JsonMember({type: String, name: "data-path"})
			dataPath: string = "data\\";

			@JsonMember({type: String, name: "template-path"})
			templatePath: string = "templates\\";

			@JsonMember({type: String, name: "thumbnails-path"})
			thumbnailsPath: string = "thumbnails\\";
		};

		/** */
		@JsonObject
		export class Channel extends v20x.Channel {
			@JsonMember({type: String, name: "channel-layout"})		// @todo: custom "enum"-class
			channelLayout?: string = "stereo";
		}
	}

	/** */
	export namespace v21x {
		/** */
		@JsonObject
		export class Paths {
			@JsonMember({type: String, name: "media-path"})
			mediaPath: string = "media/";

			@JsonMember({type: String, name: "log-path"})
			logPath: string = "log/";

			@JsonMember({type: String, name: "data-path"})
			dataPath: string = "data/";

			@JsonMember({type: String, name: "template-path"})
			templatePath: string = "template/";

			@JsonMember({type: String, name: "thumbnail-path"})
			thumbnailPath: string = "thumbnail/";

			@JsonMember({type: String, name: "font-path"})
			fontPath: string = "font/";
		};

		/** */
		@JsonObject
		export class Channel extends v20x.Channel {
			@JsonMember({type: String, name: "channel-layout"})		// @todo: custom "enum"-class
			channelLayout?: string = "stereo";
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
		@JsonObject
		export class Paths extends v21x.Paths {

		}
	}

	/**  */
	const defaultChannel_207: v207.Channel = {videoMode: "PAL", consumers: []};
	const defaultChannel_21x: v21x.Channel = {videoMode: "PAL", consumers: []};

	/**  */
	export interface IConfig20x {
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
		@JsonMember({type: v207.Paths, isRequired: true})
		public paths: v207.Paths = new v207.Paths();
		@JsonMember({type: Array, elements: v207.Channel, isRequired: true})
		public channels: Array<v207.Channel> = [defaultChannel_207];
	}

	/**  */
	export class Config210 implements IConfig210 {
		@JsonMember({type: v210.Paths, isRequired: true})
		public paths: v210.Paths = new v210.Paths();
		@JsonMember({type: Array, elements: v21x.Channel, isRequired: true})
		public channels: Array<v21x.Channel> = [defaultChannel_21x];
	}
}