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
			@JsonMember({type: String, isRequired: true})	// @todo: custom "enum"-class for all props
			public type: String;
		}

		/** */
		@JsonObject
		export class DecklinkConsumer extends Consumer {
			type = "decklink";

			@JsonMember({type: Number, isRequired: false})
			public device: number = 1;

			@JsonMember({type: Number,  name: "key-device"})
			public keyDevice: Number;

			@JsonMember({type: String,  name: "embedded-audio"})
			public embeddedAudio: string = "false";

			@JsonMember({type: String,  name: "channel-layout"})
			public channelLayout: string = "stereo";

			@JsonMember({type: String, isRequired: false})
			public latency: string = "normal";

			@JsonMember({type: String, isRequired: false})
			public keyer: string = "external";

			@JsonMember({type: String,  name: "key-only"})
			public keyOnly: string = "false";

			@JsonMember({type: Number,  name: "buffer-depth"})
			public bufferDepth: number = 3;

			@JsonMember({type: String,  name: "custom-allocator"})
			public customAllocator: string = "true";	// @todo: ns 2.0 only
		}

		/** */
		@JsonObject
		export class BluefishConsumer extends Consumer {
			type = "Bluefish";

			@JsonMember({type: Number, isRequired: false})
			public device: number = 1;

			@JsonMember({type: String,  name: "embedded-audio"})
			public embeddedAudio: string = "false";

			@JsonMember({type: String,  name: "channel-layout"})
			public channelLayout: string = "stereo";

			@JsonMember({type: String,  name: "key-only"})
			public keyOnly: string = "false";
		}

		/** */
		@JsonObject
		export class SystemAudioConsumer extends Consumer {
			type: string = "systemaudio";

			@JsonMember({type: String,  name: "channel-layout"})
			public channelLayout: string = "stereo";

			@JsonMember({type: Number, isRequired: false})
			public latency: number = 200;
		}

		/** */
		@JsonObject
		export class ScreenConsumer extends Consumer {
			type = "screen";

			@JsonMember({type: Number, isRequired: false})
			public device: number = 0;

			@JsonMember({type: String,  name: "aspect-ratio"})
			public aspectRatio: string = "default";

			@JsonMember({type: String, isRequired: false})
			public stretch: string = "fill";

			@JsonMember({type: String, isRequired: false})
			public windowed: string = "true";

			@JsonMember({type: String,  name: "key-only"})
			public keyOnly: string = "false";

			@JsonMember({type: String,  name: "auto-deinterlace"})
			public autoDeinterlace: string = "true";

			@JsonMember({type: String, isRequired: false})
			public vsync: string = "false";

			@JsonMember({type: String, isRequired: false})
			public borderless: string = "false";

			@JsonMember({type: String, isRequired: false})
			public interactive: string = "true";		// @todo: ns 2.1 only

			@JsonMember({type: String, isRequired: false})
			public name: string = "Screen Consumer";	// @todo: ns 2.0 only
		}

		/** */
		@JsonObject
		export class NewtekIvgaConsumer extends Consumer {
			type = "newtekivga";

			@JsonMember({type: String,  name: "channel-layout"})
			public channelLayout: string = "stereo";	// @todo: ns 2.0 only

			@JsonMember({type: String,  name: "provide-sync"})
			public provideSync: string = "true";		// @todo: ns 2.0 only
		}

		/** */
		@JsonObject
		export class FfmpegConsumer extends Consumer { // @todo: 2.1 ns
			type: string = "ffmpeg";

			@JsonMember({type: String, isRequired: false})
			public path: String;

			@JsonMember({type: String, isRequired: false})
			public args: String;

			@JsonMember({type: String,  name: "separate-key"})
			public separateKey: string = "false";

			@JsonMember({type: String,  name: "mono-streams"})
			public monoStreams: string = "false";
		}

		/** */
		@JsonObject
		export class FileConsumer extends Consumer { // @todo: 2.0 ns
			type: string = "file";

			@JsonMember({type: String, isRequired: false})
			public path: String;

			@JsonMember({type: String, isRequired: false})
			public vcodec: string = "libx264";

			@JsonMember({type: String,  name: "separate-key"})
			public separateKey: string = "false";
		}

		/** */
		@JsonObject
		export class StreamConsumer extends Consumer { // @todo: 2.0 ns
			type = "stream";

			@JsonMember({type: String, isRequired: false})
			public path: String;

			@JsonMember({type: String, isRequired: false})
			public args: String;
		}

		/** */
		@JsonObject
		export class SynctoConsumer extends Consumer { // @todo: 2.1 ns
			type: string = "syncto";

			@JsonMember({type: Number,  name: "channel-id"})
			public channelId: Number;
		}

		/** */
		@JsonObject
		export class Channel {
			consumers?: Array<Consumer> = [];

			@JsonMember({type: String, isRequired: true, name: "video-mode"})	// @todo: custom "enum"-class
			videoMode: string = "PAL";

			@JsonMember({type: String, name: "straight-alpha-output"})
			straightAlphaOutput?: string = "false";

			@JsonMember({type: Array, elements: Object, isRequired: true, name: "consumers"})
			public get _consumers(): Array<Object> {
				return this.consumers || [];
			}

			/** */
			public set _consumers(consumers: Array<Object>) {
				consumers.forEach((i: Object) => {
					if (i.hasOwnProperty("type")) {
						let className: string = i["type"];

						let dashBlocks: Array<string> = className.split(/-|_/);
						className = dashBlocks.map((i) => {return i.charAt(0).toUpperCase() + i.slice(1); }).join("") + "Consumer";
						if (v20x[className]) {
							let consumer: Consumer = new v20x[className]();
							let consumerKey: string;
							for (let key in i) {
								let dashBlocks: Array<string> = key.split(/-|_/);
								consumerKey = dashBlocks.map((i, o) => {return o > 0 ? i.charAt(0).toUpperCase() + i.slice(1) : i; }).join("");
								if (!i.hasOwnProperty(key)) {
									continue;
								}
								if (consumer.hasOwnProperty(consumerKey)) {
									consumer[consumerKey] = i[key];
								}else {
								}
							}
							this.consumers!.push(consumer);
						}
					}
				});
			}
		}

		/** */
		@JsonObject
		export class Mixer {
			@JsonMember({type: String, name: "blend-modes"})
			blendModes: string = "false";

			@JsonMember({type: String, name: "straight-alpha"})
			straightAlpha: string = "false";

			@JsonMember({type: String, name: "mipmapping_default_on"})
			mipmappingDefaultOn: string = "false";
		}

		/** */
		@JsonObject
		export class Controller {
			@JsonMember({type: String, isRequired: true})
			public type: String;

			@JsonMember({type: Number, isRequired: true})
			public port: number;

			@JsonMember({type: String, isRequired: true})
			public protocol: String;
		}

		/** */
		@JsonObject
		export class Thumbnails { // @todo: isRequired on childs?
			@JsonMember({type: String, name: "generate-thumbnails" , isRequired: true})
			public generateThumbnails: string = "true";

			@JsonMember({type: Number, isRequired: true})
			public width: number = 256;

			@JsonMember({type: Number, isRequired: true})
			public height: number = 144;

			@JsonMember({type: Number, isRequired: true, name: "video-grid"})
			public videoGrid: number = 2;

			@JsonMember({type: Number, isRequired: true, name: "scan-interval-millis"})
			public scanIntervalMillis: number = 5000;

			@JsonMember({type: Number, isRequired: true, name: "generate-delay-millis"})
			public generateDelayMillis: number = 2000;

			@JsonMember({type: String, isRequired: true, name: "video-mode"})	// @todo: enum
			public videoMode: string = "720p5000";
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

		/** */
		@JsonObject
		export class Mixer extends v20x.Mixer {
			@JsonMember({type: String, name: "chroma-key"})
			chromaKey: string = "false";
		}

		/**  */
		@JsonObject
		export class Thumbnails extends v20x.Thumbnails {
			@JsonMember({type: String, isRequired: true})
			public mipMap: string = "false";
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

		/**  */
		@JsonObject
		export class Mixer extends v20x.Mixer {}

		/**  */
		@JsonObject
		export class Thumbnails extends v20x.Thumbnails {
			@JsonMember({type: String, isRequired: true})
			public mipMap: string = "true";
		}

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
	const defaultChannel_207: v207.Channel = {videoMode: "PAL", _consumers: []};
	const defaultChannel_21x: v21x.Channel = {videoMode: "PAL", _consumers: []};
	const defaultAMCPController: v20x.Controller = {type: "tcp", port: 5250, protocol: "AMCP"};
	const defaultLOGController: v20x.Controller = {type: "tcp", port: 3250, protocol: "LOG"};

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
		@JsonMember({type: v207.Mixer, isRequired: false})
		public mixer: v207.Mixer = new v207.Mixer();
		@JsonMember({type: Array, elements: v20x.Controller, isRequired: true})
		public controllers: Array<v20x.Controller> = [defaultAMCPController];
		@JsonMember({type: String,  name: "log-level"})	// @todo: enum
		public logLevel: string = "trace";				// @todo: differs from 2.1.0 default
		@JsonMember({type: String,  name: "channel-grid"})
		public channelGrid: string = "false";
		@JsonMember({type: String,  name: "atuo-deinterlace"})
		public autoDeinterlace: string = "true";
		@JsonMember({type: String,  name: "auto-transcode"})
		public autoTranscode: string = "true";
		@JsonMember({type: Number,  name: "pipeline-tokens"})
		public pipelineTokens: number = 2;
		@JsonMember({type: v207.Thumbnails, isRequired: false})
		public thumbnail: v207.Thumbnails = new v207.Thumbnails();
	}

	/**  */
	export class Config210 implements IConfig210 {
		@JsonMember({type: v210.Paths, isRequired: true})
		public paths: v210.Paths = new v210.Paths();
		@JsonMember({type: Array, elements: v21x.Channel, isRequired: true})
		public channels: Array<v21x.Channel> = [defaultChannel_21x];
		@JsonMember({type: String,  name: "lock-clear-phrase"})
		public lockClearPhrase: string = "secret";
		@JsonMember({type: v21x.Mixer, isRequired: false})
		public mixer: v21x.Mixer = new v21x.Mixer();
		@JsonMember({type: Array, elements: v20x.Controller, isRequired: true})
		public controllers: Array<v20x.Controller> = [defaultAMCPController, defaultLOGController];
		@JsonMember({type: String,  name: "log-level"})	// @todo: enum
		public logLevel: string = "info";				// @todo: differs from 2.0.7 default
		@JsonMember({type: String,  name: "log-categories"}) // @todo: enum
		public logCategories: string = "communication";		// @todo, concated (comma-delimited) values in string
		@JsonMember({type: String,  name: "channel-grid"})
		public channelGrid: string = "false";
		@JsonMember({type: String,  name: "force-deinterlace"})
		public forceDeinterlace: string = "false";
		@JsonMember({type: String})				// @todo: enum
		public accellerator: string = "auto";
		@JsonMember({type: v21x.Thumbnails, isRequired: false})
		public thumbnail: v21x.Thumbnails = new v21x.Thumbnails();
	}
}