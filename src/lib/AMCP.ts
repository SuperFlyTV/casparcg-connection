import * as Enum from './ServerStateEnum'
// ResponseNS
import { ResponseSignature } from './ResponseSignature'
import * as ResponseValidator from './ResponseValidators'
import * as ResponseParser from './ResponseParsers'

// Command NS
import {
	AbstractCommand,
	AbstractOrChannelOrLayerCommand,
	AbstractChannelCommand,
	AbstractChannelOrLayerCommand,
	AbstractLayerWithFallbackCommand,
	AbstractLayerWithCgFallbackCommand,
} from './AbstractCommand'
// Param NS
import { Param, Required, Optional, ParamSignature } from './ParamSignature'
// Validation NS
import * as ParameterValidator from './ParamValidators'
// Protocol NS
import { Depends, Coupled, OneOf } from './ProtocolLogic'

/**
 * Internal
 */
export class CustomCommand extends AbstractCommand {
	static readonly commandString = ''
	paramProtocol = [new ParamSignature(Required, 'command', null, new ParameterValidator.StringValidator(false))]
}

/**
 * IVideo
 */
/**
 *
 */
export class LoadbgCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'LOADBG'
	static readonly protocolLogic = [
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('stingTransitionProperties', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING),
	]
	paramProtocol = [
		new ParamSignature(Required, 'clip', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'loop', null, new ParameterValidator.BooleanValidatorWithDefaults('LOOP')),
		new ParamSignature(Optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
		new ParamSignature(
			Optional,
			'stingTransitionProperties',
			null,
			new ParameterValidator.StingTransitionPropertiesValidator()
		),
		new ParamSignature(Optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(
			Optional,
			'stingOverlayFilename',
			null,
			new ParameterValidator.ClipNameEmptyStringValidator()
		),
		new ParamSignature(Optional, 'in', 'IN', new ParameterValidator.FrameValidator('IN')),
		new ParamSignature(Optional, 'seek', 'SEEK', new ParameterValidator.FrameValidator('SEEK')),
		new ParamSignature(Optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
		new ParamSignature(Optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'afilter', 'AF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'vfilter', 'VF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'auto', null, new ParameterValidator.BooleanValidatorWithDefaults('AUTO')),
		new ParamSignature(
			Optional,
			'channelLayout',
			'CHANNEL_LAYOUT',
			new ParameterValidator.ChannelLayoutValidator()
		),
		new ParamSignature(
			Optional,
			'clearOn404',
			null,
			new ParameterValidator.BooleanValidatorWithDefaults('CLEAR_ON_404')
		),
	]
}

/**
 *
 */
export class LoadCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'LOAD'
	static readonly protocolLogic = [
		new Depends('loop', 'clip'),
		new Depends('in', 'clip'),
		new Depends('seek', 'clip'),
		new Depends('length', 'clip'),
		new Depends('filter', 'clip'),
		new Depends('transition', 'clip'),
		new Depends('channelLayout', 'clip'),
		new Depends('clearOn404', 'clip'),
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('stingTransitionProperties', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING),
	]
	paramProtocol = [
		new ParamSignature(Optional, 'clip', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'loop', null, new ParameterValidator.BooleanValidatorWithDefaults('LOOP')),
		new ParamSignature(Optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
		new ParamSignature(
			Optional,
			'stingTransitionProperties',
			null,
			new ParameterValidator.StingTransitionPropertiesValidator()
		),
		new ParamSignature(Optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(
			Optional,
			'stingOverlayFilename',
			null,
			new ParameterValidator.ClipNameEmptyStringValidator()
		),
		new ParamSignature(Optional, 'in', 'IN', new ParameterValidator.FrameValidator('IN')),
		new ParamSignature(Optional, 'seek', 'SEEK', new ParameterValidator.FrameValidator('SEEK')),
		new ParamSignature(Optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
		new ParamSignature(Optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'afilter', 'AF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'vfilter', 'VF', new ParameterValidator.FilterValidator()),
		new ParamSignature(
			Optional,
			'channelLayout',
			'CHANNEL_LAYOUT',
			new ParameterValidator.ChannelLayoutValidator()
		),
		new ParamSignature(
			Optional,
			'clearOn404',
			null,
			new ParameterValidator.BooleanValidatorWithDefaults('CLEAR_ON_404')
		),
	]
}

/**
 *
 */
export class PlayCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'PLAY'
	static readonly protocolLogic = [
		new Depends('loop', 'clip'),
		new Depends('in', 'clip'),
		new Depends('seek', 'clip'),
		new Depends('length', 'clip'),
		new Depends('filter', 'clip'),
		new Depends('transition', 'clip'),
		new Depends('channelLayout', 'clip'),
		new Depends('clearOn404', 'clip'),
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('stingTransitionProperties', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING),
	]
	paramProtocol = [
		new ParamSignature(Optional, 'clip', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'loop', null, new ParameterValidator.BooleanValidatorWithDefaults('LOOP')),
		new ParamSignature(Optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
		new ParamSignature(
			Optional,
			'stingTransitionProperties',
			null,
			new ParameterValidator.StingTransitionPropertiesValidator()
		),
		new ParamSignature(Optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(
			Optional,
			'stingOverlayFilename',
			null,
			new ParameterValidator.ClipNameEmptyStringValidator()
		),
		new ParamSignature(Optional, 'in', 'IN', new ParameterValidator.FrameValidator('IN')),
		new ParamSignature(Optional, 'seek', 'SEEK', new ParameterValidator.FrameValidator('SEEK')),
		new ParamSignature(Optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
		new ParamSignature(Optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'afilter', 'AF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'vfilter', 'VF', new ParameterValidator.FilterValidator()),
		new ParamSignature(
			Optional,
			'channelLayout',
			'CHANNEL_LAYOUT',
			new ParameterValidator.ChannelLayoutValidator()
		),
		new ParamSignature(
			Optional,
			'clearOn404',
			null,
			new ParameterValidator.BooleanValidatorWithDefaults('CLEAR_ON_404')
		),
	]
}

/**
 *
 */
export class PauseCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'PAUSE'
	paramProtocol = []
}

/**
 *
 */
export class ResumeCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'RESUME'
	paramProtocol = []
}

/**
 *
 */
export class StopCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'STOP'
	paramProtocol = []
}

/**
 * IInputOutput
 */

/**
 *
 */
export class LoadDecklinkBgCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'LOADBG'
	static readonly protocolLogic = [
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('stingTransitionProperties', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING),
	]
	paramProtocol = [
		new ParamSignature(Required, 'device', 'DECKLINK DEVICE', new ParameterValidator.DecklinkDeviceValidator()),
		new ParamSignature(Optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
		new ParamSignature(
			Optional,
			'stingTransitionProperties',
			null,
			new ParameterValidator.StingTransitionPropertiesValidator()
		),
		new ParamSignature(Optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(
			Optional,
			'stingOverlayFilename',
			null,
			new ParameterValidator.ClipNameEmptyStringValidator()
		),
		new ParamSignature(Optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
		new ParamSignature(Optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'afilter', 'AF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'vfilter', 'VF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'format', 'FORMAT', new ParameterValidator.ChannelFormatValidator()),
		new ParamSignature(
			Optional,
			'channelLayout',
			'CHANNEL_LAYOUT',
			new ParameterValidator.ChannelLayoutValidator()
		),
		new ParamSignature(Optional, 'auto', null, new ParameterValidator.BooleanValidatorWithDefaults('AUTO')),
	]
}

/**
 *
 */
export class LoadDecklinkCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'LOAD'
	static readonly protocolLogic = [
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('stingTransitionProperties', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING),
	]
	paramProtocol = [
		new ParamSignature(Required, 'device', 'DECKLINK DEVICE', new ParameterValidator.DecklinkDeviceValidator()),
		new ParamSignature(Optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
		new ParamSignature(
			Optional,
			'stingTransitionProperties',
			null,
			new ParameterValidator.StingTransitionPropertiesValidator()
		),
		new ParamSignature(Optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(
			Optional,
			'stingOverlayFilename',
			null,
			new ParameterValidator.ClipNameEmptyStringValidator()
		),
		new ParamSignature(Optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
		new ParamSignature(Optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'afilter', 'AF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'vfilter', 'VF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'format', 'FORMAT', new ParameterValidator.ChannelFormatValidator()),
		new ParamSignature(
			Optional,
			'channelLayout',
			'CHANNEL_LAYOUT',
			new ParameterValidator.ChannelLayoutValidator()
		),
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
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('stingTransitionProperties', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING),
	]
	paramProtocol = [
		new ParamSignature(Required, 'device', 'DECKLINK DEVICE', new ParameterValidator.DecklinkDeviceValidator()),
		new ParamSignature(Optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
		new ParamSignature(
			Optional,
			'stingTransitionProperties',
			null,
			new ParameterValidator.StingTransitionPropertiesValidator()
		),
		new ParamSignature(Optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(
			Optional,
			'stingOverlayFilename',
			null,
			new ParameterValidator.ClipNameEmptyStringValidator()
		),
		new ParamSignature(Optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
		new ParamSignature(Optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'afilter', 'AF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'vfilter', 'VF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'format', 'FORMAT', new ParameterValidator.ChannelFormatValidator()),
		new ParamSignature(
			Optional,
			'channelLayout',
			'CHANNEL_LAYOUT',
			new ParameterValidator.ChannelLayoutValidator()
		),
	]
}

/**
 *
 */
export class LoadRouteBgCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'LOADBG'
	static readonly protocolLogic = [
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('stingTransitionProperties', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING),
	]
	paramProtocol = [
		new ParamSignature(Required, 'route', null, new ParameterValidator.RouteValidator()),
		new ParamSignature(Optional, 'mode', null, new ParameterValidator.RouteModeValidator()),
		new ParamSignature(Optional, 'framesDelay', 'FRAMES_DELAY', new ParameterValidator.RouteFramesDelayValidator()),
		new ParamSignature(Optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
		new ParamSignature(
			Optional,
			'stingTransitionProperties',
			null,
			new ParameterValidator.StingTransitionPropertiesValidator()
		),
		new ParamSignature(Optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(
			Optional,
			'stingOverlayFilename',
			null,
			new ParameterValidator.ClipNameEmptyStringValidator()
		),
		new ParamSignature(Optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
		new ParamSignature(Optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'afilter', 'AF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'vfilter', 'VF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'auto', null, new ParameterValidator.BooleanValidatorWithDefaults('AUTO')),
		new ParamSignature(
			Optional,
			'channelLayout',
			'CHANNEL_LAYOUT',
			new ParameterValidator.ChannelLayoutValidator()
		),
	]
}

/**
 *
 */
export class LoadRouteCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'LOAD'
	static readonly protocolLogic = [
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('stingTransitionProperties', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING),
	]
	paramProtocol = [
		new ParamSignature(Required, 'route', null, new ParameterValidator.RouteValidator()),
		new ParamSignature(Optional, 'mode', null, new ParameterValidator.RouteModeValidator()),
		new ParamSignature(Optional, 'framesDelay', 'FRAMES_DELAY', new ParameterValidator.RouteFramesDelayValidator()),
		new ParamSignature(Optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
		new ParamSignature(
			Optional,
			'stingTransitionProperties',
			null,
			new ParameterValidator.StingTransitionPropertiesValidator()
		),
		new ParamSignature(Optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(
			Optional,
			'stingOverlayFilename',
			null,
			new ParameterValidator.ClipNameEmptyStringValidator()
		),
		new ParamSignature(Optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
		new ParamSignature(Optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'afilter', 'AF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'vfilter', 'VF', new ParameterValidator.FilterValidator()),
		new ParamSignature(
			Optional,
			'channelLayout',
			'CHANNEL_LAYOUT',
			new ParameterValidator.ChannelLayoutValidator()
		),
	]
}

/**
 *
 */
export class PlayRouteCommand extends AbstractLayerWithFallbackCommand {
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
		new Depends('stingTransitionProperties', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING),
	]
	paramProtocol = [
		new ParamSignature(Required, 'route', null, new ParameterValidator.RouteValidator()),
		new ParamSignature(Optional, 'mode', null, new ParameterValidator.RouteModeValidator()),
		new ParamSignature(Optional, 'framesDelay', 'FRAMES_DELAY', new ParameterValidator.RouteFramesDelayValidator()),
		new ParamSignature(Optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
		new ParamSignature(
			Optional,
			'stingTransitionProperties',
			null,
			new ParameterValidator.StingTransitionPropertiesValidator()
		),
		new ParamSignature(Optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(
			Optional,
			'stingOverlayFilename',
			null,
			new ParameterValidator.ClipNameEmptyStringValidator()
		),
		new ParamSignature(Optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
		new ParamSignature(Optional, 'filter', 'FILTER', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'afilter', 'AF', new ParameterValidator.FilterValidator()),
		new ParamSignature(Optional, 'vfilter', 'VF', new ParameterValidator.FilterValidator()),
		new ParamSignature(
			Optional,
			'channelLayout',
			'CHANNEL_LAYOUT',
			new ParameterValidator.ChannelLayoutValidator()
		),
	]
}

/**
 *
 */
export class LoadHtmlPageBgCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'LOADBG'
	static readonly protocolLogic = [
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('stingTransitionProperties', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING),
	]
	paramProtocol = [
		new ParamSignature(Required, 'url', '[HTML]', new ParameterValidator.URLValidator()),
		new ParamSignature(Optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
		new ParamSignature(
			Optional,
			'stingTransitionProperties',
			null,
			new ParameterValidator.StingTransitionPropertiesValidator()
		),
		new ParamSignature(Optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(
			Optional,
			'stingOverlayFilename',
			null,
			new ParameterValidator.ClipNameEmptyStringValidator()
		),
		new ParamSignature(Optional, 'auto', null, new ParameterValidator.BooleanValidatorWithDefaults('AUTO')),
	]
}

/**
 *
 */
export class LoadHtmlPageCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'LOAD'
	static readonly protocolLogic = [
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('stingTransitionProperties', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING),
	]
	paramProtocol = [
		new ParamSignature(Required, 'url', '[HTML]', new ParameterValidator.URLValidator()),
		new ParamSignature(Optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
		new ParamSignature(
			Optional,
			'stingTransitionProperties',
			null,
			new ParameterValidator.StingTransitionPropertiesValidator()
		),
		new ParamSignature(Optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(
			Optional,
			'stingOverlayFilename',
			null,
			new ParameterValidator.ClipNameEmptyStringValidator()
		),
	]
}

/**
 *
 */
export class PlayHtmlPageCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'PLAY'
	static readonly protocolLogic = [
		new Depends('transition', 'url'),
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Enum.Transition.STING),
		new Depends('stingTransitionProperties', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Enum.Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Enum.Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Enum.Transition.STING),
	]
	paramProtocol = [
		new ParamSignature(Optional, 'url', '[HTML]', new ParameterValidator.URLValidator()),
		new ParamSignature(Optional, 'transition', null, new ParameterValidator.EnumValidator(Enum.Transition)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'transitionDirection', null, new ParameterValidator.EnumValidator(Enum.Direction)),
		new ParamSignature(
			Optional,
			'stingTransitionProperties',
			null,
			new ParameterValidator.StingTransitionPropertiesValidator()
		),
		new ParamSignature(Optional, 'stingMaskFilename', null, new ParameterValidator.ClipNameValidator()),
		new ParamSignature(Optional, 'stingDelay', null, new ParameterValidator.PositiveNumberValidator()),
		new ParamSignature(
			Optional,
			'stingOverlayFilename',
			null,
			new ParameterValidator.ClipNameEmptyStringValidator()
		),
	]
}

/**
 * ICG
 */

/**
 *
 */
export class CGAddCommand extends AbstractLayerWithCgFallbackCommand {
	static readonly commandString = 'CG'
	paramProtocol = [
		new ParamSignature(Required, 'flashLayer', 'ADD', new ParameterValidator.PositiveNumberValidatorBetween()),
		new ParamSignature(Required, 'templateName', null, new ParameterValidator.TemplateNameValidator()),
		new ParamSignature(Required, 'playOnLoad', null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
		new ParamSignature(Optional, 'data', null, new ParameterValidator.TemplateDataValidator()),
	]
}

/**
 *
 */
export class CGPlayCommand extends AbstractLayerWithCgFallbackCommand {
	static readonly commandString = 'CG'
	paramProtocol = [
		new ParamSignature(Required, 'flashLayer', 'PLAY', new ParameterValidator.PositiveNumberValidatorBetween()),
	]
}

/**
 *
 */
export class CGStopCommand extends AbstractLayerWithCgFallbackCommand {
	static readonly commandString = 'CG'
	paramProtocol = [
		new ParamSignature(Required, 'flashLayer', 'STOP', new ParameterValidator.PositiveNumberValidatorBetween()),
	]
}

/**
 *
 */
export class CGNextCommand extends AbstractLayerWithCgFallbackCommand {
	static readonly commandString = 'CG'
	paramProtocol = [
		new ParamSignature(Required, 'flashLayer', 'NEXT', new ParameterValidator.PositiveNumberValidatorBetween()),
	]
}

/**
 *
 */
export class CGRemoveCommand extends AbstractLayerWithCgFallbackCommand {
	static readonly commandString = 'CG'
	paramProtocol = [
		new ParamSignature(Required, 'flashLayer', 'REMOVE', new ParameterValidator.PositiveNumberValidatorBetween()),
	]
}

/**
 *
 */
export class CGClearCommand extends AbstractLayerWithCgFallbackCommand {
	static readonly commandString = 'CG'

	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('CLEAR'))]

	constructor(params: string | Param | (string | Param)[]) {
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
		new ParamSignature(Required, 'flashLayer', 'UPDATE', new ParameterValidator.PositiveNumberValidatorBetween()),
		new ParamSignature(Required, 'data', null, new ParameterValidator.TemplateDataValidator()),
	]
}

/**
 * @todo: 201 response code, parsing???????
 */
export class CGInvokeCommand extends AbstractLayerWithCgFallbackCommand {
	static readonly commandString = 'CG'
	paramProtocol = [
		new ParamSignature(Required, 'flashLayer', 'INVOKE', new ParameterValidator.PositiveNumberValidatorBetween()),
		new ParamSignature(Required, 'method', null, new ParameterValidator.StringValidator()),
	]
	responseProtocol = new ResponseSignature(201)
}

/**
 * IMixer
 * @todo: switch 201/202 based on mode
 */

/**
 *
 */
export class MixerKeyerCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = [new Depends('defer', 'keyer')]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('KEYER')),
		new ParamSignature(Optional, 'keyer', null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'KEYER'
	}
}

/**
 *
 */
export class MixerStatusKeyerCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('KEYER'))]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusKeyerParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Depends('defer', 'threshold').ifNot('keyer', Enum.Chroma.NONE),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('CHROMA')),
		new ParamSignature(Optional, 'keyer', null, new ParameterValidator.EnumValidator(Enum.Chroma)),
		new ParamSignature(Optional, 'threshold', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'softness', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'spill', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'CHROMA'
	}
}

export class MixerStatusChromaCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('CHROMA'))]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusChromaParser
	)

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'CHROMA'
	}
}

/**
 *
 */
export class MixerBlendCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = [new Depends('defer', 'blendmode')]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('BLEND')),
		new ParamSignature(Optional, 'blendmode', null, new ParameterValidator.EnumValidator(Enum.BlendMode)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'BLEND'
	}
}

/**
 *
 */
export class MixerStatusBlendCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('BLEND'))]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.StringValidator,
		ResponseParser.MixerStatusBlendParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Depends('defer', 'opacity'),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('OPACITY')),
		new ParamSignature(Optional, 'opacity', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'OPACITY'
	}
}

/**
 *
 */
export class MixerStatusOpacityCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('OPACITY'))]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusOpacityParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Depends('defer', 'brightness'),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('BRIGHTNESS')),
		new ParamSignature(Optional, 'brightness', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'BRIGHTNESS'
	}
}

