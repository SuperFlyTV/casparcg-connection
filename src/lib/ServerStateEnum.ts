/**
 *
 */
export namespace Enum {

	/**
	 *
	 */
	export abstract class AbstractEnum {

		public value: string;

		/**
		 *
		 */
		constructor(value: string) {
			this.value = value;
		}

		/**
		 *
		 */
		toString(): string {
			return this.value;
		}
	}

	/**
	 *
	 */
	export class Command extends AbstractEnum {
		static readonly LOADBG = new Command("LOADBG");
		static readonly LOAD = new Command("LOAD");
		static readonly PLAY = new Command("PLAY");
		static readonly PAUSE = new Command("PAUSE");
		static readonly RESUME = new Command("RESUME");
		static readonly STOP = new Command("STOP");
		static readonly CLEAR = new Command("CLEAR");
		static readonly CALL = new Command("CALL");
		static readonly SWAP = new Command("SWAP");
		static readonly ADD = new Command("ADD");
		static readonly REMOVE = new Command("REMOVE");
		static readonly PRINT = new Command("PRINT");
		static readonly LOG_LEVEL = new Command("LOG LEVEL");
		static readonly LOG_CATEGORY = new Command("LOG CATEGORY");
		static readonly SET = new Command("SET");
		static readonly LOCK = new Command("LOCK");
		static readonly DATA_STORE = new Command("DATA STORE");
		static readonly DATA_RETRIEVE = new Command("DATA RETRIEVE");
		static readonly DATA_LIST = new Command("DATA LIST");
		static readonly DATA_REMOVE = new Command("DATA REMOVE");
		static readonly CG_ADD = new Command("CG ADD");
		static readonly CG_PLAY = new Command("CG PLAY");
		static readonly CG_STOP = new Command("CG STOP");
		static readonly CG_NEXT = new Command("CG NEXT");
		static readonly CG_REMOVE = new Command("CG REMOVE");
		static readonly CG_CLEAR = new Command("CG CLEAR");
		static readonly CG_UPDATE = new Command("CG UPDATE");
		static readonly CG_INVOKE = new Command("CG INVOKE");
		static readonly CG_INFO = new Command("CG INFO");
		static readonly MIXER_KEYER = new Command("MIXER KEYER");
		static readonly MIXER_CHROMA = new Command("MIXER CHROMA");
		static readonly MIXER_BLEND = new Command("MIXER BLEND");
		static readonly MIXER_OPACITY = new Command("MIXER OPACITY");
		static readonly MIXER_BRIGHTNESS = new Command("MIXER BRIGHTNESS");
		static readonly MIXER_SATURATION = new Command("MIXER SATURATION");
		static readonly MIXER_CONTRAST = new Command("MIXER CONTRAST");
		static readonly MIXER_LEVELS = new Command("MIXER LEVELS");
		static readonly MIXER_FILL = new Command("MIXER FILL");
		static readonly MIXER_CLIP = new Command("MIXER CLIP");
		static readonly MIXER_ANCHOR = new Command("MIXER ANCHOR");
		static readonly MIXER_CROP = new Command("MIXER CROP");
		static readonly MIXER_ROTATION = new Command("MIXER ROTATION");
		static readonly MIXER_PERSPECTIVE = new Command("MIXER PERSPECTIVE");
		static readonly MIXER_MIPMAP = new Command("MIXER MIPMAP");
		static readonly MIXER_VOLUME = new Command("MIXER VOLUME");
		static readonly MIXER_MASTERVOLUME = new Command("MIXER MASTERVOLUME");
		static readonly MIXER_STRAIGHT_ALPHA_OUTPUT = new Command("MIXER STRAIGHT_ALPHA_OUTPUT");
		static readonly MIXER_GRID = new Command("MIXER GRID");
		static readonly MIXER_COMMIT = new Command("MIXER COMMIT");
		static readonly MIXER_CLEAR = new Command("MIXER CLEAR");
		static readonly CHANNEL_GRID = new Command("CHANNEL_GRID");
		static readonly THUMBNAIL_LIST = new Command("THUMBNAIL LIST");
		static readonly THUMBNAIL_RETRIEVE = new Command("THUMBNAIL RETRIEVE");
		static readonly THUMBNAIL_GENERATE = new Command("THUMBNAIL GENERATE");
		static readonly THUMBNAIL_GENERATE_ALL = new Command("THUMBNAIL GENERATE_ALL");
		static readonly CINF = new Command("CINF");
		static readonly CLS = new Command("CLS");
		static readonly FLS = new Command("FLS");
		static readonly TLS = new Command("TLS");
		static readonly VERSION = new Command("VERSION");
		static readonly INFO = new Command("INFO");
		static readonly INFO_TEMPLATE = new Command("INFO TEMPLATE");
		static readonly INFO_CONFIG = new Command("INFO CONFIG");
		static readonly INFO_PATHS = new Command("INFO PATHS");
		static readonly INFO_SYSTEM = new Command("INFO SYSTEM");
		static readonly INFO_SERVER = new Command("INFO SERVER");
		static readonly INFO_QUEUES = new Command("INFO QUEUES");
		static readonly INFO_THREADS = new Command("INFO THREADS");
		static readonly INFO_DELAY = new Command("INFO DELAY");
		static readonly DIAG = new Command("DIAG");
		static readonly GL_INFO = new Command("GL INFO");
		static readonly GL_GC = new Command("GL GC");
		static readonly BYE = new Command("BYE");
		static readonly KILL = new Command("KILL");
		static readonly RESTART = new Command("RESTART");
		static readonly HELP = new Command("HELP");
		static readonly HELP_PRODUCER = new Command("HELP PRODUCER");
		static readonly HELP_CONSUMER = new Command("HELP CONSUMER");
	}

