import { Version } from '../enums'
import { Connection } from '../connection'
import { serializersV21, serializers } from '../serializers'
import { deserializers } from '../deserializers'
import { Socket as OrgSocket } from 'net'
import { Socket as MockSocket } from '../__mocks__/net'
import { Commands } from '../commands'
import { BasicCasparCGAPI } from '../api'

jest.mock('net')

const SocketMock = OrgSocket as any as typeof MockSocket

describe('connection', () => {
	describe('version handing', () => {
		function setupConnectionClass(v = Version.v23x) {
			const conn = new Connection('127.0.0.1', 5250, false)
			conn.version = v

			return conn
		}
		it('should use 2.1 serializers for 2.1 connection', () => {
			const conn = setupConnectionClass(Version.v21x)

			expect(conn['_getVersionedSerializers']()).toBe(serializersV21)
		})
		it('should use 2.3 serializers for 2.3 connection', () => {
			const conn = setupConnectionClass()

			expect(conn['_getVersionedSerializers']()).toBe(serializers)
		})
		it('should use 2.1 deserializers for 2.1 connection', () => {
			const conn = setupConnectionClass(Version.v21x)

			expect(conn['_getVersionedDeserializers']()).toBe(deserializers)
		})
		it('should use 2.3 deserializers for 2.3 connection', () => {
			const conn = setupConnectionClass()

			expect(conn['_getVersionedDeserializers']()).toBe(deserializers)
		})
	})

	describe('receiving', () => {
		const onSocketCreate = jest.fn()
		const onConnection = jest.fn()
		const onSocketClose = jest.fn()
		const onSocketWrite = jest.fn()
		const onConnectionChanged = jest.fn()

		function setupSocketMock() {
			SocketMock.mockOnNextSocket((socket: any) => {
				onSocketCreate()

				socket.onConnect = onConnection
				socket.onWrite = onSocketWrite
				socket.onClose = onSocketClose
			})
		}

		function extractReqId(index: number) {
			const str = onSocketWrite.mock.calls[index - 1][0]
			const match = str.match(/REQ (\w+) /)
			if (!match) throw new Error(`Failed to find REQ id in "${str}"`)
			return match[1]
		}

		beforeEach(() => {
			setupSocketMock()
		})
		afterEach(() => {
			const sockets = SocketMock.openSockets()
			// Destroy any lingering sockets, to prevent a failing test from affecting other tests:
			sockets.forEach((s) => s.destroy())

			SocketMock.clearMockOnNextSocket()
			onSocketCreate.mockClear()
			onConnection.mockClear()
			onSocketClose.mockClear()
			onSocketWrite.mockClear()
			onConnectionChanged.mockClear()

			// Just a check to ensure that the unit tests cleaned up the socket after themselves:
			// eslint-disable-next-line jest/no-standalone-expect
			expect(sockets).toHaveLength(0)
		})

		it('receive whole response', async () => {
			const conn = new Connection('127.0.0.1', 5250, true)
			try {
				expect(conn).toBeTruthy()

				const onConnError = jest.fn()
				const onConnData = jest.fn()
				conn.on('error', onConnError)
				conn.on('data', onConnData)

				const sockets = SocketMock.openSockets()
				expect(sockets).toHaveLength(1)

				// Dispatch a command
				const sendError = await conn.sendCommand({
					command: Commands.Info,
					params: {},
				})
				expect(sendError).toBeFalsy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Info was sent
				expect(onSocketWrite).toHaveBeenCalledTimes(1)
				expect(onSocketWrite).toHaveBeenLastCalledWith('INFO\r\n', 'utf-8')

				// Reply with a single blob
				sockets[0].mockData(
					Buffer.from(
						`201 INFO OK\r\n<?xml version="1.0" encoding="utf-8"?>\n<channel><test/></channel>\r\n\r\n`
					)
				)

				// Wait for deserializer to run
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(1)

				// Check result looks good
				expect(onConnData).toHaveBeenLastCalledWith({
					command: 'INFO',
					data: [
						{
							channel: {
								test: [''],
							},
						},
					],
					message: 'The command has been executed and data is being returned.',
					reqId: undefined,
					responseCode: 201,
					type: 'OK',
				})
			} finally {
				// Ensure cleaned up
				conn.disconnect()
			}
		})

		it('receive fragmented response', async () => {
			const conn = new Connection('127.0.0.1', 5250, true)
			try {
				expect(conn).toBeTruthy()

				const onConnError = jest.fn()
				const onConnData = jest.fn()
				conn.on('error', onConnError)
				conn.on('data', onConnData)

				const sockets = SocketMock.openSockets()
				expect(sockets).toHaveLength(1)

				// Dispatch a command
				const sendError = await conn.sendCommand({
					command: Commands.Info,
					params: {},
				})
				expect(sendError).toBeFalsy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Info was sent
				expect(onSocketWrite).toHaveBeenCalledTimes(1)
				expect(onSocketWrite).toHaveBeenLastCalledWith('INFO\r\n', 'utf-8')

				// Reply with a fragmented message
				sockets[0].mockData(Buffer.from(`201 INFO OK\r\n<?xml version="1.0" encoding="utf-8"?>\n<channel>`))
				sockets[0].mockData(Buffer.from(`<test/></channel>\r\n\r\n`))

				// Wait for deserializer to run
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(1)

				// Check result looks good
				expect(onConnData).toHaveBeenLastCalledWith({
					command: 'INFO',
					data: [
						{
							channel: {
								test: [''],
							},
						},
					],
					message: 'The command has been executed and data is being returned.',
					reqId: undefined,
					responseCode: 201,
					type: 'OK',
				})
			} finally {
				// Ensure cleaned up
				conn.disconnect()
			}
		})

		it('receive fast responses', async () => {
			const conn = new Connection('127.0.0.1', 5250, true)
			try {
				expect(conn).toBeTruthy()

				const onConnError = jest.fn()
				const onConnData = jest.fn()
				conn.on('error', onConnError)
				conn.on('data', onConnData)

				const sockets = SocketMock.openSockets()
				expect(sockets).toHaveLength(1)

				// Dispatch a command
				const sendError = await conn.sendCommand(
					{
						command: Commands.Info,
						params: {},
					},
					'cmd1'
				)
				expect(sendError).toBeFalsy()
				const sendError2 = await conn.sendCommand(
					{
						command: Commands.Play,
						params: {
							channel: 1,
							layer: 10,
						},
					},
					'cmd2'
				)
				expect(sendError2).toBeFalsy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Info was sent
				expect(onSocketWrite).toHaveBeenCalledTimes(2)
				expect(onSocketWrite).toHaveBeenNthCalledWith(1, 'REQ cmd1 INFO\r\n', 'utf-8')
				expect(onSocketWrite).toHaveBeenNthCalledWith(2, 'REQ cmd2 PLAY 1-10\r\n', 'utf-8')

				// Send replies
				sockets[0].mockData(
					Buffer.from(
						`RES cmd1 201 INFO OK\r\n<?xml version="1.0" encoding="utf-8"?>\n<channel><test/></channel>\r\n\r\n`
					)
				)
				sockets[0].mockData(Buffer.from(`RES cmd2 202 PLAY OK\r\n`))

				// Wait for deserializer to run
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(2)

				// Check result looks good
				expect(onConnData).toHaveBeenNthCalledWith(1, {
					command: 'PLAY',
					data: [],
					message: 'The command has been executed.',
					reqId: 'cmd2',
					responseCode: 202,
					type: 'OK',
				})
				expect(onConnData).toHaveBeenNthCalledWith(2, {
					command: 'INFO',
					data: [
						{
							channel: {
								test: [''],
							},
						},
					],
					message: 'The command has been executed and data is being returned.',
					reqId: 'cmd1',
					responseCode: 201,
					type: 'OK',
				})
			} finally {
				// Ensure cleaned up
				conn.disconnect()
			}
		})

		it('receive broken response', async () => {
			const conn = new Connection('127.0.0.1', 5250, true)
			try {
				expect(conn).toBeTruthy()

				const onConnError = jest.fn()
				const onConnData = jest.fn()
				conn.on('error', onConnError)
				conn.on('data', onConnData)

				const sockets = SocketMock.openSockets()
				expect(sockets).toHaveLength(1)

				// Dispatch a command
				const sendError = await conn.sendCommand(
					{
						command: Commands.Info,
						params: {},
					},
					'cmd1'
				)
				expect(sendError).toBeFalsy()
				const sendError2 = await conn.sendCommand(
					{
						command: Commands.Play,
						params: {
							channel: 1,
							layer: 10,
						},
					},
					'cmd2'
				)
				expect(sendError2).toBeFalsy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Info was sent
				expect(onSocketWrite).toHaveBeenCalledTimes(2)
				expect(onSocketWrite).toHaveBeenNthCalledWith(1, 'REQ cmd1 INFO\r\n', 'utf-8')
				expect(onSocketWrite).toHaveBeenNthCalledWith(2, 'REQ cmd2 PLAY 1-10\r\n', 'utf-8')

				// Reply with a blob designed to crash the xml parser
				sockets[0].mockData(Buffer.from(`RES cmd1 201 INFO OK\r\n<?xml\r\n\r\n`))
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(1)

				// Check result looks good
				expect(onConnData).toHaveBeenNthCalledWith(1, {
					command: 'INFO',
					data: ['<?xml'],
					message: 'Invalid response received.',
					reqId: 'cmd1',
					responseCode: 500,
					type: 'FAILED',
				})
				onConnData.mockClear()

				// Reply with successful PLAY
				sockets[0].mockData(Buffer.from(`RES cmd2 202 PLAY OK\r\n`))
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(1)

				// Check result looks good
				expect(onConnData).toHaveBeenNthCalledWith(1, {
					command: 'PLAY',
					data: [],
					message: 'The command has been executed.',
					reqId: 'cmd2',
					responseCode: 202,
					type: 'OK',
				})
			} finally {
				// Ensure cleaned up
				conn.disconnect()
			}
		})

		it('test with full client', async () => {
			const client = new BasicCasparCGAPI({
				host: '127.0.0.1',
				port: 5250,
				autoConnect: true,
			})
			try {
				expect(client).toBeTruthy()

				const onConnError = jest.fn()
				// const onConnData = jest.fn()
				client.on('error', onConnError)
				// client.on('data', onConnData)

				const onCommandOk = jest.fn()
				const onCommandError = jest.fn()

				const sockets = SocketMock.openSockets()
				expect(sockets).toHaveLength(1)

				// Dispatch a command
				const sendError = await client.executeCommand({
					command: Commands.Info,
					params: {},
				})
				sendError.request?.then(onCommandOk, onCommandError)
				const sendError2 = await client.executeCommand({
					command: Commands.Play,
					params: {
						channel: 1,
						layer: 10,
					},
				})
				sendError2.request?.then(onCommandOk, onCommandError)
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onCommandOk).toHaveBeenCalledTimes(0)
				expect(onCommandError).toHaveBeenCalledTimes(0)

				// Info was sent
				expect(onSocketWrite).toHaveBeenCalledTimes(2)
				expect(onSocketWrite).toHaveBeenNthCalledWith(1, expect.stringMatching(/REQ (\w+) INFO\r\n/), 'utf-8')
				expect(onSocketWrite).toHaveBeenNthCalledWith(
					2,
					expect.stringMatching(/REQ (\w+) PLAY 1-10\r\n/),
					'utf-8'
				)

				// Reply with a blob designed to crash the xml parser
				const infoReqId = extractReqId(1)
				sockets[0].mockData(Buffer.from(`RES ${infoReqId} 201 INFO OK\r\n<?xml\r\n\r\n`))
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				// expect(onConnData).toHaveBeenCalledTimes(1)
				expect(onCommandOk).toHaveBeenCalledTimes(1)
				expect(onCommandError).toHaveBeenCalledTimes(0)

				// Check result looks good
				expect(onCommandOk).toHaveBeenNthCalledWith(1, {
					command: 'INFO',
					data: ['<?xml'],
					message: 'Invalid response received.',
					reqId: infoReqId,
					responseCode: 500,
					type: 'FAILED',
				})
				onCommandOk.mockClear()

				// Reply with successful PLAY
				const playReqId = extractReqId(2)
				sockets[0].mockData(Buffer.from(`RES ${playReqId} 202 PLAY OK\r\n`))
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onCommandOk).toHaveBeenCalledTimes(1)
				expect(onCommandError).toHaveBeenCalledTimes(0)

				// Check result looks good
				expect(onCommandOk).toHaveBeenNthCalledWith(1, {
					command: 'PLAY',
					data: [],
					message: 'The command has been executed.',
					reqId: playReqId,
					responseCode: 202,
					type: 'OK',
				})
			} finally {
				// Ensure cleaned up
				client.disconnect()
			}
		})

		it('connection loss midway through response', async () => {
			const conn = new Connection('127.0.0.1', 5250, true)
			try {
				expect(conn).toBeTruthy()

				const onConnError = jest.fn()
				const onConnData = jest.fn()
				conn.on('error', onConnError)
				conn.on('data', onConnData)

				const sockets = SocketMock.openSockets()
				expect(sockets).toHaveLength(1)

				// Dispatch a command
				const sendError = await conn.sendCommand(
					{
						command: Commands.Info,
						params: {},
					},
					'cmd1'
				)
				expect(sendError).toBeFalsy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Info was sent
				expect(onSocketWrite).toHaveBeenCalledTimes(1)
				expect(onSocketWrite).toHaveBeenNthCalledWith(1, 'REQ cmd1 INFO\r\n', 'utf-8')
				// expect(onSocketWrite).toHaveBeenNthCalledWith(2, 'REQ cmd2 PLAY 1-10\r\n', 'utf-8')
				onSocketWrite.mockClear()

				// Reply with a part of a fragmented message
				sockets[0].mockData(Buffer.from(`RES cmd1 201 INFO OK\r\n<?xml`))
				await new Promise(setImmediate)

				expect(conn.connected).toBeTruthy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Simulate connection failure
				sockets[0].emit('close', new Error('Connection lost'))
				await new Promise(setImmediate)

				expect(conn.connected).toBeFalsy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Reconnect
				sockets[0].emit('connect')
				await new Promise(setImmediate)

				expect(conn.connected).toBeTruthy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Send a command in the new connection
				const sendError2 = await conn.sendCommand(
					{
						command: Commands.Play,
						params: {
							channel: 1,
							layer: 10,
						},
					},
					'cmd2'
				)
				expect(sendError2).toBeFalsy()

				// Check was sent
				expect(onSocketWrite).toHaveBeenCalledTimes(1)
				expect(onSocketWrite).toHaveBeenNthCalledWith(1, 'REQ cmd2 PLAY 1-10\r\n', 'utf-8')

				await new Promise(setImmediate)
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Reply with successful PLAY
				sockets[0].mockData(Buffer.from(`RES cmd2 202 PLAY OK\r\n`))
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(1)

				// Check result looks good
				expect(onConnData).toHaveBeenNthCalledWith(1, {
					command: 'PLAY',
					data: [],
					message: 'The command has been executed.',
					reqId: 'cmd2',
					responseCode: 202,
					type: 'OK',
				})
			} finally {
				// Ensure cleaned up
				conn.disconnect()
			}
		})
	})
})
