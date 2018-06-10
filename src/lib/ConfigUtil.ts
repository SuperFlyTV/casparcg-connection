// Config NS
import { Config } from './Config'
// Options NS
import { Options as OptionsNS } from './AMCPConnectionOptions'
import CasparCGVersion = OptionsNS.CasparCGVersion
// AMCPUtilNS
import { AMCPUtil as AMCPUtilNS } from './AMCP'
import CasparCGSocketResponse = AMCPUtilNS.CasparCGSocketResponse
// Validation NS
import { Response as validationNS } from './ResponseValidators'
import XMLValidator = validationNS.XMLValidator
// Response NS
import { Response as responseNS } from './ResponseParsers'
import ConfigParser = responseNS.ConfigParser

/***/
export namespace ConfigUtil {
	/***/
	export function parseConfigFrom207XML(XMLString: string): Config.Intermediate.CasparCGConfig | {} {
		let validator: XMLValidator = new XMLValidator()
		let parser: ConfigParser = new ConfigParser()
		parser.context = { serverVersion: CasparCGVersion.V207 }
		let fauxResponseData: CasparCGSocketResponse = new CasparCGSocketResponse(XMLString)	// @todo: does this work?
		let validData: Object = validator.resolve(fauxResponseData)
		if (validData === false) {
			return {}
		}
		validData = parser.parse(validData)
		if (validData === false) {
			return {}
		}

		return validData
	}

	/***/
	export function parseConfigFrom210XML(XMLString: string): Config.Intermediate.CasparCGConfig | {} {
		let validator: XMLValidator = new XMLValidator()
		let parser: ConfigParser = new ConfigParser()
		parser.context = { serverVersion: CasparCGVersion.V210 }
		let fauxResponseData: CasparCGSocketResponse = new CasparCGSocketResponse(XMLString)	// @todo: does this work?
		let validData: Object = {}
		validData = validator.resolve(fauxResponseData)
		if (validData === false) {
			return {}
		}
		validData = parser.parse(validData)
		if (validData === false) {
			return {}
		}

		return validData
	}
}
