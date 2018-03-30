"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event;
(function (Event) {
    /**
     *
     */
    var BaseEvent = /** @class */ (function () {
        /**
         *
         */
        function BaseEvent(params) {
            this._val = params;
        }
        /**
         *
         */
        BaseEvent.prototype.valueOf = function () {
            return this._val;
        };
        return BaseEvent;
    }());
    Event.BaseEvent = BaseEvent;
})(Event = exports.Event || (exports.Event = {}));
