import { start, stop } from './mock_caspar'
import * as net from 'net'
import { CasparCG, Command } from '../index'

describe('Test spinning up a mock server', () => {

	beforeAll(async () => {
		await start()
	})

	test('Open port and ping', async () => {
		let openSocket: net.Socket = await new Promise((resolve, reject) => {
			let sock = net.createConnection(5250)
			sock.once('connect', () => {
				resolve(sock)
			})
			sock.once('error', err => reject(err))
		})
		debugger
		openSocket.write('PING\r\n')
		openSocket.setEncoding('utf8')
		// await expect(Quantel.getFragments({ clipID: 42 })).rejects.toThrow('BadIdent')
		await expect(new Promise((resolve, reject) => {
			openSocket.once('data', d => {
				resolve(d)
			})
			openSocket.once('error', reject)
		})).resolves.toEqual('PONG\r\n')
		openSocket.destroy()
	})

	test('Check a ping via Caspar connection', async () => {
		// expect.assertions(2)
		let conn = new CasparCG({ debug: true })
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
		conn.disconnect()
	})

	afterAll(async () => {
		await stop()
	})
})
