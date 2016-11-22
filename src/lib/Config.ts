import {JsonObject, JsonMember} from "typedjson-npm";
import * as _ from "highland";

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
			@JsonMember({type: String, isRequired: true})	// @todo: custom "enum"-class for all props
			public type: String;

			@JsonMember({type: Number, isRequired: false})
			public device?: Number;

			@JsonMember({type: Number, isRequired: false, name: "key-device"})
			public keyDevice?: Number;

			@JsonMember({type: String, isRequired: false, name: "embedded-audio"})
			public embeddedAudio?: String;

			@JsonMember({type: String, isRequired: false, name: "channel-layout"})
			public channelLayout?: String;

			@JsonMember({type: Object, isRequired: false})
			public latency?: String|Number;

			@JsonMember({type: String, isRequired: false})
			public keyer?: String;

			@JsonMember({type: String, isRequired: false, name: "key-only"})
			public keyOnly?: String;

			@JsonMember({type: Number, isRequired: false, name: "buffer-depth"})
			public bufferDepth?: Number;

			@JsonMember({type: String, isRequired: false, name: "aspect-ratio"})
			public aspectRatio?: String;

			@JsonMember({type: String, isRequired: false})
			public stretch?: String;

			@JsonMember({type: String, isRequired: false})
			public windowed?: String;

			@JsonMember({type: String, isRequired: false, name: "auto-deinterlace"})
			public autoDeinterlace?: String;

			@JsonMember({type: String, isRequired: false})
			public vsync?: String;

			@JsonMember({type: String, isRequired: false})
			public interactive?: String;

			@JsonMember({type: String, isRequired: false})
			public borderless?: String;

			@JsonMember({type: String, isRequired: false})
			public path?: String;

			@JsonMember({type: String, isRequired: false})
			public args?: String;

			@JsonMember({type: String, isRequired: false, name: "separate-key"})
			public separateKey?: String;

			@JsonMember({type: String, isRequired: false, name: "mono-streams"})
			public monoStreams?: String;

			@JsonMember({type: String, isRequired: false})
			public vcodec?: String;

			@JsonMember({type: Number, isRequired: false, name: "channel-id"})
			public channelId?: Number;

			@JsonMember({type: String, isRequired: false, name: "custom-allocator"})
			public customAllocator?: String;

			@JsonMember({type: String, isRequired: false})
			public name?: String;

			@JsonMember({type: String, isRequired: false, name: "provide-sync"})
			public provideSync?: String;
		}

		/** */
		@JsonObject
		export class DecklinkConsumer extends Consumer {
			type = "decklink";
			device = 1;
			embeddedAudio = "false";
			channelLayout = "stereo";
			latency: String = "normal";
			keyer = "external";
			keyOnly = "false";
			bufferDepth = 3;
			customAllocator = "true";	// @todo: ns 2.0 only
		}

		/** */
		@JsonObject
		export class BluefishConsumer extends Consumer {
			type = "Bluefish";
			device = 1;
			embeddedAudio = "false";
			channelLayout = "stereo";
			keyOnly = "false";
		}

		/** */
		@JsonObject
		export class SystemAudioConsumer extends Consumer {
			type = "systemaudio";
			channelLayout = "stereo";
			latency: Number = 200;
		}

		/** */
		@JsonObject
		export class ScreenConsumer extends Consumer {
			type = "screen";
			device = 0;
			stretch = "fill";
			windowed = "true";
			keyOnly = "false";
			autoDeinterlace = "true";
			vsync = "false";
			borderless = "false";
			interactive = "true";		// @todo: ns 2.1 only
			name = "Screen Consumer";	// @todo: ns 2.0 only
		}

		/** */
		@JsonObject
		export class NewtekIvgaConsumer extends Consumer {
			type = "newtekivga";
			channelLayout = "stereo";	// @todo: ns 2.0 only
			provideSync = "true";		// @todo: ns 2.0 only
		}

		/** */
		@JsonObject
		export class FfmpegConsumer extends Consumer { // @todo: 2.1 ns
			type = "ffmpeg";
			path = "";
			args = "";
			separateKey = "false";
			monoStreams = "false";
		}

		/** */
		@JsonObject
		export class FileConsumer extends Consumer { // @todo: 2.0 ns
			type = "file";
			path = "";
			vcodec = "libx264";
			separateKey = "false";
		}

		/** */
		@JsonObject
		export class StreamConsumer extends Consumer { // @todo: 2.0 ns
			type = "stream";
			path = "";
			args = "";
		}

		/** */
		@JsonObject
		export class SynctoConsumer extends Consumer { // @todo: 2.1 ns
			type = "syncto";
			// defaults 
		}

		/** */
		@JsonObject
		export class Channel {
			_consumers: Array<Consumer> = [];

			@JsonMember({type: String, isRequired: true, name: "video-mode"})	// @todo: custom "enum"-class
			videoMode: string = "PAL";

			@JsonMember({type: String, name: "straight-alpha-output"})
			straightAlphaOutput?: String = "false";

			@JsonMember({type: Array, elements: Object, isRequired: true, name: "consumers"})
			public get consumers(): Array<Object> {
				return this._consumers;
			}

			/** */
			public set consumers(consumers: Array<Object>) {
				let consumer: Consumer | undefined;
				consumers.forEach((i: Object) => {
					if (i.hasOwnProperty("decklink")) {
						consumer = new DecklinkConsumer();
						_.extend(i["decklink"], consumer);
					} else if (i.hasOwnProperty("bluefish")) {
						consumer = new BluefishConsumer();
						_.extend(i["bluefish"], consumer);
					} else if (i.hasOwnProperty("system-audio")) {
						consumer = new SystemAudioConsumer();
						_.extend(i["ystem-audio"], consumer);
					} else if (i.hasOwnProperty("screen")) {
						consumer = new ScreenConsumer();
						_.extend(i["screen"], consumer);
					} else if (i.hasOwnProperty("newtek-ivga")) {
						consumer = new NewtekIvgaConsumer();
						_.extend(i["newtek-ivga"], consumer);
					} else if (i.hasOwnProperty("ffmpeg")) {
						consumer = new FfmpegConsumer();
						_.extend(i["ffmpeg"], consumer);
					} else if (i.hasOwnProperty("file")) {
						consumer = new FileConsumer();
						_.extend(i["file"], consumer);
					} else if (i.hasOwnProperty("stream")) {
						consumer = new StreamConsumer();
						_.extend(i["stream"], consumer);
					} else if (i.hasOwnProperty("syncto")) {
						consumer = new SynctoConsumer();
						_.extend(i["syncto"], consumer);
					}

					if (consumer) {
						this.consumers.push(consumer);
					}
					consumer = undefined;
				});
			}

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
	const defaultChannel_207: v207.Channel = {videoMode: "PAL", consumers: [], _consumers: []};
	const defaultChannel_21x: v21x.Channel = {videoMode: "PAL", consumers: [], _consumers: []};

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