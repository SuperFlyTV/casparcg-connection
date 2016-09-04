import {Enum} from "./ServerStateEnum";
// Command NS
import {Command as CommandNS} from "./AbstractCommand";
import IAMCPCommand = CommandNS.IAMCPCommand;
import IAMCPCommandVO = CommandNS.IAMCPCommandVO;
import isIAMCPCommand = CommandNS.isIAMCPCommand;
import AbstractCommand = CommandNS.AbstractCommand;
import AbstractOrChannelOrLayerCommand = CommandNS.AbstractOrChannelOrLayerCommand;
import AbstractChannelCommand = CommandNS.AbstractChannelCommand;
import AbstractChannelOrLayerCommand = CommandNS.AbstractChannelOrLayerCommand;
import AbstractLayerCommand = CommandNS.AbstractLayerCommand;
import AbstractLayerWithFallbackCommand = CommandNS.AbstractLayerWithFallbackCommand;
import AbstractLayerWithCgFallbackCommand = CommandNS.AbstractLayerWithCgFallbackCommand;
// Param NS
import {Param as ParamNS, optional, required} from "./ParamSignature";
import Param = ParamNS.Param;
import ParamSignature = ParamNS.ParamSignature;
// Validation NS
import {Validation as ValidationNS} from "./ParamValidators";
import BooleanValidatorWithDefaults = ValidationNS.BooleanValidatorWithDefaults;
import BooleanValidator = ValidationNS.BooleanValidator;
import StringValidator = ValidationNS.StringValidator;
import ClipNameValidator = ValidationNS.ClipNameValidator;
import TemplateNameValidator = ValidationNS.TemplateNameValidator;
import DataNameValidator = ValidationNS.DataNameValidator;
import EnumValidator = ValidationNS.EnumValidator;
import KeywordValidator = ValidationNS.KeywordValidator;
import FrameValidator = ValidationNS.FrameValidator;
import PositiveNumberValidatorBetween = ValidationNS.PositiveNumberValidatorBetween;
import NumberValidator = ValidationNS.NumberValidator;
import PositiveNumberValidator = ValidationNS.NumberValidator;
import PositiveNumberRoundValidatorBetween = ValidationNS.PositiveNumberRoundValidatorBetween;
import TemplateDataValidator = ValidationNS.TemplateDataValidator;
// Protocol NS
import {Protocol as ProtocolNS} from "./ProtocolLogic";
import IProtocolLogic = ProtocolNS.IProtocolLogic;
import Depends = ProtocolNS.Depends;
import Coupled = ProtocolNS.Coupled;
import OneOf = ProtocolNS.OneOf;

/**
 * Factory
 */
export namespace AMCPUtil {

	/**
	 * 
	 */
	export function deSerialize(cmd: IAMCPCommandVO, id: string): IAMCPCommand {

		// errror: commandstatus -1 //invalid command

		// @todo: error handling much?????? (callback??????)
		let command: IAMCPCommand = Object.create(AMCP[cmd._commandName]["prototype"]);
		command.constructor.call(command, cmd._objectParams);
		command.populate(cmd, id);
		return command;
	}
}

/**
 * Internal
 */
export namespace AMCP {
	export class CustomCommand extends AbstractCommand {
		static commandString = "";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "command", null, new StringValidator(false))
		);
	}
}

/**
 * IVideo
 */
