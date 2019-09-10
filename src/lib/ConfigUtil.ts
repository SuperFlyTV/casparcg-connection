import { Config } from './Config'
import { CasparCGVersion } from './AMCPConnectionOptions'
import { CasparCGSocketResponse } from './CasparCGSocketResponse'
import { xmlValidator } from './ResponseValidators'
import { configParser } from './ResponseParsers'
import { Command } from './ServerStateEnum'
import { InfoConfigOptions } from '../CasparCGTypes'

/***/
export namespace ConfigUtil {
	/***/
	export function parseConfigFrom207XML(XMLString: string): Config.Intermediate.CasparCGConfig | {} {
		let validator = xmlValidator
		let parser = configParser
		let fauxResponseData: CasparCGSocketResponse = new CasparCGSocketResponse(XMLString)	// @todo: does this work?
		let validData: boolean | InfoConfigOptions = validator(fauxResponseData)
		if (validData === false) {
			return {}
		}
		validData = parser(fauxResponseData, Command.INFO_CONFIG, { serverVersion: CasparCGVersion.V207 })
		if (validData === false) {
			return {}
		}

		return validData
	}

	/***/
	export function parseConfigFrom210XML(XMLString: string): Config.Intermediate.CasparCGConfig | {} {
		let validator = xmlValidator
		let parser = configParser
		let fauxResponseData: CasparCGSocketResponse = new CasparCGSocketResponse(XMLString)	// @todo: does this work?
		let validData: Object = {}
		validData = validator(fauxResponseData)
		if (validData === false) {
			return {}
		}
		validData = parser(fauxResponseData, Command.INFO_CONFIG, { serverVersion: CasparCGVersion.V210 })
		if (validData === false) {
			return {}
		}

		return validData
	}
}
