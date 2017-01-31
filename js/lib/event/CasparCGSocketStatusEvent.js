"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
            var _this = _super.call(this, { socketStatus: socketStatus }) || this;
            _this.socketStatus = socketStatus;
            return _this;
        }
        /**
         *
         */
        CasparCGSocketStatusEvent.prototype.valueOf = function () {
            return this.socketStatus;
        };
        return CasparCGSocketStatusEvent;
    }(BaseEvent_1.Event.BaseEvent));
    CasparCGSocketStatusEvent.STATUS = "casparcgsocketconnectioneventstatus";
    CasparCGSocketStatusEvent.STATUS_CHANGED = "casparcgsocketconnectioneventstatuschanged";
    CasparCGSocketStatusEvent.CONNECTED = "casparcgsocketconnectioneventstatusconnected";
    CasparCGSocketStatusEvent.DISCONNECTED = "casparcgsocketconnectioneventstatusdisconnected";
    CasparCGSocketStatusEvent.TIMEOUT = "casparcgsocketconnectioneventstatustimeout";
    Event.CasparCGSocketStatusEvent = CasparCGSocketStatusEvent;
})(Event = exports.Event || (exports.Event = {}));
