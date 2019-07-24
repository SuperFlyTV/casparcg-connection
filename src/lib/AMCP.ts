import { Command, Transition, Ease, Direction, LogLevel, LogCategory, Chroma,
  BlendMode } from './ServerStateEnum'
// ResponseNS
import { Response as ResponseSignatureNS } from './ResponseSignature'
import { Response as ResponseValidator } from './ResponseValidators'
import { Response as ResponseParser } from './ResponseParsers'

import ResponseSignature = ResponseSignatureNS.ResponseSignature
// Command NS
import { IAMCPCommand, IAMCPCommandVO, AMCPCommand, OrChannelOrLayerCommand, ChannelCommand,
 	ChannelOrLayerCommand, LayerWithFallbackCommand, LayerWithCgFallbackCommand } from './AMCPCommand'

// Param NS
import { Param, Required as required, Optional as optional, ParamSignature, IParamSignature } from './ParamSignature'

// Validation NS
import { Validation as ParameterValidator } from './ParamValidators'
// Protocol NS
import { Depends, Coupled, OneOf, IProtocolLogic } from './ProtocolLogic'

/**
 * Internal
 */
// export class CustomCommand extends AbstractCommand {
// 	static readonly commandString = ''
// 	paramProtocol = [
// 		new ParamSignature(required, 'command', null, new ParameterValidator.StringValidator(false))
// 	]
// }

export const protocolLogic: Map<Command, IProtocolLogic[]> = new Map<Command, IProtocolLogic[]>([
	[ Command.LOADBG, [
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Transition.STING)
	]],
	[ Command.LOAD, [
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Transition.STING)
	]],
	[ Command.PLAY, [
		new Depends('loop', 'clip'),
		new Depends('seek', 'clip'),
		new Depends('length', 'clip'),
		new Depends('filter', 'clip'),
		new Depends('transition', 'clip'),
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Transition.STING)
	]],
	[ Command.LOG_CATEGORY, [
		new OneOf('calltrace', 'communication')
	]],
	[ Command.MIXER_KEYER, [
		new Depends('defer', 'keyer')
	]],
	[ Command.MIXER_CHROMA, [
		new Coupled('threshold', 'softness'),
		new Depends('keyer', 'threshold').ifNot('keyer', Chroma.NONE),
		new Depends('spill', 'threshold'),
		new Depends('transitionDuration', 'keyer'),
		new Depends('transitionEasing', 'keyer'),
		new Depends('defer', 'threshold').ifNot('keyer', Chroma.NONE)
	]],
	[ Command.MIXER_BLEND, [
		new Depends('defer', 'blendmode')
	]],
	[ Command.MIXER_INVERT, [
		new Depends('defer', 'invert')
	]],
	[ Command.MIXER_OPACITY, [
		new Depends('transitionDuration', 'opacity'),
		new Depends('transitionEasing', 'opacity'),
		new Depends('defer', 'opacity')
	]],
	[ Command.MIXER_BRIGHTNESS, [
		new Depends('transitionDuration', 'brightness'),
		new Depends('transitionEasing', 'brightness'),
		new Depends('defer', 'brightness')
	]],
	[ Command.MIXER_SATURATION, [
		new Depends('transitionDuration', 'saturation'),
		new Depends('transitionEasing', 'saturation'),
		new Depends('defer', 'saturation')
	]],
	[ Command.MIXER_CONTRAST, [
		new Depends('transitionDuration', 'contrast'),
		new Depends('transitionEasing', 'contrast'),
		new Depends('defer', 'contrast')
	]],
	[ Command.MIXER_LEVELS, [
		new Coupled('minInput', 'maxInput', 'gamma', 'minOutput', 'maxOutput'),
		new Depends('transitionDuration', 'minInput'),
		new Depends('transitionEasing', 'minInput'),
		new Depends('defer', 'minInput')
	]],
	[ Command.MIXER_FILL, [
		new Coupled('x', 'y', 'xScale', 'yScale'),
		new Depends('transitionDuration', 'x'),
		new Depends('transitionEasing', 'x'),
		new Depends('defer', 'x')
	]],
	[ Command.MIXER_CLIP, [
		new Coupled('x', 'y', 'width', 'height'),
		new Depends('transitionDuration', 'x'),
		new Depends('transitionEasing', 'x'),
		new Depends('defer', 'x')
	]]
])

