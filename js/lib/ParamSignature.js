import { Validation } from "./ParamValidators";
var AbstractValidator = Validation.AbstractValidator;
/**
 *
 */
export var Param;
(function (Param) {
    /**
     *
     */
    class Optional {
        /**
         *
         */
        static valueOf() {
            return false;
        }
    }
    Param.Optional = Optional;
    /**
     *
     */
    class Required {
        /**
         *
         */
        static valueOf() {
            return true;
        }
    }
    Param.Required = Required;
    /**
     *
     */
    class ParamSignature {
        /**
         *
         */
        constructor(required, name, key, validation) {
            this.required = required;
            this.name = name;
            this.key = key;
            this.payload = null;
            this.raw = null;
            if (validation instanceof AbstractValidator) {
                this.validation = validation;
            }
            else if (typeof validation === "function") {
                let proto = Object.create(validation["prototype"]);
                this.validation = new proto.constructor();
            }
        }
        /**
         *
         */
        get resolved() {
            return this.validation.resolved;
        }
    }
    Param.ParamSignature = ParamSignature;
})(Param || (Param = {}));
