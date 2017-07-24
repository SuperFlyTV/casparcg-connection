import { Options as OptionsNS } from './AMCPConnectionOptions';
import CasparCGVersion = OptionsNS.CasparCGVersion;
/***/
export declare namespace Config {
    /***/
    namespace Utils {
        type factoryMembers = 'config' | 'channel' | 'decklink' | 'bluefish' | 'system-audio' | 'screen' | 'newtek-ivga' | 'ffmpeg' | 'file' | 'ffmpeg' | 'stream' | 'syncto' | 'tcp' | 'predefined-client' | 'template-host' | 'channel-layout' | 'mix-config';
        type FactyoryTypes = v207.CasparCGConfigVO | v21x.CasparCGConfigVO | v2xx.Consumer | v2xx.Channel | v2xx.Controller | v2xx.OscClient | v2xx.TemplateHost | v207.ChannelLayout | v207.MixConfig | v21x.ChannelLayout | v21x.MixConfig | undefined;
        function configMemberFactory(version: CasparCGVersion, memberName: factoryMembers | string, initValues?: Object): FactyoryTypes;
    }
    /***/
    namespace v2xx {
        /***/
        class CasparCGConfigVO {
            channelGrid: boolean;
            flash: v2xx.Flash;
            templateHosts: Array<v2xx.TemplateHost>;
        }
        /***/
        class Channel {
            _type: string;
            videoMode: string;
            consumers: Array<Consumer>;
            straightAlphaOutput: boolean;
            channelLayout: string;
        }
        /***/
        class Consumer {
            _type: string;
        }
        /***/
        class DecklinkConsumer extends Consumer {
            _type: string;
            device: number;
            keyDevice: Number | null;
            embeddedAudio: boolean;
            channelLayout: string;
            latency: string;
            keyer: string;
            keyOnly: boolean;
            bufferDepth: number;
        }
        /***/
        class BluefishConsumer extends Consumer {
            _type: string;
            device: number;
            embeddedAudio: boolean;
            channelLayout: string;
            keyOnly: boolean;
        }
        /***/
        class SystemAudioConsumer extends Consumer {
            _type: string;
        }
        /***/
        class ScreenConsumer extends Consumer {
            _type: string;
            device: number;
            aspectRatio: string;
            stretch: string;
            windowed: boolean;
            keyOnly: boolean;
            autoDeinterlace: boolean;
            vsync: boolean;
            borderless: boolean;
        }
        /***/
        class NewtekIvgaConsumer extends Consumer {
            _type: string;
        }
        /***/
        class Controller {
            _type: string;
            port: number | null;
            protocol: string;
        }
        /***/
        class Mixer {
            blendModes: boolean;
            straightAlpha: boolean;
            mipmappingDefaultOn: boolean;
        }
        /***/
        class OscClient {
            _type: string;
            address: string;
            port: number | null;
        }
        /***/
        class Thumbnails {
            generateThumbnails: boolean;
            width: number;
            height: number;
            videoGrid: number;
            scanIntervalMillis: number;
            generateDelayMillis: number;
            mipmap: boolean;
            videoMode: string;
        }
        /***/
        class Flash {
            bufferDepth: string | number;
        }
        /***/
        class TemplateHost {
            _type: string;
            videoMode: string;
            filename: string;
            width: number | null;
            height: number | null;
        }
        /***/
        class Osc {
            defaultPort: number;
            predefinedClients: Array<OscClient>;
        }
        /***/
        const defaultAMCPController: v2xx.Controller;
    }
    /***/
    namespace v207 {
        /***/
        class CasparCGConfigVO extends v2xx.CasparCGConfigVO {
            _version: number;
            paths: v207.Paths;
            channels: Array<v207.Channel>;
            controllers: Array<v2xx.Controller>;
            mixer: v207.Mixer;
            logLevel: string;
            autoDeinterlace: boolean;
            autoTranscode: boolean;
            pipelineTokens: number;
            thumbnails: v207.Thumbnails;
            osc: v2xx.Osc;
            audio: v207.Audio;
        }
        /***/
        class Channel extends v2xx.Channel {
            consumers: Array<v207.Consumer>;
        }
        /***/
        class Paths {
            mediaPath: string;
            logPath: string;
            dataPath: string;
            templatePath: string;
            thumbnailsPath: string;
        }
        /***/
        class Consumer extends v2xx.Consumer {
        }
        /***/
        class DecklinkConsumer extends v2xx.DecklinkConsumer {
            customAllocator: boolean;
        }
        /***/
        class BluefishConsumer extends v2xx.BluefishConsumer {
        }
        /***/
        class SystemAudioConsumer extends v2xx.SystemAudioConsumer {
        }
        /***/
        class ScreenConsumer extends v2xx.ScreenConsumer {
            name: string;
        }
        /***/
        class NewtekIvgaConsumer extends v2xx.NewtekIvgaConsumer {
            channelLayout: string;
            provideSync: boolean;
        }
        /***/
        class FileConsumer extends v2xx.Consumer {
            _type: string;
            path: string;
            vcodec: string;
            separateKey: boolean;
        }
        /***/
        class StreamConsumer extends v2xx.Consumer {
            _type: string;
            path: string;
            args: string;
        }
        /***/
        class Thumbnails extends v2xx.Thumbnails {
        }
        /***/
        class Mixer extends v2xx.Mixer {
            chromaKey: boolean;
        }
        /***/
        class Osc extends v2xx.Osc {
        }
        /***/
        class ChannelLayout {
            _type: string;
            name: string;
            type: string;
            numChannels: number | null;
            channels: string;
        }
        /***/
        class MixConfig {
            _type: string;
            from: string;
            to: string;
            mix: string;
            mappings: Array<string>;
        }
        /***/
        class Audio {
            channelLayouts: Array<v207.ChannelLayout>;
            mixConfigs: Array<v207.MixConfig>;
        }
    }
    /***/
    namespace v21x {
        const defaultLOGController: v2xx.Controller;
        /***/
        class CasparCGConfigVO extends v2xx.CasparCGConfigVO {
            _version: number;
            paths: v21x.Paths;
            channels: Array<v21x.Channel>;
            controllers: Array<v2xx.Controller>;
            lockClearPhrase: string;
            mixer: v21x.Mixer;
            logLevel: string;
            logCategories: string;
            forceDeinterlace: boolean;
            accelerator: string;
            thumbnails: v21x.Thumbnails;
            html: v21x.Html;
            osc: v21x.Osc;
            audio: v21x.Audio;
        }
        /***/
        class Channel extends v2xx.Channel {
            consumers: Array<v21x.Consumer>;
        }
        /***/
        class Paths {
            mediaPath: string;
            logPath: string;
            dataPath: string;
            templatePath: string;
            thumbnailPath: string;
            fontPath: string;
        }
        /***/
        class Consumer extends v2xx.Consumer {
        }
        /***/
        class DecklinkConsumer extends v2xx.DecklinkConsumer {
        }
        /***/
        class BluefishConsumer extends v2xx.BluefishConsumer {
        }
        /***/
        class SystemAudioConsumer extends v2xx.SystemAudioConsumer {
            channelLayout: string;
            latency: number;
        }
        /***/
        class ScreenConsumer extends v2xx.ScreenConsumer {
            interactive: boolean;
        }
        /***/
        class NewtekIvgaConsumer extends v2xx.NewtekIvgaConsumer {
        }
        /***/
        class FfmpegConsumer extends v2xx.Consumer {
            _type: string;
            path: string;
            args: string;
            separateKey: boolean;
            monoStreams: boolean;
        }
        /***/
        class SynctoConsumer extends v2xx.Consumer {
            _type: string;
            channelId: Number | null;
        }
        /***/
        class Mixer extends v2xx.Mixer {
        }
        /***/
        class Thumbnails extends v2xx.Thumbnails {
            mipmap: boolean;
        }
        /***/
        class Html {
            remoteDebuggingPort: number | null;
        }
        /***/
        class Osc extends v2xx.Osc {
            disableSendToAmcpClients: boolean;
        }
        /***/
        class ChannelLayout {
            _type: string;
            name: string;
            type: string;
            numChannels: number | null;
            channelOrder: string;
        }
        /***/
        class MixConfig {
            _type: string;
            fromType: string;
            toTypes: string;
            mix: string;
        }
        /***/
        class Audio {
            channelLayouts: Array<v21x.ChannelLayout>;
            mixConfigs: Array<v21x.MixConfig>;
        }
    }
    /***/
    namespace Intermediate {
        import Config207VO = v207.CasparCGConfigVO;
        import Config210VO = v21x.CasparCGConfigVO;
        /***/
        class Audio {
            channelLayouts: Array<v21x.ChannelLayout>;
            mixConfigs: Array<Intermediate.MixConfig>;
        }
        /***/
        class MixConfig {
            _type: string;
            fromType: string;
            toTypes: string;
            mix: {
                mixType: string;
                destinations: {
                    [destination: string]: Array<{
                        source: string;
                        expression: string;
                    }>;
                };
            };
        }
        /***/
        class Mixer extends v207.Mixer {
            chromaKey: boolean;
        }
        /***/
        interface ICasparCGConfig {
            paths: v21x.Paths;
            channels: Array<v2xx.Channel>;
            controllers: Array<v2xx.Controller>;
            lockClearPhrase: string | null;
            mixer: Intermediate.Mixer;
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
            readonly VO: v207.CasparCGConfigVO | v21x.CasparCGConfigVO;
            readonly vo: v207.CasparCGConfigVO | v21x.CasparCGConfigVO;
            readonly v207VO: v207.CasparCGConfigVO;
            readonly v210VO: v21x.CasparCGConfigVO;
            readonly XML: Object | null;
            readonly xml: Object | null;
            readonly v207XML: Object;
            readonly v210XML: Object;
            readonly XMLString: string;
            readonly v207XMLString: string;
            readonly v210XMLString: string;
            readonly _version: CasparCGVersion;
            import(configVO: Object): void;
            importFromV207VO(configVO: Object): void;
            importFromV210VO(configVO: Object): void;
        }
        /***/
        class CasparCGConfig implements ICasparCGConfig {
            paths: v21x.Paths;
            channels: Array<v2xx.Channel>;
            controllers: Array<v2xx.Controller>;
            lockClearPhrase: string | null;
            mixer: Intermediate.Mixer;
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
            osc: v21x.Osc;
            audio: Intermediate.Audio;
            private __version;
            /***/
            constructor(version: CasparCGVersion);
            constructor(initConfigVO: Config207VO | Config210VO | {});
            /***/
            static addFormattedXMLChildsFromObject(root: Object, data: Object, blacklist?: Array<string>): Object;
            /***/
            static addFormattedXMLChildsFromArray(root: Object, data: Object, whitelist?: Array<string>): Object;
            /***/
            static dashedToMixedCase(rawString: string): string;
            /***/
            static dashedToCamelCase(rawString: string): string;
            /***/
            static mixedCaseToDashed(mixedCased: string): string;
            /***/
            import(configVO: Object): void;
            /***/
            importFromV207VO(configVO: Object): void;
            /***/
            importFromV210VO(configVO: Object): void;
            /***/
            readonly VO: Config207VO | Config210VO;
            /***/
            readonly vo: Config207VO | Config210VO;
            /***/
            readonly v207VO: Config207VO;
            /***/
            readonly v210VO: Config210VO;
            /***/
            readonly XML: Object | null;
            /***/
            readonly xml: Object | null;
            /***/
            readonly v207XML: Object;
            /***/
            readonly v210XML: Object;
            /***/
            readonly XMLString: string;
            /***/
            readonly v207XMLString: string;
            /***/
            readonly v210XMLString: string;
            /***/
            readonly _version: CasparCGVersion;
            /***/
            private importAllValues(sourceRoot, destRoot);
            /***/
            private importValues(sourceRoot, destRoot, values);
            /***/
            private findListMembers(root, childKey);
            /***/
            private importListMembers(root, memberName, restrictedNamespace?);
        }
    }
}