export const paramProtocol: Map<Command, IParamSignature[]> = new Map<Command, IParamSignature[]>([
	[ Command.LOADBG, [
		new ParamSignature(required, 'clip', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(optional, 'loop', null, new ParameterValidator.BooleanValidatorWithDefaults('LOOP')),
		new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Transition)),
		new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Ease)),
		new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Direction)),
		new ParamSignature(optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(optional, 'stingOverlayFilename', null, new ParameterValidator.ClipNameEmptyStringValidator()),
		new ParamSignature(optional, 'seek', 'SEEK', new ParameterValidator.FrameValidator('SEEK')),
		new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
		new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
		new ParamSignature(optional, 'auto', null, new ParameterValidator.BooleanValidatorWithDefaults('AUTO')),
		new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ParameterValidator.ChannelLayoutValidator())
	]],
	[ Command.LOAD, [
		new ParamSignature(required, 'clip', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(optional, 'loop', null, new ParameterValidator.BooleanValidatorWithDefaults('LOOP')),
		new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Transition)),
		new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Ease)),
		new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Direction)),
		new ParamSignature(optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(optional, 'stingOverlayFilename', null, new ParameterValidator.ClipNameEmptyStringValidator()),
		new ParamSignature(optional, 'seek', 'SEEK', new ParameterValidator.FrameValidator('SEEK')),
		new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
		new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
		new ParamSignature(optional, 'auto', null, new ParameterValidator.BooleanValidatorWithDefaults('AUTO')),
		new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ParameterValidator.ChannelLayoutValidator())
	]],
	[ Command.PLAY, [
		new ParamSignature(optional, 'clip', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(optional, 'loop', null, new ParameterValidator.BooleanValidatorWithDefaults('LOOP')),
		new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Transition)),
		new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Ease)),
		new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Direction)),
		new ParamSignature(optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(optional, 'stingOverlayFilename', null, new ParameterValidator.ClipNameEmptyStringValidator()),
		new ParamSignature(optional, 'seek', 'SEEK', new ParameterValidator.FrameValidator('SEEK')),
		new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
		new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
		new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ParameterValidator.ChannelLayoutValidator())
	]],
	[ Command.CG_ADD, [
		new ParamSignature(required, 'flashLayer', 'ADD', new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(required, 'templateName', null, new ParameterValidator.TemplateNameValidator()),
		new ParamSignature(required, 'playOnLoad', null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
		new ParamSignature(optional, 'data', null, new ParameterValidator.TemplateDataValidator())
	]],
	[ Command.CG_PLAY, [
		new ParamSignature(required, 'flashLayer', 'PLAY', new ParameterValidator.PositiveNumberValidatorBetween(0))
	]],
	[ Command.CG_ADD, [
		new ParamSignature(required, 'flashLayer', 'STOP', new ParameterValidator.PositiveNumberValidatorBetween(0))
	]],
	[ Command.CG_NEXT, [
		new ParamSignature(required, 'flashLayer', 'NEXT', new ParameterValidator.PositiveNumberValidatorBetween(0))
	]],
	[ Command.CG_REMOVE, [
		new ParamSignature(required, 'flashLayer', 'REMOVE', new ParameterValidator.PositiveNumberValidatorBetween(0))
	]],
	[ Command.CG_CLEAR, [
		new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('CLEAR'))
	]],
	[ Command.CG_UPDATE, [
		new ParamSignature(required, 'flashLayer', 'UPDATE', new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(required, 'data', null, new ParameterValidator.TemplateDataValidator())
	]],
	[ Command.CG_INVOKE, [
		new ParamSignature(required, 'flashLayer', 'INVOKE', new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(required, 'method', null, new ParameterValidator.StringValidator())
	]],
	[ Command.GL_INFO, [
		new ParamSignature(required, 'info', null, new ParameterValidator.KeywordValidator('INFO')),
		new ParamSignature(optional, 'flashLayer', null, new ParameterValidator.PositiveNumberValidatorBetween(0))
	]],
	[ Command.LOG_LEVEL, [
		new ParamSignature(optional, 'level', null, new ParameterValidator.EnumValidator(LogLevel))
	]],
	[ Command.LOG_CATEGORY, [
		new ParamSignature(optional, 'calltrace', LogCategory.CALLTRACE, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
		new ParamSignature(optional, 'communication', LogCategory.COMMUNICATION, new ParameterValidator.BooleanValidatorWithDefaults(1, 0))
	]],
	[ Command.MIXER_KEYER, [
		new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('KEYER')),
		new ParamSignature(optional, 'keyer', null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
		new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_CHROMA, [
		new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('CHROMA')),
		new ParamSignature(optional, 'keyer', null, new ParameterValidator.EnumValidator(Chroma)),
		new ParamSignature(optional, 'threshold', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(optional, 'softness', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(optional, 'spill', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Ease)),
		new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_BLEND, [
		new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('BLEND')),
		new ParamSignature(optional, 'blendmode', null, new ParameterValidator.EnumValidator(BlendMode)),
		new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_INVERT, [
		new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('INVERT')),
		new ParamSignature(optional, 'invert', null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
		new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_OPACITY, [
		new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('OPACITY')),
		new ParamSignature(optional, 'opacity', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Ease)),
		new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_BRIGHTNESS, [
		new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('BRIGHTNESS')),
		new ParamSignature(optional, 'brightness', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Ease)),
		new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_SATURATION, [
		new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('SATURATION')),
		new ParamSignature(optional, 'saturation', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Ease)),
		new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_CONTRAST, [
		new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('CONTRAST')),
		new ParamSignature(optional, 'contrast', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Ease)),
		new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_LEVELS, [
		new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('LEVELS')),
		new ParamSignature(optional, 'minInput', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'maxInput', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'gamma', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'minOutput', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'maxOutput', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Ease)),
		new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_FILL, [
		new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('FILL')),
		new ParamSignature(optional, 'x', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(optional, 'y', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(optional, 'xScale', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(optional, 'yScale', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Ease)),
		new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_FILL, [
		new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('CLIP')),
		new ParamSignature(optional, 'x', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(optional, 'y', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(optional, 'width', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(optional, 'height', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Ease)),
		new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
	]]
])

export const responseProtocol: Map<Command, ResponseSignature> = new Map<Command, ResponseSignature>([
	[ Command.CG_INVOKE, new ResponseSignature(201) ],
	[ Command.GL_INFO, new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.GLParser) ],
	[ Command.MIXER_KEYER, new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusKeyerParser) ],
	[ Command.MIXER_CHROMA, new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusChromaParser) ],
	[ Command.MIXER_BLEND, new ResponseSignature(201, ResponseValidator.StringValidator, ResponseParser.MixerStatusBlendParser) ],
	[ Command.MIXER_INVERT, new ResponseSignature(201, ResponseValidator.StringValidator, ResponseParser.MixerStatusInvertParser) ],
	[ Command.MIXER_OPACITY, new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusOpacityParser) ],
	[ Command.MIXER_BRIGHTNESS, new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusBrightnessParser) ],
	[ Command.MIXER_SATURATION, new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusSaturationParser) ],
	[ Command.MIXER_CONTRAST, new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusContrastParser) ],
	[ Command.MIXER_LEVELS, new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusLevelsParser) ],
	[ Command.MIXER_FILL, new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusFillParser) ],
	[ Command.MIXER_CLIP, new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusClipParser) ]
])

