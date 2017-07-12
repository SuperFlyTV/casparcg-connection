import { Enum } from "./ServerStateEnum";
// ResponseNS
import { Response as ResponseSignatureNS } from "./ResponseSignature";
import { Response as ResponseValidator } from "./ResponseValidators";
import { Response as ResponseParser } from "./ResponseParsers";
var ResponseSignature = ResponseSignatureNS.ResponseSignature;
// Command NS
import { Command as CommandNS } from "./AbstractCommand";
var AbstractCommand = CommandNS.AbstractCommand;
var AbstractOrChannelOrLayerCommand = CommandNS.AbstractOrChannelOrLayerCommand;
var AbstractChannelCommand = CommandNS.AbstractChannelCommand;
var AbstractChannelOrLayerCommand = CommandNS.AbstractChannelOrLayerCommand;
var AbstractLayerWithFallbackCommand = CommandNS.AbstractLayerWithFallbackCommand;
var AbstractLayerWithCgFallbackCommand = CommandNS.AbstractLayerWithCgFallbackCommand;
// Param NS
import { Param as ParamNS } from "./ParamSignature";
var required = ParamNS.Required;
var optional = ParamNS.Optional;
var ParamSignature = ParamNS.ParamSignature;
// Validation NS
import { Validation as ParameterValidator } from "./ParamValidators";
// Protocol NS
import { Protocol as ProtocolNS } from "./ProtocolLogic";
var Depends = ProtocolNS.Depends;
var Coupled = ProtocolNS.Coupled;
var OneOf = ProtocolNS.OneOf;
/**
 * Factory
 */
export var AMCPUtil;
(function (AMCPUtil) {
    /**
     *
     */
    function deSerialize(cmd, id) {
        // errror: commandstatus -1 //invalid command
        // @todo: error handling much?????? (callback??????)
        let command = Object.create(AMCP[cmd._commandName]["prototype"]);
        command.constructor.call(command, cmd._objectParams);
        command.populate(cmd, id);
        return command;
    }
    AMCPUtil.deSerialize = deSerialize;
    /**
     *
     */
    class CasparCGSocketResponse {
        /**
         *
         */
        constructor(responseString) {
            this.items = [];
            this.statusCode = CasparCGSocketResponse.evaluateStatusCode(responseString);
            this.responseString = responseString;
        }
        /**
         *
         */
        static evaluateStatusCode(responseString) {
            return parseInt(responseString.substr(0, 3), 10);
        }
    }
    AMCPUtil.CasparCGSocketResponse = CasparCGSocketResponse;
})(AMCPUtil || (AMCPUtil = {}));
/**
 * Internal
 */
export var AMCP;
(function (AMCP) {
    class CustomCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "command", null, new ParameterValidator.StringValidator(false))
            ];
        }
    }
    CustomCommand.commandString = "";
    AMCP.CustomCommand = CustomCommand;
})(AMCP || (AMCP = {}));
/**
 * IVideo
 */
