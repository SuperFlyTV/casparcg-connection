"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParamValidators_1 = require("./ParamValidators");
var AbstractValidator = ParamValidators_1.Validation.AbstractValidator;
/**
 *
 */
var Param;
(function (Param) {
    /**
     *
     */
    var Optional = /** @class */ (function () {
        function Optional() {
        }
        /**
         *
         */
        Optional.valueOf = function () {
            return false;
        };
        return Optional;
    }());
    Param.Optional = Optional;
    /**
     *
     */
    var Required = /** @class */ (function () {
        function Required() {
        }
        /**
         *
         */
        Required.valueOf = function () {
            return true;
        };
        return Required;
    }());
    Param.Required = Required;
    /**
     *
     */
    var ParamSignature = /** @class */ (function () {
        /**
         *
         */
        function ParamSignature(required, name, key, validation) {
            this.required = required;
            this.name = name;
            this.key = key;
            this.payload = null;
            this.raw = null;
            if (validation instanceof AbstractValidator) {
                this.validation = validation;
            }
            else if (typeof validation === 'function') {
                var proto = Object.create(validation['prototype']);
                this.validation = new proto.constructor();
            }
        }
        Object.defineProperty(ParamSignature.prototype, "resolved", {
            /**
             *
             */
            get: function () {
                return this.validation.resolved;
            },
            enumerable: true,
            configurable: true
        });
        return ParamSignature;
    }());
    Param.ParamSignature = ParamSignature;
})(Param = exports.Param || (exports.Param = {}));