/**
 *
 */
export class MixerStatusBrightnessCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('BRIGHTNESS')),
	]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusBrightnessParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Depends('defer', 'saturation'),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('SATURATION')),
		new ParamSignature(Optional, 'saturation', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'SATURATION'
	}
}

/**
 *
 */
export class MixerStatusSaturationCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('SATURATION')),
	]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusSaturationParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Depends('defer', 'contrast'),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('CONTRAST')),
		new ParamSignature(Optional, 'contrast', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'CONTRAST'
	}
}

/**
 *
 */
export class MixerStatusContrastCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('CONTRAST'))]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusContrastParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Depends('defer', 'minInput'),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('LEVELS')),
		new ParamSignature(Optional, 'minInput', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(Optional, 'maxInput', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(Optional, 'gamma', null, new ParameterValidator.PositiveNumberValidatorBetween()),
		new ParamSignature(Optional, 'minOutput', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(Optional, 'maxOutput', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'LEVELS'
	}
}

/**
 *
 */
export class MixerStatusLevelsCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('LEVELS'))]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusLevelsParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Depends('defer', 'x'),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('FILL')),
		new ParamSignature(Optional, 'x', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'y', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'xScale', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'yScale', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'FILL'
	}
}

/**
 *
 */
export class MixerStatusFillCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('FILL'))]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusFillParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Depends('defer', 'x'),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('CLIP')),
		new ParamSignature(Optional, 'x', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'y', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'width', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'height', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'CLIP'
	}
}

