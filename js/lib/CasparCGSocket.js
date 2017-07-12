import * as net from "net";
import * as _ from "highland";
import { AMCP, AMCPUtil } from "./AMCP";
// Command NS
import { Command as CommandNS } from "./AbstractCommand";
var IAMCPStatus = CommandNS.IAMCPStatus;
// Event NS
import { CasparCGSocketStatusEvent, CasparCGSocketResponseEvent } from "./event/Events";
export var SocketState;
(function (SocketState) {
    SocketState[SocketState["unconfigured"] = 0] = "unconfigured";
    SocketState[SocketState["configured"] = 1] = "configured";
    SocketState[SocketState["hostFound"] = 2] = "hostFound";
    SocketState[SocketState["connectionAttempt"] = 4] = "connectionAttempt";
    SocketState[SocketState["connected"] = 8] = "connected";
    SocketState[SocketState["lostConnection"] = 32] = "lostConnection";
    SocketState[SocketState["reconnecting"] = 64] = "reconnecting";
})(SocketState || (SocketState = {}));
/**
 *
 */
export class CasparCGSocket extends NodeJS.EventEmitter {
    /**
     *
     */
    constructor(host, port, autoReconnect, autoReconnectInterval, autoReconnectAttempts) {
        super();
        this.isRestarting = false;
        this._reconnectAttempt = 0;
        this._commandTimeout = 5000; // @todo make connectionOption!
        this._socketStatus = SocketState.unconfigured;
        this._host = host;
        this._port = port;
        this._reconnectDelay = autoReconnectInterval;
        this._autoReconnect = autoReconnect;
        this._reconnectAttempts = autoReconnectAttempts;
        this._client = new net.Socket();
        this._client.on("lookup", () => this._onLookup());
        this._client.on("connect", () => this._onConnected());
        this._client.on("error", (error) => this._onError(error));
        this._client.on("drain", () => this._onDrain());
        this._client.on("close", (hadError) => this._onClose(hadError));
        this.socketStatus = SocketState.configured;
    }
    /**
     *
     */
    set autoReconnect(autoReconnect) {
        this._autoReconnect = autoReconnect;
    }
    /**
     *
     */
    set autoReconnectInterval(autoReconnectInterval) {
        this._reconnectDelay = autoReconnectInterval;
    }
    /**
     *
     */
    set autoReconnectAttempts(autoReconnectAttempts) {
        this._reconnectAttempts = autoReconnectAttempts;
    }
    /**
     *
     */
    connect() {
        this.socketStatus |= SocketState.connectionAttempt; // toggles triedConnection on
        this.socketStatus &= ~SocketState.lostConnection; // toggles triedConnection on
        this._client.connect(this._port, this._host);
        if (this._reconnectAttempt === 0) {
            this._reconnectInterval = global.setInterval(() => this._autoReconnection(), this._reconnectDelay);
        }
    }
    /**
     *
     */
    disconnect() {
        if (this._client !== undefined) {
            this.dispose();
        }
    }
    /**
     *
     */
    _startReconnection() {
        // create interval if doesn't exist
        if (!this._reconnectInterval) {
            // @todo: create event telling reconection is in action with interval time
            this.socketStatus |= SocketState.reconnecting;
            this._reconnectInterval = global.setInterval(() => this._autoReconnection(), this._reconnectDelay);
        }
    }
    /**
     *
     */
    _autoReconnection() {
        if (this._autoReconnect) {
            if (this._reconnectAttempts > 0) {
                if ((this._reconnectAttempt >= this._reconnectAttempts)) {
                    // reset reconnection behaviour
                    this._clearReconnectInterval();
                    return;
                }
                // new attempt if not allready connected
                if (!((this.socketStatus & SocketState.connected) === SocketState.connected)) {
                    this.log("Socket attempting reconnection");
                    this._reconnectAttempt++;
                    this.connect();
                }
            }
        }
    }
    /**
     *
     */
    _clearReconnectInterval() {
        // @todo create event telling reconnection ended with result: true/false
        // only in reconnectio intervall is true
        this._reconnectAttempt = 0;
        global.clearInterval(this._reconnectInterval);
        this.socketStatus &= ~SocketState.reconnecting;
        delete this._reconnectInterval;
    }
    /**
     *
     */
    get host() {
        if (this._client) {
            return this._host;
        }
        return this._host;
    }
    /**
     *
     */
    get port() {
        if (this._client) {
            return this._port;
        }
        return this._port;
    }
    /**
     *
     */
    get socketStatus() {
        return this._socketStatus;
    }
    /**
     *
     */
    set socketStatus(statusMask) {
        if (this._socketStatus !== statusMask) {
            this._socketStatus = statusMask;
            this.emit(CasparCGSocketStatusEvent.STATUS, new CasparCGSocketStatusEvent(this._socketStatus));
        }
    }
    /**
     *
     */
    dispose() {
        this._clearReconnectInterval();
        this._client.destroy();
    }
    /**
     *
     */
    log(args) {
        // fallback, this method will be remapped to CasparCG.log by CasparCG on instantiation of socket oject
        console.log(args);
    }
    /**
     */
    set connected(connected) {
        this.socketStatus = connected ? this.socketStatus | SocketState.connected : this.socketStatus &= ~SocketState.connected;
    }
    /**
     *
     */
    executeCommand(command) {
        let commandString = command.constructor["commandString"] + (command.address ? " " + command.address : "");
        for (let i in command.payload) {
            let payload = command.payload[i];
            commandString += (commandString.length > 0 ? " " : "");
            commandString += (payload.key ? payload.key + " " : "") + payload.value;
        }
        if (command instanceof AMCP.RestartCommand) {
            this.isRestarting = true;
        }
        this._commandTimeoutTimer = global.setTimeout(() => this._onTimeout(), this._commandTimeout);
        this._client.write(`${commandString}\r\n`);
        command.status = IAMCPStatus.Sent;
        this.log(commandString);
        return command;
    }
    /**
     *
     */
    _onTimeout() {
        global.clearTimeout(this._commandTimeoutTimer);
        this.emit(CasparCGSocketStatusEvent.TIMEOUT, new CasparCGSocketStatusEvent(this.socketStatus));
    }
    /**
     * @todo:::
     */
    _onLookup() {
        this.log("Socket event lookup");
    }
    /**
     *
     */
    _onConnected() {
        this.isRestarting = false;
        this._clearReconnectInterval();
        _(this._client).splitBy(/(?=\r\n)/).errors((error) => this._onError(error)).each((i) => this._parseResponseGroups(i)); // @todo: ["splitBy] hack due to missing type
        this.connected = true;
    }
    /**
     *
     */
    _parseResponseGroups(i) {
        global.clearTimeout(this._commandTimeoutTimer);
        i = (i.length > 2 && i.slice(0, 2) === "\r\n") ? i.slice(2) : i;
        if (AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 200) {
            this._parsedResponse = new AMCPUtil.CasparCGSocketResponse(i);
            return;
        }
        else if (this._parsedResponse && this._parsedResponse.statusCode === 200) {
            if (i !== "\r\n") {
                this._parsedResponse.items.push(i);
                return;
            }
            else {
                this.emit(CasparCGSocketResponseEvent.RESPONSE, new CasparCGSocketResponseEvent(this._parsedResponse));
                this._parsedResponse = undefined;
                return;
            }
        }
        if (AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 201 || AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 400 || AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 101) {
            this._parsedResponse = new AMCPUtil.CasparCGSocketResponse(i);
            return;
        }
        else if (this._parsedResponse && this._parsedResponse.statusCode === 201 || this._parsedResponse && this._parsedResponse.statusCode === 400 || this._parsedResponse && this._parsedResponse.statusCode === 101) {
            this._parsedResponse.items.push(i);
            this.emit(CasparCGSocketResponseEvent.RESPONSE, new CasparCGSocketResponseEvent(this._parsedResponse));
            this._parsedResponse = undefined;
            return;
        }
        else {
            let parsedResponse = new AMCPUtil.CasparCGSocketResponse(i);
            if (!isNaN(parsedResponse.statusCode)) {
                this.emit(CasparCGSocketResponseEvent.RESPONSE, new CasparCGSocketResponseEvent(parsedResponse));
            }
            else {
                this.emit(CasparCGSocketResponseEvent.INVALID_RESPONSE, new CasparCGSocketResponseEvent(parsedResponse));
            }
            return;
        }
    }
    /**
     * @todo:::
     */
    _onError(error) {
        // dispatch error!!!!!
        this.log(`Socket event error: ${error.message}`);
    }
    /**
     * @todo:::
     */
    _onDrain() {
        // @todo: implement
        this.log("Socket event drain");
    }
    /**
     *
     */
    _onClose(hadError) {
        this.connected = false;
        if (hadError || this.isRestarting) {
            this.socketStatus |= SocketState.lostConnection;
            // error message, not "log"
            // dispatch (is it done through error handler first????)
            this.log(`Socket close with error: ${hadError}`);
            if (this._autoReconnect) {
                this._startReconnection();
            }
        }
        else {
            this._clearReconnectInterval();
        }
    }
}