(function (AMCP) {
    /**
     *
     */
    class LoadbgCommand extends AbstractLayerWithFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "clip", null, new ParameterValidator.ClipNameValidator()),
                new ParamSignature(optional, "loop", null, new ParameterValidator.BooleanValidatorWithDefaults("LOOP")),
                new ParamSignature(optional, "transition", null, new ParameterValidator.EnumValidator(Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParameterValidator.EnumValidator(Enum.Direction)),
                new ParamSignature(optional, "seek", "SEEK", new ParameterValidator.FrameValidator("SEEK")),
                new ParamSignature(optional, "length", "LENGTH", new ParameterValidator.FrameValidator("LENGTH")),
                new ParamSignature(optional, "filter", "FILTER", new ParameterValidator.FilterValidator()),
                new ParamSignature(optional, "auto", null, new ParameterValidator.BooleanValidatorWithDefaults("AUTO"))
            ];
        }
    }
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
    class LoadCommand extends AbstractLayerWithFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "clip", null, new ParameterValidator.ClipNameValidator),
                new ParamSignature(optional, "loop", null, new ParameterValidator.BooleanValidatorWithDefaults("LOOP")),
                new ParamSignature(optional, "transition", null, new ParameterValidator.EnumValidator(Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParameterValidator.EnumValidator(Enum.Direction)),
                new ParamSignature(optional, "seek", "SEEK", new ParameterValidator.FrameValidator("SEEK")),
                new ParamSignature(optional, "length", "LENGTH", new ParameterValidator.FrameValidator("LENGTH")),
                new ParamSignature(optional, "filter", "FILTER", new ParameterValidator.FilterValidator())
            ];
        }
    }
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
    class PlayCommand extends AbstractLayerWithFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(optional, "clip", null, new ParameterValidator.ClipNameValidator),
                new ParamSignature(optional, "loop", null, new ParameterValidator.BooleanValidatorWithDefaults("LOOP")),
                new ParamSignature(optional, "transition", null, new ParameterValidator.EnumValidator(Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParameterValidator.EnumValidator(Enum.Direction)),
                new ParamSignature(optional, "seek", "SEEK", new ParameterValidator.FrameValidator("SEEK")),
                new ParamSignature(optional, "length", "LENGTH", new ParameterValidator.FrameValidator("LENGTH")),
                new ParamSignature(optional, "filter", "FILTER", new ParameterValidator.FilterValidator())
            ];
        }
    }
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
    class PauseCommand extends AbstractLayerWithFallbackCommand {
    }
    PauseCommand.commandString = "PAUSE";
    AMCP.PauseCommand = PauseCommand;
    /**
     *
     */
    class ResumeCommand extends AbstractLayerWithFallbackCommand {
    }
    ResumeCommand.commandString = "RESUME";
    AMCP.ResumeCommand = ResumeCommand;
    /**
     *
     */
    class StopCommand extends AbstractLayerWithFallbackCommand {
    }
    StopCommand.commandString = "STOP";
    AMCP.StopCommand = StopCommand;
})(AMCP || (AMCP = {}));
/**
 * IInputOutput
 */
(function (AMCP) {
    /**
     *
     */
    class LoadDecklinkBgCommand extends AbstractLayerWithFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "device", "DECKLINK DEVICE", new ParameterValidator.DecklinkDeviceValidator()),
                new ParamSignature(optional, "transition", null, new ParameterValidator.EnumValidator(Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParameterValidator.EnumValidator(Enum.Direction)),
                new ParamSignature(optional, "length", "LENGTH", new ParameterValidator.FrameValidator("LENGTH")),
                new ParamSignature(optional, "filter", "FILTER", new ParameterValidator.FilterValidator()),
                new ParamSignature(optional, "format", "FORMAT", new ParameterValidator.ChannelFormatValidator()),
                new ParamSignature(optional, "channelLayout", "CHANNEL_LAYOUT", new ParameterValidator.ChannelLayoutValidator()),
                new ParamSignature(optional, "auto", null, new ParameterValidator.BooleanValidatorWithDefaults("AUTO"))
            ];
        }
    }
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
    class LoadDecklinkCommand extends AbstractLayerWithFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "device", "DECKLINK DEVICE", new ParameterValidator.DecklinkDeviceValidator()),
                new ParamSignature(optional, "transition", null, new ParameterValidator.EnumValidator(Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParameterValidator.EnumValidator(Enum.Direction)),
                new ParamSignature(optional, "length", "LENGTH", new ParameterValidator.FrameValidator("LENGTH")),
                new ParamSignature(optional, "filter", "FILTER", new ParameterValidator.FilterValidator()),
                new ParamSignature(optional, "format", "FORMAT", new ParameterValidator.ChannelFormatValidator()),
                new ParamSignature(optional, "channelLayout", "CHANNEL_LAYOUT", new ParameterValidator.ChannelLayoutValidator())
            ];
        }
    }
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
    class PlayDecklinkCommand extends AbstractLayerWithFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "device", "DECKLINK DEVICE", new ParameterValidator.DecklinkDeviceValidator()),
                new ParamSignature(optional, "transition", null, new ParameterValidator.EnumValidator(Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParameterValidator.EnumValidator(Enum.Direction)),
                new ParamSignature(optional, "length", "LENGTH", new ParameterValidator.FrameValidator("LENGTH")),
                new ParamSignature(optional, "filter", "FILTER", new ParameterValidator.FilterValidator()),
                new ParamSignature(optional, "format", "FORMAT", new ParameterValidator.ChannelFormatValidator()),
                new ParamSignature(optional, "channelLayout", "CHANNEL_LAYOUT", new ParameterValidator.ChannelLayoutValidator())
            ];
        }
    }
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
    class LoadHtmlPageBgCommand extends AbstractLayerWithFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "url", "[HTML]", new ParameterValidator.URLValidator()),
                new ParamSignature(optional, "transition", null, new ParameterValidator.EnumValidator(Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParameterValidator.EnumValidator(Enum.Direction)),
                new ParamSignature(optional, "auto", null, new ParameterValidator.BooleanValidatorWithDefaults("AUTO"))
            ];
        }
    }
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
    class LoadHtmlPageCommand extends AbstractLayerWithFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "url", "[HTML]", new ParameterValidator.URLValidator),
                new ParamSignature(optional, "transition", null, new ParameterValidator.EnumValidator(Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParameterValidator.EnumValidator(Enum.Direction)),
            ];
        }
    }
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
    class PlayHtmlPageCommand extends AbstractLayerWithFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(optional, "url", "[HTML]", new ParameterValidator.URLValidator),
                new ParamSignature(optional, "transition", null, new ParameterValidator.EnumValidator(Enum.Transition)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "transitionDirection", null, new ParameterValidator.EnumValidator(Enum.Direction)),
            ];
        }
    }
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
})(AMCP || (AMCP = {}));
/**
 * ICG
 */
