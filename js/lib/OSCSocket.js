"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var osc = require("osc-min");
var udp = require("dgram");
var hap_1 = require("hap");
var Events_1 = require("./event/Events");
var OSCSocket = (function (_super) {
    __extends(OSCSocket, _super);
    function OSCSocket(port, address) {
        var _this = _super.call(this) || this;
        _this._socket = udp.createSocket('udp4', function (msg) { return _this._onReceivedCallback(msg); });
        _this._listening = false;
        _this._port = 6250;
        _this._address = '0.0.0.0';
        _this._port = port;
        if (address)
            _this._address = address;
        _this._socket.on('error', function (error) { return _this._errorHandler(error); });
        return _this;
    }
    OSCSocket.prototype._onReceivedCallback = function (msg) {
        var bundle = osc.fromBuffer(msg);
        for (var _i = 0, _a = bundle.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            var adress = element.address.split('/');
            if (adress[3] === 'stage') {
                this.fire(Events_1.OSCSocketEvent.newStageMessage, new Events_1.OSCSocketEvent(element.address, element.args));
            }
            else if (adress[3] === 'mixer') {
                this.fire(Events_1.OSCSocketEvent.newMixerMessage, new Events_1.OSCSocketEvent(element.address, element.args));
            }
            else if (adress[1] === 'diag') {
                this.fire(Events_1.OSCSocketEvent.newDiagMessage, new Events_1.OSCSocketEvent(element.address, element.args));
            }
            else {
                this.fire(Events_1.OSCSocketEvent.newOutputMessage, new Events_1.OSCSocketEvent(element.address, element.args));
            }
        }
    };
    OSCSocket.prototype._errorHandler = function (error) {
        console.log(error);
    };
    Object.defineProperty(OSCSocket.prototype, "address", {
        get: function () {
            return this._address;
        },
        set: function (address) {
            var _this = this;
            if (this._address !== address) {
                this._address = address;
                if (this._listening === true) {
                    this._socket.close();
                    this._socket = udp.createSocket('udp4', function (msg) { return _this._onReceivedCallback(msg); });
                    this._socket.bind(this._port, this._address);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OSCSocket.prototype, "port", {
        get: function () {
            return this._port;
        },
        set: function (port) {
            var _this = this;
            if (this._port !== port) {
                this._port = port;
                if (this._listening === true) {
                    this._socket.close();
                    this._socket = udp.createSocket('udp4', function (msg) { return _this._onReceivedCallback(msg); });
                    this._socket.bind(this._port, this._address);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OSCSocket.prototype, "listening", {
        get: function () {
            return this._listening;
        },
        enumerable: true,
        configurable: true
    });
    OSCSocket.prototype.listen = function (port, address) {
        if (port)
            this._port = port;
        if (address)
            this._address = address;
        this._socket.bind(this._port, this._address);
        this._listening = true;
    };
    OSCSocket.prototype.close = function () {
        var _this = this;
        this._socket.close();
        this._socket = udp.createSocket('udp4', function (msg) { return _this._onReceivedCallback(msg); });
    };
    return OSCSocket;
}(hap_1.EventEmitter));
exports.OSCSocket = OSCSocket;
