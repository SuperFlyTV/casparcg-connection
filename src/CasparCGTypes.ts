import { Command, Transition, Ease, Direction, Chroma, BlendMode, Lock,
	Version, LogLevel, LogCategory, Producer, Consumer, ChannelVariable,
 	TimecodeSource, ClipType } from './lib/ServerStateEnum'
import { IConnectionOptions, ConnectionOptions, CasparCGVersion } from './lib/AMCPConnectionOptions'
import { IAMCPCommand, CommandOptions } from './lib/AMCPCommand'

import { TemplateData } from './lib/ParamSignature'
import { SocketStatusOptions } from './lib/event/Events'

// Config NS
import { Config as ConfigNS } from './lib/Config'
import CasparCGConfig = ConfigNS.Intermediate.CasparCGConfig
import ICasparCGConfig = ConfigNS.Intermediate.ICasparCGConfig
import { CasparCGPaths } from './lib/ResponseParsers'

export enum Priority {
	LOW = 0,
	NORMAL = 1,
	HIGH = 2
}

interface ChannelOptLayer extends CommandOptions {
	channel: number
	layer?: number
}

interface ChannelAndLayer extends ChannelOptLayer {
	layer: number
}

interface BaseSourceOptions { }

interface ClipOptions extends BaseSourceOptions {
	clip: string
	loop?: boolean
}

// TODO Move is functions to util library?
export function isClipOptions(x: BaseSourceOptions): x is ClipOptions {
	return ('clip' in x)
}

interface DeviceOptions extends BaseSourceOptions {
	device: string
}

export function isDeviceOptions(x: BaseSourceOptions): x is DeviceOptions {
	return ('device' in x)
}

export interface DecklinkDeviceOptions extends DeviceOptions {
	device: 'DECKLINK'
}

export interface RouteOptions extends BaseSourceOptions {
	sourceChannel: number
	sourceLayer?: number
	franesDelay?: number
	noAutoDeinterlace?: boolean // defaults to false
}

export function isRouteOptions(x: BaseSourceOptions): x is RouteOptions {
	return ('sourceChannel' in x)
}

export interface HTMLOptions extends BaseSourceOptions {
	uri: string
}

export function isHTMLOptions(x: BaseSourceOptions): x is HTMLOptions {
	return ('uri' in x)
}

type SourceOptions = ClipOptions | DecklinkDeviceOptions | RouteOptions | HTMLOptions

interface BaseTransitionOptions {
	type: Transition
}

interface NonStingTransitionOptions extends BaseTransitionOptions {
	duration?: number
	easing?: Ease | string
	direction?: Direction | string
}

export function isNonStringTransitionOptions(x: BaseTransitionOptions): x is NonStingTransitionOptions {
	return x.type !== Transition.STING
}

export interface WipeTransitionOptions extends NonStingTransitionOptions {
	type: Transition.WIPE
}

export interface CutTransitionOptions extends NonStingTransitionOptions {
	type: Transition.CUT
}

export interface MixTransitionOptions extends NonStingTransitionOptions {
	type: Transition.MIX
}

export interface PushTransitionOptions extends NonStingTransitionOptions {
	type: Transition.PUSH
}

export interface SlideTransitionOptions extends NonStingTransitionOptions {
	type: Transition.SLIDE
}

export interface StingTransitionOptions extends BaseTransitionOptions {
	type: Transition.STING
	maskFile?: string
	duratioon?: number
	overlay?: string
}

export function isStingTransitionOptions(x: BaseTransitionOptions): x is StingTransitionOptions {
	return x.type === Transition.STING
}

type TransitionOptions = WipeTransitionOptions | CutTransitionOptions |
	MixTransitionOptions | PushTransitionOptions | SlideTransitionOptions |
	StingTransitionOptions

export interface PlayOptions extends ChannelOptLayer {
	source: SourceOptions
	transition?: TransitionOptions
	seek?: number
	length?: number
	filter?: string
}

export interface LoadOptions extends PlayOptions, ChannelAndLayer {
	// command: Command.LOAD
	layer: number
}

export interface LoadBGOptions extends PlayOptions, ChannelAndLayer {
	// command: Command.LOADBG
	layer: number
	auto?: boolean | number | string
}

export interface PauseOptions extends ChannelOptLayer {
	// command: Command.PAUSE
}

export interface ResumeOptions extends ChannelOptLayer {
	// command: Command.RESUME
}

export interface StopOptions extends ChannelOptLayer {
	// command: Command.STOP
}

export interface IVideo {
	loadbg(options: LoadBGOptions): Promise<IAMCPCommand<Command.LOADBG, LoadBGOptions, LoadBGOptions>>
	load(options: LoadOptions): Promise<IAMCPCommand<Command.LOAD, LoadOptions, LoadOptions>>
	play(opitons: PlayOptions): Promise<IAMCPCommand<Command.PLAY, PlayOptions, PlayOptions>>
	pause(options: PauseOptions): Promise<IAMCPCommand<Command.PAUSE, PauseOptions, PauseOptions>>
	resume(options: ResumeOptions): Promise<IAMCPCommand<Command.RESUME, ResumeOptions, ResumeOptions>>
	stop(options: StopOptions): Promise<IAMCPCommand<Command.STOP, StopOptions, StopOptions>>
}

