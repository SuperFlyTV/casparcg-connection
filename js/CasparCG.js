import { CasparCGSocket } from "./lib/CasparCGSocket";
import { AMCP } from "./lib/AMCP";
import { Enum } from "./lib/ServerStateEnum";
import { ConnectionOptions, Options as OptionsNS } from "./lib/AMCPConnectionOptions";
// Options NS
var QueueMode = OptionsNS.QueueMode;
var ServerVersion = OptionsNS.ServerVersion;
// Command NS
import { Command as CommandNS } from "./lib/AbstractCommand";
var isIAMCPCommand = CommandNS.isIAMCPCommand;
var IAMCPStatus = CommandNS.IAMCPStatus;
var AMCPResponse = CommandNS.AMCPResponse;
// Event NS
import { CasparCGSocketStatusEvent, CasparCGSocketCommandEvent, CasparCGSocketResponseEvent, LogEvent } from "./lib/event/Events";
/**
 * The main object and entrypoint for all interactions. `CasparCG` allows for flexible configuration, re-configuration and events/callbacks.
 * It implements all [[AMCP]] commands as high-level methods with convenient interfaces.
 *
 * There is a single [[CasparCGSocket]] pr. `CasparCG` object.
 * `CasparCG` should be the only public interface to interact directly with.
 */
