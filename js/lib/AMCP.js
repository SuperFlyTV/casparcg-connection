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
var ServerStateEnum_1 = require("./ServerStateEnum");
// ResponseNS
var ResponseSignature_1 = require("./ResponseSignature");
var ResponseValidators_1 = require("./ResponseValidators");
var ResponseParsers_1 = require("./ResponseParsers");
var ResponseSignature = ResponseSignature_1.Response.ResponseSignature;
// Command NS
var AbstractCommand_1 = require("./AbstractCommand");
var AbstractCommand = AbstractCommand_1.Command.AbstractCommand;
var AbstractOrChannelOrLayerCommand = AbstractCommand_1.Command.AbstractOrChannelOrLayerCommand;
var AbstractChannelCommand = AbstractCommand_1.Command.AbstractChannelCommand;
var AbstractChannelOrLayerCommand = AbstractCommand_1.Command.AbstractChannelOrLayerCommand;
var AbstractLayerWithFallbackCommand = AbstractCommand_1.Command.AbstractLayerWithFallbackCommand;
var AbstractLayerWithCgFallbackCommand = AbstractCommand_1.Command.AbstractLayerWithCgFallbackCommand;
// Param NS
var ParamSignature_1 = require("./ParamSignature");
var required = ParamSignature_1.Param.Required;
var optional = ParamSignature_1.Param.Optional;
var ParamSignature = ParamSignature_1.Param.ParamSignature;
// Validation NS
var ParamValidators_1 = require("./ParamValidators");
// Protocol NS
var ProtocolLogic_1 = require("./ProtocolLogic");
var Depends = ProtocolLogic_1.Protocol.Depends;
var Coupled = ProtocolLogic_1.Protocol.Coupled;
var OneOf = ProtocolLogic_1.Protocol.OneOf;
/**
 * Factory
 */
var AMCPUtil;
(function (AMCPUtil) {
    /**
     *
     */
    function deSerialize(cmd, id) {
        // errror: commandstatus -1 //invalid command
        // @todo: error handling much?????? (callback??????)
        var command = Object.create(AMCP[cmd._commandName]["prototype"]);
        command.constructor.call(command, cmd._objectParams);
        command.populate(cmd, id);
        return command;
    }
    AMCPUtil.deSerialize = deSerialize;
    /**
     *
     */
    var CasparCGSocketResponse = (function () {
        /**
         *
         */
        function CasparCGSocketResponse(responseString) {
            this.items = [];
            this.statusCode = CasparCGSocketResponse.evaluateStatusCode(responseString);
            this.responseString = responseString;
        }
        /**
         *
         */
        CasparCGSocketResponse.evaluateStatusCode = function (responseString) {
            return parseInt(responseString.substr(0, 3), 10);
        };
        return CasparCGSocketResponse;
    }());
    AMCPUtil.CasparCGSocketResponse = CasparCGSocketResponse;
})(AMCPUtil = exports.AMCPUtil || (exports.AMCPUtil = {}));
/**
 * Internal
 */
var AMCP;
(function (AMCP) {
    var CustomCommand = (function (_super) {
        __extends(CustomCommand, _super);
        function CustomCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "command", null, new ParamValidators_1.Validation.StringValidator(false))
            ];
            return _this;
        }
        return CustomCommand;
    }(AbstractCommand));
    CustomCommand.commandString = "";
    AMCP.CustomCommand = CustomCommand;
})(AMCP = exports.AMCP || (exports.AMCP = {}));
/**
 * IVideo
 */
(function (AMCP) {
    /**
     *
     */
    var LoadbgCommand = (function (_super) {
        __extends(LoadbgCommand, _super);
        function LoadbgCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "clip", null, new ParamValidators_1.Validation.ClipNameValidator()),
                new ParamSignature(optional, "loop", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("LOOP")),
                new ParamSignature(optional, "transition", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Direction)),
                new ParamSignature(optional, "seek", "SEEK", new ParamValidators_1.Validation.FrameValidator("SEEK")),
                new ParamSignature(optional, "length", "LENGTH", new ParamValidators_1.Validation.FrameValidator("LENGTH")),
                new ParamSignature(optional, "filter", "FILTER", new ParamValidators_1.Validation.FilterValidator()),
                new ParamSignature(optional, "auto", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("AUTO"))
            ];
            return _this;
        }
        return LoadbgCommand;
    }(AbstractLayerWithFallbackCommand));
    LoadbgCommand.commandString = "LOADBG";
    LoadbgCommand.protocolLogic = [
        new Depends("transitionDuration", "transition"),
        new Depends("transitionEasing", "transition"),
        new Depends("transitionDirection", "transition")
    ];
    AMCP.LoadbgCommand = LoadbgCommand;
    /**
     *
     */
    var LoadCommand = (function (_super) {
        __extends(LoadCommand, _super);
        function LoadCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "clip", null, new ParamValidators_1.Validation.ClipNameValidator),
                new ParamSignature(optional, "loop", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("LOOP")),
                new ParamSignature(optional, "transition", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Direction)),
                new ParamSignature(optional, "seek", "SEEK", new ParamValidators_1.Validation.FrameValidator("SEEK")),
                new ParamSignature(optional, "length", "LENGTH", new ParamValidators_1.Validation.FrameValidator("LENGTH")),
                new ParamSignature(optional, "filter", "FILTER", new ParamValidators_1.Validation.FilterValidator())
            ];
            return _this;
        }
        return LoadCommand;
    }(AbstractLayerWithFallbackCommand));
    LoadCommand.commandString = "LOAD";
    LoadCommand.protocolLogic = [
        new Depends("transitionDuration", "transition"),
        new Depends("transitionEasing", "transition"),
        new Depends("transitionDirection", "transition")
    ];
    AMCP.LoadCommand = LoadCommand;
    /**
     *
     */
    var PlayCommand = (function (_super) {
        __extends(PlayCommand, _super);
        function PlayCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(optional, "clip", null, new ParamValidators_1.Validation.ClipNameValidator),
                new ParamSignature(optional, "loop", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("LOOP")),
                new ParamSignature(optional, "transition", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Direction)),
                new ParamSignature(optional, "seek", "SEEK", new ParamValidators_1.Validation.FrameValidator("SEEK")),
                new ParamSignature(optional, "length", "LENGTH", new ParamValidators_1.Validation.FrameValidator("LENGTH")),
                new ParamSignature(optional, "filter", "FILTER", new ParamValidators_1.Validation.FilterValidator())
            ];
            return _this;
        }
        return PlayCommand;
    }(AbstractLayerWithFallbackCommand));
    PlayCommand.commandString = "PLAY";
    PlayCommand.protocolLogic = [
        new Depends("loop", "clip"),
        new Depends("seek", "clip"),
        new Depends("length", "clip"),
        new Depends("filter", "clip"),
        new Depends("transition", "clip"),
        new Depends("transitionDuration", "clip"),
        new Depends("transitionEasing", "clip"),
        new Depends("transitionDirection", "clip"),
        new Depends("transitionDuration", "transition"),
        new Depends("transitionEasing", "transition"),
        new Depends("transitionDirection", "transition")
    ];
    AMCP.PlayCommand = PlayCommand;
    /**
     *
     */
    var PauseCommand = (function (_super) {
        __extends(PauseCommand, _super);
        function PauseCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PauseCommand;
    }(AbstractLayerWithFallbackCommand));
    PauseCommand.commandString = "PAUSE";
    AMCP.PauseCommand = PauseCommand;
    /**
     *
     */
    var ResumeCommand = (function (_super) {
        __extends(ResumeCommand, _super);
        function ResumeCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ResumeCommand;
    }(AbstractLayerWithFallbackCommand));
    ResumeCommand.commandString = "RESUME";
    AMCP.ResumeCommand = ResumeCommand;
    /**
     *
     */
    var StopCommand = (function (_super) {
        __extends(StopCommand, _super);
        function StopCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return StopCommand;
    }(AbstractLayerWithFallbackCommand));
    StopCommand.commandString = "STOP";
    AMCP.StopCommand = StopCommand;
})(AMCP = exports.AMCP || (exports.AMCP = {}));
/**
 * IInputOutput
 */
