"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var net = require("net");
var _ = require("highland");
var AMCP_1 = require("./AMCP");
// Command NS
var AbstractCommand_1 = require("./AbstractCommand");
var IAMCPStatus = AbstractCommand_1.Command.IAMCPStatus;
// Event NS
var Events_1 = require("./event/Events");
/**
 *
 */
var CasparCGSocket = (function (_super) {
    __extends(CasparCGSocket, _super);
    /**
     *
     */
    function CasparCGSocket(host, port, autoReconnect, autoReconnectInterval, autoReconnectAttempts) {
        var _this = _super.call(this) || this;
        _this.isRestarting = false;
        _this._reconnectAttempt = 0;
        _this._commandTimeout = 5000; // @todo make connectionOption!
        _this._host = host;
        _this._port = port;
        _this._reconnectDelay = autoReconnectInterval;
        _this._autoReconnect = autoReconnect;
        _this._reconnectAttempts = autoReconnectAttempts;
        _this._client = new net.Socket();
        _this._client.on("lookup", function () { return _this._onLookup(); });
        _this._client.on("connect", function () { return _this._onConnected(); });
        _this._client.on("error", function (error) { return _this._onError(error); });
        _this._client.on("drain", function () { return _this._onDrain(); });
        _this._client.on("close", function (hadError) { return _this._onClose(hadError); });
        return _this;
    }
    Object.defineProperty(CasparCGSocket.prototype, "autoReconnect", {
        /**
         *
         */
        set: function (autoReconnect) {
            this._autoReconnect = autoReconnect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCGSocket.prototype, "autoReconnectInterval", {
        /**
         *
         */
        set: function (autoReconnectInterval) {
            this._reconnectDelay = autoReconnectInterval;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCGSocket.prototype, "autoReconnectAttempts", {
        /**
         *
         */
        set: function (autoReconnectAttempts) {
            this._reconnectAttempts = autoReconnectAttempts;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    CasparCGSocket.prototype.connect = function () {
        var _this = this;
        this._client.connect(this._port, this._host);
        if (this._reconnectAttempt === 0) {
            this._reconnectInterval = global.setInterval(function () { return _this._autoReconnection(); }, this._reconnectDelay);
        }
    };
    /**
     *
     */
    CasparCGSocket.prototype.disconnect = function () {
        if (this._client !== undefined) {
            this.dispose();
        }
    };
    /**
     *
     */
    CasparCGSocket.prototype._startReconnection = function () {
        var _this = this;
        // create interval if doesn't exist
        if (!this._reconnectInterval) {
            // @todo: create event telling reconection is in action with interval time
            this._reconnectInterval = global.setInterval(function () { return _this._autoReconnection(); }, this._reconnectDelay);
        }
    };
    /**
     *
     */
    CasparCGSocket.prototype._autoReconnection = function () {
        if (this._autoReconnect) {
            if (this._reconnectAttempts > 0) {
                if ((this._reconnectAttempt >= this._reconnectAttempts)) {
                    // reset reconnection behaviour
                    this._clearReconnectInterval();
                    return;
                }
                // new attempt if not allready connected
                if (!this.connected) {
                    this.log("Socket attempting reconnection");
                    this._reconnectAttempt++;
                    this.connect();
                }
            }
        }
    };
    /**
     *
     */
    CasparCGSocket.prototype._clearReconnectInterval = function () {
        // @todo create event telling reconnection ended with result: true/false
        // only in reconnectio intervall is true
        this._reconnectAttempt = 0;
        global.clearInterval(this._reconnectInterval);
        delete this._reconnectInterval;
    };
    Object.defineProperty(CasparCGSocket.prototype, "host", {
        /**
         *
         */
        get: function () {
            if (this._client) {
                return this._host;
            }
            return this._host;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCGSocket.prototype, "port", {
        /**
         *
         */
        get: function () {
            if (this._client) {
                return this._port;
            }
            return this._port;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    CasparCGSocket.prototype.dispose = function () {
        this._clearReconnectInterval();
        this._client.destroy();
    };
    /**
     *
     */
    CasparCGSocket.prototype.log = function (args) {
        // fallback, this method will be remapped to CasparCG.log by CasparCG on instantiation of socket oject
        console.log(args);
    };
    Object.defineProperty(CasparCGSocket.prototype, "connected", {
        /**
         */
        set: function (connected) {
            this._connected = connected === true;
            this.emit(Events_1.CasparCGSocketStatusEvent.STATUS, new Events_1.CasparCGSocketStatusEvent(this.socketStatus));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCGSocket.prototype, "socketStatus", {
        /**
         *
         */
        get: function () {
            return {
                connected: this._connected,
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CasparCGSocket.prototype, "reconnecting", {
        /**
         *
         */
        get: function () {
            return this._reconnectInterval !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    CasparCGSocket.prototype.executeCommand = function (command) {
        var _this = this;
        var commandString = command.constructor["commandString"] + (command.address ? " " + command.address : "");
        for (var i in command.payload) {
            var payload = command.payload[i];
            commandString += (commandString.length > 0 ? " " : "");
            commandString += (payload.key ? payload.key + " " : "") + payload.value;
        }
        if (command instanceof AMCP_1.AMCP.RestartCommand) {
            this.isRestarting = true;
        }
        this._commandTimeoutTimer = global.setTimeout(function () { return _this._onTimeout(); }, this._commandTimeout);
        this._client.write(commandString + "\r\n");
        command.status = IAMCPStatus.Sent;
        this.log(commandString);
        return command;
    };
    /**
     *
     */
    CasparCGSocket.prototype._onTimeout = function () {
        global.clearTimeout(this._commandTimeoutTimer);
        this.emit(Events_1.CasparCGSocketStatusEvent.TIMEOUT, new Events_1.CasparCGSocketStatusEvent(this.socketStatus));
    };
    /**
     *@todo:::
     */
    CasparCGSocket.prototype._onLookup = function () {
        this.log("Socket event lookup");
    };
    /**
     *
     */
    CasparCGSocket.prototype._onConnected = function () {
        var _this = this;
        this.isRestarting = false;
        this._clearReconnectInterval();
        _(this._client).splitBy(/(?=\r\n)/).errors(function (error) { return _this._onError(error); }).each(function (i) { return _this._parseResponseGroups(i); });
        this.connected = true;
    };
    /**
     *
     */
    CasparCGSocket.prototype._parseResponseGroups = function (i) {
        global.clearTimeout(this._commandTimeoutTimer);
        i = (i.length > 2 && i.slice(0, 2) === "\r\n") ? i.slice(2) : i;
        if (AMCP_1.AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 200) {
            this._parsedResponse = new AMCP_1.AMCPUtil.CasparCGSocketResponse(i);
            return;
        }
        else if (this._parsedResponse && this._parsedResponse.statusCode === 200) {
            if (i !== "\r\n") {
                this._parsedResponse.items.push(i);
                return;
            }
            else {
                this.emit(Events_1.CasparCGSocketResponseEvent.RESPONSE, new Events_1.CasparCGSocketResponseEvent(this._parsedResponse));
                this._parsedResponse = undefined;
                return;
            }
        }
        if (AMCP_1.AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 201 || AMCP_1.AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 400 || AMCP_1.AMCPUtil.CasparCGSocketResponse.evaluateStatusCode(i) === 101) {
            this._parsedResponse = new AMCP_1.AMCPUtil.CasparCGSocketResponse(i);
            return;
        }
        else if (this._parsedResponse && this._parsedResponse.statusCode === 201 || this._parsedResponse && this._parsedResponse.statusCode === 400 || this._parsedResponse && this._parsedResponse.statusCode === 101) {
            this._parsedResponse.items.push(i);
            this.emit(Events_1.CasparCGSocketResponseEvent.RESPONSE, new Events_1.CasparCGSocketResponseEvent(this._parsedResponse));
            this._parsedResponse = undefined;
            return;
        }
        else {
            var parsedResponse = new AMCP_1.AMCPUtil.CasparCGSocketResponse(i);
            if (!isNaN(parsedResponse.statusCode)) {
                this.emit(Events_1.CasparCGSocketResponseEvent.RESPONSE, new Events_1.CasparCGSocketResponseEvent(parsedResponse));
            }
            else {
                this.emit(Events_1.CasparCGSocketResponseEvent.INVALID_RESPONSE, new Events_1.CasparCGSocketResponseEvent(parsedResponse));
            }
            return;
        }
    };
    /**
     *@todo:::
     */
    CasparCGSocket.prototype._onError = function (error) {
        // dispatch error!!!!!
        this.log("Socket event error: " + error.message);
    };
    /**
     *@todo:::
     */
    CasparCGSocket.prototype._onDrain = function () {
        // @todo: implement
        this.log("Socket event drain");
    };
    /**
     *
     */
    CasparCGSocket.prototype._onClose = function (hadError) {
        this.connected = false;
        if (hadError || this.isRestarting) {
            // error message, not "log"
            // dispatch (is it done through error handler first????)
            this.log("Socket close with error: " + hadError);
            if (this._autoReconnect) {
                this._startReconnection();
            }
        }
        else {
            this._clearReconnectInterval();
        }
    };
    return CasparCGSocket;
}(events_1.EventEmitter));
exports.CasparCGSocket = CasparCGSocket;
