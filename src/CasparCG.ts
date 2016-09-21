import {EventEmitter} from "hap";
import {CasparCGSocket, SocketState} from "./lib/CasparCGSocket";
import {OSCSocket} from "./lib/OSCSocket";
import {AMCP, AMCPUtil as AMCPUtilNS} from "./lib/AMCP";
// AMCPUtilNS
import CasparCGSocketResponse = AMCPUtilNS.CasparCGSocketResponse;
import {Enum} from "./lib/ServerStateEnum";
import {IConnectionOptions, ConnectionOptions, Options as OptionsNS} from "./lib/AMCPConnectionOptions";
// Options NS
import QueueMode = OptionsNS.QueueMode;
// Command NS
import {Command as CommandNS} from "./lib/AbstractCommand";
import IAMCPCommand = CommandNS.IAMCPCommand;
import isIAMCPCommand = CommandNS.isIAMCPCommand;
import IAMCPStatus = CommandNS.IAMCPStatus;
import AMCPResponse = CommandNS.AMCPResponse;
// Param NS
import {Param as ParamNS} from "./lib/ParamSignature";
import Param = ParamNS.Param;
import TemplateData = ParamNS.TemplateData;
// Event NS
import {BaseEvent, CasparCGSocketStatusEvent, CasparCGSocketCommandEvent, CasparCGSocketResponseEvent, LogEvent, OSCSocketEvent} from "./lib/event/Events";
// Callback NS
import {Callback as CallbackNS} from "./lib/global/Callback";
import IBooleanCallback = CallbackNS.IBooleanCallback;
import IErrorCallback = CallbackNS.IErrorCallback;
import IEventCallback = CallbackNS.IEventCallback;
import IStringCallback = CallbackNS.IStringCallback;
import IResponseCallback = CallbackNS.IResponseCallback;
import ISocketStatusCallback = CallbackNS.ISocketStatusCallback;
import IOSCCallback = CallbackNS.IOSCCallback;


/**
 * CasparCG Protocols
 */
export namespace CasparCGProtocols {

	/**
	 * CasparCG Protocol version 2.1
	 */
	export namespace v2_1 {

		/**
		 * AMCP version 2.1
		 */
		export interface AMCP extends IVideo, ICG, IMixer, IChannel, IData, IThumbnail, IQuery, IOperation {
		}

		/**
		 * AMCP Media-commands
		 */
		export interface IVideo {
			loadbg(channel: number, layer: number, clip: string, loop?: boolean, transition?: Enum.Transition|string, transitionDuration?: number, transitionEasing?: Enum.Ease|string, transitionDirection?: Enum.Direction|string, seek?: number, length?: number, filter?: string, auto?: boolean|number|string): IAMCPCommand;
			load(channel: number, layer: number, clip: string, loop?: boolean, transition?: Enum.Transition|string, transitionDuration?: number, transitionEasing?: Enum.Ease|string, transitionDirection?: Enum.Direction|string, seek?: number, length?: number, filter?: string, auto?: boolean|number|string): IAMCPCommand;
			play(channel: number, layer?: number, clip?: string, loop?: boolean, transition?: Enum.Transition|string, transitionDuration?: number, transitionEasing?: Enum.Ease|string, transitionDirection?: Enum.Direction|string, seek?: number, length?: number, filter?: string, auto?: boolean|number|string): IAMCPCommand;
			pause(channel: number, layer?: number): IAMCPCommand;
			resume(channel: number, layer?: number): IAMCPCommand;
			stop(channel: number, layer?: number): IAMCPCommand;
		}

		/**
		 * AMCP Template-commands
		 */
		export interface ICG {
			cgAdd(channel: number, layer: number, flashLayer: number, templateName: string, playOnLoad: boolean|number|string, data?: TemplateData): IAMCPCommand;
			cgPlay(channel: number, layer: number, flashLayer: number): IAMCPCommand;
			cgStop(channel: number, layer: number, flashLayer: number): IAMCPCommand;
			cgNext(channel: number, layer: number, flashLayer: number): IAMCPCommand;
			cgRemove(channel: number, layer: number, flashLayer: number): IAMCPCommand;
			cgClear(channel: number, layer?: number): IAMCPCommand;
			cgUpdate(channel: number, layer: number, flashLayer: number, data: TemplateData): IAMCPCommand;
			cgInvoke(channel: number, layer: number, flashLayer: number, methodName: string): IAMCPCommand;
		}