(function (AMCP) {
    /**
     *
     */
    var LoadDecklinkBgCommand = (function (_super) {
        __extends(LoadDecklinkBgCommand, _super);
        function LoadDecklinkBgCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "device", "DECKLINK DEVICE", new ParamValidators_1.Validation.DecklinkDeviceValidator()),
                new ParamSignature(optional, "transition", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Direction)),
                new ParamSignature(optional, "length", "LENGTH", new ParamValidators_1.Validation.FrameValidator("LENGTH")),
                new ParamSignature(optional, "filter", "FILTER", new ParamValidators_1.Validation.FilterValidator()),
                new ParamSignature(optional, "format", "FORMAT", new ParamValidators_1.Validation.ChannelFormatValidator()),
                new ParamSignature(optional, "channelLayout", "CHANNEL_LAYOUT", new ParamValidators_1.Validation.ChannelLayoutValidator()),
                new ParamSignature(optional, "auto", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("AUTO"))
            ];
            return _this;
        }
        return LoadDecklinkBgCommand;
    }(AbstractLayerWithFallbackCommand));
    LoadDecklinkBgCommand.commandString = "LOADBG";
    LoadDecklinkBgCommand.protocolLogic = [
        new Depends("transitionDuration", "transition"),
        new Depends("transitionEasing", "transition"),
        new Depends("transitionDirection", "transition")
    ];
    AMCP.LoadDecklinkBgCommand = LoadDecklinkBgCommand;
    /**
     *
     */
    var LoadDecklinkCommand = (function (_super) {
        __extends(LoadDecklinkCommand, _super);
        function LoadDecklinkCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "device", "DECKLINK DEVICE", new ParamValidators_1.Validation.DecklinkDeviceValidator()),
                new ParamSignature(optional, "transition", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Direction)),
                new ParamSignature(optional, "length", "LENGTH", new ParamValidators_1.Validation.FrameValidator("LENGTH")),
                new ParamSignature(optional, "filter", "FILTER", new ParamValidators_1.Validation.FilterValidator()),
                new ParamSignature(optional, "format", "FORMAT", new ParamValidators_1.Validation.ChannelFormatValidator()),
                new ParamSignature(optional, "channelLayout", "CHANNEL_LAYOUT", new ParamValidators_1.Validation.ChannelLayoutValidator())
            ];
            return _this;
        }
        return LoadDecklinkCommand;
    }(AbstractLayerWithFallbackCommand));
    LoadDecklinkCommand.commandString = "LOAD";
    LoadDecklinkCommand.protocolLogic = [
        new Depends("transitionDuration", "transition"),
        new Depends("transitionEasing", "transition"),
        new Depends("transitionDirection", "transition")
    ];
    AMCP.LoadDecklinkCommand = LoadDecklinkCommand;
    /**
     *
     */
    var PlayDecklinkCommand = (function (_super) {
        __extends(PlayDecklinkCommand, _super);
        function PlayDecklinkCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "device", "DECKLINK DEVICE", new ParamValidators_1.Validation.DecklinkDeviceValidator()),
                new ParamSignature(optional, "transition", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Direction)),
                new ParamSignature(optional, "length", "LENGTH", new ParamValidators_1.Validation.FrameValidator("LENGTH")),
                new ParamSignature(optional, "filter", "FILTER", new ParamValidators_1.Validation.FilterValidator()),
                new ParamSignature(optional, "format", "FORMAT", new ParamValidators_1.Validation.ChannelFormatValidator()),
                new ParamSignature(optional, "channelLayout", "CHANNEL_LAYOUT", new ParamValidators_1.Validation.ChannelLayoutValidator())
            ];
            return _this;
        }
        return PlayDecklinkCommand;
    }(AbstractLayerWithFallbackCommand));
    PlayDecklinkCommand.commandString = "PLAY";
    PlayDecklinkCommand.protocolLogic = [
        new Depends("length", "device"),
        new Depends("filter", "device"),
        new Depends("format", "device"),
        new Depends("channelLayout", "device"),
        new Depends("transition", "device"),
        new Depends("transitionDuration", "device"),
        new Depends("transitionEasing", "device"),
        new Depends("transitionDirection", "device"),
        new Depends("transitionDuration", "transition"),
        new Depends("transitionEasing", "transition"),
        new Depends("transitionDirection", "transition")
    ];
    AMCP.PlayDecklinkCommand = PlayDecklinkCommand;
    /**
     *
     */
    var LoadHtmlPageBgCommand = (function (_super) {
        __extends(LoadHtmlPageBgCommand, _super);
        function LoadHtmlPageBgCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "url", "[HTML]", new ParamValidators_1.Validation.URLValidator()),
                new ParamSignature(optional, "transition", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Direction)),
                new ParamSignature(optional, "auto", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("AUTO"))
            ];
            return _this;
        }
        return LoadHtmlPageBgCommand;
    }(AbstractLayerWithFallbackCommand));
    LoadHtmlPageBgCommand.commandString = "LOADBG";
    LoadHtmlPageBgCommand.protocolLogic = [
        new Depends("transitionDuration", "transition"),
        new Depends("transitionEasing", "transition"),
        new Depends("transitionDirection", "transition")
    ];
    AMCP.LoadHtmlPageBgCommand = LoadHtmlPageBgCommand;
    /**
     *
     */
    var LoadHtmlPageCommand = (function (_super) {
        __extends(LoadHtmlPageCommand, _super);
        function LoadHtmlPageCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "url", "[HTML]", new ParamValidators_1.Validation.URLValidator),
                new ParamSignature(optional, "transition", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Direction)),
            ];
            return _this;
        }
        return LoadHtmlPageCommand;
    }(AbstractLayerWithFallbackCommand));
    LoadHtmlPageCommand.commandString = "LOAD";
    LoadHtmlPageCommand.protocolLogic = [
        new Depends("transitionDuration", "transition"),
        new Depends("transitionEasing", "transition"),
        new Depends("transitionDirection", "transition")
    ];
    AMCP.LoadHtmlPageCommand = LoadHtmlPageCommand;
    /**
     *
     */
    var PlayHtmlPageCommand = (function (_super) {
        __extends(PlayHtmlPageCommand, _super);
        function PlayHtmlPageCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(optional, "url", "[HTML]", new ParamValidators_1.Validation.URLValidator),
                new ParamSignature(optional, "transition", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Direction)),
            ];
            return _this;
        }
        return PlayHtmlPageCommand;
    }(AbstractLayerWithFallbackCommand));
    PlayHtmlPageCommand.commandString = "PLAY";
    PlayHtmlPageCommand.protocolLogic = [
        new Depends("transition", "url"),
        new Depends("transitionDuration", "url"),
        new Depends("transitionEasing", "url"),
        new Depends("transitionDirection", "url"),
        new Depends("transitionDuration", "transition"),
        new Depends("transitionEasing", "transition"),
        new Depends("transitionDirection", "transition")
    ];
    AMCP.PlayHtmlPageCommand = PlayHtmlPageCommand;
})(AMCP = exports.AMCP || (exports.AMCP = {}));
/**
 * ICG
 */
