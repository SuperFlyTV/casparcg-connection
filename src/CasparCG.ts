import { BasicCasparCGAPI, SendResult } from './api'
import { CReturnType, Commands } from './commands'
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
	AddParameters,
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
	ChannelGridParameters,
	ThumbnailListParameters,
	ThumbnailRetrieveParameters,
	ThumbnailGenerateParameters,
	ThumbnailGenerateAllParameters,
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
	InfoChannelParameters,
	InfoLayerParameters,
} from './parameters'

export class CasparCG extends BasicCasparCGAPI {
	async loadbg(params: LoadbgParameters): Promise<SendResult<CReturnType<Commands.Loadbg>>> {
		return this.executeCommand({
			command: Commands.Loadbg,
			params,
		})
	}
	async load(params: LoadParameters): Promise<SendResult<CReturnType<Commands.Load>>> {
		return this.executeCommand({
			command: Commands.Load,
			params,
		})
	}
	async play(params: PlayParameters): Promise<SendResult<CReturnType<Commands.Play>>> {
		return this.executeCommand({
			command: Commands.Play,
			params,
		})
	}
	async pause(params: PauseParameters): Promise<SendResult<CReturnType<Commands.Pause>>> {
		return this.executeCommand({
			command: Commands.Pause,
			params,
		})
	}
	async resume(params: ResumeParameters): Promise<SendResult<CReturnType<Commands.Resume>>> {
		return this.executeCommand({
			command: Commands.Resume,
			params,
		})
	}
	async stop(params: StopParameters): Promise<SendResult<CReturnType<Commands.Stop>>> {
		return this.executeCommand({
			command: Commands.Stop,
			params,
		})
	}
	async clear(params: ClearParameters): Promise<SendResult<CReturnType<Commands.Clear>>> {
		return this.executeCommand({
			command: Commands.Clear,
			params,
		})
	}
	async call(params: CallParameters): Promise<SendResult<CReturnType<Commands.Call>>> {
		return this.executeCommand({
			command: Commands.Call,
			params,
		})
	}
	async swap(params: SwapParameters): Promise<SendResult<CReturnType<Commands.Swap>>> {
		return this.executeCommand({
			command: Commands.Swap,
			params,
		})
	}
	async add(params: AddParameters): Promise<SendResult<CReturnType<Commands.Add>>> {
		return this.executeCommand({
			command: Commands.Add,
			params,
		})
	}
	async remove(params: RemoveParameters): Promise<SendResult<CReturnType<Commands.Remove>>> {
		return this.executeCommand({
			command: Commands.Remove,
			params,
		})
	}
	async print(params: PrintParameters): Promise<SendResult<CReturnType<Commands.Print>>> {
		return this.executeCommand({
			command: Commands.Print,
			params,
		})
	}
	async logLevel(params: LogLevelParameters): Promise<SendResult<CReturnType<Commands.LogLevel>>> {
		return this.executeCommand({
			command: Commands.LogLevel,
			params,
		})
	}
	async logCategory(params: LogCategoryParameters): Promise<SendResult<CReturnType<Commands.LogCategory>>> {
		return this.executeCommand({
			command: Commands.LogCategory,
			params,
		})
	}
	async set(params: SetParameters): Promise<SendResult<CReturnType<Commands.Set>>> {
		return this.executeCommand({
			command: Commands.Set,
			params,
		})
	}
	async lock(params: LockParameters): Promise<SendResult<CReturnType<Commands.Lock>>> {
		return this.executeCommand({
			command: Commands.Lock,
			params,
		})
	}
	async dataStore(params: DataStoreParameters): Promise<SendResult<CReturnType<Commands.DataStore>>> {
		return this.executeCommand({
			command: Commands.DataStore,
			params,
		})
	}
	async dataRetrieve(params: DataRetrieveParameters): Promise<SendResult<CReturnType<Commands.DataRetrieve>>> {
		return this.executeCommand({
			command: Commands.DataRetrieve,
			params,
		})
	}
	async dataList(params: DataListParameters): Promise<SendResult<CReturnType<Commands.DataList>>> {
		return this.executeCommand({
			command: Commands.DataList,
			params,
		})
	}
	async dataRemove(params: DataRemoveParameters): Promise<SendResult<CReturnType<Commands.DataRemove>>> {
		return this.executeCommand({
			command: Commands.DataRemove,
			params,
		})
	}
	async cgAdd(params: CgAddParameters): Promise<SendResult<CReturnType<Commands.CgAdd>>> {
		return this.executeCommand({
			command: Commands.CgAdd,
			params,
		})
	}
	async cgPlay(params: CgPlayParameters): Promise<SendResult<CReturnType<Commands.CgPlay>>> {
		return this.executeCommand({
			command: Commands.CgPlay,
			params,
		})
	}
	async cgStop(params: CgStopParameters): Promise<SendResult<CReturnType<Commands.CgStop>>> {
		return this.executeCommand({
			command: Commands.CgStop,
			params,
		})
	}
	async cgNext(params: CgNextParameters): Promise<SendResult<CReturnType<Commands.CgNext>>> {
		return this.executeCommand({
			command: Commands.CgNext,
			params,
		})
	}
	async cgRemove(params: CgRemoveParameters): Promise<SendResult<CReturnType<Commands.CgRemove>>> {
		return this.executeCommand({
			command: Commands.CgRemove,
			params,
		})
	}
	async cgClear(params: CgClearParameters): Promise<SendResult<CReturnType<Commands.CgClear>>> {
		return this.executeCommand({
			command: Commands.CgClear,
			params,
		})
	}
	async cgUpdate(params: CgUpdateParameters): Promise<SendResult<CReturnType<Commands.CgUpdate>>> {
		return this.executeCommand({
			command: Commands.CgUpdate,
			params,
		})
	}
	async cgInvoke(params: CgInvokeParameters): Promise<SendResult<CReturnType<Commands.CgInvoke>>> {
		return this.executeCommand({
			command: Commands.CgInvoke,
			params,
		})
	}
	async cgInfo(params: CgInfoParameters): Promise<SendResult<CReturnType<Commands.CgInfo>>> {
		return this.executeCommand({
			command: Commands.CgInfo,
			params,
		})
	}
	async mixerKeyer(params: MixerKeyerParameters): Promise<SendResult<CReturnType<Commands.MixerKeyer>>> {
		return this.executeCommand({
			command: Commands.MixerKeyer,
			params,
		})
	}
	async mixerChroma(params: MixerChromaParameters): Promise<SendResult<CReturnType<Commands.MixerChroma>>> {
		return this.executeCommand({
			command: Commands.MixerChroma,
			params,
		})
	}
	async mixerBlend(params: MixerBlendParameters): Promise<SendResult<CReturnType<Commands.MixerBlend>>> {
		return this.executeCommand({
			command: Commands.MixerBlend,
			params,
		})
	}
	async mixerInvert(params: MixerInvertParameters): Promise<SendResult<CReturnType<Commands.MixerInvert>>> {
		return this.executeCommand({
			command: Commands.MixerInvert,
			params,
		})
	}
	async mixerOpacity(params: MixerOpacityParameters): Promise<SendResult<CReturnType<Commands.MixerOpacity>>> {
		return this.executeCommand({
			command: Commands.MixerOpacity,
			params,
		})
	}
	async mixerBrightness(
		params: MixerBrightnessParameters
	): Promise<SendResult<CReturnType<Commands.MixerBrightness>>> {
		return this.executeCommand({
			command: Commands.MixerBrightness,
			params,
		})
	}
	async mixerSaturation(
		params: MixerSaturationParameters
	): Promise<SendResult<CReturnType<Commands.MixerSaturation>>> {
		return this.executeCommand({
			command: Commands.MixerSaturation,
			params,
		})
	}
	async mixerContrast(params: MixerContrastParameters): Promise<SendResult<CReturnType<Commands.MixerContrast>>> {
		return this.executeCommand({
			command: Commands.MixerContrast,
			params,
		})
	}
	async mixerLevels(params: MixerLevelsParameters): Promise<SendResult<CReturnType<Commands.MixerLevels>>> {
		return this.executeCommand({
			command: Commands.MixerLevels,
			params,
		})
	}
	async mixerFill(params: MixerFillParameters): Promise<SendResult<CReturnType<Commands.MixerFill>>> {
		return this.executeCommand({
			command: Commands.MixerFill,
			params,
		})
	}
	async mixerClip(params: MixerClipParameters): Promise<SendResult<CReturnType<Commands.MixerClip>>> {
		return this.executeCommand({
			command: Commands.MixerClip,
			params,
		})
	}
	async mixerAnchor(params: MixerAnchorParameters): Promise<SendResult<CReturnType<Commands.MixerAnchor>>> {
		return this.executeCommand({
			command: Commands.MixerAnchor,
			params,
		})
	}
	async mixerCrop(params: MixerCropParameters): Promise<SendResult<CReturnType<Commands.MixerCrop>>> {
		return this.executeCommand({
			command: Commands.MixerCrop,
			params,
		})
	}
	async mixerRotation(params: MixerRotationParameters): Promise<SendResult<CReturnType<Commands.MixerRotation>>> {
		return this.executeCommand({
			command: Commands.MixerRotation,
			params,
		})
	}
	async mixerPerspective(
		params: MixerPerspectiveParameters
	): Promise<SendResult<CReturnType<Commands.MixerPerspective>>> {
		return this.executeCommand({
			command: Commands.MixerPerspective,
			params,
		})
	}
	async mixerMipmap(params: MixerMipmapParameters): Promise<SendResult<CReturnType<Commands.MixerMipmap>>> {
		return this.executeCommand({
			command: Commands.MixerMipmap,
			params,
		})
	}
	async mixerVolume(params: MixerVolumeParameters): Promise<SendResult<CReturnType<Commands.MixerVolume>>> {
		return this.executeCommand({
			command: Commands.MixerVolume,
			params,
		})
	}
	async mixerMastervolume(
		params: MixerMastervolumeParameters
	): Promise<SendResult<CReturnType<Commands.MixerMastervolume>>> {
		return this.executeCommand({
			command: Commands.MixerMastervolume,
			params,
		})
	}
	async mixerStraightAlphaOutput(
		params: MixerStraightAlphaOutputParameters
	): Promise<SendResult<CReturnType<Commands.MixerStraightAlphaOutput>>> {
		return this.executeCommand({
			command: Commands.MixerStraightAlphaOutput,
			params,
		})
	}
	async mixerGrid(params: MixerGridParameters): Promise<SendResult<CReturnType<Commands.MixerGrid>>> {
		return this.executeCommand({
			command: Commands.MixerGrid,
			params,
		})
	}
	async mixerCommit(params: MixerCommitParameters): Promise<SendResult<CReturnType<Commands.MixerCommit>>> {
		return this.executeCommand({
			command: Commands.MixerCommit,
			params,
		})
	}
	async mixerClear(params: MixerClearParameters): Promise<SendResult<CReturnType<Commands.MixerClear>>> {
		return this.executeCommand({
			command: Commands.MixerClear,
			params,
		})
	}
	async channelGrid(params: ChannelGridParameters = {}): Promise<SendResult<CReturnType<Commands.ChannelGrid>>> {
		return this.executeCommand({
			command: Commands.ChannelGrid,
			params,
		})
	}
	async thumbnailList(
		params: ThumbnailListParameters = {}
	): Promise<SendResult<CReturnType<Commands.ThumbnailList>>> {
		return this.executeCommand({
			command: Commands.ThumbnailList,
			params,
		})
	}
	async thumbnailRetrieve(
		params: ThumbnailRetrieveParameters
	): Promise<SendResult<CReturnType<Commands.ThumbnailRetrieve>>> {
		return this.executeCommand({
			command: Commands.ThumbnailRetrieve,
			params,
		})
	}
	async thumbnailGenerate(
		params: ThumbnailGenerateParameters
	): Promise<SendResult<CReturnType<Commands.ThumbnailGenerate>>> {
		return this.executeCommand({
			command: Commands.ThumbnailGenerate,
			params,
		})
	}
	async thumbnailGenerateAll(
		params: ThumbnailGenerateAllParameters = {}
	): Promise<SendResult<CReturnType<Commands.ThumbnailGenerateAll>>> {
		return this.executeCommand({
			command: Commands.ThumbnailGenerateAll,
			params,
		})
	}
	async cinf(params: CinfParameters): Promise<SendResult<CReturnType<Commands.Cinf>>> {
		return this.executeCommand({
			command: Commands.Cinf,
			params,
		})
	}
	async cls(params: ClsParameters = {}): Promise<SendResult<CReturnType<Commands.Cls>>> {
		return this.executeCommand({
			command: Commands.Cls,
			params,
		})
	}
	async fls(params: FlsParameters = {}): Promise<SendResult<CReturnType<Commands.Fls>>> {
		return this.executeCommand({
			command: Commands.Fls,
			params,
		})
	}
	async tls(params: TlsParameters = {}): Promise<SendResult<CReturnType<Commands.Tls>>> {
		return this.executeCommand({
			command: Commands.Tls,
			params,
		})
	}
	async version(params: VersionParameters = {}): Promise<SendResult<CReturnType<Commands.Version>>> {
		return this.executeCommand({
			command: Commands.Version,
			params,
		})
	}
	async info(params: InfoParameters): Promise<SendResult<CReturnType<Commands.Info>>> {
		return this.executeCommand({
			command: Commands.Info,
			params,
		})
	}
	async infoChannel(params: InfoChannelParameters): Promise<SendResult<CReturnType<Commands.InfoChannel>>> {
		return this.executeCommand({
			command: Commands.InfoChannel,
			params,
		})
	}
	async infoLayer(params: InfoLayerParameters): Promise<SendResult<CReturnType<Commands.InfoLayer>>> {
		return this.executeCommand({
			command: Commands.InfoLayer,
			params,
		})
	}
	async infoTemplate(params: InfoTemplateParameters): Promise<SendResult<CReturnType<Commands.InfoTemplate>>> {
		return this.executeCommand({
			command: Commands.InfoTemplate,
			params,
		})
	}
	async infoConfig(params: InfoConfigParameters = {}): Promise<SendResult<CReturnType<Commands.InfoConfig>>> {
		return this.executeCommand({
			command: Commands.InfoConfig,
			params,
		})
	}
	async infoPaths(params: InfoPathsParameters = {}): Promise<SendResult<CReturnType<Commands.InfoPaths>>> {
		return this.executeCommand({
			command: Commands.InfoPaths,
			params,
		})
	}
	async infoSystem(params: InfoSystemParameters = {}): Promise<SendResult<CReturnType<Commands.InfoSystem>>> {
		return this.executeCommand({
			command: Commands.InfoSystem,
			params,
		})
	}
	async infoServer(params: InfoServerParameters = {}): Promise<SendResult<CReturnType<Commands.InfoServer>>> {
		return this.executeCommand({
			command: Commands.InfoServer,
			params,
		})
	}
	async infoQueues(params: InfoQueuesParameters = {}): Promise<SendResult<CReturnType<Commands.InfoQueues>>> {
		return this.executeCommand({
			command: Commands.InfoQueues,
			params,
		})
	}
	async infoThreads(params: InfoThreadsParameters = {}): Promise<SendResult<CReturnType<Commands.InfoThreads>>> {
		return this.executeCommand({
			command: Commands.InfoThreads,
			params,
		})
	}
	async infoDelay(params: InfoDelayParameters): Promise<SendResult<CReturnType<Commands.InfoDelay>>> {
		return this.executeCommand({
			command: Commands.InfoDelay,
			params,
		})
	}
	async diag(params: DiagParameters = {}): Promise<SendResult<CReturnType<Commands.Diag>>> {
		return this.executeCommand({
			command: Commands.Diag,
			params,
		})
	}
	async glInfo(params: GlInfoParameters = {}): Promise<SendResult<CReturnType<Commands.GlInfo>>> {
		return this.executeCommand({
			command: Commands.GlInfo,
			params,
		})
	}
	async glGc(params: GlGcParameters = {}): Promise<SendResult<CReturnType<Commands.GlGc>>> {
		return this.executeCommand({
			command: Commands.GlGc,
			params,
		})
	}
	async bye(params: ByeParameters = {}): Promise<SendResult<CReturnType<Commands.Bye>>> {
		return this.executeCommand({
			command: Commands.Bye,
			params,
		})
	}
	async kill(params: KillParameters = {}): Promise<SendResult<CReturnType<Commands.Kill>>> {
		return this.executeCommand({
			command: Commands.Kill,
			params,
		})
	}
	async restart(params: RestartParameters = {}): Promise<SendResult<CReturnType<Commands.Restart>>> {
		return this.executeCommand({
			command: Commands.Restart,
			params,
		})
	}
}