(function (AMCP) {
    /**
     *
     */
    class CGAddCommand extends AbstractLayerWithCgFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "ADD", new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(required, "templateName", null, new ParameterValidator.TemplateNameValidator()),
                new ParamSignature(required, "playOnLoad", null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
                new ParamSignature(optional, "data", null, new ParameterValidator.TemplateDataValidator())
            ];
        }
    }
    CGAddCommand.commandString = "CG";
    AMCP.CGAddCommand = CGAddCommand;
    /**
     *
     */
    class CGPlayCommand extends AbstractLayerWithCgFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "PLAY", new ParameterValidator.PositiveNumberValidatorBetween(0))
            ];
        }
    }
    CGPlayCommand.commandString = "CG";
    AMCP.CGPlayCommand = CGPlayCommand;
    /**
     *
     */
    class CGStopCommand extends AbstractLayerWithCgFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "STOP", new ParameterValidator.PositiveNumberValidatorBetween(0))
            ];
        }
    }
    CGStopCommand.commandString = "CG";
    AMCP.CGStopCommand = CGStopCommand;
    /**
     *
     */
    class CGNextCommand extends AbstractLayerWithCgFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "NEXT", new ParameterValidator.PositiveNumberValidatorBetween(0))
            ];
        }
    }
    CGNextCommand.commandString = "CG";
    AMCP.CGNextCommand = CGNextCommand;
    /**
     *
     */
    class CGRemoveCommand extends AbstractLayerWithCgFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "REMOVE", new ParameterValidator.PositiveNumberValidatorBetween(0))
            ];
        }
    }
    CGRemoveCommand.commandString = "CG";
    AMCP.CGRemoveCommand = CGRemoveCommand;
    /**
     *
     */
    class CGClearCommand extends AbstractLayerWithCgFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("CLEAR"))
            ];
            this._objectParams["keyword"] = "CLEAR";
        }
    }
    CGClearCommand.commandString = "CG";
    AMCP.CGClearCommand = CGClearCommand;
    /**
     *
     */
    class CGUpdateCommand extends AbstractLayerWithCgFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "UPDATE", new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(required, "data", null, new ParameterValidator.TemplateDataValidator())
            ];
        }
    }
    CGUpdateCommand.commandString = "CG";
    AMCP.CGUpdateCommand = CGUpdateCommand;
    /**
     * @todo: 201 response code, parsing???????
     */
    class CGInvokeCommand extends AbstractLayerWithCgFallbackCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "flashLayer", "INVOKE", new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(required, "method", null, new ParameterValidator.StringValidator())
            ];
            this.responseProtocol = new ResponseSignature(201);
        }
    }
    CGInvokeCommand.commandString = "CG";
    AMCP.CGInvokeCommand = CGInvokeCommand;
})(AMCP || (AMCP = {}));
/**
 * IMixer
 * @todo: switch 201/202 based on mode
 */
