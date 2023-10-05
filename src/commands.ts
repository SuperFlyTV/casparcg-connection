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
	[Commands.Loadbg]: TypedResponseCommand<Commands.Loadbg, LoadbgParameters, undefined>
	[Commands.LoadbgDecklink]: TypedResponseCommand<Commands.LoadbgDecklink, LoadbgDecklinkParameters, undefined>
	[Commands.LoadbgHtml]: TypedResponseCommand<Commands.LoadbgHtml, LoadbgHtmlParameters, undefined>
	[Commands.LoadbgRoute]: TypedResponseCommand<Commands.LoadbgRoute, LoadbgRouteParameters, undefined>
	[Commands.Load]: TypedResponseCommand<Commands.Load, LoadParameters, undefined>
	[Commands.Play]: TypedResponseCommand<Commands.Play, PlayParameters, undefined>
	[Commands.PlayDecklink]: TypedResponseCommand<Commands.PlayDecklink, PlayDecklinkParameters, undefined>
	[Commands.PlayHtml]: TypedResponseCommand<Commands.PlayHtml, PlayHtmlParameters, undefined>
	[Commands.PlayRoute]: TypedResponseCommand<Commands.PlayRoute, PlayRouteParameters, undefined>
	[Commands.Pause]: TypedResponseCommand<Commands.Pause, PauseParameters, undefined>
	[Commands.Resume]: TypedResponseCommand<Commands.Resume, ResumeParameters, undefined>
	[Commands.Stop]: TypedResponseCommand<Commands.Stop, StopParameters, undefined>
	[Commands.Clear]: TypedResponseCommand<Commands.Clear, ClearParameters, undefined>
	[Commands.Call]: TypedResponseCommand<Commands.Call, CallParameters, undefined>
	[Commands.Swap]: TypedResponseCommand<Commands.Swap, SwapParameters, undefined>
	[Commands.Add]: TypedResponseCommand<Commands.Add, AddParameters, undefined>
	[Commands.Remove]: TypedResponseCommand<Commands.Remove, RemoveParameters, undefined>
	[Commands.Print]: TypedResponseCommand<Commands.Print, PrintParameters, undefined>
	[Commands.LogLevel]: TypedResponseCommand<Commands.LogLevel, LogLevelParameters, undefined>
	[Commands.LogCategory]: TypedResponseCommand<Commands.LogCategory, LogCategoryParameters, undefined>
	[Commands.Set]: TypedResponseCommand<Commands.Set, SetParameters, undefined>
	[Commands.Lock]: TypedResponseCommand<Commands.Lock, LockParameters, undefined>
	[Commands.DataStore]: TypedResponseCommand<Commands.DataStore, DataStoreParameters, undefined>
	[Commands.DataRetrieve]: TypedResponseCommand<Commands.DataRetrieve, DataRetrieveParameters, undefined>
	[Commands.DataList]: TypedResponseCommand<Commands.DataList, DataListParameters, undefined>
	[Commands.DataRemove]: TypedResponseCommand<Commands.DataRemove, DataRemoveParameters, undefined>
	[Commands.CgAdd]: TypedResponseCommand<Commands.CgAdd, CgAddParameters, undefined>
	[Commands.CgPlay]: TypedResponseCommand<Commands.CgPlay, CgPlayParameters, undefined>
	[Commands.CgStop]: TypedResponseCommand<Commands.CgStop, CgStopParameters, undefined>
	[Commands.CgNext]: TypedResponseCommand<Commands.CgNext, CgNextParameters, undefined>
	[Commands.CgRemove]: TypedResponseCommand<Commands.CgRemove, CgRemoveParameters, undefined>
	[Commands.CgClear]: TypedResponseCommand<Commands.CgClear, CgClearParameters, undefined>
	[Commands.CgUpdate]: TypedResponseCommand<Commands.CgUpdate, CgUpdateParameters, undefined>
	[Commands.CgInvoke]: TypedResponseCommand<Commands.CgInvoke, CgInvokeParameters, undefined>
	[Commands.CgInfo]: TypedResponseCommand<Commands.CgInfo, CgInfoParameters, undefined>
	[Commands.MixerKeyer]: TypedResponseCommand<Commands.MixerKeyer, MixerKeyerParameters, undefined>
	[Commands.MixerChroma]: TypedResponseCommand<Commands.MixerChroma, MixerChromaParameters, undefined>
	[Commands.MixerBlend]: TypedResponseCommand<Commands.MixerBlend, MixerBlendParameters, undefined>
	[Commands.MixerInvert]: TypedResponseCommand<Commands.MixerInvert, MixerInvertParameters, undefined>
	[Commands.MixerOpacity]: TypedResponseCommand<Commands.MixerOpacity, MixerOpacityParameters, undefined>
	[Commands.MixerBrightness]: TypedResponseCommand<Commands.MixerBrightness, MixerBrightnessParameters, undefined>
	[Commands.MixerSaturation]: TypedResponseCommand<Commands.MixerSaturation, MixerSaturationParameters, undefined>
	[Commands.MixerContrast]: TypedResponseCommand<Commands.MixerContrast, MixerContrastParameters, undefined>
	[Commands.MixerLevels]: TypedResponseCommand<Commands.MixerLevels, MixerLevelsParameters, undefined>
	[Commands.MixerFill]: TypedResponseCommand<Commands.MixerFill, MixerFillParameters, undefined>
	[Commands.MixerClip]: TypedResponseCommand<Commands.MixerClip, MixerClipParameters, undefined>
	[Commands.MixerAnchor]: TypedResponseCommand<Commands.MixerAnchor, MixerAnchorParameters, undefined>
	[Commands.MixerCrop]: TypedResponseCommand<Commands.MixerCrop, MixerCropParameters, undefined>
	[Commands.MixerRotation]: TypedResponseCommand<Commands.MixerRotation, MixerRotationParameters, undefined>
	[Commands.MixerPerspective]: TypedResponseCommand<Commands.MixerPerspective, MixerPerspectiveParameters, undefined>
	[Commands.MixerMipmap]: TypedResponseCommand<Commands.MixerMipmap, MixerMipmapParameters, undefined>
	[Commands.MixerVolume]: TypedResponseCommand<Commands.MixerVolume, MixerVolumeParameters, undefined>
	[Commands.MixerMastervolume]: TypedResponseCommand<
		Commands.MixerMastervolume,
		MixerMastervolumeParameters,
		undefined
	>
	[Commands.MixerStraightAlphaOutput]: TypedResponseCommand<
		Commands.MixerStraightAlphaOutput,
		MixerStraightAlphaOutputParameters,
		undefined
	>
	[Commands.MixerGrid]: TypedResponseCommand<Commands.MixerGrid, MixerGridParameters, undefined>
	[Commands.MixerCommit]: TypedResponseCommand<Commands.MixerCommit, MixerCommitParameters, undefined>
	[Commands.MixerClear]: TypedResponseCommand<Commands.MixerClear, MixerClearParameters, undefined>
	[Commands.ChannelGrid]: TypedResponseCommand<Commands.ChannelGrid, ChannelGridParameters, undefined>
	[Commands.ThumbnailList]: TypedResponseCommand<Commands.ThumbnailList, ThumbnailListParameters, undefined>
	[Commands.ThumbnailRetrieve]: TypedResponseCommand<
		Commands.ThumbnailRetrieve,
		ThumbnailRetrieveParameters,
		undefined
	>
	[Commands.ThumbnailGenerate]: TypedResponseCommand<
		Commands.ThumbnailGenerate,
		ThumbnailGenerateParameters,
		undefined
	>
	[Commands.ThumbnailGenerateAll]: TypedResponseCommand<
		Commands.ThumbnailGenerateAll,
		ThumbnailGenerateAllParameters,
		undefined
	>
	[Commands.Cinf]: TypedResponseCommand<Commands.Cinf, CinfParameters, ClipInfo | undefined>
	[Commands.Cls]: TypedResponseCommand<Commands.Cls, ClsParameters, ClipInfo[]>
	[Commands.Fls]: TypedResponseCommand<Commands.Fls, FlsParameters, undefined>
	[Commands.Tls]: TypedResponseCommand<Commands.Tls, TlsParameters, string[]>
	[Commands.Version]: TypedResponseCommand<Commands.Version, VersionParameters, VersionInfo>
	[Commands.Info]: TypedResponseCommand<Commands.Info, InfoParameters, InfoEntry[]>
	[Commands.InfoChannel]: TypedResponseCommand<
		Commands.InfoChannel,
		InfoChannelParameters,
		InfoChannelEntry | undefined
	>
	[Commands.InfoLayer]: TypedResponseCommand<Commands.InfoLayer, InfoLayerParameters, InfoLayerEntry | undefined>
	[Commands.InfoTemplate]: TypedResponseCommand<Commands.InfoTemplate, InfoTemplateParameters, undefined>
	[Commands.InfoConfig]: TypedResponseCommand<Commands.InfoConfig, InfoConfigParameters, InfoConfig>
	[Commands.InfoPaths]: TypedResponseCommand<Commands.InfoPaths, InfoPathsParameters, undefined>
	[Commands.InfoSystem]: TypedResponseCommand<Commands.InfoSystem, InfoSystemParameters, undefined>
	[Commands.InfoServer]: TypedResponseCommand<Commands.InfoServer, InfoServerParameters, undefined>
	[Commands.InfoQueues]: TypedResponseCommand<Commands.InfoQueues, InfoQueuesParameters, undefined>
	[Commands.InfoThreads]: TypedResponseCommand<Commands.InfoThreads, InfoThreadsParameters, undefined>
	[Commands.InfoDelay]: TypedResponseCommand<Commands.InfoDelay, InfoDelayParameters, undefined>
	[Commands.Diag]: TypedResponseCommand<Commands.Diag, DiagParameters, undefined>
	[Commands.GlInfo]: TypedResponseCommand<Commands.GlInfo, GlInfoParameters, undefined>
	[Commands.GlGc]: TypedResponseCommand<Commands.GlGc, GlGcParameters, undefined>
	[Commands.Bye]: TypedResponseCommand<Commands.Bye, ByeParameters, undefined>
	[Commands.Kill]: TypedResponseCommand<Commands.Kill, KillParameters, undefined>
	[Commands.Restart]: TypedResponseCommand<Commands.Restart, RestartParameters, undefined>
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
