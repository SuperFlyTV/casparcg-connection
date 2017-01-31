"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseEvent_1 = require("./BaseEvent");
var Event;
(function (Event) {
    var OSCSocketEvent = (function (_super) {
        __extends(OSCSocketEvent, _super);
        function OSCSocketEvent(address, values) {
            return _super.call(this, { address: address, value: values }) || this;
        }
        return OSCSocketEvent;
    }(BaseEvent_1.Event.BaseEvent));
    OSCSocketEvent.newOutputMessage = 'oscsocketeventnewoutputmessage';
    OSCSocketEvent.newStageMessage = 'oscsocketeventnewstagemessage';
    OSCSocketEvent.newMixerMessage = 'oscsocketeventnewmixermessage';
    OSCSocketEvent.newDiagMessage = 'oscsocketeventnewdiagmessage';
    Event.OSCSocketEvent = OSCSocketEvent;
})(Event = exports.Event || (exports.Event = {}));