(function (AMCP) {
    /**
     *
     */
    class MixerKeyerCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("KEYER")),
                new ParamSignature(optional, "keyer", null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "KEYER";
        }
    }
    MixerKeyerCommand.commandString = "MIXER";
    MixerKeyerCommand.protocolLogic = [
        new Depends("defer", "keyer")
    ];
    AMCP.MixerKeyerCommand = MixerKeyerCommand;
    /**
     * @todo	Validata/clamp lamp number range?
     */
    class MixerChromaCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("CHROMA")),
                new ParamSignature(optional, "keyer", null, new ParameterValidator.EnumValidator(Enum.Chroma)),
                new ParamSignature(optional, "threshold", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "softness", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "spill", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "CHROMA";
        }
    }
    MixerChromaCommand.commandString = "MIXER";
    MixerChromaCommand.protocolLogic = [
        new Coupled("threshold", "softness"),
        new Depends("keyer", "threshold").ifNot("keyer", Enum.Chroma.NONE),
        new Depends("spill", "threshold"),
        new Depends("transitionDuration", "keyer"),
        new Depends("transitionEasing", "keyer"),
        new Depends("defer", "threshold").ifNot("keyer", Enum.Chroma.NONE)
    ];
    AMCP.MixerChromaCommand = MixerChromaCommand;
    /**
     *
     */
    class MixerBlendCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("BLEND")),
                new ParamSignature(optional, "blendmode", null, new ParameterValidator.EnumValidator(Enum.BlendMode)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "BLEND";
        }
    }
    MixerBlendCommand.commandString = "MIXER";
    MixerBlendCommand.protocolLogic = [
        new Depends("defer", "blendmode")
    ];
    AMCP.MixerBlendCommand = MixerBlendCommand;
    /**
     *
     */
    class MixerOpacityCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("OPACITY")),
                new ParamSignature(optional, "opacity", null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "OPACITY";
        }
    }
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
    class MixerBrightnessCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("BRIGHTNESS")),
                new ParamSignature(optional, "brightness", null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "BRIGHTNESS";
        }
    }
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
    class MixerSaturationCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("SATURATION")),
                new ParamSignature(optional, "saturation", null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "SATURATION";
        }
    }
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
    class MixerContrastCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("CONTRAST")),
                new ParamSignature(optional, "contrast", null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "CONTRAST";
        }
    }
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
    class MixerLevelsCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("LEVELS")),
                new ParamSignature(optional, "minInput", null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "maxInput", null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "gamma", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "minOutput", null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "maxOutput", null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "LEVELS";
        }
    }
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
    class MixerFillCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("FILL")),
                new ParamSignature(optional, "x", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "y", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "xScale", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "yScale", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "FILL";
        }
    }
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
    class MixerClipCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("CLIP")),
                new ParamSignature(optional, "x", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "y", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "width", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "height", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "CLIP";
        }
    }
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
    class MixerAnchorCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("ANCHOR")),
                new ParamSignature(optional, "x", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "y", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "ANCHOR";
        }
    }
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
    class MixerCropCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("CROP")),
                new ParamSignature(optional, "left", null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "top", null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "right", null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "bottom", null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "CROP";
        }
    }
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
    class MixerRotationCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("ROTATION")),
                new ParamSignature(optional, "rotation", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "ROTATION";
        }
    }
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
    class MixerPerspectiveCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("PERSPECTIVE")),
                new ParamSignature(optional, "topLeftX", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "topLeftY", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "topRightX", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "topRightY", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "bottomRightX", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "bottomRightY", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "bottomLeftX", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "bottomLeftY", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.NumberValidator()),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "PERSPECTIVE";
        }
    }
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
    class MixerMipmapCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("MIPMAP")),
                new ParamSignature(optional, "mipmap", null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "MIPMAP";
        }
    }
    MixerMipmapCommand.commandString = "MIXER";
    MixerMipmapCommand.protocolLogic = [
        new Depends("defer", "mipmap")
    ];
    AMCP.MixerMipmapCommand = MixerMipmapCommand;
    /**
     *
     */
    class MixerVolumeCommand extends AbstractLayerWithFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("VOLUME")),
                new ParamSignature(optional, "volume", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "VOLUME";
        }
    }
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
    class MixerMastervolumeCommand extends AbstractChannelCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("MASTERVOLUME")),
                new ParamSignature(optional, "mastervolume", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "MASTERVOLUME";
        }
    }
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
    class MixerStraightAlphaOutputCommand extends AbstractChannelCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("STRAIGHT_ALPHA_OUTPUT")),
                new ParamSignature(optional, "straight_alpha_output", null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "STRAIGHT_ALPHA_OUTPUT";
        }
    }
    MixerStraightAlphaOutputCommand.commandString = "MIXER";
    MixerStraightAlphaOutputCommand.protocolLogic = [
        new Depends("defer", "straight_alpha_output")
    ];
    AMCP.MixerStraightAlphaOutputCommand = MixerStraightAlphaOutputCommand;
    /**
     *
     */
    class MixerGridCommand extends AbstractChannelCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("GRID")),
                new ParamSignature(optional, "resolution", null, new ParameterValidator.PositiveNumberRoundValidatorBetween(1)),
                new ParamSignature(optional, "transitionDuration", null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
                new ParamSignature(optional, "transitionEasing", null, new ParameterValidator.EnumValidator(Enum.Ease)),
                new ParamSignature(optional, "defer", null, new ParameterValidator.BooleanValidatorWithDefaults("DEFER"))
            ];
            this._objectParams["keyword"] = "GRID";
        }
    }
    MixerGridCommand.commandString = "MIXER";
    AMCP.MixerGridCommand = MixerGridCommand;
    /**
     *
     */
    class MixerCommitCommand extends AbstractChannelCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("COMMIT"))
            ];
            this._objectParams["keyword"] = "COMMIT";
        }
    }
    MixerCommitCommand.commandString = "MIXER";
    AMCP.MixerCommitCommand = MixerCommitCommand;
    /**
     *
     */
    class MixerClearCommand extends AbstractChannelOrLayerCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "keyword", null, new ParameterValidator.KeywordValidator("CLEAR"))
            ];
            this._objectParams["keyword"] = "CLEAR";
        }
    }
    MixerClearCommand.commandString = "MIXER";
    AMCP.MixerClearCommand = MixerClearCommand;
})(AMCP || (AMCP = {}));
/**
 * IChannel
 */