/**
 *
 */
export class MixerStatusClipCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('CLIP'))]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusClipParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Depends('defer', 'x'),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('ANCHOR')),
		new ParamSignature(Optional, 'x', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'y', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'ANCHOR'
	}
}

/**
 *
 */
export class MixerStatusAnchorCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('ANCHOR'))]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusAnchorParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Depends('transitionDuration', 'left'),
		new Depends('transitionEasing', 'left'),
		new Depends('defer', 'left'),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('CROP')),
		new ParamSignature(Optional, 'left', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(Optional, 'top', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(Optional, 'right', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(Optional, 'bottom', null, new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'CROP'
	}
}

/**
 *
 */
export class MixerStatusCropCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('CROP'))]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusCropParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Depends('defer', 'rotation'),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('ROTATION')),
		new ParamSignature(Optional, 'rotation', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'transitionDuration', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'ROTATION'
	}
}

/**
 *
 */
export class MixerStatusRotationCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('ROTATION'))]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusRotationParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Coupled(
			'topLeftX',
			'topLeftY',
			'topRightX',
			'topRightY',
			'bottomRightX',
			'bottomRightY',
			'bottomLeftX',
			'bottomLeftY'
		),
		new Depends('transitionDuration', 'topLeftX'),
		new Depends('transitionEasing', 'topLeftX'),
		new Depends('defer', 'topLeftX'),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('PERSPECTIVE')),
		new ParamSignature(Optional, 'topLeftX', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'topLeftY', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'topRightX', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'topRightY', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'bottomRightX', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'bottomRightY', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'bottomLeftX', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'bottomLeftY', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'transitionDuration', null, new ParameterValidator.NumberValidator()),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'PERSPECTIVE'
	}
}

