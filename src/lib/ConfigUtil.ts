// Config NS
import {Config} from "./Config";
// Options NS
import {Options as OptionsNS} from "./AMCPConnectionOptions";
import ServerVersion = OptionsNS.ServerVersion;
// AMCPUtilNS
import {AMCPUtil as AMCPUtilNS} from "./AMCP";
import CasparCGSocketResponse = AMCPUtilNS.CasparCGSocketResponse;
// Validation NS
import {Response as validationNS} from "./ResponseValidators";
import XMLValidator = validationNS.XMLValidator;
// Response NS
import {Response as responseNS} from "./ResponseParsers";
import ConfigParser	 = responseNS.ConfigParser;

/** */
export namespace ConfigUtil {
	/** */
	export function parseConfigFrom207XML(XMLString: string): Config.Intermediate.CasparCGConfig | {} {
		let validator: XMLValidator = new XMLValidator();
		let parser: ConfigParser = new ConfigParser();
		parser.context = {serverVersion: ServerVersion.V207};
		let fauxResponseData: CasparCGSocketResponse = new CasparCGSocketResponse(XMLString);	// @todo: does this work?
		let validData: Object = {};

		if ((validData = validator.resolve(fauxResponseData)) === false) {
			return {};
		}

		if ((validData = parser.parse(validData)) === false) {
			return {};
		}

		return validData;
	}

	/** */
	export function parseConfigFrom210XML(XMLString: string): Config.Intermediate.CasparCGConfig | {} {
		let validator: XMLValidator = new XMLValidator();
		let parser: ConfigParser = new ConfigParser();
		parser.context = {serverVersion: ServerVersion.V207};
		let fauxResponseData: CasparCGSocketResponse = new CasparCGSocketResponse(XMLString);	// @todo: does this work?
		let validData: Object = {};

		if ((validData = validator.resolve(fauxResponseData)) === false) {
			return {};
		}

		if ((validData = parser.parse(validData)) === false) {
			return {};
		}

		return validData;
	}
}