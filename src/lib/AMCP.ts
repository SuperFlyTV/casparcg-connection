import { Enum } from './ServerStateEnum'
// ResponseNS
import {Response as ResponseSignatureNS } from './ResponseSignature'
import {Response as ResponseValidator } from './ResponseValidators'
import {Response as ResponseParser } from './ResponseParsers'

import ResponseSignature = ResponseSignatureNS.ResponseSignature
// Command NS
import {Command as CommandNS } from './AbstractCommand'
import IAMCPCommand = CommandNS.IAMCPCommand
import IAMCPCommandVO = CommandNS.IAMCPCommandVO
import AbstractCommand = CommandNS.AbstractCommand
import AbstractOrChannelOrLayerCommand = CommandNS.AbstractOrChannelOrLayerCommand
import AbstractChannelCommand = CommandNS.AbstractChannelCommand
import AbstractChannelOrLayerCommand = CommandNS.AbstractChannelOrLayerCommand
import AbstractLayerWithFallbackCommand = CommandNS.AbstractLayerWithFallbackCommand
import AbstractLayerWithCgFallbackCommand = CommandNS.AbstractLayerWithCgFallbackCommand
// Param NS
import {Param as ParamNS } from './ParamSignature'
import Param = ParamNS.Param
import required = ParamNS.Required
import optional = ParamNS.Optional
import ParamSignature = ParamNS.ParamSignature
// Validation NS
import {Validation as ParameterValidator } from './ParamValidators'
// Protocol NS
import {Protocol as ProtocolNS } from './ProtocolLogic'
import Depends = ProtocolNS.Depends
import Coupled = ProtocolNS.Coupled
import OneOf = ProtocolNS.OneOf

/**
 * Factory
 */
export namespace AMCPUtil   {

	/**
	 *
	 */
	export function deSerialize (cmd: IAMCPCommandVO, id: string): IAMCPCommand {

		// errror: commandstatus -1 //invalid command

		// @todo: error handling much?????? (callback??????)
  let command: IAMCPCommand = Object.create(AMCP[cmd._commandName]['prototype'])
  command.constructor.call(command, cmd._objectParams)
  command.populate(cmd, id)
  return command
}

	/**
	 *
	 */
export class CasparCGSocketResponse {
  public statusCode: number
  public responseString: string
  public items: Array<string> = []

		/**
		 *
		 */
  constructor (responseString: string) {
    this.statusCode = CasparCGSocketResponse.evaluateStatusCode(responseString)
    this.responseString = responseString
  }

		/**
		 *
		 */
  static evaluateStatusCode (responseString: string): number {
    return parseInt(responseString.substr(0, 3), 10)
  }
}
}

/**
 * Internal
 */
export namespace AMCP {
export class CustomCommand extends AbstractCommand {
  static readonly commandString = ''
  paramProtocol = [
    new ParamSignature(required, 'command', null, new ParameterValidator.StringValidator(false))
  ]
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
  static readonly commandString = 'LOADBG'
  static readonly protocolLogic = [
    new Depends('transitionDuration', 'transition'),
    new Depends('transitionEasing', 'transition'),
    new Depends('transitionDirection', 'transition')
  ]
  paramProtocol = [
    new ParamSignature(required, 'clip', null, new ParameterValidator.ClipNameValidator()),
    new ParamSignature(optional, 'loop', null, new ParameterValidator.BooleanValidatorWithDefaults('LOOP')),
    new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
    new ParamSignature(optional, 'seek', 'SEEK', new ParameterValidator.FrameValidator('SEEK')),
    new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
    new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
    new ParamSignature(optional, 'auto', null, new ParameterValidator.BooleanValidatorWithDefaults('AUTO'))
  ]
}

	/**
	 *
	 */
export class LoadCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'LOAD'
  static readonly protocolLogic = [
    new Depends('transitionDuration', 'transition'),
    new Depends('transitionEasing', 'transition'),
    new Depends('transitionDirection', 'transition')
  ]
  paramProtocol = [
    new ParamSignature(required, 'clip', null, new ParameterValidator.ClipNameValidator()),
    new ParamSignature(optional, 'loop', null, new ParameterValidator.BooleanValidatorWithDefaults('LOOP')),
    new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
    new ParamSignature(optional, 'seek', 'SEEK', new ParameterValidator.FrameValidator('SEEK')),
    new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
    new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator())
  ]
}

	/**
	 *
	 */
