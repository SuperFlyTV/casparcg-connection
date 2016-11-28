import {JsonObject, JsonMember} from "typedjson-npm";

/**  */
export namespace Config {

	/** */
	export namespace v2xx {
		/** */
		export enum VideoModeEnum {
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
		export enum ChannelLayoutEnum {
			_mono,
			_stereo,
			_dts,
			_dolbye,
			_dolbydigital,
			_smpte,
			_passthru
		}

		export class Paths {
			mediaPath?: string | null;
			logPath?: string | null;
			dataPath?: string | null;
			templatePath?: string | null;
			thumbnailPath?: string | null;
			thumbnailsPath?: string | null;
			fontPath?: string | null;
		};

		/** */
		@JsonObject
		export class Consumer {
			@JsonMember({type: String, isRequired: true})	// @todo: custom "enum"-class for all props
			public _type: String;
		}

		/** */
		@JsonObject
		export class DecklinkConsumer extends Consumer {
			_type = "decklink";

			@JsonMember({type: Number})
			public device: number = 1;

			@JsonMember({type: Number, name: "key-device"})
			public keyDevice: Number;

			@JsonMember({type: Boolean, name: "embedded-audio"})
			public embeddedAudio: boolean = false;

			@JsonMember({type: String, name: "channel-layout"})
			public channelLayout: string = "stereo";

			@JsonMember({type: String})
			public latency: string = "normal";

			@JsonMember({type: String})
			public keyer: string = "external";

			@JsonMember({type: Boolean, name: "key-only"})
			public keyOnly: boolean = false;

			@JsonMember({type: Number, name: "buffer-depth"})
			public bufferDepth: number = 3;

			@JsonMember({type: Boolean, name: "custom-allocator"})
			public customAllocator: boolean = true;	// @todo: ns 2.0 only
		}

		/** */
		@JsonObject
		export class BluefishConsumer extends Consumer {
			_type = "bluefish";

			@JsonMember({type: Number})
			public device: number = 1;

			@JsonMember({type: Boolean, name: "embedded-audio"})
			public embeddedAudio: boolean = false;

			@JsonMember({type: String, name: "channel-layout"})
			public channelLayout: string = "stereo";

			@JsonMember({type: Boolean, name: "key-only"})
			public keyOnly: boolean = false;
		}

		/** */
		@JsonObject
		export class SystemAudioConsumer extends Consumer {
			_type = "systemaudio";

			@JsonMember({type: String, name: "channel-layout"})
			public channelLayout: string = "stereo";

			@JsonMember({type: Number})
			public latency: number = 200;
		}

		/** */
		@JsonObject
		export class ScreenConsumer extends Consumer {
			_type = "screen";

			@JsonMember({type: Number})
			public device: number = 1;	// @todo: wrong default implemented in caspar, should be 0:::

			@JsonMember({type: String, name: "aspect-ratio"})
			public aspectRatio: string = "default";

			@JsonMember({type: String})
			public stretch: string = "fill";

			@JsonMember({type: Boolean})
			public windowed: boolean = true;

			@JsonMember({type: Boolean, name: "key-only"})
			public keyOnly: boolean = false;

			@JsonMember({type: Boolean, name: "auto-deinterlace"})
			public autoDeinterlace: boolean = true;

			@JsonMember({type: Boolean})
			public vsync: boolean = false;

			@JsonMember({type: Boolean})
			public borderless: boolean = false;

			@JsonMember({type: Boolean})
			public interactive: boolean = true;		// @todo: ns 2.1 only

			@JsonMember({type: String})
			public name: string = "Screen Consumer";	// @todo: ns 2.0 only
		}

		/** */
		@JsonObject
		export class NewtekIvgaConsumer extends Consumer {
			_type = "newtekivga";

			@JsonMember({type: String, name: "channel-layout"})
			public channelLayout: string = "stereo";	// @todo: ns 2.0 only