/**
 * AMCP Template-commands
 */

interface CGFlashLayer extends ChannelAndLayer {
	flashLayer: number
}

interface CGData extends CGFlashLayer {
	data?: TemplateData
}

export interface CGAddOptions extends CGData {
	templateName: string
	playOnLoad: boolean | number | string
}

export interface CGPlayOptions extends CGFlashLayer {
	// command: Command.CG_PLAY
}

export interface CGStopOptions extends CGFlashLayer {
	// command: Command.CG_STOP
}

export interface CGNextOptions extends CGFlashLayer {
	// command: Command.CG_NEXT
}

export interface CGRemoveOptions extends CGFlashLayer {
	// command: Command.CG_REMOVE
}

export interface CGClearOptions extends ChannelOptLayer {
	// command: Command.CG_CLEAR
}

export interface CGUpdateOptions extends CGData {
	// command: Command.CG_UPDATE
	data: TemplateData
}

export interface CGInvokeOptions extends CGFlashLayer {
	// command: Command.CG_INVOKE
	methodName: string
}

// see also TemplateHostInfo which is the same with flashLayer = undefined
export interface CGInfoOptions extends ChannelOptLayer {
	// command: Command.CG_INFO
	flashLayer?: number
}

export interface CGInfoResponse extends CGInfoOptions {
	result: string // Response is variable depending on renderer type
}

export interface ICG {
	cgAdd(options: CGAddOptions): Promise<IAMCPCommand<Command.CG_ADD, CGAddOptions, CGAddOptions>>
	cgPlay(options: CGPlayOptions): Promise<IAMCPCommand<Command.CG_PLAY, CGPlayOptions, CGPlayOptions>> // TODO can you not give a template name?
	cgStop(options: CGStopOptions): Promise<IAMCPCommand<Command.CG_STOP, CGStopOptions, CGStopOptions>>
	cgNext(options: CGNextOptions): Promise<IAMCPCommand<Command.CG_NEXT, CGNextOptions, CGNextOptions>>
	cgRemove(options: CGRemoveOptions): Promise<IAMCPCommand<Command.CG_REMOVE, CGRemoveOptions, CGRemoveOptions>>
	cgClear(options: CGClearOptions): Promise<IAMCPCommand<Command.CG_CLEAR, CGClearOptions, CGClearOptions>>
	cgUpdate(optiond: CGUpdateOptions): Promise<IAMCPCommand<Command.CG_UPDATE, CGUpdateOptions, CGUpdateOptions>>
	cgInvoke(options: CGInvokeOptions): Promise<IAMCPCommand<Command.CG_INVOKE, CGInvokeOptions, CGInvokeOptions>>
	cgInfo(options: CGInfoOptions): Promise<IAMCPCommand<Command.CG_INFO, CGInfoOptions, CGInfoResponse>>
}

interface Deferable extends ChannelOptLayer {
	defer?: boolean
}

export interface TransitionDetails {
	transitionDuration?: number
	transitionEasing?: Ease | string
}

export interface Position {
	x?: number
	y?: number
}

export interface CurrentState {
	state?: number | boolean
}

export interface MixerKeyerOptions extends Deferable, CurrentState {
	// command: Command.MIXER_KEYER
}

export interface MixerChromaOptions extends Deferable, TransitionDetails { // TODO: does not match docs
	// command: Command.MIXER_CHROMA
	keyer?: Chroma | string
	threshold?: number
	softness?: number
	spill?: number
}

export interface MixerBlendOptions extends Deferable {
	coomand: Command.MIXER_BLEND
	blendmode?: BlendMode | string
}

export interface MixerInvertOptions extends Deferable, CurrentState {
	// command: Command.MIXER_INVERT
}

export interface MixerOpacityOptions extends Deferable, TransitionDetails {
	// command: Command.MIXER_OPACITY
	opacity?: number
}

export interface MixerBrightnessOptions extends Deferable, TransitionDetails {
	// command: Command.MIXER_BRIGHTNESS
	brightness?: number
}

export interface MixerSaturationOptions extends Deferable, TransitionDetails {
	// command: Command.MIXER_SATURATION
	saturation?: number
}

export interface MixerContrastOptions extends Deferable, TransitionDetails {
	// command: Command.MIXER_CONTRAST
	contract?: number
}

export interface MixerLevelsOptions extends Deferable, TransitionDetails {
	// command: Command.MIXER_LEVELS
	minInput?: number
	maxInput?: number
	gamma?: number
	minOutput?: number
	maxOutput?: number
}

export interface MixerFillOptions extends Deferable, TransitionDetails, Position {
	// command: Command.MIXER_FILL
	xScale?: number
	yScale?: number
}

export interface MixerClipOptions extends Deferable, TransitionDetails, Position {
	// command: Command.MIXER_CLIP
	width?: number
	height?: number
}