export class PlayCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'PLAY'
  static readonly protocolLogic = [
    new Depends('loop', 'clip'),
    new Depends('seek', 'clip'),
    new Depends('length', 'clip'),
    new Depends('filter', 'clip'),
    new Depends('transition', 'clip'),
    new Depends('transitionDuration', 'clip'),
    new Depends('transitionEasing', 'clip'),
    new Depends('transitionDirection', 'clip'),
    new Depends('transitionDuration', 'transition'),
    new Depends('transitionEasing', 'transition'),
    new Depends('transitionDirection', 'transition')
  ]
  paramProtocol = [
    new ParamSignature(optional, 'clip', null, new ParameterValidator.ClipNameValidator()),
    new ParamSignature(optional, 'loop', null, new ParameterValidator.BooleanValidatorWithDefaults('LOOP')),
    new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
    new ParamSignature(optional, 'seek', 'SEEK', new ParameterValidator.FrameValidator('SEEK')),
    new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
    new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator())
  ]
}

	/**
	 *
	 */
export class PauseCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'PAUSE'
}

	/**
	 *
	 */
export class ResumeCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'RESUME'
}

	/**
	 *
	 */
export class StopCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'STOP'
}
}

/**
 * IInputOutput
 */
export namespace AMCP {
	/**
	 *
	 */
export class LoadDecklinkBgCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'LOADBG'
  static readonly protocolLogic = [
    new Depends('transitionDuration', 'transition'),
    new Depends('transitionEasing', 'transition'),
    new Depends('transitionDirection', 'transition')
  ]
  paramProtocol = [
    new ParamSignature(required, 'device', 'DECKLINK DEVICE', new ParameterValidator.DecklinkDeviceValidator()),
    new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
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
export class LoadDecklinkCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'LOAD'
  static readonly protocolLogic = [
    new Depends('transitionDuration', 'transition'),
    new Depends('transitionEasing', 'transition'),
    new Depends('transitionDirection', 'transition')
  ]
  paramProtocol = [
    new ParamSignature(required, 'device', 'DECKLINK DEVICE', new ParameterValidator.DecklinkDeviceValidator()),
    new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
    new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
    new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
    new ParamSignature(optional, 'format', 'FORMAT', new ParameterValidator.ChannelFormatValidator()),
    new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ParameterValidator.ChannelLayoutValidator())
  ]
}

	/**
	 *
	 */
export class PlayDecklinkCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'PLAY'
  static readonly protocolLogic = [
    new Depends('length', 'device'),
    new Depends('filter', 'device'),
    new Depends('format', 'device'),
    new Depends('channelLayout', 'device'),
    new Depends('transition', 'device'),
    new Depends('transitionDuration', 'device'),
    new Depends('transitionEasing', 'device'),
    new Depends('transitionDirection', 'device'),
    new Depends('transitionDuration', 'transition'),
    new Depends('transitionEasing', 'transition'),
    new Depends('transitionDirection', 'transition')
  ]
  paramProtocol = [
    new ParamSignature(required, 'device', 'DECKLINK DEVICE', new ParameterValidator.DecklinkDeviceValidator()),
    new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
    new ParamSignature(optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
    new ParamSignature(optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
    new ParamSignature(optional, 'format', 'FORMAT', new ParameterValidator.ChannelFormatValidator()),
    new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ParameterValidator.ChannelLayoutValidator())
  ]
}

	/**
	 *
	 */
export class LoadHtmlPageBgCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'LOADBG'
  static readonly protocolLogic = [
    new Depends('transitionDuration', 'transition'),
    new Depends('transitionEasing', 'transition'),
    new Depends('transitionDirection', 'transition')
  ]
  paramProtocol = [
    new ParamSignature(required, 'url', '[HTML]', new ParameterValidator.URLValidator()),
    new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
    new ParamSignature(optional, 'auto', null, new ParameterValidator.BooleanValidatorWithDefaults('AUTO'))
  ]
}

	/**
	 *
	 */
export class LoadHtmlPageCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'LOAD'
  static readonly protocolLogic = [
    new Depends('transitionDuration', 'transition'),
    new Depends('transitionEasing', 'transition'),
    new Depends('transitionDirection', 'transition')
  ]
  paramProtocol = [
    new ParamSignature(required, 'url', '[HTML]', new ParameterValidator.URLValidator()),
    new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction))
  ]
}

	/**
	 *
	 */
