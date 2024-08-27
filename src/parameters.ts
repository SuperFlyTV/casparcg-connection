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
	Version,
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
	format?: string
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
	/**
	 * Ffmpeg video filter, serialized as vfilter in 2.2+ and filter before 2.2
	 */
	vFilter?: string
	/**
	 * 2.2+ only option, specifify a channelLayout for backwards compatibility
	 */
	aFilter?: string
	/**
	 * Channel layout is a 2.1 only option
	 */
	channelLayout?: string
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
export type ClearParameters = {
	channel: number
	layer?: number
}

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
	/** cgLayer (defaults to 1) */
	cgLayer?: number
}

export interface CgAddParameters extends ChannelLayer, CGLayer {
	template: string
	/** If true, CasparCG will call play() in the template after load. */
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
	subDirectory?: string
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
	subDirectory?: string
}
export interface ClipInfo {
	/** Clip filename, eg "myFolder/AMB" */
	clip: string
	/** Type of media  */
	type: 'MOVIE' | 'STILL' | 'AUDIO' // | 'HTML' | 'ROUTE'
	/** Size, in bytes */
	size: number
	/** Datetime (unix timestamp) */
	datetime: number
	/** Number of frames */
	frames: number
	/** Number of frames per second, eg 25 */
	framerate: number
}
export type FlsParameters = Empty
export interface TlsParameters {
	subDirectory?: string
}

export type VersionParameters = Empty
export interface VersionInfo {
	/** The version of the CasparCG server */
	version: Version
	/** Unparsed version as string */
	fullVersion: string
}

export type InfoParameters = Empty
export interface InfoEntry {
	/** Channel number, eg 1,2,3 */
	channel: number
	/** Channel format, eg "720p5000" */
	format: string
	/** Channel frame rate, eg 50 */
	channelRate: number
	/** Channel frame rate, eg 50 */
	frameRate: number
	/** If interlaced or not */
	interlaced: boolean

	/** eg "PLAYING" */
	status: string
}

export interface InfoChannelParameters {
	channel: number
}
export interface InfoChannelEntry {
	channel: {
		framerate: number
		mixer: {
			audio: {
				/** Current volumes on audio channels  */
				volumes: number[]
			}
		}
		layers: {
			layer: number
			background: unknown
			foreground: unknown
		}[]
	}
}
export interface InfoLayerParameters {
	channel: number
	layer: number
}
export type InfoLayerEntry = InfoChannelEntry
export interface InfoTemplateParameters {
	template: string
}

export type InfoConfigParameters = Empty
export const enum ConsumerType {
	DECKLINK = 'decklink',
	BLUEFISH = 'bluefish',
	SYSTEM_AUDIO = 'system-audio',
	SCREEN = 'screen',
	NEWTEK_IVGA = 'newtek-ivga',
	NDI = 'ndi',
	FFMPEG = 'ffmpeg',
}
export interface ConsumerConfig {
	type: ConsumerType
}
export interface DeckLinkConsumerConfig extends ConsumerConfig {
	type: ConsumerType.DECKLINK
	device?: number
	keyDevice?: number
	embeddedAudio?: boolean
	latency?: string
	keyer?: string
	keyOnly?: boolean
	bufferDepth?: number
	videoMode?: string
	subregion?: {
		srcX?: number
		srcY?: number
		destX?: number
		destY?: number
		width?: number
		height?: number
	}
}
export interface BluefishConsumerConfig extends ConsumerConfig {
	type: ConsumerType.BLUEFISH
	device?: number
	sdiStream?: number
	embeddedAudio?: boolean
	keyer?: string
	internalKeyerAudioSource?: string
	watchdog?: number
	uhdMode?: number
}
export interface SystemAudioConsumerConfig extends ConsumerConfig {
	type: ConsumerType.SYSTEM_AUDIO
	channelLayout?: string
	latency?: number
}
export interface ScreenConsumerConfig extends ConsumerConfig {
	type: ConsumerType.SCREEN
	device?: number
	aspectRatio?: string
	stretch?: string
	windowed?: boolean
	keyOnly?: boolean
	vsync?: boolean
	borderless?: boolean
	interactive?: boolean
	alwaysOnTop?: boolean
	x?: number
	y?: number
	width?: number
	height?: number
	sbsKey?: boolean
	colourSpace?: string
}
export interface IVgaConsumerConfig extends ConsumerConfig {
	type: ConsumerType.NEWTEK_IVGA
}
export interface NdiConsumerConfig extends ConsumerConfig {
	type: ConsumerType.NDI
	name?: string
	allowFields?: boolean
}
export interface FFmpegConsumerConfig extends ConsumerConfig {
	type: ConsumerType.FFMPEG
	path?: string
	args?: string
}
export type ConsumerConfigAny =
	| DeckLinkConsumerConfig
	| BluefishConsumerConfig
	| SystemAudioConsumerConfig
	| ScreenConsumerConfig
	| IVgaConsumerConfig
	| NdiConsumerConfig
	| FFmpegConsumerConfig
export interface ProducerConfig {
	id: number
	producer: string
}
export interface InfoChannelConfig {
	videoMode?: string
	consumers: ConsumerConfigAny[]
	producers: ProducerConfig[]
}
export interface TemplateHostConfig {
	videoMode?: string
	fileName?: string
	width?: number
	height?: number
}
export interface InfoVideoModeConfig {
	id?: string
	width?: number
	height?: number
	timeScale?: number
	duration?: number
	cadence?: number
}
export interface InfoConfig {
	logLevel?: LogLevel
	paths?: {
		media?: string
		logs?: string
		data?: string
		templates?: string
	}
	lockClearPhrase?: string
	channels?: InfoChannelConfig[]
	templateHosts?: TemplateHostConfig[]
	ffmpeg?: {
		producer?: {
			autoDeinterlace?: string
			threads?: number
		}
	}
	html?: {
		remoteDebuggingPort?: number
		enableGpu?: boolean
	}
	ndi?: {
		autoLoad?: boolean
	}
	osc?: {
		defaulPort?: number
		disableSendToAmcpClients?: boolean
		predefinedClients?: Array<{ address?: string; port?: number }>
	}
	controllers?: {
		tcp?: {
			port?: number
			protocol?: string
		}
	}
	amcp?: {
		mediaServer?: {
			host?: string
			port?: number
		}
	}
	videoModes?: InfoVideoModeConfig[]

	// Contents of the config file, parsed with xml2js. It might contain elements present in the config, but not typed in the InfoConfig interface.
	raw?: unknown
	// Unparsed contents of the config file
	rawXml: string
}

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
export type PingParameters = Empty
export type BeginParameters = Empty
export type CommitParameters = Empty
export type DiscardParameters = Empty

export interface CustomCommandParameters {
	command: string
}
