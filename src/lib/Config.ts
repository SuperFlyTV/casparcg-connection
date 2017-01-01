import {create as XMLBuilder} from "xmlbuilder";
// Options NS
import {Options as OptionsNS} from "./AMCPConnectionOptions";
import ServerVersion = OptionsNS.ServerVersion;


/** */
export namespace Config {

	/** */
	export namespace v2xx {
		/** */
		export class CasparCGConfigVO {
			public channelGrid?: boolean = false;
			public flash?: v2xx.Flash = new v2xx.Flash();
			public templateHosts?: Array<v2xx.TemplateHost> = [];
		}

		/** */
		export class Channel {
			public _type: string = "channel";
			public videoMode: string = "PAL";		// @todo: literal
			public consumers: Array<Consumer> = [];
			public straightAlphaOutput?: boolean = false;
			public channelLayout?: string = "stereo";
		}

		/** */
		export class Consumer {
			public _type: string;
		}

		/** */
		export class DecklinkConsumer extends Consumer {
			_type = "decklink";
			public device: number = 1;
			public keyDevice?: Number = undefined;
			public embeddedAudio?: boolean = false;
			public channelLayout?: string = "stereo";
			public latency?: string = "normal";		// @todo: literal
			public keyer?: string = "external";		// @todo: literal
			public keyOnly?: boolean = false;
			public bufferDepth?: number = 3;
		}


		/** */
		export class BluefishConsumer extends Consumer {
			_type = "bluefish";
			public device: number = 1;
			public embeddedAudio?: boolean = false;
			public channelLayout?: string = "stereo";
			public keyOnly?: boolean = false;
		}

		/** */
		export class SystemAudioConsumer extends Consumer {
			_type = "system-audio";
		}

		/** */
		export class ScreenConsumer extends Consumer {
			_type = "screen";
			public device: number = 1;		// @todo: wrong default implemented in caspar, should be 0:::
			public aspectRatio?: string = "default";	// @todo: literal
			public stretch?: string = "fill";			// @todo: literal
			public windowed?: boolean = true;
			public keyOnly?: boolean = false;
			public autoDeinterlace?: boolean = true;
			public vsync?: boolean = false;
			public borderless?: boolean = false;
		}

		/** */
		export class NewtekIvgaConsumer extends Consumer {
			_type = "newtek-ivga";
		}

		/** */
		export class Controller {
			public _type: string = "tcp";
			public port: number | undefined = undefined;
			public protocol: string = "";
		}

		/** */
		export class Mixer {
			public blendModes?: boolean = false;
			public straightAlpha?: boolean = false;
			public mipmappingDefaultOn?: boolean = false;
			public chromaKey?: boolean = undefined;
		}

		/** */
		export class OscClient {
			public _type: string = "predefined-client";
			public address: string = "";
			public port: number | undefined = undefined;
		}

		/** */
		export class Thumbnails {
			public generateThumbnails: boolean = true;
			public width: number = 256;
			public height: number = 144;
			public videoGrid: number = 2;
			public scanIntervalMillis: number = 5000;
			public generateDelayMillis: number = 2000;
			public mipmap: boolean = false;
			public videoMode: string = "720p5000";		// @todo: literal
		}

		/** */
		export class Flash {
			bufferDepth?: string | number = "auto";
		}

		/** */
		export class TemplateHost {
			public _type: string = "template-host";
			public videoMode: string = "";				// @todo: literal
			public filename: string = "";
			public width: number | undefined = undefined;
			public height: number | undefined = undefined;
		}

		/**  */
		export class Osc {
			public defaultPort: number = 6250;
			public predefinedClients: Array<OscClient> = [];
		}
	}

	/** */
	export namespace v207 {
		/** */
		export class CasparCGConfigVO extends v2xx.CasparCGConfigVO {
			public paths: v207.Paths = new v207.Paths();
			public channels: Array<v207.Channel> = [new v2xx.Channel()];
			public controllers: Array<v2xx.Controller> = [defaultAMCPController];
			public mixer?: v207.Mixer = new v207.Mixer();
			public logLevel?: string = "trace";		// @todo: literal
			public autoDeinterlace?: boolean = true;
			public autoTranscode?: boolean = true;
			public pipelineTokens?: number = 2;
			public thumbnails?: v207.Thumbnails = new v207.Thumbnails();
			public osc?: v2xx.Osc = new v2xx.Osc();
			public audio?: v207.Audio = new v207.Audio();
		}

		/** */
		export class Paths {
			mediaPath: string = "media\\";
			logPath: string = "log\\";
			dataPath: string = "data\\";
			templatePath: string = "templates\\";
			thumbnailsPath: string = "thumbnails\\";
		}

		/** */
		export class DecklinkConsumer extends v2xx.DecklinkConsumer {
			public customAllocator?: boolean = true;
		}

		/** */
		export class SystemAudioConsumer extends v2xx.SystemAudioConsumer {}

		/** */
		export class ScreenConsumer extends v2xx.ScreenConsumer {
			public name?: string = "Screen Consumer";
		}

