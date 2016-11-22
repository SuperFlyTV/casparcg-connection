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
		}

		/** */
		@JsonObject
		export class DecklinkConsumer extends Consumer {
			type = "decklink";

			@JsonMember({type: Number, isRequired: false})
			public device: Number = 1;

			@JsonMember({type: Number, isRequired: false, name: "key-device"})
			public keyDevice: Number;

			@JsonMember({type: String, isRequired: false, name: "embedded-audio"})
			public embeddedAudio: String = "false";

			@JsonMember({type: String, isRequired: false, name: "channel-layout"})
			public channelLayout: String = "stereo";

			@JsonMember({type: String, isRequired: false})
			public latency: String = "normal";

			@JsonMember({type: String, isRequired: false})
			public keyer: String = "external";

			@JsonMember({type: String, isRequired: false, name: "key-only"})
			public keyOnly: String = "false";

			@JsonMember({type: Number, isRequired: false, name: "buffer-depth"})
			public bufferDepth: Number = 3;

			@JsonMember({type: String, isRequired: false, name: "custom-allocator"})
			public customAllocator: String = "true";	// @todo: ns 2.0 only
		}

		/** */
		@JsonObject
		export class BluefishConsumer extends Consumer {
			type = "Bluefish";

			@JsonMember({type: Number, isRequired: false})
			public device: Number = 1;

			@JsonMember({type: String, isRequired: false, name: "embedded-audio"})
			public embeddedAudio: String = "false";

			@JsonMember({type: String, isRequired: false, name: "channel-layout"})
			public channelLayout: String = "stereo";

			@JsonMember({type: String, isRequired: false, name: "key-only"})
			public keyOnly: String = "false";
		}

		/** */
		@JsonObject
		export class SystemAudioConsumer extends Consumer {
			type: String = "systemaudio";

			@JsonMember({type: String, isRequired: false, name: "channel-layout"})
			public channelLayout: String = "stereo";

			@JsonMember({type: Number, isRequired: false})
			public latency: Number = 200;
		}

		/** */
		@JsonObject
		export class ScreenConsumer extends Consumer {
			type = "screen";

			@JsonMember({type: Number, isRequired: false})
			public device: Number = 0;

			@JsonMember({type: String, isRequired: false, name: "aspect-ratio"})
			public aspectRatio: String = "default";

			@JsonMember({type: String, isRequired: false})
			public stretch: String = "fill";

			@JsonMember({type: String, isRequired: false})
			public windowed: String = "true";

			@JsonMember({type: String, isRequired: false, name: "key-only"})
			public keyOnly: String = "false";

			@JsonMember({type: String, isRequired: false, name: "auto-deinterlace"})
			public autoDeinterlace: String = "true";

			@JsonMember({type: String, isRequired: false})
			public vsync: String = "false";

			@JsonMember({type: String, isRequired: false})
			public borderless: String = "false";

			@JsonMember({type: String, isRequired: false})
			public interactive: String = "true";		// @todo: ns 2.1 only

			@JsonMember({type: String, isRequired: false})
			public name: String = "Screen Consumer";	// @todo: ns 2.0 only
		}

		/** */
		@JsonObject
		export class NewtekIvgaConsumer extends Consumer {
			type = "newtekivga";

			@JsonMember({type: String, isRequired: false, name: "channel-layout"})
			public channelLayout: String = "stereo";	// @todo: ns 2.0 only

			@JsonMember({type: String, isRequired: false, name: "provide-sync"})
			public provideSync: String = "true";		// @todo: ns 2.0 only
		}

		/** */
		@JsonObject
		export class FfmpegConsumer extends Consumer { // @todo: 2.1 ns
			type: String = "ffmpeg";

			@JsonMember({type: String, isRequired: false})
			public path: String;

			@JsonMember({type: String, isRequired: false})
			public args: String;

			@JsonMember({type: String, isRequired: false, name: "separate-key"})
			public separateKey: String = "false";

			@JsonMember({type: String, isRequired: false, name: "mono-streams"})
			public monoStreams: String = "false";
		}

		/** */
		@JsonObject
		export class FileConsumer extends Consumer { // @todo: 2.0 ns
			type: String = "file";

			@JsonMember({type: String, isRequired: false})
			public path: String;

			@JsonMember({type: String, isRequired: false})
			public vcodec: String = "libx264";

			@JsonMember({type: String, isRequired: false, name: "separate-key"})
			public separateKey: String = "false";
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
			type: String = "syncto";

			@JsonMember({type: Number, isRequired: false, name: "channel-id"})
			public channelId: Number;
		}

		/** */
		@JsonObject
		export class Channel {
			_consumers?: Array<Consumer> = [];

			@JsonMember({type: String, isRequired: true, name: "video-mode"})	// @todo: custom "enum"-class
			videoMode: String = "PAL";

			@JsonMember({type: String, name: "straight-alpha-output"})
			straightAlphaOutput?: String = "false";

			@JsonMember({type: Array, elements: Object, isRequired: true, name: "consumers"})
			public get consumers(): Array<Object> {
				return this._consumers || [];
			}

			/** */
			public set consumers(consumers: Array<Object>) {
				let consumer: Consumer | undefined;
				let consumerKey: string;
				let consumerClass: typeof Consumer;
				consumers.forEach((i: Object) => {
					if (i.hasOwnProperty("decklink")) {
						consumerKey = "decklink";
						consumerClass = DecklinkConsumer;
					} else if (i.hasOwnProperty("bluefish")) {
						consumerKey = "bluefish";
						consumerClass = BluefishConsumer;
					} else if (i.hasOwnProperty("system-audio")) {
						consumerKey = "system-audio";
						consumerClass = SystemAudioConsumer;
					} else if (i.hasOwnProperty("screen")) {
						consumerKey = "screen";
						consumerClass = ScreenConsumer;
					} else if (i.hasOwnProperty("newtek-ivga")) {
						consumerKey = "newtek-ivga";
						consumerClass = NewtekIvgaConsumer;
					} else if (i.hasOwnProperty("ffmpeg")) {
						consumerKey = "ffmpeg";
						consumerClass = FfmpegConsumer;
					} else if (i.hasOwnProperty("file")) {
						consumerKey = "file";
						consumerClass = FileConsumer;
					} else if (i.hasOwnProperty("stream")) {
						consumerKey = "stream";
						consumerClass = StreamConsumer;
					} else if (i.hasOwnProperty("syncto")) {
						consumerKey = "syncto";
						consumerClass = SynctoConsumer;
					}


					if (Array.isArray(i[consumerKey])) {
							(<Array<Object>>(i[consumerKey])).forEach((o: Object) => {
								consumer = new consumerClass();
								_.extend(o, consumer);
								this._consumers!.push(consumer);
							});
						}else {
							consumer = new consumerClass();
							_.extend(i[consumerKey], consumer);
							this._consumers!.push(consumer);
						}
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
			mediaPath: String = "media\\";

			@JsonMember({type: String, name: "log-path"})
			logPath: String = "log\\";

			@JsonMember({type: String, name: "data-path"})
			dataPath: String = "data\\";

			@JsonMember({type: String, name: "template-path"})
			templatePath: String = "templates\\";

			@JsonMember({type: String, name: "thumbnails-path"})
			thumbnailsPath: String = "thumbnails\\";
		};

		/** */
		@JsonObject
		export class Channel extends v20x.Channel {
			@JsonMember({type: String, name: "channel-layout"})		// @todo: custom "enum"-class
			channelLayout?: String = "stereo";
		}
	}

	/** */
	export namespace v21x {
		/** */
		@JsonObject
		export class Paths {
			@JsonMember({type: String, name: "media-path"})
			mediaPath: String = "media/";

			@JsonMember({type: String, name: "log-path"})
			logPath: String = "log/";

			@JsonMember({type: String, name: "data-path"})
			dataPath: String = "data/";

			@JsonMember({type: String, name: "template-path"})
			templatePath: String = "template/";

			@JsonMember({type: String, name: "thumbnail-path"})
			thumbnailPath: String = "thumbnail/";

			@JsonMember({type: String, name: "font-path"})
			fontPath: String = "font/";
		};

		/** */
		@JsonObject
		export class Channel extends v20x.Channel {
			@JsonMember({type: String, name: "channel-layout"})		// @todo: custom "enum"-class
			channelLayout?: String = "stereo";
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