/**
 * IMixer
 * @todo: switch 201/202 based on mode
 */
export namespace AMCP {

	/**
	 *
	 */
	export class MixerRotationCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'MIXER'
		static readonly protocolLogic = [
			new Depends('transitionDuration', 'rotation'),
			new Depends('transitionEasing', 'rotation'),
			new Depends('defer', 'rotation')
		]
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('ROTATION')),
			new ParamSignature(optional, 'rotation', null, new ParameterValidator.NumberValidator()),
			new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.NumberValidator()),
			new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
		]

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'ROTATION'
		}
	}

	/**
	 *
	 */
	export class MixerStatusRotationCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'MIXER'
		static readonly protocolLogic = []
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('ROTATION'))
		]
		responseProtocol = new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusRotationParser)

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'ROTATION'
		}
	}

	/**
	 *
	 */
	export class MixerPerspectiveCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'MIXER'
		static readonly protocolLogic = [
			new Coupled('topLeftX', 'topLeftY', 'topRightX', 'topRightY', 'bottomRightX', 'bottomRightY', 'bottomLeftX', 'bottomLeftY'),
			new Depends('transitionDuration', 'topLeftX'),
			new Depends('transitionEasing', 'topLeftX'),
			new Depends('defer', 'topLeftX')
		]
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('PERSPECTIVE')),
			new ParamSignature(optional, 'topLeftX', null, new ParameterValidator.NumberValidator()),
			new ParamSignature(optional, 'topLeftY', null, new ParameterValidator.NumberValidator()),
			new ParamSignature(optional, 'topRightX', null, new ParameterValidator.NumberValidator()),
			new ParamSignature(optional, 'topRightY', null, new ParameterValidator.NumberValidator()),
			new ParamSignature(optional, 'bottomRightX', null, new ParameterValidator.NumberValidator()),
			new ParamSignature(optional, 'bottomRightY', null, new ParameterValidator.NumberValidator()),
			new ParamSignature(optional, 'bottomLeftX', null, new ParameterValidator.NumberValidator()),
			new ParamSignature(optional, 'bottomLeftY', null, new ParameterValidator.NumberValidator()),
			new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.NumberValidator()),
			new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
		]

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'PERSPECTIVE'
		}
	}

	/**
	 *
	 */
	export class MixerStatusPerspectiveCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'MIXER'
		static readonly protocolLogic = []
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('PERSPECTIVE'))
		]
		responseProtocol = new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusPerspectiveParser)

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'PERSPECTIVE'
		}
	}

	/**
	 *
	 */
	export class MixerMipmapCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'MIXER'
		static readonly protocolLogic = [
			new Depends('defer', 'mipmap')
		]
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('MIPMAP')),
			new ParamSignature(optional, 'mipmap', null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
			new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
		]

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'MIPMAP'
		}
	}

	/**
	 *
	 */
	export class MixerStatusMipmapCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'MIXER'
		static readonly protocolLogic = []
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('MIPMAP'))
		]
		responseProtocol = new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusMipmapParser)

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'MIPMAP'
		}
	}

	/**
	 *
	 */
	export class MixerVolumeCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'MIXER'
		static readonly protocolLogic = [
			new Depends('transitionDuration', 'volume'),
			new Depends('transitionEasing', 'volume'),
			new Depends('defer', 'volume')
		]
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('VOLUME')),
			new ParamSignature(optional, 'volume', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
		]

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'VOLUME'
		}
	}

	/**
	 *
	 */
	export class MixerStatusVolumeCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'MIXER'
		static readonly protocolLogic = []
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('VOLUME'))
		]
		responseProtocol = new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusVolumeParser)

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'VOLUME'
		}
	}

	/**
	 *
	 */
	export class MixerMastervolumeCommand extends AbstractChannelCommand {
		static readonly commandString = 'MIXER'
		static readonly protocolLogic = [
			new Depends('transitionDuration', 'mastervolume'),
			new Depends('transitionEasing', 'mastervolume'),
			new Depends('defer', 'mastervolume')
		]
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('MASTERVOLUME')),
			new ParamSignature(optional, 'mastervolume', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
		]

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'MASTERVOLUME'
		}
	}

	/**
	 *
	 */
	export class MixerStatusMastervolumeCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'MIXER'
		static readonly protocolLogic = []
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('MASTERVOLUME'))
		]
		responseProtocol = new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusMastervolumeParser)

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'MASTERVOLUME'
		}
	}

	/**
	 *
	 */
	export class MixerStraightAlphaOutputCommand extends AbstractChannelCommand {
		static readonly commandString = 'MIXER'
		static readonly protocolLogic = [
			new Depends('defer', 'straight_alpha_output')
		]
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('STRAIGHT_ALPHA_OUTPUT')),
			new ParamSignature(optional, 'straight_alpha_output', null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
			new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
		]

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'STRAIGHT_ALPHA_OUTPUT'
		}
	}

	/**
	 *
	 */
	export class MixerStatusStraightAlphaOutputCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'MIXER'
		static readonly protocolLogic = []
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('STRAIGHT_ALPHA_OUTPUT'))
		]
		responseProtocol = new ResponseSignature(201, ResponseValidator.MixerStatusValidator, ResponseParser.MixerStatusStraightAlphaOutputParser)

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'STRAIGHT_ALPHA_OUTPUT'
		}
	}

	/**
	 *
	 */
	export class MixerGridCommand extends AbstractChannelCommand {
		static readonly commandString = 'MIXER'
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('GRID')),
			new ParamSignature(optional, 'resolution', null, new ParameterValidator.PositiveNumberRoundValidatorBetween(1)),
			new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
		]

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'GRID'
		}
	}

	/**
	 *
	 */
	export class MixerCommitCommand extends AbstractChannelCommand {
		static readonly commandString = 'MIXER'
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('COMMIT'))
		]

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'COMMIT'
		}
	}

	/**
	 *
	 */
	export class MixerClearCommand extends AbstractChannelOrLayerCommand {
		static readonly commandString = 'MIXER'
		paramProtocol = [
			new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('CLEAR'))
		]

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['keyword'] = 'CLEAR'
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
		static readonly commandString = 'CLEAR'
	}

	/**
	 *
	 */
	export class CallCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'CALL'

		static readonly protocolLogic = [
			new OneOf('seek')
		]
		paramProtocol = [
			new ParamSignature(optional, 'seek', 'seek', new ParameterValidator.PositiveNumberValidatorBetween(0))
		]
	}

	/**
	 *
	 */
	export class SwapCommand extends AbstractChannelOrLayerCommand {
		static readonly commandString = 'SWAP'

		/**
		 *
		 */
		constructor() {
			super('1-1') // @todo: foo
			// @todo: custom parameters dual layerOrchannel with 1 optional param
			// overloading in method
		}

	}

	/**
	 *
	 */
	export class AddCommand extends AbstractChannelCommand {
		static readonly commandString = 'ADD'
	}

	/**
	 *
	 */
	export class AddDecklinkCommand extends AbstractChannelOrLayerCommand {
		static readonly commandString = 'ADD'
		paramProtocol = [
			new ParamSignature(required, 'device', 'DECKLINK', new ParameterValidator.DecklinkDeviceValidator())
		]
	}

	/**
	 *
	 */
	export class AddImageCommand extends AbstractChannelOrLayerCommand {
		static readonly commandString = 'ADD'
		paramProtocol = [
			new ParamSignature(required, 'fileName', 'IMAGE', new ParameterValidator.StringValidator())
		]
	}

	/**
	 *
	 */
	export class AddFileCommand extends AbstractChannelOrLayerCommand {
		static readonly commandString = 'ADD'
		paramProtocol = [
			new ParamSignature(required, 'fileName', 'FILE', new ParameterValidator.StringValidator())
		]
	}

	/**
	 *
	 */
	export class AddStreamCommand extends AbstractChannelOrLayerCommand {
		static readonly commandString = 'ADD'
		paramProtocol = [
			new ParamSignature(required, 'uri', 'STREAM', new ParameterValidator.StringValidator()),
			new ParamSignature(required, 'params', null, new ParameterValidator.StringValidator())
		]
	}

	/**
	 *
	 */
	export class RemoveCommand extends AbstractChannelOrLayerCommand {
		static readonly commandString = 'REMOVE'
	}
	export class RemoveDecklinkCommand extends AbstractChannelOrLayerCommand {
		static readonly commandString = 'REMOVE'
		paramProtocol = [
			new ParamSignature(required, 'device', 'DECKLINK', new ParameterValidator.DecklinkDeviceValidator())
		]
	}

	/**
	 *
	 */
	export class RemoveImageCommand extends AbstractChannelOrLayerCommand {
		static readonly commandString = 'REMOVE'
		paramProtocol = [
			new ParamSignature(required, 'fileName', 'IMAGE', new ParameterValidator.StringValidator())
		]
	}

	/**
	 *
	 */
	export class RemoveFileCommand extends AbstractChannelOrLayerCommand {
		static readonly commandString = 'REMOVE'
		paramProtocol = [
			new ParamSignature(required, 'fileName', 'FILE', new ParameterValidator.StringValidator())
		]
	}

	/**
	 *
	 */
	export class RemoveStreamCommand extends AbstractChannelOrLayerCommand {
		static readonly commandString = 'REMOVE'
		paramProtocol = [
			new ParamSignature(required, 'uri', 'STREAM', new ParameterValidator.StringValidator())
		]
	}

	/**
	 *
	 */
	export class PrintCommand extends AbstractChannelCommand {
		static readonly commandString = 'PRINT'
	}

	/**
	 *
	 */
	export class SetCommand extends AbstractChannelCommand {
		static readonly commandString = 'SET'
	}

	/**
	 *
	 */
	export class LockCommand extends AbstractChannelCommand {
		static readonly commandString = 'LOCK'
		static readonly protocolLogic = [
			new Depends('action', 'phrase').ifNot('action', Enum.Lock.RELEASE)
		]
		paramProtocol = [
			new ParamSignature(required, 'action', null, new ParameterValidator.EnumValidator(Enum.Lock)),
			new ParamSignature(optional, 'phrase', null, new ParameterValidator.StringValidator())
		]
	}

	/**
	 *
	 */
	export class ChannelGridCommand extends AbstractCommand {
		static readonly commandString = 'CHANNEL_GRID'
	}

	/**
	 *
	 */
	export class GlGCCommand extends AbstractCommand {
		static readonly commandString = 'GL GC'
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
		static readonly commandString = 'DATA STORE'
		paramProtocol = [
			new ParamSignature(required, 'fileName', null, new ParameterValidator.DataNameValidator()),
			new ParamSignature(required, 'data', null, new ParameterValidator.TemplateDataValidator())
		]
	}

	/**
	 *
	 */
	export class DataRetrieveCommand extends AbstractCommand {
		static readonly commandString = 'DATA RETRIEVE'
		paramProtocol = [
			new ParamSignature(required, 'fileName', null, new ParameterValidator.DataNameValidator())
		]
		responseProtocol = new ResponseSignature(201, ResponseValidator.DataValidator, ResponseParser.DataParser)
	}

	/**
	 *
	 */
	export class DataListCommand extends AbstractCommand {
		static readonly commandString = 'DATA LIST'
		responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.DataListParser)
	}

	/**
	 *
	 */
	export class DataRemoveCommand extends AbstractCommand {
		static readonly commandString = 'DATA REMOVE'
		paramProtocol = [
			new ParamSignature(required, 'fileName', null, new ParameterValidator.DataNameValidator())
		]
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
		static readonly commandString = 'THUMBNAIL LIST'
		paramProtocol = [
			new ParamSignature(optional, 'subFolder', null, new ParameterValidator.ClipNameValidator())
		]
		// responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ThumbnailListParser);
		responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ThumbnailListParser)
	}

	/**
	 *
	 */
	export class ThumbnailRetrieveCommand extends AbstractCommand {
		static readonly commandString = 'THUMBNAIL RETRIEVE'
		paramProtocol = [
			new ParamSignature(required, 'fileName', null, new ParameterValidator.ClipNameValidator())
		]
		responseProtocol = new ResponseSignature(201, ResponseValidator.Base64Validator, ResponseParser.ThumbnailParser)
	}

	/**
	 *
	 */
	export class ThumbnailGenerateCommand extends AbstractCommand {
		static readonly commandString = 'THUMBNAIL GENERATE'
		paramProtocol = [
			new ParamSignature(required, 'fileName', null, new ParameterValidator.ClipNameValidator())
		]
	}

	/**
	 *
	 */
	export class ThumbnailGenerateAllCommand extends AbstractCommand {
		static readonly commandString = 'THUMBNAIL GENERATE_ALL'
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
		static readonly commandString = 'CINF'
		paramProtocol = [
			new ParamSignature(required, 'fileName', null, new ParameterValidator.ClipNameValidator())
		]
		responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.CinfParser)
	}

	/**
	 *
	 */
	export class ClsCommand extends AbstractCommand {
		static readonly commandString = 'CLS'
		paramProtocol = [
			new ParamSignature(optional, 'subFolder', null, new ParameterValidator.ClipNameValidator())
		]
		responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ContentParser)
	}

	/**
	 *
	 */
	export class FlsCommand extends AbstractCommand {
		static readonly commandString = 'FLS'
		responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ContentParser)
	}

	/**
	 *
	 */
	export class TlsCommand extends AbstractCommand {
		static readonly commandString = 'TLS'
		paramProtocol = [
			new ParamSignature(optional, 'subFolder', null, new ParameterValidator.ClipNameValidator())
		]
		responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ContentParser)
	}

	/**
	 *
	 */
	export class VersionCommand extends AbstractCommand {
		static readonly commandString = 'VERSION'
		paramProtocol = [
			new ParamSignature(optional, 'component', null, new ParameterValidator.EnumValidator(Enum.Version))
		]
		responseProtocol = new ResponseSignature(201, ResponseValidator.StringValidator, ResponseParser.VersionParser)
	}

	/**
	 *
	 */
	export class InfoCommand extends AbstractOrChannelOrLayerCommand {
		static readonly commandString = 'INFO'
		responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ChannelParser)

		/**
		 *
		 */
		constructor(params?: (string | Param | (string | Param)[])) {
			super(params)
			if (this.channel && this.channel > -1) {
				this.responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoParser)
			}
		}
	}

	/**
	 *
	 */
	export class InfoTemplateCommand extends AbstractCommand {
		static readonly commandString = 'INFO TEMPLATE'
		paramProtocol = [
			new ParamSignature(required, 'template', null, new ParameterValidator.TemplateNameValidator())
		]
		responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoTemplateParser)
	}

	/**
	 *
	 */
	export class InfoConfigCommand extends AbstractCommand {
		static readonly commandString = 'INFO CONFIG'
		responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.ConfigParser)

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[]), context?: Object) {
			super(params, context)
		}
	}

	/**
	 *
	 */
	export class InfoPathsCommand extends AbstractCommand {
		static readonly commandString = 'INFO PATHS'
		responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoPathsParser)
	}

	/**
	 *
	 */
	export class InfoSystemCommand extends AbstractCommand {
		static readonly commandString = 'INFO SYSTEM'
		responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoSystemParser)
	}

	/**
	 *
	 */
	export class InfoServerCommand extends AbstractCommand {
		static readonly commandString = 'INFO SERVER'
		responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoServerParser)
	}

	/**
	 *
	 */
	export class InfoQueuesCommand extends AbstractCommand {
		static readonly commandString = 'INFO QUEUES'
		responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoQueuesParser)
	}

	/**
	 *
	 */
	export class InfoThreadsCommand extends AbstractCommand {
		static readonly commandString = 'INFO THREADS'
		responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.InfoThreadsParser)
	}

	/**
	 *
	 */
	export class InfoDelayCommand extends AbstractChannelOrLayerCommand {
		static readonly commandString = 'INFO'
		paramProtocol = [
			new ParamSignature(required, 'delay', null, new ParameterValidator.KeywordValidator('DELAY'))
		]
		responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoDelayParser)

		/**
		 *
		 */
		constructor(params: (string | Param | (string | Param)[])) {
			super(params)
			this._objectParams['delay'] = 'DELAY'
		}
	}

	/**
	 *
	 */
	// export class DiagCommand extends AbstractCommand {
	// 	static readonly commandString = 'DIAG'
	// }

	/**
	 * @todo: mixed mode!!!!
	 * 202/201
	 */
	export class HelpCommand extends AbstractCommand {
		static readonly commandString = 'HELP'
		paramProtocol = [
			new ParamSignature(optional, 'command', null, new ParameterValidator.EnumValidator(Enum.Command))
		]
		responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.HelpParser)
	}

	/**
	 *
	 */
	export class HelpProducerCommand extends AbstractCommand {
		static readonly commandString = 'HELP PRODUCER'
		paramProtocol = [
			new ParamSignature(optional, 'producer', null, new ParameterValidator.EnumValidator(Enum.Producer))
		]
		responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.HelpParser)
	}

	/**
	 *
	 */
	export class HelpConsumerCommand extends AbstractCommand {
		static readonly commandString = 'HELP CONSUMER'
		paramProtocol = [
			new ParamSignature(optional, 'consumer', null, new ParameterValidator.EnumValidator(Enum.Consumer))
		]
		responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.HelpParser)
	}
}

