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
var Path = require("path");
var AMCPConnectionOptions_1 = require("./AMCPConnectionOptions");
// Options NS
var CasparCGVersion = AMCPConnectionOptions_1.Options.CasparCGVersion;
// config NS
var Config_1 = require("./Config");
var CasparCGConfig = Config_1.Config.Intermediate.CasparCGConfig;
var Response;
(function (Response) {
    /***/
    var CasparCGPaths = /** @class */ (function () {
        function CasparCGPaths() {
        }
        /***/
        CasparCGPaths.ensureTrailingSlash = function (path) {
            return ((path.slice(-1) === '/' || path.slice(-1) === '\\') ? path : path + '/');
        };
        Object.defineProperty(CasparCGPaths.prototype, "thumbnails", {
            /***/
            get: function () {
                return this.thumbnail;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteMedia", {
            /***/
            get: function () {
                return this.absolutePath(this.media);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteData", {
            /***/
            get: function () {
                return this.absolutePath(this.data);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteLog", {
            /***/
            get: function () {
                return this.absolutePath(this.log);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteTemplate", {
            /***/
            get: function () {
                return this.absolutePath(this.template);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteThumbnail", {
            /***/
            get: function () {
                return this.absolutePath(this.thumbnail);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteThumbnails", {
            /***/
            get: function () {
                return this.absolutePath(this.thumbnails);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteFont", {
            /***/
            get: function () {
                return this.font ? this.absolutePath(this.font) : undefined;
            },
            enumerable: true,
            configurable: true
        });
        /***/
        CasparCGPaths.prototype.absolutePath = function (relativeOrAbsolutePath) {
            if (relativeOrAbsolutePath.match(/\:\\|\:\//)) {
                return CasparCGPaths.ensureTrailingSlash(relativeOrAbsolutePath);
            }
            return CasparCGPaths.ensureTrailingSlash(Path.join(this.root, relativeOrAbsolutePath));
        };
        return CasparCGPaths;
    }());
    Response.CasparCGPaths = CasparCGPaths;
    /***/
    var ChannelRate = /** @class */ (function () {
        /***/
        function ChannelRate(rateExpression) {
            this.isInterlaced = rateExpression.indexOf('i') > -1;
            var rateMatch = rateExpression.match(/[0-9]+$/);
            var rate = 0;
            if (rateMatch) {
                rate = +rateMatch[0];
            }
            if (rate === 5994) {
                this.channelRate = 60 * 1000 / 1001;
                this.frameRate = this.isInterlaced ? 30 * 1000 / 1001 : this.channelRate;
            }
            else if (rateExpression.toLowerCase() === 'pal') {
                this.isInterlaced = true;
                this.channelRate = 50;
                this.frameRate = 25;
            }
            else if (rateExpression.toLowerCase() === 'ntsc') {
                this.isInterlaced = true;
                this.channelRate = 60 * 1000 / 1001;
                this.frameRate = 30 * 1000 / 1001;
            }
            else {
                this.channelRate = rate / 100;
                this.frameRate = this.isInterlaced ? rate / 200 : this.channelRate;
            }
        }
        return ChannelRate;
    }());
    Response.ChannelRate = ChannelRate;
    /**
     *
     */
    var AbstractParser = /** @class */ (function () {
        function AbstractParser() {
        }
        return AbstractParser;
    }());
    Response.AbstractParser = AbstractParser;
    /**
     *
     */
    var ChannelParser = /** @class */ (function (_super) {
        __extends(ChannelParser, _super);
        function ChannelParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        ChannelParser.prototype.parse = function (data) {
            data = [].concat(data);
            var result = [];
            data.forEach(function (channel) {
                var components = channel.toString().split(/\s|,/);
                var i = +components.shift();
                var format = components.shift() || '';
                var rates = new ChannelRate(format);
                result.push({ channel: i, format: format.toLowerCase(), channelRate: rates.channelRate, frameRate: rates.frameRate, interlaced: rates.isInterlaced });
            });
            if (result.length > 0) {
                return result;
            }
            return {};
        };
        return ChannelParser;
    }(AbstractParser));
    Response.ChannelParser = ChannelParser;
    /***/
    var ConfigParser = /** @class */ (function (_super) {
        __extends(ConfigParser, _super);
        function ConfigParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /***/
        ConfigParser.prototype.parse = function (data) {
            var serverVersion;
            if (this.context && this.context.hasOwnProperty('serverVersion') && this.context['serverVersion'] > CasparCGVersion.V21x) {
                serverVersion = CasparCGVersion.V210;
            }
            else {
                serverVersion = CasparCGVersion.V207;
            }
            var configResult = new CasparCGConfig(serverVersion);
            configResult.import(data);
            return configResult;
        };
        return ConfigParser;
    }(AbstractParser));
    Response.ConfigParser = ConfigParser;
    /**
     *
     */
    var DataParser = /** @class */ (function (_super) {
        __extends(DataParser, _super);
        function DataParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        DataParser.prototype.parse = function (data) {
            return data;
        };
        return DataParser;
    }(AbstractParser));
    Response.DataParser = DataParser;
    /**
     *
     */
    var DataListParser = /** @class */ (function (_super) {
        __extends(DataListParser, _super);
        function DataListParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        DataListParser.prototype.parse = function (data) {
            return data;
        };
        return DataListParser;
    }(AbstractParser));
    Response.DataListParser = DataListParser;
    /**
     *
     */
    var InfoTemplateParser = /** @class */ (function (_super) {
        __extends(InfoTemplateParser, _super);
        function InfoTemplateParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        InfoTemplateParser.prototype.parse = function (data) {
            return data;
        };
        return InfoTemplateParser;
    }(AbstractParser));
    Response.InfoTemplateParser = InfoTemplateParser;
    /**
     *
     */
    var HelpParser = /** @class */ (function (_super) {
        __extends(HelpParser, _super);
        function HelpParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        HelpParser.prototype.parse = function (data) {
            return data;
        };
        return HelpParser;
    }(AbstractParser));
    Response.HelpParser = HelpParser;
    /**
     *
     */
    var GLParser = /** @class */ (function (_super) {
        __extends(GLParser, _super);
        function GLParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        GLParser.prototype.parse = function (data) {
            return data;
        };
        return GLParser;
    }(AbstractParser));
    Response.GLParser = GLParser;
    /**
     *
     */
    var InfoDelayParser = /** @class */ (function (_super) {
        __extends(InfoDelayParser, _super);
        function InfoDelayParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        InfoDelayParser.prototype.parse = function (data) {
            return data;
        };
        return InfoDelayParser;
    }(AbstractParser));
    Response.InfoDelayParser = InfoDelayParser;
    /**
     *
     */
    var InfoParser = /** @class */ (function (_super) {
        __extends(InfoParser, _super);
        function InfoParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        InfoParser.prototype.parse = function (data) {
            return data;
        };
        return InfoParser;
    }(AbstractParser));
    Response.InfoParser = InfoParser;
    /**
     *
     */
    var InfoThreadsParser = /** @class */ (function (_super) {
        __extends(InfoThreadsParser, _super);
        function InfoThreadsParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        InfoThreadsParser.prototype.parse = function (data) {
            return data;
        };
        return InfoThreadsParser;
    }(AbstractParser));
    Response.InfoThreadsParser = InfoThreadsParser;
    /**
     *
     */
    var ThumbnailParser = /** @class */ (function (_super) {
        __extends(ThumbnailParser, _super);
        function ThumbnailParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        ThumbnailParser.prototype.parse = function (data) {
            return "data:image/png;base64," + data;
        };
        return ThumbnailParser;
    }(AbstractParser));
    Response.ThumbnailParser = ThumbnailParser;
    /**
     *
     */
    var VersionParser = /** @class */ (function (_super) {
        __extends(VersionParser, _super);
        function VersionParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        VersionParser.prototype.parse = function (data) {
            return data;
        };
        return VersionParser;
    }(AbstractParser));
    Response.VersionParser = VersionParser;
    /**
     *
     */
    var ContentParser = /** @class */ (function (_super) {
        __extends(ContentParser, _super);
        function ContentParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ContentParser.parseTimeString = function (timeDateString) {
            timeDateString = timeDateString.replace(/[tT]/g, '');
            var year = parseInt(timeDateString.slice(0, 4), 10);
            var month = parseInt(timeDateString.slice(4, 6), 10);
            var date = parseInt(timeDateString.slice(6, 8), 10);
            var hours = parseInt(timeDateString.slice(8, 10), 10);
            var minutes = parseInt(timeDateString.slice(10, 12), 10);
            var seconds = parseInt(timeDateString.slice(12, 14), 10);
            return new Date(year, month, date, hours, minutes, seconds).getTime();
        };
        /**
         *
         */
        ContentParser.prototype.parse = function (data) {
            return data.map(function (i) {
                var components = i.match(/\"([\s\S]*)\" +([\s\S]*)/);
                if (components === null) {
                    return null;
                }
                var name = components[1].replace(/\\/g, '/');
                var typeData = components[2].split(/\s+/);
                // is font
                if (typeData.length === 1) {
                    return { name: name,
                        type: 'font',
                        fileName: typeData[0].replace(/\"/g, '')
                    };
                }
                // is 2.1.0 template
                if (typeData.length === 3) {
                    return { name: name,
                        type: 'template',
                        size: parseInt(typeData[0], 10),
                        changed: ContentParser.parseTimeString(typeData[1]),
                        format: typeData[2]
                    };
                }
                // is 2.0.7 template
                if (typeData.length === 2) {
                    return { name: name,
                        type: 'template',
                        size: parseInt(typeData[0], 10),
                        changed: ContentParser.parseTimeString(typeData[1])
                    };
                }
                // is media
                var frames = parseInt(typeData[3], 10);
                var frameRate = 0;
                var duration = 0;
                var frameTimeSegments = typeData[4].split('/');
                if (frameTimeSegments[0] !== '0') {
                    frameRate = +(parseInt(frameTimeSegments[1], 10) / parseInt(frameTimeSegments[0], 10)).toFixed(2);
                    duration = Math.round((frames / frameRate) * 100) / 100;
                }
                return { name: name,
                    type: typeData[0].toLowerCase() === 'movie' ? 'video' : typeData[0].toLowerCase() === 'still' ? 'image' : typeData[0].toLowerCase(),
                    size: parseInt(typeData[1], 10),
                    changed: ContentParser.parseTimeString(typeData[2]),
                    frames: frames,
                    frameTime: typeData[4],
                    frameRate: frameRate,
                    duration: duration
                };
            });
        };
        return ContentParser;
    }(AbstractParser));
    Response.ContentParser = ContentParser;
    /**
     *
     */
    var ThumbnailListParser = /** @class */ (function (_super) {
        __extends(ThumbnailListParser, _super);
        function ThumbnailListParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        ThumbnailListParser.prototype.parse = function (data) {
            return data.map(function (i) {
                var components = i.match(/\"([\s\S]*)\" +([\s\S]*)/);
                if (components === null) {
                    return null;
                }
                var name = components[1].replace(/\\/g, '/');
                var typeData = components[2].split(/\s+/);
                return {
                    name: name,
                    type: 'thumbnail',
                    changed: ContentParser.parseTimeString(typeData[0]),
                    size: parseInt(typeData[1], 10)
                };
            });
        };
        return ThumbnailListParser;
    }(AbstractParser));
    Response.ThumbnailListParser = ThumbnailListParser;
    /**
     *
     */
    var CinfParser = /** @class */ (function (_super) {
        __extends(CinfParser, _super);
        function CinfParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        CinfParser.prototype.parse = function (data) {
            if (data && Array.isArray(data)) {
                var components = data[0].match(/\"([\s\S]*)\" +([\s\S]*)/);
                if (components === null) {
                    return {};
                }
                // let name: string = components[1].replace(/\\/g, "/");
                var typeData = components[2].split(/\s+/);
                return { size: parseInt(typeData[1], 10), changed: typeData[2], duration: parseInt(typeData[3], 10), fps: typeData[4] };
            }
            return {};
        };
        return CinfParser;
    }(AbstractParser));
    Response.CinfParser = CinfParser;
    /**
     *
     */
    var InfoQueuesParser = /** @class */ (function (_super) {
        __extends(InfoQueuesParser, _super);
        function InfoQueuesParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        InfoQueuesParser.prototype.parse = function (data) {
            return data;
        };
        return InfoQueuesParser;
    }(AbstractParser));
    Response.InfoQueuesParser = InfoQueuesParser;
    /**
     *
     */
    var InfoServerParser = /** @class */ (function (_super) {
        __extends(InfoServerParser, _super);
        function InfoServerParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        InfoServerParser.prototype.parse = function (data) {
            return data;
        };
        return InfoServerParser;
    }(AbstractParser));
    Response.InfoServerParser = InfoServerParser;
    /**
     *
     */
    var InfoPathsParser = /** @class */ (function (_super) {
        __extends(InfoPathsParser, _super);
        function InfoPathsParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        InfoPathsParser.prototype.parse = function (data) {
            var paths = new CasparCGPaths();
            if (data.hasOwnProperty('initial-path')) {
                paths.root = data['initial-path'];
            }
            if (data.hasOwnProperty('media-path')) {
                paths.media = data['media-path'];
            }
            if (data.hasOwnProperty('data-path')) {
                paths.data = data['data-path'];
            }
            if (data.hasOwnProperty('log-path')) {
                paths.log = data['log-path'];
            }
            if (data.hasOwnProperty('template-path')) {
                paths.template = data['template-path'];
            }
            if (data.hasOwnProperty('thumbnails-path')) {
                paths.thumbnail = data['thumbnails-path'];
            }
            if (data.hasOwnProperty('thumbnail-path')) {
                paths.thumbnail = data['thumbnail-path'];
            }
            if (data.hasOwnProperty('font-path')) {
                paths.font = data['font-path'];
            }
            return paths;
        };
        return InfoPathsParser;
    }(AbstractParser));
    Response.InfoPathsParser = InfoPathsParser;
    /**
     *
     */
    var InfoSystemParser = /** @class */ (function (_super) {
        __extends(InfoSystemParser, _super);
        function InfoSystemParser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        InfoSystemParser.prototype.parse = function (data) {
            // wrap devices in arrays (if single device of a type)
            if (data.hasOwnProperty('decklink') && data['decklink'].hasOwnProperty('device')) {
                if (!Array.isArray(data['decklink']['device'])) {
                    data['decklink']['device'] = [data['decklink']['device']];
                }
            }
            if (data.hasOwnProperty('bluefish') && data['bluefish'].hasOwnProperty('device')) {
                if (!Array.isArray(data['bluefish']['device'])) {
                    data['bluefish']['device'] = [data['bluefish']['device']];
                }
            }
            return data;
        };
        return InfoSystemParser;
    }(AbstractParser));
    Response.InfoSystemParser = InfoSystemParser;
})(Response = exports.Response || (exports.Response = {}));