			@JsonMember({type: Boolean, name: "provide-sync"})
			public provideSync: boolean = true;		// @todo: ns 2.0 only
		}

		/** */
		@JsonObject
		export class FfmpegConsumer extends Consumer { // @todo: 2.1 ns
			_type = "ffmpeg";

			@JsonMember({type: String})
			public path: String;

			@JsonMember({type: String})
			public args: String;

			@JsonMember({type: Boolean, name: "separate-key"})
			public separateKey: boolean = false;

			@JsonMember({type: Boolean, name: "mono-streams"})
			public monoStreams: boolean = false;
		}

		/** */
		@JsonObject
		export class FileConsumer extends Consumer { // @todo: 2.0 ns
			_type = "file";

			@JsonMember({type: String})
			public path: String;

			@JsonMember({type: String})
			public vcodec: string = "libx264";

			@JsonMember({type: Boolean, name: "separate-key"})
			public separateKey: boolean = false;
		}

		/** */
		@JsonObject
		export class StreamConsumer extends Consumer { // @todo: 2.0 ns
			_type = "stream";

			@JsonMember({type: String})
			public path: String;

			@JsonMember({type: String})
			public args: String;
		}

		/** */
		@JsonObject
		export class SynctoConsumer extends Consumer { // @todo: 2.1 ns
			_type = "syncto";

			@JsonMember({type: Number, name: "channel-id"})
			public channelId: Number;
		}

		/** */
		@JsonObject
		export class Channel {
			consumers?: Array<Consumer> = [];

			@JsonMember({type: String, isRequired: true})
			public _type: String;

			@JsonMember({type: String, isRequired: true, name: "video-mode"})	// @todo: custom "enum"-class
			videoMode: string = "PAL";

			@JsonMember({type: Boolean, name: "straight-alpha-output"})
			straightAlphaOutput?: boolean = false;

			@JsonMember({type: String, name: "channel-layout"})		// @todo: custom "enum"-class
			channelLayout?: string = "stereo";

			@JsonMember({type: Array, elements: Object, isRequired: true, name: "consumers"})
			public get _consumers(): Array<Object> {
				return this.consumers || [];
			}