/**
 *
 */
export class MixerStatusPerspectiveCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('PERSPECTIVE')),
	]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusPerspectiveParser
	)

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'PERSPECTIVE'
	}
}

/**
 *
 */
export class MixerMipmapCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = [new Depends('defer', 'mipmap')]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('MIPMAP')),
		new ParamSignature(Optional, 'mipmap', null, new ParameterValidator.BooleanValidatorWithDefaults(1, 0)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'MIPMAP'
	}
}

/**
 *
 */
export class MixerStatusMipmapCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('MIPMAP'))]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusMipmapParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Depends('defer', 'volume'),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('VOLUME')),
		new ParamSignature(Optional, 'volume', null, new ParameterValidator.PositiveNumberValidatorBetween()),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'VOLUME'
	}
}

/**
 *
 */
export class MixerStatusVolumeCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('VOLUME'))]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusVolumeParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new Depends('defer', 'mastervolume'),
	]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('MASTERVOLUME')),
		new ParamSignature(Optional, 'mastervolume', null, new ParameterValidator.PositiveNumberValidatorBetween()),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'MASTERVOLUME'
	}
}

/**
 *
 */
export class MixerStatusMastervolumeCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('MASTERVOLUME')),
	]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusMastervolumeParser
	)

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'MASTERVOLUME'
	}
}

