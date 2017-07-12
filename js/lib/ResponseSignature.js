import { Response as ResponseValidatorNS } from "./ResponseValidators";
var StatusValidator = ResponseValidatorNS.StatusValidator;
/**
 *
 */
export var Response;
(function (Response) {
    /**
     *
     */
    class ResponseSignature {
        /**
         *
         */
        // @todo: change :any to "typeof IResponseValidator" and same for parser
        constructor(code = 202, validator = StatusValidator, parser = null) {
            this.code = code;
            this.validator = validator;
            this.parser = parser;
        }
    }
    Response.ResponseSignature = ResponseSignature;
})(Response || (Response = {}));