	/**
	 *
	 */
	export class Producer extends AbstractEnum {
		static readonly FFMPEG = new Producer("FFmpeg Producer");
		static readonly DECKLINK = new Producer("Decklink Producer");
		static readonly HTML = new Producer("HTML Producer");
		static readonly PSD = new Producer("PSD Scene Producer");
		static readonly FLASH = new Producer("Flash Producer (.ft)");
		static readonly FLASH_CT = new Producer("Flash Producer (.ct)");
		static readonly FLASH_SWF = new Producer("Flash Producer (.swf)");
		static readonly IMAGE_SCROLL = new Producer("Image Scroll Producer");
		static readonly IMAGE = new Producer("Image Producer");
		static readonly REROUTE = new Producer("Reroute Producer");
		static readonly TEXT = new Producer("Text Producer");
		static readonly SCENE = new Producer("XML Scene Producer");
		static readonly COLOR = new Producer("Color Producer");
	}

	/**
	 *
	 */
	export class Consumer extends AbstractEnum {
		static readonly FFMPEG = new Consumer("FFMpeg Consumer");
		static readonly STREAMING = new Consumer("Streaming Consumer");
		static readonly ADUIO = new Consumer("System Audio Consumer");
		static readonly BLUEFISH = new Consumer("Bluefish Consumer");
		static readonly DECKLINK = new Consumer("Decklink Consumer");
		static readonly SCREEN = new Consumer("Screen Consumer");
		static readonly IVGA = new Consumer("iVGA Consumer");
		static readonly IMAGE = new Consumer("Image Consumer");
	}


	/**
	 *
	 *
	 */
	export class Version extends AbstractEnum {
		static readonly SERVER = new Version("SERVER");
		static readonly FLASH = new Version("FLASH");
		static readonly TEMPLATEHOST = new Version("TEMPLATEHOST");
		static readonly CEF = new Version("CEF");
	}

	/**
	 *
	 *
	 */
	export class Lock extends AbstractEnum {
		static readonly ACQUIRE = new Lock("ACQUIRE");
		static readonly RELEASE = new Lock("RELEASE");
		static readonly CLEAR = new Lock("CLEAR");
	}

	/**
	 *
	 *
	 */
	export class LogCategory extends AbstractEnum {
		static readonly CALLTRACE = new LogCategory("CALLTRACE");
		static readonly COMMUNICATION = new LogCategory("COMMUNICATION");
	}

	/**
	 *
	 *
	 */
	export class Chroma extends AbstractEnum {
		static readonly NONE = new Chroma("NONE");
		static readonly GREEN = new Chroma("GREEN");
		static readonly BLUE = new Chroma("BLUE");
	}

