import {
	LoadbgParameters,
	LoadParameters,
	PlayParameters,
	PauseParameters,
	ResumeParameters,
	StopParameters,
	ClearParameters,
	CallParameters,
	SwapParameters,
	RemoveParameters,
	PrintParameters,
	LogLevelParameters,
	LogCategoryParameters,
	SetParameters,
	LockParameters,
	DataStoreParameters,
	DataRetrieveParameters,
	DataListParameters,
	DataRemoveParameters,
	CgAddParameters,
	CgPlayParameters,
	CgStopParameters,
	CgNextParameters,
	CgRemoveParameters,
	CgClearParameters,
	CgUpdateParameters,
	CgInvokeParameters,
	CgInfoParameters,
	MixerKeyerParameters,
	MixerChromaParameters,
	MixerBlendParameters,
	MixerInvertParameters,
	MixerOpacityParameters,
	MixerBrightnessParameters,
	MixerSaturationParameters,
	MixerContrastParameters,
	MixerLevelsParameters,
	MixerFillParameters,
	MixerClipParameters,
	MixerAnchorParameters,
	MixerCropParameters,
	MixerRotationParameters,
	MixerPerspectiveParameters,
	MixerMipmapParameters,
	MixerVolumeParameters,
	MixerMastervolumeParameters,
	MixerStraightAlphaOutputParameters,
	MixerGridParameters,
	MixerCommitParameters,
	MixerClearParameters,
	ThumbnailListParameters,
	ThumbnailRetrieveParameters,
	ThumbnailGenerateParameters,
	CinfParameters,
	ClsParameters,
	FlsParameters,
	TlsParameters,
	VersionParameters,
	InfoParameters,
	InfoTemplateParameters,
	InfoConfigParameters,
	InfoPathsParameters,
	InfoSystemParameters,
	InfoServerParameters,
	InfoQueuesParameters,
	InfoThreadsParameters,
	InfoDelayParameters,
	DiagParameters,
	GlInfoParameters,
	GlGcParameters,
	ByeParameters,
	KillParameters,
	RestartParameters,
	AddParameters,
	ThumbnailGenerateAllParameters,
	ChannelGridParameters,
	PlayDecklinkParameters,
	LoadbgDecklinkParameters,
	LoadbgHtmlParameters,
	LoadbgRouteParameters,
	PlayHtmlParameters,
	PlayRouteParameters,
	ClipInfo,
	VersionInfo,
	InfoChannelParameters,
	InfoLayerParameters,
	InfoEntry,
	InfoChannelEntry,
	InfoLayerEntry,
	InfoConfig,
	BeginParameters,
	CommitParameters,
	PingParameters,
	DiscardParameters,
	CustomCommandParameters,
} from './parameters'

