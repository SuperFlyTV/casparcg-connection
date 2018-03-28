"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var Enum;
(function (Enum) {
    /**
     *
     */
    var AbstractEnum = /** @class */ (function () {
        /**
         *
         */
        function AbstractEnum(value) {
            this.value = value;
        }
        /**
         *
         */
        AbstractEnum.prototype.toString = function () {
            return this.value;
        };
        return AbstractEnum;
    }());
    Enum.AbstractEnum = AbstractEnum;
    /**
     *
     */
    var Command = /** @class */ (function (_super) {
        __extends(Command, _super);
        function Command() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Command.LOADBG = new Command('LOADBG');
        Command.LOAD = new Command('LOAD');
        Command.PLAY = new Command('PLAY');
        Command.PAUSE = new Command('PAUSE');
        Command.RESUME = new Command('RESUME');
        Command.STOP = new Command('STOP');
        Command.CLEAR = new Command('CLEAR');
        Command.CALL = new Command('CALL');
        Command.SWAP = new Command('SWAP');
        Command.ADD = new Command('ADD');
        Command.REMOVE = new Command('REMOVE');
        Command.PRINT = new Command('PRINT');
        Command.LOG_LEVEL = new Command('LOG LEVEL');
        Command.LOG_CATEGORY = new Command('LOG CATEGORY');
        Command.SET = new Command('SET');
        Command.LOCK = new Command('LOCK');
        Command.DATA_STORE = new Command('DATA STORE');
        Command.DATA_RETRIEVE = new Command('DATA RETRIEVE');
        Command.DATA_LIST = new Command('DATA LIST');
        Command.DATA_REMOVE = new Command('DATA REMOVE');
        Command.CG_ADD = new Command('CG ADD');
        Command.CG_PLAY = new Command('CG PLAY');
        Command.CG_STOP = new Command('CG STOP');
        Command.CG_NEXT = new Command('CG NEXT');
        Command.CG_REMOVE = new Command('CG REMOVE');
        Command.CG_CLEAR = new Command('CG CLEAR');
        Command.CG_UPDATE = new Command('CG UPDATE');
        Command.CG_INVOKE = new Command('CG INVOKE');
        Command.CG_INFO = new Command('CG INFO');
        Command.MIXER_KEYER = new Command('MIXER KEYER');
        Command.MIXER_CHROMA = new Command('MIXER CHROMA');
        Command.MIXER_BLEND = new Command('MIXER BLEND');
        Command.MIXER_OPACITY = new Command('MIXER OPACITY');
        Command.MIXER_BRIGHTNESS = new Command('MIXER BRIGHTNESS');
        Command.MIXER_SATURATION = new Command('MIXER SATURATION');
        Command.MIXER_CONTRAST = new Command('MIXER CONTRAST');
        Command.MIXER_LEVELS = new Command('MIXER LEVELS');
        Command.MIXER_FILL = new Command('MIXER FILL');
        Command.MIXER_CLIP = new Command('MIXER CLIP');
        Command.MIXER_ANCHOR = new Command('MIXER ANCHOR');
        Command.MIXER_CROP = new Command('MIXER CROP');
        Command.MIXER_ROTATION = new Command('MIXER ROTATION');
        Command.MIXER_PERSPECTIVE = new Command('MIXER PERSPECTIVE');
        Command.MIXER_MIPMAP = new Command('MIXER MIPMAP');
        Command.MIXER_VOLUME = new Command('MIXER VOLUME');
        Command.MIXER_MASTERVOLUME = new Command('MIXER MASTERVOLUME');
        Command.MIXER_STRAIGHT_ALPHA_OUTPUT = new Command('MIXER STRAIGHT_ALPHA_OUTPUT');
        Command.MIXER_GRID = new Command('MIXER GRID');
        Command.MIXER_COMMIT = new Command('MIXER COMMIT');
        Command.MIXER_CLEAR = new Command('MIXER CLEAR');
        Command.CHANNEL_GRID = new Command('CHANNEL_GRID');
        Command.THUMBNAIL_LIST = new Command('THUMBNAIL LIST');
        Command.THUMBNAIL_RETRIEVE = new Command('THUMBNAIL RETRIEVE');
        Command.THUMBNAIL_GENERATE = new Command('THUMBNAIL GENERATE');
        Command.THUMBNAIL_GENERATE_ALL = new Command('THUMBNAIL GENERATE_ALL');
        Command.CINF = new Command('CINF');
        Command.CLS = new Command('CLS');
        Command.FLS = new Command('FLS');
        Command.TLS = new Command('TLS');
        Command.VERSION = new Command('VERSION');
        Command.INFO = new Command('INFO');
        Command.INFO_TEMPLATE = new Command('INFO TEMPLATE');
        Command.INFO_CONFIG = new Command('INFO CONFIG');
        Command.INFO_PATHS = new Command('INFO PATHS');
        Command.INFO_SYSTEM = new Command('INFO SYSTEM');
        Command.INFO_SERVER = new Command('INFO SERVER');
        Command.INFO_QUEUES = new Command('INFO QUEUES');
        Command.INFO_THREADS = new Command('INFO THREADS');
        Command.INFO_DELAY = new Command('INFO DELAY');
        Command.DIAG = new Command('DIAG');
        Command.GL_INFO = new Command('GL INFO');
        Command.GL_GC = new Command('GL GC');
        Command.BYE = new Command('BYE');
        Command.KILL = new Command('KILL');
        Command.RESTART = new Command('RESTART');
        Command.HELP = new Command('HELP');
        Command.HELP_PRODUCER = new Command('HELP PRODUCER');
        Command.HELP_CONSUMER = new Command('HELP CONSUMER');
        return Command;
    }(AbstractEnum));
    Enum.Command = Command;
    /**
     *
     */
    var Producer = /** @class */ (function (_super) {
        __extends(Producer, _super);
        function Producer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Producer.FFMPEG = new Producer('FFmpeg Producer');
        Producer.DECKLINK = new Producer('Decklink Producer');
        Producer.HTML = new Producer('HTML Producer');
        Producer.PSD = new Producer('PSD Scene Producer');
        Producer.FLASH = new Producer('Flash Producer (.ft)');
        Producer.FLASH_CT = new Producer('Flash Producer (.ct)');
        Producer.FLASH_SWF = new Producer('Flash Producer (.swf)');
        Producer.IMAGE_SCROLL = new Producer('Image Scroll Producer');
        Producer.IMAGE = new Producer('Image Producer');
        Producer.REROUTE = new Producer('Reroute Producer');
        Producer.TEXT = new Producer('Text Producer');
        Producer.SCENE = new Producer('XML Scene Producer');
        Producer.COLOR = new Producer('Color Producer');
        return Producer;
    }(AbstractEnum));
    Enum.Producer = Producer;
    /**
     *
     */
    var Consumer = /** @class */ (function (_super) {
        __extends(Consumer, _super);
        function Consumer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Consumer.FFMPEG = new Consumer('FFMpeg Consumer');
        Consumer.STREAMING = new Consumer('Streaming Consumer');
        Consumer.ADUIO = new Consumer('System Audio Consumer');
        Consumer.BLUEFISH = new Consumer('Bluefish Consumer');
        Consumer.DECKLINK = new Consumer('Decklink Consumer');
        Consumer.SCREEN = new Consumer('Screen Consumer');
        Consumer.IVGA = new Consumer('iVGA Consumer');
        Consumer.IMAGE = new Consumer('Image Consumer');
        return Consumer;
    }(AbstractEnum));
    Enum.Consumer = Consumer;
    /**
     *
     *
     */
    var Version = /** @class */ (function (_super) {
        __extends(Version, _super);
        function Version() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Version.SERVER = new Version('SERVER');
        Version.FLASH = new Version('FLASH');
        Version.TEMPLATEHOST = new Version('TEMPLATEHOST');
        Version.CEF = new Version('CEF');
        return Version;
    }(AbstractEnum));
    Enum.Version = Version;
    /**
     *
     *
     */
    var Lock = /** @class */ (function (_super) {
        __extends(Lock, _super);
        function Lock() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Lock.ACQUIRE = new Lock('ACQUIRE');
        Lock.RELEASE = new Lock('RELEASE');
        Lock.CLEAR = new Lock('CLEAR');
        return Lock;
    }(AbstractEnum));
    Enum.Lock = Lock;
    /**
     *
     *
     */
    var LogCategory = /** @class */ (function (_super) {
        __extends(LogCategory, _super);
        function LogCategory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LogCategory.CALLTRACE = new LogCategory('CALLTRACE');
        LogCategory.COMMUNICATION = new LogCategory('COMMUNICATION');
        return LogCategory;
    }(AbstractEnum));
    Enum.LogCategory = LogCategory;
    /**
     *
     *
     */
    var Chroma = /** @class */ (function (_super) {
        __extends(Chroma, _super);
        function Chroma() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Chroma.NONE = new Chroma('NONE');
        Chroma.GREEN = new Chroma('GREEN');
        Chroma.BLUE = new Chroma('BLUE');
        return Chroma;
    }(AbstractEnum));
    Enum.Chroma = Chroma;
    /**
     *
     *
     */
    var LogLevel = /** @class */ (function (_super) {
        __extends(LogLevel, _super);
        function LogLevel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LogLevel.TRACE = new LogLevel('TRACE');
        LogLevel.DEBUG = new LogLevel('DEBUG');
        LogLevel.INFO = new LogLevel('INFO');
        LogLevel.WARNING = new LogLevel('WARNING');
        LogLevel.ERROR = new LogLevel('ERROR');
        LogLevel.FATAL = new LogLevel('FATAL'); // @todo: 2.1?????
        return LogLevel;
    }(AbstractEnum));
    Enum.LogLevel = LogLevel;
    /**
     *
     *
     */
    var Transition = /** @class */ (function (_super) {
        __extends(Transition, _super);
        function Transition() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Transition.CUT = new Transition('CUT');
        Transition.MIX = new Transition('MIX');
        Transition.PUSH = new Transition('PUSH');
        Transition.WIPE = new Transition('WIPE');
        Transition.SLIDE = new Transition('SLIDE');
        return Transition;
    }(AbstractEnum));
    Enum.Transition = Transition;
    /**
     *
     *
     */
    var Direction = /** @class */ (function (_super) {
        __extends(Direction, _super);
        function Direction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Direction.LEFT = new Direction('LEFT');
        Direction.RIGHT = new Direction('RIGHT');
        return Direction;
    }(AbstractEnum));
    Enum.Direction = Direction;
    /**
     *
     */
    var BlendMode = /** @class */ (function (_super) {
        __extends(BlendMode, _super);
        function BlendMode() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BlendMode.NORMAL = new BlendMode('NORMAL');
        BlendMode.LIGHTEN = new BlendMode('LIGHTEN');
        BlendMode.DARKEN = new BlendMode('DARKEN');
        BlendMode.MULTIPLY = new BlendMode('MULTIPLY');
        BlendMode.AVERAGE = new BlendMode('AVERAGE');
        BlendMode.ADD = new BlendMode('ADD');
        BlendMode.SUBTRACT = new BlendMode('SUBTRACT');
        BlendMode.DIFFERENCE = new BlendMode('DIFFERENCE');
        BlendMode.NEGATION = new BlendMode('NEGATION');
        BlendMode.EXCLUSION = new BlendMode('EXCLUSION');
        BlendMode.SCREEN = new BlendMode('SCREEN');
        BlendMode.OVERLAY = new BlendMode('OVERLAY');
        BlendMode.SOFT_LIGHT = new BlendMode('SOFT LIGHT');
        BlendMode.HARD_LIGHT = new BlendMode('HARD LIGHT');
        BlendMode.COLOR_DODGE = new BlendMode('COLOR DODGE');
        BlendMode.COLOR_BURN = new BlendMode('COLOR BURN');
        BlendMode.LINEAR_DODGE = new BlendMode('LINEAR DODGE');
        BlendMode.LINEAR_BURN = new BlendMode('LINEAR BURN');
        BlendMode.LINEAR_LIGHT = new BlendMode('LINEAR LIGHT');
        BlendMode.VIVID_LIGHT = new BlendMode('VIVID LIGHT');
        BlendMode.PIN_LIGHT = new BlendMode('PIN LIGHT');
        BlendMode.HARD_MIX = new BlendMode('HARD MIX');
        BlendMode.REFLECT = new BlendMode('REFLECT');
        BlendMode.GLOW = new BlendMode('GLOW');
        BlendMode.PHOENIX = new BlendMode('PHOENIX');
        BlendMode.CONTRAST = new BlendMode('CONTRAST');
        BlendMode.SATURATION = new BlendMode('SATURATION');
        BlendMode.COLOR = new BlendMode('COLOR');
        BlendMode.LUMINOSITY = new BlendMode('LUMINOSITY');
        return BlendMode;
    }(AbstractEnum));
    Enum.BlendMode = BlendMode;
    /**
     *
     */
    var Ease = /** @class */ (function (_super) {
        __extends(Ease, _super);
        function Ease() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Ease.LINEAR = new Ease('LINEAR');
        Ease.EASELINEAR = Ease.LINEAR;
        Ease.NONE = new Ease('EASENONE');
        Ease.EASENONE = Ease.NONE;
        Ease.IN_QUAD = new Ease('EASEINQUAD');
        Ease.EASEINQUAD = Ease.IN_QUAD;
        Ease.OUT_QUAD = new Ease('EASEOUTQUAD');
        Ease.EASEOUTQUAD = Ease.OUT_QUAD;
        Ease.IN_OUT_QUAD = new Ease('EASEINOUTQUAD');
        Ease.EASEINOUTQUAD = Ease.IN_OUT_QUAD;
        Ease.OUT_IN_QUAD = new Ease('EASEOUTINQUAD');
        Ease.EASEOUTINQUAD = Ease.OUT_IN_QUAD;
        Ease.IN_CUBIC = new Ease('EASEINCUBIC');
        Ease.EASEINCUBIC = Ease.IN_CUBIC;
        Ease.OUT_CUBIC = new Ease('EASEOUTCUBIC');
        Ease.EASEOUTCUBIC = Ease.OUT_CUBIC;
        Ease.IN_OUT_CUBIC = new Ease('EASEINOUTCUBIC');
        Ease.EASEINOUTCUBIC = Ease.IN_OUT_CUBIC;
        Ease.OUT_IN_CUBIC = new Ease('EASEOUTINCUBIC');
        Ease.EASEOUTINCUBIC = Ease.OUT_IN_CUBIC;
        Ease.IN_QUART = new Ease('EASEINQUART');
        Ease.EASEINQUART = Ease.IN_QUART;
        Ease.OUT_QUART = new Ease('EASEOUTQUART');
        Ease.EASEOUTQUART = Ease.OUT_QUART;
        Ease.IN_OUT_QUART = new Ease('EASEINOUTQUART');
        Ease.EASEINOUTQUART = Ease.IN_OUT_QUART;
        Ease.OUT_IN_QUART = new Ease('EASEOUTINQUART');
        Ease.EASEOUTINQUART = Ease.OUT_IN_QUART;
        Ease.IN_QUINT = new Ease('EASEINQUINT');
        Ease.EASEINQUINT = Ease.IN_QUINT;
        Ease.OUT_QUINT = new Ease('EASEOUTQUINT');
        Ease.EASEOUTQUINT = Ease.OUT_QUINT;
        Ease.IN_OUT_QUINT = new Ease('EASEINOUTQUINT');
        Ease.EASEINOUTQUINT = Ease.IN_OUT_QUINT;
        Ease.OUT_IN_QUINT = new Ease('EASEOUTINQUINT');
        Ease.EASEOUTINQUINT = Ease.OUT_IN_QUINT;
        Ease.IN_SINE = new Ease('EASEINSINE');
        Ease.EASEINSINE = Ease.IN_SINE;
        Ease.OUT_SINE = new Ease('EASEOUTSINE');
        Ease.EASEOUTSINE = Ease.OUT_SINE;
        Ease.IN_OUT_SINE = new Ease('EASEINOUTSINE');
        Ease.EASEINOUTSINE = Ease.IN_OUT_SINE;
        Ease.OUT_IN_SINE = new Ease('EASEOUTINSINE');
        Ease.EASEOUTINSINE = Ease.OUT_IN_SINE;
        Ease.IN_EXPO = new Ease('EASEINEXPO');
        Ease.EASEINEXPO = Ease.IN_EXPO;
        Ease.OUT_EXPO = new Ease('EASEOUTEXPO');
        Ease.EASEOUTEXPO = Ease.OUT_EXPO;
        Ease.IN_OUT_EXPO = new Ease('EASEINOUTEXPO');
        Ease.EASEINOUTEXPO = Ease.IN_OUT_EXPO;
        Ease.OUT_IN_EXPO = new Ease('EASEOUTINEXPO');
        Ease.EASEOUTINEXPO = Ease.OUT_IN_EXPO;
        Ease.IN_CIRC = new Ease('EASEINCIRC');
        Ease.EASEINCIRC = Ease.IN_CIRC;
        Ease.OUT_CIRC = new Ease('EASEOUTCIRC');
        Ease.EASEOUTCIRC = Ease.OUT_CIRC;
        Ease.IN_OUT_CIRC = new Ease('EASEINOUTCIRC');
        Ease.EASEINOUTCIRC = Ease.IN_OUT_CIRC;
        Ease.OUT_IN_CIRC = new Ease('EASEOUTINCIRC');
        Ease.EASEOUTINCIRC = Ease.OUT_IN_CIRC;
        Ease.IN_ELASTIC = new Ease('EASEINELASTIC');
        Ease.EASEINELASTIC = Ease.IN_ELASTIC;
        Ease.OUT_ELASTIC = new Ease('EASEOUTELASTIC');
        Ease.EASEOUTELASTIC = Ease.OUT_ELASTIC;
        Ease.IN_OUT_ELASTIC = new Ease('EASEINOUTELASTIC');
        Ease.EASEINOUTELASTIC = Ease.IN_OUT_ELASTIC;
        Ease.OUT_IN_ELASTIC = new Ease('EASEOUTINELASTIC');
        Ease.EASEOUTINELASTIC = Ease.OUT_IN_ELASTIC;
        Ease.IN_BACK = new Ease('EASEINBACK');
        Ease.EASEINBACK = Ease.IN_BACK;
        Ease.OUT_BACK = new Ease('EASEOUTBACK');
        Ease.EASEOUTBACK = Ease.OUT_BACK;
        Ease.IN_OUT_BACK = new Ease('EASEINOUTBACK');
        Ease.EASEINOUTBACK = Ease.IN_OUT_BACK;
        Ease.OUT_IN_BACK = new Ease('EASEOUTINTBACK');
        Ease.EASEOUTINBACK = Ease.OUT_IN_BACK;
        Ease.OUT_BOUNCE = new Ease('EASEOUTBOUNCE');
        Ease.EASEOUTBOUNCE = Ease.OUT_BOUNCE;
        Ease.IN_BOUNCE = new Ease('EASEINBOUNCE');
        Ease.EASEINBOUNCE = Ease.IN_BOUNCE;
        Ease.IN_OUT_BOUNCE = new Ease('EASEINOUTBOUNCE');
        Ease.EASEINOUTBOUNCE = Ease.IN_OUT_BOUNCE;
        Ease.OUT_IN_BOUNCE = new Ease('EASEOUTINBOUNCE');
        Ease.EASEOUTINBOUNCE = Ease.OUT_IN_BOUNCE;
        return Ease;
    }(AbstractEnum));
    Enum.Ease = Ease;
    /**
     *
     */
    var ChannelFormat = /** @class */ (function (_super) {
        __extends(ChannelFormat, _super);
        function ChannelFormat() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ChannelFormat.INVALID = new ChannelFormat('invalid');
        ChannelFormat.PAL = new ChannelFormat('PAL');
        ChannelFormat.NTSC = new ChannelFormat('NTSC');
        ChannelFormat.SD_576P2500 = new ChannelFormat('576p2500');
        ChannelFormat.HD_720P2398 = new ChannelFormat('720p2398');
        ChannelFormat.HD_720P2400 = new ChannelFormat('720p2400');
        ChannelFormat.HD_720P2500 = new ChannelFormat('720p2500');
        ChannelFormat.HD_720P5000 = new ChannelFormat('720p5000');
        ChannelFormat.HD_720P2997 = new ChannelFormat('720p2997');
        ChannelFormat.HD_720P5994 = new ChannelFormat('720p5994');
        ChannelFormat.HD_720P3000 = new ChannelFormat('720p3000');
        ChannelFormat.HD_720P6000 = new ChannelFormat('720p6000');
        ChannelFormat.HD_1080P2398 = new ChannelFormat('1080p2398');
        ChannelFormat.HD_1080P2400 = new ChannelFormat('1080p2400');
        ChannelFormat.HD_1080I5000 = new ChannelFormat('1080i5000');
        ChannelFormat.HD_1080I5994 = new ChannelFormat('1080i5994');
        ChannelFormat.HD_1080I6000 = new ChannelFormat('1080i6000');
        ChannelFormat.HD_1080P2500 = new ChannelFormat('1080p2500');
        ChannelFormat.HD_1080P2997 = new ChannelFormat('1080p2997');
        ChannelFormat.HD_1080P3000 = new ChannelFormat('1080p3000');
        ChannelFormat.HD_1080P5000 = new ChannelFormat('1080p5000');
        ChannelFormat.HD_1080P5994 = new ChannelFormat('1080p5994');
        ChannelFormat.HD_1080P6000 = new ChannelFormat('1080p6000');
        ChannelFormat.UHD_1556P2398 = new ChannelFormat('1556p2398');
        ChannelFormat.UHD_1556P2400 = new ChannelFormat('1556p2400');
        ChannelFormat.UHD_1556P2500 = new ChannelFormat('1556p2500');
        ChannelFormat.DCI_1080P2398 = new ChannelFormat('dci1080p2398');
        ChannelFormat.DCI_1080P2400 = new ChannelFormat('dci1080p2400');
        ChannelFormat.DCI_1080P2500 = new ChannelFormat('dci1080p2500');
        ChannelFormat.UHD_2160P2398 = new ChannelFormat('2160p2398');
        ChannelFormat.UCH_2160P2400 = new ChannelFormat('2160p2400');
        ChannelFormat.UHD_2160P2500 = new ChannelFormat('2160p2500');
        ChannelFormat.UHD_2160P2997 = new ChannelFormat('2160p2997');
        ChannelFormat.UHD_2160P3000 = new ChannelFormat('2160p3000');
        ChannelFormat.UHD_2160P5000 = new ChannelFormat('2160p5000');
        ChannelFormat.UHD_2160P5994 = new ChannelFormat('2160p5994');
        ChannelFormat.UHD_2160P6000 = new ChannelFormat('2160p6000');
        ChannelFormat.DCI_2160P2398 = new ChannelFormat('dci2160p2398');
        ChannelFormat.DCI_2160P2400 = new ChannelFormat('dci2160p2400');
        ChannelFormat.DCI_2160P2500 = new ChannelFormat('dci2160p2500');
        return ChannelFormat;
    }(AbstractEnum));
    Enum.ChannelFormat = ChannelFormat;
    /**
     *
     */
    var ChannelLayout = /** @class */ (function (_super) {
        __extends(ChannelLayout, _super);
        function ChannelLayout() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ChannelLayout;
    }(AbstractEnum));
    Enum.ChannelLayout = ChannelLayout;
})(Enum = exports.Enum || (exports.Enum = {}));
