"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// ResponseNS
var ResponseSignature_1 = require("./ResponseSignature");
var ResponseSignature = ResponseSignature_1.Response.ResponseSignature;
// Validation ND
var ParamValidators_1 = require("./ParamValidators");
var PositiveNumberValidatorBetween = ParamValidators_1.Validation.PositiveNumberRoundValidatorBetween;
/**
 *
 */
var Command;
(function (Command) {
    /**
     *
     */
    var AMCPResponse = (function () {
        function AMCPResponse() {
        }
        AMCPResponse.prototype.toString = function () {
            if (typeof this.raw === "string") {
                return this.raw.replace(/\r?\n|\r/gi, "");
            }
            return "";
        };
        return AMCPResponse;
    }());
    Command.AMCPResponse = AMCPResponse;
    /**
     *
     */
    var IAMCPStatus;
    (function (IAMCPStatus) {
        IAMCPStatus[IAMCPStatus["Invalid"] = -1] = "Invalid";
        IAMCPStatus[IAMCPStatus["New"] = 0] = "New";
        IAMCPStatus[IAMCPStatus["Initialized"] = 1] = "Initialized";
        IAMCPStatus[IAMCPStatus["Queued"] = 2] = "Queued";
        IAMCPStatus[IAMCPStatus["Sent"] = 3] = "Sent";
        IAMCPStatus[IAMCPStatus["Suceeded"] = 4] = "Suceeded";
        IAMCPStatus[IAMCPStatus["Failed"] = 5] = "Failed";
        IAMCPStatus[IAMCPStatus["Timeout"] = 6] = "Timeout";
    })(IAMCPStatus = Command.IAMCPStatus || (Command.IAMCPStatus = {}));
    /**
     *
     */
    function isIAMCPCommand(object) {
        // @todo: better inheritance type checking
        for (var prop in AbstractCommand.prototype) {
            if (object[prop] === undefined) {
                return false;
            }
        }
        return true;
    }
    Command.isIAMCPCommand = isIAMCPCommand;
    /**
     *
     */
    var AbstractCommand = (function () {
        // @todo: add concept of "variants", adding an ENUM to variants of the same (query) verb-command. INFO x INFO y, but not Thumbnail Retriece and thumbnail generate, different verbs
        // not LOG (action, not query)
        // INFO, HELP
        // @todo:
        // channel vs layer-specific vs layer-fallback addresses
        // NB.: INFO BOTH LAYER AND CHANNEL!!!!!!!!
        // INFO, SWAP, REMOVE, MIXER CLEAR, CLEAR, 
        // param getter/setters
        // param list (dynamic)
        // media info/template file-type to generate param data for fields
        /**
         *
         */
        function AbstractCommand(params, context) {
            this.context = context;
            this.response = new AMCPResponse();
            this.responseProtocol = new ResponseSignature();
            this._status = IAMCPStatus.New;
            this._payload = {};
            // parse params to objects
            var paramsArray = [];
            // conform params to array
            if (Array.isArray(params)) {
                paramsArray = params;
            }
            else {
                paramsArray = [params];
            }
            this._stringParamsArray = [];
            this._objectParams = {};
            for (var _i = 0, paramsArray_1 = paramsArray; _i < paramsArray_1.length; _i++) {
                var element = paramsArray_1[_i];
                if (element === undefined) {
                    continue;
                }
                if (typeof element === "string") {
                    element = element.toString().trim();
                    this._stringParamsArray = this._stringParamsArray.concat(element.toString().split(/\s+/).slice()); // @todo: string delimiter pairing (,;) -> objectArray
                }
                else if (typeof element === "object") {
                    for (var prop in element) {
                        this._objectParams[prop] = element[prop];
                    }
                }
            }
        }
        /**
         *
         */
        AbstractCommand.prototype.validateParams = function () {
            var _this = this;
            var required = this.paramProtocol ? this.paramProtocol.filter(function (signature) { return signature.required.valueOf() === true; }) : [];
            var optional = this.paramProtocol ? this.paramProtocol.filter(function (signature) { return signature.required.valueOf() === false; }) : [];
            // check all required
            for (var _i = 0, required_1 = required; _i < required_1.length; _i++) {
                var signature = required_1[_i];
                if (!this.validateParam(signature)) {
                    return false;
                }
            }
            // add valid optionals
            optional.forEach(function (signature) {
                _this.validateParam(signature);
            });
            if (!this.validateProtocolLogic()) {
                return false;
            }
            var validParams = this.paramProtocol ? this.paramProtocol.filter(function (param) { return param.resolved && param.payload !== null; }) : [];
            var invalidParams = this.paramProtocol ? this.paramProtocol.filter(function (param) { return param.resolved && param.payload === null && param.required.valueOf() === true; }) : [];
            if (invalidParams.length > 0) {
                return false;
            }
            validParams.forEach(function (param) {
                var payload = { key: "", value: {} };
                payload.key = param.key || "";
                payload.value = param.payload !== undefined && param.payload !== null && param.payload !== false ? param.payload : {};
                _this.payload[param.name] = payload;
            });
            return true;
        };
        /**
         *
         */
        AbstractCommand.prototype.validateParam = function (signature) {
            var result;
            var param;
            // objectParams parsing
            if (this._objectParams.hasOwnProperty(signature.name)) {
                param = this._objectParams[signature.name];
            }
            else {
                // stringParam parsing	
                if (this._stringParamsArray.length > 0) {
                    param = this._stringParamsArray;
                }
                else {
                    return false;
                }
            }
            // filter out undefined object params
            if (param === undefined) {
                return false;
            }
            if ((result = signature.validation.resolve(param, (signature.key || signature.name))) !== false) {
                signature.validation.resolved = true;
                signature.payload = result;
                return true;
            }
            else {
                return false;
            }
        };
        /**
         *
         */
        AbstractCommand.prototype.validateProtocolLogic = function () {
            if (!this.protocolLogic) {
                return true;
            }
            var result;
            for (var _i = 0, _a = this.protocolLogic; _i < _a.length; _i++) {
                var rule = _a[_i];
                if ((result = rule.resolve(this.paramProtocol)) !== null) {
                    this.paramProtocol = result;
                }
                else {
                    return false;
                }
            }
            return true;
        };
        /**
         *
         */
        AbstractCommand.prototype.validateResponse = function (response) {
            // code is correct
            if (response.statusCode !== this.responseProtocol.code) {
                // @todo: fallbacks? multiple valid codes?
                return false;
            }
            // data is valid
            var validData = {};
            if (this.responseProtocol.validator) {
                var validator = Object.create(this.responseProtocol.validator["prototype"]);
                if ((validData = validator.resolve(response)) === false) {
                    return false;
                }
            }
            // data gets parsed
            if (this.responseProtocol.parser && validData) {
                var parser = Object.create(this.responseProtocol.parser["prototype"]);
                parser.context = this.context;
                if ((validData = parser.parse(validData)) === false) {
                    return false;
                }
            }
            this.response.raw = response.responseString;
            this.response.code = response.statusCode;
            this.response.data = validData;
            return true;
        };
        Object.defineProperty(AbstractCommand.prototype, "payload", {
            /**
             *
             */
            get: function () {
                return this._payload;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractCommand.prototype, "id", {
            /**
             *
             */
            get: function () {
                return this._id || (new Date().getTime() + Math.random() * 100).toString();
            },
            enumerable: true,
            configurable: true
        });
        /**
         *
         */
        AbstractCommand.prototype.validateChannel = function () {
            var result;
            var validator = new PositiveNumberValidatorBetween(1, 9999);
            var param;
            if (this._objectParams.hasOwnProperty("channel")) {
                param = this._objectParams["channel"];
            }
            else {
                param = NaN;
            }
            if ((result = validator.resolve(param)) !== false) {
                return Number(result);
            }
            // @todo: dispatch error
            return NaN;
        };
        /**
         *
         */
        AbstractCommand.prototype.validateLayer = function (fallback) {
            var result;
            var validator = new PositiveNumberValidatorBetween(0, 9999);
            var param;
            if (this._objectParams.hasOwnProperty("layer")) {
                param = this._objectParams["layer"];
            }
            else {
                param = fallback;
            }
            if ((result = validator.resolve(param)) !== false) {
                return Number(result);
            }
            // @todo: dispatch error
            return 0;
        };
        Object.defineProperty(AbstractCommand.prototype, "protocolLogic", {
            /**
             *
             */
            get: function () {
                return this.constructor["protocolLogic"] || [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractCommand.prototype, "channel", {
            /**
             *
             */
            get: function () {
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractCommand.prototype, "layer", {
            /**
             *
             */
            get: function () {
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractCommand.prototype, "address", {
            /**
             *
             */
            get: function () {
                return "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractCommand.prototype, "status", {
            /**
             *
             */
            get: function () {
                return this._status;
            },
            /**
             *
             */
            set: function (code) {
                if (code !== this._status) {
                    this._status = code;
                    if (this.onStatusChanged) {
                        this.onStatusChanged(this._status);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         *
         */
        AbstractCommand.prototype.serialize = function () {
            return {
                channel: this.channel,
                layer: this.layer,
                payload: this.payload,
                response: this.response,
                status: this.status,
                _commandName: this.constructor["name"],
                _objectParams: this._objectParams,
                _stringParamsArray: this._stringParamsArray
            };
        };
        /**
         *
         */
        AbstractCommand.prototype.populate = function (cmdVO, id) {
            this._stringParamsArray = cmdVO._stringParamsArray;
            this._objectParams = cmdVO._objectParams;
            this.response = cmdVO.response;
            this._id = id;
        };
        /**
         *
         */
        AbstractCommand.prototype.toString = function () {
            var message = "";
            switch (this.status) {
                case IAMCPStatus.Invalid:
                    message = "Invalid command";
                    break;
                case IAMCPStatus.New:
                    message = "New command";
                    break;
                case IAMCPStatus.Queued:
                    message = "Queued command";
                    break;
                case IAMCPStatus.Sent:
                    message = "Sent command";
                    break;
                case IAMCPStatus.Suceeded:
                    message = "Succeeded command";
                    break;
                case IAMCPStatus.Failed:
                    message = "Failed command";
                    break;
            }
            return message;
        };
        return AbstractCommand;
    }());
    Command.AbstractCommand = AbstractCommand;
    /**
     *
     */
    var AbstractOrChannelOrLayerCommand = (function (_super) {
        __extends(AbstractOrChannelOrLayerCommand, _super);
        /**
         *
         */
        function AbstractOrChannelOrLayerCommand(params, context) {
            var _this = _super.call(this, params, context) || this;
            var channel = _this.validateChannel();
            var layer = _this.validateLayer();
            if (channel) {
                _this._channel = channel;
                if (layer) {
                    _this._layer = layer;
                }
            }
            return _this;
        }
        Object.defineProperty(AbstractOrChannelOrLayerCommand.prototype, "channel", {
            /**
             *
             */
            get: function () {
                return this._channel || -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractOrChannelOrLayerCommand.prototype, "layer", {
            /**
             *
             */
            get: function () {
                return this._layer || -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractOrChannelOrLayerCommand.prototype, "address", {
            /**
             *
             */
            get: function () {
                var address = "";
                if (this.channel && (this.channel > -1)) {
                    address = this.channel.toString();
                }
                else {
                    return address;
                }
                if (this.layer && (this.layer > -1)) {
                    address = address + "-" + this.layer;
                }
                return address;
            },
            enumerable: true,
            configurable: true
        });
        return AbstractOrChannelOrLayerCommand;
    }(AbstractCommand));
    Command.AbstractOrChannelOrLayerCommand = AbstractOrChannelOrLayerCommand;
    /**
     *
     */
    var AbstractChannelCommand = (function (_super) {
        __extends(AbstractChannelCommand, _super);
        /**
         *
         */
        function AbstractChannelCommand(params, context) {
            var _this = _super.call(this, params, context) || this;
            var channel = _this.validateChannel();
            if (channel) {
                _this._channel = channel;
                _this._layer = -1;
            }
            else {
                throw new Error("Needs channel"); // @todo: dispatch
            }
            return _this;
        }
        Object.defineProperty(AbstractChannelCommand.prototype, "channel", {
            /**
             *
             */
            get: function () {
                return this._channel || -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractChannelCommand.prototype, "layer", {
            /**
             *
             */
            get: function () {
                return -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractChannelCommand.prototype, "address", {
            /**
             *
             */
            get: function () {
                if (this.channel) {
                    return this.channel.toString();
                }
                else {
                    return "";
                }
            },
            enumerable: true,
            configurable: true
        });
        return AbstractChannelCommand;
    }(AbstractCommand));
    Command.AbstractChannelCommand = AbstractChannelCommand;
    /**
     *
     */
    var AbstractLayerCommand = (function (_super) {
        __extends(AbstractLayerCommand, _super);
        /**
         *
         */
        function AbstractLayerCommand(params, context) {
            var _this = _super.call(this, params, context) || this;
            var channel = _this.validateChannel();
            var layer = _this.validateLayer();
            if (channel && layer) {
                _this._channel = channel;
                _this._layer = layer;
            }
            else {
                throw new Error("Needs both channel and layer"); // @todo: dispatch
            }
            return _this;
        }
        Object.defineProperty(AbstractLayerCommand.prototype, "channel", {
            /**
             *
             */
            get: function () {
                return this._channel || -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractLayerCommand.prototype, "layer", {
            /**
             *
             */
            get: function () {
                return this._layer || -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractLayerCommand.prototype, "address", {
            /**
             *
             */
            get: function () {
                var address;
                if (this.channel && (this.channel > -1)) {
                    address = this.channel.toString();
                }
                else {
                    return "";
                }
                if (this.layer && (this.layer > -1)) {
                    address = address + "-" + this.layer;
                }
                else {
                    return "";
                }
                return address;
            },
            enumerable: true,
            configurable: true
        });
        return AbstractLayerCommand;
    }(AbstractCommand));
    Command.AbstractLayerCommand = AbstractLayerCommand;
    /**
     *
     */
    var AbstractChannelOrLayerCommand = (function (_super) {
        __extends(AbstractChannelOrLayerCommand, _super);
        /**
         *
         */
        function AbstractChannelOrLayerCommand(params, context) {
            var _this = _super.call(this, params, context) || this;
            var channel = _this.validateChannel();
            var layer = _this.validateLayer();
            if (channel) {
                _this._channel = channel;
                if (layer) {
                    _this._layer = layer;
                }
            }
            else {
                throw new Error("Needs at least channel"); // @todo: dispatch
            }
            return _this;
        }
        Object.defineProperty(AbstractChannelOrLayerCommand.prototype, "channel", {
            /**
             *
             */
            get: function () {
                return this._channel || -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractChannelOrLayerCommand.prototype, "layer", {
            /**
             *
             */
            get: function () {
                return this._layer || -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractChannelOrLayerCommand.prototype, "address", {
            /**
             *
             */
            get: function () {
                var address;
                if (this.channel) {
                    address = this.channel.toString();
                }
                else {
                    return "";
                }
                if (this.layer && (this.layer > -1)) {
                    address = address + "-" + this.layer;
                }
                return address;
            },
            enumerable: true,
            configurable: true
        });
        return AbstractChannelOrLayerCommand;
    }(AbstractCommand));
    Command.AbstractChannelOrLayerCommand = AbstractChannelOrLayerCommand;
    /**
     *
     */
    var AbstractLayerWithFallbackCommand = (function (_super) {
        __extends(AbstractLayerWithFallbackCommand, _super);
        /**
         *
         */
        function AbstractLayerWithFallbackCommand(params, context) {
            var _this = _super.call(this, params, context) || this;
            var channel = _this.validateChannel();
            var layer = _this.validateLayer(0);
            if (channel) {
                _this._channel = channel;
                _this._layer = layer;
            }
            else {
                throw new Error("Needs at least channel, layer will default to 0 if not specified"); // @todo: dispatch
            }
            return _this;
        }
        Object.defineProperty(AbstractLayerWithFallbackCommand.prototype, "channel", {
            /**
             *
             */
            get: function () {
                return this._channel || -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractLayerWithFallbackCommand.prototype, "layer", {
            /**
             *
             */
            get: function () {
                return this._layer || -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractLayerWithFallbackCommand.prototype, "address", {
            /**
             *
             */
            get: function () {
                var address;
                if (this.channel) {
                    address = this.channel.toString();
                }
                else {
                    return "";
                }
                if (this.layer && (this.layer > -1)) {
                    address = address + "-" + this.layer;
                }
                return address;
            },
            enumerable: true,
            configurable: true
        });
        return AbstractLayerWithFallbackCommand;
    }(AbstractCommand));
    Command.AbstractLayerWithFallbackCommand = AbstractLayerWithFallbackCommand;
    /**
     *
     */
    var AbstractLayerWithCgFallbackCommand = (function (_super) {
        __extends(AbstractLayerWithCgFallbackCommand, _super);
        /**
         *
         */
        function AbstractLayerWithCgFallbackCommand(params, context) {
            var _this = _super.call(this, params, context) || this;
            var channel = _this.validateChannel();
            var layer = _this.validateLayer(9999);
            if (channel) {
                _this._channel = channel;
                _this._layer = layer;
            }
            else {
                throw new Error("Needs at least channel, layer will default to 9999 if not specified"); // @todo: dispatch
            }
            return _this;
        }
        Object.defineProperty(AbstractLayerWithCgFallbackCommand.prototype, "channel", {
            /**
             *
             */
            get: function () {
                return this._channel || -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractLayerWithCgFallbackCommand.prototype, "layer", {
            /**
             *
             */
            get: function () {
                return this._layer || -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AbstractLayerWithCgFallbackCommand.prototype, "address", {
            /**
             *
             */
            get: function () {
                var address;
                if (this.channel) {
                    address = this.channel.toString();
                }
                else {
                    return "";
                }
                if (this.layer && (this.layer > -1)) {
                    address = address + "-" + this.layer;
                }
                return address;
            },
            enumerable: true,
            configurable: true
        });
        return AbstractLayerWithCgFallbackCommand;
    }(AbstractCommand));
    Command.AbstractLayerWithCgFallbackCommand = AbstractLayerWithCgFallbackCommand;
})(Command = exports.Command || (exports.Command = {}));
