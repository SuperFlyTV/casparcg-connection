import { EventEmitter } from 'events'
import { CasparCGSocket } from './lib/CasparCGSocket'
import { AMCP, AMCPUtil as AMCPUtilNS } from './lib/AMCP'
// AMCPUtilNS
import CasparCGSocketResponse = AMCPUtilNS.CasparCGSocketResponse
import { Enum } from './lib/ServerStateEnum'
import { IConnectionOptions, ConnectionOptions, Options as OptionsNS } from './lib/AMCPConnectionOptions'
// Options NS
import QueueMode = OptionsNS.QueueMode
import CasparCGVersion = OptionsNS.CasparCGVersion
// Command NS
import { Command as CommandNS } from './lib/AbstractCommand'
import IAMCPCommand = CommandNS.IAMCPCommand
import isIAMCPCommand = CommandNS.isIAMCPCommand
import IAMCPStatus = CommandNS.IAMCPStatus
import AMCPResponse = CommandNS.AMCPResponse
// Param NS
import { Param as ParamNS } from './lib/ParamSignature'
import Param = ParamNS.Param
import TemplateData = ParamNS.TemplateData
// Event NS
import { CasparCGSocketStatusEvent, CasparCGSocketCommandEvent, CasparCGSocketResponseEvent, LogEvent, SocketStatusOptions } from './lib/event/Events'
// Callback NS
import { Callback as CallbackNS } from './lib/global/Callback'
import IBooleanCallback = CallbackNS.IBooleanCallback
import IErrorCallback = CallbackNS.IErrorCallback
import IStringCallback = CallbackNS.IStringCallback
import ISocketStatusCallback = CallbackNS.ISocketStatusCallback
// Config NS
import { Config as ConfigNS } from './lib/Config'
import CasparCGConfig = ConfigNS.Intermediate.CasparCGConfig
// Response NS
import { Response as ResponseNS } from './lib/ResponseParsers'
import CasparCGPaths = ResponseNS.CasparCGPaths