(function (AMCP) {
    /**
     *
     */
    var CGAddCommand = (function (_super) {
        __extends(CGAddCommand, _super);
        function CGAddCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "ADD", new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(required, "templateName", null, new ParamValidators_1.Validation.TemplateNameValidator()),
                new ParamSignature(required, "playOnLoad", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults(1, 0)),
                new ParamSignature(optional, "data", null, new ParamValidators_1.Validation.TemplateDataValidator())
            ];
            return _this;
        }
        return CGAddCommand;
    }(AbstractLayerWithCgFallbackCommand));
    CGAddCommand.commandString = "CG";
    AMCP.CGAddCommand = CGAddCommand;
    /**
     *
     */
    var CGPlayCommand = (function (_super) {
        __extends(CGPlayCommand, _super);
        function CGPlayCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "PLAY", new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0))
            ];
            return _this;
        }
        return CGPlayCommand;
    }(AbstractLayerWithCgFallbackCommand));
    CGPlayCommand.commandString = "CG";
    AMCP.CGPlayCommand = CGPlayCommand;
    /**
     *
     */
    var CGStopCommand = (function (_super) {
        __extends(CGStopCommand, _super);
        function CGStopCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "STOP", new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0))
            ];
            return _this;
        }
        return CGStopCommand;
    }(AbstractLayerWithCgFallbackCommand));
    CGStopCommand.commandString = "CG";
    AMCP.CGStopCommand = CGStopCommand;
    /**
     *
     */
    var CGNextCommand = (function (_super) {
        __extends(CGNextCommand, _super);
        function CGNextCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "NEXT", new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0))
            ];
            return _this;
        }
        return CGNextCommand;
    }(AbstractLayerWithCgFallbackCommand));
    CGNextCommand.commandString = "CG";
    AMCP.CGNextCommand = CGNextCommand;
    /**
     *
     */
    var CGRemoveCommand = (function (_super) {
        __extends(CGRemoveCommand, _super);
        function CGRemoveCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "REMOVE", new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0))
            ];
            return _this;
        }
        return CGRemoveCommand;
    }(AbstractLayerWithCgFallbackCommand));
    CGRemoveCommand.commandString = "CG";
    AMCP.CGRemoveCommand = CGRemoveCommand;
    /**
     *
     */
    var CGClearCommand = (function (_super) {
        __extends(CGClearCommand, _super);
        /**
         *
         */
        function CGClearCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("CLEAR"))
            ];
            _this._objectParams["keyword"] = "CLEAR";
            return _this;
        }
        return CGClearCommand;
    }(AbstractLayerWithCgFallbackCommand));
    CGClearCommand.commandString = "CG";
    AMCP.CGClearCommand = CGClearCommand;
    /**
     *
     */
    var CGUpdateCommand = (function (_super) {
        __extends(CGUpdateCommand, _super);
        function CGUpdateCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "UPDATE", new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(required, "data", null, new ParamValidators_1.Validation.TemplateDataValidator())
            ];
            return _this;
        }
        return CGUpdateCommand;
    }(AbstractLayerWithCgFallbackCommand));
    CGUpdateCommand.commandString = "CG";
    AMCP.CGUpdateCommand = CGUpdateCommand;
    /**
     * @todo: 201 response code, parsing???????
     */
    var CGInvokeCommand = (function (_super) {
        __extends(CGInvokeCommand, _super);
        function CGInvokeCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "INVOKE", new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(required, "method", null, new ParamValidators_1.Validation.StringValidator())
            ];
            _this.responseProtocol = new ResponseSignature(201);
            return _this;
        }
        return CGInvokeCommand;
    }(AbstractLayerWithCgFallbackCommand));
    CGInvokeCommand.commandString = "CG";
    AMCP.CGInvokeCommand = CGInvokeCommand;
})(AMCP = exports.AMCP || (exports.AMCP = {}));
/**
 * IMixer
 * @todo: switch 201/202 based on mode
 */
