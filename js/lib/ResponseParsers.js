"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Path = require("path");
var AMCPConnectionOptions_1 = require("./AMCPConnectionOptions");
// Options NS
var ServerVersion = AMCPConnectionOptions_1.Options.ServerVersion;
// config NS
var Config_1 = require("./Config");
var CasparCGConfig = Config_1.Config.Intermediate.CasparCGConfig;
var Response;
(function (Response) {
    /** */
    var CasparCGPaths = (function () {
        function CasparCGPaths() {
        }
        Object.defineProperty(CasparCGPaths.prototype, "thumbnails", {
            /** */
            get: function () {
                return this.thumbnail;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteMedia", {
            /** */
            get: function () {
                return this.absolutePath(this.media);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteData", {
            /** */
            get: function () {
                return this.absolutePath(this.data);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteLog", {
            /** */
            get: function () {
                return this.absolutePath(this.log);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteTemplate", {
            /** */
            get: function () {
                return this.absolutePath(this.template);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteThumbnail", {
            /** */
            get: function () {
                return this.absolutePath(this.thumbnail);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteThumbnails", {
            /** */
            get: function () {
                return this.absolutePath(this.thumbnails);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CasparCGPaths.prototype, "absoluteFont", {
            /** */
            get: function () {
                return this.font ? this.absolutePath(this.font) : undefined;
            },
            enumerable: true,
            configurable: true
        });
        /** */
        CasparCGPaths.prototype.absolutePath = function (relativeOrAbsolutePath) {
            if (relativeOrAbsolutePath.match(/\:\\|\:\//)) {
                return CasparCGPaths.ensureTrailingSlash(relativeOrAbsolutePath);
            }
            return CasparCGPaths.ensureTrailingSlash(Path.join(this.root, relativeOrAbsolutePath));
        };
        /** */
        CasparCGPaths.ensureTrailingSlash = function (path) {
            return ((path.slice(-1) === "/" || path.slice(-1) === "\\") ? path : path + "/");
        };
        return CasparCGPaths;
    }());
    Response.CasparCGPaths = CasparCGPaths;
    /**
     *
     */
    var AbstractParser = (function () {
        function AbstractParser() {
        }
        return AbstractParser;
    }());
    Response.AbstractParser = AbstractParser;
    /**
     *
     */
    var ChannelParser = (function (_super) {
        __extends(ChannelParser, _super);
        function ChannelParser() {
            return _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        ChannelParser.prototype.parse = function (data) {
            var result = [];
            var components = data.toString().split(/\s|,/);
            while (components.length > 0) {
                result.push({ channel: components.shift(), format: components.shift(), status: components.shift() });
            }
            if (result.length > 0) {
                return result;
            }
            return {};
        };
        return ChannelParser;
    }(AbstractParser));
    Response.ChannelParser = ChannelParser;
    /** */
    var ConfigParser = (function (_super) {
        __extends(ConfigParser, _super);
        function ConfigParser() {
            return _super.apply(this, arguments) || this;
        }
        /** */
        ConfigParser.prototype.parse = function (data) {
            var serverVersion;
            if (this.context && this.context.hasOwnProperty("serverVersion") && this.context["serverVersion"] > ServerVersion.V21x) {
                serverVersion = ServerVersion.V210;
            }
            else {
                serverVersion = ServerVersion.V207;
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
    var DataParser = (function (_super) {
        __extends(DataParser, _super);
        function DataParser() {
            return _super.apply(this, arguments) || this;
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
    var DataListParser = (function (_super) {
        __extends(DataListParser, _super);
        function DataListParser() {
            return _super.apply(this, arguments) || this;
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
    var InfoTemplateParser = (function (_super) {
        __extends(InfoTemplateParser, _super);
        function InfoTemplateParser() {
            return _super.apply(this, arguments) || this;
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
    var HelpParser = (function (_super) {
        __extends(HelpParser, _super);
        function HelpParser() {
            return _super.apply(this, arguments) || this;
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
    var GLParser = (function (_super) {
        __extends(GLParser, _super);
        function GLParser() {
            return _super.apply(this, arguments) || this;
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
    var InfoDelayParser = (function (_super) {
        __extends(InfoDelayParser, _super);
        function InfoDelayParser() {
            return _super.apply(this, arguments) || this;
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
    var InfoParser = (function (_super) {
        __extends(InfoParser, _super);
        function InfoParser() {
            return _super.apply(this, arguments) || this;
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
    var InfoThreadsParser = (function (_super) {
        __extends(InfoThreadsParser, _super);
        function InfoThreadsParser() {
            return _super.apply(this, arguments) || this;
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
    var ThumbnailParser = (function (_super) {
        __extends(ThumbnailParser, _super);
        function ThumbnailParser() {
            return _super.apply(this, arguments) || this;
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
    var VersionParser = (function (_super) {
        __extends(VersionParser, _super);
        function VersionParser() {
            return _super.apply(this, arguments) || this;
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
    var ContentParser = (function (_super) {
        __extends(ContentParser, _super);
        function ContentParser() {
            return _super.apply(this, arguments) || this;
        }
        ContentParser.parseTimeString = function (timeDateString) {
            timeDateString = timeDateString.replace(/[tT]/g, "");
            var year = parseInt(timeDateString.slice(0, 4));
            var month = parseInt(timeDateString.slice(4, 6));
            var date = parseInt(timeDateString.slice(6, 8));
            var hours = parseInt(timeDateString.slice(8, 10));
            var minutes = parseInt(timeDateString.slice(10, 12));
            var seconds = parseInt(timeDateString.slice(12, 14));
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
                var name = components[1].replace(/\\/g, "/");
                var typeData = components[2].split(/\s+/);
                // is font
                if (typeData.length === 1) {
                    return { name: name,
                        type: "font",
                        fileName: typeData[0].replace(/\"/g, "")
                    };
                }
                // is template
                if (typeData.length === 3) {
                    return { name: name,
                        type: "template",
                        size: parseInt(typeData[0]),
                        changed: ContentParser.parseTimeString(typeData[1]),
                        format: typeData[2]
                    };
                }
                // is thumbnail
                if (typeData.length === 2) {
                    return { name: name,
                        type: "thumbnail",
                        changed: ContentParser.parseTimeString(typeData[0]),
                        size: parseInt(typeData[1]),
                    };
                }
                // is media
                var frames = parseInt(typeData[3]);
                var frameRate = 0;
                var duration = 0;
                var frameTimeSegments = typeData[4].split("/");
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
        };
        return ContentParser;
    }(AbstractParser));
    Response.ContentParser = ContentParser;
    /**
     *
     */
    var CinfParser = (function (_super) {
        __extends(CinfParser, _super);
        function CinfParser() {
            return _super.apply(this, arguments) || this;
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
                return { size: parseInt(typeData[1]), changed: typeData[2], duration: parseInt(typeData[3]), fps: typeData[4] };
            }
            return {};
        };
        return CinfParser;
    }(AbstractParser));
    Response.CinfParser = CinfParser;
    /**
     *
     */
    var InfoQueuesParser = (function (_super) {
        __extends(InfoQueuesParser, _super);
        function InfoQueuesParser() {
            return _super.apply(this, arguments) || this;
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
    var InfoServerParser = (function (_super) {
        __extends(InfoServerParser, _super);
        function InfoServerParser() {
            return _super.apply(this, arguments) || this;
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
    var InfoPathsParser = (function (_super) {
        __extends(InfoPathsParser, _super);
        function InfoPathsParser() {
            return _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        InfoPathsParser.prototype.parse = function (data) {
            var paths = new CasparCGPaths();
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
        };
        return InfoPathsParser;
    }(AbstractParser));
    Response.InfoPathsParser = InfoPathsParser;
    /**
     *
     */
    var InfoSystemParser = (function (_super) {
        __extends(InfoSystemParser, _super);
        function InfoSystemParser() {
            return _super.apply(this, arguments) || this;
        }
        /**
         *
         */
        InfoSystemParser.prototype.parse = function (data) {
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
        };
        return InfoSystemParser;
    }(AbstractParser));
    Response.InfoSystemParser = InfoSystemParser;
})(Response = exports.Response || (exports.Response = {}));
