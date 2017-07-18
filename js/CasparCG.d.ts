/// <reference types="node" />
import { EventEmitter } from "events";
import { Enum } from "./lib/ServerStateEnum";
import { IConnectionOptions, ConnectionOptions, Options as OptionsNS } from "./lib/AMCPConnectionOptions";
import QueueMode = OptionsNS.QueueMode;
import ServerVersion = OptionsNS.ServerVersion;
import { Command as CommandNS } from "./lib/AbstractCommand";
import IAMCPCommand = CommandNS.IAMCPCommand;
import { Param as ParamNS } from "./lib/ParamSignature";
import Param = ParamNS.Param;
import TemplateData = ParamNS.TemplateData;
import { SocketStatusOptions } from "./lib/event/Events";
import { Callback as CallbackNS } from "./lib/global/Callback";
import IBooleanCallback = CallbackNS.IBooleanCallback;
import IErrorCallback = CallbackNS.IErrorCallback;
import IStringCallback = CallbackNS.IStringCallback;
import ISocketStatusCallback = CallbackNS.ISocketStatusCallback;
import { Config as ConfigNS } from "./lib/Config";
import CasparCGConfig = ConfigNS.Intermediate.CasparCGConfig;
import { Response as ResponseNS } from "./lib/ResponseParsers";
import CasparCGPaths = ResponseNS.CasparCGPaths;
/**
 *CasparCG Protocols
 */
