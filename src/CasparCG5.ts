import { EventEmitter } from 'events'
import { CasparCGSocket } from './lib/CasparCGSocket'
import { CasparCGSocketResponse } from './lib/AMCP'

import { Command, Transition, Ease, Direction, Chroma, BlendMode, Lock,
	Version, LogLevel, LogCategory, Producer, Consumer, ChannelVariable,
 	TimecodeSource, ClipType } from './lib/ServerStateEnum'
import { IConnectionOptions, ConnectionOptions, Options as OptionsNS } from './lib/AMCPConnectionOptions'
// Options NS
import QueueMode = OptionsNS.QueueMode
import CasparCGVersion = OptionsNS.CasparCGVersion
// Command NS
import { IAMCPCommand, isIAMCPCommand, IAMCPStatus, AMCPResponse, CommandOptions,
	LayerWithFallbackCommand, LayerWithCgFallbackCommand, AMCPCommand, ChannelCommand,
  ChannelOrLayerCommand, OrChannelOrLayerCommand, createCommand as createAMCPCommand } from './lib/AMCPCommand'

// Param NS
import { Param, TemplateData } from './lib/ParamSignature'
// Event NS
import { CasparCGSocketStatusEvent, CasparCGSocketCommandEvent, CasparCGSocketResponseEvent,
	LogEvent, SocketStatusOptions } from './lib/event/Events'
// Callback NS
import { Callback as CallbackNS } from './lib/global/Callback'
import IBooleanCallback = CallbackNS.IBooleanCallback
import IErrorCallback = CallbackNS.IErrorCallback
import IStringCallback = CallbackNS.IStringCallback
import ISocketStatusCallback = CallbackNS.ISocketStatusCallback
// Config NS
import { Config as ConfigNS } from './lib/Config'
import CasparCGConfig = ConfigNS.Intermediate.CasparCGConfig
import ICasparCGConfig = ConfigNS.Intermediate.ICasparCGConfig
// Response NS
import { Response as ResponseNS } from './lib/ResponseParsers'
import CasparCGPaths = ResponseNS.CasparCGPaths

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

