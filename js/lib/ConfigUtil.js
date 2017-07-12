// Options NS
import { Options as OptionsNS } from "./AMCPConnectionOptions";
var ServerVersion = OptionsNS.ServerVersion;
// AMCPUtilNS
import { AMCPUtil as AMCPUtilNS } from "./AMCP";
var CasparCGSocketResponse = AMCPUtilNS.CasparCGSocketResponse;
// Validation NS
import { Response as validationNS } from "./ResponseValidators";
var XMLValidator = validationNS.XMLValidator;
// Response NS
import { Response as responseNS } from "./ResponseParsers";
var ConfigParser = responseNS.ConfigParser;
/** */
export var ConfigUtil;
(function (ConfigUtil) {
    /** */
    function parseConfigFrom207XML(XMLString) {
        let validator = new XMLValidator();
        let parser = new ConfigParser();
        parser.context = { serverVersion: ServerVersion.V207 };
        let fauxResponseData = new CasparCGSocketResponse(XMLString); // @todo: does this work?
        let validData = {};
        if ((validData = validator.resolve(fauxResponseData)) === false) {
            return {};
        }
        if ((validData = parser.parse(validData)) === false) {
            return {};
        }
        return validData;
    }
    ConfigUtil.parseConfigFrom207XML = parseConfigFrom207XML;
    /** */
    function parseConfigFrom210XML(XMLString) {
        let validator = new XMLValidator();
        let parser = new ConfigParser();
        parser.context = { serverVersion: ServerVersion.V207 };
        let fauxResponseData = new CasparCGSocketResponse(XMLString); // @todo: does this work?
        let validData = {};
        if ((validData = validator.resolve(fauxResponseData)) === false) {
            return {};
        }
        if ((validData = parser.parse(validData)) === false) {
            return {};
        }
        return validData;
    }
    ConfigUtil.parseConfigFrom210XML = parseConfigFrom210XML;
})(ConfigUtil || (ConfigUtil = {}));