(function (AMCP) {
    /**
     *
     */
    class ClearCommand extends AbstractChannelOrLayerCommand {
    }
    ClearCommand.commandString = "CLEAR";
    AMCP.ClearCommand = ClearCommand;
    /**
     *
     */
    class CallCommand extends AbstractLayerWithFallbackCommand {
    }
    CallCommand.commandString = "CALL";
    AMCP.CallCommand = CallCommand;
    /**
     *
     */
    class SwapCommand extends AbstractChannelOrLayerCommand {
        /**
         *
         */
        constructor() {
            super("1-1"); // @todo: foo
            // @todo: custom parameters dual layerOrchannel with 1 optional param
            // overloading in method
        }
    }
    SwapCommand.commandString = "SWAP";
    AMCP.SwapCommand = SwapCommand;
    /**
     *
     */
    class AddCommand extends AbstractChannelCommand {
    }
    AddCommand.commandString = "ADD";
    AMCP.AddCommand = AddCommand;
    /**
     *
     */
    class RemoveCommand extends AbstractChannelOrLayerCommand {
    }
    RemoveCommand.commandString = "REMOVE";
    AMCP.RemoveCommand = RemoveCommand;
    /**
     *
     */
    class PrintCommand extends AbstractChannelCommand {
    }
    PrintCommand.commandString = "PRINT";
    AMCP.PrintCommand = PrintCommand;
    /**
     *
     */
    class SetCommand extends AbstractChannelCommand {
    }
    SetCommand.commandString = "SET";
    AMCP.SetCommand = SetCommand;
    /**
     *
     */
    class LockCommand extends AbstractChannelCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "action", null, new ParameterValidator.EnumValidator(Enum.Lock)),
                new ParamSignature(optional, "phrase", null, new ParameterValidator.StringValidator())
            ];
        }
    }
    LockCommand.commandString = "LOCK";
    LockCommand.protocolLogic = [
        new Depends("action", "phrase").ifNot("action", Enum.Lock.RELEASE)
    ];
    AMCP.LockCommand = LockCommand;
    /**
     *
     */
    class ChannelGridCommand extends AbstractCommand {
    }
    ChannelGridCommand.commandString = "CHANNEL_GRID";
    AMCP.ChannelGridCommand = ChannelGridCommand;
    /**
     *
     */
    class GlGCCommand extends AbstractCommand {
    }
    GlGCCommand.commandString = "GL GC";
    AMCP.GlGCCommand = GlGCCommand;
})(AMCP || (AMCP = {}));
/**
 * IData
 */