export interface MixerAnchorOptions extends Deferable, TransitionDetails, Position {
	// command: Command.MIXER_ANCHOR
}

export interface MixerCropOptions extends Deferable, TransitionDetails {
	// command: Command.MIXER_CROP
	left?: number
	top?: number
	right?: number
	bottom?: number
}

export interface MixerRotationOptions extends Deferable, TransitionDetails {
	// command: Command.MIXER_ROTATION
	rotation?: number
}

export interface MixerPerspectiveOptions extends Deferable, TransitionDetails {
	// command: Command.MIXER_PERSPECTIVE
	topLeftX?: number
	topLeftY?: number
	topRightX?: number
	topRightY?: number
	bottomRightX?: number
	bottomRightY?: number
	bottomLeftX?: number
	bottomLeftY?: number
}

export interface MixerMipmapOptions extends Deferable, CurrentState {
	// command: Command.MIXER_MIPMAP
}

export interface MixerVolumeOptions extends Deferable, TransitionDetails {
	// command: Command.MIXER_VOLUME
	volume?: number
}

export interface MixerMastervolumeOptions extends Deferable {
	// command: Command.MIXER_MASTERVOLUME
	layer: undefined
	mastervolume?: number
}

export interface MixerStraightAlphaOutputOptions extends Deferable, CurrentState {
	// command: Command.MIXER_STRAIGHT_ALPHA_OUTPUT
}

export interface MixerGridOptions extends Deferable, TransitionDetails { // TODO no GET option?
	// command: Command.MIXER_GRID
	layer: undefined
	resolution: number
}

export interface MixerCommitOptions extends ChannelOptLayer {
	// command: Command.MIXER_COMMIT
	layer: undefined
}

export interface MixerClearOptions extends ChannelOptLayer {
	// command: Command.MIXER_CLEAR
}

export interface ChannelGridOptions extends CommandOptions {
	// command: Command.CHANNEL_GRID
}

/**
 * AMCP Mixer-commands
 */
export interface IMixer {
	mixerKeyer(options: MixerKeyerOptions): Promise<IAMCPCommand<Command.MIXER_KEYER, MixerKeyerOptions, MixerKeyerOptions>>
	mixerChroma(options: MixerChromaOptions): Promise<IAMCPCommand<Command.MIXER_CHROMA, MixerChromaOptions, MixerChromaOptions>>
	mixerBlend(options: MixerBlendOptions): Promise<IAMCPCommand<Command.MIXER_BLEND, MixerBlendOptions, MixerBlendOptions>>
	mixerInvert(options: MixerInvertOptions): Promise<IAMCPCommand<Command.MIXER_INVERT, MixerInvertOptions, MixerInvertOptions>>
	mixerOpacity(options: MixerOpacityOptions): Promise<IAMCPCommand<Command.MIXER_OPACITY, MixerOpacityOptions, MixerOpacityOptions>>
	mixerBrightness(options: MixerBrightnessOptions): Promise<IAMCPCommand<Command.MIXER_BRIGHTNESS, MixerBrightnessOptions, MixerBrightnessOptions>>
	mixerSaturation(options: MixerSaturationOptions): Promise<IAMCPCommand<Command.MIXER_SATURATION, MixerSaturationOptions, MixerSaturationOptions>>
	mixerContrast(options: MixerContrastOptions): Promise<IAMCPCommand<Command.MIXER_CONTRAST, MixerContrastOptions, MixerContrastOptions>>
	mixerLevels(options: MixerLevelsOptions): Promise<IAMCPCommand<Command.MIXER_LEVELS, MixerLevelsOptions, MixerLevelsOptions>>
	mixerFill(options: MixerFillOptions): Promise<IAMCPCommand<Command.MIXER_FILL, MixerFillOptions, MixerFillOptions>>
	mixerClip(options: MixerClipOptions): Promise<IAMCPCommand<Command.MIXER_CLIP, MixerClipOptions, MixerClipOptions>>
	mixerAnchor(options: MixerAnchorOptions): Promise<IAMCPCommand<Command.MIXER_ANCHOR, MixerAnchorOptions, MixerAnchorOptions>>
	mixerCrop(options: MixerCropOptions): Promise<IAMCPCommand<Command.MIXER_CROP, MixerCropOptions, MixerCropOptions>>
	mixerRotation(options: MixerRotationOptions): Promise<IAMCPCommand<Command.MIXER_ROTATION, MixerRotationOptions, MixerRotationOptions>>
	mixerPerspective(options: MixerPerspectiveOptions): Promise<IAMCPCommand<Command.MIXER_PERSPECTIVE, MixerPerspectiveOptions, MixerPerspectiveOptions>>
	mixerMipmap(options: MixerMipmapOptions): Promise<IAMCPCommand<Command.MIXER_MIPMAP, MixerMipmapOptions, MixerMipmapOptions>>
	mixerVolume(options: MixerVolumeOptions): Promise<IAMCPCommand<Command.MIXER_VOLUME, MixerVolumeOptions, MixerVolumeOptions>>
	mixerMastervolume(options: MixerMastervolumeOptions): Promise<IAMCPCommand<Command.MIXER_MASTERVOLUME, MixerMastervolumeOptions, MixerMastervolumeOptions>>
	mixerStraightAlphaOutput(coptions: MixerStraightAlphaOutputOptions): Promise<IAMCPCommand<Command.MIXER_STRAIGHT_ALPHA_OUTPUT, MixerStraightAlphaOutputOptions, MixerStraightAlphaOutputOptions>>
	mixerGrid(options: MixerGridOptions): Promise<IAMCPCommand<Command.MIXER_GRID, MixerGridOptions, MixerGridOptions>>
	mixerCommit(options: MixerCommitOptions): Promise<IAMCPCommand<Command.MIXER_COMMIT, MixerCommitOptions, MixerCommitOptions>>
	mixerClear(options: MixerClearOptions): Promise<IAMCPCommand<Command.MIXER_CLEAR, MixerClearOptions, MixerClearOptions>>
	channelGrid(options?: ChannelGridOptions): Promise<IAMCPCommand<Command.CHANNEL_GRID, ChannelGridOptions, ChannelGridOptions>>
}