export namespace AMCP {
	/**
	 * 
	 */
	export class LoadbgCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "LOADBG";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "clip", null, ClipNameValidator),
			new ParamSignature(optional, "loop", null, new BooleanValidatorWithDefaults("LOOP")),
			new ParamSignature(optional, "transition", null, new EnumValidator(Enum.Transition)),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "transitionDirection", null, new EnumValidator(Enum.Direction)),
			new ParamSignature(optional, "seek", "SEEK", new FrameValidator("SEEK")),
			new ParamSignature(optional, "length", "LENGTH", new  FrameValidator("LENGTH")),
			new ParamSignature(optional, "filter", "FILTER", new StringValidator()),
			new ParamSignature(optional, "auto", null, new BooleanValidatorWithDefaults("AUTO"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("transitionDuration", "transition"),
			new Depends("transitionEasing", "transition"),
			new Depends("transitionDirection", "transition")
		);
	}

	/**
	 * 
	 */
	export class LoadCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "LOAD";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "clip", null, ClipNameValidator),
			new ParamSignature(optional, "loop", null, new BooleanValidatorWithDefaults("LOOP")),
			new ParamSignature(optional, "transition", null, new EnumValidator(Enum.Transition)),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "transitionDirection", null, new EnumValidator(Enum.Direction)),
			new ParamSignature(optional, "seek", "SEEK", new FrameValidator("SEEK")),
			new ParamSignature(optional, "length", "LENGTH", new  FrameValidator("LENGTH")),
			new ParamSignature(optional, "filter", "FILTER", new StringValidator()),
			new ParamSignature(optional, "auto", null, new BooleanValidatorWithDefaults("AUTO"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("transitionDuration", "transition"),
			new Depends("transitionEasing", "transition"),
			new Depends("transitionDirection", "transition")
		);
	}

	/**
	 * 
	 */
	export class PlayCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "PLAY";
		protocol = new Array<ParamSignature>(
			new ParamSignature(optional, "clip", null, ClipNameValidator),
			new ParamSignature(optional, "loop", null, new BooleanValidatorWithDefaults("LOOP")),
			new ParamSignature(optional, "transition", null, new EnumValidator(Enum.Transition)),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "transitionDirection", null, new EnumValidator(Enum.Direction)),
			new ParamSignature(optional, "seek", "SEEK", new FrameValidator("SEEK")),
			new ParamSignature(optional, "length", "LENGTH", new  FrameValidator("LENGTH")),
			new ParamSignature(optional, "filter", "FILTER", new StringValidator()),
			new ParamSignature(optional, "auto", null, new BooleanValidatorWithDefaults("AUTO"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("loop", "clip"),
			new Depends("seek", "clip"),
			new Depends("length", "clip"),
			new Depends("filter", "clip"),
			new Depends("auto", "clip"),
			new Depends("transition", "clip"),
			new Depends("transitionDuration", "clip"),
			new Depends("transitionEasing", "clip"),
			new Depends("transitionDirection", "clip"),
			new Depends("transitionDuration", "transition"),
			new Depends("transitionEasing", "transition"),
			new Depends("transitionDirection", "transition")
		);

	}

	/**
	 * 
	 */
	export class PauseCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "PAUSE";
	}

	/**
	 * 
	 */
	export class ResumeCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "RESUME";
	}

	/**
	 * 
	 */
	export class StopCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "STOP";
	}
}

/**
 * ICG
 */