(function (AMCP) {
    /**
     *
     */
    var MixerKeyerCommand = (function (_super) {
        __extends(MixerKeyerCommand, _super);
        /**
         *
         */
        function MixerKeyerCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("KEYER")),
                new ParamSignature(optional, "keyer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults(1, 0)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "KEYER";
            return _this;
        }
        return MixerKeyerCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerKeyerCommand.commandString = "MIXER";
    MixerKeyerCommand.protocolLogic = [
        new Depends("defer", "keyer")
    ];
    AMCP.MixerKeyerCommand = MixerKeyerCommand;
    /**
     * @todo	Validata/clamp lamp number range?
     */
    var MixerChromaCommand = (function (_super) {
        __extends(MixerChromaCommand, _super);
        /**
         *
         */
        function MixerChromaCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("CHROMA")),
                new ParamSignature(optional, "keyer", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Chroma)),
                new ParamSignature(optional, "threshold", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "softness", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "spill", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "CHROMA";
            return _this;
        }
        return MixerChromaCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerChromaCommand.commandString = "MIXER";
    MixerChromaCommand.protocolLogic = [
        new Coupled("threshold", "softness"),
        new Depends("keyer", "threshold").ifNot("keyer", ServerStateEnum_1.Enum.Chroma.NONE),
        new Depends("spill", "threshold"),
        new Depends("transitionDuration", "keyer"),
        new Depends("transitionEasing", "keyer"),
        new Depends("defer", "threshold").ifNot("keyer", ServerStateEnum_1.Enum.Chroma.NONE)
    ];
    AMCP.MixerChromaCommand = MixerChromaCommand;
    /**
     *
     */
    var MixerBlendCommand = (function (_super) {
        __extends(MixerBlendCommand, _super);
        /**
         *
         */
        function MixerBlendCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("BLEND")),
                new ParamSignature(optional, "blendmode", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.BlendMode)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "BLEND";
            return _this;
        }
        return MixerBlendCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerBlendCommand.commandString = "MIXER";
    MixerBlendCommand.protocolLogic = [
        new Depends("defer", "blendmode")
    ];
    AMCP.MixerBlendCommand = MixerBlendCommand;
    /**
     *
     */
    var MixerOpacityCommand = (function (_super) {
        __extends(MixerOpacityCommand, _super);
        /**
         *
         */
        function MixerOpacityCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("OPACITY")),
                new ParamSignature(optional, "opacity", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "OPACITY";
            return _this;
        }
        return MixerOpacityCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerOpacityCommand.commandString = "MIXER";
    MixerOpacityCommand.protocolLogic = [
        new Depends("transitionDuration", "opacity"),
        new Depends("transitionEasing", "opacity"),
        new Depends("defer", "opacity")
    ];
    AMCP.MixerOpacityCommand = MixerOpacityCommand;
    /**
     *
     */
    var MixerBrightnessCommand = (function (_super) {
        __extends(MixerBrightnessCommand, _super);
        /**
         *
         */
        function MixerBrightnessCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("BRIGHTNESS")),
                new ParamSignature(optional, "brightness", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "BRIGHTNESS";
            return _this;
        }
        return MixerBrightnessCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerBrightnessCommand.commandString = "MIXER";
    MixerBrightnessCommand.protocolLogic = [
        new Depends("transitionDuration", "brightness"),
        new Depends("transitionEasing", "brightness"),
        new Depends("defer", "brightness")
    ];
    AMCP.MixerBrightnessCommand = MixerBrightnessCommand;
    /**
     *
     */
    var MixerSaturationCommand = (function (_super) {
        __extends(MixerSaturationCommand, _super);
        /**
         *
         */
        function MixerSaturationCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("SATURATION")),
                new ParamSignature(optional, "saturation", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "SATURATION";
            return _this;
        }
        return MixerSaturationCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerSaturationCommand.commandString = "MIXER";
    MixerSaturationCommand.protocolLogic = [
        new Depends("transitionDuration", "saturation"),
        new Depends("transitionEasing", "saturation"),
        new Depends("defer", "saturation")
    ];
    AMCP.MixerSaturationCommand = MixerSaturationCommand;
    /**
     *
     */
    var MixerContrastCommand = (function (_super) {
        __extends(MixerContrastCommand, _super);
        /**
         *
         */
        function MixerContrastCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("CONTRAST")),
                new ParamSignature(optional, "contrast", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "CONTRAST";
            return _this;
        }
        return MixerContrastCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerContrastCommand.commandString = "MIXER";
    MixerContrastCommand.protocolLogic = [
        new Depends("transitionDuration", "contrast"),
        new Depends("transitionEasing", "contrast"),
        new Depends("defer", "contrast")
    ];
    AMCP.MixerContrastCommand = MixerContrastCommand;
    /**
     * @todo:	verify `gamma` value range
     */
    var MixerLevelsCommand = (function (_super) {
        __extends(MixerLevelsCommand, _super);
        /**
         *
         */
        function MixerLevelsCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("LEVELS")),
                new ParamSignature(optional, "minInput", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "maxInput", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "gamma", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "minOutput", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "maxOutput", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "LEVELS";
            return _this;
        }
        return MixerLevelsCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerLevelsCommand.commandString = "MIXER";
    MixerLevelsCommand.protocolLogic = [
        new Coupled("minInput", "maxInput", "gamma", "minOutput", "maxOutput"),
        new Depends("transitionDuration", "minInput"),
        new Depends("transitionEasing", "minInput"),
        new Depends("defer", "minInput")
    ];
    AMCP.MixerLevelsCommand = MixerLevelsCommand;
    /**
     *
     */
    var MixerFillCommand = (function (_super) {
        __extends(MixerFillCommand, _super);
        /**
         *
         */
        function MixerFillCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("FILL")),
                new ParamSignature(optional, "x", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "y", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "xScale", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "yScale", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "FILL";
            return _this;
        }
        return MixerFillCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerFillCommand.commandString = "MIXER";
    MixerFillCommand.protocolLogic = [
        new Coupled("x", "y", "xScale", "yScale"),
        new Depends("transitionDuration", "x"),
        new Depends("transitionEasing", "x"),
        new Depends("defer", "x")
    ];
    AMCP.MixerFillCommand = MixerFillCommand;
    /**
     *
     */
    var MixerClipCommand = (function (_super) {
        __extends(MixerClipCommand, _super);
        /**
         *
         */
        function MixerClipCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("CLIP")),
                new ParamSignature(optional, "x", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "y", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "width", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "height", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "CLIP";
            return _this;
        }
        return MixerClipCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerClipCommand.commandString = "MIXER";
    MixerClipCommand.protocolLogic = [
        new Coupled("x", "y", "width", "height"),
        new Depends("transitionDuration", "x"),
        new Depends("transitionEasing", "x"),
        new Depends("defer", "x")
    ];
    AMCP.MixerClipCommand = MixerClipCommand;
    /**
     *
     */
    var MixerAnchorCommand = (function (_super) {
        __extends(MixerAnchorCommand, _super);
        /**
         *
         */
        function MixerAnchorCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("ANCHOR")),
                new ParamSignature(optional, "x", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "y", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "ANCHOR";
            return _this;
        }
        return MixerAnchorCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerAnchorCommand.commandString = "MIXER";
    MixerAnchorCommand.protocolLogic = [
        new Coupled("x", "y"),
        new Depends("transitionDuration", "x"),
        new Depends("transitionEasing", "x"),
        new Depends("defer", "x")
    ];
    AMCP.MixerAnchorCommand = MixerAnchorCommand;
    /**
     *
     */
    var MixerCropCommand = (function (_super) {
        __extends(MixerCropCommand, _super);
        /**
         *
         */
        function MixerCropCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("CROP")),
                new ParamSignature(optional, "left", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "top", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "right", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "bottom", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "CROP";
            return _this;
        }
        return MixerCropCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerCropCommand.commandString = "MIXER";
    MixerCropCommand.protocolLogic = [
        new Coupled("left", "top", "right", "bottom"),
        new Depends("transitionDuration", "x"),
        new Depends("transitionEasing", "x"),
        new Depends("defer", "x")
    ];
    AMCP.MixerCropCommand = MixerCropCommand;
    /**
     *
     */
    var MixerRotationCommand = (function (_super) {
        __extends(MixerRotationCommand, _super);
        /**
         *
         */
        function MixerRotationCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("ROTATION")),
                new ParamSignature(optional, "rotation", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "ROTATION";
            return _this;
        }
        return MixerRotationCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerRotationCommand.commandString = "MIXER";
    MixerRotationCommand.protocolLogic = [
        new Depends("transitionDuration", "rotation"),
        new Depends("transitionEasing", "rotation"),
        new Depends("defer", "rotation")
    ];
    AMCP.MixerRotationCommand = MixerRotationCommand;
    /**
     *
     */
    var MixerPerspectiveCommand = (function (_super) {
        __extends(MixerPerspectiveCommand, _super);
        /**
         *
         */
        function MixerPerspectiveCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("PERSPECTIVE")),
                new ParamSignature(optional, "topLeftX", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "topLeftY", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "topRightX", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "topRightY", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "bottomRightX", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "bottomRightY", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "bottomLeftX", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "bottomLeftY", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.NumberValidator()),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "PERSPECTIVE";
            return _this;
        }
        return MixerPerspectiveCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerPerspectiveCommand.commandString = "MIXER";
    MixerPerspectiveCommand.protocolLogic = [
        new Coupled("topLeftX", "topLeftY", "topRightX", "topRightY", "bottomRightX", "bottomRightY", "bottomLeftX", "bottomLeftY"),
        new Depends("transitionDuration", "topLeftX"),
        new Depends("transitionEasing", "topLeftX"),
        new Depends("defer", "topLeftX")
    ];
    AMCP.MixerPerspectiveCommand = MixerPerspectiveCommand;
    /**
     *
     */
    var MixerMipmapCommand = (function (_super) {
        __extends(MixerMipmapCommand, _super);
        /**
         *
         */
        function MixerMipmapCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("MIPMAP")),
                new ParamSignature(optional, "mipmap", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults(1, 0)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "MIPMAP";
            return _this;
        }
        return MixerMipmapCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerMipmapCommand.commandString = "MIXER";
    MixerMipmapCommand.protocolLogic = [
        new Depends("defer", "mipmap")
    ];
    AMCP.MixerMipmapCommand = MixerMipmapCommand;
    /**
     *
     */
    var MixerVolumeCommand = (function (_super) {
        __extends(MixerVolumeCommand, _super);
        /**
         *
         */
        function MixerVolumeCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("VOLUME")),
                new ParamSignature(optional, "volume", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "VOLUME";
            return _this;
        }
        return MixerVolumeCommand;
    }(AbstractLayerWithFallbackCommand));
    MixerVolumeCommand.commandString = "MIXER";
    MixerVolumeCommand.protocolLogic = [
        new Depends("transitionDuration", "volume"),
        new Depends("transitionEasing", "volume"),
        new Depends("defer", "volume")
    ];
    AMCP.MixerVolumeCommand = MixerVolumeCommand;
    /**
     *
     */
    var MixerMastervolumeCommand = (function (_super) {
        __extends(MixerMastervolumeCommand, _super);
        /**
         *
         */
        function MixerMastervolumeCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("MASTERVOLUME")),
                new ParamSignature(optional, "mastervolume", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "MASTERVOLUME";
            return _this;
        }
        return MixerMastervolumeCommand;
    }(AbstractChannelCommand));
    MixerMastervolumeCommand.commandString = "MIXER";
    MixerMastervolumeCommand.protocolLogic = [
        new Depends("transitionDuration", "mastervolume"),
        new Depends("transitionEasing", "mastervolume"),
        new Depends("defer", "mastervolume")
    ];
    AMCP.MixerMastervolumeCommand = MixerMastervolumeCommand;
    /**
     *
     */
    var MixerStraightAlphaOutputCommand = (function (_super) {
        __extends(MixerStraightAlphaOutputCommand, _super);
        /**
         *
         */
        function MixerStraightAlphaOutputCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("STRAIGHT_ALPHA_OUTPUT")),
                new ParamSignature(optional, "straight_alpha_output", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults(1, 0)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "STRAIGHT_ALPHA_OUTPUT";
            return _this;
        }
        return MixerStraightAlphaOutputCommand;
    }(AbstractChannelCommand));
    MixerStraightAlphaOutputCommand.commandString = "MIXER";
    MixerStraightAlphaOutputCommand.protocolLogic = [
        new Depends("defer", "straight_alpha_output")
    ];
    AMCP.MixerStraightAlphaOutputCommand = MixerStraightAlphaOutputCommand;
    /**
     *
     */
    var MixerGridCommand = (function (_super) {
        __extends(MixerGridCommand, _super);
        /**
         *
         */
        function MixerGridCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("GRID")),
                new ParamSignature(optional, "resolution", null, new ParamValidators_1.Validation.PositiveNumberRoundValidatorBetween(1)),
                new ParamSignature(optional, "transitionDuration", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParamValidators_1.Validation.BooleanValidatorWithDefaults("DEFER"))
            ];
            _this._objectParams["keyword"] = "GRID";
            return _this;
        }
        return MixerGridCommand;
    }(AbstractChannelCommand));
    MixerGridCommand.commandString = "MIXER";
    AMCP.MixerGridCommand = MixerGridCommand;
    /**
     *
     */
    var MixerCommitCommand = (function (_super) {
        __extends(MixerCommitCommand, _super);
        /**
         *
         */
        function MixerCommitCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("COMMIT"))
            ];
            _this._objectParams["keyword"] = "COMMIT";
            return _this;
        }
        return MixerCommitCommand;
    }(AbstractChannelCommand));
    MixerCommitCommand.commandString = "MIXER";
    AMCP.MixerCommitCommand = MixerCommitCommand;
    /**
     *
     */
    var MixerClearCommand = (function (_super) {
        __extends(MixerClearCommand, _super);
        /**
         *
         */
        function MixerClearCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParamValidators_1.Validation.KeywordValidator("CLEAR"))
            ];
            _this._objectParams["keyword"] = "CLEAR";
            return _this;
        }
        return MixerClearCommand;
    }(AbstractChannelOrLayerCommand));
    MixerClearCommand.commandString = "MIXER";
    AMCP.MixerClearCommand = MixerClearCommand;
})(AMCP = exports.AMCP || (exports.AMCP = {}));
/**
 * IChannel
 */