	/**
	 *
	 *
	 */
	export class LogLevel extends AbstractEnum {
		static readonly TRACE = new LogLevel("TRACE");
		static readonly DEBUG = new LogLevel("DEBUG");
		static readonly INFO = new LogLevel("INFO");
		static readonly WARNING = new LogLevel("WARNING");
		static readonly ERROR = new LogLevel("ERROR");
		static readonly FATAL = new LogLevel("FATAL");	// @todo: 2.1?????
	}

	/**
	 *
	 *
	 */
	export class Transition extends AbstractEnum {
		static readonly CUT = new Transition("CUT");
		static readonly MIX = new Transition("MIX");
		static readonly PUSH = new Transition("PUSH");
		static readonly WIPE = new Transition("WIPE");
		static readonly SLIDE = new Transition("SLIDE");
	}

	/**
	 *
	 *
	 */
	export class Direction extends AbstractEnum {
		static readonly LEFT = new Direction("LEFT");
		static readonly RIGHT = new Direction("RIGHT");
	}

	/**
	 *
	 */
	export class BlendMode extends AbstractEnum {
		static readonly NORMAL = new BlendMode("NORMAL");
		static readonly LIGHTEN = new BlendMode("LIGHTEN");
		static readonly DARKEN = new BlendMode("DARKEN");
		static readonly MULTIPLY = new BlendMode("MULTIPLY");
		static readonly AVERAGE = new BlendMode("AVERAGE");
		static readonly ADD = new BlendMode("ADD");
		static readonly SUBTRACT = new BlendMode("SUBTRACT");
		static readonly DIFFERENCE = new BlendMode("DIFFERENCE");
		static readonly NEGATION = new BlendMode("NEGATION");
		static readonly EXCLUSION = new BlendMode("EXCLUSION");
		static readonly SCREEN = new BlendMode("SCREEN");
		static readonly OVERLAY = new BlendMode("OVERLAY");
		static readonly SOFT_LIGHT = new BlendMode("SOFT LIGHT");
		static readonly HARD_LIGHT = new BlendMode("HARD LIGHT");
		static readonly COLOR_DODGE = new BlendMode("COLOR DODGE");
		static readonly COLOR_BURN = new BlendMode("COLOR BURN");
		static readonly LINEAR_DODGE = new BlendMode("LINEAR DODGE");
		static readonly LINEAR_BURN = new BlendMode("LINEAR BURN");
		static readonly LINEAR_LIGHT = new BlendMode("LINEAR LIGHT");
		static readonly VIVID_LIGHT = new BlendMode("VIVID LIGHT");
		static readonly PIN_LIGHT = new BlendMode("PIN LIGHT");
		static readonly HARD_MIX = new BlendMode("HARD MIX");
		static readonly REFLECT = new BlendMode("REFLECT");
		static readonly GLOW = new BlendMode("GLOW");
		static readonly PHOENIX = new BlendMode("PHOENIX");
		static readonly CONTRAST = new BlendMode("CONTRAST");
		static readonly SATURATION = new BlendMode("SATURATION");
		static readonly COLOR = new BlendMode("COLOR");
		static readonly LUMINOSITY = new BlendMode("LUMINOSITY");
	}