/**
 * AMCP Channel-commands
 */
export interface ClearOptions extends ChannelOptLayer {
	// command: Command.CLEAR
}

export interface CallOptions extends ChannelAndLayer {
	// command: Command.CALL
}  // TODO add call-specific options

export interface SwapOptions extends ChannelAndLayer {
	// command: Command.SWAP
	channel2: number
	layer2: number
	transforms?: boolean | string
}

export interface PrintOptions extends ChannelOptLayer {
	// command: Command.PRINT
	layer: undefined
}

export interface LockOptions extends ChannelOptLayer {
	// command: Command.LOCK
	layer: undefined
	action: Lock | string
	lockPhrase?: string
}

export interface SetOptions extends ChannelOptLayer {
	// command: Command.SET
	layer: undefined
	variable: ChannelVariable | string
	value: string | number | boolean
}

export interface GLGCOptions extends CommandOptions {
	// command: Command.GL_GC
}

export interface AddOptions extends ChannelOptLayer {
	// command: Command.ADD
	layer: undefined
	consumer: string
	consumerIndex?: number // Used for removal
	parameters?: Array<string | number | boolean>
}

export interface AddDecklinkOptions extends AddOptions {
	consumer: 'DECKLINK'
	// parameters: undefined
	device: number
}

export function isAddDecklinkOptions(x: AddOptions): x is AddDecklinkOptions {
	return x.consumer === 'DECKLINK'
}

export interface AddImageOptions extends AddOptions {
	consumer: 'IMAGE'
	// parameters: undefined
	fileName: string
}

export function isAddImageOptions(x: AddOptions): x is AddImageOptions {
	return x.consumer === 'IMAGE'
}

export interface AddFileOptions extends AddOptions {
	consumer: 'FILE'
	// paramters: undefined
	fileName: string
	separateKey?: boolean
}

export function isAddFileOptions(x: AddOptions): x is AddFileOptions {
	return x.consumer === 'FILE'
}

export interface AddStreamOptions extends AddOptions {
	consumer: 'STREAM'
	uri: string
}

export function isAddStreamOptions(x: AddOptions): x is AddStreamOptions {
	return x.consumer === 'STREAM'
}

export interface AddSyncToOptions extends AddOptions {
	consumer: 'SYNCTO'
	syncWith: number
}

export function isAddSyncToOptions(x: AddOptions): x is AddSyncToOptions {
	return x.consumer === 'SYNCTO'
}

export interface RemoveOptions extends ChannelOptLayer {
	// command: Command.REMOVE
	layer: undefined
	consumer?: string
	consumerIndex?: number
	parameters?: Array<string | number | boolean>
}

export interface RemoveByIDOptions extends RemoveOptions {
	consumer: undefined
	consumerIndex: number
}

export function isRemoveByIDOptions(x: RemoveOptions): x is RemoveByIDOptions {
	return x.consumer === undefined && typeof x.consumerIndex === 'number'
}

export interface RemoveDecklinkOptions extends RemoveOptions {
	consumer: 'DECKLINK'
	device: number
}

export function isRemoveDecklinkOptions(x: RemoveOptions): x is RemoveDecklinkOptions {
	return x.consumer === 'DECKLINK'
}

export interface RemoveImageOptions extends RemoveOptions {
	consumer: 'IMAGE'
	fileName: string
}

export function isRemoveImageOptions(x: RemoveOptions): x is RemoveImageOptions {
	return x.consumer === 'IMAGE'
}

export interface RemoveFileOptions extends RemoveOptions {
	consumer: 'FILE'
	fileName: string
}

export function isRemoveFileOptions(x: RemoveOptions): x is RemoveFileOptions {
	return x.consumer === 'FILE'
}

export interface RemoveStreamOptions extends RemoveOptions {
	consumer: 'STREAM'
	uri: string
}

