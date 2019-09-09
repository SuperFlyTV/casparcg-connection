import { start, stop, version } from './mock_caspar'
import { CasparCG, Command } from '../index'

describe('Test the ping command', () => {

	let conn: CasparCG
	beforeAll(async () => {
		await start()
		conn = new CasparCG({ debug: true })
	})

	test('Check a ping v218', async () => {
		version('218')
		let reqPromise = conn.ping()
		await expect(reqPromise).resolves.toMatchObject({
			command: Command.PING
		})
		let resPromise = (await reqPromise).result
		await expect(resPromise).resolves.toMatchObject({
			details: {
				command: Command.PING,
				token: undefined
			},
			response: {
				code: NaN,
				raw: 'PONG'
			}
		})
	})

	test('Check a ping with token v218', async () => {
		version('218')
		let reqPromise = conn.ping({ token: 'random42' })
		await expect(reqPromise).resolves.toMatchObject({
			command: Command.PING,
			params: { token: 'random42' }
		})
		let resPromise = (await reqPromise).result
		await expect(resPromise).resolves.toEqual({
			details: {
				command: Command.PING,
				token: 'random42'
			},
			response: {
				code: NaN,
				raw: 'PONG random42'
			}
		})
	})

	// FIXME - I should return not implemented
	test('Check a ping v207', async () => {
		version('207')
		let reqPromise = conn.ping()
		await expect(reqPromise).resolves.toMatchObject({
			command: Command.PING
		})
		let resPromise = (await reqPromise).result
		await expect(resPromise).rejects.toThrow('Invalid response')
	})

	test('Check a ping with token v207', async () => {
		version('207')
		let reqPromise = conn.ping({ token: 'random42' })
		await expect(reqPromise).resolves.toMatchObject({
			command: Command.PING,
			params: { token: 'random42' }
		})
		let resPromise = (await reqPromise).result
		await expect(resPromise).rejects.toThrow('Invalid response')
	})

	test('Check a ping v220', async () => {
		version('220')
		let reqPromise = conn.ping()
		await expect(reqPromise).resolves.toMatchObject({
			command: Command.PING
		})
		let resPromise = (await reqPromise).result
		await expect(resPromise).resolves.toMatchObject({
			details: {
				command: Command.PING,
				token: undefined
			},
			response: {
				code: NaN,
				raw: 'PONG'
			}
		})
	})

	test('Check a ping with token v220', async () => {
		version('220')
		let reqPromise = conn.ping({ token: 'random42' })
		await expect(reqPromise).resolves.toMatchObject({
			command: Command.PING,
			params: { token: 'random42' }
		})
		let resPromise = (await reqPromise).result
		await expect(resPromise).resolves.toEqual({
			details: {
				command: Command.PING,
				token: 'random42'
			},
			response: {
				code: NaN,
				raw: 'PONG random42'
			}
		})
	})

	afterAll(async () => {
		conn.disconnect()
		await stop()
	})
})