(function (AMCP) {
    /**
     *
     */
    var ClearCommand = (function (_super) {
        __extends(ClearCommand, _super);
        function ClearCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ClearCommand;
    }(AbstractChannelOrLayerCommand));
    ClearCommand.commandString = "CLEAR";
    AMCP.ClearCommand = ClearCommand;
    /**
     *
     */
    var CallCommand = (function (_super) {
        __extends(CallCommand, _super);
        function CallCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CallCommand;
    }(AbstractLayerWithFallbackCommand));
    CallCommand.commandString = "CALL";
    AMCP.CallCommand = CallCommand;
    /**
     *
     */
    var SwapCommand = (function (_super) {
        __extends(SwapCommand, _super);
        /**
         *
         */
        function SwapCommand() {
            return _super.call(this, "1-1") || this;
            // @todo: custom parameters dual layerOrchannel with 1 optional param
            // overloading in method
        }
        return SwapCommand;
    }(AbstractChannelOrLayerCommand));
    SwapCommand.commandString = "SWAP";
    AMCP.SwapCommand = SwapCommand;
    /**
     *
     */
    var AddCommand = (function (_super) {
        __extends(AddCommand, _super);
        function AddCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AddCommand;
    }(AbstractChannelCommand));
    AddCommand.commandString = "ADD";
    AMCP.AddCommand = AddCommand;
    /**
     *
     */
    var RemoveCommand = (function (_super) {
        __extends(RemoveCommand, _super);
        function RemoveCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RemoveCommand;
    }(AbstractChannelOrLayerCommand));
    RemoveCommand.commandString = "REMOVE";
    AMCP.RemoveCommand = RemoveCommand;
    /**
     *
     */
    var PrintCommand = (function (_super) {
        __extends(PrintCommand, _super);
        function PrintCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PrintCommand;
    }(AbstractChannelCommand));
    PrintCommand.commandString = "PRINT";
    AMCP.PrintCommand = PrintCommand;
    /**
     *
     */
    var SetCommand = (function (_super) {
        __extends(SetCommand, _super);
        function SetCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SetCommand;
    }(AbstractChannelCommand));
    SetCommand.commandString = "SET";
    AMCP.SetCommand = SetCommand;
    /**
     *
     */
    var LockCommand = (function (_super) {
        __extends(LockCommand, _super);
        function LockCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "action", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Lock)),
                new ParamSignature(optional, "phrase", null, new ParamValidators_1.Validation.StringValidator())
            ];
            return _this;
        }
        return LockCommand;
    }(AbstractChannelCommand));
    LockCommand.commandString = "LOCK";
    LockCommand.protocolLogic = [
        new Depends("action", "phrase").ifNot("action", ServerStateEnum_1.Enum.Lock.RELEASE)
    ];
    AMCP.LockCommand = LockCommand;
    /**
     *
     */
    var ChannelGridCommand = (function (_super) {
        __extends(ChannelGridCommand, _super);
        function ChannelGridCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ChannelGridCommand;
    }(AbstractCommand));
    ChannelGridCommand.commandString = "CHANNEL_GRID";
    AMCP.ChannelGridCommand = ChannelGridCommand;
    /**
     *
     */
    var GlGCCommand = (function (_super) {
        __extends(GlGCCommand, _super);
        function GlGCCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return GlGCCommand;
    }(AbstractCommand));
    GlGCCommand.commandString = "GL GC";
    AMCP.GlGCCommand = GlGCCommand;
})(AMCP = exports.AMCP || (exports.AMCP = {}));
/**
 * IData
 */