function isStingTransitionOptions(x: BaseTransitionOptions): x is StingTransitionOptions {
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

function isAddDecklinkOptions(x: AddOptions): x is AddDecklinkOptions {
	return x.consumer === 'DECKLINK'
}

export interface AddImageOptions extends AddOptions {
	consumer: 'IMAGE'
	// parameters: undefined
	fileName: string
}

function isAddImageOptions(x: AddOptions): x is AddImageOptions {
	return x.consumer === 'IMAGE'
}

export interface AddFileOptions extends AddOptions {
	consumer: 'FILE'
	// paramters: undefined
	fileName: string
	separateKey?: boolean
}

function isAddFileOptions(x: AddOptions): x is AddFileOptions {
	return x.consumer === 'FILE'
}

export interface AddStreamOptions extends AddOptions {
	consumer: 'STREAM'
	uri: string
}

function isAddStreamOptions(x: AddOptions): x is AddStreamOptions {
	return x.consumer === 'STREAM'
}

export interface AddSyncToOptions extends AddOptions {
	consumer: 'SYNCTO'
	syncWith: number
}

function isAddSyncToOptions(x: AddOptions): x is AddSyncToOptions {
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

function isRemoveByIDOptions(x: RemoveOptions): x is RemoveByIDOptions {
	return x.consumer === undefined && typeof x.consumerIndex === 'number'
}

export interface RemoveDecklinkOptions extends RemoveOptions {
	consumer: 'DECKLINK'
	device: number
}

function isRemoveDecklinkOptions(x: RemoveOptions): x is RemoveDecklinkOptions {
	return x.consumer === 'DECKLINK'
}

export interface RemoveImageOptions extends RemoveOptions {
	consumer: 'IMAGE'
	fileName: string
}

function isRemoveImageOptions(x: RemoveOptions): x is RemoveImageOptions {
	return x.consumer === 'IMAGE'
}

export interface RemoveFileOptions extends RemoveOptions {
	consumer: 'FILE'
	fileName: string
}

function isRemoveFileOptions(x: RemoveOptions): x is RemoveFileOptions {
	return x.consumer === 'FILE'
}

export interface RemoveStreamOptions extends RemoveOptions {
	consumer: 'STREAM'
	uri: string
}

function isRemoveStreamOptions(x: RemoveOptions): x is RemoveStreamOptions {
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
	version: string // TODO should this og
}

export interface InfoOptions extends CommandOptions {
	// command: Command.INFO
	channel?: number
	layer?: number
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
}

export interface IOperation {
	bye(options?: ByeOptions): Promise<IAMCPCommand<Command.BYE, ByeOptions, ByeOptions>>
	kill(options?: KillOptions): Promise<IAMCPCommand<Command.KILL, KillOptions, KillOptions>>
	restart(options?: RestartOptions): Promise<IAMCPCommand<Command.RESTART, RestartOptions, RestartOptions>>
	ping(options?: PingOptions): Promise<IAMCPCommand<Command.PING, PingOptions, PingOptions>>
}

export interface TimeOptions extends ChannelOptLayer {
	// command: Command.TIME
	layer: undefined
	timecode?: string
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

interface TimecodeSourceOptions extends CommandOptions {
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

export interface TimecodeSourceClearOptios extends TimecodeSourceOptions {
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

/**
 * The main object and entrypoint for all interactions. `CasparCG` allows for flexible configuration, re-configuration and events/callbacks.
 * It implements all [[AMCP]] commands as high-level methods with convenient interfaces.
 *
 * There is a single [[CasparCGSocket]] pr. `CasparCG` object.
 * `CasparCG` should be the only public interface to interact directly with.
 */
export class CasparCG extends EventEmitter implements ICasparCGConnection, ConnectionOptions, AMCP {
	/**
	 * Try to connect upon creation.
	 */
	public autoConnect: boolean | undefined = undefined

	/**
	 * Setting this to true will investigate all connections to assess if the server is freshly booted, or have been used before the connection
	 */
	public virginServerCheck: boolean | undefined = undefined

	/**
	 * Setting this to true will print out logging to the `Console`, in addition to the optinal [[onLog]] and [[LogEvent.LOG]]
	 */
	public debug: boolean | undefined = undefined

	/**
	 * Callback for all logging.
	 */
	public onLog: IStringCallback | undefined = undefined

	/**
	 * Callback for all status updates from the `CasparCGSocket`.
	 */
	public onConnectionStatus: ISocketStatusCallback | undefined = undefined

	/**
	 * Callback for status updates from the `CasparCGSocket` if the `connected` property changes value.
	 */
	public onConnectionChanged: IBooleanCallback | undefined = undefined

	/**
	 * Callback for status updates from the `CasparCGSocket` if the `connected` property is set to `true`.
	 */
	public onConnected: IBooleanCallback | undefined = undefined

	/**
	 * Callback for status updates from the `CasparCGSocket` if the `connected` property is set to `false`.
	 */
	public onDisconnected: IBooleanCallback | undefined = undefined

	/**
	 * Callback for general errors
	 */
	public onError: IErrorCallback | undefined = undefined

	/**
	 * @todo: document
	 */
	private _queueMode: QueueMode

	private _connected: boolean = false
	private _host: string
	private _port: number
	private _autoReconnect: boolean
	private _autoReconnectInterval: number
	private _autoReconnectAttempts: number
	private _socket: CasparCGSocket
	private _queuedCommands: Array<IAMCPCommand<Command, CommandOptions, any>> = []
	private _queuedCommandsLowPriority: Array<IAMCPCommand<Command, CommandOptions, any>> = []
	private _queuedCommandsHighPriority: Array<IAMCPCommand<Command, CommandOptions, any>> = []
	private _sentCommands: { [token: string]: IAMCPCommand<Command, CommandOptions, any>} = {}
	private _configPromise: Promise<CasparCGConfig>
	private _pathsPromise: Promise<CasparCGPaths>
	private _versionPromise: Promise<CasparCGVersion>
	private _userConfigServerVersion: CasparCGVersion

	/**
	 * If the constructor gets called with no parameters, all properties of the CasparCG object will match all default properties defined by [[IConnectionOptions]].
	 *
	 * ```
	 * var con = new CasparCG();
	 * // host = 127.0.0.1, port = 5250, autoConnect = true ...
  *
	 *  con.play(1, 1, "amb");
	 *  // you can interact with the server, but you have no knowledge of the conenction status until the onConnect event- or callback gets invoked
	 * // the `PlayCommand` will however be queued and fired when the connection gets established
	 * con.close();
	 * ```
	 *
	 * @param host		Defaults to `IConnectionOptions.host`
	 * @param port		Defaults to `IConnectionOptions.host`
	 * @param options	An object with combination of properties defined by `IConnectionOptions`. All properties not explicitly set will fall back to the defaults defined by `IConnectionOptions`.
	 *
	 * All callbacks including [[onConnected]] will be set prior trying to establish connection, so the `CasparCG` object will give back all events even if [[CasparCG.autoConnect]] is `true`.
	 *
	 * You can optionally set the host and port directly in the constructor:
	 *
	 * ```
	 * var con = new CasparCG("192.168.0.1", 5251);
	 * // host = 192.168.0.1, port = 5251, autoConnect = true ...
  *
	 * // change properties after the constructor
	 * con.debug = true;
  *
	 * con.play(1, 1, "amb");
	 * con.close();
	 * ```
	 *
	 */
	public constructor(host?: string, port?: number);
	/**
	 * Callbacks and events after constructor:
	 *
	 * ```
	 * var con = new CasparCG({host: "192.168.0.1", autoConnect: false});
	 * // host = 192.168.0.1, port = 5250, autoConnect = false ...
  *
	 * // add onLog callback after constructor
	 * con.onLog = function(logMessage){ console.log(logMessage); };
  *
	 * // add eventlistener to the conenction event before connecting
	 * con.on(CasparCGSocketStatusEvent.CONNECTED, onConnection(event));
  *
  * con.connect();
	 * ```
	 * Callback in constructor:
	 *
	 * ```
	 * var con = new CasparCG({host: "192.168.0.1", onConnect: onConnectedCallback});
	 * // Connection callbacks can be set in the constructor and will be registered before autoConnect invokes.
	 * // This ensures that you recieve all callbacks
	 * ```
	 * Inline function syntax:
	 *
	 * ```
	 * var con = new CasparCG({host: "192.168.0.1", onConnect: function(connected) {
	 * // do something once we get connected
	 * console.log("Are we conencted?", connected)
	 * 	}
	 * });
	 * ```
	 * Inline fat arrow syntax:
	 *
	 * ```
	 * var con = new CasparCG({host: "192.168.0.1", onConnect: (connected) => {
	 * // do something once we get connected
	 * ("Are we conencted?", connected)
	 * 	}
	 * });
	 * ```
	 *
	 */
	public constructor(options: IConnectionOptions);
	public constructor(hostOrOptions?: Object | string, port?: number) {
		super()
		let options: ConnectionOptions
		if (typeof hostOrOptions === 'object') {
			options = new ConnectionOptions(hostOrOptions)
		} else {
			options = new ConnectionOptions(hostOrOptions, port)
		}

		// if both options and port specified, port overrides options
		if (port && (port !== options.port)) {
			options.port = port
		}

		this._createNewSocket(options)
		if (this.autoConnect) {
			this.connect()
		}
	}

	/**
	 * Creates a new [[CasparCGSocket]] and connects.
	 *
	 * @param options	Setting new [[ICasparCGConnection]] properties will override each individual property allready defined on the `CasparCG` object. Existing properties not overwritten by this `options` object will remain.
	 */
	public connect(options?: IConnectionOptions): void {
		// recreate socket if new options
		if (options) {
			this._createNewSocket(options)
		}
		if (this._socket) {
			this._socket.connect()
		}
	}

	/**
	 * Disconnects and disposes the [[CasparCGSocket]] connection.
	 */
	public disconnect(): void {
		if (this._socket) {
			this._socket.disconnect()
		}
	}

	/**
	 *
	 */
	public reconnect(): void {
		this._createNewSocket(undefined, true)
		this.connect()
	}

	/**
	 *
	 */
	public get host(): string {
		return this._host
	}

	/**
	 * Setting the `host` will create a new [[CasparCGSocket]] connection.
	 *
	 * The new `CasparCGSocket` will `autoConnect` if the old socket was either successfully connected, or currently reconnecting. Changing the host resets the number of [[CasparCG.autoReconnectAttempts]].
	 */
	public set host(host: string) {
		if (this._host !== host) {
			this._host = host
			let shouldReconnect = this.connected
			this._createNewSocket()
			if (shouldReconnect) {
				this.connect()
			}
		}
	}

	/**
	 *
	 */
	public get port(): number {
		return this._port
	}

	/**
	 * Setting the `port` will create a new [[CasparCGSocket]] connection.
	 *
	 * The new `CasparCGSocket` will `autoConnect` if the old socket was either successfully connected, or currently reconnecting. Changing the host resets the number of [[CasparCG.autoReconnectAttempts]].
	 */
	public set port(port: number) {
		if (this._port !== port) {
			this._port = port
			let shouldReconnect = this.connected
			this._createNewSocket()
			if (shouldReconnect) {
				this.connect()
			}
		}
	}

	/**
	 * Try to reconnect in case of unintentionally loss of connection, or in case of failed connection in the first place.
	 */
	public get autoReconnect(): boolean {
		return this._autoReconnect
	}

	/**
	 *
	 */
	public set autoReconnect(autoReconnect: boolean) {
		this._autoReconnect = autoReconnect
		if (this._socket) {
			this._socket.autoReconnect = this._autoReconnect
		}
	}

	/**
	 * Timeout in milliseconds between each connection attempt during reconnection.
	 */
	public get autoReconnectInterval(): number {
		return this._autoReconnectInterval
	}

	/**
	 *
	 */
	public set autoReconnectInterval(autoReconnectInterval: number) {
		this._autoReconnectInterval = autoReconnectInterval
		if (this._socket) {
			this._socket.autoReconnectInterval = this._autoReconnectInterval
		}
	}
	/**
	 * Max number of attempts of connection during reconnection. This value resets once the reconnection is over (either in case of successfully reconnecting, changed connection properties such as `host` or `port` or by being manually cancelled).
	 */
	public get autoReconnectAttempts(): number {
		return this._autoReconnectAttempts
	}

	/**
	 *
	 */
	public set autoReconnectAttempts(autoReconnectAttempts: number) {
		this._autoReconnectAttempts = autoReconnectAttempts
		if (this._socket) {
			this._socket.autoReconnectAttempts = this._autoReconnectAttempts
		}
	}

	/**
	 *
	 */
	public get connectionOptions(): ConnectionOptions {
		let options: ConnectionOptions = new ConnectionOptions({})

		for (let key in options) {
			if (this.hasOwnProperty(key) || CasparCG.hasOwnProperty(key)) {
				(options as any)[key] = (this as any)[key]
			}
		}

		return options
	}

	/**
	 *
	 */
	public get connected(): boolean {
		return this._connected || false
	}

	/**
	 *
	 */
	public get connectionStatus(): SocketStatusOptions {
		return this._socket.socketStatus
	}

	/**
	 *
	 */
	public set serverVersion(version: CasparCGVersion | undefined) {
		if (version) {
			this._userConfigServerVersion = version
		}
	}

	/**
	 *
	 */
	public get serverVersion(): CasparCGVersion | undefined {
		if (this._userConfigServerVersion) {
			return this._userConfigServerVersion
		}

		return undefined
	}

	public get queueMode(): QueueMode {
		return this._queueMode
	}

	public set queueMode (mode: QueueMode) {
		if (this._queueMode === QueueMode.SEQUENTIAL && mode === QueueMode.SALVO && Object.keys(this._sentCommands).length) {
			this._log('Warning: setting queuemode to SALVO while there is a sequential command being sent will return undocumente behaviour!')
			// @todo: await for current command to return, and then set queue mode.
		}
		this._queueMode = mode
		if (this._socket) {
			this._socket.queueMode = mode
		}
	}

	/**
	 *
	 */
	public get commandQueueLength(): number {
		return this._queuedCommands.length + this._queuedCommandsLowPriority.length + this._queuedCommandsHighPriority.length
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
 	public do<C extends Command, REQ extends CommandOptions, RES extends REQ>(command: C, options: REQ): Promise<IAMCPCommand<C, REQ, RES>> {
		let fullCommand: IAMCPCommand<C, REQ, RES> | undefined = this.createCommand(command, options)
		if (fullCommand) {
			return this.queueCommand(fullCommand)
		}
		return Promise.reject('Could not create command instance')
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
 	public doNow<C extends Command, REQ extends CommandOptions, RES extends REQ>(command: C, options: REQ): Promise<IAMCPCommand<C, REQ, RES>> {
		let fullCommand: IAMCPCommand<C, REQ, RES> | undefined = this.createCommand(command, options)
		if (fullCommand) {
			return this.queueCommand(fullCommand, Priority.HIGH)
		}
		return Promise.reject('Could not create command instance')
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public doLater<C extends Command, REQ extends CommandOptions, RES extends REQ>(command: C, options: REQ): Promise<IAMCPCommand<C, REQ, RES>> {
		let fullCommand: IAMCPCommand<C, REQ, RES> | undefined = this.createCommand(command, options)
		if (fullCommand) {
			return this.queueCommand(fullCommand, Priority.LOW)
		}
		return Promise.reject('Could not create command instance')
	}

	/**
	 *
	 */
	public createCommand<C extends Command, REQ extends CommandOptions, RES extends REQ>(command: C, options: REQ): IAMCPCommand<C, REQ, RES> | undefined {
		let fullCommand: IAMCPCommand<C, REQ, RES> | undefined
		options.command = command
		try {
			fullCommand = createAMCPCommand(command, options)
			// validate command and params
			if (!fullCommand || !fullCommand.validateParams()) {
				// @todo: Handle, return?
				throw new Error('Invalid command parameters')
			}

			return fullCommand
		} catch (error) {
			this._log(error)
		}
		return undefined
	}

	/**
	 *
	 */
	public queueCommand<C extends Command, REQ extends CommandOptions, RES extends REQ>(command: IAMCPCommand<C, REQ, RES>, priority: Priority = Priority.NORMAL): Promise<IAMCPCommand<C, REQ, RES>> {
		let commandPromise: Promise<IAMCPCommand<C, REQ, RES>[]>
		let commandPromiseArray: Array<Promise<IAMCPCommand<C, REQ, RES>>> = [new Promise<IAMCPCommand<C, REQ, RES>>((resolve, reject) => {
			command.resolve = resolve
			command.reject = reject
		})]

		if (command.name === 'ScheduleSetCommand') {
			let subCommand = command.getParam('command') as IAMCPCommand<C, REQ, RES>
			commandPromiseArray.push(new Promise<IAMCPCommand<C, REQ, RES>>((resolve, reject) => {
				subCommand.resolve = resolve
				subCommand.reject = reject
			}))
		}

		commandPromise = Promise.all(commandPromiseArray)
		commandPromise.catch((error: any) => {
			// @todo: global command error handler here
			this._log(new Error('Command error: ' + error.toString()))
		})

		switch (priority) {
			case Priority.NORMAL:
				this._queuedCommands.push(command)
				break
			case Priority.HIGH:
				this._queuedCommandsHighPriority.push(command)
				break
			case Priority.LOW:
				this._queuedCommandsLowPriority.push(command)
				break
		}

		this._log(`New command added, "${command.name}". ${this.commandQueueLength} command(s) in command queues.`)
		command.status = IAMCPStatus.Queued

		this._executeNextCommand()
		return new Promise((outerResolve, outerReject) => {
			commandPromise.then((cmds) => [
				outerResolve(cmds[cmds.length - 1]) // resolve with last executed command
			]).catch((err) => {
				outerReject(err)
			})
		})
	}

	/**
	 * @todo: document
	 */
	public removeQueuedCommand<C extends Command, REQ extends CommandOptions, RES extends REQ>(id: string): boolean {
		let removed: Array<IAMCPCommand<C, REQ, RES>> | undefined
		// normal priority
		for (let i: number = 0; i < this._queuedCommands.length; i++) {
			let o: IAMCPCommand<C, REQ, RES> = this._queuedCommands[i]
			if (o.id === id) {
				removed = this._queuedCommands.splice(i, 1)
				this._log(`Command removed, "${removed[0].name}". ${this.commandQueueLength} command(s) left in command queues.`)
				break
			}
		}
		// high priority
		if (!removed) {
			for (let i: number = 0; i < this._queuedCommandsHighPriority.length; i++) {
				let o: IAMCPCommand<C, REQ, RES> = this._queuedCommandsHighPriority[i]
				if (o.id === id) {
					removed = this._queuedCommandsHighPriority.splice(i, 1)
					this._log(`Command removed, "${removed[0].name}". ${this.commandQueueLength} command(s) left in command queues.`)
					break
				}
			}
		}
		// low priority
		if (!removed) {
			for (let i: number = 0; i < this._queuedCommandsLowPriority.length; i++) {
				let o: IAMCPCommand<C, REQ, RES> = this._queuedCommandsLowPriority[i]
				if (o.id === id) {
					removed = this._queuedCommandsLowPriority.splice(i, 1)
					this._log(`Command removed, "${removed[0].name}". ${this.commandQueueLength} command(s) left in command queues.`)
					break
				}
			}
		}
		return Array.isArray(removed) && removed.length > 0
	}

	/***/
	public getCasparCGConfig(refresh: boolean = false): Promise<CasparCGConfig> {
		if (!this._configPromise || refresh) {
			this._configPromise = new Promise<CasparCGConfig>((resolve, reject) => {
				this.infoConfig().then((response) => {
					resolve(response.response.data as CasparCGConfig)
				}).catch(reject)
			})
		}
		return this._configPromise
	}

	/***/
	public getCasparCGPaths(refresh: boolean = false): Promise<CasparCGPaths> {
		if (!this._pathsPromise || refresh) {
			this._pathsPromise = new Promise<CasparCGPaths>((resolve, reject) => {
				this.infoPaths().then((response) => {
					resolve(response.response.data as CasparCGPaths)
				}).catch(reject)
			})
		}
		return this._pathsPromise
	}

	/***/
	public getCasparCGVersion(refresh: boolean = false): Promise<CasparCGVersion> {
		if (!this._versionPromise || refresh) {
			// use configed version
			if (this._userConfigServerVersion) {
				this._versionPromise = new Promise<CasparCGVersion>((resolve) => resolve(this._userConfigServerVersion))
				// generate version
			} else {
				this._versionPromise = new Promise<CasparCGVersion>((resolve, reject) => {
					this.doNow(new AMCPCommand({ command: Command.VERSION, component: Version.SERVER } as VersionOptions)).then((response) => {
						let versionString: string = response.response.data.toString().slice(0, 5)
						let version: CasparCGVersion = CasparCGVersion.V2xx
						switch (versionString) {
							case '2.0.7':
								version = CasparCGVersion.V207
								break
							case '2.1.0':
								version = CasparCGVersion.V210
								break
						}

						resolve(version)
					}).catch(reject)
				})
			}
		}
		return this._versionPromise
	}

	/// *********************////
	/// ***		API		****////
	/// *********************///

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#LOADBG>
	 */
	public loadbg(options: LoadBGOptions): Promise<IAMCPCommand<Command.LOADBG, LoadBGOptions, LoadBGOptions>> {
		return this.do(Command.LOADBG, options)
	}

	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#LOADBG>
	//  */
	// public loadbgAuto(channel: number, layer: number = NaN, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: Enum.Ease | string | number, transitionDirectionOrOverlay?: Enum.Direction | string, seek?: number, length?: number, filter?: string, channelLayout?: Enum.ChannelLayout | string): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.LoadbgCommand({ channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, ...this._createTransitionOptionsObject(transition, transitionDurationOrMaskFile, transitionEasingOrStingDuration, transitionDirectionOrOverlay), seek: seek, length: length, filter: filter, auto: true, channelLayout }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#LOAD>
	 */
	public load(options: LoadOptions): Promise<IAMCPCommand<Command.LOAD, LoadOptions, LoadOptions>> {
		return this.do(Command.LOAD, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#PLAY>
	 */
	public play(options: PlayOptions): Promise<IAMCPCommand<Command.PLAY, PlayOptions, PlayOptions>> {
		return this.do(Command.PLAY, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#PAUSE>
	 */
	public pause(options: PauseOptions): Promise<IAMCPCommand<Command.PAUSE, PauseOptions, PauseOptions>> {
		return this.do(Command.PAUSE, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#RESUME>
	 */
	public resume(options: ResumeOptions): Promise<IAMCPCommand<Command.RESUME, ResumeOptions, ResumeOptions>> {
		return this.do(Command.RESUME, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#STOP>
	 */
	public stop(options: StopOptions): Promise<IAMCPCommand<Command.STOP, StopOptions, StopOptions>> {
		return this.do(Command.STOP, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CG-ADD>
	 */
	public cgAdd(options: CGAddOptions): Promise<IAMCPCommand<Command.CG_ADD, CGAddOptions, CGAddOptions>> {
		return this.do(Command.CG_ADD, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CG-PLAY>
	 */
	public cgPlay(options: CGPlayOptions): Promise<IAMCPCommand<Command.CG_PLAY, CGPlayOptions, CGPlayOptions>> {
		return this.do(Command.CG_PLAY, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CG-STOP>
	 */
	public cgStop(options: CGStopOptions): Promise<IAMCPCommand<Command.CG_STOP, CGStopOptions, CGStopOptions>> {
		return this.do(Command.CG_STOP, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CG-NEXT>
	 */
	public cgNext(options: CGNextOptions): Promise<IAMCPCommand<Command.CG_NEXT, CGNextOptions, CGNextOptions>> {
		return this.do(Command.CG_NEXT, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CG-REMOVE>
	 */
	public cgRemove(options: CGRemoveOptions): Promise<IAMCPCommand<Command.CG_REMOVE, CGRemoveOptions, CGRemoveOptions>> {
		return this.do(Command.CG_REMOVE, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CG-CLEAR>
	 */
	public cgClear(options: CGClearOptions): Promise<IAMCPCommand<Command.CG_CLEAR, CGClearOptions, CGClearOptions>> {
		return this.do(Command.CG_CLEAR, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CG-UPDATE>
	 */
	public cgUpdate(options: CGUpdateOptions): Promise<IAMCPCommand<Command.CG_UPDATE, CGUpdateOptions, CGUpdateOptions>> {
		return this.do(Command.CG_UPDATE, options)
	}

	/*
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CG-INVOKE
	 */
	public cgInvoke(options: CGInvokeOptions): Promise<IAMCPCommand<Command.CG_INVOKE, CGInvokeOptions, CGInvokeOptions>> {
		return this.do(Command.CG_INVOKE, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-KEYER>
	 */
	public mixerKeyer(options: MixerKeyerOptions): Promise<IAMCPCommand<Command.MIXER_KEYER, MixerKeyerOptions, MixerKeyerOptions>> {
		return this.do(Command.MIXER_KEYER, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-KEYER>
	 */
	// public mixerKeyerDeferred(channel: number, layer: number, state?: number | boolean): Promise<IAMCPCommand> {
	// 	return this.mixerKeyer(channel, layer, state, true)
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-KEYER>
	 */
	// public getMixerStatusKeyer(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusKeyerCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-CHROMA>
	 */
	public mixerChroma(options: MixerChromaOptions): Promise<IAMCPCommand<Command.MIXER_CHROMA, MixerChromaOptions, MixerChromaOptions>> {
		return this.do(Command.MIXER_CHROMA, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-CHROMA>
	 */
	// public mixerChromaDeferred(channel: number, layer: number, keyer: Enum.Chroma, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
	// public mixerChromaDeferred(channel: number, layer: number = 0, keyer: string | Enum.Chroma | string, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerChroma(channel, layer, keyer, threshold, softness, spill, transitionDuration, transitionEasing, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-CHROMA>
	//  */
	// public getMixerStatusChroma(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusChromaCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-BLEND>
	 */
	public mixerBlend(options: MixerBlendOptions): Promise<IAMCPCommand<Command.MIXER_BLEND, MixerBlendOptions, MixerBlendOptions>> {
		return this.do(Command.MIXER_BLEND, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-BLEND>
	 */
	// public mixerBlendDeferred(channel: number, layer: number, blendmode: string | Enum.BlendMode): Promise<IAMCPCommand>
	// public mixerBlendDeferred(channel: number, layer: number = NaN, blendmode: Enum.BlendMode | string): Promise<IAMCPCommand> {
	// 	return this.mixerBlend(channel, layer, blendmode, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-BLEND>
	//  */
	// public getMixerStatusBlend(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusBlendCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-INVERT
	 */
	public mixerInvert(options: MixerInvertOptions): Promise<IAMCPCommand<Command.MIXER_INVERT, MixerInvertOptions, MixerInvertOptions>> {
		return this.do(Command.MIXER_INVERT, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-OPACITY>
	 */
	public mixerOpacity(options: MixerOpacityOptions): Promise<IAMCPCommand<Command.MIXER_OPACITY, MixerOpacityOptions, MixerOpacityOptions>> {
		return this.do(Command.MIXER_OPACITY, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-OPACITY>
	 */
	// public mixerOpacityDeferred(channel: number, layer: number = NaN, opacity: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerOpacity(channel, layer, opacity, transitionDuration, transitionEasing, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-OPACITY>
	//  */
	// public getMixerStatusOpacity(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusOpacityCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-BRIGHTNESS>
	 */
	public mixerBrightness(options: MixerBrightnessOptions): Promise<IAMCPCommand<Command.MIXER_BRIGHTNESS, MixerBrightnessOptions, MixerBrightnessOptions>> {
		return this.do(Command.MIXER_BRIGHTNESS, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-BRIGHTNESS>
	 */
	// public mixerBrightnessDeferred(channel: number, layer: number = NaN, brightness: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerBrightness(channel, layer, brightness, transitionDuration, transitionEasing, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-BRIGHTNESS>
	//  */
	// public getMixerStatusBrightness(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusBrightnessCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-SATURATION>
	 */
	public mixerSaturation(options: MixerSaturationOptions): Promise<IAMCPCommand<Command.MIXER_SATURATION, MixerSaturationOptions, MixerSaturationOptions>> {
		return this.do(Command.MIXER_SATURATION, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-SATURATION>
	 */
	// public mixerSaturationDeferred(channel: number, layer: number = NaN, saturation: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerSaturation(channel, layer, saturation, transitionDuration, transitionEasing, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-SATURATION>
	//  */
	// public getMixerStatusSaturation(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusSaturationCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-CONTRAST>
	 */
	public mixerContrast(options: MixerContrastOptions): Promise<IAMCPCommand<Command.MIXER_CONTRAST, MixerContrastOptions, MixerContrastOptions>> {
		return this.do(Command.MIXER_CONTRAST, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-CONTRAST>
	 */
	// public mixerContrastDeferred(channel: number, layer: number = NaN, contrast: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerContrast(channel, layer, contrast, transitionDuration, transitionEasing, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-CONTRAST>
	//  */
	// public getMixerStatusContrast(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusContrastCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-LEVELS>
	 */
	public mixerLevels(options: MixerLevelsOptions): Promise<IAMCPCommand<Command.MIXER_LEVELS, MixerLevelsOptions, MixerLevelsOptions>> {
		return this.do(Command.MIXER_LEVELS, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-LEVELS>
	 */
	// public mixerLevelsDeferred(channel: number, layer: number = NaN, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerLevels(channel, layer, minInput, maxInput, gamma, minOutput, maxOutput, transitionDuration, transitionEasing, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-LEVELS>
	//  */
	// public getMixerStatusLevels(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusLevelsCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-FILL>
	 */
	public mixerFill(options: MixerFillOptions): Promise<IAMCPCommand<Command.MIXER_FILL, MixerFillOptions, MixerFillOptions>> {
		return this.do(Command.MIXER_FILL, options)
	}

	/*
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-FILL>
	 */
	// public mixerFillDeferred(channel: number, layer: number = NaN, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerFill(channel, layer, x, y, xScale, yScale, transitionDuration, transitionEasing, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-FILL>
	//  */
	// public getMixerStatusFill(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusFillCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-CLIP>
	 */
	public mixerClip(options: MixerClipOptions): Promise<IAMCPCommand<Command.MIXER_CLIP, MixerClipOptions, MixerClipOptions>> {
		return this.do(Command.MIXER_CLIP, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-CLIP>
	 */
	// public mixerClipDeferred(channel: number, layer: number = NaN, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerClip(channel, layer, x, y, width, height, transitionDuration, transitionEasing, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-CLIP>
	//  */
	// public getMixerStatusClip(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusClipCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-ANCHOR>
	 */
	public mixerAnchor(options: MixerAnchorOptions): Promise<IAMCPCommand<Command.MIXER_ANCHOR, MixerAnchorOptions, MixerAnchorOptions>> {
		return this.do(Command.MIXER_ANCHOR, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-ANCHOR>
	 */
	// public mixerAnchorDeferred(channel: number, layer: number = NaN, x: number, y: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerAnchor(channel, layer, x, y, transitionDuration, transitionEasing, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-ANCHOR>
	//  */
	// public getMixerStatusAnchor(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusAnchorCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-CROP>
	 */
	public mixerCrop(options: MixerCropOptions): Promise<IAMCPCommand<Command.MIXER_CROP, MixerCropOptions, MixerCropOptions>> {
		return this.do(Command.MIXER_CROP, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-CROP>
	 */
	// public mixerCropDeferred(channel: number, layer: number = NaN, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerCrop(channel, layer, left, top, right, bottom, transitionDuration, transitionEasing, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-CROP>
	//  */
	// public getMixerStatusCrop(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusCropCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-ROTATION>
	 */
	public mixerRotation(options: MixerRotationOptions): Promise<IAMCPCommand<Command.MIXER_ROTATION, MixerRotationOptions, MixerRotationOptions>> {
		return this.do(Command.MIXER_ROTATION, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-ROTATION>
	 */
	// public mixerRotationDeferred(channel: number, layer: number = NaN, rotation: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerRotation(channel, layer, rotation, transitionDuration, transitionEasing, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-ROTATION>
	//  */
	// public getMixerStatusRotation(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusRotationCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-PERSPECTIVE>
	 */
	public mixerPerspective(options: MixerPerspectiveOptions): Promise<IAMCPCommand<Command.MIXER_PERSPECTIVE, MixerPerspectiveOptions, MixerPerspectiveOptions>> {
		return this.do(Command.MIXER_PERSPECTIVE, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-PERSPECTIVE>
	 */
	// public mixerPerspectiveDeferred(channel: number, layer: number = NaN, topLeftX: number, topLeftY: number, topRightX: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottomLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerPerspective(channel, layer, topLeftX, topLeftY, topRightX, topRightY, bottomRightX, bottomRightY, bottomLeftX, bottomLeftY, transitionDuration, transitionEasing, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-PERSPECTIVE>
	//  */
	// public getMixerStatusPerspective(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusPerspectiveCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-MIPMAP>
	 */
	public mixerMipmap(options: MixerMipmapOptions): Promise<IAMCPCommand<Command.MIXER_MIPMAP, MixerMipmapOptions, MixerMipmapOptions>> {
		return this.do(Command.MIXER_MIPMAP, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-MIPMAP>
	 */
	// public mixerMipmapDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand> {
	// 	return this.mixerMipmap(channel, layer, state, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-MIPMAP>
	//  */
	// public getMixerStatusMipmap(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusMipmapCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-VOLUME>
	 */
	public mixerVolume(options: MixerVolumeOptions): Promise<IAMCPCommand<Command.MIXER_VOLUME, MixerVolumeOptions, MixerVolumeOptions>> {
		options.command = Command.MIXER_VOLUME
		return this.do(Command.MIXER_VOLUME, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-VOLUME>
	 */
	// public mixerVolumeDeferred(channel: number, layer: number = NaN, volume: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerVolume(channel, layer, volume, transitionDuration, transitionEasing, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-VOLUME>
	//  */
	// public getMixerStatusVolume(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusVolumeCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-MASTERVOLUME>
	 */
	public mixerMastervolume(options: MixerMastervolumeOptions): Promise<IAMCPCommand<Command.MIXER_MASTERVOLUME, MixerMastervolumeOptions, MixerMastervolumeOptions>> {
		return this.do(Command.MIXER_MASTERVOLUME, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-MASTERVOLUME>
	 */
	// public mixerMastervolumeDeferred(channel: number, mastervolume?: number): Promise<IAMCPCommand> {
	// 	return this.mixerMastervolume(channel, mastervolume, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-MASTERVOLUME>
	//  */
	// public getMixerStatusMastervolume(channel: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusMastervolumeCommand({ channel: channel }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-STRAIGHT_ALPHA_OUTPUT>
	 */
	public mixerStraightAlphaOutput(options: MixerStraightAlphaOutputOptions): Promise<IAMCPCommand<Command.MIXER_STRAIGHT_ALPHA_OUTPUT, MixerStraightAlphaOutputOptions, MixerStraightAlphaOutputOptions>> {
		return this.do(Command.MIXER_STRAIGHT_ALPHA_OUTPUT, options)
	}

	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-STRAIGHT_ALPHA_OUTPUT>
	//  */
	// public mixerStraightAlphaOutputDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand> {
	// 	return this.mixerStraightAlphaOutput(channel, layer, state, true)
	// }
	//
	// /**
	//  * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-STRAIGHT_ALPHA_OUTPUT>
	//  */
	// public getMixerStatusStraightAlphaOutput(channel: number, layer?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.MixerStatusStraightAlphaOutputCommand({ channel: channel, layer: layer }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-GRID>
	 */
	public mixerGrid(options: MixerGridOptions): Promise<IAMCPCommand<Command.MIXER_GRID, MixerGridOptions, MixerGridOptions>> {
		return this.do(Command.MIXER_GRID, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-GRID>
	 */
	// public mixerGridDeferred(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
	// 	return this.mixerGrid(channel, resolution, transitionDuration, transitionEasing, true)
	// }
	//
	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-COMMIT>
	 */
	public mixerCommit(options: MixerCommitOptions | number): Promise<IAMCPCommand<Command.MIXER_COMMIT, MixerCommitOptions, MixerCommitOptions>> {
		if (typeof options === 'number') {
			options = {
				channel: options
			} as MixerCommitOptions
		}
		return this.do(Command.MIXER_COMMIT, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#MIXER-CLEAR>
	 */
	public mixerClear(options: MixerClearOptions): Promise<IAMCPCommand<Command.MIXER_CLEAR, MixerClipOptions, MixerClearOptions>> {
		return this.do(Command.MIXER_CLEAR, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CLEAR>
	 */
	public clear(options: ClearOptions): Promise<IAMCPCommand<Command.CLEAR, ClearOptions, ClearOptions>> {
		return this.do(Command.CLEAR, options)
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public call(options: CallOptions): Promise<IAMCPCommand<Command.CALL, CallOptions, CallOptions>> {
		return this.do(Command.CALL, options)
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public swap(options: SwapOptions): Promise<IAMCPCommand<Command.SWAP, SwapOptions, SwapOptions>> {
		return this.do(Command.SWAP, options)
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public add(options: AddOptions): Promise<IAMCPCommand<Command.ADD, AddOptions, AddOptions>> {
		// remember index /layer
		// i suggest duplicating abstractchannelorlayer to avoid problems if the address logic changes for layers and not indicies
		// consumer factoruies parses "consumer"-string parameter
		if (isAddDecklinkOptions(options)) {
			if (!options.parameters) options.parameters = []
			options.parameters.unshift(options.device)
		}
		if (isAddImageOptions(options)) {
			if (!options.parameters) options.parameters = []
			options.parameters.unshift(options.fileName)
		}
		if (isAddFileOptions(options)) {
			if (!options.parameters) options.parameters = []
			options.parameters.unshift(options.fileName)
			if (options.separateKey) options.parameters.push('SEPARATE_KEY')
		}
		if (isAddStreamOptions(options)) {
			if (!options.parameters) options.parameters = []
			options.parameters.unshift(options.uri)
		}
		if (isAddSyncToOptions(options)) {
			if (!options.parameters) options.parameters = []
			options.parameters.unshift(options.syncWith)
		}
		return this.do(Command.ADD, options)
	}

	// /**
	//  *  <https://github.com/CasparCG/help/wiki/AMCP-Protocol#ADD>
	//  */
	// public addDecklink(channel: number, device: number, id?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.AddDecklinkCommand({ channel: channel, layer: id, device: device }))
	// }
	//
	// /**
	//  *  <https://github.com/CasparCG/help/wiki/AMCP-Protocol#ADD>
	//  */
	// public addImage(channel: number, fileName: string, id?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.AddImageCommand({ channel: channel, layer: id, fileName: fileName }))
	// }
	//
	// /**
	//  *  <https://github.com/CasparCG/help/wiki/AMCP-Protocol#ADD>
	//  */
	// public addFile(channel: number, fileName: string, id?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.AddFileCommand({ channel: channel, layer: id, fileName: fileName }))
	// }
	//
	// /**
	//  *  <https://github.com/CasparCG/help/wiki/AMCP-Protocol#ADD>
	//  */
	// public addStream(channel: number, uri: string, params: string, id?: number): Promise<IAMCPCommand> {
	// 	return this.do(new AMCP.AddStreamCommand({ channel: channel, layer: id, uri: uri, params: params }))
	// }

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#REMOVE>
	 */
	public remove(options: RemoveOptions): Promise<IAMCPCommand<Command.REMOVE, RemoveOptions, RemoveOptions>> {
		if (isRemoveByIDOptions(options)) {
			return this.do(Command.REMOVE, options)
		}
		if (isRemoveDecklinkOptions(options)) {
			if (!options.parameters) options.parameters = []
			options.parameters.unshift(options.device)
		}
		if (isRemoveImageOptions(options)) {
			if (!options.parameters) options.parameters = []
			options.parameters.unshift(options.fileName)
		}
		if (isRemoveFileOptions(options)) {
			if (!options.parameters) options.parameters = []
			options.parameters.unshift(options.fileName)
		}
		if (isRemoveStreamOptions(options)) {
			if (!options.parameters) options.parameters = []
			options.parameters.unshift(options.uri)
		}

		return this.do(Command.REMOVE, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#PRINT>
	 */
	public print(options: number | PrintOptions): Promise<IAMCPCommand<Command.PRINT, PrintOptions, PrintOptions>> {
		if (typeof options === 'number') {
			options = {
				channel: options
			} as PrintOptions
		}
		return this.do(Command.PRINT, options)
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public set(options: SetOptions): Promise<IAMCPCommand<Command.SET, SetOptions, SetOptions>> {
		// @todo:  param enum (only MODE and channelLayout for now)
		// @todo: switchable second parameter based on what to set:
		// mode = enum modes.......
		// layer = enum layouts..........
		// Rehaul uses an Enum for variable
		return this.do(Command.SET, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#LOCK>
	 */
	public lock(options: LockOptions): Promise<IAMCPCommand<Command.LOCK, LockOptions, LockOptions>> {
		return this.do(Command.LOCK, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CHANNEL-GRID>
	 */
	public channelGrid(options?: ChannelGridOptions): Promise<IAMCPCommand<Command.CHANNEL_GRID, ChannelGridOptions, ChannelGridOptions>> {
		if (!options) {
			options = {
				command: Command.CHANNEL_GRID
			} as ChannelGridOptions
		}
		return this.do(Command.CHANNEL_GRID, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#GL-GC>
	 */
	public glGC(options?: GLGCOptions): Promise<IAMCPCommand<Command.GL_GC, GLGCOptions, GLGCOptions>> {
		if (!options) {
			options = {
				command: Command.GL_GC
			}
		}
		return this.do(Command.GL_GC,options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#DATA-STORE>
	 */
	public dataStore(options: DataStoreOptions): Promise<IAMCPCommand<Command.DATA_STORE, DataStoreOptions, DataStoreOptions>> {
		return this.do(Command.DATA_STORE, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#DATA-RETRIEVE>
	 */
	public dataRetrieve(options: string | DataRetrieveOptions): Promise<IAMCPCommand<Command.DATA_RETRIEVE, DataRetrieveOptions, DataRetrieveResponse>> {
		if (typeof options === 'string') {
			options = {
				fileName: options
			} as DataRetrieveOptions
		}
		return this.do(Command.DATA_RETRIEVE, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#DATA-LIST>
	 */
	public dataList(options?: DataListOptions): Promise<IAMCPCommand<Command.DATA_LIST, DataListOptions, DataListeResponse>> {
		if (!options) {
			options = {
				command: Command.DATA_LIST
			} as DataListOptions
		}
		return this.do(Command.DATA_LIST, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#DATA-REMOVE>
	 */
	public dataRemove(options: string | DataRemoveOptions): Promise<IAMCPCommand<Command.DATA_REMOVE, DataRemoveOptions, DataRemoveOptions>> {
		if (typeof options === 'string') {
			options = {
				fileName: options
			} as DataRemoveOptions
		}
		return this.do(Command.DATA_REMOVE, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#THUMBNAIL-LIST>
	 */
	public thumbnailList(options?: string | ThumbnailListOptions): Promise<IAMCPCommand<Command.THUMBNAIL_LIST, ThumbnailListOptions, ThumbnailListResponse>> {
		if (!options || typeof options === 'string') {
			options = {
				subFolder: options
			} as ThumbnailListOptions
		}
		return this.do(Command.THUMBNAIL_LIST, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#THUMBNAIL-RETRIEVE>
	 */
	public thumbnailRetrieve(options: string | ThumbnailRetrieveOptions): Promise<IAMCPCommand<Command.THUMBNAIL_RETRIEVE, ThumbnailRetrieveOptions, ThumbnailRetrieveResponse>> {
		if (typeof options === 'string') {
			options = {
				fileName: options
			} as ThumbnailRetrieveOptions
		}
		return this.do(Command.THUMBNAIL_RETRIEVE, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#THUMBNAIL-GENERATE>
	 */
	public thumbnailGenerate(options: string | ThumbnailGenerateOptions): Promise<IAMCPCommand<Command.THUMBNAIL_GENERATE, ThumbnailGenerateOptions, ThumbnailGenerateOptions>> {
		if (typeof options === 'string') {
			options = {
				fileName: options
			} as ThumbnailGenerateOptions
		}
		return this.do(Command.THUMBNAIL_GENERATE, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#THUMBNAIL-GENERATE_ALL>
	 */
	public thumbnailGenerateAll(options?: ThumbnailGenerateAllOptions): Promise<IAMCPCommand<Command.THUMBNAIL_GENERATE_ALL, ThumbnailGenerateAllOptions, ThumbnailGenerateAllOptions>> {
		if (!options) {
			options = {
				command: Command.THUMBNAIL_GENERATE_ALL
			} as ThumbnailGenerateAllOptions
		}
		return this.do(Command.THUMBNAIL_GENERATE_ALL, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CINF>
	 */
	public cinf(options: string | CInfOptions): Promise<IAMCPCommand<Command.CINF, CInfOptions, CInfResponse>> {
		if (typeof options === 'string') {
			options = {
				fileName: options
			} as CInfOptions
		}
		return this.do(Command.CINF, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CLS>
	 */
	public cls(options?: string | CLSOptions): Promise<IAMCPCommand<Command.CLS, CLSOptions, CLSResponse>> {
		if (!options || typeof options === 'string') {
			options = {
				subFolder: options
			} as CLSOptions
		}
		return this.do(Command.CLS, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#FLS>
	 */
	public fls(options?: FLSOptions): Promise<IAMCPCommand<Command.FLS, FLSOptions, FLSResponse>> {
		if (!options) {
			options = {
				command: Command.FLS
			} as FLSOptions
		}
		return this.do(Command.FLS, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#TLS>
	 */
	public tls(options?: string | TLSOptions): Promise<IAMCPCommand<Command.TLS, TLSOptions, TLSReponse>> {
		if (!options || typeof options === 'string') {
			options = {
				subFolder: options
			} as TLSOptions
		}
		return this.do(Command.TLS, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#VERSION>
	 */
	public version(options?: Version | VersionOptions): Promise<IAMCPCommand<Command.VERSION, VersionOptions, VersionResponse>> {
		if (!options || typeof options === 'string') {
			options = {
				component: options
			} as VersionOptions
		}
		return this.do(Command.VERSION, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#INFO>
	 */
	public info(options?: InfoOptions): Promise<IAMCPCommand<Command.INFO, InfoOptions, InfoResponse>> {
		if (!options) {
			options = {
				command: Command.INFO
			} as InfoOptions
		}
		return this.do(Command.INFO, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#INFO-TEMPLATE>
	 */
	public infoTemplate(options: string | InfoTemplateOptions): Promise<IAMCPCommand<Command.INFO_TEMPLATE, InfoTemplateOptions, InfoTemplateResponse>> {
		if (typeof options === 'string') {
			options = {
				templateName: options
			} as InfoTemplateOptions
		}
		return this.do(Command.INFO_TEMPLATE, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#INFO-CONFIG>
	 */
	public infoConfig(options?: InfoConfigOptions): Promise<IAMCPCommand<Command.INFO_CONFIG, InfoConfigOptions, InfoConfigResponse>> {
		if (!options) {
			options = {
				command: Command.INFO
			}
		}
		return this.do(Command.INFO_CONFIG, options, { serverVersion })
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#INFO-PATHS>
	 */
	public infoPaths(options?: InfoPathsOptions): Promise<IAMCPCommand<Command.INFO_PATHS, InfoPathsOptions, InfoPathsResponse>> {
		if (!options) {
			options = {
				command: Command.INFO_PATHS
			} as InfoPathsOptions
		} else {
			options.command = Command.INFO_PATHS
		}
		return this.do(Command.INFO_PATHS, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#INFO-SYSTEM>
	 */
	public infoSystem(options?: InfoSystemOptions): Promise<IAMCPCommand<Command.INFO_SYSTEM, InfoSystemOptions, InfoSystemResponse>> {
		if (!options) {
			options = {
				command: Command.INFO_SYSTEM
			} as InfoSystemOptions
		}
		return this.do(Command.INFO_SYSTEM, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#INFO-SERVER>
	 */
	public infoServer(options?: InfoServerOptions): Promise<IAMCPCommand<Command.INFO_SERVER, InfoServerOptions, InfoServerResponse>> {
		if (!options) {
			options = {
				command: Command.INFO_SERVER
			} as InfoServerOptions
		}
		return this.do(Command.INFO_SERVER, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#INFO-QUEUES>
	 */
	public infoQueues(options?: InfoQueuesOptions): Promise<IAMCPCommand<Command.INFO_QUEUES, InfoQueuesOptions, InfoQueuesResponse>> {
		if (!options) {
			options = {
				command: Command.INFO_QUEUES
			} as InfoQueuesOptions
		}
		return this.do(Command.INFO_QUEUES, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#INFO-THREADS>
	 */
	public infoThreads(options?: InfoThreadsOptions): Promise<IAMCPCommand<Command.INFO_THREADS, InfoThreadsOptions, InfoThreadsResponse>> {
		if (!options) {
			options = {
				command: Command.INFO_THREADS
			} as InfoThreadsOptions
		}
		return this.do(Command.INFO_THREADS, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#INFO-DELAY>
	 */
	public infoDelay(options: InfoDelayOptions): Promise<IAMCPCommand<Command.INFO_DELAY, InfoDelayOptions, InfoDelayResponse>> {
		return this.do(Command.INFO_DELAY, options)
	}

	/**
	 * Retrieves information about a running template or the templatehost.
	 *
	 * Calling `infoDelay` without `flashLayer` parameter is the same as calling the convenience method [[templateHostInfo]].
	 *
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CG-INFO>
	 *
	 * @param flashLayer	If not specified, information about the `TemplateHost` will be returned.
	 */
	public cgInfo(options?: CGInfoOptions): Promise<IAMCPCommand<Command.CG_INFO, CGInfoOptions, CGInfoResponse>> {
		if (!options) {
			options = {
				command: Command.CG_INFO
			} as CGInfoOptions
		}
		return this.do(Command.CG_INFO, options)
	}

	/**
	 * Convenience method for calling [[cgInfo]] to return information about `TemplateHost` for a given layer.
	 *
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#CG-INFO>
	 */
	public templateHostInfo(options?: TemplateHostInfoOptions): Promise<IAMCPCommand<Command.CG_INFO, TemplateHostInfoOptions, TemplateHostInfoResponse>> {
		if (!options) {
			options = {
				command: Command.CG_INFO
			} as CGInfoOptions
		}
		return this.do(Command.CG_INFO, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#GL-INFO>
	 */
	public glInfo(options?: GLInfoOptions): Promise<IAMCPCommand<Command.GL_INFO, GLInfoOptions, GLInfoResponse>> {
		if (!options) {
			options = { command: Command.GL_INFO } as GLInfoOptions
		}
		return this.do(Command.GL_INFO, options)
	}

	/**
	 * Sets the server's [[LogLevel]].
	 *
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#LOG-LEVEL>
	 */
	public logLevel(options: LogLevelOptions | LogLevel | string): Promise<IAMCPCommand<Command.LOG_LEVEL, LogLevelOptions, LogLevelOptions>> {
		if (typeof options === 'object') {
			options.command = Command.LOG_LEVEL
		} else {
			options = {
				command: Command.LOG_LEVEL,
				level: options
			} as LogLevelOptions
		}
		return this.do(Command.LOG_LEVEL, options)
	}

	/**
	 * Enabling or disabling logging for a given [[LogCategory]].
	 *
	 * Convenience methods [[logCalltrace]] and [[logCommunication]] are available.
	 *
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#LOG_CATEGORY>
	 */
	public logCategory(options: LogCategoryOptions): Promise<IAMCPCommand<Command.LOG_CATEGORY, LogCategoryOptions, LogCategoryOptions>> {
		return this.do(Command.LOG_CATEGORY, options)
	}

	/**
	 * Convenience method for enabling or disabling logging for [[LogCategory.CALLTRACE]] through calling [[logCategory]].
	 */
	public logCalltrace(enabled: boolean): Promise<IAMCPCommand<Command.LOG_CATEGORY, LogCategoryOptions, LogCategoryOptions>> {
		let options: LogCategoryOptions = {
			category: LogCategory.CALLTRACE,
			enabled: enabled
		}
		return this.logCategory(options)
	}
	/**
	 * Convenience method for enabling or disabling logging for [[LogCategory.COMMUNICATION]] through calling [[logCategory]].
	 */
	public logCommunication(enabled: boolean): Promise<IAMCPCommand<Command.LOG_CATEGORY, LogCategoryOptions, LogCategoryOptions>> {
		let options: LogCategoryOptions = {
			category: LogCategory.COMMUNICATION,
			enabled: enabled
		}
		return this.logCategory(options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#DIAG>
	 */
	public diag(options?: DiagOptions): Promise<IAMCPCommand<Command.DIAG, DiagOptions, DiagOptions>> {
		if (!options) {
			options = {
				command: Command.DIAG
			} as DiagOptions
		}
		return this.do(Command.DIAG, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#HELP>
	 */
	public help(options?: HelpOptions | Command | string): Promise<IAMCPCommand<Command.HELP, HelpOptions, HelpResponse>> {
		if (!options || typeof options === 'string') {
			options = {
				for: options
			} as HelpOptions
		}
		return this.do(Command.HELP, options)
	}

	/**
	 * Convenience method for calling [[help]] with no parameters.
	 *
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#HELP>
	 */
	public getCommands(): Promise<IAMCPCommand<Command.HELP, HelpOptions, HelpResponse>> {
		return this.help()
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#HELP-PRODUCER>
	 */
	public helpProducer(options?: HelpProducerOptions | Producer | string): Promise<IAMCPCommand<Command.HELP_PRODUCER, HelpProducerOptions, HelpProducerResponse>> {
		if (!options || typeof options === 'string') {
			options = {
				producer: options
			} as HelpProducerOptions
		}
		return this.do(Command.HELP_PRODUCER, options)
	}

	/**
	 * Convenience method for calling [[helpProducer]] with no parameters.
	 *
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#HELP-PRODUCER>
	 */
	public getProducers(): Promise<IAMCPCommand<Command.HELP_PRODUCER, HelpProducerOptions, HelpProducerResponse>> {
		return this.helpProducer()
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#HELP-CONSUMER>
	 */
	public helpConsumer(options?: HelpConsumerOptions | Consumer | string): Promise<IAMCPCommand<Command.HELP_CONSUMER, HelpConsumerOptions, HelpConsumerResponse>> {
		if (!options || typeof options === 'string') {
			options = {
				consumer: options
			} as HelpConsumerOptions
		}
		return this.do(Command.HELP_CONSUMER, options)
	}

	/**
	 * Convenience method for calling [[helpConsumer]] with no parameters.
	 *
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#HELP-CONSUMER>
	 */
	public getConsumers(): Promise<IAMCPCommand<Command.HELP_CONSUMER, HelpConsumerOptions, HelpConsumerResponse>> {
		return this.helpConsumer()
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#BYE>
	 */
	public bye(options?: ByeOptions): Promise<IAMCPCommand<Command.BYE, ByeOptions, ByeOptions>> {
		if (!options) {
			options = {
				command: Command.BYE
			} as ByeOptions
		}
		return this.do(Command.BYE, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#KILL>
	 */
	public kill(options?: KillOptions): Promise<IAMCPCommand<Command.KILL, KillOptions, KillOptions>> {
		if (!options) {
			options = {
				command: Command.KILL
			} as KillOptions
		}
		return this.do(Command.KILL, options)
	}

	/**
	 * <https://github.com/CasparCG/help/wiki/AMCP-Protocol#RESTART>
	 */
	public restart(options?: RestartOptions): Promise<IAMCPCommand<Command.RESTART, RestartOptions, undefined>> {
		if (!options) {
			options = {
				command: Command.RESTART
			} as RestartOptions
		} else {
			options.command = Command.RESTART
		}
		return this.do(new AMCPCommand<Command.RESTART, RestartOptions, undefined>(options))
	}

	/**
	 * Undocumented, but implemented by Julusian.
	 */
	public ping(options?: PingOptions): Promise<IAMCPCommand<Command.PING, PingOptions, boolean>> {
		if (!options) {
			options = {
				command: Command.PING
			} as PingOptions
		} else {
			options.command = Command.PING
		}
		return this.do(new AMCPCommand<Command.PING, PingOptions, boolean>(options))
	}

	/**
	 * Undocumented, but implemented by Julusian.
	 */
	public time(options: TimeOptions): Promise<IAMCPCommand<Command.TIME, TimeOptions, TimeOptions>> {
		options.command = Command.TIME
		return this.do(new AMCPCommand<Command.TIME, TimeOptions, TimeOptions>(options))
	}

	/**
	 * https://github.com/CasparCG/server/issues/872
	 */
	public scheduleSet(options: ScheduleSetOptions): Promise<IAMCPCommand<Command.SCHEDULE_SET, ScheduleSetOptions, ScheduleSetOptions>> {
		options.command = Command.SCHEDULE_SET
		return this.do(new AMCPCommand<Command.SCHEDULE_SET, ScheduleSetOptions, ScheduleSetOptions>(options))
	}

	/**
	 * https://github.com/CasparCG/server/issues/872
	 */
	public scheduleRemove(options: ScheduleRemoveOptions | string): Promise<IAMCPCommand<Command.SCHEDULE_REMOVE, ScheduleRemoveOptions, ScheduleRemoveOptions>> {
		if (typeof options === 'string') {
			options = {
				command: Command.SCHEDULE_REMOVE,
				token: options
			} as ScheduleRemoveOptions
		} else {
			options.command = Command.SCHEDULE_REMOVE
		}
		return this.do(new AMCPCommand<Command.SCHEDULE_REMOVE, ScheduleRemoveOptions, ScheduleRemoveOptions>(options))
	}

	/**
	 * https://github.com/CasparCG/server/issues/872
	 */
	public scheduleClear(options?: ScheduleClearOptions): Promise<IAMCPCommand<Command.SCHEDULE_CLEAR, ScheduleClearOptions, ScheduleClearOptions>> {
		if (!options) {
			options = {
				command: Command.SCHEDULE_CLEAR
			} as ScheduleClearOptions
		} else {
			options.command = Command.SCHEDULE_CLEAR
		}
		return this.do(new AMCPCommand<Command.SCHEDULE_CLEAR, ScheduleClearOptions, ScheduleClearOptions>(options))
	}

	/**
	 * https://github.com/CasparCG/server/issues/872
	 */
	public scheduleList(options?: ScheduleListOptions | string): Promise<IAMCPCommand<Command.SCHEDULE_LIST, ScheduleClearOptions, ScheduleClearOptions>> {
		if (!options || typeof options === 'string') {
			options = {
				command: Command.SCHEDULE_LIST,
				timecode: options
			} as ScheduleListOptions
		} else {
			options.command = Command.SCHEDULE_LIST
		}
		return this.do(new AMCPCommand<Command.SCHEDULE_LIST, ScheduleClearOptions, ScheduleClearOptions>(options))
	}

	/**
	 * Automatically create a transition object with the correct transition keys
	 */
	private _createTransitionOptionsObject(transition?: Enum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: Enum.Ease | string | number, transitionDirectionOrOverlay?: Enum.Direction | string) {
		if (transition === Transition.STING.toString()) {
			return {
				stingMaskFilename: transitionDurationOrMaskFile,
				stingDelay: transitionEasingOrStingDuration,
				stingOverlayFilename: transitionDirectionOrOverlay || ''
			}
		} else {
			return {
				transitionDuration: transitionDurationOrMaskFile,
				transitionEasing: transitionEasingOrStingDuration,
				transitionDirection: transitionDirectionOrOverlay
			}
		}
	}

	/**
	 *
	 */
	private _createNewSocket(options?: IConnectionOptions, enforceRecreation: boolean = false): void {
		let hasNewOptions = false
		if (options) {
			for (let key in options) {
				if (!options.hasOwnProperty(key)) {
					continue
				}

				if (this.hasOwnProperty(key) || CasparCG.prototype.hasOwnProperty(key)) {
					// only update new options
					if ((this as any)[key] !== (options as any)[key]) {
						(this as any)[key] = (options as any)[key]
						hasNewOptions = true
					}
				}
			}
		}
		// dont recreate if exising socket, same options + host + port
		if (this._socket && (this._socket.host !== this.host)) {
			hasNewOptions = true
		}
		if (this._socket && (this._socket.port !== this.port)) {
			hasNewOptions = true
		}
		if (this._socket && !hasNewOptions && !enforceRecreation) {
			return
		}

		// clean up if existing socket
		if (this._socket) {
			this._socket.dispose()
			delete this._socket
		}
		this._socket = new CasparCGSocket(this.host, this.port, this.autoReconnect, this.autoReconnectInterval, this.autoReconnectAttempts, this.queueMode)
		this._socket.on('error', (error: Error) => this._onSocketError(error))
		this._socket.on(CasparCGSocketStatusEvent.STATUS, (event: CasparCGSocketStatusEvent) => this._onSocketStatusChange(event))
		this._socket.on(CasparCGSocketStatusEvent.TIMEOUT, () => this._onSocketStatusTimeout())
		this._socket.on(CasparCGSocketResponseEvent.RESPONSE, (event: CasparCGSocketResponseEvent) => this._handleSocketResponse(event.response))
		this._socket.on(CasparCGSocketResponseEvent.INVALID_RESPONSE, () => this._handleInvalidSocketResponse())

		// inherit log method
		this._socket.log = (args) => this._log(args)
	}

	/**
	 *
	 */
	private _fetchNextCommand(): { cmd: IAMCPCommand, priority: Priority } | null {
		let VO: { cmd: IAMCPCommand, priority: Priority } | null = null
		if (this._queuedCommandsHighPriority.length > 0) {
			VO = { cmd: this._queuedCommandsHighPriority.shift()!, priority: Priority.HIGH }
		} else if (this._queuedCommands.length > 0) {
			VO = { cmd: this._queuedCommands.shift()!, priority: Priority.NORMAL }
		} else if (this._queuedCommandsLowPriority.length > 0) {
			VO = { cmd: this._queuedCommandsLowPriority.shift()!, priority: Priority.LOW }
		}
		return VO
	}

	/**
	 *
	 */
	private get _nextCommand(): { cmd: IAMCPCommand, priority: Priority } | null {
		let VO: { cmd: IAMCPCommand, priority: Priority } | null = null
		if (this._queuedCommandsHighPriority.length > 0) {
			VO = { cmd: this._queuedCommandsHighPriority[0]!, priority: Priority.HIGH }
		} else if (this._queuedCommands.length > 0) {
			VO = { cmd: this._queuedCommands[0]!, priority: Priority.NORMAL }
		} else if (this._queuedCommandsLowPriority.length > 0) {
			VO = { cmd: this._queuedCommandsLowPriority[0]!, priority: Priority.LOW }
		}
		return VO
	}

	/**
	 *
	 */
	private _onSocketError(error: Error): void {
		this._log(error) // gets emited through the log function
	}

	/**
	 *
	 */
	private _log(args: any): void {
		if (args instanceof Error) {
			if (this.listenerCount('error') > 0) {
				this.emit('error', args)
			}
			if (this.onError) {
				this.onError(args)
			}
		} else {
			if (this.debug) {
				console.log(args)
			}
			if (this.onLog) {
				this.onLog(args)
			}
			this.emit(LogEvent.LOG, new LogEvent(args))
		}
	}

	/**
	 *
	 */
	private _onSocketStatusChange(socketStatus: CasparCGSocketStatusEvent): void {
		let connected = socketStatus.valueOf().connected === true

		if (this.onConnectionStatus) {
			this.onConnectionStatus(socketStatus.valueOf())
		}

		if (connected !== this._connected) {
			if (connected) {
				// @todo: handle flush SENT-buffer + shift/push version command in queue. (add back the sent command (retry strategy)) + make sure VERSION comes first after reconnect
				this._flushSentCommands()
				// reset cached data
				delete this._configPromise
				delete this._pathsPromise
				delete this._versionPromise
			}

			this._connected = connected
			this.emit(CasparCGSocketStatusEvent.STATUS_CHANGED, socketStatus)

			if (this.onConnectionChanged) {
				this.onConnectionChanged(this._connected)
			}
			if (this._connected) {
				this._executeNextCommand() // gets going on commands already on queue, also cleans up sent command buffers

				// do checks to see if the server has been alive and used before this connection, or is in a untouched state
				if (this.virginServerCheck) {
					this.doNow(new AMCP.InfoCommand())
						.then((info) => {
							let channelPromises: Promise<IAMCPCommand>[] = []
							let channelLength: number = info.response.data.length

							for (let i: number = 1; i <= channelLength; i++) {	// 1-based index for channels
								channelPromises.push(this.doNow(new AMCP.InfoCommand({ channel: i })))
							}

							let virgin: boolean = true

							return Promise.all(channelPromises).then((channels) => {
								for (let i: number = 0; i < channels.length; i++) {
									let channelInfo: IAMCPCommand = channels[i]
									if (channelInfo.response.data.stage) {
										virgin = false
										break
									}
								}
								this.emit(CasparCGSocketStatusEvent.CONNECTED, { connected: this._connected, virginServer: virgin })
								if (this.onConnected) {
									this.onConnected(this._connected)
								}
							})
						})
						.catch(() => {
							this.emit(CasparCGSocketStatusEvent.CONNECTED, socketStatus)
							if (this.onConnected) {
								this.onConnected(this._connected)
							}
						})

					// don't check virgin state, just inform about the connection asap
				} else {
					this.emit(CasparCGSocketStatusEvent.CONNECTED, socketStatus)
					if (this.onConnected) {
						this.onConnected(this._connected)
					}
				}
			}
			if (!this._connected) {
				this.emit(CasparCGSocketStatusEvent.DISCONNECTED, socketStatus)
				if (this.onDisconnected) {
					this.onDisconnected(this._connected)
				}
			}
		}
	}

	/**
	 *
	 */
	private _onSocketStatusTimeout(): void {
		if (Object.keys(this._sentCommands).length > 0) {
			this._log(`Command timed out. Starting flush procedure, with ${Object.keys(this._sentCommands).length} command(s) in sentCommands.`)
		}

		// @todo: implement retry strategy #81

		// 1) discard
		// this._expediteCommand(true);

		// 2) retry (max attempts missing)
		this.reconnect()

		// 3) smart/probe
		// try to send INFO
		// -> SUCCESS
		// discard that single command, procees
		// -> FAIL
		// reconncet
	}

	/**
	 *
	 */
	private _handleSocketResponse(socketResponse: CasparCGSocketResponse): void {
		/*

		100 [action] - Information about an event.
		101 [action] - Information about an event. A line of data is being returned.

		200 [command] OK	- The command has been executed and several lines of data (seperated by \r\n) are being returned (terminated with an additional \r\n)
		201 [command] OK	- The command has been executed and data (terminated by \r\n) is being returned.
		202 [command] OK	- The command has been executed.

		400 ERROR	- Command not understood
		401 [command] ERROR	- Illegal video_channel
		402 [command] ERROR	- Parameter missing
		403 [command] ERROR	- Illegal parameter
		404 [command] ERROR	- Media file not found

		500 FAILED	- Internal server error
		501 [command] FAILED	- Internal server error
		502 [command] FAILED	- Media file unreadable

		*/

		// receive data & handle possible timeout first
		// parse incoming data & handle parsing errors (response code unknown, unexpected format)
		// create error object for response codes 400 to 502
		// reject with error object
		// create response object for response codes 200 to 202
		// resolve with response object

		// handle unkown tokens:
		let currentCommand: IAMCPCommand
		if (socketResponse.token) {
			if (this._queueMode === QueueMode.SALVO && !this._sentCommands[socketResponse.token]) {
				this._log(`Received a response from an unknown command with token ${socketResponse.token}`)
				return
			}
			currentCommand = (this._sentCommands[socketResponse.token])!
			delete this._sentCommands[socketResponse.token]
		} else {
			if (Object.keys(this._sentCommands).length === 0) {
				this._log(`Received a response without knowlingy having sent anyting.`)
				return
			}

			let token = Object.keys(this._sentCommands)[0]
			currentCommand = (this._sentCommands[token])
			delete this._sentCommands[token]
		}

		this._log(`Handling response, "${currentCommand.name}" with token "${currentCommand.token}"`)
		if (!(currentCommand.response instanceof AMCPResponse)) {
			currentCommand.response = new AMCPResponse()
		}

		if (currentCommand.validateResponse(socketResponse)) {
			if (currentCommand.name === 'ScheduleSetCommand') {
				let scheduledCommand: IAMCPCommand = currentCommand.getParam('command') as IAMCPCommand

				scheduledCommand.status = IAMCPStatus.Sent
				this._sentCommands[scheduledCommand.token] = scheduledCommand

				this._log(`New command scheduled, "${scheduledCommand.name}".`)
			} else if (currentCommand.name === 'ScheduleRemoveCommand') {
				delete this._sentCommands[currentCommand.getParam('token') as string]
			}

			currentCommand.status = IAMCPStatus.Suceeded
			currentCommand.resolve(currentCommand)
		} else {
			currentCommand.status = IAMCPStatus.Failed
			currentCommand.reject(currentCommand)
		}
		this.emit(CasparCGSocketCommandEvent.RESPONSE, new CasparCGSocketCommandEvent(currentCommand))

		this._executeNextCommand()
	}

	/**
	 *
	 */
	private _handleInvalidSocketResponse(): void {
		// @todo: in the future, perhaps we could better predict that the connection is in a restart-state, and act accordingly, to
		// gracefully keep/fall back data and/or speed up reconnection??
	}

	/**
	 *
	 */
	private _flushSentCommands(): void {
		for (let token in this._sentCommands) {
			let i = this._sentCommands[token]
			delete this._sentCommands[token]
			this._log(`Flushing commands from sent-queue. Deleting: "${i.name}" with token "${i.token}".`)
			i.status = IAMCPStatus.Failed
			i.reject(i)
		}
	}

	/**
	 *
	 */
	private _executeNextCommand(): void {
		if (this.connected) {
			if (this._queueMode === QueueMode.SALVO) {
				while (this.commandQueueLength > 0) {
					let nextCommand: { cmd: IAMCPCommand, priority: Priority } | null = this._fetchNextCommand()
					if (nextCommand) {
						this._sentCommands[nextCommand.cmd.token] = nextCommand.cmd
						this._log(`Sending command, "${nextCommand.cmd.name}" with priority "${nextCommand.priority === 1 ? 'NORMAL' : nextCommand.priority === 2 ? 'HIGH' : nextCommand.priority === 0 ? 'LOW' : 'unknown'}". ${this._sentCommands.length} command(s) in sentCommands, ${this.commandQueueLength} command(s) in command queues.`)
						this._socket.executeCommand(nextCommand.cmd)
					}
				}
			} else if (this._queueMode === QueueMode.SEQUENTIAL) {
				let nextCommand: { cmd: IAMCPCommand, priority: Priority } | null = this._fetchNextCommand()
				if (nextCommand) {
					this._sentCommands[nextCommand.cmd.token] = nextCommand.cmd
					this._log(`Sending command, "${nextCommand.cmd.name}" with priority "${nextCommand.priority === 1 ? 'NORMAL' : nextCommand.priority === 2 ? 'HIGH' : nextCommand.priority === 0 ? 'LOW' : 'unknown'}". ${this._sentCommands.length} command(s) in sentCommands, ${this.commandQueueLength} command(s) in command queues.`)
					this._socket.executeCommand(nextCommand.cmd)
				}
			}
		} else {
			if (this.commandQueueLength > 0) {
				this._log(`Can't process commands, socket not connected. ${this.commandQueueLength} commands left in commandsQueue, the first one being "${this._nextCommand ? this._nextCommand.cmd.name : 'null'}".`)
			}
		}
	}
}
