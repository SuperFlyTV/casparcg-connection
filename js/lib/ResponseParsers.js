import * as Path from "path";
import { Options as OptionsNS } from "./AMCPConnectionOptions";
// Options NS
var ServerVersion = OptionsNS.ServerVersion;
// config NS
import { Config as ConfigNS } from "./Config";
var CasparCGConfig = ConfigNS.Intermediate.CasparCGConfig;
export var Response;
(function (Response) {
    /** */
    class CasparCGPaths {
        /** */
        get thumbnails() {
            return this.thumbnail;
        }
        /** */
        get absoluteMedia() {
            return this.absolutePath(this.media);
        }
        /** */
        get absoluteData() {
            return this.absolutePath(this.data);
        }
        /** */
        get absoluteLog() {
            return this.absolutePath(this.log);
        }
        /** */
        get absoluteTemplate() {
            return this.absolutePath(this.template);
        }
        /** */
        get absoluteThumbnail() {
            return this.absolutePath(this.thumbnail);
        }
        /** */
        get absoluteThumbnails() {
            return this.absolutePath(this.thumbnails);
        }
        /** */
        get absoluteFont() {
            return this.font ? this.absolutePath(this.font) : undefined;
        }
        /** */
        absolutePath(relativeOrAbsolutePath) {
            if (relativeOrAbsolutePath.match(/\:\\|\:\//)) {
                return CasparCGPaths.ensureTrailingSlash(relativeOrAbsolutePath);
            }
            return CasparCGPaths.ensureTrailingSlash(Path.join(this.root, relativeOrAbsolutePath));
        }
        /** */
        static ensureTrailingSlash(path) {
            return ((path.slice(-1) === "/" || path.slice(-1) === "\\") ? path : path + "/");
        }
    }
    Response.CasparCGPaths = CasparCGPaths;
    /** */
    class ChannelRate {
        /** */
        constructor(rateExpression) {
            this.isInterlaced = rateExpression.indexOf("i") > -1;
            let rateMatch = rateExpression.match(/[0-9]+$/);
            let rate = 0;
            if (rateMatch) {
                rate = +rateMatch[0];
            }
            if (rate === 5994) {
                this.channelRate = 60 * 1000 / 1001;
                this.frameRate = this.isInterlaced ? 30 * 1000 / 1001 : this.channelRate;
            }
            else if (rateExpression.toLowerCase() === "pal") {
                this.isInterlaced = true;
                this.channelRate = 50;
                this.frameRate = 25;
            }
            else if (rateExpression.toLowerCase() === "ntsc") {
                this.isInterlaced = true;
                this.channelRate = 60 * 1000 / 1001;
                this.frameRate = 30 * 1000 / 1001;
            }
            else {
                this.channelRate = rate / 100;
                this.frameRate = this.isInterlaced ? rate / 200 : this.channelRate;
            }
        }
    }
    Response.ChannelRate = ChannelRate;
    /**
     *
     */
    class AbstractParser {
    }
    Response.AbstractParser = AbstractParser;
    /**
     *
     */
    class ChannelParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            data = [].concat(data);
            let result = [];
            data.forEach((channel) => {
                let components = channel.toString().split(/\s|,/);
                let i = +components.shift();
                let format = components.shift() || "";
                let rates = new ChannelRate(format);
                result.push({ channel: i, format: format.toLowerCase(), channelRate: rates.channelRate, frameRate: rates.frameRate, interlaced: rates.isInterlaced });
            });
            if (result.length > 0) {
                return result;
            }
            return {};
        }
    }
    Response.ChannelParser = ChannelParser;
    /** */
    class ConfigParser extends AbstractParser {
        /** */
        parse(data) {
            let serverVersion;
            if (this.context && this.context.hasOwnProperty("serverVersion") && this.context["serverVersion"] > ServerVersion.V21x) {
                serverVersion = ServerVersion.V210;
            }
            else {
                serverVersion = ServerVersion.V207;
            }
            let configResult = new CasparCGConfig(serverVersion);
            configResult.import(data);
            return configResult;
        }
    }
    Response.ConfigParser = ConfigParser;
    /**
     *
     */
    class DataParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            return data;
        }
    }
    Response.DataParser = DataParser;
    /**
     *
     */
    class DataListParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            return data;
        }
    }
    Response.DataListParser = DataListParser;
    /**
     *
     */
    class InfoTemplateParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            return data;
        }
    }
    Response.InfoTemplateParser = InfoTemplateParser;
    /**
     *
     */
    class HelpParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            return data;
        }
    }
    Response.HelpParser = HelpParser;
    /**
     *
     */
    class GLParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            return data;
        }
    }
    Response.GLParser = GLParser;
    /**
     *
     */
    class InfoDelayParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            return data;
        }
    }
    Response.InfoDelayParser = InfoDelayParser;
    /**
     *
     */
    class InfoParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            return data;
        }
    }
    Response.InfoParser = InfoParser;
    /**
     *
     */
    class InfoThreadsParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            return data;
        }
    }
    Response.InfoThreadsParser = InfoThreadsParser;
    /**
     *
     */
    class ThumbnailParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            return `data:image/png;base64,${data}`;
        }
    }
    Response.ThumbnailParser = ThumbnailParser;
    /**
     *
     */
    class VersionParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            return data;
        }
    }
    Response.VersionParser = VersionParser;
    /**
     *
     */
    class ContentParser extends AbstractParser {
        static parseTimeString(timeDateString) {
            timeDateString = timeDateString.replace(/[tT]/g, "");
            let year = parseInt(timeDateString.slice(0, 4));
            let month = parseInt(timeDateString.slice(4, 6));
            let date = parseInt(timeDateString.slice(6, 8));
            let hours = parseInt(timeDateString.slice(8, 10));
            let minutes = parseInt(timeDateString.slice(10, 12));
            let seconds = parseInt(timeDateString.slice(12, 14));
            return new Date(year, month, date, hours, minutes, seconds).getTime();
        }
        /**
         *
         */
        parse(data) {
            return data.map((i) => {
                let components = i.match(/\"([\s\S]*)\" +([\s\S]*)/);
                if (components === null) {
                    return null;
                }
                let name = components[1].replace(/\\/g, "/");
                let typeData = components[2].split(/\s+/);
                // is font
                if (typeData.length === 1) {
                    return { name: name,
                        type: "font",
                        fileName: typeData[0].replace(/\"/g, "")
                    };
                }
                // is 2.1.0 template
                if (typeData.length === 3) {
                    return { name: name,
                        type: "template",
                        size: parseInt(typeData[0]),
                        changed: ContentParser.parseTimeString(typeData[1]),
                        format: typeData[2]
                    };
                }
                // is 2.0.7 template
                if (typeData.length === 2) {
                    return { name: name,
                        type: "template",
                        size: parseInt(typeData[0]),
                        changed: ContentParser.parseTimeString(typeData[1]),
                    };
                }
                // is media
                let frames = parseInt(typeData[3]);
                let frameRate = 0;
                let duration = 0;
                let frameTimeSegments = typeData[4].split("/");
                if (frameTimeSegments[0] !== "0") {
                    frameRate = +(parseInt(frameTimeSegments[1]) / parseInt(frameTimeSegments[0])).toFixed(2);
                    duration = Math.round((frames / frameRate) * 100) / 100;
                }
                return { name: name,
                    type: typeData[0].toLowerCase() === "movie" ? "video" : typeData[0].toLowerCase() === "still" ? "image" : typeData[0].toLowerCase(),
                    size: parseInt(typeData[1]),
                    changed: ContentParser.parseTimeString(typeData[2]),
                    frames: frames,
                    frameTime: typeData[4],
                    frameRate: frameRate,
                    duration: duration
                };
            });
        }
    }
    Response.ContentParser = ContentParser;
    /**
 *
 */
    class ThumbnailListParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            return data.map((i) => {
                let components = i.match(/\"([\s\S]*)\" +([\s\S]*)/);
                if (components === null) {
                    return null;
                }
                let name = components[1].replace(/\\/g, "/");
                let typeData = components[2].split(/\s+/);
                return {
                    name: name,
                    type: "thumbnail",
                    changed: ContentParser.parseTimeString(typeData[0]),
                    size: parseInt(typeData[1]),
                };
            });
        }
    }
    Response.ThumbnailListParser = ThumbnailListParser;
    /**
     *
     */
    class CinfParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            if (data && Array.isArray(data)) {
                let components = data[0].match(/\"([\s\S]*)\" +([\s\S]*)/);
                if (components === null) {
                    return {};
                }
                // let name: string = components[1].replace(/\\/g, "/");
                let typeData = components[2].split(/\s+/);
                return { size: parseInt(typeData[1]), changed: typeData[2], duration: parseInt(typeData[3]), fps: typeData[4] };
            }
            return {};
        }
    }
    Response.CinfParser = CinfParser;
    /**
     *
     */
    class InfoQueuesParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            return data;
        }
    }
    Response.InfoQueuesParser = InfoQueuesParser;
    /**
        *
     */
    class InfoServerParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            return data;
        }
    }
    Response.InfoServerParser = InfoServerParser;
    /**
     *
     */
    class InfoPathsParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            let paths = new CasparCGPaths();
            if (data.hasOwnProperty("initial-path")) {
                paths.root = data["initial-path"];
            }
            if (data.hasOwnProperty("media-path")) {
                paths.media = data["media-path"];
            }
            if (data.hasOwnProperty("data-path")) {
                paths.data = data["data-path"];
            }
            if (data.hasOwnProperty("log-path")) {
                paths.log = data["log-path"];
            }
            if (data.hasOwnProperty("template-path")) {
                paths.template = data["template-path"];
            }
            if (data.hasOwnProperty("thumbnails-path")) {
                paths.thumbnail = data["thumbnails-path"];
            }
            if (data.hasOwnProperty("thumbnail-path")) {
                paths.thumbnail = data["thumbnail-path"];
            }
            if (data.hasOwnProperty("font-path")) {
                paths.font = data["font-path"];
            }
            return paths;
        }
    }
    Response.InfoPathsParser = InfoPathsParser;
    /**
     *
     */
    class InfoSystemParser extends AbstractParser {
        /**
         *
         */
        parse(data) {
            // wrap devices in arrays (if single device of a type)
            if (data.hasOwnProperty("decklink") && data["decklink"].hasOwnProperty("device")) {
                if (!Array.isArray(data["decklink"]["device"])) {
                    data["decklink"]["device"] = [data["decklink"]["device"]];
                }
            }
            if (data.hasOwnProperty("bluefish") && data["bluefish"].hasOwnProperty("device")) {
                if (!Array.isArray(data["bluefish"]["device"])) {
                    data["bluefish"]["device"] = [data["bluefish"]["device"]];
                }
            }
            return data;
        }
    }
    Response.InfoSystemParser = InfoSystemParser;
})(Response || (Response = {}));