export class PlayHtmlPageCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'PLAY'
  static readonly protocolLogic = [
    new Depends('transition', 'url'),
    new Depends('transitionDuration', 'url'),
    new Depends('transitionEasing', 'url'),
    new Depends('transitionDirection', 'url'),
    new Depends('transitionDuration', 'transition'),
    new Depends('transitionEasing', 'transition'),
    new Depends('transitionDirection', 'transition')
  ]
  paramProtocol = [
    new ParamSignature(optional, 'url', '[HTML]', new ParameterValidator.URLValidator()),
    new ParamSignature(optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction))
  ]
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
  static readonly commandString = 'CG'
  paramProtocol = [
    new ParamSignature(required, 'flashLayer', 'ADD', new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(required, 'templateName', null, new ParameterValidator.TemplateNameValidator()),
    new ParamSignature(required, 'playOnLoad', null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
    new ParamSignature(optional, 'data', null, new ParameterValidator.TemplateDataValidator())
  ]
}

	/**
	 *
	 */
export class CGPlayCommand extends AbstractLayerWithCgFallbackCommand {
  static readonly commandString = 'CG'
  paramProtocol = [
    new ParamSignature(required, 'flashLayer', 'PLAY', new ParameterValidator.PositiveNumberValidatorBetween(0))
  ]
}

	/**
	 *
	 */
export class CGStopCommand extends AbstractLayerWithCgFallbackCommand {
  static readonly commandString = 'CG'
  paramProtocol = [
    new ParamSignature(required, 'flashLayer', 'STOP', new ParameterValidator.PositiveNumberValidatorBetween(0))
  ]
}

	/**
	 *
	 */
export class CGNextCommand extends AbstractLayerWithCgFallbackCommand {
  static readonly commandString = 'CG'
  paramProtocol = [
    new ParamSignature(required, 'flashLayer', 'NEXT', new ParameterValidator.PositiveNumberValidatorBetween(0))
  ]
}

	/**
	 *
	 */
export class CGRemoveCommand extends AbstractLayerWithCgFallbackCommand {
  static readonly commandString = 'CG'
  paramProtocol = [
    new ParamSignature(required, 'flashLayer', 'REMOVE', new ParameterValidator.PositiveNumberValidatorBetween(0))
  ]
}

	/**
	 *
	 */
export class CGClearCommand extends AbstractLayerWithCgFallbackCommand {
  static readonly commandString = 'CG'

  paramProtocol = [
    new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('CLEAR'))
  ]

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'CLEAR'
  }
}

	/**
	 *
	 */
export class CGUpdateCommand extends AbstractLayerWithCgFallbackCommand {
  static readonly commandString = 'CG'
  paramProtocol = [
    new ParamSignature(required, 'flashLayer', 'UPDATE', new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(required, 'data', null, new ParameterValidator.TemplateDataValidator())
  ]
}

	/**
	 * @todo: 201 response code, parsing???????
	 */
export class CGInvokeCommand extends AbstractLayerWithCgFallbackCommand {
  static readonly commandString = 'CG'
  paramProtocol = [
    new ParamSignature(required, 'flashLayer', 'INVOKE', new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(required, 'method', null, new ParameterValidator.StringValidator())
  ]
  responseProtocol = new ResponseSignature(201)
}
}

/**
 * IMixer
 * @todo: switch 201/202 based on mode
 */
export namespace AMCP {
	/**
	 *
	 */
export class MixerKeyerCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'MIXER'
  static readonly protocolLogic = [
    new Depends('defer', 'keyer')
  ]
  paramProtocol = [
    new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('KEYER')),
    new ParamSignature(optional, 'keyer', null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
    new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
  ]

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'KEYER'
  }
}

	/**
	 * @todo	Validata/clamp lamp number range?
	 */
export class MixerChromaCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'MIXER'
  static readonly protocolLogic = [
    new Coupled('threshold', 'softness'),
    new Depends('keyer', 'threshold').ifNot('keyer', Enum.Chroma.NONE),
    new Depends('spill', 'threshold'),
    new Depends('transitionDuration', 'keyer'),
    new Depends('transitionEasing', 'keyer'),
    new Depends('defer', 'threshold').ifNot('keyer', Enum.Chroma.NONE)
  ]
  paramProtocol = [
    new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('CHROMA')),
    new ParamSignature(optional, 'keyer', null, new ParameterValidator.EnumValidator(Enum.Chroma)),
    new ParamSignature(optional, 'threshold', null, new ParameterValidator.NumberValidator()),
    new ParamSignature(optional, 'softness', null, new ParameterValidator.NumberValidator()),
    new ParamSignature(optional, 'spill', null, new ParameterValidator.NumberValidator()),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
  ]

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'CHROMA'
  }
}

	/**
	 *
	 */
