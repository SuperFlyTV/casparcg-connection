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
	PingParameters,
	BeginParameters,
	CommitParameters,
	DiscardParameters,
	CustomCommandParameters,
} from './parameters'

export class CasparCG extends BasicCasparCGAPI {
	async loadbg(params: LoadbgParameters): Promise<APIRequest<Commands.Loadbg>> {
		return this.executeCommand({
			command: Commands.Loadbg,
			params,
		})
	}
	async load(params: LoadParameters): Promise<APIRequest<Commands.Load>> {
		return this.executeCommand({
			command: Commands.Load,
			params,
		})
	}
	async play(params: PlayParameters): Promise<APIRequest<Commands.Play>> {
		return this.executeCommand({
			command: Commands.Play,
			params,
		})
	}
	async pause(params: PauseParameters): Promise<APIRequest<Commands.Pause>> {
		return this.executeCommand({
			command: Commands.Pause,
			params,
		})
	}
	async resume(params: ResumeParameters): Promise<APIRequest<Commands.Resume>> {
		return this.executeCommand({
			command: Commands.Resume,
			params,
		})
	}
	async stop(params: StopParameters): Promise<APIRequest<Commands.Stop>> {
		return this.executeCommand({
			command: Commands.Stop,
			params,
		})
	}
	async clear(params: ClearParameters): Promise<APIRequest<Commands.Clear>> {
		return this.executeCommand({
			command: Commands.Clear,
			params,
		})
	}
	async call(params: CallParameters): Promise<APIRequest<Commands.Call>> {
		return this.executeCommand({
			command: Commands.Call,
			params,
		})
	}
	async swap(params: SwapParameters): Promise<APIRequest<Commands.Swap>> {
		return this.executeCommand({
			command: Commands.Swap,
			params,
		})
	}
	async add(params: AddParameters): Promise<APIRequest<Commands.Add>> {
		return this.executeCommand({
			command: Commands.Add,
			params,
		})
	}
	async remove(params: RemoveParameters): Promise<APIRequest<Commands.Remove>> {
		return this.executeCommand({
			command: Commands.Remove,
			params,
		})
	}
	async print(params: PrintParameters): Promise<APIRequest<Commands.Print>> {
		return this.executeCommand({
			command: Commands.Print,
			params,
		})
	}
	async logLevel(params: LogLevelParameters): Promise<APIRequest<Commands.LogLevel>> {
		return this.executeCommand({
			command: Commands.LogLevel,
			params,
		})
	}
	async logCategory(params: LogCategoryParameters): Promise<APIRequest<Commands.LogCategory>> {
		return this.executeCommand({
			command: Commands.LogCategory,
			params,
		})
	}
	async set(params: SetParameters): Promise<APIRequest<Commands.Set>> {
		return this.executeCommand({
			command: Commands.Set,
			params,
		})
	}
	async lock(params: LockParameters): Promise<APIRequest<Commands.Lock>> {
		return this.executeCommand({
			command: Commands.Lock,
			params,
		})
	}
	async dataStore(params: DataStoreParameters): Promise<APIRequest<Commands.DataStore>> {
		return this.executeCommand({
			command: Commands.DataStore,
			params,
		})
	}
	async dataRetrieve(params: DataRetrieveParameters): Promise<APIRequest<Commands.DataRetrieve>> {
		return this.executeCommand({
			command: Commands.DataRetrieve,
			params,
		})
	}
	async dataList(params: DataListParameters): Promise<APIRequest<Commands.DataList>> {
		return this.executeCommand({
			command: Commands.DataList,
			params,
		})
	}
	async dataRemove(params: DataRemoveParameters): Promise<APIRequest<Commands.DataRemove>> {
		return this.executeCommand({
			command: Commands.DataRemove,
			params,
		})
	}
	async cgAdd(params: CgAddParameters): Promise<APIRequest<Commands.CgAdd>> {
		return this.executeCommand({
			command: Commands.CgAdd,
			params,
		})
	}
	async cgPlay(params: CgPlayParameters): Promise<APIRequest<Commands.CgPlay>> {
		return this.executeCommand({
			command: Commands.CgPlay,
			params,
		})
	}
	async cgStop(params: CgStopParameters): Promise<APIRequest<Commands.CgStop>> {
		return this.executeCommand({
			command: Commands.CgStop,
			params,
		})
	}
	async cgNext(params: CgNextParameters): Promise<APIRequest<Commands.CgNext>> {
		return this.executeCommand({
			command: Commands.CgNext,
			params,
		})
	}
	async cgRemove(params: CgRemoveParameters): Promise<APIRequest<Commands.CgRemove>> {
		return this.executeCommand({
			command: Commands.CgRemove,
			params,
		})
	}
	async cgClear(params: CgClearParameters): Promise<APIRequest<Commands.CgClear>> {
		return this.executeCommand({
			command: Commands.CgClear,
			params,
		})
	}
	async cgUpdate(params: CgUpdateParameters): Promise<APIRequest<Commands.CgUpdate>> {
		return this.executeCommand({
			command: Commands.CgUpdate,
			params,
		})
	}
	async cgInvoke(params: CgInvokeParameters): Promise<APIRequest<Commands.CgInvoke>> {
		return this.executeCommand({
			command: Commands.CgInvoke,
			params,
		})
	}
	async cgInfo(params: CgInfoParameters): Promise<APIRequest<Commands.CgInfo>> {
		return this.executeCommand({
			command: Commands.CgInfo,
			params,
		})
	}
	async mixerKeyer(params: MixerKeyerParameters): Promise<APIRequest<Commands.MixerKeyer>> {
		return this.executeCommand({
			command: Commands.MixerKeyer,
			params,
		})
	}
	async mixerChroma(params: MixerChromaParameters): Promise<APIRequest<Commands.MixerChroma>> {
		return this.executeCommand({
			command: Commands.MixerChroma,
			params,
		})
	}
	async mixerBlend(params: MixerBlendParameters): Promise<APIRequest<Commands.MixerBlend>> {
		return this.executeCommand({
			command: Commands.MixerBlend,
			params,
		})
	}
	async mixerInvert(params: MixerInvertParameters): Promise<APIRequest<Commands.MixerInvert>> {
		return this.executeCommand({
			command: Commands.MixerInvert,
			params,
		})
	}
	async mixerOpacity(params: MixerOpacityParameters): Promise<APIRequest<Commands.MixerOpacity>> {
		return this.executeCommand({
			command: Commands.MixerOpacity,
			params,
		})
	}
	async mixerBrightness(params: MixerBrightnessParameters): Promise<APIRequest<Commands.MixerBrightness>> {
		return this.executeCommand({
			command: Commands.MixerBrightness,
			params,
		})
	}
	async mixerSaturation(params: MixerSaturationParameters): Promise<APIRequest<Commands.MixerSaturation>> {
		return this.executeCommand({
			command: Commands.MixerSaturation,
			params,
		})
	}
	async mixerContrast(params: MixerContrastParameters): Promise<APIRequest<Commands.MixerContrast>> {
		return this.executeCommand({
			command: Commands.MixerContrast,
			params,
		})
	}
	async mixerLevels(params: MixerLevelsParameters): Promise<APIRequest<Commands.MixerLevels>> {
		return this.executeCommand({
			command: Commands.MixerLevels,
			params,
		})
	}
	async mixerFill(params: MixerFillParameters): Promise<APIRequest<Commands.MixerFill>> {
		return this.executeCommand({
			command: Commands.MixerFill,
			params,
		})
	}
	async mixerClip(params: MixerClipParameters): Promise<APIRequest<Commands.MixerClip>> {
		return this.executeCommand({
			command: Commands.MixerClip,
			params,
		})
	}
	async mixerAnchor(params: MixerAnchorParameters): Promise<APIRequest<Commands.MixerAnchor>> {
		return this.executeCommand({
			command: Commands.MixerAnchor,
			params,
		})
	}
	async mixerCrop(params: MixerCropParameters): Promise<APIRequest<Commands.MixerCrop>> {
		return this.executeCommand({
			command: Commands.MixerCrop,
			params,
		})
	}
	async mixerRotation(params: MixerRotationParameters): Promise<APIRequest<Commands.MixerRotation>> {
		return this.executeCommand({
			command: Commands.MixerRotation,
			params,
		})
	}
	async mixerPerspective(params: MixerPerspectiveParameters): Promise<APIRequest<Commands.MixerPerspective>> {
		return this.executeCommand({
			command: Commands.MixerPerspective,
			params,
		})
	}
	async mixerMipmap(params: MixerMipmapParameters): Promise<APIRequest<Commands.MixerMipmap>> {
		return this.executeCommand({
			command: Commands.MixerMipmap,
			params,
		})
	}
	async mixerVolume(params: MixerVolumeParameters): Promise<APIRequest<Commands.MixerVolume>> {
		return this.executeCommand({
			command: Commands.MixerVolume,
			params,
		})
	}
	async mixerMastervolume(params: MixerMastervolumeParameters): Promise<APIRequest<Commands.MixerMastervolume>> {
		return this.executeCommand({
			command: Commands.MixerMastervolume,
			params,
		})
	}
	async mixerStraightAlphaOutput(
		params: MixerStraightAlphaOutputParameters
	): Promise<APIRequest<Commands.MixerStraightAlphaOutput>> {
		return this.executeCommand({
			command: Commands.MixerStraightAlphaOutput,
			params,
		})
	}
	async mixerGrid(params: MixerGridParameters): Promise<APIRequest<Commands.MixerGrid>> {
		return this.executeCommand({
			command: Commands.MixerGrid,
			params,
		})
	}
	async mixerCommit(params: MixerCommitParameters): Promise<APIRequest<Commands.MixerCommit>> {
		return this.executeCommand({
			command: Commands.MixerCommit,
			params,
		})
	}
	async mixerClear(params: MixerClearParameters): Promise<APIRequest<Commands.MixerClear>> {
		return this.executeCommand({
			command: Commands.MixerClear,
			params,
		})
	}
	async channelGrid(params: ChannelGridParameters = {}): Promise<APIRequest<Commands.ChannelGrid>> {
		return this.executeCommand({
			command: Commands.ChannelGrid,
			params,
		})
	}
	async thumbnailList(params: ThumbnailListParameters = {}): Promise<APIRequest<Commands.ThumbnailList>> {
		return this.executeCommand({
			command: Commands.ThumbnailList,
			params,
		})
	}
	async thumbnailRetrieve(params: ThumbnailRetrieveParameters): Promise<APIRequest<Commands.ThumbnailRetrieve>> {
		return this.executeCommand({
			command: Commands.ThumbnailRetrieve,
			params,
		})
	}
	async thumbnailGenerate(params: ThumbnailGenerateParameters): Promise<APIRequest<Commands.ThumbnailGenerate>> {
		return this.executeCommand({
			command: Commands.ThumbnailGenerate,
			params,
		})
	}
	async thumbnailGenerateAll(
		params: ThumbnailGenerateAllParameters = {}
	): Promise<APIRequest<Commands.ThumbnailGenerateAll>> {
		return this.executeCommand({
			command: Commands.ThumbnailGenerateAll,
			params,
		})
	}
	async cinf(params: CinfParameters): Promise<APIRequest<Commands.Cinf>> {
		return this.executeCommand({
			command: Commands.Cinf,
			params,
		})
	}
	async cls(params: ClsParameters = {}): Promise<APIRequest<Commands.Cls>> {
		return this.executeCommand({
			command: Commands.Cls,
			params,
		})
	}
	async fls(params: FlsParameters = {}): Promise<APIRequest<Commands.Fls>> {
		return this.executeCommand({
			command: Commands.Fls,
			params,
		})
	}
	async tls(params: TlsParameters = {}): Promise<APIRequest<Commands.Tls>> {
		return this.executeCommand({
			command: Commands.Tls,
			params,
		})
	}
	async version(params: VersionParameters = {}): Promise<APIRequest<Commands.Version>> {
		return this.executeCommand({
			command: Commands.Version,
			params,
		})
	}
	async info(params: InfoParameters): Promise<APIRequest<Commands.Info>> {
		return this.executeCommand({
			command: Commands.Info,
			params,
		})
	}
	async infoChannel(params: InfoChannelParameters): Promise<APIRequest<Commands.InfoChannel>> {
		return this.executeCommand({
			command: Commands.InfoChannel,
			params,
		})
	}
	async infoLayer(params: InfoLayerParameters): Promise<APIRequest<Commands.InfoLayer>> {
		return this.executeCommand({
			command: Commands.InfoLayer,
			params,
		})
	}
	async infoTemplate(params: InfoTemplateParameters): Promise<APIRequest<Commands.InfoTemplate>> {
		return this.executeCommand({
			command: Commands.InfoTemplate,
			params,
		})
	}
	async infoConfig(params: InfoConfigParameters = {}): Promise<APIRequest<Commands.InfoConfig>> {
		return this.executeCommand({
			command: Commands.InfoConfig,
			params,
		})
	}
	async infoPaths(params: InfoPathsParameters = {}): Promise<APIRequest<Commands.InfoPaths>> {
		return this.executeCommand({
			command: Commands.InfoPaths,
			params,
		})
	}
	async infoSystem(params: InfoSystemParameters = {}): Promise<APIRequest<Commands.InfoSystem>> {
		return this.executeCommand({
			command: Commands.InfoSystem,
			params,
		})
	}
	async infoServer(params: InfoServerParameters = {}): Promise<APIRequest<Commands.InfoServer>> {
		return this.executeCommand({
			command: Commands.InfoServer,
			params,
		})
	}
	async infoQueues(params: InfoQueuesParameters = {}): Promise<APIRequest<Commands.InfoQueues>> {
		return this.executeCommand({
			command: Commands.InfoQueues,
			params,
		})
	}
	async infoThreads(params: InfoThreadsParameters = {}): Promise<APIRequest<Commands.InfoThreads>> {
		return this.executeCommand({
			command: Commands.InfoThreads,
			params,
		})
	}
	async infoDelay(params: InfoDelayParameters): Promise<APIRequest<Commands.InfoDelay>> {
		return this.executeCommand({
			command: Commands.InfoDelay,
			params,
		})
	}
	async diag(params: DiagParameters = {}): Promise<APIRequest<Commands.Diag>> {
		return this.executeCommand({
			command: Commands.Diag,
			params,
		})
	}
	async glInfo(params: GlInfoParameters = {}): Promise<APIRequest<Commands.GlInfo>> {
		return this.executeCommand({
			command: Commands.GlInfo,
			params,
		})
	}
	async glGc(params: GlGcParameters = {}): Promise<APIRequest<Commands.GlGc>> {
		return this.executeCommand({
			command: Commands.GlGc,
			params,
		})
	}
	async bye(params: ByeParameters = {}): Promise<APIRequest<Commands.Bye>> {
		return this.executeCommand({
			command: Commands.Bye,
			params,
		})
	}
	async kill(params: KillParameters = {}): Promise<APIRequest<Commands.Kill>> {
		return this.executeCommand({
			command: Commands.Kill,
			params,
		})
	}
	async restart(params: RestartParameters = {}): Promise<APIRequest<Commands.Restart>> {
		return this.executeCommand({
			command: Commands.Restart,
			params,
		})
	}
	async ping(params: PingParameters = {}): Promise<APIRequest<Commands.Ping>> {
		return this.executeCommand({
			command: Commands.Ping,
			params,
		})
	}
	async begin(params: BeginParameters = {}): Promise<APIRequest<Commands.Begin>> {
		return this.executeCommand({
			command: Commands.Begin,
			params,
		})
	}
	async commit(params: CommitParameters = {}): Promise<APIRequest<Commands.Commit>> {
		return this.executeCommand({
			command: Commands.Commit,
			params,
		})
	}
	async discard(params: DiscardParameters = {}): Promise<APIRequest<Commands.Discard>> {
		return this.executeCommand({
			command: Commands.Discard,
			params,
		})
	}
	async sendCustom(params: CustomCommandParameters): Promise<APIRequest<Commands.Custom>> {
		return this.executeCommand({
			command: Commands.Custom,
			params,
		})
	}
}
export type APIRequest<C extends Commands> = SendResult<CReturnType<C>>