export enum Commands {
	Loadbg = 'LOADBG',
	LoadbgDecklink = 'LOADBG DECKLINK',
	LoadbgRoute = 'LOADBG route://',
	LoadbgHtml = 'LOADBG [html]',
	Load = 'LOAD',
	Play = 'PLAY',
	PlayDecklink = 'PLAY DECKLINK',
	PlayRoute = 'PLAY route://',
	PlayHtml = 'PLAY [html]',
	Pause = 'PAUSE',
	Resume = 'RESUME',
	Stop = 'STOP',
	Clear = 'CLEAR',
	Call = 'CALL',
	Swap = 'SWAP',
	Add = 'ADD',
	Remove = 'REMOVE',
	Print = 'PRINT',
	LogLevel = 'LOG LEVEL',
	LogCategory = 'LOG CATEGORY',
	Set = 'SET',
	Lock = 'LOCK',
	DataStore = 'DATA STORE',
	DataRetrieve = 'DATA RETRIEVE',
	DataList = 'DATA LIST',
	DataRemove = 'DATA REMOVE',
	CgAdd = 'CG ADD',
	CgPlay = 'CG PLAY',
	CgStop = 'CG STOP',
	CgNext = 'CG NEXT',
	CgRemove = 'CG REMOVE',
	CgClear = 'CG CLEAR',
	CgUpdate = 'CG UPDATE',
	CgInvoke = 'CG INVOKE',
	CgInfo = 'CG INFO',
	MixerKeyer = 'MIXER KEYER',
	MixerChroma = 'MIXER CHROMA',
	MixerBlend = 'MIXER BLEND',
	MixerInvert = 'MIXER INVERT',
	MixerOpacity = 'MIXER OPACITY',
	MixerBrightness = 'MIXER BRIGHTNESS',
	MixerSaturation = 'MIXER SATURATION',
	MixerContrast = 'MIXER CONTRAST',
	MixerLevels = 'MIXER LEVELS',
	MixerFill = 'MIXER FILL',
	MixerClip = 'MIXER CLIP',
	MixerAnchor = 'MIXER ANCHOR',
	MixerCrop = 'MIXER CROP',
	MixerRotation = 'MIXER ROTATION',
	MixerPerspective = 'MIXER PERSPECTIVE',
	MixerMipmap = 'MIXER MIPMAP',
	MixerVolume = 'MIXER VOLUME',
	MixerMastervolume = 'MIXER MASTERVOLUME',
	MixerStraightAlphaOutput = 'MIXER STRAIGHT_ALPHA_OUTPUT',
	MixerGrid = 'MIXER GRID',
	MixerCommit = 'MIXER COMMIT',
	MixerClear = 'MIXER CLEAR',
	ChannelGrid = 'CHANNEL_GRID',
	ThumbnailList = 'THUMBNAIL LIST',
	ThumbnailRetrieve = 'THUMBNAIL RETRIEVE',
	ThumbnailGenerate = 'THUMBNAIL GENERATE',
	ThumbnailGenerateAll = 'THUMBNAIL GENERATE_ALL',
	Cinf = 'CINF',
	Cls = 'CLS',
	Fls = 'FLS',
	Tls = 'TLS',
	Version = 'VERSION',
	Info = 'INFO',
	InfoChannel = 'INFO CHANNEL',
	InfoLayer = 'INFO LAYER',
	InfoTemplate = 'INFO TEMPLATE',
	InfoConfig = 'INFO CONFIG',
	InfoPaths = 'INFO PATHS',
	InfoSystem = 'INFO SYSTEM',
	InfoServer = 'INFO SERVER',
	InfoQueues = 'INFO QUEUES',
	InfoThreads = 'INFO THREADS',
	InfoDelay = 'INFO DELAY',
	Diag = 'DIAG',
	GlInfo = 'GL INFO',
	GlGc = 'GL GC',
	Bye = 'BYE',
	Kill = 'KILL',
	Restart = 'RESTART',
	Ping = 'PING',
	Begin = 'BEGIN',
	Commit = 'COMMIT',
	Discard = 'DISCARD',

	Custom = 'CUSTOM',
}

export interface Command<Cmd extends Commands, Params> {
	readonly command: Cmd
	params: Params
}
/**
 * This interface contains both the command as well as the typings for the return object
 */
export interface TypedResponseCommand<CommandName extends Commands, Params, ReturnType> {
	command: Command<CommandName, Params>
	returnType: ReturnType
}

export type CReturnType<C extends Commands> = AllTypedCommands[C]['returnType']