/**
 *
 */
export class MixerStraightAlphaOutputCommand extends AbstractChannelCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = [new Depends('defer', 'straight_alpha_output')]
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('STRAIGHT_ALPHA_OUTPUT')),
		new ParamSignature(
			Optional,
			'straight_alpha_output',
			null,
			new ParameterValidator.BooleanValidatorWithDefaults(1, 0)
		),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'STRAIGHT_ALPHA_OUTPUT'
	}
}

/**
 *
 */
export class MixerStatusStraightAlphaOutputCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'MIXER'
	static readonly protocolLogic = []
	paramProtocol = [
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('STRAIGHT_ALPHA_OUTPUT')),
	]
	responseProtocol = new ResponseSignature(
		201,
		ResponseValidator.MixerStatusValidator,
		ResponseParser.MixerStatusStraightAlphaOutputParser
	)

	constructor(params: string | Param | (string | Param)[]) {
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
		new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('GRID')),
		new ParamSignature(Optional, 'resolution', null, new ParameterValidator.PositiveNumberRoundValidatorBetween(1)),
		new ParamSignature(
			Optional,
			'transitionDuration',
			null,
			new ParameterValidator.PositiveNumberValidatorBetween()
		),
		new ParamSignature(Optional, 'transitionEasing', null, new ParameterValidator.EnumValidator(Enum.Ease)),
		new ParamSignature(Optional, 'defer', null, new ParameterValidator.BooleanValidatorWithDefaults('DEFER')),
	]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'GRID'
	}
}

/**
 *
 */
export class MixerCommitCommand extends AbstractChannelCommand {
	static readonly commandString = 'MIXER'
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('COMMIT'))]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'COMMIT'
	}
}

/**
 *
 */
