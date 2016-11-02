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
		static LOADBG = new Command("LOADBG");
		static LOAD = new Command("LOAD");
		static PLAY = new Command("PLAY");
		static PAUSE = new Command("PAUSE");
		static RESUME = new Command("RESUME");
		static STOP = new Command("STOP");
		static CLEAR = new Command("CLEAR");
		static CALL = new Command("CALL");
		static SWAP = new Command("SWAP");
		static ADD = new Command("ADD");
		static REMOVE = new Command("REMOVE");
		static PRINT = new Command("PRINT");
		static LOG_LEVEL = new Command("LOG LEVEL");
		static LOG_CATEGORY = new Command("LOG CATEGORY");
		static SET = new Command("SET");
		static LOCK = new Command("LOCK");
		static DATA_STORE = new Command("DATA STORE");
		static DATA_RETRIEVE = new Command("DATA RETRIEVE");
		static DATA_LIST = new Command("DATA LIST");
		static DATA_REMOVE = new Command("DATA REMOVE");
		static CG_ADD = new Command("CG ADD");
		static CG_PLAY = new Command("CG PLAY");
		static CG_STOP = new Command("CG STOP");
		static CG_NEXT = new Command("CG NEXT");
		static CG_REMOVE = new Command("CG REMOVE");
		static CG_CLEAR = new Command("CG CLEAR");
		static CG_UPDATE = new Command("CG UPDATE");
		static CG_INVOKE = new Command("CG INVOKE");
		static CG_INFO = new Command("CG INFO");
		static MIXER_KEYER = new Command("MIXER KEYER");
		static MIXER_CHROMA = new Command("MIXER CHROMA");
		static MIXER_BLEND = new Command("MIXER BLEND");
		static MIXER_OPACITY = new Command("MIXER OPACITY");
		static MIXER_BRIGHTNESS = new Command("MIXER BRIGHTNESS");
		static MIXER_SATURATION = new Command("MIXER SATURATION");
		static MIXER_CONTRAST = new Command("MIXER CONTRAST");
		static MIXER_LEVELS = new Command("MIXER LEVELS");
		static MIXER_FILL = new Command("MIXER FILL");
		static MIXER_CLIP = new Command("MIXER CLIP");
		static MIXER_ANCHOR = new Command("MIXER ANCHOR");
		static MIXER_CROP = new Command("MIXER CROP");
		static MIXER_ROTATION = new Command("MIXER ROTATION");
		static MIXER_PERSPECTIVE = new Command("MIXER PERSPECTIVE");
		static MIXER_MIPMAP = new Command("MIXER MIPMAP");
		static MIXER_VOLUME = new Command("MIXER VOLUME");
		static MIXER_MASTERVOLUME = new Command("MIXER MASTERVOLUME");
		static MIXER_STRAIGHT_ALPHA_OUTPUT = new Command("MIXER STRAIGHT_ALPHA_OUTPUT");
		static MIXER_GRID = new Command("MIXER GRID");
		static MIXER_COMMIT = new Command("MIXER COMMIT");
		static MIXER_CLEAR = new Command("MIXER CLEAR");
		static CHANNEL_GRID = new Command("CHANNEL_GRID");
		static THUMBNAIL_LIST = new Command("THUMBNAIL LIST");
		static THUMBNAIL_RETRIEVE = new Command("THUMBNAIL RETRIEVE");
		static THUMBNAIL_GENERATE = new Command("THUMBNAIL GENERATE");
		static THUMBNAIL_GENERATE_ALL = new Command("THUMBNAIL GENERATE_ALL");
		static CINF = new Command("CINF");
		static CLS = new Command("CLS");
		static FLS = new Command("FLS");
		static TLS = new Command("TLS");
		static VERSION = new Command("VERSION");
		static INFO = new Command("INFO");
		static INFO_TEMPLATE = new Command("INFO TEMPLATE");
		static INFO_CONFIG = new Command("INFO CONFIG");
		static INFO_PATHS = new Command("INFO PATHS");
		static INFO_SYSTEM = new Command("INFO SYSTEM");
		static INFO_SERVER = new Command("INFO SERVER");
		static INFO_QUEUES = new Command("INFO QUEUES");
		static INFO_THREADS = new Command("INFO THREADS");
		static INFO_DELAY = new Command("INFO DELAY");
		static DIAG = new Command("DIAG");
		static GL_INFO = new Command("GL INFO");
		static GL_GC = new Command("GL GC");
		static BYE = new Command("BYE");
		static KILL = new Command("KILL");
		static RESTART = new Command("RESTART");
		static HELP = new Command("HELP");
		static HELP_PRODUCER = new Command("HELP PRODUCER");
		static HELP_CONSUMER = new Command("HELP CONSUMER");
	}

	/**
	 * 
	 */
	export class Producer extends AbstractEnum {
		static FFMPEG = new Producer("FFmpeg Producer");
		static DECKLINK = new Producer("Decklink Producer");
		static HTML = new Producer("HTML Producer");
		static PSD = new Producer("PSD Scene Producer");
		static FLASH = new Producer("Flash Producer (.ft)");
		static FLASH_CT = new Producer("Flash Producer (.ct)");
		static FLASH_SWF = new Producer("Flash Producer (.swf)");
		static IMAGE_SCROLL = new Producer("Image Scroll Producer");
		static IMAGE = new Producer("Image Producer");
		static REROUTE = new Producer("Reroute Producer");
		static TEXT = new Producer("Text Producer");
		static SCENE = new Producer("XML Scene Producer");
		static COLOR = new Producer("Color Producer");
	}

	/**
	 * 
	 */
	export class Consumer extends AbstractEnum {
		static FFMPEG = new Consumer("FFMpeg Consumer");
		static STREAMING = new Consumer("Streaming Consumer");
		static ADUIO = new Consumer("System Audio Consumer");
		static BLUEFISH = new Consumer("Bluefish Consumer");
		static DECKLINK = new Consumer("Decklink Consumer");
		static SCREEN = new Consumer("Screen Consumer");
		static IVGA = new Consumer("iVGA Consumer");
		static IMAGE = new Consumer("Image Consumer");
	}


	/**
	 * 
	 * 
	 */
	export class Version extends AbstractEnum {
		static SERVER = new Version("SERVER");
		static FLASH = new Version("FLASH");
		static TEMPLATEHOST = new Version("TEMPLATEHOST");
		static CEF = new Version("CEF");
	}

	/**
	 * 
	 * 
	 */
	export class Lock extends AbstractEnum {
		static ACQUIRE = new Lock("ACQUIRE");
		static RELEASE = new Lock("RELEASE");
		static CLEAR = new Lock("CLEAR");
	}

	/**
	 * 
	 * 
	 */
	export class LogCategory extends AbstractEnum {
		static CALLTRACE = new LogCategory("CALLTRACE");
		static COMMUNICATION = new LogCategory("COMMUNICATION");
	}

	/**
	 * 
	 * 
	 */
	export class Chroma extends AbstractEnum {
		static NONE = new Chroma("NONE");
		static GREEN = new Chroma("GREEN");
		static BLUE = new Chroma("BLUE");
	}

	/**
	 * 
	 * 
	 */
	export class LogLevel extends AbstractEnum {
		static TRACE = new LogLevel("TRACE");
		static DEBUG = new LogLevel("DEBUG");
		static INFO = new LogLevel("INFO");
		static WARNING = new LogLevel("WARNING");
		static ERROR = new LogLevel("ERROR");
		static FATAL = new LogLevel("FATAL");
	}

	/**
	 * 
	 * 
	 */
	export class Transition extends AbstractEnum {
		static CUT = new Transition("CUT");
		static MIX = new Transition("MIX");
		static PUSH = new Transition("PUSH");
		static WIPE = new Transition("WIPE");
		static SLIDE = new Transition("SLIDE");
	}

	/**
	 * 
	 * 
	 */
	export class Direction extends AbstractEnum {
		static LEFT = new Direction("LEFT");
		static RIGHT = new Direction("RIGHT");
	}

	/**
	 * 
	 */
	export class BlendMode extends AbstractEnum {
		static NORMAL = new BlendMode("NORMAL");
		static LIGHTEN = new BlendMode("LIGHTEN");
		static DARKEN = new BlendMode("DARKEN");
		static MULTIPLY = new BlendMode("MULTIPLY");
		static AVERAGE = new BlendMode("AVERAGE");
		static ADD = new BlendMode("ADD");
		static SUBTRACT = new BlendMode("SUBTRACT");
		static DIFFERENCE = new BlendMode("DIFFERENCE");
		static NEGATION = new BlendMode("NEGATION");
		static EXCLUSION = new BlendMode("EXCLUSION");
		static SCREEN = new BlendMode("SCREEN");
		static OVERLAY = new BlendMode("OVERLAY");
		static SOFT_LIGHT = new BlendMode("SOFT LIGHT");
		static HARD_LIGHT = new BlendMode("HARD LIGHT");
		static COLOR_DODGE = new BlendMode("COLOR DODGE");
		static COLOR_BURN = new BlendMode("COLOR BURN");
		static LINEAR_DODGE = new BlendMode("LINEAR DODGE");
		static LINEAR_BURN = new BlendMode("LINEAR BURN");
		static LINEAR_LIGHT = new BlendMode("LINEAR LIGHT");
		static VIVID_LIGH = new BlendMode("VIVID LIGH");
		static PIN_LIGHT = new BlendMode("PIN LIGHT");
		static HARD_MIX = new BlendMode("HARD MIX");
		static REFLECT = new BlendMode("REFLECT");
		static GLOW = new BlendMode("GLOW");
		static PHOENIX = new BlendMode("PHOENIX");
		static CONTRAST = new BlendMode("CONTRAST");
		static SATURATION = new BlendMode("SATURATION");
		static COLOR = new BlendMode("COLOR");
		static LUMINOSITY = new BlendMode("LUMINOSITY");
	}

	/**
	 * 
	 */
	export class Ease extends AbstractEnum {
		static LINEAR = new Ease("LINEAR");
		static EASELINEAR = Ease.LINEAR;
		static NONE = new Ease("EASENONE");
		static EASENONE = Ease.NONE;
		static IN_QUAD = new Ease("EASEINQUAD");
		static EASEINQUAD = Ease.IN_QUAD;
		static OUT_QUAD = new Ease("EASEOUTQUAD");
		static EASEOUTQUAD = Ease.OUT_QUAD;
		static IN_OUT_QUAD = new Ease("EASEINOUTQUAD");
		static EASEINOUTQUAD = Ease.IN_OUT_QUAD;
		static OUT_IN_QUAD = new Ease("EASEOUTINQUAD");
		static EASEOUTINQUAD = Ease.OUT_IN_QUAD;
		static IN_CUBIC = new Ease("EASEINCUBIC");
		static EASEINCUBIC = Ease.IN_CUBIC;
		static OUT_CUBIC = new Ease("EASEOUTCUBIC");
		static EASEOUTCUBIC = Ease.OUT_CUBIC;
		static IN_OUT_CUBIC = new Ease("EASEINOUTCUBIC");
		static EASEINOUTCUBIC = Ease.IN_OUT_CUBIC;
		static OUT_IN_CUBIC = new Ease("EASEOUTINCUBIC");
		static EASEOUTINCUBIC = Ease.OUT_IN_CUBIC;
		static IN_QUART = new Ease("EASEINQUART");
		static EASEINQUART = Ease.IN_QUART;
		static OUT_QUART = new Ease("EASEOUTQUART");
		static EASEOUTQUART = Ease.OUT_QUART;
		static IN_OUT_QUART = new Ease("EASEINOUTQUART");
		static EASEINOUTQUART = Ease.IN_OUT_QUART;
		static OUT_IN_QUART = new Ease("EASEOUTINQUART");
		static EASEOUTINQUART = Ease.OUT_IN_QUART;
		static IN_QUINT = new Ease("EASEINQUINT");
		static EASEINQUINT = Ease.IN_QUINT;
		static OUT_QUINT = new Ease("EASEOUTQUINT");
		static EASEOUTQUINT = Ease.OUT_QUINT;
		static IN_OUT_QUINT = new Ease("EASEINOUTQUINT");
		static EASEINOUTQUINT = Ease.IN_OUT_QUINT;
		static OUT_IN_QUINT = new Ease("EASEOUTINQUINT");
		static EASEOUTINQUINT = Ease.OUT_IN_QUINT;
		static IN_SINE = new Ease("EASEINSINE");
		static EASEINSINE = Ease.IN_SINE;
		static OUT_SINE = new Ease("EASEOUTSINE");
		static EASEOUTSINE = Ease.OUT_SINE;
		static IN_OUT_SINE = new Ease("EASEINOUTSINE");
		static EASEINOUTSINE = Ease.IN_OUT_SINE;
		static OUT_IN_SINE = new Ease("EASEOUTINSINE");
		static EASEOUTINSINE = Ease.OUT_IN_SINE;
		static IN_EXPO = new Ease("EASEINEXPO");
		static EASEINEXPO = Ease.IN_EXPO;
		static OUT_EXPO = new Ease("EASEOUTEXPO");
		static EASEOUTEXPO = Ease.OUT_EXPO;
		static IN_OUT_EXPO = new Ease("EASEINOUTEXPO");
		static EASEINOUTEXPO = Ease.IN_OUT_EXPO;
		static OUT_IN_EXPO = new Ease("EASEOUTINEXPO");
		static EASEOUTINEXPO = Ease.OUT_IN_EXPO;
		static IN_CIRC = new Ease("EASEINCIRC");
		static EASEINCIRC = Ease.IN_CIRC;
		static OUT_CIRC = new Ease("EASEOUTCIRC");
		static EASEOUTCIRC = Ease.OUT_CIRC;
		static IN_OUT_CIRC = new Ease("EASEINOUTCIRC");
		static EASEINOUTCIRC = Ease.IN_OUT_CIRC;
		static OUT_IN_CIRC = new Ease("EASEOUTINCIRC");
		static EASEOUTINCIRC = Ease.OUT_IN_CIRC;
		static IN_ELASTIC = new Ease("EASEINELASTIC");
		static EASEINELASTIC = Ease.IN_ELASTIC;
		static OUT_ELASTIC = new Ease("EASEOUTELASTIC");
		static EASEOUTELASTIC = Ease.OUT_ELASTIC;
		static IN_OUT_ELASTIC = new Ease("EASEINOUTELASTIC");
		static EASEINOUTELASTIC = Ease.IN_OUT_ELASTIC;
		static OUT_IN_ELASTIC = new Ease("EASEOUTINELASTIC");
		static EASEOUTINELASTIC = Ease.OUT_IN_ELASTIC;
		static IN_BACK = new Ease("EASEINBACK");
		static EASEINBACK = Ease.IN_BACK;
		static OUT_BACK = new Ease("EASEOUTBACK");
		static EASEOUTBACK = Ease.OUT_BACK;
		static IN_OUT_BACK = new Ease("EASEINOUTBACK");
		static EASEINOUTBACK = Ease.IN_OUT_BACK;
		static OUT_IN_BACK = new Ease("EASEOUTINTBACK");
		static EASEOUTINBACK = Ease.OUT_IN_BACK;
		static OUT_BOUNCE = new Ease("EASEOUTBOUNCE");
		static EASEOUTBOUNCE = Ease.OUT_BOUNCE;
		static IN_BOUNCE = new Ease("EASEINBOUNCE");
		static EASEINBOUNCE = Ease.IN_BOUNCE;
		static IN_OUT_BOUNCE = new Ease("EASEINOUTBOUNCE");
		static EASEINOUTBOUNCE = Ease.IN_OUT_BOUNCE;
		static OUT_IN_BOUNCE = new Ease("EASEOUTINBOUNCE");
		static EASEOUTINBOUNCE = Ease.OUT_IN_BOUNCE;
	}
}