export interface AllTypedCommands {
	[Commands.Loadbg]: TypedResponseCommand<Commands.Loadbg, LoadbgParameters, unknown>
	[Commands.LoadbgDecklink]: TypedResponseCommand<Commands.LoadbgDecklink, LoadbgDecklinkParameters, unknown>
	[Commands.LoadbgHtml]: TypedResponseCommand<Commands.LoadbgHtml, LoadbgHtmlParameters, unknown>
	[Commands.LoadbgRoute]: TypedResponseCommand<Commands.LoadbgRoute, LoadbgRouteParameters, unknown>
	[Commands.Load]: TypedResponseCommand<Commands.Load, LoadParameters, unknown>
	[Commands.Play]: TypedResponseCommand<Commands.Play, PlayParameters, unknown>
	[Commands.PlayDecklink]: TypedResponseCommand<Commands.PlayDecklink, PlayDecklinkParameters, unknown>
	[Commands.PlayHtml]: TypedResponseCommand<Commands.PlayHtml, PlayHtmlParameters, unknown>
	[Commands.PlayRoute]: TypedResponseCommand<Commands.PlayRoute, PlayRouteParameters, unknown>
	[Commands.Pause]: TypedResponseCommand<Commands.Pause, PauseParameters, unknown>
	[Commands.Resume]: TypedResponseCommand<Commands.Resume, ResumeParameters, unknown>
	[Commands.Stop]: TypedResponseCommand<Commands.Stop, StopParameters, unknown>
	[Commands.Clear]: TypedResponseCommand<Commands.Clear, ClearParameters, unknown>
	[Commands.Call]: TypedResponseCommand<Commands.Call, CallParameters, unknown>
	[Commands.Swap]: TypedResponseCommand<Commands.Swap, SwapParameters, unknown>
	[Commands.Add]: TypedResponseCommand<Commands.Add, AddParameters, unknown>
	[Commands.Remove]: TypedResponseCommand<Commands.Remove, RemoveParameters, unknown>
	[Commands.Print]: TypedResponseCommand<Commands.Print, PrintParameters, unknown>
	[Commands.LogLevel]: TypedResponseCommand<Commands.LogLevel, LogLevelParameters, unknown>
	[Commands.LogCategory]: TypedResponseCommand<Commands.LogCategory, LogCategoryParameters, unknown>
	[Commands.Set]: TypedResponseCommand<Commands.Set, SetParameters, unknown>
	[Commands.Lock]: TypedResponseCommand<Commands.Lock, LockParameters, unknown>
	[Commands.DataStore]: TypedResponseCommand<Commands.DataStore, DataStoreParameters, unknown>
	[Commands.DataRetrieve]: TypedResponseCommand<Commands.DataRetrieve, DataRetrieveParameters, unknown>
	[Commands.DataList]: TypedResponseCommand<Commands.DataList, DataListParameters, unknown>
	[Commands.DataRemove]: TypedResponseCommand<Commands.DataRemove, DataRemoveParameters, unknown>
	[Commands.CgAdd]: TypedResponseCommand<Commands.CgAdd, CgAddParameters, unknown>
	[Commands.CgPlay]: TypedResponseCommand<Commands.CgPlay, CgPlayParameters, unknown>
	[Commands.CgStop]: TypedResponseCommand<Commands.CgStop, CgStopParameters, unknown>
	[Commands.CgNext]: TypedResponseCommand<Commands.CgNext, CgNextParameters, unknown>
	[Commands.CgRemove]: TypedResponseCommand<Commands.CgRemove, CgRemoveParameters, unknown>
	[Commands.CgClear]: TypedResponseCommand<Commands.CgClear, CgClearParameters, unknown>
	[Commands.CgUpdate]: TypedResponseCommand<Commands.CgUpdate, CgUpdateParameters, unknown>
	[Commands.CgInvoke]: TypedResponseCommand<Commands.CgInvoke, CgInvokeParameters, unknown>
	[Commands.CgInfo]: TypedResponseCommand<Commands.CgInfo, CgInfoParameters, unknown>
	[Commands.MixerKeyer]: TypedResponseCommand<Commands.MixerKeyer, MixerKeyerParameters, unknown>
	[Commands.MixerChroma]: TypedResponseCommand<Commands.MixerChroma, MixerChromaParameters, unknown>
	[Commands.MixerBlend]: TypedResponseCommand<Commands.MixerBlend, MixerBlendParameters, unknown>
	[Commands.MixerInvert]: TypedResponseCommand<Commands.MixerInvert, MixerInvertParameters, unknown>
	[Commands.MixerOpacity]: TypedResponseCommand<Commands.MixerOpacity, MixerOpacityParameters, unknown>
	[Commands.MixerBrightness]: TypedResponseCommand<Commands.MixerBrightness, MixerBrightnessParameters, unknown>
	[Commands.MixerSaturation]: TypedResponseCommand<Commands.MixerSaturation, MixerSaturationParameters, unknown>
	[Commands.MixerContrast]: TypedResponseCommand<Commands.MixerContrast, MixerContrastParameters, unknown>
	[Commands.MixerLevels]: TypedResponseCommand<Commands.MixerLevels, MixerLevelsParameters, unknown>
	[Commands.MixerFill]: TypedResponseCommand<Commands.MixerFill, MixerFillParameters, unknown>
	[Commands.MixerClip]: TypedResponseCommand<Commands.MixerClip, MixerClipParameters, unknown>
	[Commands.MixerAnchor]: TypedResponseCommand<Commands.MixerAnchor, MixerAnchorParameters, unknown>
	[Commands.MixerCrop]: TypedResponseCommand<Commands.MixerCrop, MixerCropParameters, unknown>
	[Commands.MixerRotation]: TypedResponseCommand<Commands.MixerRotation, MixerRotationParameters, unknown>
	[Commands.MixerPerspective]: TypedResponseCommand<Commands.MixerPerspective, MixerPerspectiveParameters, unknown>
	[Commands.MixerMipmap]: TypedResponseCommand<Commands.MixerMipmap, MixerMipmapParameters, unknown>
	[Commands.MixerVolume]: TypedResponseCommand<Commands.MixerVolume, MixerVolumeParameters, unknown>
	[Commands.MixerMastervolume]: TypedResponseCommand<Commands.MixerMastervolume, MixerMastervolumeParameters, unknown>
	[Commands.MixerStraightAlphaOutput]: TypedResponseCommand<
		Commands.MixerStraightAlphaOutput,
		MixerStraightAlphaOutputParameters,
		unknown
	>
	[Commands.MixerGrid]: TypedResponseCommand<Commands.MixerGrid, MixerGridParameters, unknown>
	[Commands.MixerCommit]: TypedResponseCommand<Commands.MixerCommit, MixerCommitParameters, unknown>
	[Commands.MixerClear]: TypedResponseCommand<Commands.MixerClear, MixerClearParameters, unknown>
	[Commands.ChannelGrid]: TypedResponseCommand<Commands.ChannelGrid, ChannelGridParameters, unknown>
	[Commands.ThumbnailList]: TypedResponseCommand<Commands.ThumbnailList, ThumbnailListParameters, unknown>
	[Commands.ThumbnailRetrieve]: TypedResponseCommand<Commands.ThumbnailRetrieve, ThumbnailRetrieveParameters, unknown>
	[Commands.ThumbnailGenerate]: TypedResponseCommand<Commands.ThumbnailGenerate, ThumbnailGenerateParameters, unknown>
	[Commands.ThumbnailGenerateAll]: TypedResponseCommand<
		Commands.ThumbnailGenerateAll,
		ThumbnailGenerateAllParameters,
		unknown
	>
	[Commands.Cinf]: TypedResponseCommand<Commands.Cinf, CinfParameters, ClipInfo | unknown>
	[Commands.Cls]: TypedResponseCommand<Commands.Cls, ClsParameters, ClipInfo[]>
	[Commands.Fls]: TypedResponseCommand<Commands.Fls, FlsParameters, unknown>
	[Commands.Tls]: TypedResponseCommand<Commands.Tls, TlsParameters, string[]>
	[Commands.Version]: TypedResponseCommand<Commands.Version, VersionParameters, VersionInfo>
	[Commands.Info]: TypedResponseCommand<Commands.Info, InfoParameters, InfoEntry[]>
	[Commands.InfoChannel]: TypedResponseCommand<
		Commands.InfoChannel,
		InfoChannelParameters,
		InfoChannelEntry | undefined
	>
	[Commands.InfoLayer]: TypedResponseCommand<Commands.InfoLayer, InfoLayerParameters, InfoLayerEntry | undefined>
	[Commands.InfoTemplate]: TypedResponseCommand<Commands.InfoTemplate, InfoTemplateParameters, unknown>
	[Commands.InfoConfig]: TypedResponseCommand<Commands.InfoConfig, InfoConfigParameters, InfoConfig>
	[Commands.InfoPaths]: TypedResponseCommand<Commands.InfoPaths, InfoPathsParameters, unknown>
	[Commands.InfoSystem]: TypedResponseCommand<Commands.InfoSystem, InfoSystemParameters, unknown>
	[Commands.InfoServer]: TypedResponseCommand<Commands.InfoServer, InfoServerParameters, unknown>
	[Commands.InfoQueues]: TypedResponseCommand<Commands.InfoQueues, InfoQueuesParameters, unknown>
	[Commands.InfoThreads]: TypedResponseCommand<Commands.InfoThreads, InfoThreadsParameters, unknown>
	[Commands.InfoDelay]: TypedResponseCommand<Commands.InfoDelay, InfoDelayParameters, unknown>
	[Commands.Diag]: TypedResponseCommand<Commands.Diag, DiagParameters, unknown>
	[Commands.GlInfo]: TypedResponseCommand<Commands.GlInfo, GlInfoParameters, unknown>
	[Commands.GlGc]: TypedResponseCommand<Commands.GlGc, GlGcParameters, unknown>
	[Commands.Bye]: TypedResponseCommand<Commands.Bye, ByeParameters, unknown>
	[Commands.Kill]: TypedResponseCommand<Commands.Kill, KillParameters, unknown>
	[Commands.Restart]: TypedResponseCommand<Commands.Restart, RestartParameters, unknown>
	[Commands.Ping]: TypedResponseCommand<Commands.Ping, PingParameters, unknown>
	[Commands.Begin]: TypedResponseCommand<Commands.Begin, BeginParameters, unknown>
	[Commands.Commit]: TypedResponseCommand<Commands.Commit, CommitParameters, unknown>
	[Commands.Discard]: TypedResponseCommand<Commands.Discard, DiscardParameters, unknown>