export function isRemoveStreamOptions(x: RemoveOptions): x is RemoveStreamOptions {
	return x.consumer === 'STREAM'
}

export interface IChannel {
	clear(options: ClearOptions): Promise<IAMCPCommand<Command.CLEAR, ClearOptions, ClearOptions>>
	call(options: CallOptions): Promise<IAMCPCommand<Command.CALL, CallOptions, CallOptions>>
	swap(options: SwapOptions): Promise<IAMCPCommand<Command.SWAP, SwapOptions, SwapOptions>>
	print(options: PrintOptions | number): Promise<IAMCPCommand<Command.PRINT, PrintOptions, PrintOptions>>
	set(options: SetOptions): Promise<IAMCPCommand<Command.SET, SetOptions, SetOptions>>
	lock(options: LockOptions): Promise<IAMCPCommand<Command.LOCK, LockOptions, LockOptions>>
	glGC(options?: GLGCOptions): Promise<IAMCPCommand<Command.GL_GC, GLGCOptions, GLGCOptions>>
	add(options: AddOptions): Promise<IAMCPCommand<Command.ADD, AddOptions, AddOptions>>
	remove(options: RemoveOptions): Promise<IAMCPCommand<Command.REMOVE, RemoveOptions, RemoveOptions>>
}

/**
 * AMCP Template Data-commands
 */

interface FileDetails extends CommandOptions {
	fileName: string
}

export interface DataStoreOptions extends FileDetails {
	// command: Command.DATA_STORE
	data: TemplateData
}

export interface DataListOptions extends CommandOptions {
	// command: Command.DATA_LIST
}

export interface DataListeResponse extends DataListOptions {
	fileNames: string[]
}

export interface DataRetrieveOptions extends FileDetails {
	// command: Command.DATA_RETRIEVE
}

export interface DataRetrieveResponse extends DataRetrieveOptions {
	data: TemplateData
}

export interface DataRemoveOptions extends FileDetails {
	// command: Command.DATA_REMOVE
}

export interface IData {
	dataStore(options: DataStoreOptions): Promise<IAMCPCommand<Command.DATA_STORE, DataStoreOptions, DataStoreOptions>>
	dataRetrieve(options: DataRetrieveOptions | string): Promise<IAMCPCommand<Command.DATA_RETRIEVE, DataRetrieveOptions, DataRetrieveResponse>>
	dataList(options?: DataListOptions): Promise<IAMCPCommand<Command.DATA_LIST, DataListOptions, DataListOptions>>
	dataRemove(options: DataRemoveOptions | string): Promise<IAMCPCommand<Command.DATA_REMOVE, DataRemoveOptions, DataRemoveOptions>>
}

/**
 * AMCP Thumbnail-commands
 */

interface SubFolderDetails extends CommandOptions {
	subFolder?: string
}

export interface ThumbnailListOptions extends SubFolderDetails {
	// command: Command.THUMBNAIL_LIST
}

export interface ThumbnailListResponse extends ThumbnailListOptions {
	thumbnailNames: string[]
}

export interface ThumbnailRetrieveOptions extends FileDetails {
	// command: Command.THUMBNAIL_RETRIEVE
}

export interface ThumbnailRetrieveResponse extends ThumbnailRetrieveOptions {
	thumbnail: Buffer | null // Base-64 PNG image
}

export interface ThumbnailGenerateOptions extends FileDetails {
	// command: Command.THUMBNAIL_GENERATE
}

export interface ThumbnailGenerateAllOptions extends CommandOptions {
	// command: Command.THUMBNAIL_GENERATE_ALL
}

export interface IThumbnail {
	thumbnailList(options?: ThumbnailListOptions): Promise<IAMCPCommand<Command.THUMBNAIL_LIST, ThumbnailListOptions, ThumbnailListResponse>>
	thumbnailRetrieve(options: ThumbnailRetrieveOptions): Promise<IAMCPCommand<Command.THUMBNAIL_RETRIEVE, ThumbnailRetrieveOptions, ThumbnailRetrieveResponse>>
	thumbnailGenerate(options: ThumbnailGenerateOptions): Promise<IAMCPCommand<Command.THUMBNAIL_GENERATE, ThumbnailGenerateOptions, ThumbnailGenerateOptions>>
	thumbnailGenerateAll(options?: ThumbnailGenerateAllOptions): Promise<IAMCPCommand<Command.THUMBNAIL_GENERATE_ALL, ThumbnailGenerateAllOptions, ThumbnailGenerateAllOptions>>
}

/**
 * AMCP Query-commands
 */

export interface CInfOptions extends FileDetails {
	// command: Command.CINF
}

export interface MediaInfo {
	filePath: string
	clipType: ClipType
	size: number
	writeTime: Date
	duration: number
	timeBase: [ number, number ]
}

export interface CInfResponse extends CInfOptions {
	clips: MediaInfo[]
}

export interface CLSOptions extends SubFolderDetails {
	// command: Command.CLS
}

export interface CLSResponse extends CLSOptions {
	clips: MediaInfo[]
}