export class CasparCG extends NodeJS.EventEmitter {
    constructor(hostOrOptions, port) {
        super();
        this._queuedCommands = [];
        this._sentCommands = [];
        /**
         * Try to connect upon creation.
         */
        this.autoConnect = undefined;
        /**
         * @todo: document
         */
        this.autoServerVersion = undefined;
        /**
         * @todo: document
         */
        this.serverVersion = undefined;
        /**
         * @todo: document
         */
        this.queueMode = undefined;
        /**
         * Setting this to true will print out logging to the `Console`, in addition to the optinal [[onLog]] and [[LogEvent.LOG]].
         */
        this.debug = undefined;
        /**
         * Callback for all logging.
         */
        this.onLog = undefined;
        /**
         * Callback for all status updates from the `CasparCGSocket`.
         */
        this.onConnectionStatus = undefined;
        /**
         * Callback for status updates from the `CasparCGSocket` if the `connected` property changes value.
         */
        this.onConnectionChanged = undefined;
        /**
         * Callback for status updates from the `CasparCGSocket` if the `connected` property is set to `true`.
         */
        this.onConnected = undefined;
        /**
         * Callback for status updates from the `CasparCGSocket` if the `connected` property is set to `false`.
         */
        this.onDisconnected = undefined;
        /**
         * Callback for general errors
         */
        this.onError = undefined;
        let options;
        if (typeof hostOrOptions === "object") {
            options = new ConnectionOptions(hostOrOptions);
        }
        else {
            options = new ConnectionOptions(hostOrOptions, port);
        }
        // if both options and port specified, port overrides options
        if (port && (port !== options.port)) {
            options.port = port;
        }
        this._createNewSocket(options);
        this.on(CasparCGSocketStatusEvent.STATUS, (event) => this._onSocketStatusChange(event));
        this.on(CasparCGSocketStatusEvent.TIMEOUT, () => this._onSocketStatusTimeout());
        this.on(CasparCGSocketResponseEvent.RESPONSE, (event) => this._handleSocketResponse(event.response));
        this.on(CasparCGSocketResponseEvent.INVALID_RESPONSE, (event) => this._handleInvalidSocketResponse(event.response));
        if (this.autoConnect) {
            this.connect();
        }
    }
    /**
     *
     */
    _createNewSocket(options, enforceRecreation = false) {
        let hasNewOptions = false;
        if (options) {
            for (let key in options) {
                if (!options.hasOwnProperty(key)) {
                    continue;
                }
                if (this.hasOwnProperty(key) || CasparCG.prototype.hasOwnProperty(key)) {
                    // only update new options
                    if (this[key] !== options[key]) {
                        this[key] = options[key];
                        hasNewOptions = true;
                    }
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
        this._socket.on("error", (error) => this._onSocketError(error));
        // inherit log method
        this._socket.log = (args) => this._log(args);
    }
    /**
     * Creates a new [[CasparCGSocket]] and connects.
     *
     * @param options	Setting new [[ICasparCGConnection]] properties will override each individual property allready defined on the `CasparCG` object. Existing properties not overwritten by this `options` object will remain.
     */
    connect(options) {
        // recreate socket if new options
        if (options) {
            this._createNewSocket(options);
        }
        if (this._socket) {
            this._socket.connect();
        }
    }
    /**
     * Disconnects and disposes the [[CasparCGSocket]] connection.
     */
    disconnect() {
        if (this._socket) {
            this._socket.disconnect();
        }
    }
    /**
     *
     */
    reconnect() {
        this._createNewSocket(undefined, true);
        this.connect();
    }
    /**
     *
     */
    get host() {
        return this._host;
    }
    /**
     * Setting the `host` will create a new [[CasparCGSocket]] connection.
     *
     * The new `CasparCGSocket` will `autoConnect` if the old socket was either successfully connected, or currently reconnecting. Changing the host resets the number of [[CasparCG.autoReconnectAttempts]].
     */
    set host(host) {
        if (this._host !== host) {
            this._host = host;
            if (this._socket != null) {
                let shouldReconnect = (this.connected || this._socket.reconnecting);
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
    get port() {
        return this._port;
    }
    /**
     * Setting the `port` will create a new [[CasparCGSocket]] connection.
     *
     * The new `CasparCGSocket` will `autoConnect` if the old socket was either successfully connected, or currently reconnecting. Changing the host resets the number of [[CasparCG.autoReconnectAttempts]].
     */
    set port(port) {
        if (this._port !== port) {
            this._port = port;
            if (this._socket != null) {
                let shouldReconnect = (this.connected || this._socket.reconnecting);
                this._createNewSocket();
                if (shouldReconnect) {
                    this.connect();
                }
            }
        }
    }
    /**
     * Try to reconnect in case of unintentionally loss of connection, or in case of failed connection in the first place.
     */
    get autoReconnect() {
        return this._autoReconnect;
    }
    /**
     *
     */
    set autoReconnect(autoReconnect) {
        this._autoReconnect = autoReconnect;
        if (this._socket) {
            this._socket.autoReconnect = this._autoReconnect;
        }
    }
    /**
     * Timeout in milliseconds between each connection attempt during reconnection.
     */
    get autoReconnectInterval() {
        return this._autoReconnectInterval;
    }
    /**
     *
     */
    set autoReconnectInterval(autoReconnectInterval) {
        this._autoReconnectInterval = autoReconnectInterval;
        if (this._socket) {
            this._socket.autoReconnectInterval = this._autoReconnectInterval;
        }
    }
    /**
     * Max number of attempts of connection during reconnection. This value resets once the reconnection is over (either in case of successfully reconnecting, changed connection properties such as `host` or `port` or by being manually cancelled).
     */
    get autoReconnectAttempts() {
        return this._autoReconnectAttempts;
    }
    /**
     *
     */
    set autoReconnectAttempts(autoReconnectAttempts) {
        this._autoReconnectAttempts = autoReconnectAttempts;
        if (this._socket) {
            this._socket.autoReconnectAttempts = this._autoReconnectAttempts;
        }
    }
    /**
     *
     */
    get connectionOptions() {
        let options = new ConnectionOptions({});
        for (let key in options) {
            if (this.hasOwnProperty(key) || CasparCG.hasOwnProperty(key)) {
                options[key] = this[key];
            }
        }
        return options;
    }
    /**
     *
     */
    get connected() {
        return this._connected || false;
    }
    /**
     *
     */
    get connectionStatus() {
        return this._socket.socketStatus;
    }
    /**
     *
     */
    _onSocketStatusChange(socketStatus) {
        let connected = socketStatus.valueOf().connected === true;
        if (this.onConnectionStatus) {
            this.onConnectionStatus(socketStatus.valueOf());
        }
        if (connected !== this._connected) {
            this._connected = connected;
            this.emit(CasparCGSocketStatusEvent.STATUS_CHANGED, socketStatus);
            if (this.onConnectionChanged) {
                this.onConnectionChanged(this._connected);
            }
            if (this._connected) {
                // @todo: handle flush SENT-buffer + shift/push version command in queue.
                // reset cached data
                delete this._configPromise;
                delete this._pathsPromise;
                if (this.autoServerVersion) {
                    this.version(Enum.Version.SERVER).then((result) => {
                        this._setVersionFromServerResponse(result.response);
                    });
                }
                else {
                    this._expediteCommand(true);
                }
                this.emit(CasparCGSocketStatusEvent.CONNECTED, socketStatus);
                if (this.onConnected) {
                    this.onConnected(this._connected);
                }
            }
            if (!this._connected) {
                this.emit(CasparCGSocketStatusEvent.DISCONNECTED, socketStatus);
                if (this.onDisconnected) {
                    this.onDisconnected(this._connected);
                }
            }
        }
    }
    /**
     *
     */
    _onSocketStatusTimeout() {
        let shouldReset = false;
        while (this._sentCommands.length > 0) {
            shouldReset = true;
            let i;
            i = this._sentCommands.shift();
            this._log(`Command timed out, ${this._sentCommands.length} commands sent. Timeout: "${i.name}"`);
            i.status = IAMCPStatus.Timeout;
            i.reject(i);
        }
        if (shouldReset) {
            this.reconnect();
        }
    }
    /**
     *
     */
    get commandQueue() {
        return this._queuedCommands;
    }
    /**
     *
     */
    _onSocketError(error) {
        this._log(error);
    }
    /**
     *
     */
    _log(args) {
        if (args instanceof Error) {
            console.error(args);
            if (this.onError) {
                this.onError(args);
                this.emit("error", args);
                return;
            }
        }
        if (this.debug) {
            console.log(args);
        }
        if (this.onLog) {
            this.onLog(args);
        }
        this.emit(LogEvent.LOG, new LogEvent(args));
    }
    do(commandOrString, ...params) {
        let command;
        try {
            if (isIAMCPCommand(commandOrString)) {
                command = commandOrString;
            }
            else if (typeof commandOrString === "string") {
                if (AMCP.hasOwnProperty(commandOrString)) {
                    // @todo: parse out params from commandString, if Params is empty and commandString.split(" ").length > 1
                    // @todo: typechecking with fallback
                    command = Object.create(AMCP[commandOrString]["prototype"]);
                    // @todo: typechecking with fallback
                    if (command) {
                        command.constructor.apply(command, params);
                    }
                    else {
                        throw new Error("Invalid command constructor");
                    }
                }
            }
            else {
                // @todo: Handle, return?
                throw new Error("Invalid command or commandstring");
            }
            // validate command and params
            if (!command || !command.validateParams()) {
                // @todo: Handle, return?
                throw new Error("Invalid command parameters");
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
        let commandPromise = new Promise((resolve, reject) => {
            command.resolve = resolve;
            command.reject = reject;
            this._addQueuedCommand(command);
        });
        commandPromise.catch((error) => {
            // @todo: global command error handler here
            this._log("Command error: " + error.toString());
        });
        return commandPromise;
    }
    /**
     *
     */
    _addQueuedCommand(command) {
        this._queuedCommands.push(command);
        this._log(`New command added, ${this._queuedCommands.length} on queue. Added: "${command.name}"`);
        command.status = IAMCPStatus.Queued;
        this._expediteCommand();
        return command;
    }
    /**
     * @todo: document
     */
    removeQueuedCommand(id) {
        let removed;
        for (let i = 0; i < this._queuedCommands.length; i++) {
            let o = this._queuedCommands[i];
            if (o.id === id) {
                removed = this._queuedCommands.splice(i, 1);
                this._log(`Command removed, ${this._queuedCommands.length} on queue. Removed: "${removed[0].name}"`);
                break;
            }
        }
        return Array.isArray(removed) && removed.length > 0;
    }
    /**
     *
     */
    _handleSocketResponse(socketResponse) {
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
        // handle empty responses
        if (this._sentCommands.length === 0) {
            return;
        }
        let currentCommand = (this._sentCommands.shift());
        this._log(`Handling response, ${this._sentCommands.length} commands sent. Handling: "${currentCommand.name}"`);
        if (!(currentCommand.response instanceof AMCPResponse)) {
            currentCommand.response = new AMCPResponse();
        }
        if (currentCommand.validateResponse(socketResponse)) {
            currentCommand.status = IAMCPStatus.Suceeded;
            currentCommand.resolve(currentCommand);
        }
        else {
            currentCommand.status = IAMCPStatus.Failed;
            currentCommand.reject(currentCommand);
        }
        this.emit(CasparCGSocketCommandEvent.RESPONSE, new CasparCGSocketCommandEvent(currentCommand));
        if (this._socket.isRestarting) {
            return;
        }
        this._expediteCommand();
    }
    /**
     *
     */
    _handleInvalidSocketResponse(socketResponse) {
        if (socketResponse.responseString === "\r\n" && this._socket.isRestarting && this.serverVersion && this.serverVersion < 2100) {
            this._expediteCommand(true);
        }
    }
    /**
     *
     */
    _expediteCommand(flushSent = false) {
        if (flushSent) {
            while (this._sentCommands.length > 0) {
                let i = (this._sentCommands.shift());
                this._log(`Flushing commands, ${this._sentCommands.length} commands sent. Deleting: "${i.name}"`);
                if (i instanceof AMCP.RestartCommand && this._socket.isRestarting) {
                    i.status = IAMCPStatus.Suceeded;
                    i.resolve(i);
                    continue;
                }
                else {
                    i.status = IAMCPStatus.Failed;
                    i.reject(i);
                }
            }
        }
        if (this.connected) {
            // @todo add TTL for cleanup on stuck commands
            // salvo mode
            /*if (this.queueMode === QueueMode.SALVO) {
                if (this._queuedCommands.length > 0) {
                    let nextCommand: IAMCPCommand = (this._queuedCommands.shift())!;
                    this._sentCommands.push(nextCommand);
                    this._socket.executeCommand(nextCommand);
                }
            }*/
            // sequential mode
            if (this.queueMode === QueueMode.SEQUENTIAL) {
                if (this._queuedCommands.length > 0 && this._sentCommands.length === 0) {
                    let nextCommand = (this._queuedCommands.shift());
                    this._sentCommands.push(nextCommand);
                    this._log(`Sending command, ${this._sentCommands.length} commands sent, ${this._queuedCommands.length} commands on queue. Sending: "${nextCommand.name}"`);
                    this._socket.executeCommand(nextCommand);
                }
            }
        }
        else {
            // reconnect on missing connection, if  not restating
            if (!this._socket.isRestarting) {
                this.reconnect();
            }
        }
    }
    /**	 */
    _setVersionFromServerResponse(serverVersionResponse) {
        let versionString = serverVersionResponse.data.toString().slice(0, 5);
        switch (versionString) {
            case "2.0.7":
                this.serverVersion = ServerVersion.V207;
                break;
            case "2.1.0":
                this.serverVersion = ServerVersion.V210;
                break;
        }
    }
    /** */
    getCasparCGConfig(refresh = false) {
        if (!this._configPromise || refresh) {
            this._configPromise = new Promise((resolve) => {
                this.infoConfig().then((response) => {
                    resolve(response.response.data);
                });
            });
        }
        return this._configPromise;
    }
    /** */
    getCasparCGPaths(refresh = false) {
        if (!this._pathsPromise || refresh) {
            this._pathsPromise = new Promise((resolve) => {
                this.infoPaths().then((response) => {
                    resolve(response.response.data);
                });
            });
        }
        return this._pathsPromise;
    }
    ///*********************////
    ///***		API		****////
    ///*********************///
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
     */
    loadbg(channel, layer = NaN, clip, loop, transition, transitionDuration, transitionEasing, transitionDirection, seek, length, filter, auto) {
        return this.do(new AMCP.LoadbgCommand({ channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter, auto: auto }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
     */
    loadbgAuto(channel, layer = NaN, clip, loop, transition, transitionDuration, transitionEasing, transitionDirection, seek, length, filter) {
        return this.do(new AMCP.LoadbgCommand({ channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter, auto: true }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOAD>
     */
    load(channel, layer = NaN, clip, loop, transition, transitionDuration, transitionEasing, transitionDirection, seek, length, filter) {
        return this.do(new AMCP.LoadCommand({ channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter }));
    }
    play(channel, layer = NaN, clip, loop, transition, transitionDuration, transitionEasing, transitionDirection, seek, length, filter) {
        return this.do(new AMCP.PlayCommand({ channel: channel, layer: layer, clip: clip, loop: loop, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, seek: seek, length: length, filter: filter }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
     */
    loadDecklinkBg(channel, layer = NaN, device, transition, transitionDuration, transitionEasing, transitionDirection, length, filter, format, channelLayout, auto) {
        return this.do(new AMCP.LoadDecklinkBgCommand({ channel: channel, layer: layer, device: device, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, length: length, filter: filter, format: format, channelLayout: channelLayout, auto: auto }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
     */
    loadDecklinkBgAuto(channel, layer = NaN, device, transition, transitionDuration, transitionEasing, transitionDirection, length, filter, format, channelLayout) {
        return this.do(new AMCP.LoadDecklinkBgCommand({ channel: channel, layer: layer, device: device, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, length: length, filter: filter, format: format, channelLayout: channelLayout, auto: true }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOAD>
     */
    loadDecklink(channel, layer = NaN, device, transition, transitionDuration, transitionEasing, transitionDirection, length, filter, format, channelLayout) {
        return this.do(new AMCP.LoadDecklinkCommand({ channel: channel, layer: layer, device: device, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, length: length, filter: filter, format: format, channelLayout: channelLayout }));
    }
    playDecklink(channel, layer = NaN, device, transition, transitionDuration, transitionEasing, transitionDirection, length, filter, format, channelLayout) {
        return this.do(new AMCP.PlayDecklinkCommand({ channel: channel, layer: layer, device: device, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, length: length, filter: filter, format: format, channelLayout: channelLayout }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOADBG>
     */
    loadHtmlPageBg(channel, layer = NaN, clip, transition, transitionDuration, transitionEasing, transitionDirection, auto) {
        return this.do(new AMCP.LoadHtmlPageBgCommand({ channel: channel, layer: layer, clip: clip, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, auto: auto }));
    }
    /**
     *
     */
    loadHtmlPageBgAuto(channel, layer = NaN, url, transition, transitionDuration, transitionEasing, transitionDirection) {
        return this.do(new AMCP.LoadHtmlPageBgCommand({ channel: channel, layer: layer, url: url, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection, auto: true }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOAD>
     */
    loadHtmlPage(channel, layer = NaN, url, transition, transitionDuration, transitionEasing, transitionDirection) {
        return this.do(new AMCP.LoadHtmlPageCommand({ channel: channel, layer: layer, url: url, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection }));
    }
    playHtmlPage(channel, layer = NaN, url, transition, transitionDuration, transitionEasing, transitionDirection) {
        return this.do(new AMCP.PlayHtmlPageCommand({ channel: channel, layer: layer, url: url, transition: transition, transitionDuration: transitionDuration, transitionEasing: transitionEasing, transitionDirection: transitionDirection }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PAUSE>
     */
    pause(channel, layer) {
        return this.do(new AMCP.PauseCommand({ channel: channel, layer: layer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#RESUME>
     */
    resume(channel, layer) {
        return this.do(new AMCP.ResumeCommand({ channel: channel, layer: layer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#STOP>
     */
    stop(channel, layer) {
        return this.do(new AMCP.StopCommand({ channel: channel, layer: layer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_ADD>
     */
    cgAdd(channel, layer = NaN, flashLayer = NaN, templateName, playOnLoad, data) {
        return this.do(new AMCP.CGAddCommand({ channel: channel, layer: layer, flashLayer: flashLayer, templateName: templateName, playOnLoad: playOnLoad, data: data }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_PLAY>
     */
    cgPlay(channel, layer, flashLayer) {
        return this.do(new AMCP.CGPlayCommand({ channel: channel, layer: layer, flashLayer: flashLayer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_STOP>
     */
    cgStop(channel, layer, flashLayer) {
        return this.do(new AMCP.CGStopCommand({ channel: channel, layer: layer, flashLayer: flashLayer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_NEXT>
     */
    cgNext(channel, layer, flashLayer) {
        return this.do(new AMCP.CGNextCommand({ channel: channel, layer: layer, flashLayer: flashLayer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_REMOVE>
     */
    cgRemove(channel, layer, flashLayer) {
        return this.do(new AMCP.CGRemoveCommand({ channel: channel, layer: layer, flashLayer: flashLayer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_CLEAR>
     */
    cgClear(channel, layer) {
        return this.do(new AMCP.CGClearCommand({ channel: channel, layer: layer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_UPDATE>
     */
    cgUpdate(channel, layer = NaN, flashLayer, data) {
        return this.do(new AMCP.CGUpdateCommand({ channel: channel, layer: layer, flashLayer: flashLayer, data: data }));
    }
    /*
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INVOKE
     */
    cgInvoke(channel, layer, flashLayer, method) {
        return this.do(new AMCP.CGInvokeCommand({ channel: channel, layer: layer, flashLayer: flashLayer, method: method }));
    }
    mixerKeyer(channel, layer, state, defer) {
        return this.do(new AMCP.MixerKeyerCommand({ channel: channel, layer: layer, keyer: state, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
     */
    mixerKeyerDeferred(channel, layer, state) {
        return this.mixerKeyer(channel, layer, state, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_KEYER>
     */
    getMixerStatusKeyer(channel, layer) {
        return this.mixerKeyer(channel, layer);
    }
    mixerChroma(channel, layer = 0, keyer, threshold, softness, spill, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerChromaCommand({ channel: channel, layer: layer, keyer: keyer, threshold: threshold, softness: softness, spill: spill, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    mixerChromaDeferred(channel, layer = 0, keyer, threshold, softness, spill, transitionDuration, transitionEasing) {
        return this.mixerChroma(channel, layer, keyer, threshold, softness, spill, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CHROMA>
     */
    getMixerStatusChroma(channel, layer) {
        return this.mixerChroma(channel, layer);
    }
    mixerBlend(channel, layer, blendmode, defer) {
        return this.do(new AMCP.MixerBlendCommand({ channel: channel, layer: layer, blendmode: blendmode, defer: defer }));
    }
    mixerBlendDeferred(channel, layer = NaN, blendmode) {
        return this.mixerBlend(channel, layer, blendmode, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BLEND>
     */
    getMixerStatusBlend(channel, layer) {
        return this.mixerBlend(channel, layer);
    }
    mixerOpacity(channel, layer, opacity, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerOpacityCommand({ channel: channel, layer: layer, opacity: opacity, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
     */
    mixerOpacityDeferred(channel, layer = NaN, opacity, transitionDuration, transitionEasing) {
        return this.mixerOpacity(channel, layer, opacity, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_OPACITY>
     */
    getMixerStatusOpacity(channel, layer) {
        return this.mixerOpacity(channel, layer);
    }
    mixerBrightness(channel, layer, brightness, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerBrightnessCommand({ channel: channel, layer: layer, brightness: brightness, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
     */
    mixerBrightnessDeferred(channel, layer = NaN, brightness, transitionDuration, transitionEasing) {
        return this.mixerBrightness(channel, layer, brightness, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_BRIGHTNESS>
     */
    getMixerStatusBrightness(channel, layer) {
        return this.mixerBrightness(channel, layer);
    }
    mixerSaturation(channel, layer, saturation, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerSaturationCommand({ channel: channel, layer: layer, saturation: saturation, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
     */
    mixerSaturationDeferred(channel, layer = NaN, saturation, transitionDuration, transitionEasing) {
        return this.mixerSaturation(channel, layer, saturation, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_SATURATION>
     */
    getMixerStatusSaturation(channel, layer) {
        return this.mixerSaturation(channel, layer);
    }
    mixerContrast(channel, layer, contrast, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerContrastCommand({ channel: channel, layer: layer, contrast: contrast, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
     */
    mixerContrastDeferred(channel, layer = NaN, contrast, transitionDuration, transitionEasing) {
        return this.mixerContrast(channel, layer, contrast, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CONTRAST>
     */
    getMixerStatusContrast(channel, layer) {
        return this.mixerContrast(channel, layer);
    }
    mixerLevels(channel, layer = NaN, minInput, maxInput, gamma, minOutput, maxOutput, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerLevelsCommand({ channel: channel, layer: layer, minInput: minInput, maxInput: maxInput, gamma: gamma, minOutput: minOutput, maxOutput: maxOutput, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
     */
    mixerLevelsDeferred(channel, layer = NaN, minInput, maxInput, gamma, minOutput, maxOutput, transitionDuration, transitionEasing) {
        return this.mixerLevels(channel, layer, minInput, maxInput, gamma, minOutput, maxOutput, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_LEVELS>
     */
    getMixerStatusLevels(channel, layer) {
        return this.mixerLevels(channel, layer);
    }
    mixerFill(channel, layer = NaN, x, y, xScale, yScale, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerFillCommand({ channel: channel, layer: layer, x: x, y: y, xScale: xScale, yScale: yScale, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    /*
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
     */
    mixerFillDeferred(channel, layer = NaN, x, y, xScale, yScale, transitionDuration, transitionEasing) {
        return this.mixerFill(channel, layer, x, y, xScale, yScale, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_FILL>
     */
    getMixerStatusFill(channel, layer) {
        return this.mixerFill(channel, layer);
    }
    mixerClip(channel, layer = NaN, x, y, width, height, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerClipCommand({ channel: channel, layer: layer, x: x, y: y, width: width, height: height, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
     */
    mixerClipDeferred(channel, layer = NaN, x, y, width, height, transitionDuration, transitionEasing) {
        return this.mixerClip(channel, layer, x, y, width, height, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLIP>
     */
    getMixerStatusClip(channel, layer) {
        return this.mixerClip(channel, layer);
    }
    mixerAnchor(channel, layer = NaN, x, y, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerAnchorCommand({ channel: channel, layer: layer, x: x, y: y, ransition: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
     */
    mixerAnchorDeferred(channel, layer = NaN, x, y, transitionDuration, transitionEasing) {
        return this.mixerAnchor(channel, layer, x, y, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ANCHOR>
     */
    getMixerStatusAnchor(channel, layer) {
        return this.mixerAnchor(channel, layer);
    }
    mixerCrop(channel, layer = NaN, left, top, right, bottom, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerCropCommand({ channel: channel, layer: layer, left: left, top: top, right: right, bottom: bottom, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
     */
    mixerCropDeferred(channel, layer = NaN, left, top, right, bottom, transitionDuration, transitionEasing) {
        return this.mixerCrop(channel, layer, left, top, right, bottom, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CROP>
     */
    getMixerStatusCrop(channel, layer) {
        return this.mixerCrop(channel, layer);
    }
    mixerRotation(channel, layer, rotation, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerRotationCommand({ channel: channel, layer: layer, rotation: rotation, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
     */
    mixerRotationDeferred(channel, layer = NaN, rotation, transitionDuration, transitionEasing) {
        return this.mixerRotation(channel, layer, rotation, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_ROTATION>
     */
    getMixerStatusRotation(channel, layer) {
        return this.mixerRotation(channel, layer);
    }
    mixerPerspective(channel, layer = NaN, topLeftX, topLeftY, topRightX, topRightY, bottomRightX, bottomRightY, bottomLeftX, bottomLeftY, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerPerspectiveCommand({ channel: channel, layer: layer, topLeftX: topLeftX, topLeftY: topLeftY, topRightX: topRightX, topRightY: topRightY, bottomRightX: bottomRightX, bottomRightY: bottomRightY, bottomLeftX: bottomLeftX, bottomLeftY: bottomLeftY, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
     */
    mixerPerspectiveDeferred(channel, layer = NaN, topLeftX, topLeftY, topRightX, topRightY, bottomRightX, bottomRightY, bottomLeftX, bottomLeftY, transitionDuration, transitionEasing) {
        return this.mixerPerspective(channel, layer, topLeftX, topLeftY, topRightX, topRightY, bottomRightX, bottomRightY, bottomLeftX, bottomLeftY, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_PERSPECTIVE>
     */
    getMixerStatusPerspective(channel, layer) {
        return this.mixerPerspective(channel, layer);
    }
    mixerMipmap(channel, layer, state, defer) {
        return this.do(new AMCP.MixerMipmapCommand({ channel: channel, layer: layer, keyer: state, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
     */
    mixerMipmapDeferred(channel, layer, state) {
        return this.mixerMipmap(channel, layer, state, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MIPMAP>
     */
    getMixerStatusMipmap(channel, layer) {
        return this.mixerMipmap(channel, layer);
    }
    mixerVolume(channel, layer, volume, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerVolumeCommand({ channel: channel, layer: layer, volume: volume, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
     */
    mixerVolumeDeferred(channel, layer = NaN, volume, transitionDuration, transitionEasing) {
        return this.mixerVolume(channel, layer, volume, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_VOLUME>
     */
    getMixerStatusVolume(channel, layer) {
        return this.mixerVolume(channel, layer);
    }
    mixerMastervolume(channel, mastervolume, defer) {
        return this.do(new AMCP.MixerMastervolumeCommand({ channel: channel, mastervolume: mastervolume, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
     */
    mixerMastervolumeDeferred(channel, mastervolume) {
        return this.mixerMastervolume(channel, mastervolume, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_MASTERVOLUME>
     */
    getMixerStatusMastervolume(channel) {
        return this.mixerMastervolume(channel);
    }
    mixerStraightAlphaOutput(channel, layer, state, defer) {
        return this.do(new AMCP.MixerKeyerCommand({ channel: channel, layer: layer, keyer: state, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
     */
    mixerStraightAlphaOutputDeferred(channel, layer, state) {
        return this.mixerStraightAlphaOutput(channel, layer, state, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_STRAIGHT_ALPHA_OUTPUT>
     */
    getMixerStatusStraightAlphaOutput(channel, layer) {
        return this.mixerStraightAlphaOutput(channel, layer);
    }
    mixerGrid(channel, resolution, transitionDuration, transitionEasing, defer) {
        return this.do(new AMCP.MixerGridCommand({ channel: channel, resolution: resolution, transitionDuration: transitionDuration, easing: transitionEasing, defer: defer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_GRID>
     */
    mixerGridDeferred(channel, resolution, transitionDuration, transitionEasing) {
        return this.mixerGrid(channel, resolution, transitionDuration, transitionEasing, true);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_COMMIT>
     */
    mixerCommit(channel) {
        return this.do(new AMCP.MixerCommitCommand({ channel: channel }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#MIXER_CLEAR>
     */
    mixerClear(channel, layer) {
        return this.do(new AMCP.MixerClearCommand({ channel: channel, layer: layer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CLEAR>
     */
    clear(channel, layer) {
        return this.do(new AMCP.ClearCommand({ channel: channel, layer: layer }));
    }
    /**
     * @todo	implement
     * @todo	document
     */
    call(channel, layer) {
        return this.do(new AMCP.CallCommand({ channel: channel, layer: layer }));
    }
    /**
     * @todo	implement
     * @todo	document
     */
    swap() {
        // @todo: overloading of origin/destination pairs
        return this.do(new AMCP.SwapCommand());
    }
    /**
     * @todo	implement
     * @todo	document
     */
    add(channel) {
        // remember index /layer
        // i suggest duplicating abstractchannelorlayer to avoid problems if the address logic changes for layers and not indicies
        // consumer factoruies parses "consumer"-string parameter
        return this.do(new AMCP.AddCommand({ channel: channel }));
    }
    /**
     * @todo	implement
     * @todo	document
     */
    remove(channel, layer) {
        return this.do(new AMCP.RemoveCommand({ channel: channel, layer: layer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#PRINT>
     */
    print(channel) {
        return this.do(new AMCP.PrintCommand({ channel: channel }));
    }
    /**
     * @todo	implement
     * @todo	document
     */
    set(channel) {
        // @todo:  param enum (only MODE and channelLayout for now)
        // @todo: switchable second parameter based on what to set:
        // mode = enum modes.......
        // layer = enum layouts..........
        return this.do(new AMCP.SetCommand({ channel: channel }));
    }
    lock(channel, action, lockPhrase) {
        return this.do(new AMCP.LockCommand({ channel: channel, action: action, phrase: lockPhrase }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CHANNEL_GRID>
     */
    channelGrid() {
        return this.do(new AMCP.ChannelGridCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#GL_GC>
     */
    glGC() {
        return this.do(new AMCP.GlGCCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_STORE>
     */
    dataStore(fileName, data) {
        return this.do(new AMCP.DataStoreCommand({ fileName: fileName, data: data }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_RETRIEVE>
     */
    dataRetrieve(fileName) {
        return this.do(new AMCP.DataRetrieveCommand({ fileName: fileName }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_LIST>
     */
    dataList() {
        return this.do(new AMCP.DataListCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DATA_REMOVE>
     */
    dataRemove(fileName) {
        return this.do(new AMCP.DataRemoveCommand({ fileName: fileName }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_LIST>
     */
    thumbnailList() {
        return this.do(new AMCP.ThumbnailListCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_RETRIEVE>
     */
    thumbnailRetrieve(fileName) {
        return this.do(new AMCP.ThumbnailRetrieveCommand({ fileName: fileName }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_GENERATE>
     */
    thumbnailGenerate(fileName) {
        return this.do(new AMCP.ThumbnailGenerateCommand({ fileName: fileName }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#THUMBNAIL_GENERATE_ALL>
     */
    thumbnailGenerateAll() {
        return this.do(new AMCP.ThumbnailGenerateAllCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CINF>
     */
    cinf(fileName) {
        return this.do(new AMCP.CinfCommand({ fileName: fileName }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CLS>
     */
    cls() {
        return this.do(new AMCP.ClsCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#FLS>
     */
    fls() {
        return this.do(new AMCP.FlsCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#TLS>
     */
    tls() {
        return this.do(new AMCP.TlsCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#VERSION>
     */
    version(component) {
        return this.do(new AMCP.VersionCommand({ component: component }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO>
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_2>
     */
    info(channel, layer) {
        return this.do(new AMCP.InfoCommand({ channel: channel, layer: layer }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_TEMPLATE>
     */
    infoTemplate(template) {
        return this.do(new AMCP.InfoTemplateCommand({ template: template }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_CONFIG>
     */
    infoConfig() {
        return this.do(new AMCP.InfoConfigCommand([], { serverVersion: this.serverVersion }));
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_PATHS>
     */
    infoPaths() {
        return this.do(new AMCP.InfoPathsCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_SYSTEM>
     */
    infoSystem() {
        return this.do(new AMCP.InfoSystemCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_SERVER>
     */
    infoServer() {
        return this.do(new AMCP.InfoServerCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_QUEUES>
     */
    infoQueues() {
        return this.do(new AMCP.InfoQueuesCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_THREADS>
     */
    infoThreads() {
        return this.do(new AMCP.InfoThreadsCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#INFO_DELAY>
     */
    infoDelay(channel, layer) {
        return this.do(new AMCP.InfoDelayCommand({ channel: channel, layer: layer }));
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
    cgInfo(channel, layer, flashLayer) {
        return this.do(new AMCP.CGInfoCommand({ channel: channel, layer: layer, flashLayer: flashLayer }));
    }
    /**
     * Convenience method for calling [[cgInfo]] to return information about `TemplateHost` for a given layer.
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#CG_INFO>
     */
    templateHostInfo(channel, layer) {
        return this.cgInfo(channel, layer);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#GL_INFO>
     */
    glInfo() {
        return this.do(new AMCP.GlInfoCommand());
    }
    /**
     * Sets the server's [[LogLevel]].
     *
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#LOG_LEVEL>
     */
    logLevel(enumOrString) {
        return this.do(new AMCP.LogLevelCommand({ level: enumOrString }));
    }
    logCategory(category, enabled) {
        let params = {};
        params[category.toString().toLowerCase()] = enabled;
        return this.do(new AMCP.LogCategoryCommand(params));
    }
    /**
     * Convenience method for enabling or disabling logging for [[LogCategory.CALLTRACE]] through calling [[logCategory]].
     */
    logCalltrace(enabled) {
        return this.logCategory(Enum.LogCategory.CALLTRACE, enabled);
    }
    /**
     * Convenience method for enabling or disabling logging for [[LogCategory.COMMUNICATION]] through calling [[logCategory]].
     */
    logCommunication(enabled) {
        return this.logCategory(Enum.LogCategory.COMMUNICATION, enabled);
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#DIAG>
     */
    diag() {
        return this.do(new AMCP.DiagCommand());
    }
    help(commandOrName) {
        let param = {};
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
    getCommands() {
        return this.help();
    }
    helpProducer(producerOrName) {
        let param = {};
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
    getProducers() {
        return this.helpProducer();
    }
    helpConsumer(consumerOrName) {
        let param = {};
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
    getConsumers() {
        return this.helpConsumer();
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#BYE>
     */
    bye() {
        return this.do(new AMCP.ByeCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#KILL>
     */
    kill() {
        return this.do(new AMCP.KillCommand());
    }
    /**
     * <http://casparcg.com/wiki/CasparCG_2.1_AMCP_Protocol#RESTART>
     */
    restart() {
        return this.do(new AMCP.RestartCommand());
    }
}
