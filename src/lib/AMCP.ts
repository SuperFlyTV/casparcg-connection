import { Command, Transition, LogCategory, Chroma, Lock,
 	revCommand, revTransition, revEase, revDirection, revLogLevel, revChroma,
	revBlendMode, revLock, revVersion, revProducer, revConsumer } from './ServerStateEnum'
import { ResponseSignature } from './ResponseSignature'
import { xmlValidator, mixerStatusValidator, stringValidator as responseStringValidator,
	dataValidator, listValidator, base64Validator, pingValidator } from './ResponseValidators'
import { glParser, mixerStatusKeyerParser, mixerStatusChromaParser, mixerStatusBlendParser,
 	mixerStatusInvertParser, mixerStatusOpacityParser, mixerStatusBrightnessParser,
	mixerStatusSaturationParser, mixerStatusContrastParser, mixerStatusLevelsParser,
	mixerStatusFillParser, mixerStatusClipParser, mixerStatusAnchorParser,
	mixerStatusCropParser, mixerStatusRotationParser, mixerStatusPerspectiveParser,
	mixerStatusMipmapParser, mixerStatusVolumeParser, mixerStatusMastervolumeParser,
	mixerStatusStraightAlphaOutputParser, dataParser, dataListParser,
	thumbnailListParser, thumbnailParser, cinfParser, contentParser, infoTemplateParser,
	versionParser, channelParser, infoThreadsParser, infoPathsParser, configParser,
	infoSystemParser, infoServerParser, infoQueuesParser, infoDelayParser,
	helpParser, infoParser, pingParser } from './ResponseParsers'

import { Required as required, Optional as optional, ParamSignature, IParamSignature } from './ParamSignature'

// Validation NS
import { keywordValidator, numberValidator, stringValidator, enumValidator, positiveNumberValidator,
 	clipNameValidator, positiveNumberValidatorBetween, booleanValidatorWithDefaults,
	clipNameEmptyStringValidator, frameValidator, filterValidator, channelLayoutValidator,
 	positiveNumberRoundValidatorBetween, templateNameValidator, templateDataValidator,
  dataNameValidator, timecodeValidator, commandValidator	} from './ParamValidators'
// Protocol NS
import { Depends, Coupled, OneOf, IProtocolLogic } from './ProtocolLogic'

/**
 * Internal
 */
// export class CustomCommand extends AbstractCommand {
// 	static readonly commandString = ''
// 	paramProtocol = [
// 		new ParamSignature(required, 'command', null, new StringValidator(false))
// 	]
// }

