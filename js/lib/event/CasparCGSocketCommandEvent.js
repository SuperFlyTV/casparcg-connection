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
    var CasparCGSocketCommandEvent = /** @class */ (function (_super) {
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
        CasparCGSocketCommandEvent.RESPONSE = 'casparcgsocketcommandeventresponse';
        return CasparCGSocketCommandEvent;
    }(BaseEvent_1.Event.BaseEvent));
    Event.CasparCGSocketCommandEvent = CasparCGSocketCommandEvent;
    /**
     *
     */
    var CasparCGSocketResponseEvent = /** @class */ (function (_super) {
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
        CasparCGSocketResponseEvent.RESPONSE = 'casparcgsocketresponseeventresponse';
        CasparCGSocketResponseEvent.INVALID_RESPONSE = 'casparcgsocketcommandeventresponseinvalid';
        return CasparCGSocketResponseEvent;
    }(BaseEvent_1.Event.BaseEvent));
    Event.CasparCGSocketResponseEvent = CasparCGSocketResponseEvent;
})(Event = exports.Event || (exports.Event = {}));
