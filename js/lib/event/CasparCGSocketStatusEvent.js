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
var BaseEvent_1 = require("./BaseEvent");
var Event;
(function (Event) {
    /**
     *
     */
    var CasparCGSocketStatusEvent = (function (_super) {
        __extends(CasparCGSocketStatusEvent, _super);
        /**
         *
         */
        function CasparCGSocketStatusEvent(socketStatus) {
            var _this = _super.call(this, socketStatus) || this;
            _this.socketStatus = socketStatus;
            return _this;
        }
        /**
         *
         */
        CasparCGSocketStatusEvent.prototype.valueOf = function () {
            return this.socketStatus;
        };
        CasparCGSocketStatusEvent.STATUS = "casparcgsocketconnectioneventstatus";
        CasparCGSocketStatusEvent.STATUS_CHANGED = "casparcgsocketconnectioneventstatuschanged";
        CasparCGSocketStatusEvent.CONNECTED = "casparcgsocketconnectioneventstatusconnected";
        CasparCGSocketStatusEvent.DISCONNECTED = "casparcgsocketconnectioneventstatusdisconnected";
        CasparCGSocketStatusEvent.TIMEOUT = "casparcgsocketconnectioneventstatustimeout";
        return CasparCGSocketStatusEvent;
    }(BaseEvent_1.Event.BaseEvent));
    Event.CasparCGSocketStatusEvent = CasparCGSocketStatusEvent;
})(Event = exports.Event || (exports.Event = {}));
