export declare namespace Response {
    /***/
    class CasparCGPaths {
        media: string;
        data: string;
        log: string;
        template: string;
        thumbnail: string;
        font?: string | undefined;
        root: string;
        /***/
        static ensureTrailingSlash(path: string): string;
        /***/
        readonly thumbnails: string;
        /***/
        readonly absoluteMedia: string;
        /***/
        readonly absoluteData: string;
        /***/
        readonly absoluteLog: string;
        /***/
        readonly absoluteTemplate: string;
        /***/
        readonly absoluteThumbnail: string;
        /***/
        readonly absoluteThumbnails: string;
        /***/
        readonly absoluteFont: string | undefined;
        /***/
        private absolutePath(relativeOrAbsolutePath);
    }
    /***/
    class ChannelRate {
        channelRate: number;
        frameRate: number;
        isInterlaced: boolean;
        /***/
        constructor(rateExpression: string);
    }
    /**
     *
     */
    interface IResponseParser {
        context?: Object;
        parse(data: Object): Object;
    }
    /**
     *
     */
    abstract class AbstractParser {
        context?: Object;
    }
    /**
     *
     */
    class ChannelParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: any): Object;
    }
    /***/
    class ConfigParser extends AbstractParser implements IResponseParser {
        /***/
        parse(data: Object): Object;
    }
    /**
     *
     */
    class DataParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class DataListParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class InfoTemplateParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class HelpParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class GLParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class InfoDelayParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class InfoParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class InfoThreadsParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class ThumbnailParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class VersionParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class ContentParser extends AbstractParser implements IResponseParser {
        static parseTimeString(timeDateString: string): number;
        /**
         *
         */
        parse(data: Array<string>): Object;
    }
    /**
     *
     */
    class ThumbnailListParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<string>): Object;
    }
    /**
     *
     */
    class CinfParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class InfoQueuesParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class InfoServerParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class InfoPathsParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class InfoSystemParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Object): Object;
    }
    /**
     *
     */
    class MixerStatusKeyerParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusChromaParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusBlendParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusOpacityParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusBrightnessParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusSaturationParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusContrastParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusLevelsParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusFillParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusClipParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusAnchorParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusCropParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusRotationParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusPerspectiveParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusMipmapParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusVolumeParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusMastervolumeParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
    /**
     *
     */
    class MixerStatusStraightAlphaOutputParser extends AbstractParser implements IResponseParser {
        /**
         *
         */
        parse(data: Array<number>): Object;
    }
}