(function (AMCP) {
    /**
     *
     */
    var DataStoreCommand = (function (_super) {
        __extends(DataStoreCommand, _super);
        function DataStoreCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "fileName", null, new ParamValidators_1.Validation.DataNameValidator()),
                new ParamSignature(required, "data", null, new ParamValidators_1.Validation.TemplateDataValidator())
            ];
            return _this;
        }
        return DataStoreCommand;
    }(AbstractCommand));
    DataStoreCommand.commandString = "DATA STORE";
    AMCP.DataStoreCommand = DataStoreCommand;
    /**
     *
     */
    var DataRetrieveCommand = (function (_super) {
        __extends(DataRetrieveCommand, _super);
        function DataRetrieveCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "fileName", null, new ParamValidators_1.Validation.DataNameValidator())
            ];
            _this.responseProtocol = new ResponseSignature(201, ResponseValidators_1.Response.DataValidator, ResponseParsers_1.Response.DataParser);
            return _this;
        }
        return DataRetrieveCommand;
    }(AbstractCommand));
    DataRetrieveCommand.commandString = "DATA RETRIEVE";
    AMCP.DataRetrieveCommand = DataRetrieveCommand;
    /**
     *
     */
    var DataListCommand = (function (_super) {
        __extends(DataListCommand, _super);
        function DataListCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.responseProtocol = new ResponseSignature(200, ResponseValidators_1.Response.ListValidator, ResponseParsers_1.Response.DataListParser);
            return _this;
        }
        return DataListCommand;
    }(AbstractCommand));
    DataListCommand.commandString = "DATA LIST";
    AMCP.DataListCommand = DataListCommand;
    /**
     *
     */
    var DataRemoveCommand = (function (_super) {
        __extends(DataRemoveCommand, _super);
        function DataRemoveCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "fileName", null, new ParamValidators_1.Validation.DataNameValidator())
            ];
            return _this;
        }
        return DataRemoveCommand;
    }(AbstractCommand));
    DataRemoveCommand.commandString = "DATA REMOVE";
    AMCP.DataRemoveCommand = DataRemoveCommand;
})(AMCP = exports.AMCP || (exports.AMCP = {}));
/**
 * IThumbnail
 */
(function (AMCP) {
    /**
     *
     */
    var ThumbnailListCommand = (function (_super) {
        __extends(ThumbnailListCommand, _super);
        function ThumbnailListCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            // responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ThumbnailListParser);
            _this.responseProtocol = new ResponseSignature(200, ResponseValidators_1.Response.ListValidator, ResponseParsers_1.Response.ThumbnailListParser);
            return _this;
        }
        return ThumbnailListCommand;
    }(AbstractCommand));
    ThumbnailListCommand.commandString = "THUMBNAIL LIST";
    AMCP.ThumbnailListCommand = ThumbnailListCommand;
    /**
     *
     */
    var ThumbnailRetrieveCommand = (function (_super) {
        __extends(ThumbnailRetrieveCommand, _super);
        function ThumbnailRetrieveCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "fileName", null, new ParamValidators_1.Validation.ClipNameValidator())
            ];
            _this.responseProtocol = new ResponseSignature(201, ResponseValidators_1.Response.Base64Validator, ResponseParsers_1.Response.ThumbnailParser);
            return _this;
        }
        return ThumbnailRetrieveCommand;
    }(AbstractCommand));
    ThumbnailRetrieveCommand.commandString = "THUMBNAIL RETRIEVE";
    AMCP.ThumbnailRetrieveCommand = ThumbnailRetrieveCommand;
    /**
     *
     */
    var ThumbnailGenerateCommand = (function (_super) {
        __extends(ThumbnailGenerateCommand, _super);
        function ThumbnailGenerateCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "fileName", null, new ParamValidators_1.Validation.ClipNameValidator())
            ];
            return _this;
        }
        return ThumbnailGenerateCommand;
    }(AbstractCommand));
    ThumbnailGenerateCommand.commandString = "THUMBNAIL GENERATE";
    AMCP.ThumbnailGenerateCommand = ThumbnailGenerateCommand;
    /**
     *
     */
    var ThumbnailGenerateAllCommand = (function (_super) {
        __extends(ThumbnailGenerateAllCommand, _super);
        function ThumbnailGenerateAllCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ThumbnailGenerateAllCommand;
    }(AbstractCommand));
    ThumbnailGenerateAllCommand.commandString = "THUMBNAIL GENERATE_ALL";
    AMCP.ThumbnailGenerateAllCommand = ThumbnailGenerateAllCommand;
})(AMCP = exports.AMCP || (exports.AMCP = {}));
/**
 * IInfo
 */