	/**
	 *
	 */
	export class Ease extends AbstractEnum {
		static readonly LINEAR = new Ease("LINEAR");
		static readonly EASELINEAR = Ease.LINEAR;
		static readonly NONE = new Ease("EASENONE");
		static readonly EASENONE = Ease.NONE;
		static readonly IN_QUAD = new Ease("EASEINQUAD");
		static readonly EASEINQUAD = Ease.IN_QUAD;
		static readonly OUT_QUAD = new Ease("EASEOUTQUAD");
		static readonly EASEOUTQUAD = Ease.OUT_QUAD;
		static readonly IN_OUT_QUAD = new Ease("EASEINOUTQUAD");
		static readonly EASEINOUTQUAD = Ease.IN_OUT_QUAD;
		static readonly OUT_IN_QUAD = new Ease("EASEOUTINQUAD");
		static readonly EASEOUTINQUAD = Ease.OUT_IN_QUAD;
		static readonly IN_CUBIC = new Ease("EASEINCUBIC");
		static readonly EASEINCUBIC = Ease.IN_CUBIC;
		static readonly OUT_CUBIC = new Ease("EASEOUTCUBIC");
		static readonly EASEOUTCUBIC = Ease.OUT_CUBIC;
		static readonly IN_OUT_CUBIC = new Ease("EASEINOUTCUBIC");
		static readonly EASEINOUTCUBIC = Ease.IN_OUT_CUBIC;
		static readonly OUT_IN_CUBIC = new Ease("EASEOUTINCUBIC");
		static readonly EASEOUTINCUBIC = Ease.OUT_IN_CUBIC;
		static readonly IN_QUART = new Ease("EASEINQUART");
		static readonly EASEINQUART = Ease.IN_QUART;
		static readonly OUT_QUART = new Ease("EASEOUTQUART");
		static readonly EASEOUTQUART = Ease.OUT_QUART;
		static readonly IN_OUT_QUART = new Ease("EASEINOUTQUART");
		static readonly EASEINOUTQUART = Ease.IN_OUT_QUART;
		static readonly OUT_IN_QUART = new Ease("EASEOUTINQUART");
		static readonly EASEOUTINQUART = Ease.OUT_IN_QUART;
		static readonly IN_QUINT = new Ease("EASEINQUINT");
		static readonly EASEINQUINT = Ease.IN_QUINT;
		static readonly OUT_QUINT = new Ease("EASEOUTQUINT");
		static readonly EASEOUTQUINT = Ease.OUT_QUINT;
		static readonly IN_OUT_QUINT = new Ease("EASEINOUTQUINT");
		static readonly EASEINOUTQUINT = Ease.IN_OUT_QUINT;
		static readonly OUT_IN_QUINT = new Ease("EASEOUTINQUINT");
		static readonly EASEOUTINQUINT = Ease.OUT_IN_QUINT;
		static readonly IN_SINE = new Ease("EASEINSINE");
		static readonly EASEINSINE = Ease.IN_SINE;
		static readonly OUT_SINE = new Ease("EASEOUTSINE");
		static readonly EASEOUTSINE = Ease.OUT_SINE;
		static readonly IN_OUT_SINE = new Ease("EASEINOUTSINE");
		static readonly EASEINOUTSINE = Ease.IN_OUT_SINE;
		static readonly OUT_IN_SINE = new Ease("EASEOUTINSINE");
		static readonly EASEOUTINSINE = Ease.OUT_IN_SINE;
		static readonly IN_EXPO = new Ease("EASEINEXPO");
		static readonly EASEINEXPO = Ease.IN_EXPO;
		static readonly OUT_EXPO = new Ease("EASEOUTEXPO");
		static readonly EASEOUTEXPO = Ease.OUT_EXPO;
		static readonly IN_OUT_EXPO = new Ease("EASEINOUTEXPO");
		static readonly EASEINOUTEXPO = Ease.IN_OUT_EXPO;
		static readonly OUT_IN_EXPO = new Ease("EASEOUTINEXPO");
		static readonly EASEOUTINEXPO = Ease.OUT_IN_EXPO;
		static readonly IN_CIRC = new Ease("EASEINCIRC");
		static readonly EASEINCIRC = Ease.IN_CIRC;
		static readonly OUT_CIRC = new Ease("EASEOUTCIRC");
		static readonly EASEOUTCIRC = Ease.OUT_CIRC;
		static readonly IN_OUT_CIRC = new Ease("EASEINOUTCIRC");
		static readonly EASEINOUTCIRC = Ease.IN_OUT_CIRC;
		static readonly OUT_IN_CIRC = new Ease("EASEOUTINCIRC");
		static readonly EASEOUTINCIRC = Ease.OUT_IN_CIRC;
		static readonly IN_ELASTIC = new Ease("EASEINELASTIC");
		static readonly EASEINELASTIC = Ease.IN_ELASTIC;
		static readonly OUT_ELASTIC = new Ease("EASEOUTELASTIC");
		static readonly EASEOUTELASTIC = Ease.OUT_ELASTIC;
		static readonly IN_OUT_ELASTIC = new Ease("EASEINOUTELASTIC");
		static readonly EASEINOUTELASTIC = Ease.IN_OUT_ELASTIC;
		static readonly OUT_IN_ELASTIC = new Ease("EASEOUTINELASTIC");
		static readonly EASEOUTINELASTIC = Ease.OUT_IN_ELASTIC;
		static readonly IN_BACK = new Ease("EASEINBACK");
		static readonly EASEINBACK = Ease.IN_BACK;
		static readonly OUT_BACK = new Ease("EASEOUTBACK");
		static readonly EASEOUTBACK = Ease.OUT_BACK;
		static readonly IN_OUT_BACK = new Ease("EASEINOUTBACK");
		static readonly EASEINOUTBACK = Ease.IN_OUT_BACK;
		static readonly OUT_IN_BACK = new Ease("EASEOUTINTBACK");
		static readonly EASEOUTINBACK = Ease.OUT_IN_BACK;
		static readonly OUT_BOUNCE = new Ease("EASEOUTBOUNCE");
		static readonly EASEOUTBOUNCE = Ease.OUT_BOUNCE;
		static readonly IN_BOUNCE = new Ease("EASEINBOUNCE");
		static readonly EASEINBOUNCE = Ease.IN_BOUNCE;
		static readonly IN_OUT_BOUNCE = new Ease("EASEINOUTBOUNCE");
		static readonly EASEINOUTBOUNCE = Ease.IN_OUT_BOUNCE;
		static readonly OUT_IN_BOUNCE = new Ease("EASEOUTINBOUNCE");
		static readonly EASEOUTINBOUNCE = Ease.OUT_IN_BOUNCE;
	}