export class MixerClearCommand extends AbstractChannelOrLayerCommand {
	static readonly commandString = 'MIXER'
	paramProtocol = [new ParamSignature(Required, 'keyword', null, new ParameterValidator.KeywordValidator('CLEAR'))]

	constructor(params: string | Param | (string | Param)[]) {
		super(params)
		this._objectParams['keyword'] = 'CLEAR'
	}
}

/**
 * IChannel
 */

/**
 *
 */
export class ClearCommand extends AbstractChannelOrLayerCommand {
	static readonly commandString = 'CLEAR'
	paramProtocol = []
}

/**
 *
 */
export class CallCommand extends AbstractLayerWithFallbackCommand {
	static readonly commandString = 'CALL'

	static readonly protocolLogic = [new OneOf('seek', 'loop', 'in', 'start', 'out', 'length')]
	paramProtocol = [
		new ParamSignature(Optional, 'seek', 'SEEK', new ParameterValidator.FrameValidator('SEEK')),
		new ParamSignature(Optional, 'loop', 'loop', new ParameterValidator.PositiveNumberValidatorBetween(0, 1)),
		new ParamSignature(Optional, 'in', 'IN', new ParameterValidator.FrameValidator('IN')),
		new ParamSignature(Optional, 'start', 'START', new ParameterValidator.FrameValidator('START')),
		new ParamSignature(Optional, 'out', 'OUT', new ParameterValidator.FrameValidator('OUT')),
		new ParamSignature(Optional, 'length', 'LENGTH', new ParameterValidator.FrameValidator('LENGTH')),
	]
}

/**
 *
 */
export class SwapCommand extends AbstractChannelOrLayerCommand {
	static readonly commandString = 'SWAP'
	paramProtocol = []

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
	paramProtocol = []
}

/**
 *
 */
export class AddDecklinkCommand extends AbstractChannelOrLayerCommand {
	static readonly commandString = 'ADD'
	paramProtocol = [
		new ParamSignature(Required, 'device', 'DECKLINK', new ParameterValidator.DecklinkDeviceValidator()),
	]
}

/**
 *
 */
export class AddImageCommand extends AbstractChannelOrLayerCommand {
	static readonly commandString = 'ADD'
	paramProtocol = [new ParamSignature(Required, 'fileName', 'IMAGE', new ParameterValidator.StringValidator())]
}

/**
 *
 */
export class AddFileCommand extends AbstractChannelOrLayerCommand {
	static readonly commandString = 'ADD'
	paramProtocol = [new ParamSignature(Required, 'fileName', 'FILE', new ParameterValidator.StringValidator())]
}

/**
 *
 */
export class AddStreamCommand extends AbstractChannelOrLayerCommand {
	static readonly commandString = 'ADD'
	paramProtocol = [
		new ParamSignature(Required, 'uri', 'STREAM', new ParameterValidator.StringValidator()),
		new ParamSignature(Required, 'params', null, new ParameterValidator.StringValidator()),
	]
}

/**
 *
 */
export class RemoveCommand extends AbstractChannelOrLayerCommand {
	static readonly commandString = 'REMOVE'
	paramProtocol = []
}
export class RemoveDecklinkCommand extends AbstractChannelOrLayerCommand {
	static readonly commandString = 'REMOVE'
	paramProtocol = [
		new ParamSignature(Required, 'device', 'DECKLINK', new ParameterValidator.DecklinkDeviceValidator()),
	]
}

/**
 *
 */
export class RemoveImageCommand extends AbstractChannelOrLayerCommand {
	static readonly commandString = 'REMOVE'
	paramProtocol = [new ParamSignature(Required, 'fileName', 'IMAGE', new ParameterValidator.StringValidator())]
}

/**
 *
 */
export class RemoveFileCommand extends AbstractChannelOrLayerCommand {
	static readonly commandString = 'REMOVE'
	paramProtocol = [new ParamSignature(Required, 'fileName', 'FILE', new ParameterValidator.StringValidator())]
}

/**
 *
 */
export class RemoveStreamCommand extends AbstractChannelOrLayerCommand {
	static readonly commandString = 'REMOVE'
	paramProtocol = [new ParamSignature(Required, 'uri', 'STREAM', new ParameterValidator.StringValidator())]
}

/**
 *
 */
export class PrintCommand extends AbstractChannelCommand {
	static readonly commandString = 'PRINT'
	paramProtocol = []
}

/**
 *
 */
export class SetCommand extends AbstractChannelCommand {
	static readonly commandString = 'SET'
	paramProtocol = []
}

/**
 *
 */
export class LockCommand extends AbstractChannelCommand {
	static readonly commandString = 'LOCK'
	static readonly protocolLogic = [new Depends('action', 'phrase').ifNot('action', Enum.Lock.RELEASE)]
	paramProtocol = [
		new ParamSignature(Required, 'action', null, new ParameterValidator.EnumValidator(Enum.Lock)),
		new ParamSignature(Optional, 'phrase', null, new ParameterValidator.StringValidator()),
	]
}

/**
 *
 */
export class ChannelGridCommand extends AbstractCommand {
	static readonly commandString = 'CHANNEL_GRID'
	paramProtocol = []
}

/**
 *
 */
export class GlGCCommand extends AbstractCommand {
	static readonly commandString = 'GL GC'
	paramProtocol = []
}

/**
 * IData
 */

/**
 *
 */