export declare namespace CasparCGProtocols {
    /**
     *CasparCG Protocol version 2.1
     */
    namespace v2_1 {
        /**
         *AMCP version 2.1
         */
        interface AMCP extends IVideo, IInputOutput, ICG, IMixer, IChannel, IData, IThumbnail, IQuery, IOperation {
        }
        /**
         *AMCP Media-commands
         */
        interface IVideo {
            loadbg(channel: number, layer: number, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): Promise<IAMCPCommand>;
            loadbgAuto(channel: number, layer: number, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand>;
            load(channel: number, layer: number, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand>;
            play(channel: number, layer?: number, clip?: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand>;
            pause(channel: number, layer?: number): Promise<IAMCPCommand>;
            resume(channel: number, layer?: number): Promise<IAMCPCommand>;
            stop(channel: number, layer?: number): Promise<IAMCPCommand>;
        }
        /**
         *AMCP In/Out-commands
         */
        interface IInputOutput {
            loadDecklinkBg(channel: number, layer: number, device: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string, auto?: boolean | number | string): Promise<IAMCPCommand>;
            loadDecklinkBgAuto(channel: number, layer: number, device: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string): Promise<IAMCPCommand>;
            loadDecklink(channel: number, layer: number, device: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string): Promise<IAMCPCommand>;
            playDecklink(channel: number, layer?: number, device?: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string): Promise<IAMCPCommand>;
            loadHtmlPageBg(channel: number, layer: number, url: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): Promise<IAMCPCommand>;
            loadHtmlPageBgAuto(channel: number, layer: number, url: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string): Promise<IAMCPCommand>;
            loadHtmlPage(channel: number, layer: number, url: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string): Promise<IAMCPCommand>;
            playHtmlPage(channel: number, layer?: number, url?: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string): Promise<IAMCPCommand>;
        }
        /**
         *AMCP Template-commands
         */
        interface ICG {
            cgAdd(channel: number, layer: number, flashLayer: number, templateName: string, playOnLoad: boolean | number | string, data?: TemplateData): Promise<IAMCPCommand>;
            cgPlay(channel: number, layer: number, flashLayer: number): Promise<IAMCPCommand>;
            cgStop(channel: number, layer: number, flashLayer: number): Promise<IAMCPCommand>;
            cgNext(channel: number, layer: number, flashLayer: number): Promise<IAMCPCommand>;
            cgRemove(channel: number, layer: number, flashLayer: number): Promise<IAMCPCommand>;
            cgClear(channel: number, layer?: number): Promise<IAMCPCommand>;
            cgUpdate(channel: number, layer: number, flashLayer: number, data: TemplateData): Promise<IAMCPCommand>;
            cgInvoke(channel: number, layer: number, flashLayer: number, methodName: string): Promise<IAMCPCommand>;
        }
        /**
         *AMCP Mixer-commands
         */
        interface IMixer {
            mixerKeyer(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>;
            mixerKeyerDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand>;
            getMixerStatusKeyer(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerChroma(channel: number, layer?: number, keyer?: Enum.Chroma | string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerChromaDeferred(channel: number, layer?: number, keyer?: Enum.Chroma | string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            getMixerStatusChroma(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerBlend(channel: number, layer?: number, blendmode?: Enum.BlendMode | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerBlendDeferred(channel: number, layer?: number, blendmode?: Enum.BlendMode | string): Promise<IAMCPCommand>;
            getMixerStatusBlend(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerOpacity(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerOpacityDeferred(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            getMixerStatusOpacity(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerBrightness(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerBrightnessDeferred(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            getMixerStatusBrightness(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerSaturation(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerSaturationDeferred(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            getMixerStatusSaturation(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerBrightness(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerContrastDeferred(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            getMixerStatusContrast(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerLevels(channel: number, layer?: number, minInput?: number, maxInput?: number, gamma?: number, minOutput?: number, maxOutput?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerLevelsDeferred(channel: number, layer?: number, minInput?: number, maxInput?: number, gamma?: number, minOutput?: number, maxOutput?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            getMixerStatusLevels(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerFill(channel: number, layer?: number, x?: number, y?: number, xScale?: number, yScale?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerFillDeferred(channel: number, layer?: number, x?: number, y?: number, xScale?: number, yScale?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            getMixerStatusFill(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerClip(channel: number, layer?: number, x?: number, y?: number, width?: number, height?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerClipDeferred(channel: number, layer?: number, x?: number, y?: number, width?: number, height?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            getMixerStatusClip(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerAnchor(channel: number, layer?: number, x?: number, y?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerAnchorDeferred(channel: number, layer?: number, x?: number, y?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            getMixerStatusAnchor(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerCrop(channel: number, layer?: number, left?: number, top?: number, right?: number, bottom?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerCropDeferred(channel: number, layer?: number, left?: number, top?: number, right?: number, bottom?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            getMixerStatusCrop(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerRotation(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerRotationDeferred(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            getMixerStatusRotation(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerPerspective(channel: number, layer?: number, topLeftX?: number, topLeftY?: number, topRightX?: number, topRightY?: number, bottomRightX?: number, bottomRightY?: number, bottomLeftX?: number, bottomLeftY?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerPerspectiveDeferred(channel: number, layer?: number, topLeftX?: number, topLeftY?: number, topRightX?: number, topRightY?: number, bottomRightX?: number, bottomRightY?: number, bottomLeftX?: number, bottomLeftY?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            getMixerStatusPerspective(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerMipmap(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>;
            mixerMipmapDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand>;
            getMixerStatusMipmap(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerVolume(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerVolumeDeferred(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            getMixerStatusVolume(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerMastervolume(channel: number, mastervolume?: number, defer?: boolean): Promise<IAMCPCommand>;
            mixerMastervolumeDeferred(channel: number, mastervolume?: number): Promise<IAMCPCommand>;
            getMixerStatusMastervolume(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerStraightAlphaOutput(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>;
            mixerStraightAlphaOutputDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand>;
            getMixerStatusStraightAlphaOutput(channel: number, layer?: number): Promise<IAMCPCommand>;
            mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
            mixerGridDeferred(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
            mixerCommit(channel: number): Promise<IAMCPCommand>;
            mixerClear(channel: number, layer?: number): Promise<IAMCPCommand>;
        }
        /**
         *AMCP Channel-commands
         */
        interface IChannel {
            clear(channel: number, layer?: number): Promise<IAMCPCommand>;
            print(channel: number): Promise<IAMCPCommand>;
            lock(channel: number, action: Enum.Lock | string, lockPhrase?: string): Promise<IAMCPCommand>;
            channelGrid(): Promise<IAMCPCommand>;
            glGC(): Promise<IAMCPCommand>;
        }
        /**
         *AMCP Template Data-commands
         */
        interface IData {
            dataStore(fileName: string, data: TemplateData): Promise<IAMCPCommand>;
            dataRetrieve(fileName: string): Promise<IAMCPCommand>;
            dataList(): Promise<IAMCPCommand>;
            dataRemove(fileName: string): Promise<IAMCPCommand>;
        }
        /**
         *AMCP Thumbnail-commands
         */
        interface IThumbnail {
            thumbnailList(): Promise<IAMCPCommand>;
            thumbnailRetrieve(fileName: string): Promise<IAMCPCommand>;
            thumbnailGenerate(fileName: string): Promise<IAMCPCommand>;
            thumbnailGenerateAll(): Promise<IAMCPCommand>;
        }
        /**
         *AMCP Query-commands
         */
        interface IQuery {
            cinf(fileName: string): Promise<IAMCPCommand>;
            cls(): Promise<IAMCPCommand>;
            fls(): Promise<IAMCPCommand>;
            tls(): Promise<IAMCPCommand>;
            version(component?: Enum.Version): Promise<IAMCPCommand>;
            info(channel?: number, layer?: number): Promise<IAMCPCommand>;
            infoTemplate(template: string): Promise<IAMCPCommand>;
            infoConfig(): Promise<IAMCPCommand>;
            infoPaths(): Promise<IAMCPCommand>;
            infoSystem(): Promise<IAMCPCommand>;
            infoServer(): Promise<IAMCPCommand>;
            infoQueues(): Promise<IAMCPCommand>;
            infoThreads(): Promise<IAMCPCommand>;
            infoDelay(channel: number, layer?: number): Promise<IAMCPCommand>;
            cgInfo(channel: number, layer?: number, flashLayer?: number): Promise<IAMCPCommand>;
            templateHostInfo(channel: number, layer?: number): Promise<IAMCPCommand>;
            glInfo(): Promise<IAMCPCommand>;
            logLevel(level: Enum.LogLevel | string): Promise<IAMCPCommand>;
            logCategory(category: Enum.LogCategory | string, enabled: boolean): Promise<IAMCPCommand>;
            logCalltrace(enabled: boolean): Promise<IAMCPCommand>;
            logCommunication(enabled: boolean): Promise<IAMCPCommand>;
            diag(): Promise<IAMCPCommand>;
            help(command?: Enum.Command | string): Promise<IAMCPCommand>;
            getCommands(): Promise<IAMCPCommand>;
            helpProducer(producer?: Enum.Producer | string): Promise<IAMCPCommand>;
            getProducers(): Promise<IAMCPCommand>;
            helpConsumer(consumer?: Enum.Consumer | string): Promise<IAMCPCommand>;
            getConsumers(): Promise<IAMCPCommand>;
        }
        /**
         *AMCP Operation-commands
         */
        interface IOperation {
            bye(): Promise<IAMCPCommand>;
            kill(): Promise<IAMCPCommand>;
            restart(): Promise<IAMCPCommand>;
        }
    }
}
/**
 *CasparCG Interface
 */
export interface ICasparCGConnection {
    connectionOptions: ConnectionOptions;
    connected: boolean;
    connectionStatus: SocketStatusOptions;
    getCasparCGConfig(refresh: boolean): Promise<CasparCGConfig>;
    getCasparCGPaths(refresh: boolean): Promise<CasparCGPaths>;
    commandQueue: Array<IAMCPCommand>;
    removeQueuedCommand(id: string): boolean;
    connect(options?: IConnectionOptions): void;
    disconnect(): void;
    do(command: IAMCPCommand): Promise<IAMCPCommand>;
    do(commandString: string, ...params: (string | Param)[]): Promise<IAMCPCommand>;
}
/**
 *The main object and entrypoint for all interactions. `CasparCG` allows for flexible configuration, re-configuration and events/callbacks.
 *It implements all [[AMCP]] commands as high-level methods with convenient interfaces.
 *
 *There is a single [[CasparCGSocket]] pr. `CasparCG` object.
 *`CasparCG` should be the only public interface to interact directly with.
 */
export declare class CasparCG extends EventEmitter implements ICasparCGConnection, ConnectionOptions, CasparCGProtocols.v2_1.AMCP {
    private _connected;
    private _host;
    private _port;
    private _autoReconnect;
    private _autoReconnectInterval;
    private _autoReconnectAttempts;
    private _socket;
    private _queuedCommands;
    private _sentCommands;
    private _configPromise;
    private _pathsPromise;
    /**
     *Try to connect upon creation.
     */
    autoConnect: boolean | undefined;
    /**
     *@todo: document
     */
    autoServerVersion: boolean | undefined;
    /**
     *@todo: document
     */
    serverVersion: ServerVersion | undefined;
    /**
     *@todo: document
     */
    queueMode: QueueMode | undefined;
    /**
     *Setting this to true will print out logging to the `Console`, in addition to the optinal [[onLog]] and [[LogEvent.LOG]]
     */
    debug: boolean | undefined;
    /**
     *Callback for all logging.
     */
    onLog: IStringCallback | undefined;
    /**
     *Callback for all status updates from the `CasparCGSocket`.
     */
    onConnectionStatus: ISocketStatusCallback | undefined;
    /**
     *Callback for status updates from the `CasparCGSocket` if the `connected` property changes value.
     */
    onConnectionChanged: IBooleanCallback | undefined;
    /**
     *Callback for status updates from the `CasparCGSocket` if the `connected` property is set to `true`.
     */
    onConnected: IBooleanCallback | undefined;
    /**
     *Callback for status updates from the `CasparCGSocket` if the `connected` property is set to `false`.
     */
    onDisconnected: IBooleanCallback | undefined;
    /**
     *Callback for general errors
     */
    onError: IErrorCallback | undefined;
    /**
     *If the constructor gets called with no parameters, all properties of the CasparCG object will match all default properties defined by [[IConnectionOptions]].
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
     *@param host		Defaults to `IConnectionOptions.host`
     *@param port		Defaults to `IConnectionOptions.host`
     *@param options	An object with combination of properties defined by `IConnectionOptions`. All properties not explicitly set will fall back to the defaults defined by `IConnectionOptions`.
     *
     *All callbacks including [[onConnected]] will be set prior trying to establish connection, so the `CasparCG` object will give back all events even if [[CasparCG.autoConnect]] is `true`.
     */
    constructor();
    /**
     *Set host/port directly in constructor:
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
    constructor(host?: string, port?: number);
    /**
     *Callbacks and events after constructor:
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
     *Callback in constructor:
     *
     ```
     var con = new CasparCG({host: "192.168.0.1", onConnect: onConnectedCallback});
     // Connection callbacks can be set in the constructor and will be registered before autoConnect invokes.
     // This ensures that you recieve all callbacks
     ```
     *Inline function syntax:
     *
     ```
     var con = new CasparCG({host: "192.168.0.1", onConnect: function(connected) {
            // do something once we get connected
            console.log("Are we conencted?", connected)
        }
    });
     ```
     *Inline fat arrow syntax:
     *
     ```
     var con = new CasparCG({host: "192.168.0.1", onConnect: (connected) => {
            // do something once we get connected
            ("Are we conencted?", connected)
        }
    });
     ```
     *
     */
    constructor(options: IConnectionOptions);
    /**
     *
     */
    private _createNewSocket(options?, enforceRecreation?);
    /**
     *Creates a new [[CasparCGSocket]] and connects.
     *
     *@param options	Setting new [[ICasparCGConnection]] properties will override each individual property allready defined on the `CasparCG` object. Existing properties not overwritten by this `options` object will remain.
     */
    connect(options?: IConnectionOptions): void;
    /**
     *Disconnects and disposes the [[CasparCGSocket]] connection.
     */
    disconnect(): void;
    /**
     *
     */
    reconnect(): void;
    /**
     *
     */
    /**
     *Setting the `host` will create a new [[CasparCGSocket]] connection.
     *
     *The new `CasparCGSocket` will `autoConnect` if the old socket was either successfully connected, or currently reconnecting. Changing the host resets the number of [[CasparCG.autoReconnectAttempts]].
     */
    host: string;
    /**
     *
     */
    /**
     *Setting the `port` will create a new [[CasparCGSocket]] connection.
     *
     *The new `CasparCGSocket` will `autoConnect` if the old socket was either successfully connected, or currently reconnecting. Changing the host resets the number of [[CasparCG.autoReconnectAttempts]].
     */
    port: number;
    /**
     *Try to reconnect in case of unintentionally loss of connection, or in case of failed connection in the first place.
     */
    /**
     *
     */
    autoReconnect: boolean;
    /**
     *Timeout in milliseconds between each connection attempt during reconnection.
     */
    /**
     *
     */
    autoReconnectInterval: number;
    /**
     *Max number of attempts of connection during reconnection. This value resets once the reconnection is over (either in case of successfully reconnecting, changed connection properties such as `host` or `port` or by being manually cancelled).
     */
    /**
     *
     */
    autoReconnectAttempts: number;
    /**
     *
     */
    readonly connectionOptions: ConnectionOptions;
    /**
     *
     */
    readonly connected: boolean;
    /**
     *
     */
    readonly connectionStatus: SocketStatusOptions;
    /**
     *
     */
    private _onSocketStatusChange(socketStatus);
    /**
     *
     */
    private _onSocketStatusTimeout();
    /**
     *
     */
    readonly commandQueue: Array<IAMCPCommand>;
    /**
     *
     */
    private _onSocketError(error);
    /**
     *
     */
    private _log(args);
    /**
     *@todo	implement
     *@todo	document
     */
    do(command: IAMCPCommand): Promise<IAMCPCommand>;
    do(commandString: string, ...params: (string | Param)[]): Promise<IAMCPCommand>;
    /**
     *
     */
    private _addQueuedCommand(command);
    /**
     *@todo: document
     */
    removeQueuedCommand(id: string): boolean;
    /**
     *
     */
    private _handleSocketResponse(socketResponse);
    /**
     *
     */
    private _handleInvalidSocketResponse();
    /**
     *
     */
    private _expediteCommand(flushSent?);
    /**	 */
    private _setVersionFromServerResponse(serverVersionResponse);
    /***/
    getCasparCGConfig(refresh?: boolean): Promise<CasparCGConfig>;
    /***/
    getCasparCGPaths(refresh?: boolean): Promise<CasparCGPaths>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
     */
    loadbg(channel: number, layer: number | undefined, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string, auto?: boolean | number | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
     */
    loadbgAuto(channel: number, layer: number | undefined, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOAD>
     */
    load(channel: number, layer: number | undefined, clip: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PLAY>
     */
    play(channel: number, layer?: number): Promise<IAMCPCommand>;
    play(channel: number, layer: number, clip?: string, loop?: boolean, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, seek?: number, length?: number, filter?: string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
     */
    loadDecklinkBg(channel: number, layer: number | undefined, device: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string, auto?: boolean | number | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
     */
    loadDecklinkBgAuto(channel: number, layer: number | undefined, device: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOAD>
     */
    loadDecklink(channel: number, layer: number | undefined, device: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PLAY>
     */
    playDecklink(channel: number, layer?: number): Promise<IAMCPCommand>;
    playDecklink(channel: number, layer: number, device?: number, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, length?: number, filter?: string, format?: Enum.ChannelFormat | string, channelLayout?: Enum.ChannelLayout | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
     */
    loadHtmlPageBg(channel: number, layer: number | undefined, clip: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string, auto?: boolean | number | string): Promise<IAMCPCommand>;
    /**
     *
     */
    loadHtmlPageBgAuto(channel: number, layer: number | undefined, url: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOAD>
     */
    loadHtmlPage(channel: number, layer: number | undefined, url: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PLAY>
     */
    playHtmlPage(channel: number, layer?: number): Promise<IAMCPCommand>;
    playHtmlPage(channel: number, layer: number, url?: string, transition?: Enum.Transition | string, transitionDuration?: number, transitionEasing?: Enum.Ease | string, transitionDirection?: Enum.Direction | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PAUSE>
     */
    pause(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#RESUME>
     */
    resume(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#STOP>
     */
    stop(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_ADD>
     */
    cgAdd(channel: number, layer: number | undefined, flashLayer: number | undefined, templateName: string, playOnLoad?: boolean | number | string, data?: TemplateData): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_PLAY>
     */
    cgPlay(channel: number, layer?: number, flashLayer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_STOP>
     */
    cgStop(channel: number, layer?: number, flashLayer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_NEXT>
     */
    cgNext(channel: number, layer?: number, flashLayer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_REMOVE>
     */
    cgRemove(channel: number, layer?: number, flashLayer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_CLEAR>
     */
    cgClear(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_UPDATE>
     */
    cgUpdate(channel: number, layer: number | undefined, flashLayer: number, data: TemplateData): Promise<IAMCPCommand>;
    cgInvoke(channel: number, layer: number, flashLayer: number, method: string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
     */
    mixerKeyer(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerKeyer(channel: number, layer: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
     */
    mixerKeyerDeferred(channel: number, layer: number, state?: number | boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
     */
    getMixerStatusKeyer(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
     */
    mixerChroma(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerChroma(channel: number, layer: number, keyer: Enum.Chroma, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerChroma(channel: number, layer: number, keyer: string, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerChroma(channel: number, layer: number, keyer?: Enum.Chroma | string, threshold?: number, softness?: number, spill?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
     */
    mixerChromaDeferred(channel: number, layer: number, keyer: Enum.Chroma, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    mixerChromaDeferred(channel: number, layer: number, keyer: string, threshold: number, softness: number, spill: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
     */
    getMixerStatusChroma(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
     */
    mixerBlend(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerBlend(channel: number, layer: number, blendmode: Enum.BlendMode, defer?: boolean): Promise<IAMCPCommand>;
    mixerBlend(channel: number, layer: number, blendmode: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerBlend(channel: number, layer?: number, blendmode?: Enum.BlendMode | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
     */
    mixerBlendDeferred(channel: number, layer: number, blendmode: Enum.BlendMode): Promise<IAMCPCommand>;
    mixerBlendDeferred(channel: number, layer: number, blendmode: string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
     */
    getMixerStatusBlend(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
     */
    mixerOpacity(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerOpacity(channel: number, layer: number, opacity: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerOpacity(channel: number, layer: number, opacity: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerOpacity(channel: number, layer?: number, opacity?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
     */
    mixerOpacityDeferred(channel: number, layer: number | undefined, opacity: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
     */
    getMixerStatusOpacity(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
     */
    mixerBrightness(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerBrightness(channel: number, layer: number, brightness: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerBrightness(channel: number, layer: number, brightness: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerBrightness(channel: number, layer?: number, brightness?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
     */
    mixerBrightnessDeferred(channel: number, layer: number | undefined, brightness: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
     */
    getMixerStatusBrightness(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
     */
    mixerSaturation(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerSaturation(channel: number, layer: number, saturation: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerSaturation(channel: number, layer: number, saturation: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerSaturation(channel: number, layer?: number, saturation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
     */
    mixerSaturationDeferred(channel: number, layer: number | undefined, saturation: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
     */
    getMixerStatusSaturation(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
     */
    mixerContrast(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerContrast(channel: number, layer: number, contrast: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerContrast(channel: number, layer: number, contrast: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerContrast(channel: number, layer?: number, contrast?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
     */
    mixerContrastDeferred(channel: number, layer: number | undefined, contrast: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
     */
    getMixerStatusContrast(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
     */
    mixerLevels(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerLevels(channel: number, layer: number, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerLevels(channel: number, layer: number, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerLevels(channel: number, layer: number, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
     */
    mixerLevelsDeferred(channel: number, layer: number | undefined, minInput: number, maxInput: number, gamma: number, minOutput: number, maxOutput: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
     */
    getMixerStatusLevels(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
     */
    mixerFill(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerFill(channel: number, layer: number, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerFill(channel: number, layer: number, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerFill(channel: number, layer: number, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    mixerFillDeferred(channel: number, layer: number | undefined, x: number, y: number, xScale: number, yScale: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
     */
    getMixerStatusFill(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
     */
    mixerClip(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerClip(channel: number, layer: number, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerClip(channel: number, layer: number, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerClip(channel: number, layer: number, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
     */
    mixerClipDeferred(channel: number, layer: number | undefined, x: number, y: number, width: number, height: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
     */
    getMixerStatusClip(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
     */
    mixerAnchor(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerAnchor(channel: number, layer: number, x: number, y: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerAnchor(channel: number, layer: number, x: number, y: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerAnchor(channel: number, layer: number, x: number, y: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
     */
    mixerAnchorDeferred(channel: number, layer: number | undefined, x: number, y: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
     */
    getMixerStatusAnchor(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
     */
    mixerCrop(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerCrop(channel: number, layer: number, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerCrop(channel: number, layer: number, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerCrop(channel: number, layer: number, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
     */
    mixerCropDeferred(channel: number, layer: number | undefined, left: number, top: number, right: number, bottom: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
     */
    getMixerStatusCrop(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
     */
    mixerRotation(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerRotation(channel: number, layer: number, rotation: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerRotation(channel: number, layer: number, rotation: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerRotation(channel: number, layer?: number, rotation?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
     */
    mixerRotationDeferred(channel: number, layer: number | undefined, rotation: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
     */
    getMixerStatusRotation(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
     */
    mixerPerspective(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerPerspective(channel: number, layer: number, topLeftX: number, topLeftY: number, topRightX: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottomLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerPerspective(channel: number, layer: number, topLeftX: number, topLeftY: number, topRightX: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottomLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerPerspective(channel: number, layer: number, topLeftX: number, topLeftY: number, topRightX: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottomLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
     */
    mixerPerspectiveDeferred(channel: number, layer: number | undefined, topLeftX: number, topLeftY: number, topRightX: number, topRightY: number, bottomRightX: number, bottomRightY: number, bottomLeftX: number, bottomLeftY: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
     */
    getMixerStatusPerspective(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
     */
    mixerMipmap(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerMipmap(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
     */
    mixerMipmapDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
     */
    getMixerStatusMipmap(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
     */
    mixerVolume(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerVolume(channel: number, layer: number, volume: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerVolume(channel: number, layer: number, volume: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerVolume(channel: number, layer?: number, volume?: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
     */
    mixerVolumeDeferred(channel: number, layer: number | undefined, volume: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
     */
    getMixerStatusVolume(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
     */
    mixerMastervolume(channel: number): Promise<IAMCPCommand>;
    mixerMastervolume(channel: number, mastervolume?: number, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
     */
    mixerMastervolumeDeferred(channel: number, mastervolume?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
     */
    getMixerStatusMastervolume(channel: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
     */
    mixerStraightAlphaOutput(channel: number, layer?: number): Promise<IAMCPCommand>;
    mixerStraightAlphaOutput(channel: number, layer?: number, state?: number | boolean, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
     */
    mixerStraightAlphaOutputDeferred(channel: number, layer?: number, state?: number | boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
     */
    getMixerStatusStraightAlphaOutput(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_GRID>
     */
    mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease, defer?: boolean): Promise<IAMCPCommand>;
    mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: string, defer?: boolean): Promise<IAMCPCommand>;
    mixerGrid(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string, defer?: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_GRID>
     */
    mixerGridDeferred(channel: number, resolution: number, transitionDuration?: number, transitionEasing?: Enum.Ease | string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_COMMIT>
     */
    mixerCommit(channel: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLEAR>
     */
    mixerClear(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CLEAR>
     */
    clear(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *@todo	implement
     *@todo	document
     */
    call(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *@todo	implement
     *@todo	document
     */
    swap(): Promise<IAMCPCommand>;
    /**
     *@todo	implement
     *@todo	document
     */
    add(channel: number): Promise<IAMCPCommand>;
    /**
     *@todo	implement
     *@todo	document
     */
    remove(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PRINT>
     */
    print(channel: number): Promise<IAMCPCommand>;
    /**
     *@todo	implement
     *@todo	document
     */
    set(channel: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOCK>
     */
    lock(channel: number, action: Enum.Lock, lockPhrase?: string): Promise<IAMCPCommand>;
    lock(channel: number, action: string, lockPhrase?: string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CHANNEL_GRID>
     */
    channelGrid(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#GL_GC>
     */
    glGC(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_STORE>
     */
    dataStore(fileName: string, data: TemplateData): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_RETRIEVE>
     */
    dataRetrieve(fileName: string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_LIST>
     */
    dataList(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_REMOVE>
     */
    dataRemove(fileName: string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_LIST>
     */
    thumbnailList(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_RETRIEVE>
     */
    thumbnailRetrieve(fileName: string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_GENERATE>
     */
    thumbnailGenerate(fileName: string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_GENERATE_ALL>
     */
    thumbnailGenerateAll(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CINF>
     */
    cinf(fileName: string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CLS>
     */
    cls(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#FLS>
     */
    fls(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#TLS>
     */
    tls(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#VERSION>
     */
    version(component?: Enum.Version): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO>
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_2>
     */
    info(channel?: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_TEMPLATE>
     */
    infoTemplate(template: string): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_CONFIG>
     */
    infoConfig(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_PATHS>
     */
    infoPaths(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_SYSTEM>
     */
    infoSystem(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_SERVER>
     */
    infoServer(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_QUEUES>
     */
    infoQueues(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_THREADS>
     */
    infoThreads(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_DELAY>
     */
    infoDelay(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *Retrieves information about a running template or the templatehost.
     *
     *Calling `infoDelay` without `flashLayer` parameter is the same as calling the convenience method [[templateHostInfo]].
     *
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INFO>
     *
     *@param flashLayer	If not specified, information about the `TemplateHost` will be returned.
     */
    cgInfo(channel: number, layer?: number, flashLayer?: number): Promise<IAMCPCommand>;
    /**
     *Convenience method for calling [[cgInfo]] to return information about `TemplateHost` for a given layer.
     *
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INFO>
     */
    templateHostInfo(channel: number, layer?: number): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#GL_INFO>
     */
    glInfo(): Promise<IAMCPCommand>;
    /**
     *@param level		Loglevel set by using [[LogLevel]] enum.
     */
    logLevel(level: Enum.LogLevel): Promise<IAMCPCommand>;
    /**
     *@param level		LogLevel set by string.
     */
    logLevel(level: string): Promise<IAMCPCommand>;
    /**
     *Enabling or disabling logging for a given [[LogCategory]].
     *
     *Convenience methods [[logCalltrace]] and [[logCommunication]] are available.
     *
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOG_CATEGORY>
     */
    logCategory(category: Enum.LogCategory, enabled: boolean): Promise<IAMCPCommand>;
    logCategory(category: string, enabled: boolean): Promise<IAMCPCommand>;
    /**
     *Convenience method for enabling or disabling logging for [[LogCategory.CALLTRACE]] through calling [[logCategory]].
     */
    logCalltrace(enabled: boolean): Promise<IAMCPCommand>;
    /**
     *Convenience method for enabling or disabling logging for [[LogCategory.COMMUNICATION]] through calling [[logCategory]].
     */
    logCommunication(enabled: boolean): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DIAG>
     */
    diag(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP>
     */
    help(): Promise<IAMCPCommand>;
    help(command?: Enum.Command): Promise<IAMCPCommand>;
    help(commandName?: string): Promise<IAMCPCommand>;
    /**
     *Convenience method for calling [[help]] with no parameters.
     *
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP>
     */
    getCommands(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_PRODUCER>
     */
    helpProducer(): Promise<IAMCPCommand>;
    helpProducer(producer: Enum.Producer): Promise<IAMCPCommand>;
    helpProducer(producerName: string): Promise<IAMCPCommand>;
    /**
     *Convenience method for calling [[helpProducer]] with no parameters.
     *
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_PRODUCER>
     */
    getProducers(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_CONSUMER>
     */
    helpConsumer(): Promise<IAMCPCommand>;
    helpConsumer(consumer: Enum.Consumer): Promise<IAMCPCommand>;
    helpConsumer(consumerName: string): Promise<IAMCPCommand>;
    /**
     *Convenience method for calling [[helpConsumer]] with no parameters.
     *
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#HELP_CONSUMER>
     */
    getConsumers(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#BYE>
     */
    bye(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#KILL>
     */
    kill(): Promise<IAMCPCommand>;
    /**
     *<http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#RESTART>
     */
    restart(): Promise<IAMCPCommand>;
}