export class MixerBlendCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'MIXER'
  static readonly protocolLogic = [
    new Depends('defer', 'blendmode')
  ]
  paramProtocol = [
    new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('BLEND')),
    new ParamSignature(optional, 'blendmode', null, new ParameterValidator.EnumValidator(Enum.BlendMode)),
    new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
  ]

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'BLEND'
  }
}

	/**
	 *
	 */
export class MixerOpacityCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'MIXER'
  static readonly protocolLogic = [
    new Depends('transitionDuration', 'opacity'),
    new Depends('transitionEasing', 'opacity'),
    new Depends('defer', 'opacity')
  ]
  paramProtocol = [
    new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('OPACITY')),
    new ParamSignature(optional, 'opacity', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
  ]

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'OPACITY'
  }
}

	/**
	 *
	 */
export class MixerBrightnessCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'MIXER'
  static readonly protocolLogic = [
    new Depends('transitionDuration', 'brightness'),
    new Depends('transitionEasing', 'brightness'),
    new Depends('defer', 'brightness')
  ]
  paramProtocol = [
    new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('BRIGHTNESS')),
    new ParamSignature(optional, 'brightness', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
  ]

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'BRIGHTNESS'
  }
}

	/**
	 *
	 */
export class MixerSaturationCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'MIXER'
  static readonly protocolLogic = [
    new Depends('transitionDuration', 'saturation'),
    new Depends('transitionEasing', 'saturation'),
    new Depends('defer', 'saturation')
  ]
  paramProtocol = [
    new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('SATURATION')),
    new ParamSignature(optional, 'saturation', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
  ]

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'SATURATION'
  }
}

	/**
	 *
	 */
export class MixerContrastCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'MIXER'
  static readonly protocolLogic = [
    new Depends('transitionDuration', 'contrast'),
    new Depends('transitionEasing', 'contrast'),
    new Depends('defer', 'contrast')
  ]
  paramProtocol = [
    new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('CONTRAST')),
    new ParamSignature(optional, 'contrast', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
  ]

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'CONTRAST'
  }
}

	/**
	 * @todo:	verify `gamma` value range
	 */
export class MixerLevelsCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'MIXER'
  static readonly protocolLogic = [
    new Coupled('minInput', 'maxInput', 'gamma', 'minOutput', 'maxOutput'),
    new Depends('transitionDuration', 'minInput'),
    new Depends('transitionEasing', 'minInput'),
    new Depends('defer', 'minInput')
  ]
  paramProtocol = [
    new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('LEVELS')),
    new ParamSignature(optional, 'minInput', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
    new ParamSignature(optional, 'maxInput', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
    new ParamSignature(optional, 'gamma', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'minOutput', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
    new ParamSignature(optional, 'maxOutput', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
  ]

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'LEVELS'
  }
}

	/**
	 *
	 */
export class MixerFillCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'MIXER'
  static readonly protocolLogic = [
    new Coupled('x', 'y', 'xScale', 'yScale'),
    new Depends('transitionDuration', 'x'),
    new Depends('transitionEasing', 'x'),
    new Depends('defer', 'x')
  ]
  paramProtocol = [
    new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('FILL')),
    new ParamSignature(optional, 'x', null, new ParameterValidator.NumberValidator()),
    new ParamSignature(optional, 'y', null, new ParameterValidator.NumberValidator()),
    new ParamSignature(optional, 'xScale', null, new ParameterValidator.NumberValidator()),
    new ParamSignature(optional, 'yScale', null, new ParameterValidator.NumberValidator()),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
  ]

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'FILL'
  }
}

	/**
	 *
	 */
export class MixerClipCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'MIXER'
  static readonly protocolLogic = [
    new Coupled('x', 'y', 'width', 'height'),
    new Depends('transitionDuration', 'x'),
    new Depends('transitionEasing', 'x'),
    new Depends('defer', 'x')
  ]
  paramProtocol = [
    new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('CLIP')),
    new ParamSignature(optional, 'x', null, new ParameterValidator.NumberValidator()),
    new ParamSignature(optional, 'y', null, new ParameterValidator.NumberValidator()),
    new ParamSignature(optional, 'width', null, new ParameterValidator.NumberValidator()),
    new ParamSignature(optional, 'height', null, new ParameterValidator.NumberValidator()),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
  ]

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'CLIP'
  }
}

	/**
	 *
	 */
export class MixerAnchorCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'MIXER'
  static readonly protocolLogic = [
    new Coupled('x', 'y'),
    new Depends('transitionDuration', 'x'),
    new Depends('transitionEasing', 'x'),
    new Depends('defer', 'x')
  ]
  paramProtocol = [
    new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('ANCHOR')),
    new ParamSignature(optional, 'x', null, new ParameterValidator.NumberValidator()),
    new ParamSignature(optional, 'y', null, new ParameterValidator.NumberValidator()),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
  ]

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'ANCHOR'
  }
}

	/**
	 *
	 */
