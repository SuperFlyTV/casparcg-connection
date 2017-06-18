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
var hap_1 = require("hap");
var Event;
(function (Event) {
    /**
     *
     */
    var BaseEvent = (function (_super) {
        __extends(BaseEvent, _super);
        /**
         *
         */
        function BaseEvent(params) {
            var _this = _super.call(this, params) || this;
            _this.val(params);
            return _this;
        }
        /**
         *
         */
        BaseEvent.prototype.valueOf = function () {
            return this.val();
        };
        return BaseEvent;
    }(hap_1.EventFacade));
    Event.BaseEvent = BaseEvent;
})(Event = exports.Event || (exports.Event = {}));
