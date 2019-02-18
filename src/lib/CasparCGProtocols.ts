// Command NS
import { Command as CommandNS } from './AbstractCommand'
import IAMCPCommand = CommandNS.IAMCPCommand
import { Enum as ServerStateEnum } from './ServerStateEnum'
import { Param as ParamNS } from './ParamSignature'
import TemplateData = ParamNS.TemplateData

/**
 * CasparCG Protocols
 */
export namespace CasparCGProtocols {

	/**
	 * CasparCG Protocol version 2.1
	 */
	export namespace v2_1 {
		/**
		 * AMCP Media-commands
		 */
		export interface IVideo {
			loadbg(channel: number, layer: number, clip: string, loop?: boolean, transition?: ServerStateEnum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: ServerStateEnum.Ease | string | number, transitionDirectionOrOverlay?: ServerStateEnum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): Promise<IAMCPCommand>
			loadbgAuto(channel: number, layer: number, clip: string, loop?: boolean, transition?: ServerStateEnum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: ServerStateEnum.Ease | string | number, transitionDirectionOrOverlay?: ServerStateEnum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand>
			load(channel: number, layer: number, clip: string, loop?: boolean, transition?: ServerStateEnum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: ServerStateEnum.Ease | string | number, transitionDirectionOrOverlay?: ServerStateEnum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand>
			play(channel: number, layer?: number, clip?: string, loop?: boolean, transition?: ServerStateEnum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: ServerStateEnum.Ease | string | number, transitionDirectionOrOverlay?: ServerStateEnum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand>
			pause(channel: number, layer?: number): Promise<IAMCPCommand>
			resume(channel: number, layer?: number): Promise<IAMCPCommand>
			stop(channel: number, layer?: number): Promise<IAMCPCommand>
		}

		/**
		 * AMCP In/Out-commands
		 */
		export interface IInputOutput {
			loadDecklinkBg(channel: number, layer: number, device: number, transition?: ServerStateEnum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: ServerStateEnum.Ease | string | number, transitionDirectionOrOverlay?: ServerStateEnum.Direction | string, length?: number, filter?: string, format?: ServerStateEnum.ChannelFormat | string, channelLayout?: ServerStateEnum.ChannelLayout | string, auto?: boolean | number | string): Promise<IAMCPCommand>
			loadDecklinkBgAuto(channel: number, layer: number, device: number, transition?: ServerStateEnum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: ServerStateEnum.Ease | string | number, transitionDirectionOrOverlay?: ServerStateEnum.Direction | string, length?: number, filter?: string, format?: ServerStateEnum.ChannelFormat | string, channelLayout?: ServerStateEnum.ChannelLayout | string): Promise<IAMCPCommand>
			loadDecklink(channel: number, layer: number, device: number, transition?: ServerStateEnum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: ServerStateEnum.Ease | string | number, transitionDirectionOrOverlay?: ServerStateEnum.Direction | string, length?: number, filter?: string, format?: ServerStateEnum.ChannelFormat | string, channelLayout?: ServerStateEnum.ChannelLayout | string): Promise<IAMCPCommand>
			playDecklink(channel: number, layer?: number, device?: number, transition?: ServerStateEnum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: ServerStateEnum.Ease | string | number, transitionDirectionOrOverlay?: ServerStateEnum.Direction | string, length?: number, filter?: string, format?: ServerStateEnum.ChannelFormat | string, channelLayout?: ServerStateEnum.ChannelLayout | string): Promise<IAMCPCommand>
			loadHtmlPageBg(channel: number, layer: number, url: string, transition?: ServerStateEnum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: ServerStateEnum.Ease | string | number, transitionDirectionOrOverlay?: ServerStateEnum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): Promise<IAMCPCommand>
			loadHtmlPageBgAuto(channel: number, layer: number, url: string, transition?: ServerStateEnum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: ServerStateEnum.Ease | string | number, transitionDirectionOrOverlay?: ServerStateEnum.Direction | string): Promise<IAMCPCommand>
			loadHtmlPage(channel: number, layer: number, url: string, transition?: ServerStateEnum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: ServerStateEnum.Ease | string | number, transitionDirectionOrOverlay?: ServerStateEnum.Direction | string): Promise<IAMCPCommand>
			playHtmlPage(channel: number, layer?: number, url?: string, transition?: ServerStateEnum.Transition | string, transitionDurationOrMaskFile?: number | string, transitionEasingOrStingDuration?: ServerStateEnum.Ease | string | number, transitionDirectionOrOverlay?: ServerStateEnum.Direction | string): Promise<IAMCPCommand>
		}

		/**
		 * AMCP Template-commands
		 */
		export interface ICG {
			cgAdd(channel: number, layer: number, flashLayer: number, templateName: string, playOnLoad: boolean | number | string, data?: TemplateData): Promise<IAMCPCommand>
			cgPlay(channel: number, layer: number, flashLayer: number): Promise<IAMCPCommand>
			cgStop(channel: number, layer: number, flashLayer: number): Promise<IAMCPCommand>
			cgNext(channel: number, layer: number, flashLayer: number): Promise<IAMCPCommand>
			cgRemove(channel: number, layer: number, flashLayer: number): Promise<IAMCPCommand>
			cgClear(channel: number, layer?: number): Promise<IAMCPCommand>
			cgUpdate(channel: number, layer: number, flashLayer: number, data: TemplateData): Promise<IAMCPCommand>
			cgInvoke(channel: number, layer: number, flashLayer: number, methodName: string): Promise<IAMCPCommand>
		}

		/**
		 * AMCP Mixer-commands
		 */
		export interface IMixer {
			mixerKeyer(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>
			mixerKeyerDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand>
			getMixerStatusKeyer(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerChroma(channel: number, layer?: number, keyer?: ServerStateEnum.Chroma | string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerChromaDeferred(channel: number, layer?: number, keyer?: ServerStateEnum.Chroma | string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusChroma(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerBlend(channel: number, layer?: number, blendmode?: ServerStateEnum.BlendMode | string, defer?: boolean): Promise<IAMCPCommand>
			mixerBlendDeferred(channel: number, layer?: number, blendmode?: ServerStateEnum.BlendMode | string): Promise<IAMCPCommand>
			getMixerStatusBlend(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerOpacity(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerOpacityDeferred(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusOpacity(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerBrightness(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerBrightnessDeferred(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusBrightness(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerSaturation(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerSaturationDeferred(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusSaturation(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerBrightness(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerContrastDeferred(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusContrast(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerLevels(channel: number, layer?: number, minInput?: number, maxInput?: number, gamma?: number, minOutput?: number, maxOutput?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerLevelsDeferred(channel: number, layer?: number, minInput?: number, maxInput?: number, gamma?: number, minOutput?: number, maxOutput?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusLevels(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerFill(channel: number, layer?: number, x?: number, y?: number, xScale?: number, yScale?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerFillDeferred(channel: number, layer?: number, x?: number, y?: number, xScale?: number, yScale?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusFill(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerClip(channel: number, layer?: number, x?: number, y?: number, width?: number, height?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerClipDeferred(channel: number, layer?: number, x?: number, y?: number, width?: number, height?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusClip(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerAnchor(channel: number, layer?: number, x?: number, y?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerAnchorDeferred(channel: number, layer?: number, x?: number, y?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusAnchor(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerCrop(channel: number, layer?: number, left?: number, top?: number, right?: number, bottom?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerCropDeferred(channel: number, layer?: number, left?: number, top?: number, right?: number, bottom?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusCrop(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerRotation(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerRotationDeferred(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusRotation(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerPerspective(channel: number, layer?: number, topLeftX?: number, topLeftY?: number, topRightX?: number, topRightY?: number, bottomRightX?: number, bottomRightY?: number, bottomLeftX?: number, bottomLeftY?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerPerspectiveDeferred(channel: number, layer?: number, topLeftX?: number, topLeftY?: number, topRightX?: number, topRightY?: number, bottomRightX?: number, bottomRightY?: number, bottomLeftX?: number, bottomLeftY?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusPerspective(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerMipmap(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>
			mixerMipmapDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand>
			getMixerStatusMipmap(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerVolume(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerVolumeDeferred(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusVolume(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerMastervolume(channel: number, mastervolume?: number, defer?: boolean): Promise<IAMCPCommand>
			mixerMastervolumeDeferred(channel: number, mastervolume?: number): Promise<IAMCPCommand>
			getMixerStatusMastervolume(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerStraightAlphaOutput(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>
			mixerStraightAlphaOutputDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand>
			getMixerStatusStraightAlphaOutput(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerGridDeferred(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: ServerStateEnum.Ease | string): Promise<IAMCPCommand>
			mixerCommit(channel: number): Promise<IAMCPCommand>
			mixerClear(channel: number, layer?: number): Promise<IAMCPCommand>
		}

		/**
		 * AMCP Channel-commands
		 */
		export interface IChannel {
			clear(channel: number, layer?: number): Promise<IAMCPCommand>
			//// call(channel: number, layer: number): Promise<IAMCPCommand>;
			//// swap(): Promise<IAMCPCommand>;
			//// add(channel: number): Promise<IAMCPCommand>;
			print(channel: number): Promise<IAMCPCommand>
			//// set(channel: number): Promise<IAMCPCommand>;
			lock(channel: number, action: ServerStateEnum.Lock | string, lockPhrase?: string): Promise<IAMCPCommand>
			channelGrid(): Promise<IAMCPCommand>
			glGC(): Promise<IAMCPCommand>
			addDecklink(channel: number, device: number, id?: number): Promise<IAMCPCommand>
			addImage(channel: number, fileName: string, id?: number): Promise<IAMCPCommand>
			addFile(channel: number, fileName: string, id?: number): Promise<IAMCPCommand>
			addStream(channel: number, uri: string, params: string, id?: number): Promise<IAMCPCommand>
			remove(channel: number, id: number): Promise<IAMCPCommand>
			removeDecklink(channel: number, device: number): Promise<IAMCPCommand>
			removeImage(channel: number, fileName: string): Promise<IAMCPCommand>
			removeFile(channel: number, fileName: string): Promise<IAMCPCommand>
			removeStream(channel: number, uri: string): Promise<IAMCPCommand>
		}

		/**
		 * AMCP Template Data-commands
		 */
		export interface IData {
			dataStore(fileName: string, data: TemplateData): Promise<IAMCPCommand>
			dataRetrieve(fileName: string): Promise<IAMCPCommand>
			dataList(): Promise<IAMCPCommand>
			dataRemove(fileName: string): Promise<IAMCPCommand>
		}

		/**
		 * AMCP Thumbnail-commands
		 */
		export interface IThumbnail {
			thumbnailList(subFolder?: string): Promise<IAMCPCommand>
			thumbnailRetrieve(fileName: string): Promise<IAMCPCommand>
			thumbnailGenerate(fileName: string): Promise<IAMCPCommand>
			thumbnailGenerateAll(): Promise<IAMCPCommand>
		}

		/**
		 * AMCP Query-commands
		 */
		export interface IQuery {
			cinf(fileName: string): Promise<IAMCPCommand>
			cls(subFolder?: string): Promise<IAMCPCommand>
			fls(): Promise<IAMCPCommand>
			tls(subFolder?: string): Promise<IAMCPCommand>
			version(component?: ServerStateEnum.Version): Promise<IAMCPCommand>
			info(channel?: number, layer?: number): Promise<IAMCPCommand>
			infoTemplate(template: string): Promise<IAMCPCommand>
			infoConfig(): Promise<IAMCPCommand>
			infoPaths(): Promise<IAMCPCommand>
			infoSystem(): Promise<IAMCPCommand>
			infoServer(): Promise<IAMCPCommand>
			infoQueues(): Promise<IAMCPCommand>
			infoThreads(): Promise<IAMCPCommand>
			infoDelay(channel: number, layer?: number): Promise<IAMCPCommand>
			cgInfo(channel: number, layer?: number, flashLayer?: number): Promise<IAMCPCommand>
			templateHostInfo(channel: number, layer?: number): Promise<IAMCPCommand>
			glInfo(): Promise<IAMCPCommand>
			logLevel(level: ServerStateEnum.LogLevel | string): Promise<IAMCPCommand>
			logCategory(category: ServerStateEnum.LogCategory | string, enabled: boolean): Promise<IAMCPCommand>
			logCalltrace(enabled: boolean): Promise<IAMCPCommand>
			logCommunication(enabled: boolean): Promise<IAMCPCommand>
			diag(): Promise<IAMCPCommand>
			help(command?: ServerStateEnum.Command | string): Promise<IAMCPCommand>
			getCommands(): Promise<IAMCPCommand>
			helpProducer(producer?: ServerStateEnum.Producer | string): Promise<IAMCPCommand>
			getProducers(): Promise<IAMCPCommand>
			helpConsumer(consumer?: ServerStateEnum.Consumer | string): Promise<IAMCPCommand>
			getConsumers(): Promise<IAMCPCommand>
		}

		/**
		 * AMCP Operation-commands
		 */
		export interface IOperation {
			bye(): Promise<IAMCPCommand>
			kill(): Promise<IAMCPCommand>
			restart(): Promise<IAMCPCommand>
		}

		export interface AMCP extends IVideo, IInputOutput, ICG, IMixer, IChannel, IData, IThumbnail, IQuery, IOperation {
		}
	}
}