			/** */
			public set _consumers(consumers: Array<Object>) {
				consumers.forEach((i: Object) => {
					if (i.hasOwnProperty("_type")) {
						let className: string = i["_type"];

						let dashBlocks: Array<string> = className.split(/-/);
						className = dashBlocks.map((i) => {return i.charAt(0).toUpperCase() + i.slice(1); }).join("") + "Consumer";
						if (v2xx[className]) {
							let consumer: Consumer = new v2xx[className]();
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
			public chromaKey?: boolean | null;

			@JsonMember({type: Boolean, name: "blend-modes"})
			blendModes: boolean = false;

			@JsonMember({type: Boolean, name: "straight-alpha"})
			straightAlpha: boolean = false;

			@JsonMember({type: Boolean, name: "mipmapping-default-on"})
			mipmappingDefaultOn: boolean = false;
		}

		/** */
		@JsonObject
		export class Controller {
			@JsonMember({type: String, isRequired: true})
			public _type: String;

			@JsonMember({type: Number, isRequired: true})
			public port: number;

			@JsonMember({type: String, isRequired: true})
			public protocol: String;
		}

		/** */
		@JsonObject
		export class OscClient {

			@JsonMember({type: String, isRequired: true})
			public _type: string;

			@JsonMember({type: String, isRequired: true})
			public address: String;

			@JsonMember({type: Number, isRequired: true})
			public port: number;
		}

		/** */
		@JsonObject
		export class Thumbnails { // @todo: isRequired on childs?
			@JsonMember({type: Boolean, name: "generate-thumbnails" , isRequired: true})
			public generateThumbnails: boolean = true;

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

		/** */
		@JsonObject
		export class Flash {
			@JsonMember({type: String, name: "buffer-depth"})
			bufferDepth: string = "auto";
		}

		/** */
		@JsonObject
		export class TemplateHost {
			@JsonMember({type: String, isRequired: true})
			public _type: string;

			@JsonMember({type: String, isRequired: true, name: "video-mode"})	// @todo: enum
			public videoMode: string;

			@JsonMember({type: String, isRequired: true})	// @todo: enum
			public filename: string;

			@JsonMember({type: Number, isRequired: true})
			public width: number;

			@JsonMember({type: Number, isRequired: true})
			public height: number;
		}

		/**  */
		@JsonObject
		export class Osc {

			public disableSendToAmcpClient?: boolean | null;

			@JsonMember({type: Number, isRequired: false, name: "default-port"})
			public defaultPort: number = 6250;

			@JsonMember({type: Array, elements: OscClient, isRequired: true, name: "predefined-clients"})
			public predefinedClients: Array<OscClient> = [new OscClient()];
		}

		/**  */
		@JsonObject
		export class ChannelLayout {
			@JsonMember({type: String, isRequired: true})
			public _type: string;

			@JsonMember({type: String, isRequired: true})
			public name: string;

			@JsonMember({type: String, isRequired: true})
			public type: string;

			@JsonMember({type: Number, isRequired: true, name: "num-channels"})
			public numChannels: number;

			@JsonMember({type: String, isRequired: true})
			public channels: string;
		}

		/**  */
		@JsonObject
		export class MixConfig {
			@JsonMember({type: String, isRequired: true})
			public _type: string;

			@JsonMember({type: String, isRequired: true})
			public from: string;

			@JsonMember({type: String, isRequired: true})
			public to: string;

			@JsonMember({type: String, isRequired: true})
			public mix: string;

			@JsonMember({type: Array, elements: String, isRequired: true})
			public mappings: Array<string> = [];
		}

		/**  */
		@JsonObject
		export class Audio {
			@JsonMember({type: Array, elements: v2xx.ChannelLayout, isRequired: true, name: "channel-layouts"})
			public channelLayouts: Array<v2xx.ChannelLayout> = [];

			@JsonMember({type: Array, elements: v2xx.MixConfig, isRequired: true, name: "mix-configs"})
			public mixConfigs: Array<v2xx.MixConfig> = [];
		}
	}

	/** */
	export namespace v207 {
		/** */
		@JsonObject
		export class Paths extends v2xx.Paths {
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
		export class Mixer extends v2xx.Mixer {
			@JsonMember({type: Boolean, name: "chroma-key"})
			chromaKey: boolean = false;
		}

		/**  */
		@JsonObject
		export class Thumbnails extends v2xx.Thumbnails {
			@JsonMember({type: Boolean, isRequired: true})
			public mipmap: boolean = false;
		}
	}

	/** */
	export namespace v21x {
		/** */
		@JsonObject
		export class Paths extends v2xx.Paths {
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

		/**  */
		@JsonObject
		export class Mixer extends v2xx.Mixer {}

		/**  */
		@JsonObject
		export class Thumbnails extends v2xx.Thumbnails {
			@JsonMember({type: Boolean, isRequired: true})
			public mipmap: boolean = true;
		}

		/** */
		@JsonObject
		export class Html {
			@JsonMember({type: Number, name: "remote-debugging-port"})
			remoteDebuggingPort: number = 0;	// @todo: valid range = 0|1024-6535
		}

		/**  */
		@JsonObject
		export class Osc extends v2xx.Osc {
			@JsonMember({type: Boolean, isRequired: true, name: "disable-send-to-amcp-clients"})
			public disableSendToAmcpClient: boolean = false;
		}

		/**  */
		@JsonObject
		export class ChannelLayout {
			@JsonMember({type: String, isRequired: true})
			public _type: string;

			@JsonMember({type: String, isRequired: true})
			public name: string;

			@JsonMember({type: String, isRequired: true})
			public type: string;

			@JsonMember({type: Number, isRequired: true, name: "num-channels"})
			public numChannels: number;

			@JsonMember({type: String, isRequired: true, name: "channel-order"})
			public channelOrder: string;
		}

		/**  */
		@JsonObject
		export class MixConfig {
			@JsonMember({type: String, isRequired: true})
			public _type: string;

			@JsonMember({type: String, isRequired: true, name: "from-type"})
			public fromType: string;

			@JsonMember({type: String, isRequired: true, name: "to-types"})
			public toTypes: string;

			@JsonMember({type: String, isRequired: true})
			public mix: string;
		}

		/**  */
		@JsonObject
		export class Audio {
			@JsonMember({type: Array, elements: v21x.ChannelLayout, isRequired: true, name: "channel-layouts"})
			public channelLayouts: Array<v21x.ChannelLayout> = [];

			@JsonMember({type: Array, elements: v21x.MixConfig, isRequired: true, name: "mix-configs"})
			public mixConfigs: Array<v21x.MixConfig> = [];
		}

		/** */
		export enum ChannelLayoutEnum {
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
	export namespace v21x {
	}

	/**  */
	const defaultChannel_2xx: v2xx.Channel = {videoMode: "PAL", _consumers: [], _type: "channel"};
	const defaultAMCPController: v2xx.Controller = {_type: "tcp", port: 5250, protocol: "AMCP"};
	const defaultLOGController: v2xx.Controller = {_type: "tcp", port: 3250, protocol: "LOG"};

	// @todo: add interfaces

	/** */
	@JsonObject
	export class ConfigxxVO {
		@JsonMember({type: Array, elements: v2xx.Channel, isRequired: true})
		public channels: Array<v2xx.Channel> = [defaultChannel_2xx];
		@JsonMember({type: Boolean, name: "channel-grid"})
		public channelGrid: boolean = false;
		@JsonMember({type: v2xx.Flash})
		public flash: v2xx.Flash = new v2xx.Flash();
		@JsonMember({type: Array, elements: v2xx.TemplateHost, name: "template-hosts"})
		public templateHosts: Array<v2xx.TemplateHost> = [];
	}

	/** */
	@JsonObject
	export class Config207VO extends ConfigxxVO {
		@JsonMember({type: v207.Paths, isRequired: true})
		public paths: v207.Paths = new v207.Paths();
		@JsonMember({type: v207.Mixer})
		public mixer: v207.Mixer = new v207.Mixer();
		@JsonMember({type: String, name: "log-level"})	// @todo: enum
		public logLevel: string = "trace";				// @todo: differs from 2.1.0 default
		@JsonMember({type: Boolean, name: "atuo-deinterlace"})
		public autoDeinterlace: boolean = true;
		@JsonMember({type: Boolean, name: "auto-transcode"})
		public autoTranscode: boolean = true;
		@JsonMember({type: Number, name: "pipeline-tokens"})
		public pipelineTokens: number = 2;
		@JsonMember({type: Array, elements: v2xx.Controller, isRequired: true})
		public controllers: Array<v2xx.Controller> = [defaultAMCPController];
		@JsonMember({type: v207.Thumbnails})
		public thumbnails: v207.Thumbnails = new v207.Thumbnails();
		@JsonMember({type: v2xx.Osc})
		public osc: v2xx.Osc = new v2xx.Osc();
		@JsonMember({type: v2xx.Audio})
		public audio: v2xx.Audio = new v2xx.Audio();
	}

	/**  */
	@JsonObject
	export class Config210VO extends ConfigxxVO {
		@JsonMember({type: v21x.Paths, isRequired: true})
		public paths: v21x.Paths = new v21x.Paths();
		@JsonMember({type: String, name: "lock-clear-phrase"})
		public lockClearPhrase: string = "secret";
		@JsonMember({type: v21x.Mixer})
		public mixer: v21x.Mixer = new v21x.Mixer();
		@JsonMember({type: String, name: "log-level"})		// @todo: enum
		public logLevel: string = "info";					// @todo: differs from 2.0.7 default
		@JsonMember({type: String, name: "log-categories"}) // @todo: enum
		public logCategories: string = "communication";		// @todo, concated (comma-delimited) values in string
		@JsonMember({type: Boolean, name: "force-deinterlace"})
		public forceDeinterlace: boolean = false;
		@JsonMember({type: String})				// @todo: enum
		public accellerator: string = "auto";
		@JsonMember({type: Array, elements: v2xx.Controller, isRequired: true})
		public controllers: Array<v2xx.Controller> = [defaultAMCPController, defaultLOGController];
		@JsonMember({type: v21x.Thumbnails})
		public thumbnails: v21x.Thumbnails = new v21x.Thumbnails();
		@JsonMember({type: v21x.Html})
		public html: v21x.Html = new v21x.Html();
		@JsonMember({type: v21x.Osc})
		public osc: v21x.Osc = new v21x.Osc();
		@JsonMember({type: v21x.Audio})
		public audio: v21x.Audio = new v21x.Audio();
	}

	/** */
	export interface ICasparCGConfig {
		paths: v2xx.Paths;
		lockClearPhrase: string | null;
		channels: Array<v2xx.Channel>;
		mixer: v2xx.Mixer;
		controllers: Array<v2xx.Controller>;
		logLevel: string;
		logCategories: string | null;
		channelGrid: boolean;
		forceDeinterlace: boolean | null;
		autoDeinterlace: boolean | null;
		autoTranscode: boolean | null;
		pipelineTokens: number | null;
		accellerator: string | null;
		thumbnails: v21x.Thumbnails;
		flash: v2xx.Flash;
		html: v21x.Html;
		templateHosts: Array<v2xx.TemplateHost>;
		osc: v2xx.Osc;
		audio: v21x.Audio;
	}

	/** */
	export abstract class AbstractDefaultCasparCGConfig implements ICasparCGConfig {
		public paths: v2xx.Paths;
		public lockClearPhrase: string | null;
		public channels: Array<v2xx.Channel> = [];
		public mixer: v2xx.Mixer;
		public controllers: Array<v2xx.Controller> = [];
		public logLevel: string;
		public logCategories: string | null;
		public channelGrid: boolean;
		public forceDeinterlace: boolean | null;
		public autoDeinterlace: boolean | null;
		public autoTranscode: boolean | null;
		public pipelineTokens: number | null;
		public accellerator: string | null;
		public thumbnails: v21x.Thumbnails;
		public flash: v2xx.Flash;
		public html: v21x.Html;
		public templateHosts: Array<v2xx.TemplateHost>;
		public osc: v2xx.Osc;
		public audio: v21x.Audio;
	}


	/** */
	export class CasparCGConfig extends AbstractDefaultCasparCGConfig implements ICasparCGConfig {
		/** */
		public constructor(initConfigVO?: Config207VO | Config210VO | {}) {
			super();
			if (initConfigVO) {
				if (initConfigVO instanceof Config207VO) {
					this.fromV207ConfigVO(initConfigVO);
				}else if (initConfigVO instanceof Config210VO) {
					this.fromV210ConfigVO(initConfigVO);
				}
			}
		}

		/** */
		public fromV207ConfigVO(configVO: Config207VO): void {
			// paths
			this.paths = new v21x.Paths();
			this.paths.mediaPath = configVO.paths.mediaPath;
			this.paths.logPath = configVO.paths.logPath;
			this.paths.dataPath = configVO.paths.dataPath;
			this.paths.templatePath = configVO.paths.templatePath;
			this.paths.thumbnailPath = configVO.paths.thumbnailsPath;
			this.paths.fontPath = null;

			// lock clear phrase
			this.lockClearPhrase = null;

			// channels
			this.channels = configVO.channels;

			// mixer
			this.mixer = configVO.mixer;

			// controllers
			this.controllers = configVO.controllers;

			// log level
			this.logLevel = configVO.logLevel;

			// log categories
			this.logCategories = null;

			// channel grid
			this.channelGrid = configVO.channelGrid;

			// force deinterlace
			this.forceDeinterlace = null;

			// auto deinterlace
			this.autoDeinterlace = configVO.autoDeinterlace;

			// auto transcode
			this.autoTranscode = configVO.autoTranscode;

			// pipeline tokens
			this.pipelineTokens = configVO.pipelineTokens;

			// accellerator
			this.accellerator = null;

			// thumbnails
			this.thumbnails = configVO.thumbnails;

			// flash
			this.flash = configVO.flash;

			// html
			this.html = {remoteDebuggingPort: -1};	// @todo: default null

			// template hosts
			this.templateHosts = configVO.templateHosts;

			// osc
			this.osc = new v2xx.Osc();
			this.osc.defaultPort = configVO.osc.defaultPort;
			this.osc.disableSendToAmcpClient = null;
			this.osc.predefinedClients = configVO.osc.predefinedClients;

			// audio
			this.audio = new v21x.Audio();
			this.audio.channelLayouts = new Array<v21x.ChannelLayout>();
			configVO.audio.channelLayouts.forEach((i: v2xx.ChannelLayout) => {
				let channelLayout: v21x.ChannelLayout = new v21x.ChannelLayout();
				channelLayout._type = i._type;
				channelLayout.channelOrder = i.channels;
				channelLayout.name = i.name;
				channelLayout.numChannels = i.numChannels;
				channelLayout.type = i.type;
				this.audio.channelLayouts.push(channelLayout);
			});
			this.audio.mixConfigs = new Array<v21x.MixConfig>();
			configVO.audio.mixConfigs.forEach((i: v2xx.MixConfig) => {
				let mixConfig: v21x.MixConfig = new v21x.MixConfig();
				mixConfig._type = i._type;
				mixConfig.fromType = i.from;
				mixConfig.mix = "";	// @todo: algorithm for converting 207 to 210 mix
				mixConfig.toTypes = i.to;
				this.audio.mixConfigs.push(mixConfig);
			});
		}

		/** */
		public fromV210ConfigVO(configVO: Config210VO): void {
			// paths
			this.paths = configVO.paths;

			// lock clear phrase
			this.lockClearPhrase = configVO.lockClearPhrase;

			// channels
			this.channels = configVO.channels;

			// mixer
			this.mixer = new v2xx.Mixer();
			this.mixer.blendModes = configVO.mixer.blendModes;
			this.mixer.chromaKey = null;
			this.mixer.mipmappingDefaultOn = configVO.mixer.mipmappingDefaultOn;
			this.mixer.straightAlpha = configVO.mixer.straightAlpha;

			// controllers
			this.controllers = configVO.controllers;

			// log level
			this.logLevel = configVO.logLevel;

			// log categories
			this.logCategories = configVO.logCategories;

			// channel grid
			this.channelGrid = configVO.channelGrid;

			// force deinterlace
			this.forceDeinterlace = configVO.forceDeinterlace;

			// auto deinterlace
			this.autoDeinterlace = null;

			// auto transcode
			this.autoTranscode = null;

			// pipeline tokens
			this.pipelineTokens = -1; // @todo: null value

			// accellerator
			this.accellerator = configVO.accellerator;

			// thumbnails
			this.thumbnails = configVO.thumbnails;

			// flash
			this.flash = configVO.flash;

			// html
			this.html = configVO.html;

			// template hosts
			this.templateHosts = configVO.templateHosts;

			// osc
			this.osc = configVO.osc;

			// audio
			this.audio = configVO.audio;
		}

		/** */
		public toV207ConfigVO(): Config207VO { return new Config207VO(); }

		/** */
		public toV210ConfigVO(): Config210VO { return new Config210VO(); }

		/** */
		public toV207ConfigXML(): XMLDocument {return new XMLDocument(); }

		/** */
		public toV210ConfigXML(): XMLDocument {return new XMLDocument(); }
	}
}