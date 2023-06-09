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
	InfoChannel = 'INFO_CHANNEL',
	InfoLayer = 'INFO_LAYER',
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
export interface CommandInternal<CMD extends Commands, Params, ReturnType> {
	command: Command<CMD, Params>
	returnType: ReturnType
}

export type CReturnType<C extends Commands> = AllInternalCommands[C]['returnType']

export interface AllInternalCommands {
	[Commands.Loadbg]: CommandInternal<Commands.Loadbg, LoadbgParameters, undefined>
	[Commands.LoadbgDecklink]: CommandInternal<Commands.LoadbgDecklink, LoadbgDecklinkParameters, undefined>
	[Commands.LoadbgHtml]: CommandInternal<Commands.LoadbgHtml, LoadbgHtmlParameters, undefined>
	[Commands.LoadbgRoute]: CommandInternal<Commands.LoadbgRoute, LoadbgRouteParameters, undefined>
	[Commands.Load]: CommandInternal<Commands.Load, LoadParameters, undefined>
	[Commands.Play]: CommandInternal<Commands.Play, PlayParameters, undefined>
	[Commands.PlayDecklink]: CommandInternal<Commands.PlayDecklink, PlayDecklinkParameters, undefined>
	[Commands.PlayHtml]: CommandInternal<Commands.PlayHtml, PlayHtmlParameters, undefined>
	[Commands.PlayRoute]: CommandInternal<Commands.PlayRoute, PlayRouteParameters, undefined>
	[Commands.Pause]: CommandInternal<Commands.Pause, PauseParameters, undefined>
	[Commands.Resume]: CommandInternal<Commands.Resume, ResumeParameters, undefined>
	[Commands.Stop]: CommandInternal<Commands.Stop, StopParameters, undefined>
	[Commands.Clear]: CommandInternal<Commands.Clear, ClearParameters, undefined>
	[Commands.Call]: CommandInternal<Commands.Call, CallParameters, undefined>
	[Commands.Swap]: CommandInternal<Commands.Swap, SwapParameters, undefined>
	[Commands.Add]: CommandInternal<Commands.Add, AddParameters, undefined>
	[Commands.Remove]: CommandInternal<Commands.Remove, RemoveParameters, undefined>
	[Commands.Print]: CommandInternal<Commands.Print, PrintParameters, undefined>
	[Commands.LogLevel]: CommandInternal<Commands.LogLevel, LogLevelParameters, undefined>
	[Commands.LogCategory]: CommandInternal<Commands.LogCategory, LogCategoryParameters, undefined>
	[Commands.Set]: CommandInternal<Commands.Set, SetParameters, undefined>
	[Commands.Lock]: CommandInternal<Commands.Lock, LockParameters, undefined>
	[Commands.DataStore]: CommandInternal<Commands.DataStore, DataStoreParameters, undefined>
	[Commands.DataRetrieve]: CommandInternal<Commands.DataRetrieve, DataRetrieveParameters, undefined>
	[Commands.DataList]: CommandInternal<Commands.DataList, DataListParameters, undefined>
	[Commands.DataRemove]: CommandInternal<Commands.DataRemove, DataRemoveParameters, undefined>
	[Commands.CgAdd]: CommandInternal<Commands.CgAdd, CgAddParameters, undefined>
	[Commands.CgPlay]: CommandInternal<Commands.CgPlay, CgPlayParameters, undefined>
	[Commands.CgStop]: CommandInternal<Commands.CgStop, CgStopParameters, undefined>
	[Commands.CgNext]: CommandInternal<Commands.CgNext, CgNextParameters, undefined>
	[Commands.CgRemove]: CommandInternal<Commands.CgRemove, CgRemoveParameters, undefined>
	[Commands.CgClear]: CommandInternal<Commands.CgClear, CgClearParameters, undefined>
	[Commands.CgUpdate]: CommandInternal<Commands.CgUpdate, CgUpdateParameters, undefined>
	[Commands.CgInvoke]: CommandInternal<Commands.CgInvoke, CgInvokeParameters, undefined>
	[Commands.CgInfo]: CommandInternal<Commands.CgInfo, CgInfoParameters, undefined>
	[Commands.MixerKeyer]: CommandInternal<Commands.MixerKeyer, MixerKeyerParameters, undefined>
	[Commands.MixerChroma]: CommandInternal<Commands.MixerChroma, MixerChromaParameters, undefined>
	[Commands.MixerBlend]: CommandInternal<Commands.MixerBlend, MixerBlendParameters, undefined>
	[Commands.MixerInvert]: CommandInternal<Commands.MixerInvert, MixerInvertParameters, undefined>
	[Commands.MixerOpacity]: CommandInternal<Commands.MixerOpacity, MixerOpacityParameters, undefined>
	[Commands.MixerBrightness]: CommandInternal<Commands.MixerBrightness, MixerBrightnessParameters, undefined>
	[Commands.MixerSaturation]: CommandInternal<Commands.MixerSaturation, MixerSaturationParameters, undefined>
	[Commands.MixerContrast]: CommandInternal<Commands.MixerContrast, MixerContrastParameters, undefined>
	[Commands.MixerLevels]: CommandInternal<Commands.MixerLevels, MixerLevelsParameters, undefined>
	[Commands.MixerFill]: CommandInternal<Commands.MixerFill, MixerFillParameters, undefined>
	[Commands.MixerClip]: CommandInternal<Commands.MixerClip, MixerClipParameters, undefined>
	[Commands.MixerAnchor]: CommandInternal<Commands.MixerAnchor, MixerAnchorParameters, undefined>
	[Commands.MixerCrop]: CommandInternal<Commands.MixerCrop, MixerCropParameters, undefined>
	[Commands.MixerRotation]: CommandInternal<Commands.MixerRotation, MixerRotationParameters, undefined>
	[Commands.MixerPerspective]: CommandInternal<Commands.MixerPerspective, MixerPerspectiveParameters, undefined>
	[Commands.MixerMipmap]: CommandInternal<Commands.MixerMipmap, MixerMipmapParameters, undefined>
	[Commands.MixerVolume]: CommandInternal<Commands.MixerVolume, MixerVolumeParameters, undefined>
	[Commands.MixerMastervolume]: CommandInternal<Commands.MixerMastervolume, MixerMastervolumeParameters, undefined>
	[Commands.MixerStraightAlphaOutput]: CommandInternal<
		Commands.MixerStraightAlphaOutput,
		MixerStraightAlphaOutputParameters,
		undefined
	>
	[Commands.MixerGrid]: CommandInternal<Commands.MixerGrid, MixerGridParameters, undefined>
	[Commands.MixerCommit]: CommandInternal<Commands.MixerCommit, MixerCommitParameters, undefined>
	[Commands.MixerClear]: CommandInternal<Commands.MixerClear, MixerClearParameters, undefined>
	[Commands.ChannelGrid]: CommandInternal<Commands.ChannelGrid, ChannelGridParameters, undefined>
	[Commands.ThumbnailList]: CommandInternal<Commands.ThumbnailList, ThumbnailListParameters, undefined>
	[Commands.ThumbnailRetrieve]: CommandInternal<Commands.ThumbnailRetrieve, ThumbnailRetrieveParameters, undefined>
	[Commands.ThumbnailGenerate]: CommandInternal<Commands.ThumbnailGenerate, ThumbnailGenerateParameters, undefined>
	[Commands.ThumbnailGenerateAll]: CommandInternal<
		Commands.ThumbnailGenerateAll,
		ThumbnailGenerateAllParameters,
		undefined
	>
	[Commands.Cinf]: CommandInternal<Commands.Cinf, CinfParameters, ClipInfo | undefined>
	[Commands.Cls]: CommandInternal<Commands.Cls, ClsParameters, ClipInfo[]>
	[Commands.Fls]: CommandInternal<Commands.Fls, FlsParameters, undefined>
	[Commands.Tls]: CommandInternal<Commands.Tls, TlsParameters, string[]>
	[Commands.Version]: CommandInternal<Commands.Version, VersionParameters, VersionInfo>
	[Commands.Info]: CommandInternal<Commands.Info, InfoParameters, InfoEntry[]>
	[Commands.InfoChannel]: CommandInternal<Commands.InfoChannel, InfoChannelParameters, InfoChannelEntry | undefined>
	[Commands.InfoLayer]: CommandInternal<Commands.InfoLayer, InfoLayerParameters, InfoLayerEntry | undefined>
	[Commands.InfoTemplate]: CommandInternal<Commands.InfoTemplate, InfoTemplateParameters, undefined>
	[Commands.InfoConfig]: CommandInternal<Commands.InfoConfig, InfoConfigParameters, undefined>
	[Commands.InfoPaths]: CommandInternal<Commands.InfoPaths, InfoPathsParameters, undefined>
	[Commands.InfoSystem]: CommandInternal<Commands.InfoSystem, InfoSystemParameters, undefined>
	[Commands.InfoServer]: CommandInternal<Commands.InfoServer, InfoServerParameters, undefined>
	[Commands.InfoQueues]: CommandInternal<Commands.InfoQueues, InfoQueuesParameters, undefined>
	[Commands.InfoThreads]: CommandInternal<Commands.InfoThreads, InfoThreadsParameters, undefined>
	[Commands.InfoDelay]: CommandInternal<Commands.InfoDelay, InfoDelayParameters, undefined>
	[Commands.Diag]: CommandInternal<Commands.Diag, DiagParameters, undefined>
	[Commands.GlInfo]: CommandInternal<Commands.GlInfo, GlInfoParameters, undefined>
	[Commands.GlGc]: CommandInternal<Commands.GlGc, GlGcParameters, undefined>
	[Commands.Bye]: CommandInternal<Commands.Bye, ByeParameters, undefined>
	[Commands.Kill]: CommandInternal<Commands.Kill, KillParameters, undefined>
	[Commands.Restart]: CommandInternal<Commands.Restart, RestartParameters, undefined>
}

