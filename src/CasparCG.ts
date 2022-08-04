import { BasicCasparCGAPI, Request } from './api'
import { Commands } from './commands'
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
} from './parameters'

export class CasparCG extends BasicCasparCGAPI {
	async loadbg(params: LoadbgParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Loadbg,
			params,
		})
	}
	async load(params: LoadParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Load,
			params,
		})
	}
	async play(params: PlayParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Play,
			params,
		})
	}
	async pause(params: PauseParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Pause,
			params,
		})
	}
	async resume(params: ResumeParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Resume,
			params,
		})
	}
	async stop(params: StopParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Stop,
			params,
		})
	}
	async clear(params: ClearParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Clear,
			params,
		})
	}
	async call(params: CallParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Call,
			params,
		})
	}
	async swap(params: SwapParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Swap,
			params,
		})
	}
	async add(params: AddParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Add,
			params,
		})
	}
	async remove(params: RemoveParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Remove,
			params,
		})
	}
	async print(params: PrintParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Print,
			params,
		})
	}
	async logLevel(params: LogLevelParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.LogLevel,
			params,
		})
	}
	async logCategory(params: LogCategoryParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.LogCategory,
			params,
		})
	}
	async set(params: SetParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Set,
			params,
		})
	}
	async lock(params: LockParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Lock,
			params,
		})
	}
	async dataStore(params: DataStoreParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.DataStore,
			params,
		})
	}
	async dataRetrieve(params: DataRetrieveParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.DataRetrieve,
			params,
		})
	}
	async dataList(params: DataListParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.DataList,
			params,
		})
	}
	async dataRemove(params: DataRemoveParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.DataRemove,
			params,
		})
	}
	async cgAdd(params: CgAddParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.CgAdd,
			params,
		})
	}
	async cgPlay(params: CgPlayParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.CgPlay,
			params,
		})
	}
	async cgStop(params: CgStopParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.CgStop,
			params,
		})
	}
	async cgNext(params: CgNextParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.CgNext,
			params,
		})
	}
	async cgRemove(params: CgRemoveParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.CgRemove,
			params,
		})
	}
	async cgClear(params: CgClearParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.CgClear,
			params,
		})
	}
	async cgUpdate(params: CgUpdateParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.CgUpdate,
			params,
		})
	}
	async cgInvoke(params: CgInvokeParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.CgInvoke,
			params,
		})
	}
	async cgInfo(params: CgInfoParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.CgInfo,
			params,
		})
	}
	async mixerKeyer(params: MixerKeyerParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerKeyer,
			params,
		})
	}
	async mixerChroma(params: MixerChromaParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerChroma,
			params,
		})
	}
	async mixerBlend(params: MixerBlendParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerBlend,
			params,
		})
	}
	async mixerInvert(params: MixerInvertParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerInvert,
			params,
		})
	}
	async mixerOpacity(params: MixerOpacityParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerOpacity,
			params,
		})
	}
	async mixerBrightness(params: MixerBrightnessParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerBrightness,
			params,
		})
	}
	async mixerSaturation(params: MixerSaturationParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerSaturation,
			params,
		})
	}
	async mixerContrast(params: MixerContrastParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerContrast,
			params,
		})
	}
	async mixerLevels(params: MixerLevelsParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerLevels,
			params,
		})
	}
	async mixerFill(params: MixerFillParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerFill,
			params,
		})
	}
	async mixerClip(params: MixerClipParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerClip,
			params,
		})
	}
	async mixerAnchor(params: MixerAnchorParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerAnchor,
			params,
		})
	}
	async mixerCrop(params: MixerCropParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerCrop,
			params,
		})
	}
	async mixerRotation(params: MixerRotationParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerRotation,
			params,
		})
	}
	async mixerPerspective(params: MixerPerspectiveParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerPerspective,
			params,
		})
	}
	async mixerMipmap(params: MixerMipmapParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerMipmap,
			params,
		})
	}
	async mixerVolume(params: MixerVolumeParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerVolume,
			params,
		})
	}
	async mixerMastervolume(params: MixerMastervolumeParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerMastervolume,
			params,
		})
	}
	async mixerStraightAlphaOutput(params: MixerStraightAlphaOutputParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerStraightAlphaOutput,
			params,
		})
	}
	async mixerGrid(params: MixerGridParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerGrid,
			params,
		})
	}
	async mixerCommit(params: MixerCommitParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerCommit,
			params,
		})
	}
	async mixerClear(params: MixerClearParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.MixerClear,
			params,
		})
	}
	async channelGrid(params: ChannelGridParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.ChannelGrid,
			params,
		})
	}
	async thumbnailList(params: ThumbnailListParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.ThumbnailList,
			params,
		})
	}
	async thumbnailRetrieve(params: ThumbnailRetrieveParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.ThumbnailRetrieve,
			params,
		})
	}
	async thumbnailGenerate(params: ThumbnailGenerateParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.ThumbnailGenerate,
			params,
		})
	}
	async thumbnailGenerateAll(params: ThumbnailGenerateAllParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.ThumbnailGenerateAll,
			params,
		})
	}
	async cinf(params: CinfParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Cinf,
			params,
		})
	}
	async cls(params: ClsParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Cls,
			params,
		})
	}
	async fls(params: FlsParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.Fls,
			params,
		})
	}
	async tls(params: TlsParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Tls,
			params,
		})
	}
	async version(params: VersionParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.Version,
			params,
		})
	}
	async info(params: InfoParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.Info,
			params,
		})
	}
	async infoTemplate(params: InfoTemplateParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.InfoTemplate,
			params,
		})
	}
	async infoConfig(params: InfoConfigParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.InfoConfig,
			params,
		})
	}
	async infoPaths(params: InfoPathsParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.InfoPaths,
			params,
		})
	}
	async infoSystem(params: InfoSystemParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.InfoSystem,
			params,
		})
	}
	async infoServer(params: InfoServerParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.InfoServer,
			params,
		})
	}
	async infoQueues(params: InfoQueuesParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.InfoQueues,
			params,
		})
	}
	async infoThreads(params: InfoThreadsParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.InfoThreads,
			params,
		})
	}
	async infoDelay(params: InfoDelayParameters): Promise<Request> {
		return this.executeCommand({
			command: Commands.InfoDelay,
			params,
		})
	}
	async diag(params: DiagParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.Diag,
			params,
		})
	}
	async glInfo(params: GlInfoParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.GlInfo,
			params,
		})
	}
	async glGc(params: GlGcParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.GlGc,
			params,
		})
	}
	async bye(params: ByeParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.Bye,
			params,
		})
	}
	async kill(params: KillParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.Kill,
			params,
		})
	}
	async restart(params: RestartParameters = {}): Promise<Request> {
		return this.executeCommand({
			command: Commands.Restart,
			params,
		})
	}
}
