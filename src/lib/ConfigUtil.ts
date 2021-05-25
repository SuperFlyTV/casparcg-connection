/* eslint @typescript-eslint/ban-types: 0 */
// Config NS
import * as Config from './Config'
// Options NS
import { CasparCGVersion } from './AMCPConnectionOptions'
// AMCPUtilNS
import { CasparCGSocketResponse } from './AMCPUtil'
// Validation NS
import { XMLValidator } from './ResponseValidators'
// Response NS
import { ConfigParser } from './ResponseParsers'

export function parseConfigFrom207XML(XMLString: string): Config.Intermediate.CasparCGConfig | {} {
	const validator: XMLValidator = new XMLValidator()
	const parser: ConfigParser = new ConfigParser()
	parser.context = { serverVersion: CasparCGVersion.V207 }
	const fauxResponseData: CasparCGSocketResponse = new CasparCGSocketResponse(XMLString) // @todo: does this work?
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

export function parseConfigFrom210XML(XMLString: string): Config.Intermediate.CasparCGConfig | {} {
	const validator: XMLValidator = new XMLValidator()
	const parser: ConfigParser = new ConfigParser()
	parser.context = { serverVersion: CasparCGVersion.V210 }
	const fauxResponseData: CasparCGSocketResponse = new CasparCGSocketResponse(XMLString) // @todo: does this work?
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
