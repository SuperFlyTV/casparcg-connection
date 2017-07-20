"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Options NS
var AMCPConnectionOptions_1 = require("./AMCPConnectionOptions");
var CasparCGVersion = AMCPConnectionOptions_1.Options.CasparCGVersion;
// AMCPUtilNS
var AMCP_1 = require("./AMCP");
var CasparCGSocketResponse = AMCP_1.AMCPUtil.CasparCGSocketResponse;
// Validation NS
var ResponseValidators_1 = require("./ResponseValidators");
var XMLValidator = ResponseValidators_1.Response.XMLValidator;
// Response NS
var ResponseParsers_1 = require("./ResponseParsers");
var ConfigParser = ResponseParsers_1.Response.ConfigParser;
/***/
var ConfigUtil;
(function (ConfigUtil) {
    /***/
    function parseConfigFrom207XML(XMLString) {
        var validator = new XMLValidator();
        var parser = new ConfigParser();
        parser.context = { serverVersion: CasparCGVersion.V207 };
        var fauxResponseData = new CasparCGSocketResponse(XMLString); // @todo: does this work?
        var validData = {};
        if ((validData = validator.resolve(fauxResponseData)) === false) {
            return {};
        }
        if ((validData = parser.parse(validData)) === false) {
            return {};
        }
        return validData;
    }
    ConfigUtil.parseConfigFrom207XML = parseConfigFrom207XML;
    /***/
    function parseConfigFrom210XML(XMLString) {
        var validator = new XMLValidator();
        var parser = new ConfigParser();
        parser.context = { serverVersion: CasparCGVersion.V210 };
        var fauxResponseData = new CasparCGSocketResponse(XMLString); // @todo: does this work?
        var validData = {};
        if ((validData = validator.resolve(fauxResponseData)) === false) {
            return {};
        }
        if ((validData = parser.parse(validData)) === false) {
            return {};
        }
        return validData;
    }
    ConfigUtil.parseConfigFrom210XML = parseConfigFrom210XML;
})(ConfigUtil = exports.ConfigUtil || (exports.ConfigUtil = {}));