export interface TemplateInfo {
	filePath: string
	size: number
	writeTime: Date
	sceneType: string
}

export interface TLSOptions extends SubFolderDetails {
	// command: Command.TLS
}

export interface TLSReponse extends TLSOptions {
	templates: TemplateInfo[]
}

export interface FLSOptions extends CommandOptions {
	// command: Command.FLS
}

export interface FontInfo {
	fontName: string
	filePath: string
}

export interface FLSResponse extends FLSOptions {
	fontNames: FontInfo[]
}

export interface VersionOptions extends CommandOptions {
	// command: Command.VERSION
	component?: Version
}

export interface VersionResponse extends VersionOptions {
	version: string // TODO should this go elsewhere
}

export interface InfoOptions extends CommandOptions {
	// command: Command.INFO
	channel?: number
	layer?: number
}

export interface ChannelSummary {
	index: number
	videoFormat: string
	state: 'PLAYING' // fixed value - might be expanded in the future
}

export interface InfoResponse extends InfoOptions {
	type: string
}

export interface InfoChannelsResponse extends InfoResponse {
	type: 'CHANNELS'
	channels: ChannelSummary[]
}

export interface InfoChannelResponse extends InfoResponse {
	type: 'CHANNEL'
	channelDetails: object // Convert XML to JSON/Object
}

export interface InfoLayerResponse extends InfoResponse {
	type: 'LAYER'
	layerDetails: object // Convert XML to JSON/Object
}

export interface InfoTemplateOptions extends CommandOptions {
	// command: Command.INFO_TEMPLATE
	templateName: string
}

export interface InfoTemplateResponse extends InfoTemplateOptions {
	templateInfo: object // Covert XML to JSON
}

export interface InfoConfigOptions extends CommandOptions {
	// command: Command.INFO_CONFIG
}

export interface InfoConfigResponse extends InfoConfigOptions {
	config: ICasparCGConfig
}

export interface InfoPathsOptions extends CommandOptions {
	// command: Command.INFO_PATHS
}

export interface InfoPathsResponse extends InfoPathsOptions {
	mediaPath: string
	logPath: string
	dataPath: string
	templatePath: string
	thumbnailPath: string
	fontPath: string
	initialPath: string
}

export interface InfoSystemOptions extends CommandOptions {
	// command: Command.INFO_SYSTEM
}

export interface InfoSystemResponse extends InfoSystemOptions {
	name: string
	osDescription: string
	cpu: string
	systemDetails: object // Convert remaining XML to JSON/Object
}

export interface InfoServerOptions extends CommandOptions {
	// command; Command.INFO_SERVER
}

export interface InfoServerResponse extends InfoServerOptions {
	serverDetails: object // Convert XML to JSON/Object
}

export interface InfoQueuesOptions extends CommandOptions {
	// command: Command.INFO_QUEUE
}

export interface InfoQueuesResponse extends InfoQueuesOptions {
	queues: object
}

export interface InfoThreadsOptions extends CommandOptions {
	// comand: Command.INFO_THREADS
}

export interface ThreadInfo {
	nativeId: number
	name: string
}

export interface InfoThreadsResponse extends InfoThreadsOptions {
	threads: ThreadInfo[]
}

export interface InfoDelayOptions extends ChannelOptLayer {
	// command: Command.INFO_DELAY
}

export interface InfoDelayResponse extends InfoDelayOptions {
	delayDetails: object // Convert XML to JSON/Object
}

export interface TemplateHostInfoOptions extends CommandOptions {
  // command: Cmmand.CG_INFO with no parameters
}

export interface TemplateHostInfoResponse extends TemplateHostInfoOptions {
	result: string // What is returned is very renderer specific - bit of a mess
}

export interface GLInfoOptions extends CommandOptions {
	// command: Command.GL_INFO
}

export interface GLInfoResponse extends GLInfoOptions {
	deviceDetails: object // convert XML to JSON/Object
}

export interface LogLevelOptions extends CommandOptions {
	// command: Command.LOG_LEVEL
	level: LogLevel | string
}

export interface LogCategoryOptions extends CommandOptions {
	// command: Command.LOG_CATEGORY
	category: LogCategory
	enabled: boolean
}

export interface DiagOptions extends CommandOptions {
	// command: Command.DIAG
}

export interface HelpOptions extends CommandOptions {
	// command: Command.HELP
	for?: Command | string
}

export interface HelpInfo {
	command: Command
	details: string
}
export interface HelpResponse extends HelpOptions {
	info: HelpInfo | HelpInfo[]
}

export interface HelpProducerOptions extends CommandOptions {
	// command: Command.HELP_PRODUCER
	producer?: Producer | string
}

export interface ProducerInfo {
	producer: Producer
	details: string
}

export interface HelpProducerResponse extends HelpProducerOptions {
	info: ProducerInfo | ProducerInfo[]
}

export interface HelpConsumerOptions extends CommandOptions {
	// command: Command.HELP_CONSUMER
	consumer?: Consumer | string
}

export interface ConsumerInfo {
	consumer: Consumer
	details: string
}