		/** */
		export class NewtekIvgaConsumer extends v2xx.NewtekIvgaConsumer {
			public channelLayout?: string = "stereo";
			public provideSync?: boolean = true;
		}

		/** */
		export class FileConsumer extends v2xx.Consumer {
			_type = "file";
			public path: string = "";
			public vcodec?: string = "libx264";
			public separateKey?: boolean = false;
		}

		/** */
		export class StreamConsumer extends v2xx.Consumer {
			_type = "stream";
			public path: string = "";
			public args?: string = "";
		}

		/** */
		export class Mixer extends v2xx.Mixer {
			public chromaKey?: boolean = false;
		}

		/**  */
		export class Osc extends v2xx.Osc {}

		/**  */
		export class ChannelLayout {
			public _type: string = "channel-layout";
			public name: string = "";
			public type: string = "";
			public numChannels: number | undefined = undefined;
			public channels: string = "";
		}

		/**  */
		export class MixConfig {
			public _type: string = "mix-config";
			public from: string = "";
			public to: string = "";
			public mix: string = "";
			public mappings: Array<string> = [];
		}

		/**  */
		export class Audio {
			public channelLayouts: Array<v207.ChannelLayout> = [];
			public mixConfigs: Array<v207.MixConfig> = [];
		}
	}

	/** */
	export namespace v21x {
		/** */
		export class CasparCGConfigVO extends v2xx.CasparCGConfigVO {
			public paths: v21x.Paths = new v21x.Paths();
			public channels: Array<v21x.Channel> = [new v2xx.Channel()];
			public controllers: Array<v2xx.Controller> = [defaultAMCPController, defaultLOGController];
			public lockClearPhrase?: string = "secret";
			public mixer?: v21x.Mixer = new v21x.Mixer();
			public logLevel?: string = "info";					// @todo: literal
			public logCategories?: string = "communication";	// @todo: literal or strongtype??
			public forceDeinterlace?: boolean = false;
			public accelerator?: string = "auto";				// @todo: literal
			public thumbnails?: v21x.Thumbnails = new v21x.Thumbnails();
			public html?: v21x.Html = new v21x.Html();
			public osc?: v21x.Osc = new v21x.Osc();
			public audio?: v21x.Audio = new v21x.Audio();
		}

		/** */
		export class Paths {
			mediaPath?: string = "media/";
			logPath?: string = "log/";
			dataPath?: string = "data/";
			templatePath?: string = "template/";
			thumbnailPath?: string = "thumbnail/";
			fontPath?: string = "font/";
		}

		/** */
		export class DecklinkConsumer extends v2xx.DecklinkConsumer {}

		/** */
		export class SystemAudioConsumer extends v2xx.SystemAudioConsumer {
			public channelLayout?: string = "stereo";
			public latency?: number = 200;
		}

		/** */
		export class ScreenConsumer extends v2xx.ScreenConsumer {
			public interactive?: boolean = true;
		}

		/** */
		export class NewtekIvgaConsumer extends v2xx.NewtekIvgaConsumer {}

		/** */
		export class FfmpegConsumer extends v2xx.Consumer {
			_type = "ffmpeg";
			public path: string = "";
			public args?: string = "";
			public separateKey?: boolean = false;
			public monoStreams?: boolean = false;
		}

		/** */
		export class SynctoConsumer extends v2xx.Consumer {
			_type = "syncto";
			public channelId: Number | undefined = undefined;
		}

		/** */
		export class Mixer extends v2xx.Mixer {}

		/**  */
		export class Thumbnails extends v2xx.Thumbnails {
			public mipmap: boolean = true;
		}

		/** */
		export class Html {
			remoteDebuggingPort?: number | undefined = undefined;
		}

		/**  */
		export class Osc extends v2xx.Osc {
			public disableSendToAmcpClients?: boolean = false;
		}

		/**  */
		export class ChannelLayout {
			public _type: string = "channel-layout";
			public name: string = "";
			public type: string = "";
			public numChannels: number | undefined = undefined;
			public channelOrder: string = "";
		}

		/**  */
		export class MixConfig {
			public _type: string = "mix-config";
			public fromType: string = "";
			public toTypes: string = "";
			public mix: string = "";
		}

		/**  */
		export class Audio {
			public channelLayouts: Array<v21x.ChannelLayout> = [];
			public mixConfigs: Array<v21x.MixConfig> = [];
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

			paths: v21x.Paths;
			lockClearPhrase: string;
			channels: Array<v2xx.Channel>;
			mixer: Intermediate.Mixer;
			controllers: Array<v2xx.Controller>;
			logLevel: string;
			logCategories: string;
			channelGrid: boolean;
			forceDeinterlace: boolean;
			autoDeinterlace: boolean;
			autoTranscode: boolean;
			pipelineTokens: number;
			accelerator: string;
			thumbnails: v21x.Thumbnails;
			flash: v2xx.Flash;
			html: v21x.Html;
			templateHosts: Array<v2xx.TemplateHost>;
			osc: v2xx.Osc;
			audio: Intermediate.Audio;
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