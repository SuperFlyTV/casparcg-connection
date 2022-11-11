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

export interface Command<T extends Commands, V> {
	readonly command: T
	params: V
}

export type LoadbgCommand = Command<Commands.Loadbg, LoadbgParameters>
export type LoadbgDecklinkCommand = Command<Commands.LoadbgDecklink, LoadbgDecklinkParameters>
export type LoadbgHtmlCommand = Command<Commands.LoadbgHtml, LoadbgHtmlParameters>
export type LoadbgRouteCommand = Command<Commands.LoadbgRoute, LoadbgRouteParameters>
export type LoadCommand = Command<Commands.Load, LoadParameters>
export type PlayCommand = Command<Commands.Play, PlayParameters>
export type PlayDecklinkCommand = Command<Commands.PlayDecklink, PlayDecklinkParameters>
export type PlayHtmlCommand = Command<Commands.PlayHtml, PlayHtmlParameters>
export type PlayRouteCommand = Command<Commands.PlayRoute, PlayRouteParameters>
export type PauseCommand = Command<Commands.Pause, PauseParameters>
export type ResumeCommand = Command<Commands.Resume, ResumeParameters>
export type StopCommand = Command<Commands.Stop, StopParameters>
export type ClearCommand = Command<Commands.Clear, ClearParameters>
export type CallCommand = Command<Commands.Call, CallParameters>
export type SwapCommand = Command<Commands.Swap, SwapParameters>
export type AddCommand = Command<Commands.Add, AddParameters>
export type RemoveCommand = Command<Commands.Remove, RemoveParameters>
export type PrintCommand = Command<Commands.Print, PrintParameters>
export type LogLevelCommand = Command<Commands.LogLevel, LogLevelParameters>
export type LogCategoryCommand = Command<Commands.LogCategory, LogCategoryParameters>
export type SetCommand = Command<Commands.Set, SetParameters>
export type LockCommand = Command<Commands.Lock, LockParameters>
export type DataStoreCommand = Command<Commands.DataStore, DataStoreParameters>
export type DataRetrieveCommand = Command<Commands.DataRetrieve, DataRetrieveParameters>
export type DataListCommand = Command<Commands.DataList, DataListParameters>
export type DataRemoveCommand = Command<Commands.DataRemove, DataRemoveParameters>
export type CgAddCommand = Command<Commands.CgAdd, CgAddParameters>
export type CgPlayCommand = Command<Commands.CgPlay, CgPlayParameters>
export type CgStopCommand = Command<Commands.CgStop, CgStopParameters>
export type CgNextCommand = Command<Commands.CgNext, CgNextParameters>
export type CgRemoveCommand = Command<Commands.CgRemove, CgRemoveParameters>
export type CgClearCommand = Command<Commands.CgClear, CgClearParameters>
export type CgUpdateCommand = Command<Commands.CgUpdate, CgUpdateParameters>
export type CgInvokeCommand = Command<Commands.CgInvoke, CgInvokeParameters>
export type CgInfoCommand = Command<Commands.CgInfo, CgInfoParameters>
export type MixerKeyerCommand = Command<Commands.MixerKeyer, MixerKeyerParameters>
export type MixerChromaCommand = Command<Commands.MixerChroma, MixerChromaParameters>
export type MixerBlendCommand = Command<Commands.MixerBlend, MixerBlendParameters>
export type MixerInvertCommand = Command<Commands.MixerInvert, MixerInvertParameters>
export type MixerOpacityCommand = Command<Commands.MixerOpacity, MixerOpacityParameters>
export type MixerBrightnessCommand = Command<Commands.MixerBrightness, MixerBrightnessParameters>
export type MixerSaturationCommand = Command<Commands.MixerSaturation, MixerSaturationParameters>
export type MixerContrastCommand = Command<Commands.MixerContrast, MixerContrastParameters>
export type MixerLevelsCommand = Command<Commands.MixerLevels, MixerLevelsParameters>
export type MixerFillCommand = Command<Commands.MixerFill, MixerFillParameters>
export type MixerClipCommand = Command<Commands.MixerClip, MixerClipParameters>
export type MixerAnchorCommand = Command<Commands.MixerAnchor, MixerAnchorParameters>
export type MixerCropCommand = Command<Commands.MixerCrop, MixerCropParameters>
export type MixerRotationCommand = Command<Commands.MixerRotation, MixerRotationParameters>
export type MixerPerspectiveCommand = Command<Commands.MixerPerspective, MixerPerspectiveParameters>
export type MixerMipmapCommand = Command<Commands.MixerMipmap, MixerMipmapParameters>
export type MixerVolumeCommand = Command<Commands.MixerVolume, MixerVolumeParameters>
export type MixerMastervolumeCommand = Command<Commands.MixerMastervolume, MixerMastervolumeParameters>
export type MixerStraightAlphaOutputCommand = Command<
	Commands.MixerStraightAlphaOutput,
	MixerStraightAlphaOutputParameters
>
export type MixerGridCommand = Command<Commands.MixerGrid, MixerGridParameters>
export type MixerCommitCommand = Command<Commands.MixerCommit, MixerCommitParameters>
export type MixerClearCommand = Command<Commands.MixerClear, MixerClearParameters>
export type Channel_gridCommand = Command<Commands.ChannelGrid, ChannelGridParameters>
export type ThumbnailListCommand = Command<Commands.ThumbnailList, ThumbnailListParameters>
export type ThumbnailRetrieveCommand = Command<Commands.ThumbnailRetrieve, ThumbnailRetrieveParameters>
export type ThumbnailGenerateCommand = Command<Commands.ThumbnailGenerate, ThumbnailGenerateParameters>
export type ThumbnailGenerate_allCommand = Command<Commands.ThumbnailGenerateAll, ThumbnailGenerateAllParameters>
export type CinfCommand = Command<Commands.Cinf, CinfParameters>
export type ClsCommand = Command<Commands.Cls, ClsParameters>
export type FlsCommand = Command<Commands.Fls, FlsParameters>
export type TlsCommand = Command<Commands.Tls, TlsParameters>
export type VersionCommand = Command<Commands.Version, VersionParameters>
export type InfoCommand = Command<Commands.Info, InfoParameters>
export type InfoTemplateCommand = Command<Commands.InfoTemplate, InfoTemplateParameters>
export type InfoConfigCommand = Command<Commands.InfoConfig, InfoConfigParameters>
export type InfoPathsCommand = Command<Commands.InfoPaths, InfoPathsParameters>
export type InfoSystemCommand = Command<Commands.InfoSystem, InfoSystemParameters>
export type InfoServerCommand = Command<Commands.InfoServer, InfoServerParameters>
export type InfoQueuesCommand = Command<Commands.InfoQueues, InfoQueuesParameters>
export type InfoThreadsCommand = Command<Commands.InfoThreads, InfoThreadsParameters>
export type InfoDelayCommand = Command<Commands.InfoDelay, InfoDelayParameters>
export type DiagCommand = Command<Commands.Diag, DiagParameters>
export type GlInfoCommand = Command<Commands.GlInfo, GlInfoParameters>
export type GlGcCommand = Command<Commands.GlGc, GlGcParameters>
export type ByeCommand = Command<Commands.Bye, ByeParameters>
export type KillCommand = Command<Commands.Kill, KillParameters>
export type RestartCommand = Command<Commands.Restart, RestartParameters>

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