		/**
		 * AMCP Mixer-commands
		 */
		export interface IMixer {
			mixerKeyer(channel: number, layer?: number, state?: number|boolean, defer?: boolean): IAMCPCommand;
			mixerKeyerDeferred(channel: number, layer?: number, state?: number|boolean): IAMCPCommand;
			getMixerStatusKeyer(channel: number, layer?: number): IAMCPCommand;
			mixerChroma(channel: number, layer?: number, keyer?: Enum.Chroma|string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerChromaDeferred(channel: number, layer?: number, keyer?: Enum.Chroma|string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			getMixerStatusChroma(channel: number, layer?: number): IAMCPCommand;
			mixerBlend(channel: number, layer?: number, blendmode?: Enum.BlendMode|string, defer?: boolean): IAMCPCommand;
			mixerBlendDeferred(channel: number, layer?: number, blendmode?: Enum.BlendMode|string): IAMCPCommand;
			getMixerStatusBlend(channel: number, layer?: number): IAMCPCommand;
			mixerOpacity(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerOpacityDeferred(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			getMixerStatusOpacity(channel: number, layer?: number): IAMCPCommand;
			mixerBrightness(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerBrightnessDeferred(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			getMixerStatusBrightness(channel: number, layer?: number): IAMCPCommand;
			mixerSaturation(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerSaturationDeferred(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			getMixerStatusSaturation(channel: number, layer?: number): IAMCPCommand;
			mixerBrightness(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerContrastDeferred(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			getMixerStatusContrast(channel: number, layer?: number): IAMCPCommand;
			mixerLevels(channel: number, layer?: number, minInput?: number, maxInput?: number, gamma?: number, minOutput?: number, maxOutput?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerLevelsDeferred(channel: number, layer?: number, minInput?: number, maxInput?: number, gamma?: number, minOutput?: number, maxOutput?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			getMixerStatusLevels(channel: number, layer?: number): IAMCPCommand;
			mixerFill(channel: number, layer?: number, x?: number, y?: number, xScale?: number, yScale?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerFillDeferred(channel: number, layer?: number, x?: number, y?: number, xScale?: number, yScale?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			getMixerStatusFill(channel: number, layer?: number): IAMCPCommand;
			mixerClip(channel: number, layer?: number, x?: number, y?: number, width?: number, height?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerClipDeferred(channel: number, layer?: number, x?: number, y?: number, width?: number, height?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			getMixerStatusClip(channel: number, layer?: number): IAMCPCommand;
			mixerAnchor(channel: number, layer?: number, x?: number, y?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerAnchorDeferred(channel: number, layer?: number, x?: number, y?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			getMixerStatusAnchor(channel: number, layer?: number): IAMCPCommand;
			mixerCrop(channel: number, layer?: number, left?: number, top?: number, right?: number, bottom?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerCropDeferred(channel: number, layer?: number, left?: number, top?: number, right?: number, bottom?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			getMixerStatusCrop(channel: number, layer?: number): IAMCPCommand;
			mixerRotation(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerRotationDeferred(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			getMixerStatusRotation(channel: number, layer?: number): IAMCPCommand;
			mixerPerspective(channel: number, layer?: number, topLeftX?: number, topLeftY?: number, topRightX?: number, topRightY?: number, bottomRightX?:  number, bottomRightY?: number, bottomLeftX?: number, bottomLeftY?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerPerspectiveDeferred(channel: number, layer?: number, topLeftX?: number, topLeftY?: number, topRightX?: number, topRightY?: number, bottomRightX?:  number, bottomRightY?: number, bottomLeftX?: number, bottomLeftY?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			getMixerStatusPerspective(channel: number, layer?: number): IAMCPCommand;
			mixerMipmap(channel: number, layer?: number, state?: number|boolean, defer?: boolean): IAMCPCommand;
			mixerMipmapDeferred(channel: number, layer?: number, state?: number|boolean): IAMCPCommand;
			getMixerStatusMipmap(channel: number, layer?: number): IAMCPCommand;
			mixerVolume(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerVolumeDeferred(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			getMixerStatusVolume(channel: number, layer?: number): IAMCPCommand;
			mixerMastervolume(channel: number, mastervolume?: number, defer?: boolean): IAMCPCommand;
			mixerMastervolumeDeferred(channel: number, mastervolume?: number): IAMCPCommand;
			getMixerStatusMastervolume(channel: number, layer?: number): IAMCPCommand;
			mixerStraightAlphaOutput(channel: number, layer?: number, state?: number|boolean, defer?: boolean): IAMCPCommand;
			mixerStraightAlphaOutputDeferred(channel: number, layer?: number, state?: number|boolean): IAMCPCommand;
			getMixerStatusStraightAlphaOutput(channel: number, layer?: number): IAMCPCommand;
			mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
			mixerGridDeferred(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
			mixerCommit(channel: number): IAMCPCommand;
			mixerClear(channel: number, layer?: number): IAMCPCommand;
		}

		/**
		 * AMCP Channel-commands
		 */
		export interface IChannel {
			clear(channel: number, layer?: number): IAMCPCommand;
		////	call(channel: number, layer: number): IAMCPCommand;
		////	swap(): IAMCPCommand;
		////	add(channel: number): IAMCPCommand;
		////	remove(channel: number): IAMCPCommand;
			print(channel: number): IAMCPCommand;
		////	set(channel: number): IAMCPCommand;
			lock(channel: number, action: Enum.Lock|string, lockPhrase?: string): IAMCPCommand;
			channelGrid(): IAMCPCommand;
			glGC(): IAMCPCommand;
		}

		/**
		 * AMCP Template Data-commands
		 */
		export interface IData {
			dataStore(fileName: string, data: TemplateData): IAMCPCommand;
			dataRetrieve(fileName: string): IAMCPCommand;
			dataList(): IAMCPCommand;
			dataRemove(fileName: string): IAMCPCommand;
		}

		/**
		 * AMCP Thumbnail-commands
		 */
		export interface IThumbnail {
			thumbnailList(): IAMCPCommand;
			thumbnailRetrieve(fileName: string): IAMCPCommand;
			thumbnailGenerate(fileName: string): IAMCPCommand;
			thumbnailGenerateAll(): IAMCPCommand;
		}

		/**
		 * AMCP Query-commands
		 */
		export interface IQuery {
			cinf(fileName: string): IAMCPCommand;
			cls(): IAMCPCommand;
			fls(): IAMCPCommand;
			tls(): IAMCPCommand;
			version(component?: Enum.Version): IAMCPCommand;
			info(channel?: number, layer?: number): IAMCPCommand;
			infoTemplate(template: string): IAMCPCommand;
			infoConfig(): IAMCPCommand;
			infoPaths(): IAMCPCommand;
			infoSystem(): IAMCPCommand;
			infoServer(): IAMCPCommand;
			infoQueues(): IAMCPCommand;
			infoThreads(): IAMCPCommand;
			infoDelay(channel: number, layer?: number): IAMCPCommand;
			cgInfo(channel: number, layer?: number, flashLayer?: number): IAMCPCommand;
			templateHostInfo(channel: number, layer?: number);
			glInfo(): IAMCPCommand;
			logLevel(level: Enum.LogLevel|string): IAMCPCommand;
			logCategory(category: Enum.LogCategory|string, enabled: boolean): IAMCPCommand;
			logCalltrace(enabled: boolean): IAMCPCommand;
			logCommunication(enabled: boolean): IAMCPCommand;
			diag(): IAMCPCommand;
			help(command?: Enum.Command|string): IAMCPCommand;
			getCommands(): IAMCPCommand;
			helpProducer(producer?: Enum.Producer|string): IAMCPCommand;
			getProducers(): IAMCPCommand;
			helpConsumer(consumer?: Enum.Consumer|string): IAMCPCommand;
			getConsumers(): IAMCPCommand;
		}

		/**
		 * AMCP Operation-commands
		 */
		export interface IOperation {
			bye(): IAMCPCommand;
			kill(): IAMCPCommand;
			restart(): IAMCPCommand;
		}
	}
}

/**
 * CasparCG Interface
 */
export interface ICasparCGConnection {
	connectionOptions: ConnectionOptions;
	connected: boolean;
	connectionStatus: SocketState;
	commandQueue: Array<IAMCPCommand>;
	removeQueuedCommand(id: string): boolean;
	connect(options?: IConnectionOptions): void;
	disconnect(): void;
	do(command: IAMCPCommand): IAMCPCommand;
	do(commandString: string, ...params: (string|Param)[]): IAMCPCommand;
}

/**
 * The main object and entrypoint for all interactions. `CasparCG` allows for flexible configuration, re-configuration and events/callbacks.
 * It implements all [[AMCP]] commands as high-level methods with convenient interfaces.
 * 
 * There is a single [[CasparCGSocket]] pr. `CasparCG` object. 
 * `CasparCG` should be the only public interface to interact directly with.
 */
export class CasparCG extends EventEmitter implements ICasparCGConnection, ConnectionOptions, CasparCGProtocols.v2_1.AMCP {
	private _connected: boolean;
	private _host: string;
	private _port: number;
	private _autoReconnect: boolean;
	private _autoReconnectInterval: number;
	private _autoReconnectAttempts: number;
	private _socket: CasparCGSocket;
	private _oscListener: OSCSocket = null;
	private _osc: number;
	private _queuedCommands: Array<IAMCPCommand> = new Array<IAMCPCommand>();
	private _sentCommands: Array<IAMCPCommand> = new Array<IAMCPCommand>();

	/**
	 * Try to connect upon creation.
	 */
	public autoConnect: boolean = undefined;


	/**b
	 * @todo: document  
	 */
	public queueMode: QueueMode = undefined;

	/**
	 * Setting this to true will print out logging to the `Console`, in addition to the optinal [[onLog]] and [[LogEvent.LOG]].  
	 */
	public debug: boolean = undefined;

	/*
	 * Public callbacks for osc events
	 */
	public onStageMessage: IOSCCallback = undefined;
	public onMixerMessage: IOSCCallback = undefined;
	public onDiagMessage: IOSCCallback = undefined;
	public onOutputMessage: IOSCCallback = undefined;

	/**
	 * Callback for all logging. 
	 */
	public onLog: IStringCallback = undefined;

	/**
	 * Callback for all status updates from the `CasparCGSocket`. 
	 */
	public onConnectionStatus: ISocketStatusCallback = undefined;

	/**
	 * Callback for status updates from the `CasparCGSocket` if the `connected` property changes value.
	 */
	public onConnectionChanged: IBooleanCallback = undefined;

	/**
	 * Callback for status updates from the `CasparCGSocket` if the `connected` property is set to `true`.
	 */
	public onConnected: IBooleanCallback = undefined;

	/**
	 * Callback for status updates from the `CasparCGSocket` if the `connected` property is set to `false`.
	 */
	public onDisconnected: IBooleanCallback = undefined;

	/**
	 * Callback for general errors
	 */
	public onError: IErrorCallback = undefined;

	/**
	 * If the constructor gets called with no parameters, all properties of the CasparCG object will match all default properties defined by [[IConnectionOptions]].
	 * 
	 ```
	 var con = new CasparCG(); 	
	 // host = 127.0.0.1, port = 5250, autoConnect = true ...
	 
	  con.play(1, 1, "amb");		
	  // you can interact with the server, but you have no knowledge of the conenction status until the onConnect event- or callback gets invoked
	 // the `PlayCommand` will however be queued and fired when the connection gets established
	 con.close();
	 ```
	 *  
	 * @param host		Defaults to `IConnectionOptions.host`
	 * @param port		Defaults to `IConnectionOptions.host`
	 * @param options	An object with combination of properties defined by `IConnectionOptions`. All properties not explicitly set will fall back to the defaults defined by `IConnectionOptions`. 
	 *
	 * All callbacks including [[onConnected]] will be set prior trying to establish connection, so the `CasparCG` object will give back all events even if [[CasparCG.autoConnect]] is `true`.
	 */
	public constructor();
	/**
	 * Set host/port directly in constructor:
	 * 
	 ```
	 var con = new CasparCG("192.168.0.1", 5251);	
	 // host = 192.168.0.1, port = 5251, autoConnect = true ...

	 // change properties after the constructor
	 con.debug = true;
	 
	 con.play(1, 1, "amb");
	 con.close();
	 ```
	 *
	 */
	public constructor(host?: string, port?: number);
	/**
	 * Callbacks and events after constructor:
	 * 
	 ```
	 var con = new CasparCG({host: "192.168.0.1", autoConnect: false});	
	 // host = 192.168.0.1, port = 5250, autoConnect = false ...
	 
	 // add onLog callback after constructor
	 con.onLog = function(logMessage){ console.log(logMessage); };						
	 
	 // add eventlistener to the conenction event before connecting
	 con.on(CasparCGSocketStatusEvent.CONNECTED, onConnection(event));		
	 
	 con.connect();
	 ```
	 * Callback in constructor:
	 * 
	 ```
	 var con = new CasparCG({host: "192.168.0.1", onConnect: onConnectedCallback});	
	 // Connection callbacks can be set in the constructor and will be registered before autoConnect invokes. 
	 // This ensures that you recieve all callbacks
	 ```
	 * Inline function syntax:
	 * 
	 ```
	 var con = new CasparCG({host: "192.168.0.1", onConnect: function(connected) {
		 	// do something once we get connected
		 	console.log("Are we conencted?", connected)
	 	}
	});	
	 ```
	 * Inline fat arrow syntax:
	 * 
	 ```
	 var con = new CasparCG({host: "192.168.0.1", onConnect: (connected) => {
		 	// do something once we get connected
		 	console.log("Are we conencted?", connected)
	 	}
	});	
	 ```
	 *
	 */
	public constructor(options?: IConnectionOptions);
	public constructor(hostOrOptions?: any, port?: number) {
		super();
		let options: ConnectionOptions = new ConnectionOptions(hostOrOptions, port);

		// if both options and port specified, port overrides options
		if (port && (port !== options.port)) {
			options.port = port;
		}

		this._createNewSocket(options);
		this._createOSCListener();

		if (this.autoConnect) {
			this.connect();
		}
	}

	/**
	 * 
	 */
	private _createNewSocket(options?: IConnectionOptions, enforceRecreation: boolean = false): void {
		let hasNewOptions = false;
		for (let key in options) {

			// @todo: object.assign
			if (!options.hasOwnProperty(key)) {		// @todo: ????
				continue;
			}

			if (this.hasOwnProperty(key) ||  CasparCG.prototype.hasOwnProperty(key)) {
				// only update new options
				if (this[key] !== options[key]) {
					this[key] = options[key];
					hasNewOptions = true;
				}
			}
		}
		// dont recreate if exising socket, same options + host + port
		if (this._socket && (this._socket.host !== this.host)) {
			hasNewOptions = true;
		}
		if (this._socket && (this._socket.port !== this.port)) {
			hasNewOptions = true;
		}
		if (this._socket && !hasNewOptions && !enforceRecreation) {
			return;
		}

		// clean up if existing socket
		if (this._socket) {
			this._socket.dispose();
			delete this._socket;
		}
		this._socket = new CasparCGSocket(this.host, this.port, this.autoReconnect, this.autoReconnectInterval, this.autoReconnectAttempts);
		this.setParent(this._socket);
		this._socket.on("error", (error) => this._onSocketError(error));
		this.on(CasparCGSocketStatusEvent.STATUS, (event) => this._onSocketStatusChange(event));
		this.on(CasparCGSocketResponseEvent.RESPONSE, (event) => this._handleSocketResponse(event.response));

		// inherit log method
		this._socket.log = (args) => this._log(args);
	}

	/**
	 * 
	 */
	private _createOSCListener() {
		this._oscListener = new OSCSocket(this.osc);
		this.setParent(this._oscListener);

		this._oscListener.on(OSCSocketEvent.newStageMessage, (event) => {
			if (this.onStageMessage) this.onStageMessage(event.params.address, event.params.value);
		});
		this._oscListener.on(OSCSocketEvent.newMixerMessage, (event) => {
			if (this.onMixerMessage) this.onMixerMessage(event.params.address, event.params.value);
		});
		this._oscListener.on(OSCSocketEvent.newDiagMessage, (event) => {
			if (this.onDiagMessage) this.onDiagMessage(event.params.address, event.params.value);
		});
		this._oscListener.on(OSCSocketEvent.newOutputMessage, (event) => {
			if (this.onOutputMessage) this.onOutputMessage(event.params.address, event.params.value);
		});
	}

	/**
	 * Creates a new [[CasparCGSocket]] and connects.
	 * 
	 * @param options	Setting new [[ICasparCGConnection]] properties will override each individual property allready defined on the `CasparCG` object. Existing properties not overwritten by this `options` object will remain.
	 */
	public connect(options?: IConnectionOptions): void {
		// recreate socket if new options
		if (options) {
			this._createNewSocket(options);
		}
		if (this._socket) {
			this._socket.connect();
		}
		if (this._oscListener) {
			this._oscListener.listen();
		}
	}

	/**
	 * Disconnects and disposes the [[CasparCGSocket]] connection.
	 */
	public disconnect(): void {
		if (this._socket) {
			this._socket.disconnect();
		}
		if (this._oscListener) {
			this._oscListener.close();
		}
	}

	/**
	 * 
	 */
	public get host(): string{
		return this._host;
	}

	/**
	 * Setting the `host` will create a new [[CasparCGSocket]] connection.
	 * 
	 * The new `CasparCGSocket` will `autoConnect` if the old socket was either successfully connected, or currently reconnecting. Changing the host resets the number of [[CasparCG.autoReconnectAttempts]]. 
	 */
	public set host(host: string){
		if (this._host !== host) {
			this._host = host;
			if (this._socket !=  null) {
				let shouldReconnect = (this.connected ||  ((this._socket.socketStatus & SocketState.reconnecting) === SocketState.reconnecting));
				this._createNewSocket();
				if (shouldReconnect) {
					this.connect();
				}
			}
		}
	}

	/**
	 * 
	 */
	public get port(): number{
		return this._port;
	}

	/**
	 * Setting the `port` will create a new [[CasparCGSocket]] connection.
	 * 
	 * The new `CasparCGSocket` will `autoConnect` if the old socket was either successfully connected, or currently reconnecting. Changing the host resets the number of [[CasparCG.autoReconnectAttempts]].
	 */
	public set port(port: number){
		if (this._port !== port) {
			this._port = port;
			if (this._socket !=  null) {
				let shouldReconnect = (this.connected ||  ((this._socket.socketStatus & SocketState.reconnecting) === SocketState.reconnecting));
				this._createNewSocket();
				if (shouldReconnect) {
					this.connect();
				}
			}
		}
	}

	/**
	 * 
	 */
	public get osc(): number {
		return this._osc; // @todo
	}

	/**
	 * 
	 */
	public set osc(port: number) {
		if (this._osc !== port) {
			this._osc = port;
			if (this._oscListener) this._oscListener.port = port;
		}
	}

	/**
	 * Try to reconnect in case of unintentionally loss of connection, or in case of failed connection in the first place.
	 */
	public get autoReconnect(): boolean {
		return this._autoReconnect;
	}

	/**
	 * 
	 */
	public set autoReconnect(autoReconnect: boolean) {
		this._autoReconnect = autoReconnect;
		if (this._socket) {
			this._socket.autoReconnect = this._autoReconnect;
		}
	}

	/**
	 * Timeout in milliseconds between each connection attempt during reconnection.
	 */
	public get autoReconnectInterval(): number {
		return this._autoReconnectInterval;
	}


	/**
	 * 
	 */
	public set autoReconnectInterval(autoReconnectInterval: number) {
		this._autoReconnectInterval = autoReconnectInterval;
		if (this._socket) {
			this._socket.autoReconnectInterval = this._autoReconnectInterval;
		}
	}
	/**
	 * Max number of attempts of connection during reconnection. This value resets once the reconnection is over (either in case of successfully reconnecting, changed connection properties such as `host` or `port` or by being manually cancelled). 
	 */
	public get autoReconnectAttempts(): number {
		return this._autoReconnectAttempts;
	}

	/**
	 * 
	 */
	public set autoReconnectAttempts(autoReconnectAttempts: number) {
		this._autoReconnectAttempts = autoReconnectAttempts;
		if (this._socket) {
			this._socket.autoReconnectAttempts = this._autoReconnectAttempts;
		}
	}

	/**
	 * 
	 */
	public get connectionOptions(): ConnectionOptions {
		let options: ConnectionOptions = new ConnectionOptions();

		for (let key in options) {
			if (this.hasOwnProperty(key) ||  CasparCG.prototype.hasOwnProperty(key)) {
				options[key] = this[key];
			}
		}

		return options;
	}

	/**
	 * 
	 */
	public get connected(): boolean{
		return this._connected ||  false;
	}

	/**
	 * 
	 */
	public get connectionStatus(): SocketState{
		return this._socket.socketStatus;
	}

	/**
	 * 
	 */
	private _onSocketStatusChange(socketStatus: CasparCGSocketStatusEvent): void {
		let connected = (socketStatus.valueOf() &  SocketState.connected) === SocketState.connected;

		if (this.onConnectionStatus) {
			this.onConnectionStatus(socketStatus.valueOf());
		}

		if (connected !== this._connected) {
			this._connected = connected;
			this.fire(CasparCGSocketStatusEvent.STATUS_CHANGED, socketStatus);

			if (this.onConnectionChanged) {
				this.onConnectionChanged(this._connected);
			}
			if (this._connected) {
				this.fire(CasparCGSocketStatusEvent.CONNECTED, socketStatus);
				if (this.onConnected) {
					this.onConnected(this._connected);
				}
				this._expediteCommand();
			}
			if (!this._connected) {
				this.fire(CasparCGSocketStatusEvent.DISCONNECTED, socketStatus);
				if (this.onDisconnected) {
					this.onDisconnected(this._connected);
				}
			}
		}
	}

	/**
	 * 
	 */
	public get commandQueue(): Array<IAMCPCommand> {
		return this._queuedCommands;
	}

	/**
	 * 
	 */
	private _onSocketError(error: Error): void {
		this._log(error);
	}

	/**
	 * 
	 */
	private _log(args: any): void {
		if (args instanceof Error) {
			console.error(args);
			if (this.onError) {
				this.onError(args);

				// re-emit error if there's any listener
				if (this.listenerCount("error") > 0) {
					this.fire("error", args);
				}
				return;
			}
		}

		if (this.debug) {
			console.log(args);
		}
		if (this.onLog) {
			this.onLog(args);
		}
		this.fire(LogEvent.LOG, new LogEvent(args));
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public do(command: IAMCPCommand): IAMCPCommand;
	public do(commandString: string, ...params: (string|Param)[]): IAMCPCommand;
	public do(commandOrString: (IAMCPCommand|string), ...params: (string|Param)[]) {
		let command: IAMCPCommand;

		if (isIAMCPCommand(commandOrString)) {
			command = commandOrString as IAMCPCommand;
		}else if (typeof commandOrString === "string") {
			if (AMCP.hasOwnProperty(commandOrString)) {
				// @todo: typechecking with fallback
				command = Object.create(AMCP[commandOrString]["prototype"]);
				// @todo: typechecking with fallback
				command.constructor.apply(command, params);
			}
		}else {
			// @todo: Handle, return?
			throw new Error("Invalid command or commandstring");
		}
		// validate command and params
		if (!command.validateParams()) {
			// handle error, return??
			return null;
		}

		return this._addQueuedCommand(command);
	}


	/**
	 * 
	 */
	private _addQueuedCommand(command: IAMCPCommand): IAMCPCommand {
		this._queuedCommands.push(command);
		command.status = IAMCPStatus.Queued;
		this._expediteCommand();
		return command;
	}

	/**
	 * @todo: document
	 */
	public removeQueuedCommand(id: string): boolean {
		let removed: Array<IAMCPCommand>;
		for (let i: number = 0; i < this._queuedCommands.length; i++) {
			let o: IAMCPCommand = this._queuedCommands[i];
			if (o.id === id) {
				removed = this._queuedCommands.splice(i, 1);
				break;
			}
		}
		return typeof Object.prototype.toString.call( removed ) === "[object Array]" && removed.length > 0;
	}

	/**
	 * 
	 */
	private _handleSocketResponse(socketResponse: CasparCGSocketResponse): void {

		/*100 [action] - Information about an event.
		101 [action] - Information about an event. A line of data is being returned.
		200 [command] OK	- The command has been executed and several lines of data (seperated by \r\n) are being returned (terminated with an additional \r\n)
		201 [command] OK	- The command has been executed and data (terminated by \r\n) is being returned.
		202 [command] OK	- The command has been executed.
		400 ERROR	- Command not understood
		401 [command] ERROR	- Illegal video_channel
		402 [command] ERROR	- Parameter missing
		403 [command] ERROR	- Illegal parameter
		404 [command] ERROR	- Media file not found*/

		let currentCommand: IAMCPCommand = this._sentCommands.shift();
		if (!(currentCommand.response instanceof AMCPResponse)) {
			currentCommand.response = new AMCPResponse();
		}

		// valid?

		// fail?
		if (socketResponse.statusCode >= 400 && socketResponse.statusCode <= 599) {
			currentCommand.response.raw = socketResponse.responseString;
			currentCommand.response.code = socketResponse.statusCode;
			currentCommand.status =  IAMCPStatus.Failed;
		}
		// success?
		if (socketResponse.statusCode > 0 && socketResponse.statusCode < 400) {
			// valid success???

			currentCommand.response.raw = socketResponse.responseString;
			currentCommand.response.code = socketResponse.statusCode;
			currentCommand.status =  IAMCPStatus.Suceeded;
		}

		this.fire(CasparCGSocketCommandEvent.RESPONSE, new CasparCGSocketCommandEvent(currentCommand));
		this._expediteCommand();
	}

	/**
	 * 
	 */
	private _expediteCommand(): void {
		if (this.connected) {

			// @todo add TTL for cleanup on stuck commands

			// salvo mode
			if (this.queueMode === QueueMode.SALVO) {
				if (this._queuedCommands.length > 0) {
					let nextCommand: IAMCPCommand = this._queuedCommands.shift();
					this._sentCommands.push(nextCommand);
					this._socket.executeCommand(nextCommand);
				}
			}

			// sequential mode
			if (this.queueMode === QueueMode.SEQUENTIAL) {
				if (this._queuedCommands.length > 0 && this._sentCommands.length === 0) {
					let nextCommand: IAMCPCommand = this._queuedCommands.shift();
					this._sentCommands.push(nextCommand);
					this._socket.executeCommand(nextCommand);
				}
			}
		}
	}


				///*********************////
				///***		API		****////
				///*********************///

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
	 */
	public loadbg(channel: number, layer: number = undefined, clip: string, loop?: boolean, transition?: Enum.Transition|string, transitionDuration?: number, transitionEasing?: Enum.Ease|string, transitionDirection?: Enum.Direction|string, seek?: number, length?: number, filter?: string, auto?: boolean|number|string): IAMCPCommand {
		return this.do(new AMCP.LoadbgCommand({channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter, auto: auto}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOAD>
	 */
	public load(channel: number, layer: number = undefined, clip: string, loop?: boolean, transition?: Enum.Transition|string, transitionDuration?: number, transitionEasing?: Enum.Ease|string, transitionDirection?: Enum.Direction|string, seek?: number, length?: number, filter?: string, auto?: boolean|number|string): IAMCPCommand {
		return this.do(new AMCP.LoadCommand({channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter, auto: auto}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PLAY>
	 */
	public play(channel: number, layer?: number): IAMCPCommand;
	public play(channel: number, layer: number, clip?: string, loop?: boolean, transition?: Enum.Transition|string, transitionDuration?: number, transitionEasing?: Enum.Ease|string, transitionDirection?: Enum.Direction|string, seek?: number, length?: number, filter?: string, auto?: boolean|number|string): IAMCPCommand;
	public play(channel: number, layer: number = undefined, clip?: string, loop?: boolean, transition?: Enum.Transition|string, transitionDuration?: number, transitionEasing?: Enum.Ease|string, transitionDirection?: Enum.Direction|string, seek?: number, length?: number, filter?: string, auto?: boolean|number|string): IAMCPCommand {
		return this.do(new AMCP.PlayCommand({channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter, auto: auto}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PAUSE>
	 */
	public pause(channel: number, layer?: number): IAMCPCommand {
		return this.do(new AMCP.PauseCommand({channel: channel, layer: layer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#RESUME>
	 */
	public resume(channel: number, layer?: number): IAMCPCommand {
		return this.do(new AMCP.ResumeCommand({channel: channel, layer: layer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#STOP>
	 */
	public stop(channel: number, layer?: number): IAMCPCommand {
		return this.do(new AMCP.StopCommand({channel: channel, layer: layer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_ADD>
	 */
	public cgAdd(channel: number, layer: number = undefined, flashLayer: number = undefined, templateName: string, playOnLoad?: boolean|number|string, data?: TemplateData): IAMCPCommand {
		return this.do(new AMCP.CGAddCommand({channel: channel, layer: layer, flashLayer: flashLayer, templateName: templateName, playOnLoad: playOnLoad, data: data}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_PLAY>
	 */
	public cgPlay(channel: number, layer?: number, flashLayer?: number): IAMCPCommand {
		return this.do(new AMCP.CGPlayCommand({channel: channel, layer: layer, flashLayer: flashLayer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_STOP>
	 */
	public cgStop(channel: number, layer?: number, flashLayer?: number): IAMCPCommand {
		return this.do(new AMCP.CGStopCommand({channel: channel, layer: layer, flashLayer: flashLayer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_NEXT>
	 */
	public cgNext(channel: number, layer?: number, flashLayer?: number): IAMCPCommand {
		return this.do(new AMCP.CGNextCommand({channel: channel, layer: layer, flashLayer: flashLayer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_REMOVE> 
	 */
	public cgRemove(channel: number, layer?: number, flashLayer?: number): IAMCPCommand {
		return this.do(new AMCP.CGRemoveCommand({channel: channel, layer: layer, flashLayer: flashLayer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_CLEAR>
	 */
	public cgClear(channel: number, layer?: number): IAMCPCommand {
		return this.do(new AMCP.CGClearCommand({channel: channel, layer: layer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_UPDATE>
	 */
	public cgUpdate(channel: number, layer: number = undefined, flashLayer: number, data: TemplateData): IAMCPCommand {
		return this.do(new AMCP.CGUpdateCommand({channel: channel, layer: layer, flashLayer: flashLayer, data: data}));
	}

	/*
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INVOKE
	 */
	public cgInvoke(channel: number, layer: number, flashLayer: number, method: string): IAMCPCommand {
		return this.do(new AMCP.CGRemoveCommand({channel: channel, layer: layer, flashLayer: flashLayer, method: method}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
	 */
	public mixerKeyer(channel: number, layer?: number): IAMCPCommand;
	public mixerKeyer(channel: number, layer: number, state: number|boolean, defer?: boolean): IAMCPCommand;
	public mixerKeyer(channel: number, layer?: number, state?: number|boolean, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerKeyerCommand({channel: channel, layer: layer, keyer: state, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
	 */
	public mixerKeyerDeferred(channel: number, layer: number, state?: number|boolean): IAMCPCommand {
		return this.mixerKeyer(channel, layer, state, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
	 */
	public getMixerStatusKeyer(channel: number, layer?: number): IAMCPCommand {
		return this.mixerKeyer(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
	 */
	public mixerChroma(channel: number, layer?: number): IAMCPCommand;
	public mixerChroma(channel: number, layer: number, keyer: Enum.Chroma, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerChroma(channel: number, layer: number, keyer: string, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerChroma(channel: number, layer: number, keyer?: Enum.Chroma|string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerChroma(channel: number, layer: number = 0, keyer?: Enum.Chroma|string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerChromaCommand({channel: channel, layer: layer, keyer: keyer, threshold: threshold, softness: softness, spill: spill, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
	 */
	public mixerChromaDeferred(channel: number, layer: number, keyer: Enum.Chroma, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
	public mixerChromaDeferred(channel: number, layer: number, keyer: string, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand;
	public mixerChromaDeferred(channel: number, layer: number = 0, keyer: Enum.Chroma|string, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand {
		return this.mixerChroma(channel, layer, keyer, threshold, softness, spill, transitionDuration, transitionEasing, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
	 */
	public getMixerStatusChroma(channel: number, layer?: number): IAMCPCommand {
		return this.mixerChroma(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
	 */
	public mixerBlend(channel: number, layer?: number): IAMCPCommand;
	public mixerBlend(channel: number, layer: number, blendmode: Enum.BlendMode, defer?: boolean): IAMCPCommand;
	public mixerBlend(channel: number, layer: number, blendmode: string, defer?: boolean): IAMCPCommand;
	public mixerBlend(channel: number, layer?: number, blendmode?: Enum.BlendMode|string, defer?: boolean): IAMCPCommand;
	public mixerBlend(channel: number, layer?: number, blendmode?: Enum.BlendMode|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerBlendCommand({channel: channel, layer: layer, blendmode: blendmode, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
	 */
	public mixerBlendDeferred(channel: number, layer: number, blendmode: Enum.BlendMode): IAMCPCommand;
	public mixerBlendDeferred(channel: number, layer: number, blendmode: string): IAMCPCommand;
	public mixerBlendDeferred(channel: number, layer: number = undefined, blendmode: Enum.BlendMode|string): IAMCPCommand {
		return this.mixerBlend(channel, layer, blendmode, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
	 */
	public getMixerStatusBlend(channel: number, layer?: number): IAMCPCommand {
		return this.mixerBlend(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
	 */
	public mixerOpacity(channel: number, layer?: number): IAMCPCommand;
	public mixerOpacity(channel: number, layer: number, opacity: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerOpacity(channel: number, layer: number, opacity: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerOpacity(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerOpacity(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerOpacityCommand({channel: channel, layer: layer, opacity: opacity, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
	 */
	public mixerOpacityDeferred(channel: number, layer: number = undefined, opacity: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand {
		return this.mixerOpacity(channel, layer, opacity, transitionDuration, transitionEasing, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
	 */
	public getMixerStatusOpacity(channel: number, layer?: number): IAMCPCommand {
		return this.mixerOpacity(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
	 */
	public mixerBrightness(channel: number, layer?: number): IAMCPCommand;
	public mixerBrightness(channel: number, layer: number, brightness: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerBrightness(channel: number, layer: number, brightness: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerBrightness(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerBrightness(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerBrightnessCommand({channel: channel, layer: layer, brightness: brightness, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
	 */
	public mixerBrightnessDeferred(channel: number, layer: number = undefined, brightness: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand {
		return this.mixerBrightness(channel, layer, brightness, transitionDuration, transitionEasing, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
	 */
	public getMixerStatusBrightness(channel: number, layer?: number): IAMCPCommand {
		return this.mixerBrightness(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
	 */
	public mixerSaturation(channel: number, layer?: number): IAMCPCommand;
	public mixerSaturation(channel: number, layer: number, saturation: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerSaturation(channel: number, layer: number, saturation: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerSaturation(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerSaturation(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerSaturationCommand({channel: channel, layer: layer, saturation: saturation, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
	 */
	public mixerSaturationDeferred(channel: number, layer: number = undefined, saturation: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand {
		return this.mixerSaturation(channel, layer, saturation, transitionDuration, transitionEasing, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
	 */
	public getMixerStatusSaturation(channel: number, layer?: number): IAMCPCommand {
		return this.mixerSaturation(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
	 */
	public mixerContrast(channel: number, layer?: number): IAMCPCommand;
	public mixerContrast(channel: number, layer: number, contrast: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerContrast(channel: number, layer: number, contrast: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerContrast(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerContrast(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerContrastCommand({channel: channel, layer: layer, contrast: contrast, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
	 */
	public mixerContrastDeferred(channel: number, layer: number = undefined, contrast: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand {
		return this.mixerContrast(channel, layer, contrast, transitionDuration, transitionEasing, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
	 */
	public getMixerStatusContrast(channel: number, layer?: number): IAMCPCommand {
		return this.mixerContrast(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
	 */
	public mixerLevels(channel: number, layer?: number): IAMCPCommand;
	public mixerLevels(channel: number, layer: number, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerLevels(channel: number, layer: number, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerLevels(channel: number, layer: number, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerLevels(channel: number, layer: number = undefined, minInput?: number, maxInput?: number, gamma?: number, minOutput?: number, maxOutput?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerLevelsCommand({channel: channel, layer: layer, minInput: minInput, maxInput: maxInput, gamma: gamma, minOutput: minOutput, maxOutput: maxOutput, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
	 */
	public mixerLevelsDeferred(channel: number, layer: number = undefined, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand {
		return this.mixerLevels(channel, layer, minInput, maxInput, gamma, minOutput, maxOutput, transitionDuration, transitionEasing, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
	 */
	public getMixerStatusLevels(channel: number, layer?: number): IAMCPCommand {
		return this.mixerLevels(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
	 */
	public mixerFill(channel: number, layer?: number): IAMCPCommand;
	public mixerFill(channel: number, layer: number, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerFill(channel: number, layer: number, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerFill(channel: number, layer: number, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerFill(channel: number, layer: number = undefined, x?: number, y?: number, xScale?: number, yScale?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerFillCommand({channel: channel, layer: layer, x: x, y: y, xScale: xScale, yScale: yScale, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/*
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
	 */
	public mixerFillDeferred(channel: number, layer: number = undefined, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand {
		return this.mixerFill(channel, layer, x, y, xScale, yScale, transitionDuration, transitionEasing, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
	 */
	public getMixerStatusFill(channel: number, layer?: number): IAMCPCommand {
		return this.mixerFill(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
	 */
	public mixerClip(channel: number, layer?: number): IAMCPCommand;
	public mixerClip(channel: number, layer: number, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerClip(channel: number, layer: number, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerClip(channel: number, layer: number, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerClip(channel: number, layer: number = undefined, x?: number, y?: number, width?: number, height?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerClipCommand({channel: channel, layer: layer, x: x, y: y, width: width, height: height, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
	 */
	public mixerClipDeferred(channel: number, layer: number = undefined, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand {
		return this.mixerClip(channel, layer, x, y, width, height, transitionDuration, transitionEasing, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
	 */
	public getMixerStatusClip(channel: number, layer?: number): IAMCPCommand {
		return this.mixerClip(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
	 */
	public mixerAnchor(channel: number, layer?: number): IAMCPCommand;
	public mixerAnchor(channel: number, layer: number, x: number, y: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerAnchor(channel: number, layer: number, x: number, y: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerAnchor(channel: number, layer: number, x: number, y: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerAnchor(channel: number, layer: number = undefined, x?: number, y?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerAnchorCommand({channel: channel, layer: layer, x: x, y: y, ransition: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
	 */
	public mixerAnchorDeferred(channel: number, layer: number = undefined, x: number, y: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand {
		return this.mixerAnchor(channel, layer, x, y, transitionDuration, transitionEasing, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
	 */
	public getMixerStatusAnchor(channel: number, layer?: number): IAMCPCommand {
		return this.mixerAnchor(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
	 */
	public mixerCrop(channel: number, layer?: number): IAMCPCommand;
	public mixerCrop(channel: number, layer: number, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerCrop(channel: number, layer: number, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerCrop(channel: number, layer: number, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerCrop(channel: number, layer: number = undefined, left?: number, top?: number, right?: number, bottom?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerCropCommand({channel: channel, layer: layer, left: left, top: top, right: right, bottom: bottom, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
	 */
	public mixerCropDeferred(channel: number, layer: number = undefined, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand {
		return this.mixerCrop(channel, layer, left, top, right, bottom, transitionDuration, transitionEasing, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
	 */
	public getMixerStatusCrop(channel: number, layer?: number): IAMCPCommand {
		return this.mixerCrop(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
	 */
	public mixerRotation(channel: number, layer?: number): IAMCPCommand;
	public mixerRotation(channel: number, layer: number, rotation: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerRotation(channel: number, layer: number, rotation: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerRotation(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerRotation(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerRotationCommand({channel: channel, layer: layer, rotation: rotation, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
	 */
	public mixerRotationDeferred(channel: number, layer: number = undefined, rotation: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand {
		return this.mixerRotation(channel, layer, rotation, transitionDuration, transitionEasing, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
	 */
	public getMixerStatusRotation(channel: number, layer?: number): IAMCPCommand {
		return this.mixerRotation(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
	 */
	public mixerPerspective(channel: number, layer?: number): IAMCPCommand;
	public mixerPerspective(channel: number, layer: number, topLeftX: number, topLeftY: number, topRightx: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottmLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerPerspective(channel: number, layer: number, topLeftX: number, topLeftY: number, topRightx: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottmLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerPerspective(channel: number, layer: number, topLeftX: number, topLeftY: number, topRightx: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottmLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerPerspective(channel: number, layer: number = undefined, topLeftX?: number, topLeftY?: number, topRightx?: number, topRightY?: number, bottomRightX?: number, bottomRightY?: number, bottmLeftX?: number, bottomLeftY?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerPerspectiveCommand({channel: channel, layer: layer, topLeftX: topLeftX, topLeftY: topLeftY, topRightx: topRightx, topRightY: topRightY, bottomRightX: bottomRightX, bottomRightY: bottomRightY, bottmLeftX: bottmLeftX, bottomLeftY: bottomLeftY, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
	 */
	public mixerPerspectiveDeferred(channel: number, layer: number = undefined, topLeftX: number, topLeftY: number, topRightx: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottomLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.mixerPerspective(channel, layer, topLeftX, topLeftY, topRightx, topRightY, bottomRightX, bottomRightY, bottomLeftX, bottomLeftY, transitionDuration, transitionEasing, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
	 */
	public getMixerStatusPerspective(channel: number, layer?: number): IAMCPCommand {
		return this.mixerPerspective(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
	 */
	public mixerMipmap(channel: number, layer?: number): IAMCPCommand;
	public mixerMipmap(channel: number, layer: number, state: number|boolean, defer?: boolean): IAMCPCommand;
	public mixerMipmap(channel: number, layer?: number, state?: number|boolean, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerMipmapCommand({channel: channel, layer: layer, keyer: state, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
	 */
	public mixerMipmapDeferred(channel: number, layer?: number, state?: number|boolean): IAMCPCommand {
		return this.mixerMipmap(channel, layer, state, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
	 */
	public getMixerStatusMipmap(channel: number, layer?: number): IAMCPCommand {
		return this.mixerMipmap(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
	 */
	public mixerVolume(channel: number, layer?: number): IAMCPCommand;
	public mixerVolume(channel: number, layer: number, volume: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerVolume(channel: number, layer: number, volume: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerVolume(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerVolume(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerVolumeCommand({channel: channel, layer: layer, volume: volume, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
	 */
	public mixerVolumeDeferred(channel: number, layer: number = undefined, volume: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand {
		return this.mixerVolume(channel, layer, volume, transitionDuration, transitionEasing, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
	 */
	public getMixerStatusVolume(channel: number, layer?: number): IAMCPCommand {
		return this.mixerVolume(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
	 */
	public mixerMastervolume(channel: number): IAMCPCommand;
	public mixerMastervolume(channel: number, mastervolume: number, defer?: boolean): IAMCPCommand;
	public mixerMastervolume(channel: number, mastervolume?: number, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerMastervolumeCommand({channel: channel, mastervolume: mastervolume, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
	 */
	public mixerMastervolumeDeferred(channel: number, mastervolume?: number): IAMCPCommand {
		return this.mixerMastervolume(channel, mastervolume, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
	 */
	public getMixerStatusMastervolume(channel: number): IAMCPCommand {
		return this.mixerMastervolume(channel);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
	 */
	public mixerStraightAlphaOutput(channel: number, layer?: number): IAMCPCommand;
	public mixerStraightAlphaOutput(channel: number, layer: number, state: number|boolean, defer?: boolean): IAMCPCommand;
	public mixerStraightAlphaOutput(channel: number, layer?: number, state?: number|boolean, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerKeyerCommand({channel: channel, layer: layer, keyer: state, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
	 */
	public mixerStraightAlphaOutputDeferred(channel: number, layer?: number, state?: number|boolean): IAMCPCommand {
		return this.mixerStraightAlphaOutput(channel, layer, state, true);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
	 */
	public getMixerStatusStraightAlphaOutput(channel: number, layer?: number): IAMCPCommand {
		return this.mixerStraightAlphaOutput(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_GRID>
	 */
	public mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): IAMCPCommand;
	public mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): IAMCPCommand;
	public mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand;
	public mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string, defer?: boolean): IAMCPCommand {
		return this.do(new AMCP.MixerGridCommand({channel: channel, resolution: resolution, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_GRID>
	 */
	public mixerGridDeferred(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease|string): IAMCPCommand {
		return this.mixerGrid(channel, resolution, transitionDuration, transitionEasing, true);
	}


	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_COMMIT>
	 */
	public mixerCommit(channel: number): IAMCPCommand {
		return this.do(new AMCP.MixerCommitCommand({channel: channel}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLEAR>
	 */
	public mixerClear(channel: number, layer?: number): IAMCPCommand {
		return this.do(new AMCP.MixerClearCommand({channel: channel, layer: layer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CLEAR>
	 */
	public clear(channel: number, layer?: number): IAMCPCommand {
		return this.do(new AMCP.ClearCommand({channel: channel, layer: layer}));
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public call(channel: number, layer?: number): IAMCPCommand {
		return this.do(new AMCP.CallCommand({channel: channel, layer: layer}));
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public swap(): IAMCPCommand {
		// @todo: overloading of origin/destination pairs
		return this.do(new AMCP.SwapCommand());
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public add(channel: number): IAMCPCommand {
		// remember index /layer
			// i suggest duplicating abstractchannelorlayer to avoid problems if the address logic changes for layers and not indicies
		// consumer factoruies parses "consumer"-string parameter
		return this.do(new AMCP.AddCommand({channel: channel}));
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public remove(channel: number, layer?: number): IAMCPCommand {
		return this.do(new AMCP.RemoveCommand({channel: channel, layer: layer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PRINT>
	 */
	public print(channel: number): IAMCPCommand {
		return this.do(new AMCP.PrintCommand({channel: channel}));
	}

	/**
	 * @todo	implement
	 * @todo	document
	 */
	public set(channel: number): IAMCPCommand {
		// @todo:  param enum (only MODE and CHANNEL_LAYOUT for now)
		// @todo: switchable second parameter based on what to set:
			// mode = enum modes.......
			// layer = enum layouts..........
		return this.do(new AMCP.SetCommand({channel: 	channel}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOCK>
	 */
	public lock(channel: number, action: Enum.Lock, lockPhrase?: string): IAMCPCommand;
	public lock(channel: number, action: string, lockPhrase?: string): IAMCPCommand;
	public lock(channel: number, action: Enum.Lock|string, lockPhrase?: string): IAMCPCommand {
		return this.do(new AMCP.LockCommand({channel: channel, action: action, phrase: lockPhrase}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CHANNEL_GRID>
	 */
	public channelGrid(): IAMCPCommand {
		return this.do(new AMCP.ChannelGridCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#GL_GC>
	 */
	public glGC(): IAMCPCommand {
		return this.do(new AMCP.GlGCCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_STORE>
	 */
	public dataStore(fileName: string, data: TemplateData): IAMCPCommand {
		return this.do(new AMCP.DataStoreCommand({fileName: fileName, data: data}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_RETRIEVE>
	 */
	public dataRetrieve(fileName: string): IAMCPCommand {
		return this.do(new AMCP.DataRetrieveCommand({fileName: fileName}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_LIST>
	 */
	public dataList(): IAMCPCommand {
		return this.do(new AMCP.DataListCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_REMOVE>
	 */
	public dataRemove(fileName: string): IAMCPCommand {
		return this.do(new AMCP.DataRemoveCommand({fileName: fileName}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_LIST>
	 */
	public thumbnailList(): IAMCPCommand {
		return this.do(new AMCP.ThumbnailListCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_RETRIEVE>
	 */
	public thumbnailRetrieve(fileName: string): IAMCPCommand {
		return this.do(new AMCP.ThumbnailRetrieveCommand({fileName: fileName}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_GENERATE>
	 */
	public thumbnailGenerate(fileName: string): IAMCPCommand {
		return this.do(new AMCP.ThumbnailGenerateCommand({fileName: fileName}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_GENERATE_ALL>
	 */
	public thumbnailGenerateAll(): IAMCPCommand {
		return this.do(new AMCP.ThumbnailGenerateAllCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CINF>
	 */
	public cinf(fileName: string): IAMCPCommand {
		return this.do(new AMCP.CinfCommand({fileName: fileName}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CLS>
	 */
	public cls(): IAMCPCommand {
		return this.do(new AMCP.ClsCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#FLS>
	 */
	public fls(): IAMCPCommand {
		return this.do(new AMCP.FlsCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#TLS>
	 */
	public tls(): IAMCPCommand {
		return this.do(new AMCP.TlsCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#VERSION>
	 */
	public version(component?: Enum.Version): IAMCPCommand {
		return this.do(new AMCP.VersionCommand({component: component}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO>
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_2>
	 */
	public info(channel?: number, layer?: number): IAMCPCommand {
		return this.do(new AMCP.InfoCommand({channel: channel, layer: layer}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_TEMPLATE>
	 */
	public infoTemplate(template: string): IAMCPCommand {
		return this.do(new AMCP.InfoTemplateCommand({template: template}));
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_CONFIG>
	 */
	public infoConfig(): IAMCPCommand {
		return this.do(new AMCP.InfoConfigCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_PATHS>
	 */
	public infoPaths(): IAMCPCommand {
		return this.do(new AMCP.InfoPathsCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_SYSTEM>
	 */
	public infoSystem(): IAMCPCommand {
		return this.do(new AMCP.InfoSystemCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_SERVER>
	 */
	public infoServer(): IAMCPCommand {
		return this.do(new AMCP.InfoServerCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_QUEUES>
	 */
	public infoQueues(): IAMCPCommand {
		return this.do(new AMCP.InfoQueuesCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_THREADS>
	 */
	public infoThreads(): IAMCPCommand {
		return this.do(new AMCP.InfoThreadsCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_DELAY>
	 */
	public infoDelay(channel: number, layer?: number): IAMCPCommand {
		return this.do(new AMCP.InfoDelayCommand({channel: channel, layer: layer}));
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
	public cgInfo(channel: number, layer?: number, flashLayer?: number): IAMCPCommand {
		return this.do(new AMCP.CGInfoCommand({channel: channel, layer: layer, flashLayer: flashLayer}));
	}

	/**
	 * Convenience method for calling [[cgInfo]] to return information about `TemplateHost` for a given layer.
	 * 
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INFO>
	 */
	public templateHostInfo(channel: number, layer?: number): IAMCPCommand {
		return this.cgInfo(channel, layer);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#GL_INFO>
	 */
	public glInfo(): IAMCPCommand {
		return this.do(new AMCP.GlInfoCommand());
	}

	/**
	 * @param level		Loglevel set by using [[LogLevel]] enum.
	 */
	public logLevel(level: Enum.LogLevel): IAMCPCommand;
	/**
	 * @param level		LogLevel set by string.
	 */
	public logLevel(level: string): IAMCPCommand;
	/**
	 * Sets the server's [[LogLevel]].
	 * 
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOG_LEVEL>
	 */
	public logLevel(enumOrString: Enum.LogLevel|string): IAMCPCommand {
		return this.do(new AMCP.LogLevelCommand({level: enumOrString}));
	}

	/**
	 * Enabling or disabling logging for a given [[LogCategory]].
	 * 
	 * Convenience methods [[logCalltrace]] and [[logCommunication]] are available.
	 * 
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOG_CATEGORY>
	 */
	public logCategory(category: Enum.LogCategory, enabled: boolean): IAMCPCommand;
	public logCategory(category: string, enabled: boolean): IAMCPCommand;
	public logCategory(category: Enum.LogCategory|string, enabled: boolean): IAMCPCommand {
		let params: Param = {};
		params[category.toString().toLowerCase()] = enabled;
		return this.do(new AMCP.LogCategoryCommand(params));
	}
	/**
	 * Convenience method for enabling or disabling logging for [[LogCategory.CALLTRACE]] through calling [[logCategory]].
	 */
	public logCalltrace(enabled: boolean): IAMCPCommand {
		return this.logCategory(Enum.LogCategory.CALLTRACE, enabled);
	}
	/**
	 * Convenience method for enabling or disabling logging for [[LogCategory.COMMUNICATION]] through calling [[logCategory]].
	 */
	public logCommunication(enabled: boolean): IAMCPCommand {
		return this.logCategory(Enum.LogCategory.COMMUNICATION, enabled);
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DIAG>
	 */
	public diag(): IAMCPCommand {
		return this.do(new AMCP.DiagCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP>
	 */
	public help(): IAMCPCommand;
	public help(command?: Enum.Command): IAMCPCommand;
	public help(commandName?: string): IAMCPCommand;
	public help(commandOrName?: (Enum.Command|string)): IAMCPCommand {
		let param: Param = {};
		if (commandOrName) {
			param["command"] = commandOrName;
		}
		return this.do(new AMCP.HelpCommand(param));
	}

	/**
	 * Convenience method for calling [[help]] with no parameters.
	 * 
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP>
	 */
	public getCommands(): IAMCPCommand {
		return this.help();
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_PRODUCER>
	 */
	public helpProducer(): IAMCPCommand;
	public helpProducer(producer: Enum.Producer): IAMCPCommand;
	public helpProducer(producerName: string): IAMCPCommand;
	public helpProducer(producerOrName?: (Enum.Producer|string)): IAMCPCommand {
		let param: Param = {};
		if (producerOrName) {
			param["producer"] = producerOrName;
		}
		return this.do(new AMCP.HelpProducerCommand(param));
	}

	/**
	 * Convenience method for calling [[helpProducer]] with no parameters.
	 * 
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_PRODUCER>
	 */
	public getProducers(): IAMCPCommand {
		return this.helpProducer();
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_CONSUMER>
	 */
	public helpConsumer(): IAMCPCommand;
	public helpConsumer(consumer: Enum.Consumer): IAMCPCommand;
	public helpConsumer(consumerName: string): IAMCPCommand;
	public helpConsumer(consumerOrName?: (Enum.Consumer|string)): IAMCPCommand {
		let param: Param = {};
		if (consumerOrName) {
			param["consumer"] = consumerOrName;
		}
		return this.do(new AMCP.HelpConsumerCommand(param));
	}

	/**
	 * Convenience method for calling [[helpConsumer]] with no parameters.
	 * 
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_CONSUMER>
	 */
	public getConsumers(): IAMCPCommand {
		return this.helpConsumer();
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#BYE>
	 */
	public bye(): IAMCPCommand {
		return this.do(new AMCP.ByeCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#KILL>
	 */
	public kill(): IAMCPCommand {
		return this.do(new AMCP.KillCommand());
	}

	/**
	 * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#RESTART>
	 */
	public restart(): IAMCPCommand {
		return this.do(new AMCP.RestartCommand());
	}
}