export class DataStoreCommand extends AbstractCommand {
	static readonly commandString = 'DATA STORE'
	paramProtocol = [
		new ParamSignature(Required, 'fileName', null, new ParameterValidator.DataNameValidator()),
		new ParamSignature(Required, 'data', null, new ParameterValidator.TemplateDataValidator()),
	]
}

/**
 *
 */
export class DataRetrieveCommand extends AbstractCommand {
	static readonly commandString = 'DATA RETRIEVE'
	paramProtocol = [new ParamSignature(Required, 'fileName', null, new ParameterValidator.DataNameValidator())]
	responseProtocol = new ResponseSignature(201, ResponseValidator.DataValidator, ResponseParser.DataParser)
}

/**
 *
 */
export class DataListCommand extends AbstractCommand {
	static readonly commandString = 'DATA LIST'
	responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.DataListParser)
	paramProtocol = []
}

/**
 *
 */
export class DataRemoveCommand extends AbstractCommand {
	static readonly commandString = 'DATA REMOVE'
	paramProtocol = [new ParamSignature(Required, 'fileName', null, new ParameterValidator.DataNameValidator())]
}

/**
 * IThumbnail
 */

/**
 *
 */
export class ThumbnailListCommand extends AbstractCommand {
	static readonly commandString = 'THUMBNAIL LIST'
	paramProtocol = [new ParamSignature(Optional, 'subFolder', null, new ParameterValidator.ClipNameValidator())]
	// responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ThumbnailListParser);
	responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ThumbnailListParser)
}

/**
 *
 */
export class ThumbnailRetrieveCommand extends AbstractCommand {
	static readonly commandString = 'THUMBNAIL RETRIEVE'
	paramProtocol = [new ParamSignature(Required, 'fileName', null, new ParameterValidator.ClipNameValidator())]
	responseProtocol = new ResponseSignature(201, ResponseValidator.Base64Validator, ResponseParser.ThumbnailParser)
}

/**
 *
 */
export class ThumbnailGenerateCommand extends AbstractCommand {
	static readonly commandString = 'THUMBNAIL GENERATE'
	paramProtocol = [new ParamSignature(Required, 'fileName', null, new ParameterValidator.ClipNameValidator())]
}

/**
 *
 */
export class ThumbnailGenerateAllCommand extends AbstractCommand {
	static readonly commandString = 'THUMBNAIL GENERATE_ALL'
	paramProtocol = []
}

/**
 * IInfo
 */

/**
 *
 */
export class CinfCommand extends AbstractCommand {
	static readonly commandString = 'CINF'
	paramProtocol = [new ParamSignature(Required, 'fileName', null, new ParameterValidator.ClipNameValidator())]
	responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.CinfParser)
}

/**
 *
 */
export class ClsCommand extends AbstractCommand {
	static readonly commandString = 'CLS'
	paramProtocol = [new ParamSignature(Optional, 'subFolder', null, new ParameterValidator.ClipNameValidator())]
	responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ContentParser)
}

/**
 *
 */
export class FlsCommand extends AbstractCommand {
	static readonly commandString = 'FLS'
	responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ContentParser)
	paramProtocol = []
}

/**
 *
 */
export class TlsCommand extends AbstractCommand {
	static readonly commandString = 'TLS'
	paramProtocol = [new ParamSignature(Optional, 'subFolder', null, new ParameterValidator.ClipNameValidator())]
	responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ContentParser)
}

/**
 *
 */
export class VersionCommand extends AbstractCommand {
	static readonly commandString = 'VERSION'
	paramProtocol = [
		new ParamSignature(Optional, 'component', null, new ParameterValidator.EnumValidator(Enum.Version)),
	]
	responseProtocol = new ResponseSignature(201, ResponseValidator.StringValidator, ResponseParser.VersionParser)
}

/**
 *
 */
export class InfoCommand extends AbstractOrChannelOrLayerCommand {
	static readonly commandString = 'INFO'
	responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.ChannelParser)
	paramProtocol = []

	constructor(params?: string | Param | (string | Param)[]) {
		super(params)
		if (this.channel && this.channel > -1) {
			this.responseProtocol = new ResponseSignature(
				201,
				ResponseValidator.XMLValidator,
				ResponseParser.InfoParser
			)
		}
	}
}

/**
 *
 */
export class InfoTemplateCommand extends AbstractCommand {
	static readonly commandString = 'INFO TEMPLATE'
	paramProtocol = [new ParamSignature(Required, 'template', null, new ParameterValidator.TemplateNameValidator())]
	responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoTemplateParser)
}

/**
 *
 */
export class InfoConfigCommand extends AbstractCommand {
	static readonly commandString = 'INFO CONFIG'
	responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.ConfigParser)
	paramProtocol = []

	constructor(params: string | Param | (string | Param)[], context?: Record<string, unknown>) {
		super(params, context)
	}
}

/**
 *
 */
export class InfoPathsCommand extends AbstractCommand {
	static readonly commandString = 'INFO PATHS'
	responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoPathsParser)
	paramProtocol = []
}

/**
 *
 */
export class InfoSystemCommand extends AbstractCommand {
	static readonly commandString = 'INFO SYSTEM'
	responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoSystemParser)
	paramProtocol = []
}

/**
 *
 */
export class InfoServerCommand extends AbstractCommand {
	static readonly commandString = 'INFO SERVER'
	responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoServerParser)
	paramProtocol = []
}

/**
 *
 */