export interface HelpConsumerResponse extends HelpConsumerOptions {
	info: ConsumerInfo | ConsumerInfo[]
}

// Behaviour of CINF different between 2.1 and 2.2 - 2.1 ignores functionlders

export interface IQuery {
	cinf(options: CInfOptions): Promise<IAMCPCommand<Command.CINF, CInfOptions, CInfResponse>>
	cls(options?: CLSOptions): Promise<IAMCPCommand<Command.CLS, CLSOptions, CLSResponse>>
	fls(optins?: FLSOptions): Promise<IAMCPCommand<Command.FLS, FLSOptions, FLSResponse>>
	tls(options?: TLSOptions): Promise<IAMCPCommand<Command.TLS, TLSOptions, TLSReponse>>
	version(options?: VersionOptions): Promise<IAMCPCommand<Command.VERSION, VersionOptions, VersionResponse>>
	info(options?: InfoOptions): Promise<IAMCPCommand<Command.INFO, InfoOptions, InfoOptions>>
	infoTemplate(options: InfoTemplateOptions): Promise<IAMCPCommand<Command.INFO_TEMPLATE, InfoTemplateOptions, InfoTemplateResponse>>
	infoConfig(options?: InfoConfigOptions): Promise<IAMCPCommand<Command.INFO_CONFIG, InfoConfigOptions, InfoConfigResponse>>
	infoPaths(options?: InfoPathsOptions): Promise<IAMCPCommand<Command.INFO_PATHS, InfoPathsOptions, InfoPathsResponse>>
	infoSystem(options?: InfoSystemOptions): Promise<IAMCPCommand<Command.INFO_SYSTEM, InfoSystemOptions, InfoSystemResponse>>
	infoServer(options?: InfoServerOptions): Promise<IAMCPCommand<Command.INFO_SERVER, InfoServerOptions, InfoServerResponse>>
	infoQueues(options?: InfoQueuesOptions): Promise<IAMCPCommand<Command.INFO_QUEUES, InfoQueuesOptions, InfoQueuesOptions>> // v2.0.7 only
	infoThreads(options?: InfoThreadsOptions): Promise<IAMCPCommand<Command.INFO_THREADS, InfoThreadsOptions, InfoThreadsResponse>>
	infoDelay(options: InfoDelayOptions): Promise<IAMCPCommand<Command.INFO_DELAY, InfoDelayOptions, InfoDelayResponse>>
	templateHostInfo(options?: TemplateHostInfoOptions): Promise<IAMCPCommand<Command.CG_INFO, TemplateHostInfoOptions, TemplateHostInfoResponse>>
	glInfo(options?: GLInfoOptions): Promise<IAMCPCommand<Command.GL_INFO, GLInfoOptions, GLInfoResponse>>
	logLevel(options: LogLevelOptions | LogLevel | string): Promise<IAMCPCommand<Command.LOG_LEVEL, LogLevelOptions, LogLevelOptions>>
	logCategory(options: LogCategoryOptions): Promise<IAMCPCommand<Command.LOG_CATEGORY, LogCategoryOptions, LogCategoryOptions>>
	logCalltrace(enabled: boolean): Promise<IAMCPCommand<Command.LOG_CATEGORY, LogCategoryOptions, LogCategoryOptions>>
	logCommunication(enabled: boolean): Promise<IAMCPCommand<Command.LOG_CATEGORY, LogCategoryOptions, LogCategoryOptions>>
	diag(options?: DiagOptions): Promise<IAMCPCommand<Command.DIAG, DiagOptions, DiagOptions>>
	help(options?: HelpOptions | Command | string): Promise<IAMCPCommand<Command.HELP, HelpOptions, HelpResponse>>
	getCommands(): Promise<IAMCPCommand<Command.HELP, HelpOptions, HelpResponse>>
	helpProducer(options?: HelpProducerOptions | Producer | string): Promise<IAMCPCommand<Command.HELP_PRODUCER, HelpProducerOptions, HelpProducerResponse>>
	getProducers(): Promise<IAMCPCommand<Command.HELP_PRODUCER, HelpProducerOptions, HelpProducerResponse>>
	helpConsumer(options?: HelpConsumerOptions | Consumer | string): Promise<IAMCPCommand<Command.HELP_CONSUMER, HelpConsumerOptions, HelpConsumerResponse>>
	getConsumers(): Promise<IAMCPCommand<Command.HELP_CONSUMER, HelpConsumerOptions, HelpConsumerResponse>>
}

/**
 * AMCP Operation-commands
 */

export interface ByeOptions extends CommandOptions {
 // command: Command.BYE
}

export interface KillOptions extends CommandOptions {
 // command: Command.KILL
}

export interface RestartOptions extends CommandOptions {
 // command: Command.RESTART
}

export interface PingOptions extends CommandOptions {
	// command: Command.PING
	token?: string
}

