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
    var LogEvent = (function (_super) {
        __extends(LogEvent, _super);
        /**
         *
         */
        function LogEvent(logString) {
            var _this = _super.call(this, { logString: logString }) || this;
            _this.logString = logString;
            return _this;
        }
        /**
         *
         */
        LogEvent.prototype.valueOf = function () {
            return this.logString;
        };
        return LogEvent;
    }(BaseEvent_1.Event.BaseEvent));
    LogEvent.LOG = "logeventlog";
    Event.LogEvent = LogEvent;
})(Event = exports.Event || (exports.Event = {}));
