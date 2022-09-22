import {
	TransitionType,
	TransitionTween,
	Direction,
	LogLevel,
	LogCategory,
	SetVariable,
	LockAction,
	BlendMode,
	RouteMode,
} from './enums'

export type Empty = Record<string, never>

export interface Channel {
	channel: number
}

export interface ChannelLayer {
	channel: number
	layer: number
}

export interface TransitionParameters {
	transitionType: TransitionType
	duration: number
	tween?: TransitionTween
	direction?: Direction
	stingProperties?: {
		maskFile: string
		overlayFile?: string
		delay?: number
		audioFadeStart?: number
		audioFadeDuration?: number
	}
}

export interface ClipParameters {
	clip?: string
	loop?: boolean
	inPoint?: number
	seek?: number
	length?: number
	clearOn404?: boolean
}

export interface DecklinkParameters {
	device: number
	format: string
}

export interface HtmlParameters {
	url: string
}

export interface RouteParameters {
	route: {
		channel: number
		layer?: number
	}
	framesDelay?: number
	mode?: RouteMode
}

export interface ProducerOptions {
	vFilter?: string
	aFilter?: string
	transition?: TransitionParameters
}

export interface PlayParameters extends ChannelLayer, ClipParameters, ProducerOptions {}
export interface PlayDecklinkParameters extends ChannelLayer, DecklinkParameters, ProducerOptions {}
export interface PlayHtmlParameters extends ChannelLayer, HtmlParameters, ProducerOptions {}
export interface PlayRouteParameters extends ChannelLayer, RouteParameters, ProducerOptions {}

export interface LoadbgParameters extends PlayParameters {
	clip: string
	auto?: boolean
}
export type LoadbgDecklinkParameters = PlayDecklinkParameters
export type LoadbgHtmlParameters = PlayHtmlParameters
export type LoadbgRouteParameters = PlayRouteParameters

export type LoadParameters = PlayParameters

export type PauseParameters = ChannelLayer
export type ResumeParameters = ChannelLayer
export type StopParameters = ChannelLayer
export type ClearParameters = ChannelLayer

export interface CallParameters extends ChannelLayer {
	param: string
	value?: string | number
}

export interface SwapParameters extends ChannelLayer {
	channel2: number
	layer2: number
	transforms: boolean
}

export interface AddParameters extends Channel {
	consumer: string
	parameters: string
}

export interface RemoveParameters extends Channel {
	consumer: string | number
}

export type PrintParameters = Channel

export interface LogLevelParameters {
	level: LogLevel
}

export interface LogCategoryParameters {
	category: LogCategory
	enable: boolean
}
export interface SetParameters extends Channel {
	variable: SetVariable
	value: string
}
export interface LockParameters extends Channel {
	action: LockAction
	secret: string
}

export interface DataStoreParameters {
	name: string
	data: string
}
export interface DataRetrieveParameters {
	name: string
}
export interface DataListParameters {
	subDirectory?: string
}
export interface DataRemoveParameters {
	name: string
}

export interface CGLayer {
	cgLayer: number
}

export interface CgAddParameters extends ChannelLayer, CGLayer {
	template: string
	playOnLoad: boolean
	data?: Record<string, any> | string
}
export interface CgPlayParameters extends ChannelLayer, CGLayer {}
export interface CgStopParameters extends ChannelLayer, CGLayer {}
export interface CgNextParameters extends ChannelLayer, CGLayer {}
export interface CgRemoveParameters extends ChannelLayer, CGLayer {}
export type CgClearParameters = ChannelLayer
export interface CgUpdateParameters extends ChannelLayer, CGLayer {
	data: string
}
export interface CgInvokeParameters extends ChannelLayer, CGLayer {
	method: string
}
export type CgInfoParameters = ChannelLayer & CGLayer

export interface MixerTween {
	duration?: number
	tween?: TransitionTween
}
export interface MixerDefer {
	defer?: boolean
}
export interface MixerNumberValue extends ChannelLayer, MixerDefer, MixerTween {
	value: number
}

export interface MixerKeyerParameters extends ChannelLayer {
	keyer: boolean
}
export interface MixerChromaParameters extends ChannelLayer, MixerTween {
	enable: boolean
	targetHue: number
	hueWidth: number
	minSaturation: number
	minBrightness: number
	softness: number
	spillSuppress: number
	spillSuppressSaturation: number
	showMask: boolean
}
export interface MixerBlendParameters extends ChannelLayer, MixerDefer {
	value: BlendMode
}
export interface MixerInvertParameters extends ChannelLayer, MixerDefer {
	value: boolean
}
export type MixerOpacityParameters = MixerNumberValue
export type MixerBrightnessParameters = MixerNumberValue
export type MixerSaturationParameters = MixerNumberValue
export type MixerContrastParameters = MixerNumberValue
export interface MixerLevelsParameters extends ChannelLayer, MixerDefer, MixerTween {
	minInput: number
	maxInput: number
	gamma: number
	minOutput: number
	maxOutput: number
}
export interface MixerFillParameters extends ChannelLayer, MixerDefer, MixerTween {
	x: number
	y: number
	xScale: number
	yScale: number
}
export interface MixerClipParameters extends ChannelLayer, MixerDefer, MixerTween {
	x: number
	y: number
	width: number
	height: number
}
export interface MixerAnchorParameters extends ChannelLayer, MixerDefer, MixerTween {
	x: number
	y: number
}
export interface MixerCropParameters extends ChannelLayer, MixerDefer, MixerTween {
	left: number
	top: number
	right: number
	bottom: number
}
export type MixerRotationParameters = MixerNumberValue
export interface MixerPerspectiveParameters extends ChannelLayer, MixerDefer, MixerTween {
	topLeftX: number
	topLeftY: number
	topRightX: number
	topRightY: number
	bottomRightX: number
	bottomRightY: number
	bottomLeftX: number
	bottomLeftY: number
}
export interface MixerMipmapParameters extends ChannelLayer, MixerDefer {
	value: boolean
}
export type MixerVolumeParameters = MixerNumberValue
export interface MixerMastervolumeParameters extends Channel, MixerDefer, MixerTween {
	value: number
}
export interface MixerStraightAlphaOutputParameters extends Channel, MixerDefer {
	value: boolean
}
export interface MixerGridParameters extends Channel, MixerDefer, MixerTween, MixerNumberValue {}
export type MixerCommitParameters = Channel
export type MixerClearParameters = ChannelLayer

export type ChannelGridParameters = Empty

export interface ThumbnailListParameters {
	subDirectory: string
}
export interface ThumbnailRetrieveParameters {
	filename: string
}
export interface ThumbnailGenerateParameters {
	filename: string
}
export type ThumbnailGenerateAllParameters = Empty

export interface CinfParameters {
	filename: string
}
export interface ClsParameters {
	subDirectory: string
}
export type FlsParameters = Empty
export interface TlsParameters {
	subDirectory: string
}

export type VersionParameters = Empty

export interface InfoParameters {
	channel?: number
	layer?: number
}
export interface InfoTemplateParameters {
	template: string
}
export type InfoConfigParameters = Empty
export type InfoPathsParameters = Empty
export type InfoSystemParameters = Empty
export type InfoServerParameters = Empty
export type InfoQueuesParameters = Empty
export type InfoThreadsParameters = Empty
export type InfoDelayParameters = ChannelLayer

export type DiagParameters = Empty

export type GlInfoParameters = Empty
export type GlGcParameters = Empty

export type ByeParameters = Empty
export type KillParameters = Empty
export type RestartParameters = Empty
