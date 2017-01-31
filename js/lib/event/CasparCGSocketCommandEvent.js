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
    var CasparCGSocketCommandEvent = (function (_super) {
        __extends(CasparCGSocketCommandEvent, _super);
        /**
         *
         */
        function CasparCGSocketCommandEvent(command) {
            var _this = _super.call(this, { command: command }) || this;
            _this.command = command;
            return _this;
        }
        /**
         *
         */
        CasparCGSocketCommandEvent.prototype.valueOf = function () {
            return this.command;
        };
        return CasparCGSocketCommandEvent;
    }(BaseEvent_1.Event.BaseEvent));
    CasparCGSocketCommandEvent.RESPONSE = "casparcgsocketcommandeventresponse";
    Event.CasparCGSocketCommandEvent = CasparCGSocketCommandEvent;
    /**
     *
     */
    var CasparCGSocketResponseEvent = (function (_super) {
        __extends(CasparCGSocketResponseEvent, _super);
        /**
         *
         */
        function CasparCGSocketResponseEvent(response) {
            var _this = _super.call(this, { response: response }) || this;
            _this.response = response;
            return _this;
        }
        /**
         *
         */
        CasparCGSocketResponseEvent.prototype.valueOf = function () {
            return this.response;
        };
        return CasparCGSocketResponseEvent;
    }(BaseEvent_1.Event.BaseEvent));
    CasparCGSocketResponseEvent.RESPONSE = "casparcgsocketresponseeventresponse";
    CasparCGSocketResponseEvent.INVALID_RESPONSE = "casparcgsocketcommandeventresponseinvalid";
    Event.CasparCGSocketResponseEvent = CasparCGSocketResponseEvent;
})(Event = exports.Event || (exports.Event = {}));
