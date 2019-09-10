import { start, stop, version } from './mock_caspar'
import { CasparCG, Command } from '../index'
import { IAMCPStatus } from '../lib/AMCPCommand'

describe('Test the ping command', () => {

	let conn: CasparCG
	beforeAll(async () => {
		await start()
		conn = new CasparCG({ debug: true })
	})

	test('Check a ping v218', async () => {
		version('218')
		let reqPromise = conn.clear({ channel: 1 })
		await expect(reqPromise).resolves.toMatchObject({
			command: Command.CLEAR
		})
		let command = await reqPromise
		await expect(command.result).resolves.toMatchObject({
			details: {
				command: Command.CLEAR,
				channel: 1
			},
			response: {
				code: 202,
				raw: `RES ${command.token} 202 CLEAR OK`
			}
		})
		expect(command.status).toBe(IAMCPStatus.Succeeded)
	})

	// FIXME should not use RES
	test('Check a ping v218', async () => {
		version('207')
		let reqPromise = conn.clear({ channel: 1 })
		await expect(reqPromise).resolves.toMatchObject({
			command: Command.CLEAR
		})
		let command = await reqPromise
		await expect(command.result).resolves.toMatchObject({
			details: {
				command: Command.CLEAR,
				channel: 1
			},
			response: {
				code: 202,
				raw: `RES ${command.token} 202 CLEAR OK`
			}
		})
		expect(command.status).toBe(IAMCPStatus.Succeeded)
	})

	test('Check a ping v218', async () => {
		version('220')
		let reqPromise = conn.clear({ channel: 1 })
		await expect(reqPromise).resolves.toMatchObject({
			command: Command.CLEAR
		})
		let command = await reqPromise
		await expect(command.result).resolves.toMatchObject({
			details: {
				command: Command.CLEAR,
				channel: 1
			},
			response: {
				code: 202,
				raw: `RES ${command.token} 202 CLEAR OK`
			}
		})
		expect(command.status).toBe(IAMCPStatus.Succeeded)
	})

	afterAll(async () => {
		conn.disconnect()
		await stop()
	})
})