(function (AMCP) {
    /**
     *
     */
    var CinfCommand = (function (_super) {
        __extends(CinfCommand, _super);
        function CinfCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "fileName", null, new ParamValidators_1.Validation.ClipNameValidator())
            ];
            _this.responseProtocol = new ResponseSignature(200, ResponseValidators_1.Response.ListValidator, ResponseParsers_1.Response.CinfParser);
            return _this;
        }
        return CinfCommand;
    }(AbstractCommand));
    CinfCommand.commandString = "CINF";
    AMCP.CinfCommand = CinfCommand;
    /**
     *
     */
    var ClsCommand = (function (_super) {
        __extends(ClsCommand, _super);
        function ClsCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.responseProtocol = new ResponseSignature(200, ResponseValidators_1.Response.ListValidator, ResponseParsers_1.Response.ContentParser);
            return _this;
        }
        return ClsCommand;
    }(AbstractCommand));
    ClsCommand.commandString = "CLS";
    AMCP.ClsCommand = ClsCommand;
    /**
     *
     */
    var FlsCommand = (function (_super) {
        __extends(FlsCommand, _super);
        function FlsCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.responseProtocol = new ResponseSignature(200, ResponseValidators_1.Response.ListValidator, ResponseParsers_1.Response.ContentParser);
            return _this;
        }
        return FlsCommand;
    }(AbstractCommand));
    FlsCommand.commandString = "FLS";
    AMCP.FlsCommand = FlsCommand;
    /**
     *
     */
    var TlsCommand = (function (_super) {
        __extends(TlsCommand, _super);
        function TlsCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.responseProtocol = new ResponseSignature(200, ResponseValidators_1.Response.ListValidator, ResponseParsers_1.Response.ContentParser);
            return _this;
        }
        return TlsCommand;
    }(AbstractCommand));
    TlsCommand.commandString = "TLS";
    AMCP.TlsCommand = TlsCommand;
    /**
     *
     */
    var VersionCommand = (function (_super) {
        __extends(VersionCommand, _super);
        function VersionCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(optional, "component", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Version))
            ];
            _this.responseProtocol = new ResponseSignature(201, ResponseValidators_1.Response.StringValidator, ResponseParsers_1.Response.VersionParser);
            return _this;
        }
        return VersionCommand;
    }(AbstractCommand));
    VersionCommand.commandString = "VERSION";
    AMCP.VersionCommand = VersionCommand;
    /**
     *
     */
    var InfoCommand = (function (_super) {
        __extends(InfoCommand, _super);
        /**
         *
         */
        function InfoCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.responseProtocol = new ResponseSignature(200, ResponseValidators_1.Response.ListValidator, ResponseParsers_1.Response.ChannelParser);
            if (_this.channel && _this.channel > -1) {
                _this.responseProtocol = new ResponseSignature(201, ResponseValidators_1.Response.XMLValidator, ResponseParsers_1.Response.InfoParser);
            }
            return _this;
        }
        return InfoCommand;
    }(AbstractOrChannelOrLayerCommand));
    InfoCommand.commandString = "INFO";
    AMCP.InfoCommand = InfoCommand;
    /**
     *
     */
    var InfoTemplateCommand = (function (_super) {
        __extends(InfoTemplateCommand, _super);
        function InfoTemplateCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "template", null, new ParamValidators_1.Validation.TemplateNameValidator())
            ];
            _this.responseProtocol = new ResponseSignature(201, ResponseValidators_1.Response.XMLValidator, ResponseParsers_1.Response.InfoTemplateParser);
            return _this;
        }
        return InfoTemplateCommand;
    }(AbstractCommand));
    InfoTemplateCommand.commandString = "INFO TEMPLATE";
    AMCP.InfoTemplateCommand = InfoTemplateCommand;
    /**
     *
     */
    var InfoConfigCommand = (function (_super) {
        __extends(InfoConfigCommand, _super);
        /**
         *
         */
        function InfoConfigCommand(params, context) {
            var _this = _super.call(this, params, context) || this;
            _this.responseProtocol = new ResponseSignature(201, ResponseValidators_1.Response.XMLValidator, ResponseParsers_1.Response.ConfigParser);
            return _this;
        }
        return InfoConfigCommand;
    }(AbstractCommand));
    InfoConfigCommand.commandString = "INFO CONFIG";
    AMCP.InfoConfigCommand = InfoConfigCommand;
    /**
     *
     */
    var InfoPathsCommand = (function (_super) {
        __extends(InfoPathsCommand, _super);
        function InfoPathsCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.responseProtocol = new ResponseSignature(201, ResponseValidators_1.Response.XMLValidator, ResponseParsers_1.Response.InfoPathsParser);
            return _this;
        }
        return InfoPathsCommand;
    }(AbstractCommand));
    InfoPathsCommand.commandString = "INFO PATHS";
    AMCP.InfoPathsCommand = InfoPathsCommand;
    /**
     *
     */
    var InfoSystemCommand = (function (_super) {
        __extends(InfoSystemCommand, _super);
        function InfoSystemCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.responseProtocol = new ResponseSignature(201, ResponseValidators_1.Response.XMLValidator, ResponseParsers_1.Response.InfoSystemParser);
            return _this;
        }
        return InfoSystemCommand;
    }(AbstractCommand));
    InfoSystemCommand.commandString = "INFO SYSTEM";
    AMCP.InfoSystemCommand = InfoSystemCommand;
    /**
     *
     */
    var InfoServerCommand = (function (_super) {
        __extends(InfoServerCommand, _super);
        function InfoServerCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.responseProtocol = new ResponseSignature(201, ResponseValidators_1.Response.XMLValidator, ResponseParsers_1.Response.InfoServerParser);
            return _this;
        }
        return InfoServerCommand;
    }(AbstractCommand));
    InfoServerCommand.commandString = "INFO SERVER";
    AMCP.InfoServerCommand = InfoServerCommand;
    /**
     *
     */
    var InfoQueuesCommand = (function (_super) {
        __extends(InfoQueuesCommand, _super);
        function InfoQueuesCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.responseProtocol = new ResponseSignature(201, ResponseValidators_1.Response.XMLValidator, ResponseParsers_1.Response.InfoQueuesParser);
            return _this;
        }
        return InfoQueuesCommand;
    }(AbstractCommand));
    InfoQueuesCommand.commandString = "INFO QUEUES";
    AMCP.InfoQueuesCommand = InfoQueuesCommand;
    /**
     *
     */
    var InfoThreadsCommand = (function (_super) {
        __extends(InfoThreadsCommand, _super);
        function InfoThreadsCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.responseProtocol = new ResponseSignature(200, ResponseValidators_1.Response.ListValidator, ResponseParsers_1.Response.InfoThreadsParser);
            return _this;
        }
        return InfoThreadsCommand;
    }(AbstractCommand));
    InfoThreadsCommand.commandString = "INFO THREADS";
    AMCP.InfoThreadsCommand = InfoThreadsCommand;
    /**
     *
     */
    var InfoDelayCommand = (function (_super) {
        __extends(InfoDelayCommand, _super);
        /**
         *
         */
        function InfoDelayCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "delay", null, new ParamValidators_1.Validation.KeywordValidator("DELAY"))
            ];
            _this.responseProtocol = new ResponseSignature(201, ResponseValidators_1.Response.XMLValidator, ResponseParsers_1.Response.InfoDelayParser);
            _this._objectParams["delay"] = "DELAY";
            return _this;
        }
        return InfoDelayCommand;
    }(AbstractChannelOrLayerCommand));
    InfoDelayCommand.commandString = "INFO";
    AMCP.InfoDelayCommand = InfoDelayCommand;
    /**
     * @todo: response validator/parser
     */
    var CGInfoCommand = (function (_super) {
        __extends(CGInfoCommand, _super);
        /**
         *
         */
        function CGInfoCommand(params) {
            var _this = _super.call(this, params) || this;
            _this.paramProtocol = [
                new ParamSignature(required, "info", null, new ParamValidators_1.Validation.KeywordValidator("INFO")),
                new ParamSignature(optional, "flashLayer", null, new ParamValidators_1.Validation.PositiveNumberValidatorBetween(0))
            ];
            _this.responseProtocol = new ResponseSignature(201);
            _this._objectParams["info"] = "INFO";
            return _this;
        }
        return CGInfoCommand;
    }(AbstractLayerWithCgFallbackCommand));
    CGInfoCommand.commandString = "CG";
    AMCP.CGInfoCommand = CGInfoCommand;
    /**
     *
     */
    var GlInfoCommand = (function (_super) {
        __extends(GlInfoCommand, _super);
        function GlInfoCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.responseProtocol = new ResponseSignature(201, ResponseValidators_1.Response.XMLValidator, ResponseParsers_1.Response.GLParser);
            return _this;
        }
        return GlInfoCommand;
    }(AbstractCommand));
    GlInfoCommand.commandString = "GL INFO";
    AMCP.GlInfoCommand = GlInfoCommand;
    /**
     *
     */
    var LogLevelCommand = (function (_super) {
        __extends(LogLevelCommand, _super);
        function LogLevelCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(optional, "level", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.LogLevel))
            ];
            return _this;
        }
        return LogLevelCommand;
    }(AbstractCommand));
    LogLevelCommand.commandString = "LOG LEVEL";
    AMCP.LogLevelCommand = LogLevelCommand;
    /**
     * @protocol	Needs either `calltrace` or `communication` parameter.
     */
    var LogCategoryCommand = (function (_super) {
        __extends(LogCategoryCommand, _super);
        function LogCategoryCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(optional, "calltrace", ServerStateEnum_1.Enum.LogCategory.CALLTRACE.value, new ParamValidators_1.Validation.BooleanValidatorWithDefaults(1, 0)),
                new ParamSignature(optional, "communication", ServerStateEnum_1.Enum.LogCategory.COMMUNICATION.value, new ParamValidators_1.Validation.BooleanValidatorWithDefaults(1, 0))
            ];
            return _this;
        }
        return LogCategoryCommand;
    }(AbstractCommand));
    LogCategoryCommand.commandString = "LOG CATEGORY";
    LogCategoryCommand.protocolLogic = [
        new OneOf("calltrace", "communication")
    ];
    AMCP.LogCategoryCommand = LogCategoryCommand;
    /**
     *
     */
    var DiagCommand = (function (_super) {
        __extends(DiagCommand, _super);
        function DiagCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DiagCommand;
    }(AbstractCommand));
    DiagCommand.commandString = "DIAG";
    AMCP.DiagCommand = DiagCommand;
    /**
     * @todo: mixed mode!!!!
     * 202/201
     */
    var HelpCommand = (function (_super) {
        __extends(HelpCommand, _super);
        function HelpCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(optional, "command", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Command))
            ];
            _this.responseProtocol = new ResponseSignature(200, ResponseValidators_1.Response.ListValidator, ResponseParsers_1.Response.HelpParser);
            return _this;
        }
        return HelpCommand;
    }(AbstractCommand));
    HelpCommand.commandString = "HELP";
    AMCP.HelpCommand = HelpCommand;
    /**
     *
     */
    var HelpProducerCommand = (function (_super) {
        __extends(HelpProducerCommand, _super);
        function HelpProducerCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(optional, "producer", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Producer))
            ];
            _this.responseProtocol = new ResponseSignature(200, ResponseValidators_1.Response.ListValidator, ResponseParsers_1.Response.HelpParser);
            return _this;
        }
        return HelpProducerCommand;
    }(AbstractCommand));
    HelpProducerCommand.commandString = "HELP PRODUCER";
    AMCP.HelpProducerCommand = HelpProducerCommand;
    /**
     *
     */
    var HelpConsumerCommand = (function (_super) {
        __extends(HelpConsumerCommand, _super);
        function HelpConsumerCommand() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.paramProtocol = [
                new ParamSignature(optional, "consumer", null, new ParamValidators_1.Validation.EnumValidator(ServerStateEnum_1.Enum.Consumer))
            ];
            _this.responseProtocol = new ResponseSignature(200, ResponseValidators_1.Response.ListValidator, ResponseParsers_1.Response.HelpParser);
            return _this;
        }
        return HelpConsumerCommand;
    }(AbstractCommand));
    HelpConsumerCommand.commandString = "HELP CONSUMER";
    AMCP.HelpConsumerCommand = HelpConsumerCommand;
})(AMCP = exports.AMCP || (exports.AMCP = {}));
/**
 * IOperation
 */
(function (AMCP) {
    /**
     * @todo: response
     */
    var ByeCommand = (function (_super) {
        __extends(ByeCommand, _super);
        function ByeCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ByeCommand;
    }(AbstractCommand));
    ByeCommand.commandString = "BYE";
    AMCP.ByeCommand = ByeCommand;
    /**
     * @todo: response
     */
    var KillCommand = (function (_super) {
        __extends(KillCommand, _super);
        function KillCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return KillCommand;
    }(AbstractCommand));
    KillCommand.commandString = "KILL";
    AMCP.KillCommand = KillCommand;
    /**
     * @todo: response
     */
    var RestartCommand = (function (_super) {
        __extends(RestartCommand, _super);
        function RestartCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RestartCommand;
    }(AbstractCommand));
    RestartCommand.commandString = "RESTART";
    AMCP.RestartCommand = RestartCommand;
})(AMCP = exports.AMCP || (exports.AMCP = {}));