(function (AMCP) {
    /**
     *
     */
    class DataStoreCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "fileName", null, new ParameterValidator.DataNameValidator()),
                new ParamSignature(required, "data", null, new ParameterValidator.TemplateDataValidator())
            ];
        }
    }
    DataStoreCommand.commandString = "DATA STORE";
    AMCP.DataStoreCommand = DataStoreCommand;
    /**
     *
     */
    class DataRetrieveCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "fileName", null, new ParameterValidator.DataNameValidator())
            ];
            this.responseProtocol = new ResponseSignature(201, ResponseValidator.DataValidator, ResponseParser.DataParser);
        }
    }
    DataRetrieveCommand.commandString = "DATA RETRIEVE";
    AMCP.DataRetrieveCommand = DataRetrieveCommand;
    /**
     *
     */
    class DataListCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.DataListParser);
        }
    }
    DataListCommand.commandString = "DATA LIST";
    AMCP.DataListCommand = DataListCommand;
    /**
     *
     */
    class DataRemoveCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "fileName", null, new ParameterValidator.DataNameValidator())
            ];
        }
    }
    DataRemoveCommand.commandString = "DATA REMOVE";
    AMCP.DataRemoveCommand = DataRemoveCommand;
})(AMCP || (AMCP = {}));
/**
 * IThumbnail
 */
(function (AMCP) {
    /**
     *
     */
    class ThumbnailListCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            // responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ThumbnailListParser);
            this.responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ThumbnailListParser);
        }
    }
    ThumbnailListCommand.commandString = "THUMBNAIL LIST";
    AMCP.ThumbnailListCommand = ThumbnailListCommand;
    /**
     *
     */
    class ThumbnailRetrieveCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "fileName", null, new ParameterValidator.ClipNameValidator())
            ];
            this.responseProtocol = new ResponseSignature(201, ResponseValidator.Base64Validator, ResponseParser.ThumbnailParser);
        }
    }
    ThumbnailRetrieveCommand.commandString = "THUMBNAIL RETRIEVE";
    AMCP.ThumbnailRetrieveCommand = ThumbnailRetrieveCommand;
    /**
     *
     */
    class ThumbnailGenerateCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "fileName", null, new ParameterValidator.ClipNameValidator())
            ];
        }
    }
    ThumbnailGenerateCommand.commandString = "THUMBNAIL GENERATE";
    AMCP.ThumbnailGenerateCommand = ThumbnailGenerateCommand;
    /**
     *
     */
    class ThumbnailGenerateAllCommand extends AbstractCommand {
    }
    ThumbnailGenerateAllCommand.commandString = "THUMBNAIL GENERATE_ALL";
    AMCP.ThumbnailGenerateAllCommand = ThumbnailGenerateAllCommand;
})(AMCP || (AMCP = {}));
/**
 * IInfo
 */
