import { start, stop } from './mock_caspar'
import * as net from 'net'
import { CasparCG } from '../index'

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
		let conn = new CasparCG({ debug: true })
		await expect(conn.ping()).resolves.toBeTruthy()
	})

	afterAll(async () => {
		await stop()
	})
})