export interface IOperation {
	bye(options?: ByeOptions): Promise<IAMCPCommand<Command.BYE, ByeOptions, ByeOptions>>
	kill(options?: KillOptions): Promise<IAMCPCommand<Command.KILL, KillOptions, KillOptions>>
	restart(options?: RestartOptions): Promise<IAMCPCommand<Command.RESTART, RestartOptions, RestartOptions>>
	ping(options?: PingOptions): Promise<IAMCPCommand<Command.PING, PingOptions, PingOptions>>
}

export interface TimeOptions extends ChannelOptLayer {
	// command: Command.TIME
}

export interface TimeResponse extends TimeOptions {
	timecode: string
}

export interface ScheduleSetOptions extends CommandOptions {
	// command: Command.SCHEDULE_SET
	token: string
	timecode: string
	scheduledCommand: Command | string
	options: CommandOptions	// command: Command.SCHEDULE_SET
}

export interface ScheduleListOptions extends CommandOptions {
	// command: Command.SCHEDULE_LIST
	channel?: number
	timecode?: string
}

export interface ScheduleItem {
	channel: number
	timecode: string
	token: string
}

export interface ScheduleListResponse extends ScheduleListOptions {
	items: ScheduleItem[]
}

export interface ScheduleClearOptions extends CommandOptions {
	// command: Command.SCHEDULE_CLEAR
}

export interface ScheduleRemoveOptions extends CommandOptions {
	// command: Command.SCHEDULE_REMOVE
	token: string
}

export interface ScheduleInfoOptions extends CommandOptions {
	// command: Command.SCHEDULE_INFO
	token: string
}

export interface ScheduleInfoResponse extends ScheduleInfoOptions {
	timecode: string
}

export interface TimecodeSourceOptions extends CommandOptions {
	// command: Command.TIMECODE_SOURCE
	source?: TimecodeSource
}

export interface TimecodeSourceQueryOptions extends TimecodeSourceOptions {
	source: undefined
}

export interface TimecodeSourceClockOptions extends TimecodeSourceOptions {
	source: TimecodeSource.CLOCK
}

export interface TimecodeSourceLayerOptions extends TimecodeSourceOptions {
	source: TimecodeSource.LAYER
	layer: number
}

export interface TimecodeSourceClearOptions extends TimecodeSourceOptions {
	source: TimecodeSource.CLEAR
}

export interface ISchedule {
	time(options: TimeOptions): Promise<IAMCPCommand<Command.TIME, TimeOptions, TimeOptions>>
	scheduleSet(options: ScheduleSetOptions): Promise<IAMCPCommand<Command.SCHEDULE_SET, ScheduleSetOptions, ScheduleSetOptions>>
	scheduleList(options: ScheduleListOptions): Promise<IAMCPCommand<Command.SCHEDULE_LIST, ScheduleListOptions, ScheduleListResponse>>
	scheduleClear(options: ScheduleClearOptions): Promise<IAMCPCommand<Command.SCHEDULE_CLEAR, ScheduleClearOptions, ScheduleClearOptions>>
	scheduleRemove(options: ScheduleRemoveOptions | string): Promise<IAMCPCommand<Command.SCHEDULE_REMOVE, ScheduleRemoveOptions, ScheduleRemoveOptions>>
	scheduleInfo(options: ScheduleInfoOptions): Promise<IAMCPCommand<Command.SCHEDULE_INFO, ScheduleInfoOptions, ScheduleInfoResponse>>
	timecodeSource(options: TimecodeSourceOptions): Promise<IAMCPCommand<Command.TIMECODE_SOURCE, TimecodeSourceOptions, TimecodeSourceOptions>>
}

export interface AMCP extends IVideo, ICG, IMixer, IChannel, IData, IThumbnail, IQuery, IOperation, ISchedule { }

/**
 * CasparCG Interface
 */
export interface ICasparCGConnection {
	connectionOptions: ConnectionOptions
	connected: boolean
	connectionStatus: SocketStatusOptions
	readonly commandQueueLength: number
	getCasparCGConfig(refresh: boolean): Promise<CasparCGConfig>
	getCasparCGPaths(refresh: boolean): Promise<CasparCGPaths>
	getCasparCGVersion(refresh: boolean): Promise<CasparCGVersion>
	removeQueuedCommand(id: string): boolean
	connect(options?: IConnectionOptions): void
	disconnect(): void
	createCommand<C extends Command, REQ extends CommandOptions, RES extends REQ>(command: C, options: REQ): IAMCPCommand<C, REQ, RES> | undefined
	queueCommand<C extends Command, REQ extends CommandOptions, RES extends REQ>(command: IAMCPCommand<C, REQ, RES>, priority: Priority): Promise<IAMCPCommand<C, REQ, RES>>
	do<C extends Command, REQ extends CommandOptions, RES extends REQ>(command: C, options: REQ): Promise<IAMCPCommand<C, REQ, RES>>
	doNow<C extends Command, REQ extends CommandOptions, RES extends REQ>(command: C, options: REQ): Promise<IAMCPCommand<C, REQ, RES>>
	doLater<C extends Command, REQ extends CommandOptions, RES extends REQ>(command: C, options: REQ): Promise<IAMCPCommand<C, REQ, RES>>
}