	/**
	 *
	 */
	export class ChannelFormat extends AbstractEnum {
		static readonly INVALID = new ChannelFormat("invalid");
		static readonly PAL = new ChannelFormat("PAL");
		static readonly NTSC = new ChannelFormat("NTSC");
		static readonly SD_576P2500 = new ChannelFormat("576p2500");
		static readonly HD_720P2398 = new ChannelFormat("720p2398");
		static readonly HD_720P2400 = new ChannelFormat("720p2400");
		static readonly HD_720P2500 = new ChannelFormat("720p2500");
		static readonly HD_720P5000 = new ChannelFormat("720p5000");
		static readonly HD_720P2997 = new ChannelFormat("720p2997");
		static readonly HD_720P5994 = new ChannelFormat("720p5994");
		static readonly HD_720P3000 = new ChannelFormat("720p3000");
		static readonly HD_720P6000 = new ChannelFormat("720p6000");
		static readonly HD_1080P2398 = new ChannelFormat("1080p2398");
		static readonly HD_1080P2400 = new ChannelFormat("1080p2400");
		static readonly HD_1080I5000 = new ChannelFormat("1080i5000");
		static readonly HD_1080I5994 = new ChannelFormat("1080i5994");
		static readonly HD_1080I6000 = new ChannelFormat("1080i6000");
		static readonly HD_1080P2500 = new ChannelFormat("1080p2500");
		static readonly HD_1080P2997 = new ChannelFormat("1080p2997");
		static readonly HD_1080P3000 = new ChannelFormat("1080p3000");
		static readonly HD_1080P5000 = new ChannelFormat("1080p5000");
		static readonly HD_1080P5994 = new ChannelFormat("1080p5994");
		static readonly HD_1080P6000 = new ChannelFormat("1080p6000");
		static readonly UHD_1556P2398 = new ChannelFormat("1556p2398");
		static readonly UHD_1556P2400 = new ChannelFormat("1556p2400");
		static readonly UHD_1556P2500 = new ChannelFormat("1556p2500");
		static readonly DCI_1080P2398 = new ChannelFormat("dci1080p2398");
		static readonly DCI_1080P2400 = new ChannelFormat("dci1080p2400");
		static readonly DCI_1080P2500 = new ChannelFormat("dci1080p2500");
		static readonly UHD_2160P2398 = new ChannelFormat("2160p2398");
		static readonly UCH_2160P2400 = new ChannelFormat("2160p2400");
		static readonly UHD_2160P2500 = new ChannelFormat("2160p2500");
		static readonly UHD_2160P2997 = new ChannelFormat("2160p2997");
		static readonly UHD_2160P3000 = new ChannelFormat("2160p3000");
		static readonly UHD_2160P5000 = new ChannelFormat("2160p5000");
		static readonly UHD_2160P5994 = new ChannelFormat("2160p5994");
		static readonly UHD_2160P6000 = new ChannelFormat("2160p6000");
		static readonly DCI_2160P2398 = new ChannelFormat("dci2160p2398");
		static readonly DCI_2160P2400 = new ChannelFormat("dci2160p2400");
		static readonly DCI_2160P2500 = new ChannelFormat("dci2160p2500");
	}

	/**
	 *
	 */
	export class ChannelLayout extends AbstractEnum {

	}
}