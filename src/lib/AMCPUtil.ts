/* eslint @typescript-eslint/ban-types: 0 */
import { IAMCPCommandVO, IAMCPCommand } from './AbstractCommand'
import * as AMCP from './AMCP'

/**
 *
 */
export function deSerialize(cmd: IAMCPCommandVO, id: string): IAMCPCommand {
	// errror: commandstatus -1 //invalid command

	// @todo: error handling much?????? (callback??????)
	// let command: IAMCPCommand = Object.create((AMCP as any)[cmd._commandName]['prototype'])
	// command.constructor.call(command, cmd._objectParams)
	const command: IAMCPCommand = new (AMCP as any)[cmd._commandName](cmd._objectParams)
	command.populate(cmd, id)
	return command
}

/**
 *
 */
export class CasparCGSocketResponse {
	public statusCode: number
	public token: string | undefined
	public responseString: string
	public items: Array<string> = []

	constructor(responseString: string) {
		this.token = CasparCGSocketResponse.parseToken(responseString)
		this.statusCode = CasparCGSocketResponse.evaluateStatusCode(responseString)
		this.responseString = responseString
	}

	static evaluateStatusCode(responseString: string): number {
		const token = CasparCGSocketResponse.parseToken(responseString)
		let index: number
		if (token) index = token.length + 5
		else index = 0
		return parseInt(responseString.substr(index, 3), 10)
	}

	static parseToken(responseString: string): string | undefined {
		if (responseString.substr(0, 3) === 'RES') {
			return responseString.substr(4).split(' ')[0] // RES [token] RESPONSE
		} else {
			return undefined
		}
	}
}