export namespace AMCP {
	/**
	 * 
	 */
	export class CGAddCommand extends AbstractLayerWithCgFallbackCommand {
		static commandString = "CG";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "flashLayer", "ADD", new PositiveNumberValidatorBetween(0)),
			new ParamSignature(required, "templateName", null, new TemplateNameValidator()),
			new ParamSignature(required, "playOnLoad", null, new BooleanValidatorWithDefaults(1, 0)),
			new ParamSignature(optional, "data", null, new TemplateDataValidator())
		);
	}

	/**
	 * 
	 */
	export class CGPlayCommand extends AbstractLayerWithCgFallbackCommand {
		static commandString = "CG";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "flashLayer", "PLAY", new PositiveNumberValidatorBetween(0))
		);
	}

	/**
	 * 
	 */
	export class CGStopCommand extends AbstractLayerWithCgFallbackCommand {
		static commandString = "CG";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "flashLayer", "STOP", new PositiveNumberValidatorBetween(0))
		);
	}

	/**
	 * 
	 */
	export class CGNextCommand extends AbstractLayerWithCgFallbackCommand {
		static commandString = "CG";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "flashLayer", "NEXT", new PositiveNumberValidatorBetween(0))
		);
	}

	/**
	 * 
	 */
	export class CGRemoveCommand extends AbstractLayerWithCgFallbackCommand {
		static commandString = "CG";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "flashLayer", "REMOVE", new PositiveNumberValidatorBetween(0))
		);
	}

	/**
	 * 
	 */
	export class CGClearCommand extends AbstractLayerWithCgFallbackCommand {
		static commandString = "CG CLEAR";
	}

	/**
	 * 
	 */
	export class CGUpdateCommand extends AbstractLayerWithCgFallbackCommand {
		static commandString = "CG";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "flashLayer", "UPDATE", new PositiveNumberValidatorBetween(0)),
			new ParamSignature(required, "data", null, new TemplateDataValidator())
		);
	}

	/**
	 * 
	 */
	export class CGInvokeCommand extends AbstractLayerWithCgFallbackCommand {
		static commandString = "CG";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "flashLayer", "INVOKE", new PositiveNumberValidatorBetween(0)),
			new ParamSignature(required, "method", null, new StringValidator())
		);
	}
}

/**
 * IMixer
 */
