"use strict";
var ResponseValidators_1 = require("./ResponseValidators");
var StatusValidator = ResponseValidators_1.Response.StatusValidator;
/**
 *
 */
var Response;
(function (Response) {
    /**
     *
     */
    var ResponseSignature = (function () {
        /**
         *
         */
        // @todo: change :any to "typeof IResponseValidator" and same for parser
        function ResponseSignature(code, validator, parser) {
            if (code === void 0) { code = 202; }
            if (validator === void 0) { validator = StatusValidator; }
            if (parser === void 0) { parser = null; }
            this.code = code;
            this.validator = validator;
            this.parser = parser;
        }
        return ResponseSignature;
    }());
    Response.ResponseSignature = ResponseSignature;
})(Response = exports.Response || (exports.Response = {}));