export class InfoQueuesCommand extends AbstractCommand {
	static readonly commandString = 'INFO QUEUES'
	responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoQueuesParser)
	paramProtocol = []
}

/**
 *
 */
export class InfoThreadsCommand extends AbstractCommand {
	static readonly commandString = 'INFO THREADS'
	responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.InfoThreadsParser)
	paramProtocol = []
}

/**
 *
 */
export class InfoDelayCommand extends AbstractChannelOrLayerCommand {
	static readonly commandString = 'INFO'
	paramProtocol = [new ParamSignature(Required, 'delay', null, new ParameterValidator.KeywordValidator('DELAY'))]
	responseProtocol = new ResponseSignature(201, ResponseValidator.XMLValidator, ResponseParser.InfoDelayParser)

	constructor(params: string | Param | (string | Param)[]) {
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
		new ParamSignature(Required, 'info', null, new ParameterValidator.KeywordValidator('INFO')),
		new ParamSignature(Optional, 'flashLayer', null, new ParameterValidator.PositiveNumberValidatorBetween()),
	]
	responseProtocol = new ResponseSignature(201)

	constructor(params: string | Param | (string | Param)[]) {
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
	paramProtocol = []
}

/**
 *
 */
export class LogLevelCommand extends AbstractCommand {
	static readonly commandString = 'LOG LEVEL'
	paramProtocol = [new ParamSignature(Optional, 'level', null, new ParameterValidator.EnumValidator(Enum.LogLevel))]
}

/**
 * @protocol	Needs either `calltrace` or `communication` parameter.
 */
export class LogCategoryCommand extends AbstractCommand {
	static readonly commandString = 'LOG CATEGORY'
	static readonly protocolLogic = [new OneOf('calltrace', 'communication')]
	paramProtocol = [
		new ParamSignature(
			Optional,
			'calltrace',
			Enum.LogCategory.CALLTRACE,
			new ParameterValidator.BooleanValidatorWithDefaults(1, 0)
		),
		new ParamSignature(
			Optional,
			'communication',
			Enum.LogCategory.COMMUNICATION,
			new ParameterValidator.BooleanValidatorWithDefaults(1, 0)
		),
	]
}

/**
 *
 */
export class DiagCommand extends AbstractCommand {
	static readonly commandString = 'DIAG'
	paramProtocol = []
}

/**
 * @todo: mixed mode!!!!
 * 202/201
 */
export class HelpCommand extends AbstractCommand {
	static readonly commandString = 'HELP'
	paramProtocol = [new ParamSignature(Optional, 'command', null, new ParameterValidator.EnumValidator(Enum.Command))]
	responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.HelpParser)
}

/**
 *
 */
export class HelpProducerCommand extends AbstractCommand {
	static readonly commandString = 'HELP PRODUCER'
	paramProtocol = [
		new ParamSignature(Optional, 'producer', null, new ParameterValidator.EnumValidator(Enum.Producer)),
	]
	responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.HelpParser)
}

/**
 *
 */
export class HelpConsumerCommand extends AbstractCommand {
	static readonly commandString = 'HELP CONSUMER'
	paramProtocol = [
		new ParamSignature(Optional, 'consumer', null, new ParameterValidator.EnumValidator(Enum.Consumer)),
	]
	responseProtocol = new ResponseSignature(200, ResponseValidator.ListValidator, ResponseParser.HelpParser)
}

/**
 * IOperation
 */

/**
 * @todo: response
 */
export class ByeCommand extends AbstractCommand {
	static readonly commandString = 'BYE'
	paramProtocol = []
}

/**
 * @todo: response
 */
export class KillCommand extends AbstractCommand {
	static readonly commandString = 'KILL'
	paramProtocol = []
}

/**
 * @todo: response
 */
export class RestartCommand extends AbstractCommand {
	static readonly commandString = 'RESTART'
	paramProtocol = []
}
export class PingCommand extends AbstractCommand {
	static readonly commandString = 'PING'
	paramProtocol = []
}

/**
 * IScheduling
 */

export class TimeCommand extends AbstractChannelCommand {
	static readonly commandString = 'TIME'
	paramProtocol = [new ParamSignature(Optional, 'timecode', null, new ParameterValidator.TimecodeValidator())]
	responseProtocol = new ResponseSignature(201, ResponseValidator.StringValidator, ResponseParser.InfoParser)
}
export class ScheduleSetCommand extends AbstractCommand {
	static readonly commandString = 'SCHEDULE SET'
	paramProtocol = [
		new ParamSignature(Required, 'token', null, new ParameterValidator.StringValidator()),
		new ParamSignature(Required, 'timecode', null, new ParameterValidator.TimecodeValidator()),
		new ParamSignature(Required, 'command', null, new ParameterValidator.CommandValidator()),
	]
}
export class ScheduleRemoveCommand extends AbstractCommand {
	static readonly commandString = 'SCHEDULE REMOVE'
	paramProtocol = [new ParamSignature(Required, 'token', null, new ParameterValidator.StringValidator())]
}
export class ScheduleClearCommand extends AbstractCommand {
	static readonly commandString = 'SCHEDULE CLEAR'
	paramProtocol = []
}
export class ScheduleListCommand extends AbstractCommand {
	static readonly commandString = 'SCHEDULE LIST'
	paramProtocol = [new ParamSignature(Optional, 'token', null, new ParameterValidator.StringValidator())]
}
