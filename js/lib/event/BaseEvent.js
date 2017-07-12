export var Event;
(function (Event) {
    /**
     *
     */
    class BaseEvent {
        /**
         *
         */
        constructor(params) {
            this._val = params;
        }
        /**
         *
         */
        valueOf() {
            return this._val;
        }
    }
    Event.BaseEvent = BaseEvent;
})(Event || (Event = {}));