export class MixerCropCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'MIXER'
  static readonly protocolLogic = [
    new Coupled('left', 'top', 'right', 'bottom'),
    new Depends('transitionDuration', 'x'),
    new Depends('transitionEasing', 'x'),
    new Depends('defer', 'x')
  ]
  paramProtocol = [
    new ParamSignature(required, 'keyword', null, new ParameterValidator.KeywordValidator('CROP')),
    new ParamSignature(optional, 'left', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
    new ParamSignature(optional, 'top', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
    new ParamSignature(optional, 'right', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
    new ParamSignature(optional, 'bottom', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
    new ParamSignature(optional, 'transitionDuration', null, new ParameterValidator.PositiveNumberValidatorBetween(0)),
    new ParamSignature(optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
    new ParamSignature(optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER'))
  ]

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'CROP'
  }
}

	/**
	 *
	 */
export class MixerRotationCommand extends AbstractLayerWithFallbackCommand {
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
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'ROTATION'
  }
}

	/**
	 *
	 */
export class MixerPerspectiveCommand extends AbstractLayerWithFallbackCommand {
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
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'PERSPECTIVE'
  }
}

	/**
	 *
	 */
export class MixerMipmapCommand extends AbstractLayerWithFallbackCommand {
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
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['keyword'] = 'MIPMAP'
  }
}

	/**
	 *
	 */
export class MixerVolumeCommand extends AbstractLayerWithFallbackCommand {
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
  constructor (params: (string|Param|(string|Param)[])) {
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
  constructor (params: (string|Param|(string|Param)[])) {
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
  constructor (params: (string|Param|(string|Param)[])) {
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
  constructor (params: (string|Param|(string|Param)[])) {
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
  constructor (params: (string|Param|(string|Param)[])) {
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
  constructor (params: (string|Param|(string|Param)[])) {
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
export class CallCommand extends AbstractLayerWithFallbackCommand {
  static readonly commandString = 'CALL'
}

	/**
	 *
	 */
export class SwapCommand extends AbstractChannelOrLayerCommand {
  static readonly commandString = 'SWAP'

		/**
		 *
		 */
  constructor () {
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
export class RemoveCommand extends AbstractChannelOrLayerCommand {
  static readonly commandString = 'REMOVE'
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
  constructor (params?: (string|Param|(string|Param)[])) {
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
  constructor (params: (string|Param|(string|Param)[]), context?: Object) {
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
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['delay'] = 'DELAY'
  }
}

	/**
	 * @todo: response validator/parser
	 */
export class CGInfoCommand extends AbstractLayerWithCgFallbackCommand {
  static readonly commandString = 'CG'

  paramProtocol = [
    new ParamSignature(required, 'info', null, new ParameterValidator.KeywordValidator('INFO')),
    new ParamSignature(optional, 'flashLayer', null, new ParameterValidator.PositiveNumberValidatorBetween(0))
  ]
  responseProtocol = new ResponseSignature(201)

		/**
		 *
		 */
  constructor (params: (string|Param|(string|Param)[])) {
    super(params)
    this._objectParams['info'] = 'INFO'
  }
}

	/**
	 *
	 */
export class GlInfoCommand extends AbstractCommand {
  static readonly commandString = 'GL INFO'
  responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.GLParser)
}

	/**
	 *
	 */
export class LogLevelCommand extends AbstractCommand {
  static readonly commandString = 'LOG LEVEL'
  paramProtocol = [
    new ParamSignature(optional, 'level', null, new ParameterValidator.EnumValidator(Enum.LogLevel))
  ]
}

	/**
	 * @protocol	Needs either `calltrace` or `communication` parameter.
	 */
export class LogCategoryCommand extends AbstractCommand {
  static readonly commandString = 'LOG CATEGORY'
  static readonly protocolLogic = [
    new OneOf('calltrace', 'communication')
  ]
  paramProtocol = [
    new ParamSignature(optional, 'calltrace', Enum.LogCategory.CALLTRACE.value, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
    new ParamSignature(optional, 'communication', Enum.LogCategory.COMMUNICATION.value, new ParameterValidator.BooleanValidatorWithDefaults(1, 0))
  ]
}

	/**
	 *
	 */
export class DiagCommand extends AbstractCommand {
  static readonly commandString = 'DIAG'
}

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
}