export type LoadbgCommand = AllInternalCommands[Commands.Loadbg]['command']
export type LoadbgDecklinkCommand = AllInternalCommands[Commands.LoadbgDecklink]['command']
export type LoadbgHtmlCommand = AllInternalCommands[Commands.LoadbgHtml]['command']
export type LoadbgRouteCommand = AllInternalCommands[Commands.LoadbgRoute]['command']
export type LoadCommand = AllInternalCommands[Commands.Load]['command']
export type PlayCommand = AllInternalCommands[Commands.Play]['command']
export type PlayDecklinkCommand = AllInternalCommands[Commands.PlayDecklink]['command']
export type PlayHtmlCommand = AllInternalCommands[Commands.PlayHtml]['command']
export type PlayRouteCommand = AllInternalCommands[Commands.PlayRoute]['command']
export type PauseCommand = AllInternalCommands[Commands.Pause]['command']
export type ResumeCommand = AllInternalCommands[Commands.Resume]['command']
export type StopCommand = AllInternalCommands[Commands.Stop]['command']
export type ClearCommand = AllInternalCommands[Commands.Clear]['command']
export type CallCommand = AllInternalCommands[Commands.Call]['command']
export type SwapCommand = AllInternalCommands[Commands.Swap]['command']
export type AddCommand = AllInternalCommands[Commands.Add]['command']
export type RemoveCommand = AllInternalCommands[Commands.Remove]['command']
export type PrintCommand = AllInternalCommands[Commands.Print]['command']
export type LogLevelCommand = AllInternalCommands[Commands.LogLevel]['command']
export type LogCategoryCommand = AllInternalCommands[Commands.LogCategory]['command']
export type SetCommand = AllInternalCommands[Commands.Set]['command']
export type LockCommand = AllInternalCommands[Commands.Lock]['command']
export type DataStoreCommand = AllInternalCommands[Commands.DataStore]['command']
export type DataRetrieveCommand = AllInternalCommands[Commands.DataRetrieve]['command']
export type DataListCommand = AllInternalCommands[Commands.DataList]['command']
export type DataRemoveCommand = AllInternalCommands[Commands.DataRemove]['command']
export type CgAddCommand = AllInternalCommands[Commands.CgAdd]['command']
export type CgPlayCommand = AllInternalCommands[Commands.CgPlay]['command']
export type CgStopCommand = AllInternalCommands[Commands.CgStop]['command']
export type CgNextCommand = AllInternalCommands[Commands.CgNext]['command']
export type CgRemoveCommand = AllInternalCommands[Commands.CgRemove]['command']
export type CgClearCommand = AllInternalCommands[Commands.CgClear]['command']
export type CgUpdateCommand = AllInternalCommands[Commands.CgUpdate]['command']
export type CgInvokeCommand = AllInternalCommands[Commands.CgInvoke]['command']
export type CgInfoCommand = AllInternalCommands[Commands.CgInfo]['command']
export type MixerKeyerCommand = AllInternalCommands[Commands.MixerKeyer]['command']
export type MixerChromaCommand = AllInternalCommands[Commands.MixerChroma]['command']
export type MixerBlendCommand = AllInternalCommands[Commands.MixerBlend]['command']
export type MixerInvertCommand = AllInternalCommands[Commands.MixerInvert]['command']
export type MixerOpacityCommand = AllInternalCommands[Commands.MixerOpacity]['command']
export type MixerBrightnessCommand = AllInternalCommands[Commands.MixerBrightness]['command']
export type MixerSaturationCommand = AllInternalCommands[Commands.MixerSaturation]['command']
export type MixerContrastCommand = AllInternalCommands[Commands.MixerContrast]['command']
export type MixerLevelsCommand = AllInternalCommands[Commands.MixerLevels]['command']
export type MixerFillCommand = AllInternalCommands[Commands.MixerFill]['command']
export type MixerClipCommand = AllInternalCommands[Commands.MixerClip]['command']
export type MixerAnchorCommand = AllInternalCommands[Commands.MixerAnchor]['command']
export type MixerCropCommand = AllInternalCommands[Commands.MixerCrop]['command']
export type MixerRotationCommand = AllInternalCommands[Commands.MixerRotation]['command']
export type MixerPerspectiveCommand = AllInternalCommands[Commands.MixerPerspective]['command']
export type MixerMipmapCommand = AllInternalCommands[Commands.MixerMipmap]['command']
export type MixerVolumeCommand = AllInternalCommands[Commands.MixerVolume]['command']
export type MixerMastervolumeCommand = AllInternalCommands[Commands.MixerMastervolume]['command']
export type MixerStraightAlphaOutputCommand = AllInternalCommands[Commands.MixerStraightAlphaOutput]['command']
export type MixerGridCommand = AllInternalCommands[Commands.MixerGrid]['command']
export type MixerCommitCommand = AllInternalCommands[Commands.MixerCommit]['command']
export type MixerClearCommand = AllInternalCommands[Commands.MixerClear]['command']
export type Channel_gridCommand = AllInternalCommands[Commands.ChannelGrid]['command']
export type ThumbnailListCommand = AllInternalCommands[Commands.ThumbnailList]['command']
export type ThumbnailRetrieveCommand = AllInternalCommands[Commands.ThumbnailRetrieve]['command']
export type ThumbnailGenerateCommand = AllInternalCommands[Commands.ThumbnailGenerate]['command']
export type ThumbnailGenerate_allCommand = AllInternalCommands[Commands.ThumbnailGenerateAll]['command']
export type CinfCommand = AllInternalCommands[Commands.Cinf]['command']
export type ClsCommand = AllInternalCommands[Commands.Cls]['command']
export type FlsCommand = AllInternalCommands[Commands.Fls]['command']
export type TlsCommand = AllInternalCommands[Commands.Tls]['command']
export type VersionCommand = AllInternalCommands[Commands.Version]['command']
export type InfoCommand = AllInternalCommands[Commands.Info]['command']
export type InfoChannelCommand = AllInternalCommands[Commands.InfoChannel]['command']
export type InfoLayerCommand = AllInternalCommands[Commands.InfoLayer]['command']
export type InfoTemplateCommand = AllInternalCommands[Commands.InfoTemplate]['command']
export type InfoConfigCommand = AllInternalCommands[Commands.InfoConfig]['command']
export type InfoPathsCommand = AllInternalCommands[Commands.InfoPaths]['command']
export type InfoSystemCommand = AllInternalCommands[Commands.InfoSystem]['command']
export type InfoServerCommand = AllInternalCommands[Commands.InfoServer]['command']
export type InfoQueuesCommand = AllInternalCommands[Commands.InfoQueues]['command']
export type InfoThreadsCommand = AllInternalCommands[Commands.InfoThreads]['command']
export type InfoDelayCommand = AllInternalCommands[Commands.InfoDelay]['command']
export type DiagCommand = AllInternalCommands[Commands.Diag]['command']
export type GlInfoCommand = AllInternalCommands[Commands.GlInfo]['command']
export type GlGcCommand = AllInternalCommands[Commands.GlGc]['command']
export type ByeCommand = AllInternalCommands[Commands.Bye]['command']
export type KillCommand = AllInternalCommands[Commands.Kill]['command']
export type RestartCommand = AllInternalCommands[Commands.Restart]['command']

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