/**
 * IOperation
 */
export namespace AMCP {
	/**
	 * @todo: response
	 */
	export class ByeCommand extends AbstractCommand {
		static readonly commandString = 'BYE'
	}

	/**
	 * @todo: response
	 */
	export class KillCommand extends AbstractCommand {
		static readonly commandString = 'KILL'
	}

	/**
	 * @todo: response
	 */
	export class RestartCommand extends AbstractCommand {
		static readonly commandString = 'RESTART'
	}
	export class PingCommand extends AbstractCommand {
		static readonly commandString = 'PING'
	}
}

/**
 * IScheduling
 */
export namespace AMCP {
	export class TimeCommand extends AbstractChannelCommand {
		static readonly commandString = 'TIME'
		paramProtocol = [
			new ParamSignature(optional, 'timecode', null, new ParameterValidator.TimecodeValidator())
		]
		responseProtocol = new ResponseSignature(201, ResponseValidator.StringValidator, ResponseParser.InfoParser)
	}
	export class ScheduleSetCommand extends AbstractCommand {
		static readonly commandString = 'SCHEDULE SET'
		paramProtocol = [
			new ParamSignature(required, 'token', null, new ParameterValidator.StringValidator()),
			new ParamSignature(required, 'timecode', null, new ParameterValidator.TimecodeValidator()),
			new ParamSignature(required, 'command', null, new ParameterValidator.CommandValidator())
		]
	}
	export class ScheduleRemoveCommand extends AbstractCommand {
		static readonly commandString = 'SCHEDULE REMOVE'
		paramProtocol = [
			new ParamSignature(required, 'token', null, new ParameterValidator.StringValidator())
		]
	}
	export class ScheduleClearCommand extends AbstractCommand {
		static readonly commandString = 'SCHEDULE CLEAR'
	}
	export class ScheduleListCommand extends AbstractCommand {
		static readonly commandString = 'SCHEDULE LIST'
		paramProtocol = [
			new ParamSignature(optional, 'token', null, new ParameterValidator.StringValidator())
		]
	}
}