(function (AMCP) {
    /**
     *
     */
    class CinfCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "fileName", null, new ParameterValidator.ClipNameValidator())
            ];
            this.responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.CinfParser);
        }
    }
    CinfCommand.commandString = "CINF";
    AMCP.CinfCommand = CinfCommand;
    /**
     *
     */
    class ClsCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ContentParser);
        }
    }
    ClsCommand.commandString = "CLS";
    AMCP.ClsCommand = ClsCommand;
    /**
     *
     */
    class FlsCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ContentParser);
        }
    }
    FlsCommand.commandString = "FLS";
    AMCP.FlsCommand = FlsCommand;
    /**
     *
     */
    class TlsCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ContentParser);
        }
    }
    TlsCommand.commandString = "TLS";
    AMCP.TlsCommand = TlsCommand;
    /**
     *
     */
    class VersionCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(optional, "component", null, new ParameterValidator.EnumValidator(Enum.Version))
            ];
            this.responseProtocol = new ResponseSignature(201, ResponseValidator.StringValidator, ResponseParser.VersionParser);
        }
    }
    VersionCommand.commandString = "VERSION";
    AMCP.VersionCommand = VersionCommand;
    /**
     *
     */
    class InfoCommand extends AbstractOrChannelOrLayerCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ChannelParser);
            if (this.channel && this.channel > -1) {
                this.responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoParser);
            }
        }
    }
    InfoCommand.commandString = "INFO";
    AMCP.InfoCommand = InfoCommand;
    /**
     *
     */
    class InfoTemplateCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(required, "template", null, new ParameterValidator.TemplateNameValidator())
            ];
            this.responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoTemplateParser);
        }
    }
    InfoTemplateCommand.commandString = "INFO TEMPLATE";
    AMCP.InfoTemplateCommand = InfoTemplateCommand;
    /**
     *
     */
    class InfoConfigCommand extends AbstractCommand {
        /**
         *
         */
        constructor(params, context) {
            super(params, context);
            this.responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.ConfigParser);
        }
    }
    InfoConfigCommand.commandString = "INFO CONFIG";
    AMCP.InfoConfigCommand = InfoConfigCommand;
    /**
     *
     */
    class InfoPathsCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoPathsParser);
        }
    }
    InfoPathsCommand.commandString = "INFO PATHS";
    AMCP.InfoPathsCommand = InfoPathsCommand;
    /**
     *
     */
    class InfoSystemCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoSystemParser);
        }
    }
    InfoSystemCommand.commandString = "INFO SYSTEM";
    AMCP.InfoSystemCommand = InfoSystemCommand;
    /**
     *
     */
    class InfoServerCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoServerParser);
        }
    }
    InfoServerCommand.commandString = "INFO SERVER";
    AMCP.InfoServerCommand = InfoServerCommand;
    /**
     *
     */
    class InfoQueuesCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoQueuesParser);
        }
    }
    InfoQueuesCommand.commandString = "INFO QUEUES";
    AMCP.InfoQueuesCommand = InfoQueuesCommand;
    /**
     *
     */
    class InfoThreadsCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.InfoThreadsParser);
        }
    }
    InfoThreadsCommand.commandString = "INFO THREADS";
    AMCP.InfoThreadsCommand = InfoThreadsCommand;
    /**
     *
     */
    class InfoDelayCommand extends AbstractChannelOrLayerCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "delay", null, new ParameterValidator.KeywordValidator("DELAY"))
            ];
            this.responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoDelayParser);
            this._objectParams["delay"] = "DELAY";
        }
    }
    InfoDelayCommand.commandString = "INFO";
    AMCP.InfoDelayCommand = InfoDelayCommand;
    /**
     * @todo: response validator/parser
     */
    class CGInfoCommand extends AbstractLayerWithCgFallbackCommand {
        /**
         *
         */
        constructor(params) {
            super(params);
            this.paramProtocol = [
                new ParamSignature(required, "info", null, new ParameterValidator.KeywordValidator("INFO")),
                new ParamSignature(optional, "flashLayer", null, new ParameterValidator.PositiveNumberValidatorBetween(0))
            ];
            this.responseProtocol = new ResponseSignature(201);
            this._objectParams["info"] = "INFO";
        }
    }
    CGInfoCommand.commandString = "CG";
    AMCP.CGInfoCommand = CGInfoCommand;
    /**
     *
     */
    class GlInfoCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.GLParser);
        }
    }
    GlInfoCommand.commandString = "GL INFO";
    AMCP.GlInfoCommand = GlInfoCommand;
    /**
     *
     */
    class LogLevelCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(optional, "level", null, new ParameterValidator.EnumValidator(Enum.LogLevel))
            ];
        }
    }
    LogLevelCommand.commandString = "LOG LEVEL";
    AMCP.LogLevelCommand = LogLevelCommand;
    /**
     * @protocol	Needs either `calltrace` or `communication` parameter.
     */
    class LogCategoryCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(optional, "calltrace", Enum.LogCategory.CALLTRACE.value, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
                new ParamSignature(optional, "communication", Enum.LogCategory.COMMUNICATION.value, new ParameterValidator.BooleanValidatorWithDefaults(1, 0))
            ];
        }
    }
    LogCategoryCommand.commandString = "LOG CATEGORY";
    LogCategoryCommand.protocolLogic = [
        new OneOf("calltrace", "communication")
    ];
    AMCP.LogCategoryCommand = LogCategoryCommand;
    /**
     *
     */
    class DiagCommand extends AbstractCommand {
    }
    DiagCommand.commandString = "DIAG";
    AMCP.DiagCommand = DiagCommand;
    /**
     * @todo: mixed mode!!!!
     * 202/201
     */
    class HelpCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(optional, "command", null, new ParameterValidator.EnumValidator(Enum.Command))
            ];
            this.responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.HelpParser);
        }
    }
    HelpCommand.commandString = "HELP";
    AMCP.HelpCommand = HelpCommand;
    /**
     *
     */
    class HelpProducerCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(optional, "producer", null, new ParameterValidator.EnumValidator(Enum.Producer))
            ];
            this.responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.HelpParser);
        }
    }
    HelpProducerCommand.commandString = "HELP PRODUCER";
    AMCP.HelpProducerCommand = HelpProducerCommand;
    /**
     *
     */
    class HelpConsumerCommand extends AbstractCommand {
        constructor() {
            super(...arguments);
            this.paramProtocol = [
                new ParamSignature(optional, "consumer", null, new ParameterValidator.EnumValidator(Enum.Consumer))
            ];
            this.responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.HelpParser);
        }
    }
    HelpConsumerCommand.commandString = "HELP CONSUMER";
    AMCP.HelpConsumerCommand = HelpConsumerCommand;
})(AMCP || (AMCP = {}));
/**
 * IOperation
 */
(function (AMCP) {
    /**
     * @todo: response
     */
    class ByeCommand extends AbstractCommand {
    }
    ByeCommand.commandString = "BYE";
    AMCP.ByeCommand = ByeCommand;
    /**
     * @todo: response
     */
    class KillCommand extends AbstractCommand {
    }
    KillCommand.commandString = "KILL";
    AMCP.KillCommand = KillCommand;
    /**
     * @todo: response
     */
    class RestartCommand extends AbstractCommand {
    }
    RestartCommand.commandString = "RESTART";
    AMCP.RestartCommand = RestartCommand;
})(AMCP || (AMCP = {}));