export namespace AMCP {
	/**
	 * 
	 */
	export class MixerKeyerCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("KEYER")),
			new ParamSignature(optional, "keyer", null, new BooleanValidatorWithDefaults(1, 0)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("defer", "keyer")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "KEYER";
		}
	}

	/**
	 * @todo	Validata/clamp lamp number range?
	 */
	export class MixerChromaCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("CHROMA")),
			new ParamSignature(optional, "keyer", null, new EnumValidator(Enum.Chroma)),
			new ParamSignature(optional, "threshold", null, new NumberValidator()),
			new ParamSignature(optional, "softness", null, new NumberValidator()),
			new ParamSignature(optional, "spill", null, new NumberValidator()),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Coupled("threshold", "softness"),
			new Depends("keyer", "threshold").ifNot("keyer", Enum.Chroma.NONE),
			new Depends("spill", "threshold"),
			new Depends("transitionDuration", "keyer"),
			new Depends("transitionEasing", "keyer"),
			new Depends("defer", "threshold").ifNot("keyer", Enum.Chroma.NONE)
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "CHROMA";
		}
	}

	/**
	 * 
	 */
	export class MixerBlendCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("BLEND")),
			new ParamSignature(optional, "blendmode", null, new EnumValidator(Enum.BlendMode)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("defer", "blendmode")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "BLEND";
		}
	}

	/**
	 * 
	 */
	export class MixerOpacityCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("OPACITY")),
			new ParamSignature(optional, "opacity", null, new PositiveNumberValidatorBetween(0, 1)),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("transitionDuration", "opacity"),
			new Depends("transitionEasing", "opacity"),
			new Depends("defer", "opacity")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "OPACITY";
		}
	}

	/**
	 * 
	 */
	export class MixerBrightnessCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("BRIGHTNESS")),
			new ParamSignature(optional, "brightness", null, new PositiveNumberValidatorBetween(0, 1)),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("transitionDuration", "brightness"),
			new Depends("transitionEasing", "brightness"),
			new Depends("defer", "brightness")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "BRIGHTNESS";
		}
	}

	/**
	 * 
	 */
	export class MixerSaturationCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("SATURATION")),
			new ParamSignature(optional, "saturation", null, new PositiveNumberValidatorBetween(0, 1)),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("transitionDuration", "saturation"),
			new Depends("transitionEasing", "saturation"),
			new Depends("defer", "saturation")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "SATURATION";
		}
	}

	/**
	 * 
	 */
	export class MixerContrastCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("CONTRAST")),
			new ParamSignature(optional, "contrast", null, new PositiveNumberValidatorBetween(0, 1)),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("transitionDuration", "contrast"),
			new Depends("transitionEasing", "contrast"),
			new Depends("defer", "contrast")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "CONTRAST";
		}
	}

	/**
	 * @todo:	verify `gamma` value range
	 */
	export class MixerLevelsCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("LEVELS")),
			new ParamSignature(optional, "minInput", null, new PositiveNumberValidatorBetween(0, 1)),
			new ParamSignature(optional, "maxInput", null, new PositiveNumberValidatorBetween(0, 1)),
			new ParamSignature(optional, "gamma", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "minOutput", null, new PositiveNumberValidatorBetween(0, 1)),
			new ParamSignature(optional, "maxOutput", null, new PositiveNumberValidatorBetween(0, 1)),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Coupled("minInput", "maxInput", "gamma", "minOutput", "maxOutput"),
			new Depends("transitionDuration", "minInput"),
			new Depends("transitionEasing", "minInput"),
			new Depends("defer", "minInput")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "LEVELS";
		}
	}

	/**
	 * 
	 */
	export class MixerFillCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("FILL")),
			new ParamSignature(optional, "x", null, new NumberValidator()),
			new ParamSignature(optional, "y", null, new NumberValidator()),
			new ParamSignature(optional, "xScale", null, new NumberValidator()),
			new ParamSignature(optional, "yScale", null, new NumberValidator()),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Coupled("x", "y", "xScale", "yScale"),
			new Depends("transitionDuration", "x"),
			new Depends("transitionEasing", "x"),
			new Depends("defer", "x")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "FILL";
		}
	}

	/**
	 * 
	 */
	export class MixerClipCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("CLIP")),
			new ParamSignature(optional, "x", null, new NumberValidator()),
			new ParamSignature(optional, "y", null, new NumberValidator()),
			new ParamSignature(optional, "width", null, new NumberValidator()),
			new ParamSignature(optional, "height", null, new NumberValidator()),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Coupled("x", "y", "width", "height"),
			new Depends("transitionDuration", "x"),
			new Depends("transitionEasing", "x"),
			new Depends("defer", "x")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "CLIP";
		}
	}

	/**
	 * 
	 */
	export class MixerAnchorCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("ANCHOR")),
			new ParamSignature(optional, "x", null, new NumberValidator()),
			new ParamSignature(optional, "y", null, new NumberValidator()),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Coupled("x", "y"),
			new Depends("transitionDuration", "x"),
			new Depends("transitionEasing", "x"),
			new Depends("defer", "x")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "ANCHOR";
		}
	}

	/**
	 * 
	 */
	export class MixerCropCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("CROP")),
			new ParamSignature(optional, "left", null, new PositiveNumberValidatorBetween(0, 1)),
			new ParamSignature(optional, "top", null, new PositiveNumberValidatorBetween(0, 1)),
			new ParamSignature(optional, "right", null, new PositiveNumberValidatorBetween(0, 1)),
			new ParamSignature(optional, "bottom", null, new PositiveNumberValidatorBetween(0, 1)),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Coupled("left", "top", "right", "bottom"),
			new Depends("transitionDuration", "x"),
			new Depends("transitionEasing", "x"),
			new Depends("defer", "x")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "CROP";
		}
	}

	/**
	 * 
	 */
	export class MixerRotationCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("ROTATION")),
			new ParamSignature(optional, "rotation", null, new NumberValidator()),
			new ParamSignature(optional, "transitionDuration", null, new NumberValidator()),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("transitionDuration", "rotation"),
			new Depends("transitionEasing", "rotation"),
			new Depends("defer", "rotation")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "ROTATION";
		}
	}

	/**
	 * 
	 */
	export class MixerPerspectiveCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("PERSPECTIVE")),
			new ParamSignature(optional, "topLeftX", null, new NumberValidator()),
			new ParamSignature(optional, "topLeftY", null, new NumberValidator()),
			new ParamSignature(optional, "topRightX", null, new NumberValidator()),
			new ParamSignature(optional, "topRightY", null, new NumberValidator()),
			new ParamSignature(optional, "bottomRightX", null, new NumberValidator()),
			new ParamSignature(optional, "bottomRightY", null, new NumberValidator()),
			new ParamSignature(optional, "bottomLeftX", null, new NumberValidator()),
			new ParamSignature(optional, "bottomLeftY", null, new NumberValidator()),
			new ParamSignature(optional, "transitionDuration", null, new NumberValidator()),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Coupled("topLeftX", "topLeftY", "topRightX", "topRightY", "bottomRightX", "bottomRightY", "bottomLeftX", "bottomLeftY"),
			new Depends("transitionDuration", "topLeftX"),
			new Depends("transitionEasing", "topLeftX"),
			new Depends("defer", "topLeftX")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "PERSPECTIVE";
		}
	}

	/**
	 * 
	 */
	export class MixerMipmapCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("MIPMAP")),
			new ParamSignature(optional, "mipmap", null, new BooleanValidatorWithDefaults(1, 0)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("defer", "mipmap")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "MIPMAP";
		}
	}

	/**
	 * 
	 */
	export class MixerVolumeCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("VOLUME")),
			new ParamSignature(optional, "volume", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("transitionDuration", "volume"),
			new Depends("transitionEasing", "volume"),
			new Depends("defer", "volume")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "VOLUME";
		}
	}

	/**
	 * 
	 */
	export class MixerMastervolumeCommand extends AbstractChannelOrLayerCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("MASTERVOLUME")),
			new ParamSignature(optional, "mastervolume", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("transitionDuration", "mastervolume"),
			new Depends("transitionEasing", "mastervolume"),
			new Depends("defer", "mastervolume")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "MASTERVOLUME";
		}
	}

	/**
	 * 
	 */
	export class MixerStraightAlphaOutputCommand extends AbstractChannelCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("STRAIGHT_ALPHA_OUTPUT")),
			new ParamSignature(optional, "straight_alpha_output", null, new BooleanValidatorWithDefaults(1, 0)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("defer", "straight_alpha_output")
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "STRAIGHT_ALPHA_OUTPUT";
		}
	}

	/**
	 * 
	 */
	export class MixerGridCommand extends AbstractChannelCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("GRID")),
			new ParamSignature(optional, "resolution", null, new PositiveNumberRoundValidatorBetween(1)),
			new ParamSignature(optional, "transitionDuration", null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, "transitionEasing", null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, "defer", null, new BooleanValidatorWithDefaults("DEFER"))
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "GRID";
		}
	}

	/**
	 * 
	 */
	export class MixerCommitCommand extends AbstractChannelCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("COMMIT"))
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "COMMIT";
		}
	}

	/**
	 * 
	 */
	export class MixerClearCommand extends AbstractChannelOrLayerCommand {
		static commandString = "MIXER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "keyword", null, new KeywordValidator("CLEAR"))
		);

		/**
		 *  
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["keyword"] = "CLEAR";
		}
	}
}

/**
 * IChannel
 */