export const protocolLogic: Map<Command, IProtocolLogic[]> = new Map<Command, IProtocolLogic[]>([
	[ Command.LOADBG, [ // TODO deal with device, route, HTML
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Transition.STING)
	]],
	[ Command.LOAD, [ // TODO deal with device, route, HTML
		new Depends('transitionDuration', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('transitionEasing', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('transitionDirection', 'transition').mustNotBe('transition', Transition.STING),
		new Depends('stingMaskFilename', 'transition').mustBe('transition', Transition.STING),
		new Depends('stingDelay', 'stingMaskFilename').mustBe('transition', Transition.STING),
		new Depends('stingOverlayFilename', 'stingDelay').mustBe('transition', Transition.STING)
	]],
	[ Command.PLAY, [ // TODO deal with device, route, HTML
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
	]],
	[ Command.MIXER_ANCHOR, [
		new Coupled('x', 'y'),
		new Depends('transitionDuration', 'x'),
		new Depends('transitionEasing', 'x'),
		new Depends('defer', 'x')
	]],
	[ Command.MIXER_CROP, [
		new Coupled('left', 'top', 'right', 'bottom'),
		new Depends('transitionDuration', 'left'),
		new Depends('transitionEasing', 'left'),
		new Depends('defer', 'left')
	]],
	[ Command.MIXER_ROTATION, [
		new Depends('transitionDuration', 'rotation'),
		new Depends('transitionEasing', 'rotation'),
		new Depends('defer', 'rotation')
	]],
	[ Command.MIXER_PERSPECTIVE, [
		new Coupled('topLeftX', 'topLeftY', 'topRightX', 'topRightY', 'bottomRightX', 'bottomRightY', 'bottomLeftX', 'bottomLeftY'),
		new Depends('transitionDuration', 'topLeftX'),
		new Depends('transitionEasing', 'topLeftX'),
		new Depends('defer', 'topLeftX')
	]],
	[ Command.MIXER_MIPMAP, [
		new Depends('defer', 'mipmap')
	]],
	[ Command.MIXER_VOLUME, [
		new Depends('transitionDuration', 'volume'),
		new Depends('transitionEasing', 'volume'),
		new Depends('defer', 'volume')
	]],
	[ Command.MIXER_MASTERVOLUME, [
		new Depends('transitionDuration', 'mastervolume'),
		new Depends('transitionEasing', 'mastervolume'),
		new Depends('defer', 'mastervolume')
	]],
	[ Command.MIXER_STRAIGHT_ALPHA_OUTPUT, [
		new Depends('defer', 'straight_alpha_output')
	]],
	[ Command.CALL, [
		new OneOf('seek')
	]],
	[ Command.LOCK, [
		new Depends('action', 'phrase').ifNot('action', Lock.RELEASE)
	]]
])

export const paramProtocol: Map<Command, IParamSignature[]> = new Map<Command, IParamSignature[]>([
	[ Command.LOADBG, [ // TODO deal with device, route, HTML
		new ParamSignature(required, 'clip', null, clipNameValidator),
		new ParamSignature(optional, 'loop', null, booleanValidatorWithDefaults('LOOP')),
		new ParamSignature(optional, 'transition', null, enumValidator(revTransition)),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'transitionDirection', null, enumValidator(revDirection)),
		new ParamSignature(optional, 'stingMaskFilename', null, clipNameValidator),
		new ParamSignature(optional, 'stingDelay', null, positiveNumberValidator),
		new ParamSignature(optional, 'stingOverlayFilename', null, clipNameEmptyStringValidator),
		new ParamSignature(optional, 'seek', 'SEEK', frameValidator('SEEK')),
		new ParamSignature(optional, 'length', 'LENGTH', frameValidator('LENGTH')),
		new ParamSignature(optional, 'filter', 'FILTER', filterValidator()),
		new ParamSignature(optional, 'auto', null, booleanValidatorWithDefaults('AUTO')),
		new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', channelLayoutValidator())
	]],
	[ Command.LOAD, [ // TODO deal with device, route, HTML
		new ParamSignature(required, 'clip', null, clipNameValidator),
		new ParamSignature(optional, 'loop', null, booleanValidatorWithDefaults('LOOP')),
		new ParamSignature(optional, 'transition', null, enumValidator(revTransition)),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'transitionDirection', null, enumValidator(revDirection)),
		new ParamSignature(optional, 'stingMaskFilename', null, clipNameValidator),
		new ParamSignature(optional, 'stingDelay', null, positiveNumberValidator),
		new ParamSignature(optional, 'stingOverlayFilename', null, clipNameEmptyStringValidator),
		new ParamSignature(optional, 'seek', 'SEEK', frameValidator('SEEK')),
		new ParamSignature(optional, 'length', 'LENGTH', frameValidator('LENGTH')),
		new ParamSignature(optional, 'filter', 'FILTER', filterValidator()),
		new ParamSignature(optional, 'auto', null, booleanValidatorWithDefaults('AUTO')),
		new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', channelLayoutValidator())
	]],
	[ Command.PLAY, [ // TODO deal with device, route, HTML
		new ParamSignature(optional, 'clip', null, clipNameValidator),
		new ParamSignature(optional, 'loop', null, booleanValidatorWithDefaults('LOOP')),
		new ParamSignature(optional, 'transition', null, enumValidator(revTransition)),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'transitionDirection', null, enumValidator(revDirection)),
		new ParamSignature(optional, 'stingMaskFilename', null, clipNameValidator),
		new ParamSignature(optional, 'stingDelay', null, positiveNumberValidator),
		new ParamSignature(optional, 'stingOverlayFilename', null, clipNameEmptyStringValidator),
		new ParamSignature(optional, 'seek', 'SEEK', frameValidator('SEEK')),
		new ParamSignature(optional, 'length', 'LENGTH', frameValidator('LENGTH')),
		new ParamSignature(optional, 'filter', 'FILTER', filterValidator()),
		new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', channelLayoutValidator())
	]],
	[ Command.CG_ADD, [
		new ParamSignature(required, 'flashLayer', 'ADD', positiveNumberValidatorBetween(0)),
		new ParamSignature(required, 'templateName', null, templateNameValidator),
		new ParamSignature(required, 'playOnLoad', null, booleanValidatorWithDefaults(1, 0)),
		new ParamSignature(optional, 'data', null, templateDataValidator)
	]],
	[ Command.CG_PLAY, [
		new ParamSignature(required, 'flashLayer', 'PLAY', positiveNumberValidatorBetween(0))
	]],
	[ Command.CG_ADD, [
		new ParamSignature(required, 'flashLayer', 'STOP', positiveNumberValidatorBetween(0))
	]],
	[ Command.CG_NEXT, [
		new ParamSignature(required, 'flashLayer', 'NEXT', positiveNumberValidatorBetween(0))
	]],
	[ Command.CG_REMOVE, [
		new ParamSignature(required, 'flashLayer', 'REMOVE', positiveNumberValidatorBetween(0))
	]],
	[ Command.CG_CLEAR, [
		new ParamSignature(required, 'keyword', null, keywordValidator('CLEAR'))
	]],
	[ Command.CG_UPDATE, [
		new ParamSignature(required, 'flashLayer', 'UPDATE', positiveNumberValidatorBetween(0)),
		new ParamSignature(required, 'data', null, templateDataValidator)
	]],
	[ Command.CG_INVOKE, [
		new ParamSignature(required, 'flashLayer', 'INVOKE', positiveNumberValidatorBetween(0)),
		new ParamSignature(required, 'method', null, stringValidator())
	]],
	[ Command.GL_INFO, [
		new ParamSignature(required, 'info', null, keywordValidator('INFO')),
		new ParamSignature(optional, 'flashLayer', null, positiveNumberValidatorBetween(0))
	]],
	[ Command.LOG_LEVEL, [
		new ParamSignature(optional, 'level', null, enumValidator(revLogLevel))
	]],
	[ Command.LOG_CATEGORY, [
		new ParamSignature(optional, 'calltrace', LogCategory.CALLTRACE, booleanValidatorWithDefaults(1, 0)),
		new ParamSignature(optional, 'communication', LogCategory.COMMUNICATION, booleanValidatorWithDefaults(1, 0))
	]],
	[ Command.MIXER_KEYER, [
		new ParamSignature(required, 'keyword', null, keywordValidator('KEYER')),
		new ParamSignature(optional, 'keyer', null, booleanValidatorWithDefaults(1, 0)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_CHROMA, [
		new ParamSignature(required, 'keyword', null, keywordValidator('CHROMA')),
		new ParamSignature(optional, 'keyer', null, enumValidator(revChroma)),
		new ParamSignature(optional, 'threshold', null, numberValidator()),
		new ParamSignature(optional, 'softness', null, numberValidator()),
		new ParamSignature(optional, 'spill', null, numberValidator()),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_BLEND, [
		new ParamSignature(required, 'keyword', null, keywordValidator('BLEND')),
		new ParamSignature(optional, 'blendmode', null, enumValidator(revBlendMode)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_INVERT, [
		new ParamSignature(required, 'keyword', null, keywordValidator('INVERT')),
		new ParamSignature(optional, 'invert', null, booleanValidatorWithDefaults(1, 0)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_OPACITY, [
		new ParamSignature(required, 'keyword', null, keywordValidator('OPACITY')),
		new ParamSignature(optional, 'opacity', null, positiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_BRIGHTNESS, [
		new ParamSignature(required, 'keyword', null, keywordValidator('BRIGHTNESS')),
		new ParamSignature(optional, 'brightness', null, positiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_SATURATION, [
		new ParamSignature(required, 'keyword', null, keywordValidator('SATURATION')),
		new ParamSignature(optional, 'saturation', null, positiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_CONTRAST, [
		new ParamSignature(required, 'keyword', null, keywordValidator('CONTRAST')),
		new ParamSignature(optional, 'contrast', null, positiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_LEVELS, [
		new ParamSignature(required, 'keyword', null, keywordValidator('LEVELS')),
		new ParamSignature(optional, 'minInput', null, positiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'maxInput', null, positiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'gamma', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'minOutput', null, positiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'maxOutput', null, positiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_FILL, [
		new ParamSignature(required, 'keyword', null, keywordValidator('FILL')),
		new ParamSignature(optional, 'x', null, numberValidator()),
		new ParamSignature(optional, 'y', null, numberValidator()),
		new ParamSignature(optional, 'xScale', null, numberValidator()),
		new ParamSignature(optional, 'yScale', null, numberValidator()),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_CLIP, [
		new ParamSignature(required, 'keyword', null, keywordValidator('CLIP')),
		new ParamSignature(optional, 'x', null, numberValidator()),
		new ParamSignature(optional, 'y', null, numberValidator()),
		new ParamSignature(optional, 'width', null, numberValidator()),
		new ParamSignature(optional, 'height', null, numberValidator()),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_ANCHOR, [
		new ParamSignature(required, 'keyword', null, keywordValidator('ANCHOR')),
		new ParamSignature(optional, 'x', null, numberValidator()),
		new ParamSignature(optional, 'y', null, numberValidator()),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween()),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_CROP, [
		new ParamSignature(required, 'keyword', null, keywordValidator('CROP')),
		new ParamSignature(optional, 'left', null, positiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'top', null, positiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'right', null, positiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'bottom', null, positiveNumberValidatorBetween(0, 1)),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween()),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_ROTATION, [
		new ParamSignature(required, 'keyword', null, keywordValidator('ROTATION')),
		new ParamSignature(optional, 'rotation', null, numberValidator()),
		new ParamSignature(optional, 'transitionDuration', null, numberValidator()),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_PERSPECTIVE, [
		new ParamSignature(required, 'keyword', null, keywordValidator('PERSPECTIVE')),
		new ParamSignature(optional, 'topLeftX', null, numberValidator()),
		new ParamSignature(optional, 'topLeftY', null, numberValidator()),
		new ParamSignature(optional, 'topRightX', null, numberValidator()),
		new ParamSignature(optional, 'topRightY', null, numberValidator()),
		new ParamSignature(optional, 'bottomRightX', null, numberValidator()),
		new ParamSignature(optional, 'bottomRightY', null, numberValidator()),
		new ParamSignature(optional, 'bottomLeftX', null, numberValidator()),
		new ParamSignature(optional, 'bottomLeftY', null, numberValidator()),
		new ParamSignature(optional, 'transitionDuration', null, numberValidator()),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_MIPMAP, [
		new ParamSignature(required, 'keyword', null, keywordValidator('MIPMAP')),
		new ParamSignature(optional, 'mipmap', null, booleanValidatorWithDefaults(1, 0)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_VOLUME, [
		new ParamSignature(required, 'keyword', null, keywordValidator('VOLUME')),
		new ParamSignature(optional, 'volume', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_MASTERVOLUME, [
		new ParamSignature(required, 'keyword', null, keywordValidator('MASTERVOLUME')),
		new ParamSignature(optional, 'mastervolume', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_STRAIGHT_ALPHA_OUTPUT, [
		new ParamSignature(required, 'keyword', null, keywordValidator('STRAIGHT_ALPHA_OUTPUT')),
		new ParamSignature(optional, 'straight_alpha_output', null, booleanValidatorWithDefaults(1, 0)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_GRID, [
		new ParamSignature(required, 'keyword', null, keywordValidator('GRID')),
		new ParamSignature(optional, 'resolution', null, positiveNumberRoundValidatorBetween(1)),
		new ParamSignature(optional, 'transitionDuration', null, positiveNumberValidatorBetween(0)),
		new ParamSignature(optional, 'transitionEasing', null, enumValidator(revEase)),
		new ParamSignature(optional, 'defer', null, booleanValidatorWithDefaults('DEFER'))
	]],
	[ Command.MIXER_COMMIT, [
		new ParamSignature(required, 'keyword', null, keywordValidator('COMMIT'))
	]],
	[ Command.MIXER_CLEAR, [
		new ParamSignature(required, 'keyword', null, keywordValidator('CLEAR'))
	]],
	[ Command.CALL, [
		new ParamSignature(optional, 'seek', 'seek', positiveNumberValidatorBetween(0))
	]],
	[ Command.LOCK, [
		new ParamSignature(required, 'action', null, enumValidator(revLock)),
		new ParamSignature(optional, 'phrase', null, stringValidator())
	]],
	[ Command.DATA_STORE, [
		new ParamSignature(required, 'fileName', null, dataNameValidator),
		new ParamSignature(required, 'data', null, templateDataValidator)
	]],
	[ Command.DATA_RETRIEVE, [
		new ParamSignature(required, 'fileName', null, dataNameValidator)
	]],
	[ Command.DATA_REMOVE, [
		new ParamSignature(required, 'fileName', null, dataNameValidator)
	]],
	[ Command.THUMBNAIL_LIST, [
		new ParamSignature(optional, 'subFolder', null, clipNameValidator)
	]],
	[ Command.THUMBNAIL_RETRIEVE, [
		new ParamSignature(required, 'fileName', null, clipNameValidator)
	]],
	[ Command.THUMBNAIL_GENERATE, [
		new ParamSignature(required, 'fileName', null, clipNameValidator)
	]],
	[ Command.CINF, [
		new ParamSignature(required, 'fileName', null, clipNameValidator)
	]],
	[ Command.CLS, [
		new ParamSignature(optional, 'subFolder', null, clipNameValidator)
	]],
	[ Command.TLS, [
		new ParamSignature(optional, 'subFolder', null, clipNameValidator)
	]],
	[ Command.VERSION, [
		new ParamSignature(optional, 'component', null, enumValidator(revVersion))
	]],
	[ Command.INFO_DELAY, [
		new ParamSignature(required, 'delay', null, keywordValidator('DELAY'))
	]],
	[ Command.HELP, [
		new ParamSignature(optional, 'commands', null, enumValidator(revCommand))
	]],
	[ Command.HELP_PRODUCER, [
		new ParamSignature(optional, 'producer', null, enumValidator(revProducer))
	]],
	[ Command.HELP_CONSUMER, [
		new ParamSignature(optional, 'consumer', null, enumValidator(revConsumer))
	]],
	[ Command.TIME, [
		new ParamSignature(optional, 'timecode', null, timecodeValidator)
	]],
	[ Command.SCHEDULE_SET, [
		new ParamSignature(required, 'token', null, stringValidator()),
		new ParamSignature(required, 'timecode', null, timecodeValidator),
		new ParamSignature(required, 'command', null, commandValidator) // FIXME - change this
	]],
	[ Command.SCHEDULE_REMOVE, [
		new ParamSignature(required, 'token', null, stringValidator())
	]],
	[ Command.SCHEDULE_LIST, [
		new ParamSignature(optional, 'timecode', null, timecodeValidator)
	]],
	[ Command.PING, [
		new ParamSignature(optional, 'token', null, stringValidator())
	]]
])

export const responseProtocol: Map<Command, ResponseSignature<any>> = new Map<Command, ResponseSignature<any>> ([
	[ Command.CG_INVOKE, new ResponseSignature(201) ],
	[ Command.GL_INFO, new ResponseSignature(201, xmlValidator, glParser) ],
	[ Command.MIXER_KEYER, new ResponseSignature(201, mixerStatusValidator, mixerStatusKeyerParser) ],
	[ Command.MIXER_CHROMA, new ResponseSignature(201, mixerStatusValidator, mixerStatusChromaParser) ],
	[ Command.MIXER_BLEND, new ResponseSignature(201, responseStringValidator, mixerStatusBlendParser) ],
	[ Command.MIXER_INVERT, new ResponseSignature(201, responseStringValidator, mixerStatusInvertParser) ],
	[ Command.MIXER_OPACITY, new ResponseSignature(201, mixerStatusValidator, mixerStatusOpacityParser) ],
	[ Command.MIXER_BRIGHTNESS, new ResponseSignature(201, mixerStatusValidator, mixerStatusBrightnessParser) ],
	[ Command.MIXER_SATURATION, new ResponseSignature(201, mixerStatusValidator, mixerStatusSaturationParser) ],
	[ Command.MIXER_CONTRAST, new ResponseSignature(201, mixerStatusValidator, mixerStatusContrastParser) ],
	[ Command.MIXER_LEVELS, new ResponseSignature(201, mixerStatusValidator, mixerStatusLevelsParser) ],
	[ Command.MIXER_FILL, new ResponseSignature(201, mixerStatusValidator, mixerStatusFillParser) ],
	[ Command.MIXER_CLIP, new ResponseSignature(201, mixerStatusValidator, mixerStatusClipParser) ],
	[ Command.MIXER_ANCHOR, new ResponseSignature(201, mixerStatusValidator, mixerStatusAnchorParser) ],
	[ Command.MIXER_CROP, new ResponseSignature(201, mixerStatusValidator, mixerStatusCropParser) ],
	[ Command.MIXER_ROTATION, new ResponseSignature(201, mixerStatusValidator, mixerStatusRotationParser) ],
	[ Command.MIXER_PERSPECTIVE, new ResponseSignature(201, mixerStatusValidator, mixerStatusPerspectiveParser) ],
	[ Command.MIXER_MIPMAP, new ResponseSignature(201, mixerStatusValidator, mixerStatusMipmapParser) ],
	[ Command.MIXER_VOLUME, new ResponseSignature(201, mixerStatusValidator, mixerStatusVolumeParser) ],
	[ Command.MIXER_MASTERVOLUME, new ResponseSignature(201, mixerStatusValidator, mixerStatusMastervolumeParser) ],
	[ Command.MIXER_STRAIGHT_ALPHA_OUTPUT, new ResponseSignature(201, mixerStatusValidator, mixerStatusStraightAlphaOutputParser) ],
	[ Command.DATA_RETRIEVE, new ResponseSignature(201, dataValidator, dataParser) ],
	[ Command.DATA_LIST, new ResponseSignature(200, listValidator, dataListParser) ],
	[ Command.THUMBNAIL_LIST, new ResponseSignature(200, listValidator, thumbnailListParser) ],
	[ Command.THUMBNAIL_RETRIEVE, new ResponseSignature(201, base64Validator, thumbnailParser) ],
	[ Command.CINF, new ResponseSignature(200, listValidator, cinfParser) ],
	[ Command.CLS, new ResponseSignature(200, listValidator, contentParser) ],
	[ Command.FLS, new ResponseSignature(200, listValidator, contentParser) ],
	[ Command.TLS, new ResponseSignature(200, listValidator, contentParser) ],
	[ Command.VERSION, new ResponseSignature(201, responseStringValidator, versionParser) ],
	[ Command.INFO, new ResponseSignature(200, listValidator, channelParser) ],
	// [ Command.INFO, new ResponseSignature(201, XMLValidator, ResponseParser.InfoParser) ],
	[ Command.INFO_TEMPLATE, new ResponseSignature(201, xmlValidator, infoTemplateParser) ],
	[ Command.INFO_PATHS, new ResponseSignature(201, xmlValidator, infoPathsParser) ],
	[ Command.INFO_CONFIG, new ResponseSignature(201, xmlValidator, configParser) ],
	[ Command.INFO_SYSTEM, new ResponseSignature(201, xmlValidator, infoSystemParser) ],
	[ Command.INFO_SERVER, new ResponseSignature(201, xmlValidator, infoServerParser) ],
	[ Command.INFO_QUEUES, new ResponseSignature(201, xmlValidator, infoQueuesParser) ],
	[ Command.INFO_THREADS, new ResponseSignature(200, listValidator, infoThreadsParser) ],
	[ Command.INFO_DELAY, new ResponseSignature(201, xmlValidator, infoDelayParser) ],
	[ Command.HELP, new ResponseSignature(200, listValidator, helpParser) ],
	[ Command.HELP_PRODUCER, new ResponseSignature(200, listValidator, helpParser) ],
	[ Command.HELP_CONSUMER, new ResponseSignature(200, listValidator, helpParser) ],
	[ Command.TIME, new ResponseSignature(201, responseStringValidator, infoParser) ],
	[ Command.PING, new ResponseSignature(-1, pingValidator, pingParser )]
])

// FIXME: swap was not fully implemented
// FIXME: implement set
// FIXME: InfoCommand response vairies depending on whether channel is specified or not
// FIXME: Parsing ping/pong

/**
 * IInputOutput
 */
/* export namespace AMCP {

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
			new ParamSignature(required, 'device', 'DECKLINK DEVICE', new DecklinkDeviceValidator()),
			new ParamSignature(optional, 'transition', null, new EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'length', 'LENGTH', new FrameValidator('LENGTH')),
			new ParamSignature(optional, 'filter', 'FILTER', new FilterValidator()),
			new ParamSignature(optional, 'format', 'FORMAT', new ChannelFormatValidator()),
			new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ChannelLayoutValidator()),
			new ParamSignature(optional, 'auto', null, new BooleanValidatorWithDefaults('AUTO'))
		]
	}

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
			new ParamSignature(required, 'device', 'DECKLINK DEVICE', new DecklinkDeviceValidator()),
			new ParamSignature(optional, 'transition', null, new EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'length', 'LENGTH', new FrameValidator('LENGTH')),
			new ParamSignature(optional, 'filter', 'FILTER', new FilterValidator()),
			new ParamSignature(optional, 'format', 'FORMAT', new ChannelFormatValidator()),
			new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ChannelLayoutValidator())
		]
	}

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
			new ParamSignature(required, 'device', 'DECKLINK DEVICE', new DecklinkDeviceValidator()),
			new ParamSignature(optional, 'transition', null, new EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'length', 'LENGTH', new FrameValidator('LENGTH')),
			new ParamSignature(optional, 'filter', 'FILTER', new FilterValidator()),
			new ParamSignature(optional, 'format', 'FORMAT', new ChannelFormatValidator()),
			new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ChannelLayoutValidator())
		]
	}

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
			new ParamSignature(required, 'route', null, new RouteValidator()),
			new ParamSignature(optional, 'mode', null, new RouteModeValidator()),
			new ParamSignature(optional, 'transition', null, new EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'length', 'LENGTH', new FrameValidator('LENGTH')),
			new ParamSignature(optional, 'filter', 'FILTER', new FilterValidator()),
			new ParamSignature(optional, 'auto', null, new BooleanValidatorWithDefaults('AUTO')),
			new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ChannelLayoutValidator())
		]
	}

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
			new ParamSignature(required, 'route', null, new RouteValidator()),
			new ParamSignature(optional, 'mode', null, new RouteModeValidator()),
			new ParamSignature(optional, 'transition', null, new EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'length', 'LENGTH', new FrameValidator('LENGTH')),
			new ParamSignature(optional, 'filter', 'FILTER', new FilterValidator()),
			new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ChannelLayoutValidator())
		]
	}

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
			new ParamSignature(required, 'route', null, new RouteValidator()),
			new ParamSignature(optional, 'mode', null, new RouteModeValidator()),
			new ParamSignature(optional, 'transition', null, new EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'length', 'LENGTH', new FrameValidator('LENGTH')),
			new ParamSignature(optional, 'filter', 'FILTER', new FilterValidator()),
			new ParamSignature(optional, 'channelLayout', 'CHANNEL_LAYOUT', new ChannelLayoutValidator())
		]
	}

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
			new ParamSignature(required, 'url', '[HTML]', new URLValidator()),
			new ParamSignature(optional, 'transition', null, new EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ClipNameEmptyStringValidator()),
			new ParamSignature(optional, 'auto', null, new BooleanValidatorWithDefaults('AUTO'))
		]
	}

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
			new ParamSignature(required, 'url', '[HTML]', new URLValidator()),
			new ParamSignature(optional, 'transition', null, new EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ClipNameEmptyStringValidator())
		]
	}

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
			new ParamSignature(optional, 'url', '[HTML]', new URLValidator()),
			new ParamSignature(optional, 'transition', null, new EnumValidator(Enum.Transition)),
			new ParamSignature(optional, 'transitionDuration', null, new PositiveNumberValidatorBetween(0)),
			new ParamSignature(optional, 'transitionEasing', null, new EnumValidator(Enum.Ease)),
			new ParamSignature(optional, 'transitionDirection', null, new EnumValidator(Enum.Direction)),
			new ParamSignature(optional, 'stingMaskFilename', null, new ClipNameValidator()),
			new ParamSignature(optional, 'stingDelay', null, new PositiveNumberValidator()),
			new ParamSignature(optional, 'stingOverlayFilename', null, new ClipNameEmptyStringValidator())
		]
	}
} */

/**
 *
 */
// export function deSerialize<C extends Command, REQ extends CommandOptions, RES extends REQ & IAMCPResponse>(cmd: IAMCPCommandVO, id: string): IAMCPCommand<C, REQ, RES> {
//
// 	// errror: commandstatus -1 //invalid command
//
// 	// @todo: error handling much?????? (callback??????)
// 	// let command: IAMCPCommand = Object.create((AMCP as any)[cmd._commandName]['prototype'])
// 	// command.constructor.call(command, cmd._objectParams)
// 	let command: IAMCPCommand<C, REQ, RES> = new (AMCP as any)[cmd._commandName](cmd._objectParams)
// 	command.populate(cmd, id)
// 	return command
// }

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
