/**
 *
 */
export declare namespace Enum {
    /**
     *
     */
    abstract class AbstractEnum {
        value: string;
        /**
         *
         */
        constructor(value: string);
        /**
         *
         */
        toString(): string;
    }
    /**
     *
     */
    class Command extends AbstractEnum {
        static LOADBG: Command;
        static LOAD: Command;
        static PLAY: Command;
        static PAUSE: Command;
        static RESUME: Command;
        static STOP: Command;
        static CLEAR: Command;
        static CALL: Command;
        static SWAP: Command;
        static ADD: Command;
        static REMOVE: Command;
        static PRINT: Command;
        static LOG_LEVEL: Command;
        static LOG_CATEGORY: Command;
        static SET: Command;
        static LOCK: Command;
        static DATA_STORE: Command;
        static DATA_RETRIEVE: Command;
        static DATA_LIST: Command;
        static DATA_REMOVE: Command;
        static CG_ADD: Command;
        static CG_PLAY: Command;
        static CG_STOP: Command;
        static CG_NEXT: Command;
        static CG_REMOVE: Command;
        static CG_CLEAR: Command;
        static CG_UPDATE: Command;
        static CG_INVOKE: Command;
        static CG_INFO: Command;
        static MIXER_KEYER: Command;
        static MIXER_CHROMA: Command;
        static MIXER_BLEND: Command;
        static MIXER_OPACITY: Command;
        static MIXER_BRIGHTNESS: Command;
        static MIXER_SATURATION: Command;
        static MIXER_CONTRAST: Command;
        static MIXER_LEVELS: Command;
        static MIXER_FILL: Command;
        static MIXER_CLIP: Command;
        static MIXER_ANCHOR: Command;
        static MIXER_CROP: Command;
        static MIXER_ROTATION: Command;
        static MIXER_PERSPECTIVE: Command;
        static MIXER_MIPMAP: Command;
        static MIXER_VOLUME: Command;
        static MIXER_MASTERVOLUME: Command;
        static MIXER_STRAIGHT_ALPHA_OUTPUT: Command;
        static MIXER_GRID: Command;
        static MIXER_COMMIT: Command;
        static MIXER_CLEAR: Command;
        static CHANNEL_GRID: Command;
        static THUMBNAIL_LIST: Command;
        static THUMBNAIL_RETRIEVE: Command;
        static THUMBNAIL_GENERATE: Command;
        static THUMBNAIL_GENERATE_ALL: Command;
        static CINF: Command;
        static CLS: Command;
        static FLS: Command;
        static TLS: Command;
        static VERSION: Command;
        static INFO: Command;
        static INFO_TEMPLATE: Command;
        static INFO_CONFIG: Command;
        static INFO_PATHS: Command;
        static INFO_SYSTEM: Command;
        static INFO_SERVER: Command;
        static INFO_QUEUES: Command;
        static INFO_THREADS: Command;
        static INFO_DELAY: Command;
        static DIAG: Command;
        static GL_INFO: Command;
        static GL_GC: Command;
        static BYE: Command;
        static KILL: Command;
        static RESTART: Command;
        static HELP: Command;
        static HELP_PRODUCER: Command;
        static HELP_CONSUMER: Command;
    }
    /**
     *
     */
    class Producer extends AbstractEnum {
        static FFMPEG: Producer;
        static DECKLINK: Producer;
        static HTML: Producer;
        static PSD: Producer;
        static FLASH: Producer;
        static FLASH_CT: Producer;
        static FLASH_SWF: Producer;
        static IMAGE_SCROLL: Producer;
        static IMAGE: Producer;
        static REROUTE: Producer;
        static TEXT: Producer;
        static SCENE: Producer;
        static COLOR: Producer;
    }
    /**
     *
     */
    class Consumer extends AbstractEnum {
        static FFMPEG: Consumer;
        static STREAMING: Consumer;
        static ADUIO: Consumer;
        static BLUEFISH: Consumer;
        static DECKLINK: Consumer;
        static SCREEN: Consumer;
        static IVGA: Consumer;
        static IMAGE: Consumer;
    }
    /**
     *
     *
     */
    class Version extends AbstractEnum {
        static SERVER: Version;
        static FLASH: Version;
        static TEMPLATEHOST: Version;
        static CEF: Version;
    }
    /**
     *
     *
     */
    class Lock extends AbstractEnum {
        static ACQUIRE: Lock;
        static RELEASE: Lock;
        static CLEAR: Lock;
    }
    /**
     *
     *
     */
    class LogCategory extends AbstractEnum {
        static CALLTRACE: LogCategory;
        static COMMUNICATION: LogCategory;
    }
    /**
     *
     *
     */
    class Chroma extends AbstractEnum {
        static NONE: Chroma;
        static GREEN: Chroma;
        static BLUE: Chroma;
    }
    /**
     *
     *
     */
    class LogLevel extends AbstractEnum {
        static TRACE: LogLevel;
        static DEBUG: LogLevel;
        static INFO: LogLevel;
        static WARNING: LogLevel;
        static ERROR: LogLevel;
        static FATAL: LogLevel;
    }
    /**
     *
     *
     */
    class Transition extends AbstractEnum {
        static CUT: Transition;
        static MIX: Transition;
        static PUSH: Transition;
        static WIPE: Transition;
        static SLIDE: Transition;
    }
    /**
     *
     *
     */
    class Direction extends AbstractEnum {
        static LEFT: Direction;
        static RIGHT: Direction;
    }
    /**
     *
     */
    class BlendMode extends AbstractEnum {
        static NORMAL: BlendMode;
        static LIGHTEN: BlendMode;
        static DARKEN: BlendMode;
        static MULTIPLY: BlendMode;
        static AVERAGE: BlendMode;
        static ADD: BlendMode;
        static SUBTRACT: BlendMode;
        static DIFFERENCE: BlendMode;
        static NEGATION: BlendMode;
        static EXCLUSION: BlendMode;
        static SCREEN: BlendMode;
        static OVERLAY: BlendMode;
        static SOFT_LIGHT: BlendMode;
        static HARD_LIGHT: BlendMode;
        static COLOR_DODGE: BlendMode;
        static COLOR_BURN: BlendMode;
        static LINEAR_DODGE: BlendMode;
        static LINEAR_BURN: BlendMode;
        static LINEAR_LIGHT: BlendMode;
        static VIVID_LIGHT: BlendMode;
        static PIN_LIGHT: BlendMode;
        static HARD_MIX: BlendMode;
        static REFLECT: BlendMode;
        static GLOW: BlendMode;
        static PHOENIX: BlendMode;
        static CONTRAST: BlendMode;
        static SATURATION: BlendMode;
        static COLOR: BlendMode;
        static LUMINOSITY: BlendMode;
    }
    /**
     *
     */
    class Ease extends AbstractEnum {
        static LINEAR: Ease;
        static EASELINEAR: Ease;
        static NONE: Ease;
        static EASENONE: Ease;
        static IN_QUAD: Ease;
        static EASEINQUAD: Ease;
        static OUT_QUAD: Ease;
        static EASEOUTQUAD: Ease;
        static IN_OUT_QUAD: Ease;
        static EASEINOUTQUAD: Ease;
        static OUT_IN_QUAD: Ease;
        static EASEOUTINQUAD: Ease;
        static IN_CUBIC: Ease;
        static EASEINCUBIC: Ease;
        static OUT_CUBIC: Ease;
        static EASEOUTCUBIC: Ease;
        static IN_OUT_CUBIC: Ease;
        static EASEINOUTCUBIC: Ease;
        static OUT_IN_CUBIC: Ease;
        static EASEOUTINCUBIC: Ease;
        static IN_QUART: Ease;
        static EASEINQUART: Ease;
        static OUT_QUART: Ease;
        static EASEOUTQUART: Ease;
        static IN_OUT_QUART: Ease;
        static EASEINOUTQUART: Ease;
        static OUT_IN_QUART: Ease;
        static EASEOUTINQUART: Ease;
        static IN_QUINT: Ease;
        static EASEINQUINT: Ease;
        static OUT_QUINT: Ease;
        static EASEOUTQUINT: Ease;
        static IN_OUT_QUINT: Ease;
        static EASEINOUTQUINT: Ease;
        static OUT_IN_QUINT: Ease;
        static EASEOUTINQUINT: Ease;
        static IN_SINE: Ease;
        static EASEINSINE: Ease;
        static OUT_SINE: Ease;
        static EASEOUTSINE: Ease;
        static IN_OUT_SINE: Ease;
        static EASEINOUTSINE: Ease;
        static OUT_IN_SINE: Ease;
        static EASEOUTINSINE: Ease;
        static IN_EXPO: Ease;
        static EASEINEXPO: Ease;
        static OUT_EXPO: Ease;
        static EASEOUTEXPO: Ease;
        static IN_OUT_EXPO: Ease;
        static EASEINOUTEXPO: Ease;
        static OUT_IN_EXPO: Ease;
        static EASEOUTINEXPO: Ease;
        static IN_CIRC: Ease;
        static EASEINCIRC: Ease;
        static OUT_CIRC: Ease;
        static EASEOUTCIRC: Ease;
        static IN_OUT_CIRC: Ease;
        static EASEINOUTCIRC: Ease;
        static OUT_IN_CIRC: Ease;
        static EASEOUTINCIRC: Ease;
        static IN_ELASTIC: Ease;
        static EASEINELASTIC: Ease;
        static OUT_ELASTIC: Ease;
        static EASEOUTELASTIC: Ease;
        static IN_OUT_ELASTIC: Ease;
        static EASEINOUTELASTIC: Ease;
        static OUT_IN_ELASTIC: Ease;
        static EASEOUTINELASTIC: Ease;
        static IN_BACK: Ease;
        static EASEINBACK: Ease;
        static OUT_BACK: Ease;
        static EASEOUTBACK: Ease;
        static IN_OUT_BACK: Ease;
        static EASEINOUTBACK: Ease;
        static OUT_IN_BACK: Ease;
        static EASEOUTINBACK: Ease;
        static OUT_BOUNCE: Ease;
        static EASEOUTBOUNCE: Ease;
        static IN_BOUNCE: Ease;
        static EASEINBOUNCE: Ease;
        static IN_OUT_BOUNCE: Ease;
        static EASEINOUTBOUNCE: Ease;
        static OUT_IN_BOUNCE: Ease;
        static EASEOUTINBOUNCE: Ease;
    }
    /**
     *
     */
    class ChannelFormat extends AbstractEnum {
        static INVALID: ChannelFormat;
        static PAL: ChannelFormat;
        static NTSC: ChannelFormat;
        static SD_576P2500: ChannelFormat;
        static HD_720P2398: ChannelFormat;
        static HD_720P2400: ChannelFormat;
        static HD_720P2500: ChannelFormat;
        static HD_720P5000: ChannelFormat;
        static HD_720P2997: ChannelFormat;
        static HD_720P5994: ChannelFormat;
        static HD_720P3000: ChannelFormat;
        static HD_720P6000: ChannelFormat;
        static HD_1080P2398: ChannelFormat;
        static HD_1080P2400: ChannelFormat;
        static HD_1080I5000: ChannelFormat;
        static HD_1080I5994: ChannelFormat;
        static HD_1080I6000: ChannelFormat;
        static HD_1080P2500: ChannelFormat;
        static HD_1080P2997: ChannelFormat;
        static HD_1080P3000: ChannelFormat;
        static HD_1080P5000: ChannelFormat;
        static HD_1080P5994: ChannelFormat;
        static HD_1080P6000: ChannelFormat;
        static UHD_1556P2398: ChannelFormat;
        static UHD_1556P2400: ChannelFormat;
        static UHD_1556P2500: ChannelFormat;
        static DCI_1080P2398: ChannelFormat;
        static DCI_1080P2400: ChannelFormat;
        static DCI_1080P2500: ChannelFormat;
        static UHD_2160P2398: ChannelFormat;
        static UCH_2160P2400: ChannelFormat;
        static UHD_2160P2500: ChannelFormat;
        static UHD_2160P2997: ChannelFormat;
        static UHD_2160P3000: ChannelFormat;
        static UHD_2160P5000: ChannelFormat;
        static UHD_2160P5994: ChannelFormat;
        static UHD_2160P6000: ChannelFormat;
        static DCI_2160P2398: ChannelFormat;
        static DCI_2160P2400: ChannelFormat;
        static DCI_2160P2500: ChannelFormat;
    }
    /**
     *
     */
    class ChannelLayout extends AbstractEnum {
    }
}