export namespace AMCP {
	/**
	 * 
	 */
	export class ClearCommand extends AbstractChannelOrLayerCommand {
		static commandString = "CLEAR";
	}

	/**
	 * 
	 */
	export class CallCommand extends AbstractLayerWithFallbackCommand {
		static commandString = "CALL";
	}

	/**
	 * 
	 */
	export class SwapCommand extends AbstractChannelOrLayerCommand {
		static commandString = "SWAP";

		/**
		 * 
		 */
		constructor() {
			super("1-1"); // @todo: foo
			// @todo: custom parameters dual layerOrchannel with 1 optional param
			// overloading in method
		}

	}

	/**
	 * 
	 */
	export class AddCommand extends AbstractChannelCommand {
		static commandString = "ADD";
	}

	/**
	 * 
	 */
	export class RemoveCommand extends AbstractChannelOrLayerCommand {
		static commandString = "REMOVE";
	}

	/**
	 * 
	 */
	export class PrintCommand extends AbstractChannelCommand {
		static commandString = "PRINT";
	}

	/**
	 * 
	 */
	export class SetCommand extends AbstractChannelCommand {
		static commandString = "SET";
	}

	/**
	 * 
	 */
	export class LockCommand extends AbstractChannelCommand {
		static commandString = "LOCK";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "action", null, new EnumValidator(Enum.Lock)),
			new ParamSignature(optional, "phrase", null, new StringValidator())
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new Depends("action", "phrase").ifNot("action", Enum.Lock.RELEASE)
		);
	}

	/**
	 * 
	 */
	export class ChannelGridCommand extends AbstractCommand {
		static commandString = "CHANNEL_GRID";
	}

	/**
	 * 
	 */
	export class GlGCCommand extends AbstractCommand {
		static commandString = "GL GC";
	}
}

