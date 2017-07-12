import { create as XMLBuilder } from "xmlbuilder";
// Options NS
import { Options as OptionsNS } from "./AMCPConnectionOptions";
var ServerVersion = OptionsNS.ServerVersion;
/** */
export var Config;
(function (Config) {
    /** */
    let Utils;
    (function (Utils) {
        function configMemberFactory(version, memberName, initValues) {
            let member = undefined;
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
                for (let key in initValues) {
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
    /** */
    let v2xx;
    (function (v2xx) {
        /** */
        class CasparCGConfigVO {
            constructor() {
                this.channelGrid = false;
                this.flash = new v2xx.Flash();
                this.templateHosts = [];
            }
        }
        v2xx.CasparCGConfigVO = CasparCGConfigVO;
        /** */
        class Channel {
            constructor() {
                this._type = "channel";
                this.videoMode = "PAL"; // @todo: literal
                this.consumers = [];
                this.straightAlphaOutput = false;
                this.channelLayout = "stereo";
            }
        }
        v2xx.Channel = Channel;
        /** */
        class Consumer {
        }
        v2xx.Consumer = Consumer;
        /** */
        class DecklinkConsumer extends Consumer {
            constructor() {
                super(...arguments);
                this._type = "decklink";
                this.device = 1;
                this.keyDevice = null;
                this.embeddedAudio = false;
                this.channelLayout = "stereo";
                this.latency = "normal"; // @todo: literal
                this.keyer = "external"; // @todo: literal
                this.keyOnly = false;
                this.bufferDepth = 3;
            }
        }
        v2xx.DecklinkConsumer = DecklinkConsumer;
        /** */
        class BluefishConsumer extends Consumer {
            constructor() {
                super(...arguments);
                this._type = "bluefish";
                this.device = 1;
                this.embeddedAudio = false;
                this.channelLayout = "stereo";
                this.keyOnly = false;
            }
        }
        v2xx.BluefishConsumer = BluefishConsumer;
        /** */
        class SystemAudioConsumer extends Consumer {
            constructor() {
                super(...arguments);
                this._type = "system-audio";
            }
        }
        v2xx.SystemAudioConsumer = SystemAudioConsumer;
        /** */
        class ScreenConsumer extends Consumer {
            constructor() {
                super(...arguments);
                this._type = "screen";
                this.device = 1; // @todo: wrong default implemented in caspar, should be 0:::
                this.aspectRatio = "default"; // @todo: literal
                this.stretch = "fill"; // @todo: literal
                this.windowed = true;
                this.keyOnly = false;
                this.autoDeinterlace = true;
                this.vsync = false;
                this.borderless = false;
            }
        }
        v2xx.ScreenConsumer = ScreenConsumer;
        /** */
        class NewtekIvgaConsumer extends Consumer {
            constructor() {
                super(...arguments);
                this._type = "newtek-ivga";
            }
        }
        v2xx.NewtekIvgaConsumer = NewtekIvgaConsumer;
        /** */
        class Controller {
            constructor() {
                this._type = "tcp";
                this.port = null;
                this.protocol = "";
            }
        }
        v2xx.Controller = Controller;
        /** */
        class Mixer {
            constructor() {
                this.blendModes = false;
                this.straightAlpha = false;
                this.mipmappingDefaultOn = false;
            }
        }
        v2xx.Mixer = Mixer;
        /** */
        class OscClient {
            constructor() {
                this._type = "predefined-client";
                this.address = "";
                this.port = null;
            }
        }
        v2xx.OscClient = OscClient;
        /** */
        class Thumbnails {
            constructor() {
                this.generateThumbnails = true;
                this.width = 256;
                this.height = 144;
                this.videoGrid = 2;
                this.scanIntervalMillis = 5000;
                this.generateDelayMillis = 2000;
                this.mipmap = false;
                this.videoMode = "720p5000"; // @todo: literal
            }
        }
        v2xx.Thumbnails = Thumbnails;
        /** */
        class Flash {
            constructor() {
                this.bufferDepth = "auto";
            }
        }
        v2xx.Flash = Flash;
        /** */
        class TemplateHost {
            constructor() {
                this._type = "template-host";
                this.videoMode = ""; // @todo: literal
                this.filename = "";
                this.width = null;
                this.height = null;
            }
        }
        v2xx.TemplateHost = TemplateHost;
        /**  */
        class Osc {
            constructor() {
                this.defaultPort = 6250;
                this.predefinedClients = [];
            }
        }
        v2xx.Osc = Osc;
        /** */
        v2xx.defaultAMCPController = { _type: new v2xx.Controller()._type, port: 5250, protocol: "AMCP" };
    })(v2xx = Config.v2xx || (Config.v2xx = {}));
    /** */
    let v207;
    (function (v207) {
        /** */
        class CasparCGConfigVO extends v2xx.CasparCGConfigVO {
            constructor() {
                super(...arguments);
                this.paths = new v207.Paths();
                this.channels = [new v2xx.Channel()];
                this.controllers = [v2xx.defaultAMCPController];
                this.mixer = new v207.Mixer();
                this.logLevel = "trace"; // @todo: literal
                this.autoDeinterlace = true;
                this.autoTranscode = true;
                this.pipelineTokens = 2;
                this.thumbnails = new v207.Thumbnails();
                this.osc = new v2xx.Osc();
                this.audio = new v207.Audio();
            }
        }
        v207.CasparCGConfigVO = CasparCGConfigVO;
        /** */
        class Channel extends v2xx.Channel {
            constructor() {
                super(...arguments);
                this.consumers = [];
            }
        }
        v207.Channel = Channel;
        /** */
        class Paths {
            constructor() {
                this.mediaPath = "media\\";
                this.logPath = "log\\";
                this.dataPath = "data\\";
                this.templatePath = "templates\\";
                this.thumbnailsPath = "thumbnails\\";
            }
        }
        v207.Paths = Paths;
        /** */
        class Consumer extends v2xx.Consumer {
        }
        v207.Consumer = Consumer;
        /** */
        class DecklinkConsumer extends v2xx.DecklinkConsumer {
            constructor() {
                super(...arguments);
                this.customAllocator = true;
            }
        }
        v207.DecklinkConsumer = DecklinkConsumer;
        /** */
        class BluefishConsumer extends v2xx.BluefishConsumer {
        }
        v207.BluefishConsumer = BluefishConsumer;
        /** */
        class SystemAudioConsumer extends v2xx.SystemAudioConsumer {
        }
        v207.SystemAudioConsumer = SystemAudioConsumer;
        /** */
        class ScreenConsumer extends v2xx.ScreenConsumer {
            constructor() {
                super(...arguments);
                this.name = "Screen Consumer";
            }
        }
        v207.ScreenConsumer = ScreenConsumer;
        /** */
        class NewtekIvgaConsumer extends v2xx.NewtekIvgaConsumer {
            constructor() {
                super(...arguments);
                this.channelLayout = "stereo";
                this.provideSync = true;
            }
        }
        v207.NewtekIvgaConsumer = NewtekIvgaConsumer;
        /** */
        class FileConsumer extends v2xx.Consumer {
            constructor() {
                super(...arguments);
                this._type = "file";
                this.path = "";
                this.vcodec = "libx264";
                this.separateKey = false;
            }
        }
        v207.FileConsumer = FileConsumer;
        /** */
        class StreamConsumer extends v2xx.Consumer {
            constructor() {
                super(...arguments);
                this._type = "stream";
                this.path = "";
                this.args = "";
            }
        }
        v207.StreamConsumer = StreamConsumer;
        /** */
        class Thumbnails extends v2xx.Thumbnails {
        }
        v207.Thumbnails = Thumbnails;
        /** */
        class Mixer extends v2xx.Mixer {
            constructor() {
                super(...arguments);
                this.chromaKey = false;
            }
        }
        v207.Mixer = Mixer;
        /**  */
        class Osc extends v2xx.Osc {
        }
        v207.Osc = Osc;
        /**  */
        class ChannelLayout {
            constructor() {
                this._type = "channel-layout";
                this.name = "";
                this.type = "";
                this.numChannels = null;
                this.channels = "";
            }
        }
        v207.ChannelLayout = ChannelLayout;
        /**  */
        class MixConfig {
            constructor() {
                this._type = "mix-config";
                this.from = "";
                this.to = "";
                this.mix = "";
                this.mappings = [];
            }
        }
        v207.MixConfig = MixConfig;
        /**  */
        class Audio {
            constructor() {
                this.channelLayouts = [];
                this.mixConfigs = [];
            }
        }
        v207.Audio = Audio;
    })(v207 = Config.v207 || (Config.v207 = {}));
    /** */
    let v21x;
    (function (v21x) {
        v21x.defaultLOGController = { _type: new v2xx.Controller()._type, port: 3250, protocol: "LOG" };
        /** */
        class CasparCGConfigVO extends v2xx.CasparCGConfigVO {
            constructor() {
                super(...arguments);
                this.paths = new v21x.Paths();
                this.channels = [new v2xx.Channel()];
                this.controllers = [v2xx.defaultAMCPController, v21x.defaultLOGController];
                this.lockClearPhrase = "secret";
                this.mixer = new v21x.Mixer();
                this.logLevel = "info"; // @todo: literal
                this.logCategories = "communication"; // @todo: literal or strongtype
                this.forceDeinterlace = false;
                this.accelerator = "auto"; // @todo: literal
                this.thumbnails = new v21x.Thumbnails();
                this.html = new v21x.Html();
                this.osc = new v21x.Osc();
                this.audio = new v21x.Audio();
            }
        }
        v21x.CasparCGConfigVO = CasparCGConfigVO;
        /** */
        class Channel extends v2xx.Channel {
            constructor() {
                super(...arguments);
                this.consumers = [];
            }
        }
        v21x.Channel = Channel;
        /** */
        class Paths {
            constructor() {
                this.mediaPath = "media/";
                this.logPath = "log/";
                this.dataPath = "data/";
                this.templatePath = "template/";
                this.thumbnailPath = "thumbnail/";
                this.fontPath = "font/";
            }
        }
        v21x.Paths = Paths;
        /** */
        class Consumer extends v2xx.Consumer {
        }
        v21x.Consumer = Consumer;
        /** */
        class DecklinkConsumer extends v2xx.DecklinkConsumer {
        }
        v21x.DecklinkConsumer = DecklinkConsumer;
        /** */
        class BluefishConsumer extends v2xx.BluefishConsumer {
        }
        v21x.BluefishConsumer = BluefishConsumer;
        /** */
        class SystemAudioConsumer extends v2xx.SystemAudioConsumer {
            constructor() {
                super(...arguments);
                this.channelLayout = "stereo";
                this.latency = 200;
            }
        }
        v21x.SystemAudioConsumer = SystemAudioConsumer;
        /** */
        class ScreenConsumer extends v2xx.ScreenConsumer {
            constructor() {
                super(...arguments);
                this.interactive = true;
            }
        }
        v21x.ScreenConsumer = ScreenConsumer;
        /** */
        class NewtekIvgaConsumer extends v2xx.NewtekIvgaConsumer {
        }
        v21x.NewtekIvgaConsumer = NewtekIvgaConsumer;
        /** */
        class FfmpegConsumer extends v2xx.Consumer {
            constructor() {
                super(...arguments);
                this._type = "ffmpeg";
                this.path = "";
                this.args = "";
                this.separateKey = false;
                this.monoStreams = false;
            }
        }
        v21x.FfmpegConsumer = FfmpegConsumer;
        /** */
        class SynctoConsumer extends v2xx.Consumer {
            constructor() {
                super(...arguments);
                this._type = "syncto";
                this.channelId = null;
            }
        }
        v21x.SynctoConsumer = SynctoConsumer;
        /** */
        class Mixer extends v2xx.Mixer {
        }
        v21x.Mixer = Mixer;
        /**  */
        class Thumbnails extends v2xx.Thumbnails {
            constructor() {
                super(...arguments);
                this.mipmap = true;
            }
        }
        v21x.Thumbnails = Thumbnails;
        /** */
        class Html {
            constructor() {
                this.remoteDebuggingPort = null;
            }
        }
        v21x.Html = Html;
        /**  */
        class Osc extends v2xx.Osc {
            constructor() {
                super(...arguments);
                this.disableSendToAmcpClients = false;
            }
        }
        v21x.Osc = Osc;
        /**  */
        class ChannelLayout {
            constructor() {
                this._type = "channel-layout";
                this.name = "";
                this.type = "";
                this.numChannels = null;
                this.channelOrder = "";
            }
        }
        v21x.ChannelLayout = ChannelLayout;
        /**  */
        class MixConfig {
            constructor() {
                this._type = "mix-config";
                this.fromType = "";
                this.toTypes = "";
                this.mix = "";
            }
        }
        v21x.MixConfig = MixConfig;
        /**  */
        class Audio {
            constructor() {
                this.channelLayouts = [];
                this.mixConfigs = [];
            }
        }
        v21x.Audio = Audio;
    })(v21x = Config.v21x || (Config.v21x = {}));
    /** */
    let Intermediate;
    (function (Intermediate) {
        var Config207VO = v207.CasparCGConfigVO;
        var Config210VO = v21x.CasparCGConfigVO;
        /** */
        class Audio {
            constructor() {
                this.channelLayouts = [];
                this.mixConfigs = [];
            }
        }
        Intermediate.Audio = Audio;
        /**  */
        class MixConfig {
            constructor() {
                this._type = "mix-config";
                this.fromType = "";
                this.toTypes = "";
            }
        }
        Intermediate.MixConfig = MixConfig;
        /** */
        class Mixer extends v207.Mixer {
        }
        Intermediate.Mixer = Mixer;
        /** */
        class CasparCGConfig {
            constructor(initVersionOrConfigVO) {
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
                        this.__version = ServerVersion.V210;
                    }
                    else if (initVersionOrConfigVO === 2007) {
                        this.__version = ServerVersion.V207;
                    }
                    return;
                }
                // is initVO
                if (initVersionOrConfigVO) {
                    if (initVersionOrConfigVO instanceof Config207VO) {
                        this.__version = ServerVersion.V207;
                    }
                    else if (initVersionOrConfigVO instanceof Config210VO) {
                        this.__version = ServerVersion.V210;
                    }
                    else if ((typeof initVersionOrConfigVO === "object") && initVersionOrConfigVO["_version"]) {
                        if (initVersionOrConfigVO["_version"] >= 2100) {
                            this.__version = ServerVersion.V210;
                        }
                        else if (initVersionOrConfigVO["_version"] >= 2007) {
                            this.__version = ServerVersion.V207;
                        }
                    }
                    this.import(initVersionOrConfigVO);
                }
            }
            /** */
            import(configVO) {
                if (this.__version === ServerVersion.V207) {
                    this.importFromV207VO(configVO);
                }
                else if (this.__version === ServerVersion.V210) {
                    this.importFromV210VO(configVO);
                }
                // @todo: throw error
            }
            /** */
            importFromV207VO(configVO) {
                // root level
                this.importValues(configVO, this, ["log-level", "channel-grid", "auto-deinterlace", "auto-transcode", "pipeline-tokens"]);
                // paths
                this.importValues(configVO["paths"], this.paths, ["media-path", "log-path", "data-path", "template-path", "thumbnails-path"]);
                // channels
                this.findListMembers(configVO, "channels").forEach((i) => {
                    let channel = new v2xx.Channel();
                    this.importValues(i, channel, ["video-mode", "channel-layout", "straight-alpha-output"]);
                    this.findListMembers(i, "consumers").forEach((o) => {
                        let consumerName = CasparCGConfig.dashedToCamelCase(o["_type"]) + "Consumer";
                        this.importListMembers(o, consumerName, v21x);
                        channel.consumers.push(o);
                    });
                    this.channels.push(channel);
                });
                // controllers
                this.findListMembers(configVO, "controllers").forEach((i) => {
                    let controller = new v2xx.Controller();
                    this.importAllValues(i, controller);
                    this.controllers.push(controller);
                });
                // mixer
                this.importValues(configVO["mixer"], this.mixer, ["blend-modes", "mipmapping-default-on", "straight-alpha", "chroma-key"]);
                // templatehosts
                this.findListMembers(configVO, "template-hosts").forEach((i) => {
                    let templateHost = new v2xx.TemplateHost();
                    this.importAllValues(i, templateHost);
                    this.templateHosts.push(templateHost);
                });
                // flash
                this.importValues(configVO["flash"], this.flash, ["buffer-depth"]);
                // thumbnails
                this.importValues(configVO["thumbnails"], this.thumbnails, ["generate-thumbnails", "width", "height", "video-grid", "scan-interval-millis", "generate-delay-millis", "video-mode", "mipmap"]);
                // osc
                this.importValues(configVO["osc"], this.osc, ["default-port"]);
                this.findListMembers(configVO["osc"], "predefined-clients").forEach((i) => {
                    let client = new v2xx.OscClient();
                    this.importAllValues(i, client);
                    this.osc.predefinedClients.push(client);
                });
                // audio
                if (configVO.hasOwnProperty("audio")) {
                    if (configVO["audio"].hasOwnProperty("channelLayouts")) {
                        this.audio.channelLayouts = new Array();
                        configVO["audio"]["channelLayouts"].forEach((i) => {
                            let channelLayout = new v21x.ChannelLayout();
                            channelLayout._type = i._type;
                            channelLayout.channelOrder = i.channels;
                            channelLayout.name = i.name;
                            channelLayout.numChannels = i.numChannels;
                            channelLayout.type = i.type;
                            this.audio.channelLayouts.push(channelLayout);
                        });
                    }
                    if (configVO["audio"].hasOwnProperty("mixConfigs")) {
                        this.audio.mixConfigs = new Array();
                        configVO["audio"]["mixConfigs"].forEach((i) => {
                            let mixConfig = new Intermediate.MixConfig();
                            mixConfig._type = i._type;
                            mixConfig.fromType = i.from;
                            mixConfig.toTypes = i.to;
                            mixConfig.mix = { mixType: i.mix, destinations: {} };
                            // convert 2.0.x mix-config to 2.1.x
                            let destinations = {};
                            let mapSections;
                            for (let o = 0; o < i.mappings.length; o++) {
                                mapSections = i.mappings[o].match(/(\S+)\s+(\S+)\s+(\S+)/);
                                if (mapSections !== null) {
                                    let src = mapSections[1];
                                    let dst = mapSections[2];
                                    let expr = mapSections[3];
                                    if (!destinations.hasOwnProperty(dst)) {
                                        destinations[dst] = [];
                                    }
                                    destinations[dst].push({ source: src, expression: expr });
                                }
                            }
                            mixConfig.mix.destinations = destinations;
                            this.audio.mixConfigs.push(mixConfig);
                        });
                    }
                }
            }
            /** */
            importFromV210VO(configVO) {
                // root level
                this.importValues(configVO, this, ["lockClear-phrase", "log-level", "log-categories", "force-deinterlace", "channel-grid", "accelerator"]);
                // paths
                this.importValues(configVO["paths"], this.paths, ["media-path", "log-path", "data-path", "template-path", "thumbnail-path", "font-path"]);
                // channels
                this.findListMembers(configVO, "channels").forEach((i) => {
                    let channel = new v2xx.Channel();
                    this.importValues(i, channel, ["video-mode", "channel-layout", "straight-alpha-output"]);
                    this.findListMembers(i, "consumers").forEach((o) => {
                        let consumerName = CasparCGConfig.dashedToCamelCase(o["_type"]) + "Consumer";
                        this.importListMembers(o, consumerName, v21x);
                        channel.consumers.push(o);
                    });
                    this.channels.push(channel);
                });
                // controllers
                this.findListMembers(configVO, "controllers").forEach((i) => {
                    let controller = new v2xx.Controller();
                    this.importAllValues(i, controller);
                    this.controllers.push(controller);
                });
                // mixer
                this.importValues(configVO["mixer"], this.mixer, ["blend-modes", "mipmapping-default-on", "straight-alpha"]);
                // templatehosts
                this.findListMembers(configVO, "template-hosts").forEach((i) => {
                    let templateHost = new v2xx.TemplateHost();
                    this.importAllValues(i, templateHost);
                    this.templateHosts.push(templateHost);
                });
                // flash
                this.importValues(configVO["flash"], this.flash, ["buffer-depth"]);
                // html
                this.importValues(configVO["html"], this.html, ["remote-debugging-port"]);
                // thumbnails
                this.importValues(configVO["thumbnails"], this.thumbnails, ["generate-thumbnails", "width", "height", "video-grid", "scan-interval-millis", "generate-delay-millis", "video-mode", "mipmap"]);
                // osc
                this.importValues(configVO["osc"], this.osc, ["default-port", "disable-send-to-amcp-clients"]);
                this.findListMembers(configVO["osc"], "predefined-clients").forEach((i) => {
                    let client = new v2xx.OscClient();
                    this.importAllValues(i, client);
                    this.osc.predefinedClients.push(client);
                });
                // audio
                if (configVO.hasOwnProperty("audio")) {
                    if (configVO["audio"].hasOwnProperty("channelLayouts")) {
                        this.audio.channelLayouts = configVO["audio"]["channelLayouts"];
                    }
                    if (configVO["audio"].hasOwnProperty("mixConfigs")) {
                        this.audio.mixConfigs = new Array();
                        configVO["audio"]["mixConfigs"].forEach((i) => {
                            let mixConfig = new Intermediate.MixConfig();
                            mixConfig._type = i._type;
                            mixConfig.fromType = i.fromType;
                            mixConfig.toTypes = i.toTypes;
                            let destinations = {};
                            let mixType = i.mix.match(/\&lt\;|\</g) !== null ? "average" : "add";
                            let src;
                            let dest;
                            let expr;
                            i.mix.split("|").map((i) => i.replace(/^\s*|\s*$/g, "")).forEach((o) => {
                                let srcDstSplit = o.split(/\&lt\;|\<|\=/);
                                dest = srcDstSplit[0].replace(/^\s*|\s*$/g, "");
                                destinations[dest] = [];
                                srcDstSplit[1].split("+").forEach((u) => {
                                    let exprSplit = u.split("*");
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
                            this.audio.mixConfigs.push(mixConfig);
                        });
                    }
                }
            }
            /** */
            get VO() {
                if (this.__version === ServerVersion.V207) {
                    return this.v207VO;
                }
                else if (this.__version === ServerVersion.V210) {
                    return this.v210VO;
                }
                throw new Error("@todo"); // @todo: throw
            }
            /** */
            get v207VO() {
                // let configVO: Config207VO = {};
                let configVO = new Config207VO;
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
                this.audio.channelLayouts.forEach((i) => {
                    let channelLayout = new v207.ChannelLayout();
                    channelLayout.name = i.name;
                    channelLayout.numChannels = i.numChannels;
                    channelLayout.type = i.type;
                    channelLayout.channels = i.channelOrder;
                    configVO.audio.channelLayouts.push(channelLayout);
                });
                this.audio.mixConfigs.forEach((i) => {
                    let mixConfig = new v207.MixConfig();
                    mixConfig.from = i.fromType;
                    mixConfig.to = i.toTypes;
                    mixConfig.mix = i.mix.mixType;
                    for (let o in i.mix.destinations) {
                        i.mix.destinations[o].forEach((u) => {
                            mixConfig.mappings.push([u.source, o, u.expression].join(" "));
                        });
                    }
                    configVO.audio.mixConfigs.push(mixConfig);
                });
                return configVO;
            }
            /** */
            get v210VO() {
                let configVO = new Config210VO();
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
                this.audio.mixConfigs.forEach((i) => {
                    let mixConfig = new v21x.MixConfig();
                    mixConfig.fromType = i.fromType;
                    mixConfig.toTypes = i.toTypes;
                    let mixOperator;
                    let destinationStrings = [];
                    for (let o in i.mix.destinations) {
                        let destinationSubStrings = [];
                        let destinations = i.mix.destinations[o];
                        mixOperator = (destinations.length > 1 && i.mix.mixType === "average") ? "<" : "=";
                        destinations.forEach((u) => {
                            destinationSubStrings.push(u.expression === "1.0" ? u.source : u.expression + "*" + u.source);
                        });
                        destinationStrings.push(o + " " + mixOperator + " " + destinationSubStrings.join(" + "));
                    }
                    mixConfig.mix = destinationStrings.join(" | ");
                    configVO.audio.mixConfigs.push(mixConfig);
                });
                return configVO;
            }
            /** */
            get XML() {
                if (this.__version === ServerVersion.V207) {
                    return this.v207XML;
                }
                else if (this.__version === ServerVersion.V210) {
                    return this.v210XML;
                }
                return null; // @todo: throw error
            }
            /** */
            get v207XML() {
                let xml = XMLBuilder("configuration");
                // paths
                let paths = new v207.Paths();
                paths.dataPath = this.paths.dataPath;
                paths.logPath = this.paths.logPath;
                paths.mediaPath = this.paths.mediaPath;
                paths.templatePath = this.paths.templatePath;
                paths.thumbnailsPath = this.paths.thumbnailPath;
                CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele("paths"), paths); // , ["mediaPath", "logPath", "dataPath", "templatesPath", "thumbnailPath"]);
                // channels
                let channels = xml.ele("channels");
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
                let controllers = xml.ele("controllers");
                this.controllers.forEach((i) => {
                    let controller = controllers.ele(i._type);
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
                    let templateHosts = xml.ele("template-hosts");
                    this.templateHosts.forEach((i) => {
                        let templatehost = templateHosts.ele(i._type);
                        CasparCGConfig.addFormattedXMLChildsFromObject(templatehost, i, ["_type"]);
                    });
                }
                // thumbnails
                if (this.thumbnails) {
                    CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele("thumbnails"), this.thumbnails);
                }
                // osc
                if (this.osc) {
                    let osc = xml.ele("osc");
                    osc.ele("default-port", this.osc.defaultPort);
                    // predefined clients
                    if (this.osc.predefinedClients && this.osc.predefinedClients.length > 0) {
                        let predefinedClients = osc.ele("predefined-clients");
                        this.osc.predefinedClients.forEach((i) => {
                            predefinedClients;
                            let client = predefinedClients.ele(i._type);
                            CasparCGConfig.addFormattedXMLChildsFromObject(client, i, ["_type"]);
                        });
                    }
                }
                // audio
                if (this.audio && ((this.audio.channelLayouts && this.audio.channelLayouts.length > 0) || (this.audio.mixConfigs && this.audio.mixConfigs.length > 0))) {
                    let audio = xml.ele("audio");
                    if (this.audio.channelLayouts && this.audio.channelLayouts.length > 0) {
                        let channelLayouts = audio.ele("channel-layouts");
                        this.audio.channelLayouts.forEach((i) => {
                            let channelLayout = channelLayouts.ele("channel-layout");
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
                        let mixConfigs = audio.ele("mix-configs");
                        this.audio.mixConfigs.forEach((i) => {
                            let mixConfig = mixConfigs.ele("mix-config");
                            mixConfig.ele("from", i.fromType);
                            mixConfig.ele("to", i.toTypes);
                            mixConfig.ele("mix", i.mix.mixType);
                            let mappings = mixConfig.ele("mappings");
                            for (let o in i.mix.destinations) {
                                let destination = i.mix.destinations[o];
                                destination.forEach((u) => {
                                    mappings.ele("mapping", u.source + " " + o + " " + u.expression);
                                });
                            }
                        });
                    }
                }
                return xml;
            }
            /** */
            get v210XML() {
                let xml = XMLBuilder("configuration");
                // paths
                CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele("paths"), this.paths); // , ["mediaPath", "logPath", "dataPath", "templatePath", "thumbnailPath", "fontpath"]);
                // channels
                let channels = xml.ele("channels");
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
                let controllers = xml.ele("controllers");
                this.controllers.forEach((i) => {
                    let controller = controllers.ele(i._type);
                    CasparCGConfig.addFormattedXMLChildsFromObject(controller, i, ["_type"]);
                });
                // all root-level single values
                CasparCGConfig.addFormattedXMLChildsFromArray(xml, this, ["lockClearPhrase", "logLevel", "logCategories", "forceDeinterlace", "channelGrid", "accelerator"]);
                // mixer
                if (this.mixer) {
                    let mixer = xml.ele("mixer");
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
                    let templateHosts = xml.ele("template-hosts");
                    this.templateHosts.forEach((i) => {
                        let templatehost = templateHosts.ele(i._type);
                        CasparCGConfig.addFormattedXMLChildsFromObject(templatehost, i, ["_type"]);
                    });
                }
                // thumbnails
                if (this.thumbnails) {
                    CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele("thumbnails"), this.thumbnails);
                }
                // osc
                if (this.osc) {
                    let osc = xml.ele("osc");
                    CasparCGConfig.addFormattedXMLChildsFromArray(osc, this.osc, ["defaultPort", "disableSendToAmcpClients"]);
                    // predefined clients
                    if (this.osc.predefinedClients && this.osc.predefinedClients.length > 0) {
                        let predefinedClients = osc.ele("predefined-clients");
                        this.osc.predefinedClients.forEach((i) => {
                            predefinedClients;
                            let client = predefinedClients.ele(i._type);
                            CasparCGConfig.addFormattedXMLChildsFromObject(client, i, ["_type"]);
                        });
                    }
                }
                // audio
                if (this.audio && ((this.audio.channelLayouts && this.audio.channelLayouts.length > 0) || (this.audio.mixConfigs && this.audio.mixConfigs.length > 0))) {
                    let audio = xml.ele("audio");
                    if (this.audio.channelLayouts && this.audio.channelLayouts.length > 0) {
                        let channelLayouts = audio.ele("channel-layouts");
                        this.audio.channelLayouts.forEach((i) => {
                            let channelLayout = channelLayouts.ele("channel-layout");
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
                        let mixConfigs = audio.ele("mix-configs");
                        this.audio.mixConfigs.forEach((i) => {
                            let mixStrings = [];
                            let mixOperator = i.mix.mixType === "average" ? "<" : i.mix.mixType === "add" ? "=" : "";
                            let destination;
                            for (let o in i.mix.destinations) {
                                destination = i.mix.destinations[o];
                                if (destination.length > 1) {
                                    let subSourceStrings = [];
                                    destination.forEach((u) => {
                                        subSourceStrings.push(u.expression === "1.0" ? u.source : (u.expression.toString() + "*" + u.source));
                                    });
                                    mixStrings.push(o + " " + mixOperator + " " + subSourceStrings.join(" + "));
                                }
                                else {
                                    mixStrings.push(o + " = " + (destination[0].expression === "1.0" ? destination[0].source : (destination[0].expression.toString() + "*" + destination[0].source)));
                                }
                            }
                            mixConfigs.ele("mix-config")
                                .att("from-type", i.fromType)
                                .att("to-types", i.toTypes)
                                .att("mix", mixStrings.join(" | "));
                        });
                    }
                }
                return xml;
            }
            /** */
            get XMLString() {
                if (this.__version === ServerVersion.V207) {
                    return this.v207XMLString;
                }
                else if (this.__version === ServerVersion.V210) {
                    return this.v210XMLString;
                }
                return ""; // @todo: throw error
            }
            /** */
            get v207XMLString() {
                return this.v207XML["end"]({ pretty: true });
            }
            /** */
            get v210XMLString() {
                return this.v210XML["end"]({ pretty: true });
            }
            /** */
            get _version() {
                return this.__version;
            }
            /** */
            importAllValues(sourceRoot, destRoot) {
                let keys = [];
                for (let i in sourceRoot) {
                    keys.push(i);
                }
                this.importValues(sourceRoot, destRoot, keys);
            }
            /** */
            importValues(sourceRoot, destRoot, values) {
                values.forEach((dashedKey) => {
                    let camelKey = CasparCGConfig.dashedToMixedCase(dashedKey);
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
            }
            /** */
            findListMembers(root, childKey) {
                let pairs = [];
                for (let i in root) {
                    pairs.push([i, root[i]]);
                }
                childKey = CasparCGConfig.dashedToMixedCase(childKey);
                for (let i of pairs) {
                    let outerKey = CasparCGConfig.dashedToMixedCase(i[0].toString());
                    let outerValue = i[1];
                    // filter top-level possible arrays
                    if (childKey === outerKey) {
                        let flatArray = [];
                        for (let innerKey in outerValue) {
                            let innerValue = outerValue[innerKey];
                            if (typeof innerValue === "object") {
                                if (Array.isArray(innerValue)) {
                                    innerValue.forEach((o) => {
                                        if (typeof o !== "object") {
                                            o = {};
                                        }
                                        if (!o["_type"]) {
                                            o["_type"] = innerKey;
                                        }
                                        flatArray.push(o);
                                    });
                                }
                                else {
                                    if (!innerValue["_type"]) {
                                        innerValue["_type"] = innerKey;
                                    }
                                    flatArray.push(innerValue);
                                }
                                // update outer member with transformed array of inner members
                            }
                            else {
                                flatArray.push({ _type: innerKey });
                            }
                        }
                        return flatArray;
                    }
                }
                return [];
            }
            /** */
            importListMembers(root, memberName, restrictedNamespace) {
                let namespace;
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
                    let member = Object.create(namespace[memberName]["prototype"]);
                    member.constructor.call(member);
                    this.importAllValues(root, member);
                }
            }
            /** */
            static addFormattedXMLChildsFromObject(root, data, blacklist) {
                blacklist && blacklist.push("arrayNo", "array-no");
                for (let key in data) {
                    if ((key === "constructor") || (blacklist && blacklist.indexOf(key) > -1)) {
                        continue;
                    }
                    let value = data[key];
                    if (value !== null && value !== "") {
                        key = CasparCGConfig.mixedCaseToDashed(key);
                        root["ele"].call(root, key, value);
                    }
                }
                return root;
            }
            /** */
            static addFormattedXMLChildsFromArray(root, data, whitelist) {
                if (whitelist) {
                    whitelist.forEach((key) => {
                        if (data.hasOwnProperty(key)) {
                            let value = data[key];
                            if (value !== null && value !== "") {
                                let keyBlocks = key.split(/(?=[A-Z])/);
                                key = keyBlocks.map((i) => i.toLowerCase()).join("-");
                                root["ele"].call(root, key, value);
                            }
                        }
                    });
                }
                return root;
            }
            /** */
            static dashedToMixedCase(rawString) {
                let keyBlocks = rawString.split(/-/);
                if (keyBlocks.length > 1) {
                    return keyBlocks.map((i, o) => {
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
            }
            /** */
            static dashedToCamelCase(rawString) {
                let keyBlocks = rawString.split(/-/);
                if (keyBlocks.length > 1) {
                    return keyBlocks.map((i) => {
                        i = i.toLowerCase();
                        i = i.slice(0, 1).toUpperCase() + i.slice(1);
                        return i;
                    }).join("");
                }
                else {
                    return rawString;
                }
            }
            /** */
            static mixedCaseToDashed(mixedCased) {
                let keyBlocks = mixedCased.split(/(?=[A-Z])/);
                return keyBlocks.map((i) => i.toLowerCase()).join("-");
            }
        }
        Intermediate.CasparCGConfig = CasparCGConfig;
    })(Intermediate = Config.Intermediate || (Config.Intermediate = {}));
})(Config || (Config = {}));
