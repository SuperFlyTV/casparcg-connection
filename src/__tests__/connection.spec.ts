import { Version } from '../enums'
import { Connection } from '../connection'
import { serializersV21, serializers } from '../serializers'
import { deserializers } from '../deserializers'
import { Socket as OrgSocket } from 'net'
import { Socket as MockSocket } from '../__mocks__/net'
import { Commands } from '../commands'
import { BasicCasparCGAPI, ResponseError } from '../api'

jest.mock('net')

const SocketMock = OrgSocket as any as typeof MockSocket

describe('connection', () => {
	describe('version handing', () => {
		function setupConnectionClass(v = Version.v23x) {
			const conn = new Connection('127.0.0.1', 5250, false, () => undefined)
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

		async function runWithConnection(
			fn: (
				connection: Connection,
				socket: MockSocket,
				onConnError: jest.Mock,
				onConnData: jest.Mock
			) => Promise<void>
		) {
			const conn = new Connection('127.0.0.1', 5250, true, () => undefined)
			try {
				expect(conn).toBeTruthy()

				const onConnError = jest.fn()
				const onConnData = jest.fn()
				conn.on('error', onConnError)
				conn.on('data', onConnData)

				const sockets = SocketMock.openSockets()
				expect(sockets).toHaveLength(1)

				await fn(conn, sockets[0], onConnError, onConnData)
			} finally {
				// Ensure cleaned up
				conn.disconnect()
			}
		}

		it('receive whole response', async () => {
			await runWithConnection(async (conn, socket, onConnError, onConnData) => {
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
				socket.mockData(
					Buffer.from(
						`201 INFO OK\r\n<?xml version="1.0" encoding="utf-8"?>\n<channel><test/></channel>\r\n\r\n`
					)
				)

				// Wait for deserializer to run
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(1)

				// Check result looks good
				expect(onConnData).toHaveBeenLastCalledWith(
					{
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
					},
					undefined
				)
			})
		})

		it('receive fragmented response', async () => {
			await runWithConnection(async (conn, socket, onConnError, onConnData) => {
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
				socket.mockData(Buffer.from(`201 INFO OK\r\n<?xml version="1.0" encoding="utf-8"?>\n<channel>`))
				socket.mockData(Buffer.from(`<test/></channel>\r\n\r\n`))

				// Wait for deserializer to run
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(1)

				// Check result looks good
				expect(onConnData).toHaveBeenLastCalledWith(
					{
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
					},
					undefined
				)
			})
		})

		it('receive fast responses', async () => {
			await runWithConnection(async (conn, socket, onConnError, onConnData) => {
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
				socket.mockData(
					Buffer.from(
						`RES cmd1 201 INFO OK\r\n<?xml version="1.0" encoding="utf-8"?>\n<channel><test/></channel>\r\n\r\n`
					)
				)
				socket.mockData(Buffer.from(`RES cmd2 202 PLAY OK\r\n`))

				// Wait for deserializer to run
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(2)

				// Check result looks good
				expect(onConnData).toHaveBeenNthCalledWith(
					1,
					{
						command: 'PLAY',
						data: [],
						message: 'The command has been executed.',
						reqId: 'cmd2',
						responseCode: 202,
						type: 'OK',
					},
					undefined
				)
				expect(onConnData).toHaveBeenNthCalledWith(
					2,
					{
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
					},
					undefined
				)
			})
		})

		it('receive broken response', async () => {
			await runWithConnection(async (conn, socket, onConnError, onConnData) => {
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
				socket.mockData(Buffer.from(`RES cmd1 201 INFO OK\r\n<?xml\r\n\r\n`))
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(1)

				// Check result looks correct
				expect(onConnData).toHaveBeenNthCalledWith(
					1,
					{
						command: 'INFO',
						data: ['<?xml'],
						message: 'The command has been executed and data is being returned.',
						reqId: 'cmd1',
						responseCode: 201,
						type: 'OK',
					},
					expect.any(Error)
				)
				expect(onConnData.mock.calls[0][1].toString()).toMatch(/Unexpected end/)
				onConnData.mockClear()

				// Reply with successful PLAY
				socket.mockData(Buffer.from(`RES cmd2 202 PLAY OK\r\n`))
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(1)

				// Check result looks good
				expect(onConnData).toHaveBeenNthCalledWith(
					1,
					{
						command: 'PLAY',
						data: [],
						message: 'The command has been executed.',
						reqId: 'cmd2',
						responseCode: 202,
						type: 'OK',
					},
					undefined
				)
			})
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
				expect(onCommandOk).toHaveBeenCalledTimes(0)
				expect(onCommandError).toHaveBeenCalledTimes(1)

				// Check result looks correct
				const commandError = onCommandError.mock.calls[0][0] as ResponseError
				expect(commandError.toString()).toMatch(/Failed to deserialize/)
				expect(commandError.deserializeError.toString()).toMatch(/Unexpected end/)
				expect(commandError.response).toMatchObject({
					command: 'INFO',
					data: ['<?xml'],
					message: 'The command has been executed and data is being returned.',
					reqId: infoReqId,
					responseCode: 201,
					type: 'OK',
				})
				onCommandError.mockClear()

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
			await runWithConnection(async (conn, socket, onConnError, onConnData) => {
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
				socket.mockData(Buffer.from(`RES cmd1 201 INFO OK\r\n<?xml`))
				await new Promise(setImmediate)

				expect(conn.connected).toBeTruthy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Simulate connection failure
				socket.emit('close', new Error('Connection lost'))
				await new Promise(setImmediate)

				expect(conn.connected).toBeFalsy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Reconnect
				socket.emit('connect')
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
				socket.mockData(Buffer.from(`RES cmd2 202 PLAY OK\r\n`))
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(1)

				// Check result looks good
				expect(onConnData).toHaveBeenNthCalledWith(
					1,
					{
						command: 'PLAY',
						data: [],
						message: 'The command has been executed.',
						reqId: 'cmd2',
						responseCode: 202,
						type: 'OK',
					},
					undefined
				)
			})
		})
	})
})