	[Commands.Custom]: TypedResponseCommand<Commands.Custom, CustomCommandParameters, unknown>
}

export type LoadbgCommand = AllTypedCommands[Commands.Loadbg]['command']
export type LoadbgDecklinkCommand = AllTypedCommands[Commands.LoadbgDecklink]['command']
export type LoadbgHtmlCommand = AllTypedCommands[Commands.LoadbgHtml]['command']
export type LoadbgRouteCommand = AllTypedCommands[Commands.LoadbgRoute]['command']
export type LoadCommand = AllTypedCommands[Commands.Load]['command']
export type PlayCommand = AllTypedCommands[Commands.Play]['command']
export type PlayDecklinkCommand = AllTypedCommands[Commands.PlayDecklink]['command']
export type PlayHtmlCommand = AllTypedCommands[Commands.PlayHtml]['command']
export type PlayRouteCommand = AllTypedCommands[Commands.PlayRoute]['command']
export type PauseCommand = AllTypedCommands[Commands.Pause]['command']
export type ResumeCommand = AllTypedCommands[Commands.Resume]['command']
export type StopCommand = AllTypedCommands[Commands.Stop]['command']
export type ClearCommand = AllTypedCommands[Commands.Clear]['command']
export type CallCommand = AllTypedCommands[Commands.Call]['command']
export type SwapCommand = AllTypedCommands[Commands.Swap]['command']
export type AddCommand = AllTypedCommands[Commands.Add]['command']
export type RemoveCommand = AllTypedCommands[Commands.Remove]['command']
export type PrintCommand = AllTypedCommands[Commands.Print]['command']
export type LogLevelCommand = AllTypedCommands[Commands.LogLevel]['command']
export type LogCategoryCommand = AllTypedCommands[Commands.LogCategory]['command']
export type SetCommand = AllTypedCommands[Commands.Set]['command']
export type LockCommand = AllTypedCommands[Commands.Lock]['command']
export type DataStoreCommand = AllTypedCommands[Commands.DataStore]['command']
export type DataRetrieveCommand = AllTypedCommands[Commands.DataRetrieve]['command']
export type DataListCommand = AllTypedCommands[Commands.DataList]['command']
export type DataRemoveCommand = AllTypedCommands[Commands.DataRemove]['command']
export type CgAddCommand = AllTypedCommands[Commands.CgAdd]['command']
export type CgPlayCommand = AllTypedCommands[Commands.CgPlay]['command']
export type CgStopCommand = AllTypedCommands[Commands.CgStop]['command']
export type CgNextCommand = AllTypedCommands[Commands.CgNext]['command']
export type CgRemoveCommand = AllTypedCommands[Commands.CgRemove]['command']
export type CgClearCommand = AllTypedCommands[Commands.CgClear]['command']
export type CgUpdateCommand = AllTypedCommands[Commands.CgUpdate]['command']
export type CgInvokeCommand = AllTypedCommands[Commands.CgInvoke]['command']
export type CgInfoCommand = AllTypedCommands[Commands.CgInfo]['command']
export type MixerKeyerCommand = AllTypedCommands[Commands.MixerKeyer]['command']
export type MixerChromaCommand = AllTypedCommands[Commands.MixerChroma]['command']
export type MixerBlendCommand = AllTypedCommands[Commands.MixerBlend]['command']
export type MixerInvertCommand = AllTypedCommands[Commands.MixerInvert]['command']
export type MixerOpacityCommand = AllTypedCommands[Commands.MixerOpacity]['command']
export type MixerBrightnessCommand = AllTypedCommands[Commands.MixerBrightness]['command']
export type MixerSaturationCommand = AllTypedCommands[Commands.MixerSaturation]['command']
export type MixerContrastCommand = AllTypedCommands[Commands.MixerContrast]['command']
export type MixerLevelsCommand = AllTypedCommands[Commands.MixerLevels]['command']
export type MixerFillCommand = AllTypedCommands[Commands.MixerFill]['command']
export type MixerClipCommand = AllTypedCommands[Commands.MixerClip]['command']
export type MixerAnchorCommand = AllTypedCommands[Commands.MixerAnchor]['command']
export type MixerCropCommand = AllTypedCommands[Commands.MixerCrop]['command']
export type MixerRotationCommand = AllTypedCommands[Commands.MixerRotation]['command']
export type MixerPerspectiveCommand = AllTypedCommands[Commands.MixerPerspective]['command']
export type MixerMipmapCommand = AllTypedCommands[Commands.MixerMipmap]['command']
export type MixerVolumeCommand = AllTypedCommands[Commands.MixerVolume]['command']
export type MixerMastervolumeCommand = AllTypedCommands[Commands.MixerMastervolume]['command']
export type MixerStraightAlphaOutputCommand = AllTypedCommands[Commands.MixerStraightAlphaOutput]['command']
export type MixerGridCommand = AllTypedCommands[Commands.MixerGrid]['command']
export type MixerCommitCommand = AllTypedCommands[Commands.MixerCommit]['command']
export type MixerClearCommand = AllTypedCommands[Commands.MixerClear]['command']
export type Channel_gridCommand = AllTypedCommands[Commands.ChannelGrid]['command']
export type ThumbnailListCommand = AllTypedCommands[Commands.ThumbnailList]['command']
export type ThumbnailRetrieveCommand = AllTypedCommands[Commands.ThumbnailRetrieve]['command']
export type ThumbnailGenerateCommand = AllTypedCommands[Commands.ThumbnailGenerate]['command']
export type ThumbnailGenerate_allCommand = AllTypedCommands[Commands.ThumbnailGenerateAll]['command']
export type CinfCommand = AllTypedCommands[Commands.Cinf]['command']
export type ClsCommand = AllTypedCommands[Commands.Cls]['command']
export type FlsCommand = AllTypedCommands[Commands.Fls]['command']
export type TlsCommand = AllTypedCommands[Commands.Tls]['command']
export type VersionCommand = AllTypedCommands[Commands.Version]['command']
export type InfoCommand = AllTypedCommands[Commands.Info]['command']
export type InfoChannelCommand = AllTypedCommands[Commands.InfoChannel]['command']
export type InfoLayerCommand = AllTypedCommands[Commands.InfoLayer]['command']
export type InfoTemplateCommand = AllTypedCommands[Commands.InfoTemplate]['command']
export type InfoConfigCommand = AllTypedCommands[Commands.InfoConfig]['command']
export type InfoPathsCommand = AllTypedCommands[Commands.InfoPaths]['command']
export type InfoSystemCommand = AllTypedCommands[Commands.InfoSystem]['command']
export type InfoServerCommand = AllTypedCommands[Commands.InfoServer]['command']
export type InfoQueuesCommand = AllTypedCommands[Commands.InfoQueues]['command']
export type InfoThreadsCommand = AllTypedCommands[Commands.InfoThreads]['command']
export type InfoDelayCommand = AllTypedCommands[Commands.InfoDelay]['command']
export type DiagCommand = AllTypedCommands[Commands.Diag]['command']
export type GlInfoCommand = AllTypedCommands[Commands.GlInfo]['command']
export type GlGcCommand = AllTypedCommands[Commands.GlGc]['command']
export type ByeCommand = AllTypedCommands[Commands.Bye]['command']
export type KillCommand = AllTypedCommands[Commands.Kill]['command']
export type RestartCommand = AllTypedCommands[Commands.Restart]['command']
export type PingCommand = AllTypedCommands[Commands.Ping]['command']
export type BeginCommand = AllTypedCommands[Commands.Begin]['command']
export type CommitCommand = AllTypedCommands[Commands.Commit]['command']
export type DiscardCommand = AllTypedCommands[Commands.Discard]['command']
export type CustomCommand = AllTypedCommands[Commands.Custom]['command']