/**
 * IData
 */
export namespace AMCP {
	/**
	 * 
	 */
	export class DataStoreCommand extends AbstractCommand {
		static commandString = "DATA STORE";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "fileName", null, new DataNameValidator()),
			new ParamSignature(required, "data", null, new TemplateDataValidator())
		);
	}

	/**
	 * 
	 */
	export class DataRetrieveCommand extends AbstractCommand {
		static commandString = "DATA RETRIEVE";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "fileName", null, new DataNameValidator())
		);
	}

	/**
	 * 
	 */
	export class DataListCommand extends AbstractCommand {
		static commandString = "DATA LIST";
	}

	/**
	 * 
	 */
	export class DataRemoveCommand extends AbstractCommand {
		static commandString = "DATA REMOVE";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "fileName", null, new DataNameValidator())
		);
	}
}

/**
 * IThumbnail
 */
export namespace AMCP {
	/**
	 * 
	 */
	export class ThumbnailListCommand extends AbstractCommand {
		static commandString = "THUMBNAIL LIST";
	}

	/**
	 * 
	 */
	export class ThumbnailRetrieveCommand extends AbstractCommand {
		static commandString = "THUMBNAIL RETRIEVE";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "fileName", null, new ClipNameValidator())
		);
	}

	/**
	 * 
	 */
	export class ThumbnailGenerateCommand extends AbstractCommand {
		static commandString = "THUMBNAIL GENERATE";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "fileName", null, new ClipNameValidator())
		);
	}

	/**
	 * 
	 */
	export class ThumbnailGenerateAllCommand extends AbstractCommand {
		static commandString = "THUMBNAIL GENERATE_ALL";
	}
}

/**
 * IInfo
 */
