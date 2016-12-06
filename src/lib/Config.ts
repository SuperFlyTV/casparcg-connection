import {JsonObject, JsonMember} from "typedjson-npm";
import {create as xmlbuilder} from "xmlbuilder";
import {Options as OptionsNS} from "./AMCPConnectionOptions";
// Options NS
import ServerVersion = OptionsNS.ServerVersion;

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
			public _type: string;
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
			_type = "system-audio";

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
			public path: string;

			@JsonMember({type: String})
			public args: string;

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
			public path: string;

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
			public path: string;

			@JsonMember({type: String})
			public args: string;
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
			consumers: Array<Consumer> = [];

			@JsonMember({type: String, isRequired: true})
			public _type: string;

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
			@JsonMember({type: String})
			public _type: string;

			@JsonMember({type: Number})
			public port: number;

			@JsonMember({type: String})
			public protocol: string;
		}

		/** */
		@JsonObject
		export class OscClient {

			@JsonMember({type: String})
			public _type: string;

			@JsonMember({type: String})
			public address: string;

			@JsonMember({type: Number})
			public port: number;
		}

		/** */
		@JsonObject
		export class Thumbnails { // @todo: isRequired on childs?
			@JsonMember({type: Boolean, name: "generate-thumbnails" })
			public generateThumbnails: boolean = true;

			@JsonMember({type: Number})
			public width: number = 256;

			@JsonMember({type: Number})
			public height: number = 144;

			@JsonMember({type: Number, name: "video-grid"})
			public videoGrid: number = 2;

			@JsonMember({type: Number, name: "scan-interval-millis"})
			public scanIntervalMillis: number = 5000;

			@JsonMember({type: Number, name: "generate-delay-millis"})
			public generateDelayMillis: number = 2000;

			@JsonMember({type: String, name: "video-mode"})	// @todo: enum
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
			@JsonMember({type: String})
			public _type: string;

			@JsonMember({type: String, name: "video-mode"})	// @todo: enum
			public videoMode: string;

			@JsonMember({type: String})	// @todo: enum
			public filename: string;

			@JsonMember({type: Number})
			public width: number;

			@JsonMember({type: Number})
			public height: number;
		}

		/**  */
		@JsonObject
		export class Osc {

			public disableSendToAmcpClient?: boolean | null;

			@JsonMember({type: Number, name: "default-port"})
			public defaultPort: number = 6250;

			@JsonMember({type: Array, elements: OscClient, name: "predefined-clients"})
			public predefinedClients: Array<OscClient> = [];
		}

		/**  */
		@JsonObject
		export class ChannelLayout {
			@JsonMember({type: String})
			public _type: string;

			@JsonMember({type: String})
			public name: string;

			@JsonMember({type: String})
			public type: string;

			@JsonMember({type: Number, name: "num-channels"})
			public numChannels: number;

			@JsonMember({type: String})
			public channels: string;
		}

		/**  */
		@JsonObject
		export class MixConfig {
			@JsonMember({type: String})
			public _type: string;

			@JsonMember({type: String})
			public from: string;

			@JsonMember({type: String})
			public to: string;

			@JsonMember({type: String})
			public mix: string;

			@JsonMember({type: Array, elements: String})
			public mappings: Array<string> = [];
		}

		/**  */
		@JsonObject
		export class Audio {
			@JsonMember({type: Array, elements: v2xx.ChannelLayout, name: "channel-layouts"})
			public channelLayouts: Array<v2xx.ChannelLayout> = [];

			@JsonMember({type: Array, elements: v2xx.MixConfig, name: "mix-configs"})
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
			@JsonMember({type: Boolean})
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
			@JsonMember({type: Boolean})
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
			@JsonMember({type: Boolean, name: "disable-send-to-amcp-clients"})
			public disableSendToAmcpClient: boolean = false;
		}

		/**  */
		@JsonObject
		export class ChannelLayout {
			@JsonMember({type: String})
			public _type: string;

			@JsonMember({type: String})
			public name: string;

			@JsonMember({type: String})
			public type: string;

			@JsonMember({type: Number, name: "num-channels"})
			public numChannels: number;

			@JsonMember({type: String, name: "channel-order"})
			public channelOrder: string;
		}

		/**  */
		@JsonObject
		export class MixConfig {
			@JsonMember({type: String})
			public _type: string;

			@JsonMember({type: String, name: "from-type"})
			public fromType: string;

			@JsonMember({type: String, name: "to-types"})
			public toTypes: string;

			@JsonMember({type: String})
			public mix: string;
		}

		/**  */
		@JsonObject
		export class Audio {
			@JsonMember({type: Array, elements: v21x.ChannelLayout, name: "channel-layouts"})
			public channelLayouts: Array<v21x.ChannelLayout> = [];

			@JsonMember({type: Array, elements: v21x.MixConfig, name: "mix-configs"})
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
	const defaultChannel_2xx: v2xx.Channel = {videoMode: "PAL", _consumers: [], consumers: [], _type: "channel"};
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
		public paths: v2xx.Paths = new v2xx.Paths();
		public lockClearPhrase: string | null = null;
		public channels: Array<v2xx.Channel> = [];
		public mixer: v2xx.Mixer = new v2xx.Mixer();
		public controllers: Array<v2xx.Controller> = [];
		public logLevel: string = "";
		public logCategories: string | null = null;
		public channelGrid: boolean = false;
		public forceDeinterlace: boolean | null = null;
		public autoDeinterlace: boolean | null = null;
		public autoTranscode: boolean | null = null;
		public pipelineTokens: number | null = null;
		public accellerator: string | null = null;
		public thumbnails: v21x.Thumbnails = new v21x.Thumbnails;
		public flash: v2xx.Flash = new v2xx.Flash();
		public html: v21x.Html = new v21x.Html();
		public templateHosts: Array<v2xx.TemplateHost> = [];
		public osc: v2xx.Osc = new v2xx.Osc;
		public audio: v21x.Audio = new v21x.Audio;
	}

	/** */	export class CasparCGConfig extends AbstractDefaultCasparCGConfig implements ICasparCGConfig {
		private mode: ServerVersion = ServerVersion.V2xx;

		/** */
		public constructor(version: string);
		public constructor(initConfigVO: Config207VO | Config210VO | {});
		public constructor(initConfigVOOrString?: Config207VO | Config210VO | {} | string) {
			super();
			if (typeof initConfigVOOrString === "object") {
				let initConfigVO: Config207VO | Config210VO | {} = initConfigVOOrString;
				if (initConfigVO instanceof Config207VO) {
					this.mode = ServerVersion.V207;
					this.fromV207ConfigVO(initConfigVO);
				}else if (initConfigVO instanceof Config210VO) {
					this.mode = ServerVersion.V210;
					this.fromV210ConfigVO(initConfigVO);
				}else {
					this.import(initConfigVO);
				}
			}else if (typeof initConfigVOOrString === "string") {
				let versionString: string = initConfigVOOrString;
				if (versionString === "2.0.7") {
					this.mode = ServerVersion.V207;
				}else if (versionString === "2.1.0") {
					this.mode = ServerVersion.V210;
				}
			}
		}

		/** */
		public import(configVO: Object): void {
			for (let key in configVO) {
				if (configVO.hasOwnProperty(key) && this.hasOwnProperty(key)) {
					this[key] = configVO[key];
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
		public get V207ConfigVO(): Config207VO { return new Config207VO(); }

		/** */
		public get V210ConfigVO(): Config210VO { return new Config210VO(); }

		/** */
		public get configXML(): string {
			if (this.mode === ServerVersion.V207) {
					return this.V207ConfigXML;
			} else if (this.mode === ServerVersion.V210) {
				return this.V210ConfigXML;
			}
			return "";
		}

		/** */
		public get V207ConfigXML(): string {return ""; }

		/** */
		public get V210ConfigXML(): string {
			let root = xmlbuilder("configuration");

			// paths
			CasparCGConfig.addFormattedXMLChildsFromObject(root.ele("paths"), this.paths); // , ["mediaPath", "logPath", "dataPath", "templatePath", "thumbnailPath", "fontpath"]);

			// channels
			let channels = root.ele("channels");
			this.channels.forEach((i) => {
				let channel = channels.ele("channel");
				CasparCGConfig.addFormattedXMLChildsFromObject(channel, i, ["_type", "consumers", "_consumers"]);

				// consumer
				let consumers = channel.ele("consumers");
				i.consumers.forEach((i) => {
					let consumer = consumers.ele(i._type);
					CasparCGConfig.addFormattedXMLChildsFromObject(consumer, i, ["_type"]);
				});
			});

			// controllers
			let controllers = root.ele("controllers");
			this.controllers.forEach((i) => {
				let controller = controllers.ele(i._type);
				CasparCGConfig.addFormattedXMLChildsFromObject(controller, i, ["_type"]);
			});

			// all root-level single values
			CasparCGConfig.addFormattedXMLChildsFromArray(root, this, ["lockClearPhrase", "logLevel", "logCategories", "forceDeinterlace", "channelGrid", "accellerator"]);

			// mixer
			if (this.mixer) {
				CasparCGConfig.addFormattedXMLChildsFromObject(root.ele("mixer"), this.mixer);
			}

			// flash
			if (this.flash) {
				CasparCGConfig.addFormattedXMLChildsFromObject(root.ele("flash"), this.flash);
			}

			// html
			if (this.html) {
				CasparCGConfig.addFormattedXMLChildsFromObject(root.ele("html"), this.html);
			}

			// template hosts
			if (this.templateHosts && this.templateHosts.length > 0) {
				let templateHosts = root.ele("template-hosts");
				this.templateHosts.forEach((i) => {
					let templatehost = templateHosts.ele(i._type);
					CasparCGConfig.addFormattedXMLChildsFromObject(templatehost, i, ["_type"]);
				});
			}

			// thumbnails
			if (this.thumbnails) {
				CasparCGConfig.addFormattedXMLChildsFromObject(root.ele("thumbnails"), this.thumbnails);
			}

			// osc
			if (this.osc) {
				let osc = root.ele("osc");
				CasparCGConfig.addFormattedXMLChildsFromArray(osc, this.osc, ["defaultPort", "disableSendToAmcpClient"]);
				// predefined clients
				if (this.osc.predefinedClients && this.osc.predefinedClients.length > 0) {
					let predefinedClients = osc.ele("predefined-clients");
					this.osc.predefinedClients.forEach((i) => {
						console.log(i);
						predefinedClients;
						let client = predefinedClients.ele(i._type);
						CasparCGConfig.addFormattedXMLChildsFromObject(client, i, ["_type"]);
					});
				}
			}

			// audio
			if (this.audio && ((this.audio.channelLayouts && this.audio.channelLayouts.length > 0) || (this.audio.mixConfigs && this.audio.mixConfigs.length > 0))) {
				let audio = root.ele("audio");
				if (this.audio.channelLayouts && this.audio.channelLayouts.length > 0) {
					let channelLayouts = audio.ele("channel-layouts");
					this.audio.channelLayouts.forEach((i) => {
						let channelLayout = channelLayouts.ele("channel-layout");
						if (i.name) channelLayout.att("name", i.name);
						if (i.type) channelLayout.att("type", i.type);
						if (i.numChannels) channelLayout.att("num-channels", i.numChannels);
						if (i.channelOrder) channelLayout.att("channel-order", i.channelOrder);
					});
				}
				if (this.audio.mixConfigs && this.audio.mixConfigs.length > 0) {
					let mixConfigs = audio.ele("mix-configs");
					this.audio.mixConfigs.forEach((i) => {
						mixConfigs.ele("mix-config")
						.att("from-type", i.fromType)
						.att("to-types", i.toTypes)
						.att("mix", i.mix);
					});
				}
			}

			return root.end({pretty: true});
		}

		/** */
		static addFormattedXMLChildsFromObject(root: Object, data: Object, blacklist?: Array<string>): Object {
			blacklist && blacklist.push("arrayNo", "array-no");
			for (let key in data) {
				if ((key === "constructor") || (blacklist && blacklist.indexOf(key) > -1)) {
					continue;
				}
				let value: string = data[key];
				if (value !== null && value !== "") {
					let keyBlocks: Array<string> = key.split(/(?=[A-Z])/);
					key = keyBlocks.map((i) => i.toLowerCase()).join("-");
					root["ele"].call(root, key, value);
				}
			}
			return root;
		}

		/** */
		static addFormattedXMLChildsFromArray(root: Object, data: Object, whitelist?: Array<string>): Object {
			if (whitelist) {
				whitelist.forEach((key) => {
					if (data.hasOwnProperty(key)) {
						let value: string = data[key];
						if (value !== null && value !== "") {
							let keyBlocks: Array<string> = key.split(/(?=[A-Z])/);
							key = keyBlocks.map((i) => i.toLowerCase()).join("-");
							root["ele"].call(root, key, value);
						}
					}
				});
			}
			return root;
		}
	}
}