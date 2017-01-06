"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 */
var Protocol;
(function (Protocol) {
    /**
     *
     */
    var AbstractProtocolLogic = (function () {
        /**
         *
         */
        function AbstractProtocolLogic() {
            var fields = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fields[_i] = arguments[_i];
            }
            this.fields = fields;
        }
        return AbstractProtocolLogic;
    }());
    Protocol.AbstractProtocolLogic = AbstractProtocolLogic;
    /**
     *
     */
    var Depends = (function (_super) {
        __extends(Depends, _super);
        function Depends() {
            var fields = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fields[_i] = arguments[_i];
            }
            return _super.apply(this, fields) || this;
        }
        /**
         *
         */
        Depends.prototype.if = function (target, mustBe) {
            var _this = this;
            var resolveRef = this.resolve;
            this.resolve = function (protocol) {
                for (var _i = 0, protocol_1 = protocol; _i < protocol_1.length; _i++) {
                    var param = protocol_1[_i];
                    if (param.name === target && param.payload === mustBe.toString()) {
                        return resolveRef.call(_this, protocol);
                    }
                }
                return protocol;
            };
            return this;
        };
        /**
         *
         */
        Depends.prototype.ifNot = function (target, cantBe) {
            var _this = this;
            var resolveRef = this.resolve;
            this.resolve = function (protocol) {
                for (var _i = 0, protocol_2 = protocol; _i < protocol_2.length; _i++) {
                    var param = protocol_2[_i];
                    if (param.name === target && param.payload === cantBe.toString()) {
                        return protocol;
                    }
                }
                return resolveRef.call(_this, protocol);
            };
            return this;
        };
        /**
         *
         */
        Depends.prototype.resolve = function (protocol) {
            var _this = this;
            var valids = protocol.filter(function (param) { return param.resolved && param.name === _this.fields[1]; });
            if (valids.length === 1) {
                return protocol;
            }
            else {
                return protocol.map(function (param) {
                    if (param.name === _this.fields[0]) {
                        param.payload = null;
                    }
                    return param;
                });
            }
        };
        return Depends;
    }(AbstractProtocolLogic));
    Protocol.Depends = Depends;
    /**
     *
     */
    var OneOf = (function (_super) {
        __extends(OneOf, _super);
        function OneOf() {
            var fields = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fields[_i] = arguments[_i];
            }
            return _super.apply(this, fields) || this;
        }
        /**
         *
         */
        OneOf.prototype.resolve = function (protocol) {
            var _this = this;
            var valids = protocol.filter(function (param) { return param.resolved && _this.fields.indexOf(param.name) > -1; });
            if (valids.length === 1) {
                return protocol;
            }
            return [];
        };
        return OneOf;
    }(AbstractProtocolLogic));
    Protocol.OneOf = OneOf;
    /**
     *
     */
    var Coupled = (function (_super) {
        __extends(Coupled, _super);
        function Coupled() {
            var fields = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                fields[_i] = arguments[_i];
            }
            return _super.apply(this, fields) || this;
        }
        /**
         *
         */
        Coupled.prototype.resolve = function (protocol) {
            var _this = this;
            var valids = protocol.filter(function (param) { return _this.fields.indexOf(param.name) > -1 && param.resolved === true; });
            if (valids.length >= this.fields.length) {
                return protocol;
            }
            else {
                return protocol.map(function (param) {
                    if (_this.fields.indexOf(param.name) > -1) {
                        param.payload = null;
                    }
                    return param;
                });
            }
        };
        return Coupled;
    }(AbstractProtocolLogic));
    Protocol.Coupled = Coupled;
})(Protocol = exports.Protocol || (exports.Protocol = {}));