export namespace AMCP {
	/**
	 * 
	 */
	export class CinfCommand extends AbstractCommand {
		static commandString = "CINF";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "fileName", null, new ClipNameValidator())
		);
	}

	/**
	 * 
	 */
	export class ClsCommand extends AbstractCommand {
		static commandString = "CLS";
	}

	/**
	 * 
	 */
	export class FlsCommand extends AbstractCommand {
		static commandString = "FLS";
	}

	/**
	 * 
	 */
	export class TlsCommand extends AbstractCommand {
		static commandString = "TLS";
	}

	/**
	 * 
	 */
	export class VersionCommand extends AbstractCommand {
		static commandString = "VERSION";
		protocol = new Array<ParamSignature>(
			new ParamSignature(optional, "component", null, new EnumValidator(Enum.Version))
		);
	}

	/**
	 * 
	 */
	export class InfoCommand extends AbstractOrChannelOrLayerCommand {
		static commandString = "INFO";
	}

	/**
	 * 
	 */
	export class InfoTemplateCommand extends AbstractCommand {
		static commandString = "INFO TEMPLATE";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "template", null, new TemplateNameValidator())
		);
	}

	/**
	 * 
	 */
	export class InfoConfigCommand extends AbstractCommand {
		static commandString = "INFO CONFIG";
	}

	/**
	 * 
	 */
	export class InfoPathsCommand extends AbstractCommand {
		static commandString = "INFO PATHS";
	}

	/**
	 * 
	 */
	export class InfoSystemCommand extends AbstractCommand {
		static commandString = "INFO SYSTEM";
	}

	/**
	 * 
	 */
	export class InfoServerCommand extends AbstractCommand {
		static commandString = "INFO SERVER";
	}

	/**
	 * 
	 */
	export class InfoQueuesCommand extends AbstractCommand {
		static commandString = "INFO QUEUES";
	}

	/**
	 * 
	 */
	export class InfoThreadsCommand extends AbstractCommand {
		static commandString = "INFO THREADS";
	}

	/**
	 * 
	 */
	export class InfoDelayCommand extends AbstractChannelOrLayerCommand {
		static commandString = "INFO";
		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "delay", null, new KeywordValidator("DELAY"))
		);

		/**
		 * 
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["delay"] = "DELAY";
		}
	}

	/**
	 * 
	 */
	export class CGInfoCommand extends AbstractLayerWithCgFallbackCommand {
		static commandString = "CG";

		protocol = new Array<ParamSignature>(
			new ParamSignature(required, "info", null, new KeywordValidator("INFO")),
			new ParamSignature(optional, "flashLayer", null, new PositiveNumberValidatorBetween(0))
		);

		/**
		 * 
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			this._objectParams["info"] = "INFO";
		}
	}

	/**
	 * 
	 */
	export class GlInfoCommand extends AbstractCommand {
		static commandString = "GL INFO";
	}

	/**
	 * 
	 */
	export class LogLevelCommand extends AbstractCommand {
		static commandString = "LOG LEVEL";
		protocol = new Array<ParamSignature>(
			new ParamSignature(optional, "level", null, new EnumValidator(Enum.LogLevel))
		);
	}

	/**
	 * @protocol	Needs either `calltrace` or `communication` parameter.
	 */
	export class LogCategoryCommand extends AbstractCommand {
		static commandString = "LOG CATEGORY";
		protocol = new Array<ParamSignature>(
			new ParamSignature(optional, "calltrace", Enum.LogCategory.CALLTRACE.value, new BooleanValidatorWithDefaults(1, 0)),
			new ParamSignature(optional, "communication", Enum.LogCategory.COMMUNICATION.value, new BooleanValidatorWithDefaults(1, 0))
		);
		static protocolLogic = new Array<IProtocolLogic>(
			new OneOf("calltrace", "communication")
		);
	}

	/**
	 * 
	 */
	export class DiagCommand extends AbstractCommand {
		static commandString = "DIAG";
	}

	/**
	 * 
	 */
	export class HelpCommand extends AbstractCommand {
		static commandString = "HELP";
		protocol = new Array<ParamSignature>(
			new ParamSignature(optional, "command", null, new EnumValidator(Enum.Command))
		);
	}

	/**
	 * 
	 */
	export class HelpProducerCommand extends AbstractCommand {
		static commandString = "HELP PRODUCER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(optional, "producer", null, new EnumValidator(Enum.Producer))
		);
	}

	/**
	 * 
	 */
	export class HelpConsumerCommand extends AbstractCommand {
		static commandString = "HELP CONSUMER";
		protocol = new Array<ParamSignature>(
			new ParamSignature(optional, "consumer", null, new EnumValidator(Enum.Consumer))
		);
	}
}

/**
 * IOperation
 */
export namespace AMCP {
	/**
	 * 
	 */
	export class ByeCommand extends AbstractCommand {
		static commandString = "BYE";
	}

	/**
	 * 
	 */
	export class KillCommand extends AbstractCommand {
		static commandString = "KILL";
	}

	/**
	 * 
	 */
	export class RestartCommand extends AbstractCommand {
		static commandString = "RESTART";
	}
}