export enum Priority {
	LOW = 0,
	NORMAL = 1,
	HIGH = 2
}

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
			loadbg(channel: number, layer: number, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): Promise<IAMCPCommand>
			loadbgAuto(channel: number, layer: number, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand>
			load(channel: number, layer: number, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand>
			play(channel: number, layer?: number, clip?: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand>
			pause(channel: number, layer?: number): Promise<IAMCPCommand>
			resume(channel: number, layer?: number): Promise<IAMCPCommand>
			stop(channel: number, layer?: number): Promise<IAMCPCommand>
		}

		/**
		 * AMCP In/Out-commands
		 */
		export interface IInputOutput {
			loadDecklinkBg(channel: number, layer: number, device: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string, auto?: boolean | number | string): Promise<IAMCPCommand>
			loadDecklinkBgAuto(channel: number, layer: number, device: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string): Promise<IAMCPCommand>
			loadDecklink(channel: number, layer: number, device: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string): Promise<IAMCPCommand>
			playDecklink(channel: number, layer?: number, device?: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string): Promise<IAMCPCommand>
			loadHtmlPageBg(channel: number, layer: number, url: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): Promise<IAMCPCommand>
			loadHtmlPageBgAuto(channel: number, layer: number, url: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string): Promise<IAMCPCommand>
			loadHtmlPage(channel: number, layer: number, url: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string): Promise<IAMCPCommand>
			playHtmlPage(channel: number, layer?: number, url?: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string): Promise<IAMCPCommand>
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
			mixerChroma(channel: number, layer?: number, keyer?: Enum.Chroma | string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerChromaDeferred(channel: number, layer?: number, keyer?: Enum.Chroma | string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusChroma(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerBlend(channel: number, layer?: number, blendmode?: Enum.BlendMode | string, defer?: boolean): Promise<IAMCPCommand>
			mixerBlendDeferred(channel: number, layer?: number, blendmode?: Enum.BlendMode | string): Promise<IAMCPCommand>
			getMixerStatusBlend(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerOpacity(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerOpacityDeferred(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusOpacity(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerBrightness(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerBrightnessDeferred(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusBrightness(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerSaturation(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerSaturationDeferred(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusSaturation(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerBrightness(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerContrastDeferred(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusContrast(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerLevels(channel: number, layer?: number, minInput?: number, maxInput?: number, gamma?: number, minOutput?: number, maxOutput?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerLevelsDeferred(channel: number, layer?: number, minInput?: number, maxInput?: number, gamma?: number, minOutput?: number, maxOutput?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusLevels(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerFill(channel: number, layer?: number, x?: number, y?: number, xScale?: number, yScale?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerFillDeferred(channel: number, layer?: number, x?: number, y?: number, xScale?: number, yScale?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusFill(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerClip(channel: number, layer?: number, x?: number, y?: number, width?: number, height?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerClipDeferred(channel: number, layer?: number, x?: number, y?: number, width?: number, height?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusClip(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerAnchor(channel: number, layer?: number, x?: number, y?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerAnchorDeferred(channel: number, layer?: number, x?: number, y?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusAnchor(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerCrop(channel: number, layer?: number, left?: number, top?: number, right?: number, bottom?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerCropDeferred(channel: number, layer?: number, left?: number, top?: number, right?: number, bottom?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusCrop(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerRotation(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerRotationDeferred(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusRotation(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerPerspective(channel: number, layer?: number, topLeftX?: number, topLeftY?: number, topRightX?: number, topRightY?: number, bottomRightX?: number, bottomRightY?: number, bottomLeftX?: number, bottomLeftY?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerPerspectiveDeferred(channel: number, layer?: number, topLeftX?: number, topLeftY?: number, topRightX?: number, topRightY?: number, bottomRightX?: number, bottomRightY?: number, bottomLeftX?: number, bottomLeftY?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusPerspective(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerMipmap(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>
			mixerMipmapDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand>
			getMixerStatusMipmap(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerVolume(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerVolumeDeferred(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
			getMixerStatusVolume(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerMastervolume(channel: number, mastervolume?: number, defer?: boolean): Promise<IAMCPCommand>
			mixerMastervolumeDeferred(channel: number, mastervolume?: number): Promise<IAMCPCommand>
			getMixerStatusMastervolume(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerStraightAlphaOutput(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>
			mixerStraightAlphaOutputDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand>
			getMixerStatusStraightAlphaOutput(channel: number, layer?: number): Promise<IAMCPCommand>
			mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
			mixerGridDeferred(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
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
			lock(channel: number, action: Enum.Lock | string, lockPhrase?: string): Promise<IAMCPCommand>
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
			thumbnailList(): Promise<IAMCPCommand>
			thumbnailRetrieve(fileName: string): Promise<IAMCPCommand>
			thumbnailGenerate(fileName: string): Promise<IAMCPCommand>
			thumbnailGenerateAll(): Promise<IAMCPCommand>
		}

		/**
		 * AMCP Query-commands
		 */
		export interface IQuery {
			cinf(fileName: string): Promise<IAMCPCommand>
			cls(): Promise<IAMCPCommand>
			fls(): Promise<IAMCPCommand>
			tls(): Promise<IAMCPCommand>
			version(component?: Enum.Version): Promise<IAMCPCommand>
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
			logLevel(level: Enum.LogLevel | string): Promise<IAMCPCommand>
			logCategory(category: Enum.LogCategory | string, enabled: boolean): Promise<IAMCPCommand>
			logCalltrace(enabled: boolean): Promise<IAMCPCommand>
			logCommunication(enabled: boolean): Promise<IAMCPCommand>
			diag(): Promise<IAMCPCommand>
			help(command?: Enum.Command | string): Promise<IAMCPCommand>
			getCommands(): Promise<IAMCPCommand>
			helpProducer(producer?: Enum.Producer | string): Promise<IAMCPCommand>
			getProducers(): Promise<IAMCPCommand>
			helpConsumer(consumer?: Enum.Consumer | string): Promise<IAMCPCommand>
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
	createCommand(command: IAMCPCommand): IAMCPCommand | undefined
	createCommand(commandString: string, ...params: (string | Param)[]): IAMCPCommand | undefined
	queueCommand(command: IAMCPCommand, priority: Priority): Promise<IAMCPCommand>
	do(command: IAMCPCommand): Promise<IAMCPCommand>
	do(commandString: string, ...params: (string | Param)[]): Promise<IAMCPCommand>
	doNow(command: IAMCPCommand): Promise<IAMCPCommand>
	doNow(commandString: string, ...params: (string | Param)[]): Promise<IAMCPCommand>
	doLater(command: IAMCPCommand): Promise<IAMCPCommand>
	doLater(commandString: string, ...params: (string | Param)[]): Promise<IAMCPCommand>
}

/**
 * The main object and entrypoint for all interactions. `CasparCG` allows for flexible configuration, re-configuration and events/callbacks.
 * It implements all [[AMCP]] commands as high-level methods with convenient interfaces.
 *
 * There is a single [[CasparCGSocket]] pr. `CasparCG` object.
 * `CasparCG` should be the only public interface to interact directly with.
 */
export class CasparCG extends EventEmitter implements ICasparCGConnection, ConnectionOptions, CasparCGProtocols.v2_1.AMCP {
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
	private _queuedCommands: Array<IAMCPCommand> = []
	private _queuedCommandsLowPriority: Array<IAMCPCommand> = []
	private _queuedCommandsHighPriority: Array<IAMCPCommand> = []
	private _sentCommands: { [token: string]: IAMCPCommand } = {}
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

	public set queueMode(mode: QueueMode) {
		if (this._queueMode === QueueMode.SEQUENTIAL && mode === QueueMode.SALVO && Object.keys(this._sentCommands).length) {
			this._log('Warning: setting queuemode to SALVO while there is a sequential command being sent will return undocumente behaviour!')
			// @todo: await for current command to return, and then set queue mode.
		}
		this._queueMode = mode
		this._socket.queueMode = mode
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
	public do(command: IAMCPCommand): Promise<IAMCPCommand>
	public do(commandString: string, ...params: (string | Param)[]): Promise<IAMCPCommand>
	public do(commandOrString: (IAMCPCommand | string), ...params: (string | Param)[]): Promise<IAMCPCommand> | undefined {
		let command: IAMCPCommand | undefined = this.createCommand(commandOrString, ...params)
		if (command) {
			return this.queueCommand(command)
		}
		return
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public doNow(command: IAMCPCommand): Promise<IAMCPCommand>
	public doNow(commandString: string, ...params: (string | Param)[]): Promise<IAMCPCommand>
	public doNow(commandOrString: (IAMCPCommand | string), ...params: (string | Param)[]): Promise<IAMCPCommand> | undefined {
		let command: IAMCPCommand | undefined = this.createCommand(commandOrString, ...params)
		if (command) {
			return this.queueCommand(command, Priority.HIGH)
		}
		return
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public doLater(command: IAMCPCommand): Promise<IAMCPCommand>
	public doLater(commandString: string, ...params: (string | Param)[]): Promise<IAMCPCommand>
	public doLater(commandOrString: (IAMCPCommand | string), ...params: (string | Param)[]): Promise<IAMCPCommand> | undefined {
		let command: IAMCPCommand | undefined = this.createCommand(commandOrString, ...params)
		if (command) {
			return this.queueCommand(command, Priority.LOW)
		}
		return
	}

	/**
	 *
	 */
	public createCommand(commandOrString: (IAMCPCommand | string), ...params: (string | Param)[]): IAMCPCommand | undefined {
		let command: IAMCPCommand | undefined
		try {
			if (isIAMCPCommand(commandOrString)) {
				command = commandOrString as IAMCPCommand
			} else { // then it must be a string:
				if (AMCP.hasOwnProperty(commandOrString)) {
					// @todo: parse out params from commandString, if Params is empty and commandString.split(" ").length > 1
					// @todo: typechecking with fallback
					command = Object.create((AMCP as any)[commandOrString]['prototype'])
					// @todo: typechecking with fallback
					if (command) {
						command.constructor.apply(command, params)
					} else {
						throw new Error('Invalid command constructor')
					}
				}
			}
			// validate command and params
			if (!command || !command.validateParams()) {
				// @todo: Handle, return?
				throw new Error('Invalid command parameters')
			}

			return command
		} catch (error) {
			this._log(error)
		}
		return undefined
	}

	/**
	 *
	 */
	public queueCommand(command: IAMCPCommand, priority: Priority = Priority.NORMAL): Promise<IAMCPCommand> {
		let commandPromise: Promise<IAMCPCommand[]>
		let commandPromiseArray: Array<Promise<IAMCPCommand>> = [new Promise<IAMCPCommand>((resolve, reject) => {
			command.resolve = resolve
			command.reject = reject
		})]

		if (command.name === 'ScheduleSetCommand') {
			let subCommand = command.getParam('command') as IAMCPCommand
			commandPromiseArray.push(new Promise<IAMCPCommand>((resolve, reject) => {
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
	public removeQueuedCommand(id: string): boolean {
		let removed: Array<IAMCPCommand> | undefined
		// normal priority
		for (let i: number = 0; i < this._queuedCommands.length; i++) {
			let o: IAMCPCommand = this._queuedCommands[i]
			if (o.id === id) {
				removed = this._queuedCommands.splice(i, 1)
				this._log(`Command removed, "${removed[0].name}". ${this.commandQueueLength} command(s) left in command queues.`)
				break
			}
		}
		// high priority
		if (!removed) {
			for (let i: number = 0; i < this._queuedCommandsHighPriority.length; i++) {
				let o: IAMCPCommand = this._queuedCommandsHighPriority[i]
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
				let o: IAMCPCommand = this._queuedCommandsLowPriority[i]
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
					this.doNow(new AMCP.VersionCommand({ component: Enum.Version.SERVER })).then((response) => {
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
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
	 */
	public loadbg(channel: number, layer: number = NaN, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): Promise<IAMCPCommand> {
		return this.do(new AMCP.LoadbgCommand({ channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter, auto: auto }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
	 */
	public loadbgAuto(channel: number, layer: number = NaN, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.LoadbgCommand({ channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter, auto: true }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOAD>
	 */
	public load(channel: number, layer: number = NaN, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.LoadCommand({ channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PLAY>
	 */
	public play(channel: number, layer?: number): Promise<IAMCPCommand>
	public play(channel: number, layer: number = NaN, clip?: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.PlayCommand({ channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
	 */
	public loadDecklinkBg(channel: number, layer: number = NaN, device: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string, auto?: boolean | number | string): Promise<IAMCPCommand> {
		return this.do(new AMCP.LoadDecklinkBgCommand({ channel: channel, layer: layer, device: device, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, length: length, filter: filter, format: format, channelLayout: channelLayout, auto: auto }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
	 */
	public loadDecklinkBgAuto(channel: number, layer: number = NaN, device: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string): Promise<IAMCPCommand> {
		return this.do(new AMCP.LoadDecklinkBgCommand({ channel: channel, layer: layer, device: device, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, length: length, filter: filter, format: format, channelLayout: channelLayout, auto: true }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOAD>
	 */
	public loadDecklink(channel: number, layer: number = NaN, device: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string): Promise<IAMCPCommand> {
		return this.do(new AMCP.LoadDecklinkCommand({ channel: channel, layer: layer, device: device, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, length: length, filter: filter, format: format, channelLayout: channelLayout }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PLAY>
	 */
	public playDecklink(channel: number, layer?: number): Promise<IAMCPCommand>
	public playDecklink(channel: number, layer: number = NaN, device?: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string): Promise<IAMCPCommand> {
		return this.do(new AMCP.PlayDecklinkCommand({ channel: channel, layer: layer, device: device, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, length: length, filter: filter, format: format, channelLayout: channelLayout }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
	 */
	public loadHtmlPageBg(channel: number, layer: number = NaN, clip: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, auto?: boolean | number | string): Promise<IAMCPCommand> {
		return this.do(new AMCP.LoadHtmlPageBgCommand({ channel: channel, layer: layer, clip: clip, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, auto: auto }))
	}

	/**
	 *
	 */
	public loadHtmlPageBgAuto(channel: number, layer: number = NaN, url: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string): Promise<IAMCPCommand> {
		return this.do(new AMCP.LoadHtmlPageBgCommand({ channel: channel, layer: layer, url: url, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, auto: true }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOAD>
	 */
	public loadHtmlPage(channel: number, layer: number = NaN, url: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string): Promise<IAMCPCommand> {
		return this.do(new AMCP.LoadHtmlPageCommand({ channel: channel, layer: layer, url: url, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PLAY>
	 */
	public playHtmlPage(channel: number, layer?: number): Promise<IAMCPCommand>
	public playHtmlPage(channel: number, layer: number = NaN, url?: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string): Promise<IAMCPCommand> {
		return this.do(new AMCP.PlayHtmlPageCommand({ channel: channel, layer: layer, url: url, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PAUSE>
	 */
	public pause(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.PauseCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#RESUME>
	 */
	public resume(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.ResumeCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#STOP>
	 */
	public stop(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.StopCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_ADD>
	 */
	public cgAdd(channel: number, layer: number = NaN, flashLayer: number = NaN, templateName: string, playOnLoad: boolean | number | string, data?: TemplateData): Promise<IAMCPCommand> {
		return this.do(new AMCP.CGAddCommand({ channel: channel, layer: layer, flashLayer: flashLayer, templateName: templateName, playOnLoad: playOnLoad, data: data }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_PLAY>
	 */
	public cgPlay(channel: number, layer?: number, flashLayer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.CGPlayCommand({ channel: channel, layer: layer, flashLayer: flashLayer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_STOP>
	 */
	public cgStop(channel: number, layer?: number, flashLayer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.CGStopCommand({ channel: channel, layer: layer, flashLayer: flashLayer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_NEXT>
	 */
	public cgNext(channel: number, layer?: number, flashLayer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.CGNextCommand({ channel: channel, layer: layer, flashLayer: flashLayer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_REMOVE>
	 */
	public cgRemove(channel: number, layer?: number, flashLayer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.CGRemoveCommand({ channel: channel, layer: layer, flashLayer: flashLayer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_CLEAR>
	 */
	public cgClear(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.CGClearCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_UPDATE>
	 */
	public cgUpdate(channel: number, layer: number = NaN, flashLayer: number, data: TemplateData): Promise<IAMCPCommand> {
		return this.do(new AMCP.CGUpdateCommand({ channel: channel, layer: layer, flashLayer: flashLayer, data: data }))
	}

	/*
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INVOKE
	 */
	public cgInvoke(channel: number, layer: number, flashLayer: number, method: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.CGInvokeCommand({ channel: channel, layer: layer, flashLayer: flashLayer, method: method }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
	 */
	public mixerKeyer(channel: number, layer: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>
	public mixerKeyer(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerKeyerCommand({ channel: channel, layer: layer, keyer: state, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
	 */
	public mixerKeyerDeferred(channel: number, layer: number, state?: number | boolean): Promise<IAMCPCommand> {
		return this.mixerKeyer(channel, layer, state, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
	 */
	public getMixerStatusKeyer(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusKeyerCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
	 */
	public mixerChroma(channel: number, layer: number, keyer: Enum.Chroma, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>
	public mixerChroma(channel: number, layer: number, keyer: string, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>
	public mixerChroma(channel: number, layer: number, keyer?: Enum.Chroma | string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerChroma(channel: number, layer: number = 0, keyer?: Enum.Chroma | string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerChromaCommand({ channel: channel, layer: layer, keyer: keyer, threshold: threshold, softness: softness, spill: spill, transitionDuration: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
	 */
	public mixerChromaDeferred(channel: number, layer: number, keyer: Enum.Chroma, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>
	public mixerChromaDeferred(channel: number, layer: number = 0, keyer: string | Enum.Chroma | string, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerChroma(channel, layer, keyer, threshold, softness, spill, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
	 */
	public getMixerStatusChroma(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusChromaCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
	 */
	public mixerBlend(channel: number, layer: number, blendmode: string | Enum.BlendMode, defer?: boolean): Promise<IAMCPCommand>
	public mixerBlend(channel: number, layer?: number, blendmode?: Enum.BlendMode | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerBlend(channel: number, layer?: number, blendmode?: Enum.BlendMode | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerBlendCommand({ channel: channel, layer: layer, blendmode: blendmode, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
	 */
	public mixerBlendDeferred(channel: number, layer: number, blendmode: string | Enum.BlendMode): Promise<IAMCPCommand>
	public mixerBlendDeferred(channel: number, layer: number = NaN, blendmode: Enum.BlendMode | string): Promise<IAMCPCommand> {
		return this.mixerBlend(channel, layer, blendmode, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
	 */
	public getMixerStatusBlend(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusBlendCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
	 */
	public mixerOpacity(channel: number, layer: number, opacity: number, transitionDuration?: number, transitionEasing?: string | Enum.Ease, defer?: boolean): Promise<IAMCPCommand>
	public mixerOpacity(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerOpacity(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerOpacityCommand({ channel: channel, layer: layer, opacity: opacity, transitionDuration: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
	 */
	public mixerOpacityDeferred(channel: number, layer: number = NaN, opacity: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerOpacity(channel, layer, opacity, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
	 */
	public getMixerStatusOpacity(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusOpacityCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
	 */
	public mixerBrightness(channel: number, layer: number, brightness: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerBrightness(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerBrightness(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerBrightnessCommand({ channel: channel, layer: layer, brightness: brightness, transitionDuration: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
	 */
	public mixerBrightnessDeferred(channel: number, layer: number = NaN, brightness: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerBrightness(channel, layer, brightness, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
	 */
	public getMixerStatusBrightness(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusBrightnessCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
	 */
	public mixerSaturation(channel: number, layer: number, saturation: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerSaturation(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerSaturation(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerSaturationCommand({ channel: channel, layer: layer, saturation: saturation, transitionDuration: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
	 */
	public mixerSaturationDeferred(channel: number, layer: number = NaN, saturation: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerSaturation(channel, layer, saturation, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
	 */
	public getMixerStatusSaturation(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusSaturationCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
	 */
	public mixerContrast(channel: number, layer: number, contrast: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerContrast(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerContrast(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerContrastCommand({ channel: channel, layer: layer, contrast: contrast, transitionDuration: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
	 */
	public mixerContrastDeferred(channel: number, layer: number = NaN, contrast: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerContrast(channel, layer, contrast, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
	 */
	public getMixerStatusContrast(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusContrastCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
	 */
	public mixerLevels(channel: number, layer: number, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerLevels(channel: number, layer: number, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerLevels(channel: number, layer: number = NaN, minInput?: number, maxInput?: number, gamma?: number, minOutput?: number, maxOutput?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerLevelsCommand({ channel: channel, layer: layer, minInput: minInput, maxInput: maxInput, gamma: gamma, minOutput: minOutput, maxOutput: maxOutput, transitionDuration: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
	 */
	public mixerLevelsDeferred(channel: number, layer: number = NaN, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerLevels(channel, layer, minInput, maxInput, gamma, minOutput, maxOutput, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
	 */
	public getMixerStatusLevels(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusLevelsCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
	 */
	public mixerFill(channel: number, layer: number, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerFill(channel: number, layer: number, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerFill(channel: number, layer: number = NaN, x?: number, y?: number, xScale?: number, yScale?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerFillCommand({ channel: channel, layer: layer, x: x, y: y, xScale: xScale, yScale: yScale, transitionDuration: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/*
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
	 */
	public mixerFillDeferred(channel: number, layer: number = NaN, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerFill(channel, layer, x, y, xScale, yScale, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
	 */
	public getMixerStatusFill(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusFillCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
	 */
	public mixerClip(channel: number, layer: number, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerClip(channel: number, layer: number, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerClip(channel: number, layer: number = NaN, x?: number, y?: number, width?: number, height?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerClipCommand({ channel: channel, layer: layer, x: x, y: y, width: width, height: height, transitionDuration: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
	 */
	public mixerClipDeferred(channel: number, layer: number = NaN, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerClip(channel, layer, x, y, width, height, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
	 */
	public getMixerStatusClip(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusClipCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
	 */
	public mixerAnchor(channel: number, layer: number, x: number, y: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerAnchor(channel: number, layer: number, x: number, y: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerAnchor(channel: number, layer: number = NaN, x?: number, y?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerAnchorCommand({ channel: channel, layer: layer, x: x, y: y, ransition: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
	 */
	public mixerAnchorDeferred(channel: number, layer: number = NaN, x: number, y: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerAnchor(channel, layer, x, y, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
	 */
	public getMixerStatusAnchor(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusAnchorCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
	 */
	public mixerCrop(channel: number, layer: number, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerCrop(channel: number, layer: number, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerCrop(channel: number, layer: number = NaN, left?: number, top?: number, right?: number, bottom?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerCropCommand({ channel: channel, layer: layer, left: left, top: top, right: right, bottom: bottom, transitionDuration: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
	 */
	public mixerCropDeferred(channel: number, layer: number = NaN, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerCrop(channel, layer, left, top, right, bottom, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
	 */
	public getMixerStatusCrop(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusCropCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
	 */
	public mixerRotation(channel: number, layer: number, rotation: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerRotation(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerRotation(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerRotationCommand({ channel: channel, layer: layer, rotation: rotation, transitionDuration: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
	 */
	public mixerRotationDeferred(channel: number, layer: number = NaN, rotation: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerRotation(channel, layer, rotation, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
	 */
	public getMixerStatusRotation(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusRotationCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
	 */
	public mixerPerspective(channel: number, layer: number, topLeftX: number, topLeftY: number, topRightX: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottomLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerPerspective(channel: number, layer: number, topLeftX: number, topLeftY: number, topRightX: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottomLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerPerspective(channel: number, layer: number = NaN, topLeftX?: number, topLeftY?: number, topRightX?: number, topRightY?: number, bottomRightX?: number, bottomRightY?: number, bottomLeftX?: number, bottomLeftY?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerPerspectiveCommand({ channel: channel, layer: layer, topLeftX: topLeftX, topLeftY: topLeftY, topRightX: topRightX, topRightY: topRightY, bottomRightX: bottomRightX, bottomRightY: bottomRightY, bottomLeftX: bottomLeftX, bottomLeftY: bottomLeftY, transitionDuration: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
	 */
	public mixerPerspectiveDeferred(channel: number, layer: number = NaN, topLeftX: number, topLeftY: number, topRightX: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottomLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerPerspective(channel, layer, topLeftX, topLeftY, topRightX, topRightY, bottomRightX, bottomRightY, bottomLeftX, bottomLeftY, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
	 */
	public getMixerStatusPerspective(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusPerspectiveCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
	 */
	public mixerMipmap(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>
	public mixerMipmap(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerMipmapCommand({ channel: channel, layer: layer, keyer: state, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
	 */
	public mixerMipmapDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand> {
		return this.mixerMipmap(channel, layer, state, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
	 */
	public getMixerStatusMipmap(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusMipmapCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
	 */
	public mixerVolume(channel: number, layer: number, volume: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerVolume(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerVolume(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerVolumeCommand({ channel: channel, layer: layer, volume: volume, transitionDuration: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
	 */
	public mixerVolumeDeferred(channel: number, layer: number = NaN, volume: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerVolume(channel, layer, volume, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
	 */
	public getMixerStatusVolume(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusVolumeCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
	 */
	public mixerMastervolume(channel: number, mastervolume?: number, defer?: boolean): Promise<IAMCPCommand>
	public mixerMastervolume(channel: number, mastervolume?: number, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerMastervolumeCommand({ channel: channel, mastervolume: mastervolume, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
	 */
	public mixerMastervolumeDeferred(channel: number, mastervolume?: number): Promise<IAMCPCommand> {
		return this.mixerMastervolume(channel, mastervolume, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
	 */
	public getMixerStatusMastervolume(channel: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusMastervolumeCommand({ channel: channel }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
	 */
	public mixerStraightAlphaOutput(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>
	public mixerStraightAlphaOutput(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerKeyerCommand({ channel: channel, layer: layer, keyer: state, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
	 */
	public mixerStraightAlphaOutputDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand> {
		return this.mixerStraightAlphaOutput(channel, layer, state, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
	 */
	public getMixerStatusStraightAlphaOutput(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerStatusStraightAlphaOutputCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_GRID>
	 */
	public mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>
	public mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerGridCommand({ channel: channel, resolution: resolution, transitionDuration: transitionDuration, transitionEasing: transitionEasing, defer: defer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_GRID>
	 */
	public mixerGridDeferred(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand> {
		return this.mixerGrid(channel, resolution, transitionDuration, transitionEasing, true)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_COMMIT>
	 */
	public mixerCommit(channel: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerCommitCommand({ channel: channel }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLEAR>
	 */
	public mixerClear(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.MixerClearCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CLEAR>
	 */
	public clear(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.ClearCommand({ channel: channel, layer: layer }))
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public call(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.CallCommand({ channel: channel, layer: layer }))
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public swap(): Promise<IAMCPCommand> {
		// @todo: overloading of origin/destination pairs
		return this.do(new AMCP.SwapCommand())
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public add(channel: number): Promise<IAMCPCommand> {
		// remember index /layer
		// i suggest duplicating abstractchannelorlayer to avoid problems if the address logic changes for layers and not indicies
		// consumer factoruies parses "consumer"-string parameter
		return this.do(new AMCP.AddCommand({ channel: channel }))
	}

	/**
	 *  <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#ADD>
	 */
	public addDecklink(channel: number, device: number, id?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.AddDecklinkCommand({ channel: channel, layer: id, device: device }))
	}

	/**
	 *  <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#ADD>
	 */
	public addImage(channel: number, fileName: string, id?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.AddImageCommand({ channel: channel, layer: id, fileName: fileName }))
	}

	/**
	 *  <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#ADD>
	 */
	public addFile(channel: number, fileName: string, id?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.AddFileCommand({ channel: channel, layer: id, fileName: fileName }))
	}

	/**
	 *  <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#ADD>
	 */
	public addStream(channel: number, uri: string, params: string, id?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.AddStreamCommand({ channel: channel, layer: id, uri: uri, params: params }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#REMOVE>
	 */
	public remove(channel: number, id: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.RemoveCommand({ channel: channel, layer: id }))
	}

	/**
	 *  <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#REMOVE>
	 */
	public removeDecklink(channel: number, device: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.RemoveDecklinkCommand({ channel: channel, device: device }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#REMOVE>
	 */
	public removeImage(channel: number, fileName: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.RemoveImageCommand({ channel: channel, fileName: fileName }))
	}

	/**
	 *  <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#REMOVE>
	 */
	public removeFile(channel: number, fileName: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.RemoveFileCommand({ channel: channel, fileName: fileName }))
	}

	/**
	 *  <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#REMOVE>
	 */
	public removeStream(channel: number, uri: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.RemoveStreamCommand({ channel: channel, uri: uri }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PRINT>
	 */
	public print(channel: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.PrintCommand({ channel: channel }))
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public set(channel: number): Promise<IAMCPCommand> {
		// @todo:  param enum (only MODE and channelLayout for now)
		// @todo: switchable second parameter based on what to set:
		// mode = enum modes.......
		// layer = enum layouts..........
		return this.do(new AMCP.SetCommand({ channel: channel }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOCK>
	 */
	public lock(channel: number, action: Enum.Lock | string, lockPhrase?: string): Promise<IAMCPCommand>
	public lock(channel: number, action: Enum.Lock | string, lockPhrase?: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.LockCommand({ channel: channel, action: action, phrase: lockPhrase }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CHANNEL_GRID>
	 */
	public channelGrid(): Promise<IAMCPCommand> {
		return this.do(new AMCP.ChannelGridCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#GL_GC>
	 */
	public glGC(): Promise<IAMCPCommand> {
		return this.do(new AMCP.GlGCCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_STORE>
	 */
	public dataStore(fileName: string, data: TemplateData): Promise<IAMCPCommand> {
		return this.do(new AMCP.DataStoreCommand({ fileName: fileName, data: data }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_RETRIEVE>
	 */
	public dataRetrieve(fileName: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.DataRetrieveCommand({ fileName: fileName }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_LIST>
	 */
	public dataList(): Promise<IAMCPCommand> {
		return this.do(new AMCP.DataListCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_REMOVE>
	 */
	public dataRemove(fileName: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.DataRemoveCommand({ fileName: fileName }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_LIST>
	 */
	public thumbnailList(): Promise<IAMCPCommand> {
		return this.do(new AMCP.ThumbnailListCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_RETRIEVE>
	 */
	public thumbnailRetrieve(fileName: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.ThumbnailRetrieveCommand({ fileName: fileName }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_GENERATE>
	 */
	public thumbnailGenerate(fileName: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.ThumbnailGenerateCommand({ fileName: fileName }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_GENERATE_ALL>
	 */
	public thumbnailGenerateAll(): Promise<IAMCPCommand> {
		return this.do(new AMCP.ThumbnailGenerateAllCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CINF>
	 */
	public cinf(fileName: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.CinfCommand({ fileName: fileName }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CLS>
	 */
	public cls(): Promise<IAMCPCommand> {
		return this.do(new AMCP.ClsCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#FLS>
	 */
	public fls(): Promise<IAMCPCommand> {
		return this.do(new AMCP.FlsCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#TLS>
	 */
	public tls(): Promise<IAMCPCommand> {
		return this.do(new AMCP.TlsCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#VERSION>
	 */
	public version(component?: Enum.Version): Promise<IAMCPCommand> {
		return this.do(new AMCP.VersionCommand({ component: component }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO>
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_2>
	 */
	public info(channel?: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.InfoCommand({ channel: channel, layer: layer }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_TEMPLATE>
	 */
	public infoTemplate(template: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.InfoTemplateCommand({ template: template }))
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_CONFIG>
	 */
	public infoConfig(): Promise<IAMCPCommand> {
		return new Promise<IAMCPCommand>((resolve, reject) => {
			this.getCasparCGVersion().then((version) => {
				resolve(this.do(new AMCP.InfoConfigCommand([], { serverVersion: version })))
			}).catch(reject)
		})
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_PATHS>
	 */
	public infoPaths(): Promise<IAMCPCommand> {
		return this.do(new AMCP.InfoPathsCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_SYSTEM>
	 */
	public infoSystem(): Promise<IAMCPCommand> {
		return this.do(new AMCP.InfoSystemCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_SERVER>
	 */
	public infoServer(): Promise<IAMCPCommand> {
		return this.do(new AMCP.InfoServerCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_QUEUES>
	 */
	public infoQueues(): Promise<IAMCPCommand> {
		return this.do(new AMCP.InfoQueuesCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_THREADS>
	 */
	public infoThreads(): Promise<IAMCPCommand> {
		return this.do(new AMCP.InfoThreadsCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_DELAY>
	 */
	public infoDelay(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.InfoDelayCommand({ channel: channel, layer: layer }))
	}

	/**
	 * Retrieves information about a running template or the templatehost.
	 *
	 * Calling `infoDelay` without `flashLayer` parameter is the same as calling the convenience method [[templateHostInfo]].
	 *
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INFO>
	 *
	 * @param flashLayer	If not specified, information about the `TemplateHost` will be returned.
	 */
	public cgInfo(channel: number, layer?: number, flashLayer?: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.CGInfoCommand({ channel: channel, layer: layer, flashLayer: flashLayer }))
	}

	/**
	 * Convenience method for calling [[cgInfo]] to return information about `TemplateHost` for a given layer.
	 *
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INFO>
	 */
	public templateHostInfo(channel: number, layer?: number): Promise<IAMCPCommand> {
		return this.cgInfo(channel, layer)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#GL_INFO>
	 */
	public glInfo(): Promise<IAMCPCommand> {
		return this.do(new AMCP.GlInfoCommand())
	}

	/**
	 * Sets the server's [[LogLevel]].
	 *
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOG_LEVEL>
	 */
	public logLevel(enumOrString: Enum.LogLevel | string): Promise<IAMCPCommand> {
		return this.do(new AMCP.LogLevelCommand({ level: enumOrString }))
	}

	/**
	 * Enabling or disabling logging for a given [[LogCategory]].
	 *
	 * Convenience methods [[logCalltrace]] and [[logCommunication]] are available.
	 *
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOG_CATEGORY>
	 */
	public logCategory(category: Enum.LogCategory | string, enabled: boolean): Promise<IAMCPCommand> {
		let params: Param = {}
		params[category.toString().toLowerCase()] = enabled
		return this.do(new AMCP.LogCategoryCommand(params))
	}
	/**
	 * Convenience method for enabling or disabling logging for [[LogCategory.CALLTRACE]] through calling [[logCategory]].
	 */
	public logCalltrace(enabled: boolean): Promise<IAMCPCommand> {
		return this.logCategory(Enum.LogCategory.CALLTRACE, enabled)
	}
	/**
	 * Convenience method for enabling or disabling logging for [[LogCategory.COMMUNICATION]] through calling [[logCategory]].
	 */
	public logCommunication(enabled: boolean): Promise<IAMCPCommand> {
		return this.logCategory(Enum.LogCategory.COMMUNICATION, enabled)
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DIAG>
	 */
	public diag(): Promise<IAMCPCommand> {
		return this.do(new AMCP.DiagCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP>
	 */
	public help(): Promise<IAMCPCommand>
	public help(commandOrName?: (Enum.Command | string)): Promise<IAMCPCommand> {
		let param: Param = {}
		if (commandOrName) {
			param['command'] = commandOrName
		}
		return this.do(new AMCP.HelpCommand(param))
	}

	/**
	 * Convenience method for calling [[help]] with no parameters.
	 *
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP>
	 */
	public getCommands(): Promise<IAMCPCommand> {
		return this.help()
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_PRODUCER>
	 */
	public helpProducer(): Promise<IAMCPCommand>
	public helpProducer(producerOrName?: (Enum.Producer | string)): Promise<IAMCPCommand> {
		let param: Param = {}
		if (producerOrName) {
			param['producer'] = producerOrName
		}
		return this.do(new AMCP.HelpProducerCommand(param))
	}

	/**
	 * Convenience method for calling [[helpProducer]] with no parameters.
	 *
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_PRODUCER>
	 */
	public getProducers(): Promise<IAMCPCommand> {
		return this.helpProducer()
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_CONSUMER>
	 */
	public helpConsumer(consumerOrName?: (Enum.Consumer | string)): Promise<IAMCPCommand> {
		let param: Param = {}
		if (consumerOrName) {
			param['consumer'] = consumerOrName
		}
		return this.do(new AMCP.HelpConsumerCommand(param))
	}

	/**
	 * Convenience method for calling [[helpConsumer]] with no parameters.
	 *
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_CONSUMER>
	 */
	public getConsumers(): Promise<IAMCPCommand> {
		return this.helpConsumer()
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#BYE>
	 */
	public bye(): Promise<IAMCPCommand> {
		return this.do(new AMCP.ByeCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#KILL>
	 */
	public kill(): Promise<IAMCPCommand> {
		return this.do(new AMCP.KillCommand())
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#RESTART>
	 */
	public restart(): Promise<IAMCPCommand> {
		return this.do(new AMCP.RestartCommand())
	}

	/**
	 * Undocumented, but implemented by Julusian.
	 */
	public ping(): Promise<IAMCPCommand> {
		return this.do(new AMCP.PingCommand())
	}

	/**
	 * Undocumented, but implemented by Julusian.
	 */
	public time(channel: number): Promise<IAMCPCommand> {
		return this.do(new AMCP.TimeCommand({ channel }))
	}

	/**
	 * https://github.com/CasparCG/server/issues/872
	 */
	public scheduleSet(timecode: string, command: IAMCPCommand): Promise<IAMCPCommand> {
		return this.do(new AMCP.ScheduleSetCommand({ token: command.token, timecode, command }))
	}

	/**
	 * https://github.com/CasparCG/server/issues/872
	 */
	public scheduleRemove(token: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.ScheduleRemoveCommand({ token }))
	}

	/**
	 * https://github.com/CasparCG/server/issues/872
	 */
	public scheduleClear(): Promise<IAMCPCommand> {
		return this.do(new AMCP.ScheduleClearCommand())
	}

	/**
	 * https://github.com/CasparCG/server/issues/872
	 */
	public scheduleList(timecode?: string): Promise<IAMCPCommand> {
		return this.do(new AMCP.ScheduleListCommand({ timecode }))
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