/**
 * IInputOutput
 */
export namespace AMCP {
	/**
	 *
	 */
	export class LoadDecklinkBgCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'LOADBG'
		static readonly protocolLogic = [
			new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
			new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
			new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING)
		]
		paramProtocol = [
			new ParamSignature(required, 'device', 'DECKLINK DEVICE', new ParameterValidator.DecklinkDeviceValidator()),
			new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ParameterValidator.ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
			new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
			new ParamSignature(optional, 'format', 'FORMAT', new ParameterValidator.ChannelFormatValidator()),
			new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ParameterValidator.ChannelLayoutValidator()),
			new ParamSignature(optional, 'auto', null, new ParameterValidator.BooleanValidatorWithDefaults('AUTO'))
		]
	}

	/**
	 *
	 */
	export class LoadDecklinkCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'LOAD'
		static readonly protocolLogic = [
			new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
			new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
			new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING)
		]
		paramProtocol = [
			new ParamSignature(required, 'device', 'DECKLINK DEVICE', new ParameterValidator.DecklinkDeviceValidator()),
			new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ParameterValidator.ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
			new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
			new ParamSignature(optional, 'format', 'FORMAT', new ParameterValidator.ChannelFormatValidator()),
			new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ParameterValidator.ChannelLayoutValidator())
		]
	}

	/**
	 *
	 */
	export class PlayDecklinkCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'PLAY'
		static readonly protocolLogic = [
			new Depends('length', 'device'),
			new Depends('filter', 'device'),
			new Depends('format', 'device'),
			new Depends('channelLayout', 'device'),
			new Depends('transition', 'device'),
			new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
			new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
			new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING)
		]
		paramProtocol = [
			new ParamSignature(required, 'device', 'DECKLINK DEVICE', new ParameterValidator.DecklinkDeviceValidator()),
			new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ParameterValidator.ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
			new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
			new ParamSignature(optional, 'format', 'FORMAT', new ParameterValidator.ChannelFormatValidator()),
			new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ParameterValidator.ChannelLayoutValidator())
		]
	}

	/**
	 *
	 */
	export class LoadRouteBgCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'LOADBG'
		static readonly protocolLogic = [
			new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
			new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
			new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING)
		]
		paramProtocol = [
			new ParamSignature(required, 'route', null, new ParameterValidator.RouteValidator()),
			new ParamSignature(optional, 'mode', null, new ParameterValidator.RouteModeValidator()),
			new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ParameterValidator.ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
			new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
			new ParamSignature(optional, 'auto', null, new ParameterValidator.BooleanValidatorWithDefaults('AUTO')),
			new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ParameterValidator.ChannelLayoutValidator())
		]
	}

	/**
	 *
	 */
	export class LoadRouteCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'LOAD'
		static readonly protocolLogic = [
			new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
			new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
			new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING)
		]
		paramProtocol = [
			new ParamSignature(required, 'route', null, new ParameterValidator.RouteValidator()),
			new ParamSignature(optional, 'mode', null, new ParameterValidator.RouteModeValidator()),
			new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ParameterValidator.ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
			new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
			new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ParameterValidator.ChannelLayoutValidator())
		]
	}

	/**
	 *
	 */
	export class PlayRouteCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'PLAY'
		static readonly protocolLogic = [
			new Depends('length', 'route'),
			new Depends('filter', 'route'),
			new Depends('format', 'route'),
			new Depends('channelLayout', 'route'),
			new Depends('transition', 'route'),
			new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
			new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
			new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING)
		]
		paramProtocol = [
			new ParamSignature(required, 'route', null, new ParameterValidator.RouteValidator()),
			new ParamSignature(optional, 'mode', null, new ParameterValidator.RouteModeValidator()),
			new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ParameterValidator.ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
			new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
			new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ParameterValidator.ChannelLayoutValidator())
		]
	}

	/**
	 *
	 */
	export class LoadHtmlPageBgCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'LOADBG'
		static readonly protocolLogic = [
			new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
			new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
			new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING)
		]
		paramProtocol = [
			new ParamSignature(required, 'url', '[HTML]', new ParameterValidator.URLValidator()),
			new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ParameterValidator.ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'auto', null, new ParameterValidator.BooleanValidatorWithDefaults('AUTO'))
		]
	}

	/**
	 *
	 */
	export class LoadHtmlPageCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'LOAD'
		static readonly protocolLogic = [
			new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
			new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
			new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING)
		]
		paramProtocol = [
			new ParamSignature(required, 'url', '[HTML]', new ParameterValidator.URLValidator()),
			new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ParameterValidator.ClipNameEmptyStringValidator())
		]
	}

	/**
	 *
	 */
	export class PlayHtmlPageCommand extends LayerWithFallbackCommand {
		static readonly commandString = 'PLAY'
		static readonly protocolLogic = [
			new Depends('transition', 'url'),
			new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
			new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
			new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
			new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING)
		]
		paramProtocol = [
			new ParamSignature(optional, 'url', '[HTML]', new ParameterValidator.URLValidator()),
			new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ParameterValidator.ClipNameEmptyStringValidator())
		]
	}
}


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
		// let command: IAMCPCommand = Object.create((AMCP as any)[cmd._commandName]['prototype'])
		// command.constructor.call(command, cmd._objectParams)
		let command: IAMCPCommand = new (AMCP as any)[cmd._commandName](cmd._objectParams)
		command.populate(cmd, id)
		return command
	}

	/**
	 *
	 */
	export class CasparCGSocketResponse {
		public statusCode: number
		public token: string | undefined
		public responseString: string
		public items: Array<string> = []

		/**
		 *
		 */
		constructor(responseString: string) {
			this.token = CasparCGSocketResponse.parseToken(responseString)
			this.statusCode = CasparCGSocketResponse.evaluateStatusCode(responseString)
			this.responseString = responseString
		}

		/**
		 *
		 */
		static evaluateStatusCode(responseString: string): number {
			let token = CasparCGSocketResponse.parseToken(responseString)
			let index: number
			if (token) index = token.length + 5
			else index = 0
			return parseInt(responseString.substr(index, 3), 10)
		}

		/**
		 *
		 */
		static parseToken(responseString: string): string | undefined {
			if (responseString.substr(0, 3) === 'RES') {
				return responseString.substr(4).split(' ')[0] // RES [token] RESPONSE
			} else {
				return undefined
			}
		}
	}
}