export type AMCPCommand =
	| LoadbgCommand
	| LoadbgDecklinkCommand
	| LoadbgHtmlCommand
	| LoadbgRouteCommand
	| LoadCommand
	| PlayCommand
	| PlayDecklinkCommand
	| PlayHtmlCommand
	| PlayRouteCommand
	| PauseCommand
	| ResumeCommand
	| StopCommand
	| ClearCommand
	| CallCommand
	| SwapCommand
	| AddCommand
	| RemoveCommand
	| PrintCommand
	| LogLevelCommand
	| LogCategoryCommand
	| SetCommand
	| LockCommand
	| DataStoreCommand
	| DataRetrieveCommand
	| DataListCommand
	| DataRemoveCommand
	| CgAddCommand
	| CgPlayCommand
	| CgStopCommand
	| CgNextCommand
	| CgRemoveCommand
	| CgClearCommand
	| CgUpdateCommand
	| CgInvokeCommand
	| CgInfoCommand
	| MixerKeyerCommand
	| MixerChromaCommand
	| MixerBlendCommand
	| MixerInvertCommand
	| MixerOpacityCommand
	| MixerBrightnessCommand
	| MixerSaturationCommand
	| MixerContrastCommand
	| MixerLevelsCommand
	| MixerFillCommand
	| MixerClipCommand
	| MixerAnchorCommand
	| MixerCropCommand
	| MixerRotationCommand
	| MixerPerspectiveCommand
	| MixerMipmapCommand
	| MixerVolumeCommand
	| MixerMastervolumeCommand
	| MixerStraightAlphaOutputCommand
	| MixerGridCommand
	| MixerCommitCommand
	| MixerClearCommand
	| Channel_gridCommand
	| ThumbnailListCommand
	| ThumbnailRetrieveCommand
	| ThumbnailGenerateCommand
	| ThumbnailGenerate_allCommand
	| CinfCommand
	| ClsCommand
	| FlsCommand
	| TlsCommand
	| VersionCommand
	| InfoCommand
	| InfoChannelCommand
	| InfoLayerCommand
	| InfoTemplateCommand
	| InfoConfigCommand
	| InfoPathsCommand
	| InfoSystemCommand
	| InfoServerCommand
	| InfoQueuesCommand
	| InfoThreadsCommand
	| InfoDelayCommand
	| DiagCommand
	| GlInfoCommand
	| GlGcCommand
	| ByeCommand
	| KillCommand
	| RestartCommand
	| PingCommand
	| BeginCommand
	| CommitCommand
	| DiscardCommand
	| CustomCommand
