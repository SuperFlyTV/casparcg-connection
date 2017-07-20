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
var xmlbuilder_1 = require("xmlbuilder");
// Options NS
var AMCPConnectionOptions_1 = require("./AMCPConnectionOptions");
var CasparCGVersion = AMCPConnectionOptions_1.Options.CasparCGVersion;
/***/
var Config;
(function (Config) {
    /***/
    var Utils;
    (function (Utils) {
        function configMemberFactory(version, memberName, initValues) {
            var member = undefined;
            switch (memberName) {
                case "config":
                    if (version < 2100) {
                        member = new v207.CasparCGConfigVO();
                    }
                    else {
                        member = new v21x.CasparCGConfigVO();
                    }
                    break;
                case "channel":
                    if (version < 2100) {
                        member = new v207.Channel();
                    }
                    else {
                        member = new v21x.Channel();
                    }
                    break;
                case "decklink":
                    if (version < 2100) {
                        member = new v207.DecklinkConsumer();
                    }
                    else {
                        member = new v21x.DecklinkConsumer();
                    }
                    break;
                case "bluefish":
                    member = new v2xx.BluefishConsumer();
                    break;
                case "system-audio":
                    if (version < 2100) {
                        member = new v207.SystemAudioConsumer();
                    }
                    else {
                        member = new v21x.SystemAudioConsumer();
                    }
                    break;
                case "screen":
                    if (version < 2100) {
                        member = new v207.ScreenConsumer();
                    }
                    else {
                        member = new v21x.ScreenConsumer();
                    }
                    break;
                case "newtek-ivga":
                    if (version < 2100) {
                        member = new v207.NewtekIvgaConsumer();
                    }
                    else {
                        member = new v21x.NewtekIvgaConsumer();
                    }
                    break;
                case "ffmpeg":
                    if (version > 2100) {
                        member = new v21x.FfmpegConsumer();
                    }
                    break;
                case "file":
                    if (version < 2100) {
                        member = new v207.FileConsumer();
                    }
                    break;
                case "stream":
                    if (version < 2100) {
                        member = new v207.StreamConsumer();
                    }
                    break;
                case "syncto":
                    if (version > 2100) {
                        member = new v21x.SynctoConsumer();
                    }
                    break;
                case "tcp":
                    member = new v2xx.Controller();
                    break;
                case "predefined-client":
                    member = new v2xx.OscClient();
                    break;
                case "template-host":
                    member = new v2xx.TemplateHost();
                    break;
                case "channel-layout":
                    if (version < 2100) {
                        member = new v207.ChannelLayout();
                    }
                    else {
                        member = new v21x.ChannelLayout();
                    }
                    break;
                case "mix-config":
                    if (version < 2100) {
                        member = new v207.MixConfig();
                    }
                    else {
                        member = new v21x.MixConfig();
                    }
                    break;
            }
            if (member && initValues) {
                for (var key in initValues) {
                    if (member.hasOwnProperty(key)) {
                        if (typeof member[key] === ((typeof initValues[key]) || undefined)) {
                            member[key] = initValues[key];
                        }
                    }
                }
            }
            return member;
        }
        Utils.configMemberFactory = configMemberFactory;
    })(Utils = Config.Utils || (Config.Utils = {}));
    /***/
    var v2xx;
    (function (v2xx) {
        /***/
        var CasparCGConfigVO = (function () {
            function CasparCGConfigVO() {
                this.channelGrid = false;
                this.flash = new v2xx.Flash();
                this.templateHosts = [];
            }
            return CasparCGConfigVO;
        }());
        v2xx.CasparCGConfigVO = CasparCGConfigVO;
        /***/
        var Channel = (function () {
            function Channel() {
                this._type = "channel";
                this.videoMode = "PAL"; // @todo: literal
                this.consumers = [];
                this.straightAlphaOutput = false;
                this.channelLayout = "stereo";
            }
            return Channel;
        }());
        v2xx.Channel = Channel;
        /***/
        var Consumer = (function () {
            function Consumer() {
            }
            return Consumer;
        }());
        v2xx.Consumer = Consumer;
        /***/
        var DecklinkConsumer = (function (_super) {
            __extends(DecklinkConsumer, _super);
            function DecklinkConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._type = "decklink";
                _this.device = 1;
                _this.keyDevice = null;
                _this.embeddedAudio = false;
                _this.channelLayout = "stereo";
                _this.latency = "normal"; // @todo: literal
                _this.keyer = "external"; // @todo: literal
                _this.keyOnly = false;
                _this.bufferDepth = 3;
                return _this;
            }
            return DecklinkConsumer;
        }(Consumer));
        v2xx.DecklinkConsumer = DecklinkConsumer;
        /***/
        var BluefishConsumer = (function (_super) {
            __extends(BluefishConsumer, _super);
            function BluefishConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._type = "bluefish";
                _this.device = 1;
                _this.embeddedAudio = false;
                _this.channelLayout = "stereo";
                _this.keyOnly = false;
                return _this;
            }
            return BluefishConsumer;
        }(Consumer));
        v2xx.BluefishConsumer = BluefishConsumer;
        /***/
        var SystemAudioConsumer = (function (_super) {
            __extends(SystemAudioConsumer, _super);
            function SystemAudioConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._type = "system-audio";
                return _this;
            }
            return SystemAudioConsumer;
        }(Consumer));
        v2xx.SystemAudioConsumer = SystemAudioConsumer;
        /***/
        var ScreenConsumer = (function (_super) {
            __extends(ScreenConsumer, _super);
            function ScreenConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._type = "screen";
                _this.device = 1; // @todo: wrong default implemented in caspar, should be 0:::
                _this.aspectRatio = "default"; // @todo: literal
                _this.stretch = "fill"; // @todo: literal
                _this.windowed = true;
                _this.keyOnly = false;
                _this.autoDeinterlace = true;
                _this.vsync = false;
                _this.borderless = false;
                return _this;
            }
            return ScreenConsumer;
        }(Consumer));
        v2xx.ScreenConsumer = ScreenConsumer;
        /***/
        var NewtekIvgaConsumer = (function (_super) {
            __extends(NewtekIvgaConsumer, _super);
            function NewtekIvgaConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._type = "newtek-ivga";
                return _this;
            }
            return NewtekIvgaConsumer;
        }(Consumer));
        v2xx.NewtekIvgaConsumer = NewtekIvgaConsumer;
        /***/
        var Controller = (function () {
            function Controller() {
                this._type = "tcp";
                this.port = null;
                this.protocol = "";
            }
            return Controller;
        }());
        v2xx.Controller = Controller;
        /***/
        var Mixer = (function () {
            function Mixer() {
                this.blendModes = false;
                this.straightAlpha = false;
                this.mipmappingDefaultOn = false;
            }
            return Mixer;
        }());
        v2xx.Mixer = Mixer;
        /***/
        var OscClient = (function () {
            function OscClient() {
                this._type = "predefined-client";
                this.address = "";
                this.port = null;
            }
            return OscClient;
        }());
        v2xx.OscClient = OscClient;
        /***/
        var Thumbnails = (function () {
            function Thumbnails() {
                this.generateThumbnails = true;
                this.width = 256;
                this.height = 144;
                this.videoGrid = 2;
                this.scanIntervalMillis = 5000;
                this.generateDelayMillis = 2000;
                this.mipmap = false;
                this.videoMode = "720p5000"; // @todo: literal
            }
            return Thumbnails;
        }());
        v2xx.Thumbnails = Thumbnails;
        /***/
        var Flash = (function () {
            function Flash() {
                this.bufferDepth = "auto";
            }
            return Flash;
        }());
        v2xx.Flash = Flash;
        /***/
        var TemplateHost = (function () {
            function TemplateHost() {
                this._type = "template-host";
                this.videoMode = ""; // @todo: literal
                this.filename = "";
                this.width = null;
                this.height = null;
            }
            return TemplateHost;
        }());
        v2xx.TemplateHost = TemplateHost;
        /***/
        var Osc = (function () {
            function Osc() {
                this.defaultPort = 6250;
                this.predefinedClients = [];
            }
            return Osc;
        }());
        v2xx.Osc = Osc;
        /***/
        v2xx.defaultAMCPController = { _type: new v2xx.Controller()._type, port: 5250, protocol: "AMCP" };
    })(v2xx = Config.v2xx || (Config.v2xx = {}));
    /***/
    var v207;
    (function (v207) {
        /***/
        var CasparCGConfigVO = (function (_super) {
            __extends(CasparCGConfigVO, _super);
            function CasparCGConfigVO() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.paths = new v207.Paths();
                _this.channels = [new v2xx.Channel()];
                _this.controllers = [v2xx.defaultAMCPController];
                _this.mixer = new v207.Mixer();
                _this.logLevel = "trace"; // @todo: literal
                _this.autoDeinterlace = true;
                _this.autoTranscode = true;
                _this.pipelineTokens = 2;
                _this.thumbnails = new v207.Thumbnails();
                _this.osc = new v2xx.Osc();
                _this.audio = new v207.Audio();
                return _this;
            }
            return CasparCGConfigVO;
        }(v2xx.CasparCGConfigVO));
        v207.CasparCGConfigVO = CasparCGConfigVO;
        /***/
        var Channel = (function (_super) {
            __extends(Channel, _super);
            function Channel() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.consumers = [];
                return _this;
            }
            return Channel;
        }(v2xx.Channel));
        v207.Channel = Channel;
        /***/
        var Paths = (function () {
            function Paths() {
                this.mediaPath = "media\\";
                this.logPath = "log\\";
                this.dataPath = "data\\";
                this.templatePath = "templates\\";
                this.thumbnailsPath = "thumbnails\\";
            }
            return Paths;
        }());
        v207.Paths = Paths;
        /***/
        var Consumer = (function (_super) {
            __extends(Consumer, _super);
            function Consumer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Consumer;
        }(v2xx.Consumer));
        v207.Consumer = Consumer;
        /***/
        var DecklinkConsumer = (function (_super) {
            __extends(DecklinkConsumer, _super);
            function DecklinkConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.customAllocator = true;
                return _this;
            }
            return DecklinkConsumer;
        }(v2xx.DecklinkConsumer));
        v207.DecklinkConsumer = DecklinkConsumer;
        /***/
        var BluefishConsumer = (function (_super) {
            __extends(BluefishConsumer, _super);
            function BluefishConsumer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BluefishConsumer;
        }(v2xx.BluefishConsumer));
        v207.BluefishConsumer = BluefishConsumer;
        /***/
        var SystemAudioConsumer = (function (_super) {
            __extends(SystemAudioConsumer, _super);
            function SystemAudioConsumer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SystemAudioConsumer;
        }(v2xx.SystemAudioConsumer));
        v207.SystemAudioConsumer = SystemAudioConsumer;
        /***/
        var ScreenConsumer = (function (_super) {
            __extends(ScreenConsumer, _super);
            function ScreenConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.name = "Screen Consumer";
                return _this;
            }
            return ScreenConsumer;
        }(v2xx.ScreenConsumer));
        v207.ScreenConsumer = ScreenConsumer;
        /***/
        var NewtekIvgaConsumer = (function (_super) {
            __extends(NewtekIvgaConsumer, _super);
            function NewtekIvgaConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.channelLayout = "stereo";
                _this.provideSync = true;
                return _this;
            }
            return NewtekIvgaConsumer;
        }(v2xx.NewtekIvgaConsumer));
        v207.NewtekIvgaConsumer = NewtekIvgaConsumer;
        /***/
        var FileConsumer = (function (_super) {
            __extends(FileConsumer, _super);
            function FileConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._type = "file";
                _this.path = "";
                _this.vcodec = "libx264";
                _this.separateKey = false;
                return _this;
            }
            return FileConsumer;
        }(v2xx.Consumer));
        v207.FileConsumer = FileConsumer;
        /***/
        var StreamConsumer = (function (_super) {
            __extends(StreamConsumer, _super);
            function StreamConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._type = "stream";
                _this.path = "";
                _this.args = "";
                return _this;
            }
            return StreamConsumer;
        }(v2xx.Consumer));
        v207.StreamConsumer = StreamConsumer;
        /***/
        var Thumbnails = (function (_super) {
            __extends(Thumbnails, _super);
            function Thumbnails() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Thumbnails;
        }(v2xx.Thumbnails));
        v207.Thumbnails = Thumbnails;
        /***/
        var Mixer = (function (_super) {
            __extends(Mixer, _super);
            function Mixer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.chromaKey = false;
                return _this;
            }
            return Mixer;
        }(v2xx.Mixer));
        v207.Mixer = Mixer;
        /***/
        var Osc = (function (_super) {
            __extends(Osc, _super);
            function Osc() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Osc;
        }(v2xx.Osc));
        v207.Osc = Osc;
        /***/
        var ChannelLayout = (function () {
            function ChannelLayout() {
                this._type = "channel-layout";
                this.name = "";
                this.type = "";
                this.numChannels = null;
                this.channels = "";
            }
            return ChannelLayout;
        }());
        v207.ChannelLayout = ChannelLayout;
        /***/
        var MixConfig = (function () {
            function MixConfig() {
                this._type = "mix-config";
                this.from = "";
                this.to = "";
                this.mix = "";
                this.mappings = [];
            }
            return MixConfig;
        }());
        v207.MixConfig = MixConfig;
        /***/
        var Audio = (function () {
            function Audio() {
                this.channelLayouts = [];
                this.mixConfigs = [];
            }
            return Audio;
        }());
        v207.Audio = Audio;
    })(v207 = Config.v207 || (Config.v207 = {}));
    /***/
    var v21x;
    (function (v21x) {
        v21x.defaultLOGController = { _type: new v2xx.Controller()._type, port: 3250, protocol: "LOG" };
        /***/
        var CasparCGConfigVO = (function (_super) {
            __extends(CasparCGConfigVO, _super);
            function CasparCGConfigVO() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.paths = new v21x.Paths();
                _this.channels = [new v2xx.Channel()];
                _this.controllers = [v2xx.defaultAMCPController, v21x.defaultLOGController];
                _this.lockClearPhrase = "secret";
                _this.mixer = new v21x.Mixer();
                _this.logLevel = "info"; // @todo: literal
                _this.logCategories = "communication"; // @todo: literal or strongtype
                _this.forceDeinterlace = false;
                _this.accelerator = "auto"; // @todo: literal
                _this.thumbnails = new v21x.Thumbnails();
                _this.html = new v21x.Html();
                _this.osc = new v21x.Osc();
                _this.audio = new v21x.Audio();
                return _this;
            }
            return CasparCGConfigVO;
        }(v2xx.CasparCGConfigVO));
        v21x.CasparCGConfigVO = CasparCGConfigVO;
        /***/
        var Channel = (function (_super) {
            __extends(Channel, _super);
            function Channel() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.consumers = [];
                return _this;
            }
            return Channel;
        }(v2xx.Channel));
        v21x.Channel = Channel;
        /***/
        var Paths = (function () {
            function Paths() {
                this.mediaPath = "media/";
                this.logPath = "log/";
                this.dataPath = "data/";
                this.templatePath = "template/";
                this.thumbnailPath = "thumbnail/";
                this.fontPath = "font/";
            }
            return Paths;
        }());
        v21x.Paths = Paths;
        /***/
        var Consumer = (function (_super) {
            __extends(Consumer, _super);
            function Consumer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Consumer;
        }(v2xx.Consumer));
        v21x.Consumer = Consumer;
        /***/
        var DecklinkConsumer = (function (_super) {
            __extends(DecklinkConsumer, _super);
            function DecklinkConsumer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DecklinkConsumer;
        }(v2xx.DecklinkConsumer));
        v21x.DecklinkConsumer = DecklinkConsumer;
        /***/
        var BluefishConsumer = (function (_super) {
            __extends(BluefishConsumer, _super);
            function BluefishConsumer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BluefishConsumer;
        }(v2xx.BluefishConsumer));
        v21x.BluefishConsumer = BluefishConsumer;
        /***/
        var SystemAudioConsumer = (function (_super) {
            __extends(SystemAudioConsumer, _super);
            function SystemAudioConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.channelLayout = "stereo";
                _this.latency = 200;
                return _this;
            }
            return SystemAudioConsumer;
        }(v2xx.SystemAudioConsumer));
        v21x.SystemAudioConsumer = SystemAudioConsumer;
        /***/
        var ScreenConsumer = (function (_super) {
            __extends(ScreenConsumer, _super);
            function ScreenConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.interactive = true;
                return _this;
            }
            return ScreenConsumer;
        }(v2xx.ScreenConsumer));
        v21x.ScreenConsumer = ScreenConsumer;
        /***/
        var NewtekIvgaConsumer = (function (_super) {
            __extends(NewtekIvgaConsumer, _super);
            function NewtekIvgaConsumer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return NewtekIvgaConsumer;
        }(v2xx.NewtekIvgaConsumer));
        v21x.NewtekIvgaConsumer = NewtekIvgaConsumer;
        /***/
        var FfmpegConsumer = (function (_super) {
            __extends(FfmpegConsumer, _super);
            function FfmpegConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._type = "ffmpeg";
                _this.path = "";
                _this.args = "";
                _this.separateKey = false;
                _this.monoStreams = false;
                return _this;
            }
            return FfmpegConsumer;
        }(v2xx.Consumer));
        v21x.FfmpegConsumer = FfmpegConsumer;
        /***/
        var SynctoConsumer = (function (_super) {
            __extends(SynctoConsumer, _super);
            function SynctoConsumer() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._type = "syncto";
                _this.channelId = null;
                return _this;
            }
            return SynctoConsumer;
        }(v2xx.Consumer));
        v21x.SynctoConsumer = SynctoConsumer;
        /***/
        var Mixer = (function (_super) {
            __extends(Mixer, _super);
            function Mixer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Mixer;
        }(v2xx.Mixer));
        v21x.Mixer = Mixer;
        /***/
        var Thumbnails = (function (_super) {
            __extends(Thumbnails, _super);
            function Thumbnails() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.mipmap = true;
                return _this;
            }
            return Thumbnails;
        }(v2xx.Thumbnails));
        v21x.Thumbnails = Thumbnails;
        /***/
        var Html = (function () {
            function Html() {
                this.remoteDebuggingPort = null;
            }
            return Html;
        }());
        v21x.Html = Html;
        /***/
        var Osc = (function (_super) {
            __extends(Osc, _super);
            function Osc() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.disableSendToAmcpClients = false;
                return _this;
            }
            return Osc;
        }(v2xx.Osc));
        v21x.Osc = Osc;
        /***/
        var ChannelLayout = (function () {
            function ChannelLayout() {
                this._type = "channel-layout";
                this.name = "";
                this.type = "";
                this.numChannels = null;
                this.channelOrder = "";
            }
            return ChannelLayout;
        }());
        v21x.ChannelLayout = ChannelLayout;
        /***/
        var MixConfig = (function () {
            function MixConfig() {
                this._type = "mix-config";
                this.fromType = "";
                this.toTypes = "";
                this.mix = "";
            }
            return MixConfig;
        }());
        v21x.MixConfig = MixConfig;
        /***/
        var Audio = (function () {
            function Audio() {
                this.channelLayouts = [];
                this.mixConfigs = [];
            }
            return Audio;
        }());
        v21x.Audio = Audio;
    })(v21x = Config.v21x || (Config.v21x = {}));
    /***/
    var Intermediate;
    (function (Intermediate) {
        var Config207VO = v207.CasparCGConfigVO;
        var Config210VO = v21x.CasparCGConfigVO;
        /***/
        var Audio = (function () {
            function Audio() {
                this.channelLayouts = [];
                this.mixConfigs = [];
            }
            return Audio;
        }());
        Intermediate.Audio = Audio;
        /***/
        var MixConfig = (function () {
            function MixConfig() {
                this._type = "mix-config";
                this.fromType = "";
                this.toTypes = "";
            }
            return MixConfig;
        }());
        Intermediate.MixConfig = MixConfig;
        /***/
        var Mixer = (function (_super) {
            __extends(Mixer, _super);
            function Mixer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Mixer;
        }(v207.Mixer));
        Intermediate.Mixer = Mixer;
        /***/
        var CasparCGConfig = (function () {
            function CasparCGConfig(initVersionOrConfigVO) {
                this.paths = new v21x.Paths();
                this.channels = [];
                this.controllers = [];
                this.lockClearPhrase = null;
                this.mixer = new Intermediate.Mixer();
                this.logLevel = "info"; // @todo literal
                this.logCategories = "communication"; // @todo literal
                this.channelGrid = false;
                this.forceDeinterlace = false;
                this.autoDeinterlace = true;
                this.autoTranscode = true;
                this.pipelineTokens = 2;
                this.accelerator = "auto"; // @todo literal
                this.thumbnails = new v21x.Thumbnails;
                this.flash = new v2xx.Flash;
                this.html = new v21x.Html;
                this.templateHosts = [];
                this.osc = new v21x.Osc();
                this.audio = new Intermediate.Audio();
                // is a version
                if (typeof initVersionOrConfigVO === "number") {
                    if (initVersionOrConfigVO >= 2100) {
                        this.__version = CasparCGVersion.V210;
                    }
                    else if (initVersionOrConfigVO === 2007) {
                        this.__version = CasparCGVersion.V207;
                    }
                    return;
                }
                // is initVO
                if (initVersionOrConfigVO) {
                    if (initVersionOrConfigVO instanceof Config207VO) {
                        this.__version = CasparCGVersion.V207;
                    }
                    else if (initVersionOrConfigVO instanceof Config210VO) {
                        this.__version = CasparCGVersion.V210;
                    }
                    else if ((typeof initVersionOrConfigVO === "object") && initVersionOrConfigVO["_version"]) {
                        if (initVersionOrConfigVO["_version"] >= 2100) {
                            this.__version = CasparCGVersion.V210;
                        }
                        else if (initVersionOrConfigVO["_version"] >= 2007) {
                            this.__version = CasparCGVersion.V207;
                        }
                    }
                    this.import(initVersionOrConfigVO);
                }
            }
            /***/
            CasparCGConfig.prototype.import = function (configVO) {
                if (this.__version === CasparCGVersion.V207) {
                    this.importFromV207VO(configVO);
                }
                else if (this.__version === CasparCGVersion.V210) {
                    this.importFromV210VO(configVO);
                }
                // @todo: throw error
            };
            /***/
            CasparCGConfig.prototype.importFromV207VO = function (configVO) {
                var _this = this;
                // root level
                this.importValues(configVO, this, ["log-level", "channel-grid", "auto-deinterlace", "auto-transcode", "pipeline-tokens"]);
                // paths
                this.importValues(configVO["paths"], this.paths, ["media-path", "log-path", "data-path", "template-path", "thumbnails-path"]);
                // channels
                this.findListMembers(configVO, "channels").forEach(function (i) {
                    var channel = new v2xx.Channel();
                    _this.importValues(i, channel, ["video-mode", "channel-layout", "straight-alpha-output"]);
                    _this.findListMembers(i, "consumers").forEach(function (o) {
                        var consumerName = CasparCGConfig.dashedToCamelCase(o["_type"]) + "Consumer";
                        _this.importListMembers(o, consumerName, v21x);
                        channel.consumers.push(o);
                    });
                    _this.channels.push(channel);
                });
                // controllers
                this.findListMembers(configVO, "controllers").forEach(function (i) {
                    var controller = new v2xx.Controller();
                    _this.importAllValues(i, controller);
                    _this.controllers.push(controller);
                });
                // mixer
                this.importValues(configVO["mixer"], this.mixer, ["blend-modes", "mipmapping-default-on", "straight-alpha", "chroma-key"]);
                // templatehosts
                this.findListMembers(configVO, "template-hosts").forEach(function (i) {
                    var templateHost = new v2xx.TemplateHost();
                    _this.importAllValues(i, templateHost);
                    _this.templateHosts.push(templateHost);
                });
                // flash
                this.importValues(configVO["flash"], this.flash, ["buffer-depth"]);
                // thumbnails
                this.importValues(configVO["thumbnails"], this.thumbnails, ["generate-thumbnails", "width", "height", "video-grid", "scan-interval-millis", "generate-delay-millis", "video-mode", "mipmap"]);
                // osc
                this.importValues(configVO["osc"], this.osc, ["default-port"]);
                this.findListMembers(configVO["osc"], "predefined-clients").forEach(function (i) {
                    var client = new v2xx.OscClient();
                    _this.importAllValues(i, client);
                    _this.osc.predefinedClients.push(client);
                });
                // audio
                if (configVO.hasOwnProperty("audio")) {
                    if (configVO["audio"].hasOwnProperty("channelLayouts")) {
                        this.audio.channelLayouts = new Array();
                        configVO["audio"]["channelLayouts"].forEach(function (i) {
                            var channelLayout = new v21x.ChannelLayout();
                            channelLayout._type = i._type;
                            channelLayout.channelOrder = i.channels;
                            channelLayout.name = i.name;
                            channelLayout.numChannels = i.numChannels;
                            channelLayout.type = i.type;
                            _this.audio.channelLayouts.push(channelLayout);
                        });
                    }
                    if (configVO["audio"].hasOwnProperty("mixConfigs")) {
                        this.audio.mixConfigs = new Array();
                        configVO["audio"]["mixConfigs"].forEach(function (i) {
                            var mixConfig = new Intermediate.MixConfig();
                            mixConfig._type = i._type;
                            mixConfig.fromType = i.from;
                            mixConfig.toTypes = i.to;
                            mixConfig.mix = { mixType: i.mix, destinations: {} };
                            // convert 2.0.x mix-config to 2.1.x
                            var destinations = {};
                            var mapSections;
                            for (var o = 0; o < i.mappings.length; o++) {
                                mapSections = i.mappings[o].match(/(\S+)\s+(\S+)\s+(\S+)/);
                                if (mapSections !== null) {
                                    var src = mapSections[1];
                                    var dst = mapSections[2];
                                    var expr = mapSections[3];
                                    if (!destinations.hasOwnProperty(dst)) {
                                        destinations[dst] = [];
                                    }
                                    destinations[dst].push({ source: src, expression: expr });
                                }
                            }
                            mixConfig.mix.destinations = destinations;
                            _this.audio.mixConfigs.push(mixConfig);
                        });
                    }
                }
            };
            /***/
            CasparCGConfig.prototype.importFromV210VO = function (configVO) {
                var _this = this;
                // root level
                this.importValues(configVO, this, ["lockClear-phrase", "log-level", "log-categories", "force-deinterlace", "channel-grid", "accelerator"]);
                // paths
                this.importValues(configVO["paths"], this.paths, ["media-path", "log-path", "data-path", "template-path", "thumbnail-path", "font-path"]);
                // channels
                this.findListMembers(configVO, "channels").forEach(function (i) {
                    var channel = new v2xx.Channel();
                    _this.importValues(i, channel, ["video-mode", "channel-layout", "straight-alpha-output"]);
                    _this.findListMembers(i, "consumers").forEach(function (o) {
                        var consumerName = CasparCGConfig.dashedToCamelCase(o["_type"]) + "Consumer";
                        _this.importListMembers(o, consumerName, v21x);
                        channel.consumers.push(o);
                    });
                    _this.channels.push(channel);
                });
                // controllers
                this.findListMembers(configVO, "controllers").forEach(function (i) {
                    var controller = new v2xx.Controller();
                    _this.importAllValues(i, controller);
                    _this.controllers.push(controller);
                });
                // mixer
                this.importValues(configVO["mixer"], this.mixer, ["blend-modes", "mipmapping-default-on", "straight-alpha"]);
                // templatehosts
                this.findListMembers(configVO, "template-hosts").forEach(function (i) {
                    var templateHost = new v2xx.TemplateHost();
                    _this.importAllValues(i, templateHost);
                    _this.templateHosts.push(templateHost);
                });
                // flash
                this.importValues(configVO["flash"], this.flash, ["buffer-depth"]);
                // html
                this.importValues(configVO["html"], this.html, ["remote-debugging-port"]);
                // thumbnails
                this.importValues(configVO["thumbnails"], this.thumbnails, ["generate-thumbnails", "width", "height", "video-grid", "scan-interval-millis", "generate-delay-millis", "video-mode", "mipmap"]);
                // osc
                this.importValues(configVO["osc"], this.osc, ["default-port", "disable-send-to-amcp-clients"]);
                this.findListMembers(configVO["osc"], "predefined-clients").forEach(function (i) {
                    var client = new v2xx.OscClient();
                    _this.importAllValues(i, client);
                    _this.osc.predefinedClients.push(client);
                });
                // audio
                if (configVO.hasOwnProperty("audio")) {
                    if (configVO["audio"].hasOwnProperty("channelLayouts")) {
                        this.audio.channelLayouts = configVO["audio"]["channelLayouts"];
                    }
                    if (configVO["audio"].hasOwnProperty("mixConfigs")) {
                        this.audio.mixConfigs = new Array();
                        configVO["audio"]["mixConfigs"].forEach(function (i) {
                            var mixConfig = new Intermediate.MixConfig();
                            mixConfig._type = i._type;
                            mixConfig.fromType = i.fromType;
                            mixConfig.toTypes = i.toTypes;
                            var destinations = {};
                            var mixType = i.mix.match(/\&lt\;|\</g) !== null ? "average" : "add";
                            var src;
                            var dest;
                            var expr;
                            i.mix.split("|").map(function (i) { return i.replace(/^\s*|\s*$/g, ""); }).forEach(function (o) {
                                var srcDstSplit = o.split(/\&lt\;|\<|\=/);
                                dest = srcDstSplit[0].replace(/^\s*|\s*$/g, "");
                                destinations[dest] = [];
                                srcDstSplit[1].split("+").forEach(function (u) {
                                    var exprSplit = u.split("*");
                                    if (exprSplit.length > 1) {
                                        expr = exprSplit[0].replace(/^\s*|\s*$/g, "");
                                        src = exprSplit[1].replace(/^\s*|\s*$/g, "");
                                    }
                                    else {
                                        src = exprSplit[0].replace(/^\s*|\s*$/g, "");
                                        expr = "1.0";
                                    }
                                    destinations[dest].push({ source: src, expression: expr });
                                });
                            });
                            mixConfig.mix = { mixType: mixType, destinations: destinations };
                            _this.audio.mixConfigs.push(mixConfig);
                        });
                    }
                }
            };
            Object.defineProperty(CasparCGConfig.prototype, "VO", {
                /***/
                get: function () {
                    if (this.__version === CasparCGVersion.V207) {
                        return this.v207VO;
                    }
                    else if (this.__version === CasparCGVersion.V210) {
                        return this.v210VO;
                    }
                    throw new Error("@todo"); // @todo: throw
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CasparCGConfig.prototype, "vo", {
                /***/
                get: function () {
                    return this.VO;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CasparCGConfig.prototype, "v207VO", {
                /***/
                get: function () {
                    // let configVO: Config207VO = {};
                    var configVO = new Config207VO;
                    configVO._version = this._version;
                    // paths
                    configVO.paths = new v207.Paths();
                    configVO.paths.dataPath = this.paths.dataPath;
                    configVO.paths.logPath = this.paths.logPath;
                    configVO.paths.mediaPath = this.paths.mediaPath;
                    configVO.paths.templatePath = this.paths.templatePath;
                    configVO.paths.thumbnailsPath = this.paths.thumbnailPath;
                    // channels
                    configVO.channels = this.channels;
                    // controllers
                    configVO.controllers = this.controllers;
                    // single values on root
                    configVO.logLevel = this.logLevel;
                    configVO.autoDeinterlace = this.autoDeinterlace;
                    configVO.autoTranscode = this.autoTranscode;
                    configVO.pipelineTokens = this.pipelineTokens;
                    configVO.channelGrid = this.channelGrid;
                    // mixer
                    configVO.mixer = new v207.Mixer();
                    configVO.mixer.blendModes = this.mixer.blendModes;
                    if (this.mixer.chromaKey)
                        configVO.mixer.chromaKey = this.mixer.chromaKey;
                    configVO.mixer.mipmappingDefaultOn = this.mixer.mipmappingDefaultOn;
                    configVO.mixer.straightAlpha = this.mixer.straightAlpha;
                    // flash
                    configVO.flash = this.flash;
                    // template hosts
                    configVO.templateHosts = this.templateHosts;
                    // thumbnails
                    configVO.thumbnails = this.thumbnails;
                    // osc
                    configVO.osc = new v2xx.Osc();
                    if (this.osc.defaultPort)
                        configVO.osc.defaultPort = this.osc.defaultPort;
                    if (this.osc.predefinedClients)
                        configVO.osc.predefinedClients = this.osc.predefinedClients;
                    // audio
                    configVO.audio = new v207.Audio();
                    this.audio.channelLayouts.forEach(function (i) {
                        var channelLayout = new v207.ChannelLayout();
                        channelLayout.name = i.name;
                        channelLayout.numChannels = i.numChannels;
                        channelLayout.type = i.type;
                        channelLayout.channels = i.channelOrder;
                        configVO.audio.channelLayouts.push(channelLayout);
                    });
                    this.audio.mixConfigs.forEach(function (i) {
                        var mixConfig = new v207.MixConfig();
                        mixConfig.from = i.fromType;
                        mixConfig.to = i.toTypes;
                        mixConfig.mix = i.mix.mixType;
                        var _loop_1 = function (o) {
                            i.mix.destinations[o].forEach(function (u) {
                                mixConfig.mappings.push([u.source, o, u.expression].join(" "));
                            });
                        };
                        for (var o in i.mix.destinations) {
                            _loop_1(o);
                        }
                        configVO.audio.mixConfigs.push(mixConfig);
                    });
                    return configVO;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CasparCGConfig.prototype, "v210VO", {
                /***/
                get: function () {
                    var configVO = new Config210VO();
                    configVO._version = this._version;
                    // paths
                    configVO.paths = this.paths;
                    // channels
                    configVO.channels = this.channels;
                    // controllers
                    configVO.controllers = this.controllers;
                    // single values on root
                    if (typeof this.lockClearPhrase === "string")
                        configVO.lockClearPhrase = this.lockClearPhrase;
                    configVO.logLevel = this.logLevel;
                    configVO.logCategories = this.logCategories;
                    configVO.forceDeinterlace = this.forceDeinterlace;
                    configVO.channelGrid = this.channelGrid;
                    configVO.accelerator = this.accelerator;
                    // mixer
                    configVO.mixer = new v21x.Mixer();
                    configVO.mixer.blendModes = this.mixer.blendModes;
                    configVO.mixer.mipmappingDefaultOn = this.mixer.mipmappingDefaultOn;
                    configVO.mixer.straightAlpha = this.mixer.straightAlpha;
                    // flash
                    configVO.flash = this.flash;
                    // html
                    configVO.html = this.html;
                    // template hosts
                    configVO.templateHosts = this.templateHosts;
                    // thumbnails
                    configVO.thumbnails = this.thumbnails;
                    // osc
                    configVO.osc = this.osc;
                    // audio
                    configVO.audio = new v21x.Audio();
                    configVO.audio.channelLayouts = this.audio.channelLayouts;
                    this.audio.mixConfigs.forEach(function (i) {
                        var mixConfig = new v21x.MixConfig();
                        mixConfig.fromType = i.fromType;
                        mixConfig.toTypes = i.toTypes;
                        var mixOperator;
                        var destinationStrings = [];
                        var _loop_2 = function (o) {
                            var destinationSubStrings = [];
                            var destinations = i.mix.destinations[o];
                            mixOperator = (destinations.length > 1 && i.mix.mixType === "average") ? "<" : "=";
                            destinations.forEach(function (u) {
                                destinationSubStrings.push(u.expression === "1.0" ? u.source : u.expression + "*" + u.source);
                            });
                            destinationStrings.push(o + " " + mixOperator + " " + destinationSubStrings.join(" + "));
                        };
                        for (var o in i.mix.destinations) {
                            _loop_2(o);
                        }
                        mixConfig.mix = destinationStrings.join(" | ");
                        configVO.audio.mixConfigs.push(mixConfig);
                    });
                    return configVO;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CasparCGConfig.prototype, "XML", {
                /***/
                get: function () {
                    if (this.__version === CasparCGVersion.V207) {
                        return this.v207XML;
                    }
                    else if (this.__version === CasparCGVersion.V210) {
                        return this.v210XML;
                    }
                    return null; // @todo: throw error
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CasparCGConfig.prototype, "xml", {
                /***/
                get: function () {
                    return this.XML;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CasparCGConfig.prototype, "v207XML", {
                /***/
                get: function () {
                    var xml = xmlbuilder_1.create("configuration");
                    // paths
                    var paths = new v207.Paths();
                    paths.dataPath = this.paths.dataPath;
                    paths.logPath = this.paths.logPath;
                    paths.mediaPath = this.paths.mediaPath;
                    paths.templatePath = this.paths.templatePath;
                    paths.thumbnailsPath = this.paths.thumbnailPath;
                    CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele("paths"), paths); // , ["mediaPath", "logPath", "dataPath", "templatesPath", "thumbnailPath"]);
                    // channels
                    var channels = xml.ele("channels");
                    this.channels.forEach(function (i) {
                        var channel = channels.ele("channel");
                        CasparCGConfig.addFormattedXMLChildsFromObject(channel, i, ["_type", "consumers", "_consumers"]);
                        // consumer
                        var consumers = channel.ele("consumers");
                        i.consumers.forEach(function (i) {
                            var consumer = consumers.ele(i._type);
                            CasparCGConfig.addFormattedXMLChildsFromObject(consumer, i, ["_type"]);
                        });
                    });
                    // controllers
                    var controllers = xml.ele("controllers");
                    this.controllers.forEach(function (i) {
                        var controller = controllers.ele(i._type);
                        CasparCGConfig.addFormattedXMLChildsFromObject(controller, i, ["_type"]);
                    });
                    // all root-level single values
                    CasparCGConfig.addFormattedXMLChildsFromArray(xml, this, ["logLevel", "autoDeinterlace", "autoTranscode", "pipelineTokens", "channelGrid"]);
                    // mixer
                    if (this.mixer) {
                        CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele("mixer"), this.mixer);
                    }
                    // flash
                    if (this.flash) {
                        CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele("flash"), this.flash);
                    }
                    // template hosts
                    if (this.templateHosts && this.templateHosts.length > 0) {
                        var templateHosts_1 = xml.ele("template-hosts");
                        this.templateHosts.forEach(function (i) {
                            var templatehost = templateHosts_1.ele(i._type);
                            CasparCGConfig.addFormattedXMLChildsFromObject(templatehost, i, ["_type"]);
                        });
                    }
                    // thumbnails
                    if (this.thumbnails) {
                        CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele("thumbnails"), this.thumbnails);
                    }
                    // osc
                    if (this.osc) {
                        var osc = xml.ele("osc");
                        osc.ele("default-port", this.osc.defaultPort);
                        // predefined clients
                        if (this.osc.predefinedClients && this.osc.predefinedClients.length > 0) {
                            var predefinedClients_1 = osc.ele("predefined-clients");
                            this.osc.predefinedClients.forEach(function (i) {
                                predefinedClients_1;
                                var client = predefinedClients_1.ele(i._type);
                                CasparCGConfig.addFormattedXMLChildsFromObject(client, i, ["_type"]);
                            });
                        }
                    }
                    // audio
                    if (this.audio && ((this.audio.channelLayouts && this.audio.channelLayouts.length > 0) || (this.audio.mixConfigs && this.audio.mixConfigs.length > 0))) {
                        var audio = xml.ele("audio");
                        if (this.audio.channelLayouts && this.audio.channelLayouts.length > 0) {
                            var channelLayouts_1 = audio.ele("channel-layouts");
                            this.audio.channelLayouts.forEach(function (i) {
                                var channelLayout = channelLayouts_1.ele("channel-layout");
                                if (i.name)
                                    channelLayout.att("name", i.name);
                                if (i.type)
                                    channelLayout.att("type", i.type);
                                if (i.numChannels)
                                    channelLayout.att("num-channels", i.numChannels);
                                if (i.channelOrder)
                                    channelLayout.att("channels", i.channelOrder);
                            });
                        }
                        if (this.audio.mixConfigs && this.audio.mixConfigs.length > 0) {
                            var mixConfigs_1 = audio.ele("mix-configs");
                            this.audio.mixConfigs.forEach(function (i) {
                                var mixConfig = mixConfigs_1.ele("mix-config");
                                mixConfig.ele("from", i.fromType);
                                mixConfig.ele("to", i.toTypes);
                                mixConfig.ele("mix", i.mix.mixType);
                                var mappings = mixConfig.ele("mappings");
                                var _loop_3 = function (o) {
                                    var destination = i.mix.destinations[o];
                                    destination.forEach(function (u) {
                                        mappings.ele("mapping", u.source + " " + o + " " + u.expression);
                                    });
                                };
                                for (var o in i.mix.destinations) {
                                    _loop_3(o);
                                }
                            });
                        }
                    }
                    return xml;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CasparCGConfig.prototype, "v210XML", {
                /***/
                get: function () {
                    var xml = xmlbuilder_1.create("configuration");
                    // paths
                    CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele("paths"), this.paths); // , ["mediaPath", "logPath", "dataPath", "templatePath", "thumbnailPath", "fontpath"]);
                    // channels
                    var channels = xml.ele("channels");
                    this.channels.forEach(function (i) {
                        var channel = channels.ele("channel");
                        CasparCGConfig.addFormattedXMLChildsFromObject(channel, i, ["_type", "consumers", "_consumers"]);
                        // consumer
                        var consumers = channel.ele("consumers");
                        i.consumers.forEach(function (i) {
                            var consumer = consumers.ele(i._type);
                            CasparCGConfig.addFormattedXMLChildsFromObject(consumer, i, ["_type"]);
                        });
                    });
                    // controllers
                    var controllers = xml.ele("controllers");
                    this.controllers.forEach(function (i) {
                        var controller = controllers.ele(i._type);
                        CasparCGConfig.addFormattedXMLChildsFromObject(controller, i, ["_type"]);
                    });
                    // all root-level single values
                    CasparCGConfig.addFormattedXMLChildsFromArray(xml, this, ["lockClearPhrase", "logLevel", "logCategories", "forceDeinterlace", "channelGrid", "accelerator"]);
                    // mixer
                    if (this.mixer) {
                        var mixer = xml.ele("mixer");
                        mixer.ele("blend-modes", this.mixer.blendModes);
                        mixer.ele("mipmapping-default-on", this.mixer.mipmappingDefaultOn);
                        mixer.ele("straight-alpha", this.mixer.straightAlpha);
                    }
                    // flash
                    if (this.flash) {
                        CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele("flash"), this.flash);
                    }
                    // html
                    if (this.html) {
                        CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele("html"), this.html);
                    }
                    // template hosts
                    if (this.templateHosts && this.templateHosts.length > 0) {
                        var templateHosts_2 = xml.ele("template-hosts");
                        this.templateHosts.forEach(function (i) {
                            var templatehost = templateHosts_2.ele(i._type);
                            CasparCGConfig.addFormattedXMLChildsFromObject(templatehost, i, ["_type"]);
                        });
                    }
                    // thumbnails
                    if (this.thumbnails) {
                        CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele("thumbnails"), this.thumbnails);
                    }
                    // osc
                    if (this.osc) {
                        var osc = xml.ele("osc");
                        CasparCGConfig.addFormattedXMLChildsFromArray(osc, this.osc, ["defaultPort", "disableSendToAmcpClients"]);
                        // predefined clients
                        if (this.osc.predefinedClients && this.osc.predefinedClients.length > 0) {
                            var predefinedClients_2 = osc.ele("predefined-clients");
                            this.osc.predefinedClients.forEach(function (i) {
                                predefinedClients_2;
                                var client = predefinedClients_2.ele(i._type);
                                CasparCGConfig.addFormattedXMLChildsFromObject(client, i, ["_type"]);
                            });
                        }
                    }
                    // audio
                    if (this.audio && ((this.audio.channelLayouts && this.audio.channelLayouts.length > 0) || (this.audio.mixConfigs && this.audio.mixConfigs.length > 0))) {
                        var audio = xml.ele("audio");
                        if (this.audio.channelLayouts && this.audio.channelLayouts.length > 0) {
                            var channelLayouts_2 = audio.ele("channel-layouts");
                            this.audio.channelLayouts.forEach(function (i) {
                                var channelLayout = channelLayouts_2.ele("channel-layout");
                                if (i.name)
                                    channelLayout.att("name", i.name);
                                if (i.type)
                                    channelLayout.att("type", i.type);
                                if (i.numChannels)
                                    channelLayout.att("num-channels", i.numChannels);
                                if (i.channelOrder)
                                    channelLayout.att("channel-order", i.channelOrder);
                            });
                        }
                        if (this.audio.mixConfigs && this.audio.mixConfigs.length > 0) {
                            var mixConfigs_2 = audio.ele("mix-configs");
                            this.audio.mixConfigs.forEach(function (i) {
                                var mixStrings = [];
                                var mixOperator = i.mix.mixType === "average" ? "<" : i.mix.mixType === "add" ? "=" : "";
                                var destination;
                                var _loop_4 = function (o) {
                                    destination = i.mix.destinations[o];
                                    if (destination.length > 1) {
                                        var subSourceStrings_1 = [];
                                        destination.forEach(function (u) {
                                            subSourceStrings_1.push(u.expression === "1.0" ? u.source : (u.expression.toString() + "*" + u.source));
                                        });
                                        mixStrings.push(o + " " + mixOperator + " " + subSourceStrings_1.join(" + "));
                                    }
                                    else {
                                        mixStrings.push(o + " = " + (destination[0].expression === "1.0" ? destination[0].source : (destination[0].expression.toString() + "*" + destination[0].source)));
                                    }
                                };
                                for (var o in i.mix.destinations) {
                                    _loop_4(o);
                                }
                                mixConfigs_2.ele("mix-config")
                                    .att("from-type", i.fromType)
                                    .att("to-types", i.toTypes)
                                    .att("mix", mixStrings.join(" | "));
                            });
                        }
                    }
                    return xml;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CasparCGConfig.prototype, "XMLString", {
                /***/
                get: function () {
                    if (this.__version === CasparCGVersion.V207) {
                        return this.v207XMLString;
                    }
                    else if (this.__version === CasparCGVersion.V210) {
                        return this.v210XMLString;
                    }
                    return ""; // @todo: throw error
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CasparCGConfig.prototype, "v207XMLString", {
                /***/
                get: function () {
                    return this.v207XML["end"]({ pretty: true });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CasparCGConfig.prototype, "v210XMLString", {
                /***/
                get: function () {
                    return this.v210XML["end"]({ pretty: true });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CasparCGConfig.prototype, "_version", {
                /***/
                get: function () {
                    return this.__version;
                },
                enumerable: true,
                configurable: true
            });
            /***/
            CasparCGConfig.prototype.importAllValues = function (sourceRoot, destRoot) {
                var keys = [];
                for (var i in sourceRoot) {
                    keys.push(i);
                }
                this.importValues(sourceRoot, destRoot, keys);
            };
            /***/
            CasparCGConfig.prototype.importValues = function (sourceRoot, destRoot, values) {
                values.forEach(function (dashedKey) {
                    var camelKey = CasparCGConfig.dashedToMixedCase(dashedKey);
                    // sets value if key is valid
                    if (sourceRoot && sourceRoot.hasOwnProperty(dashedKey) && sourceRoot[dashedKey] !== undefined && sourceRoot[dashedKey] !== null) {
                        if (destRoot && destRoot.hasOwnProperty(camelKey)) {
                            destRoot[camelKey] = sourceRoot[dashedKey]; // @todo: type checking/reflection/cast??
                        }
                    }
                    else if (sourceRoot && sourceRoot.hasOwnProperty(camelKey) && sourceRoot[camelKey] !== undefined && sourceRoot[camelKey] !== null) {
                        if (destRoot && destRoot.hasOwnProperty(camelKey)) {
                            destRoot[camelKey] = sourceRoot[camelKey]; // @todo: type checking/reflection/cast??
                        }
                    }
                });
            };
            /***/
            CasparCGConfig.prototype.findListMembers = function (root, childKey) {
                var pairs = [];
                for (var i in root) {
                    pairs.push([i, root[i]]);
                }
                childKey = CasparCGConfig.dashedToMixedCase(childKey);
                var _loop_5 = function (i) {
                    var outerKey = CasparCGConfig.dashedToMixedCase(i[0].toString());
                    var outerValue = i[1];
                    // filter top-level possible arrays
                    if (childKey === outerKey) {
                        var flatArray_1 = [];
                        var _loop_6 = function (innerKey) {
                            var innerValue = outerValue[innerKey];
                            if (typeof innerValue === "object") {
                                if (Array.isArray(innerValue)) {
                                    innerValue.forEach(function (o) {
                                        if (typeof o !== "object") {
                                            o = {};
                                        }
                                        if (!o["_type"]) {
                                            o["_type"] = innerKey;
                                        }
                                        flatArray_1.push(o);
                                    });
                                }
                                else {
                                    if (!innerValue["_type"]) {
                                        innerValue["_type"] = innerKey;
                                    }
                                    flatArray_1.push(innerValue);
                                }
                                // update outer member with transformed array of inner members
                            }
                            else {
                                flatArray_1.push({ _type: innerKey });
                            }
                        };
                        for (var innerKey in outerValue) {
                            _loop_6(innerKey);
                        }
                        return { value: flatArray_1 };
                    }
                };
                for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
                    var i = pairs_1[_i];
                    var state_1 = _loop_5(i);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
                return [];
            };
            /***/
            CasparCGConfig.prototype.importListMembers = function (root, memberName, restrictedNamespace) {
                var namespace;
                if (restrictedNamespace) {
                    namespace = restrictedNamespace;
                }
                else {
                    if (v21x[memberName]) {
                        namespace = v2xx;
                    }
                    else if (v207[memberName]) {
                        namespace = v207;
                    }
                    else if (v2xx[memberName]) {
                        namespace = v2xx;
                    }
                }
                if (namespace && namespace.hasOwnProperty(memberName)) {
                    var member = Object.create(namespace[memberName]["prototype"]);
                    member.constructor.call(member);
                    this.importAllValues(root, member);
                }
            };
            /***/
            CasparCGConfig.addFormattedXMLChildsFromObject = function (root, data, blacklist) {
                blacklist && blacklist.push("arrayNo", "array-no");
                for (var key in data) {
                    if ((key === "constructor") || (blacklist && blacklist.indexOf(key) > -1)) {
                        continue;
                    }
                    var value = data[key];
                    if (value !== null && value !== "") {
                        key = CasparCGConfig.mixedCaseToDashed(key);
                        root["ele"].call(root, key, value);
                    }
                }
                return root;
            };
            /***/
            CasparCGConfig.addFormattedXMLChildsFromArray = function (root, data, whitelist) {
                if (whitelist) {
                    whitelist.forEach(function (key) {
                        if (data.hasOwnProperty(key)) {
                            var value = data[key];
                            if (value !== null && value !== "") {
                                var keyBlocks = key.split(/(?=[A-Z])/);
                                key = keyBlocks.map(function (i) { return i.toLowerCase(); }).join("-");
                                root["ele"].call(root, key, value);
                            }
                        }
                    });
                }
                return root;
            };
            /***/
            CasparCGConfig.dashedToMixedCase = function (rawString) {
                var keyBlocks = rawString.split(/-/);
                if (keyBlocks.length > 1) {
                    return keyBlocks.map(function (i, o) {
                        if (o > 0) {
                            i = i.toLowerCase();
                            i = i.slice(0, 1).toUpperCase() + i.slice(1);
                        }
                        else {
                            i = i.toLowerCase();
                        }
                        return i;
                    }).join("");
                }
                else {
                    return rawString;
                }
            };
            /***/
            CasparCGConfig.dashedToCamelCase = function (rawString) {
                var keyBlocks = rawString.split(/-/);
                if (keyBlocks.length > 1) {
                    return keyBlocks.map(function (i) {
                        i = i.toLowerCase();
                        i = i.slice(0, 1).toUpperCase() + i.slice(1);
                        return i;
                    }).join("");
                }
                else {
                    return rawString;
                }
            };
            /***/
            CasparCGConfig.mixedCaseToDashed = function (mixedCased) {
                var keyBlocks = mixedCased.split(/(?=[A-Z])/);
                return keyBlocks.map(function (i) { return i.toLowerCase(); }).join("-");
            };
            return CasparCGConfig;
        }());
        Intermediate.CasparCGConfig = CasparCGConfig;
    })(Intermediate = Config.Intermediate || (Config.Intermediate = {}));
})(Config = exports.Config || (exports.Config = {}));
