import { Version } from '../enums.js'
import { Connection, SentRequest } from '../connection.js'
import { serializersV21, serializers } from '../serializers.js'
import { deserializers } from '../deserializers/index.js'
import { AMCPCommand, Commands } from '../commands.js'
import { BasicCasparCGAPI, ResponseError, Response } from '../api.js'
import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest'

// eslint-disable-next-line vitest/no-mocks-import
import type { Socket as S0 } from '../__mocks__/net.js'
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const { Socket: SocketMock } = (await vi.hoisted(async () => vi.importActual('../__mocks__/net.js'))) as {
	Socket: typeof S0
}
type SocketMock = S0

vi.mock('net', () => ({ Socket: SocketMock }))

const PARSED_INFO_CHANNEL_720p50 = {
	channel: 1,
	format: '720p5000',
	frameRate: 50,
	channelRate: 50,
	interlaced: false,
	status: 'PLAYING',
}

describe('connection', () => {
	describe('version handing', () => {
		function setupConnectionClass(v = Version.v23x) {
			const conn = new Connection('127.0.0.1', 5250, false, 0, () => undefined)
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
		const onSocketCreate = vi.fn()
		const onConnection = vi.fn()
		const onSocketClose = vi.fn()
		const onSocketWrite = vi.fn()
		const onConnectionChanged = vi.fn()

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
			// eslint-disable-next-line vitest/no-standalone-expect
			expect(sockets).toHaveLength(0)
		})

		async function runWithConnection(
			fn: (
				connection: Connection,
				socket: SocketMock,
				onConnError: Mock,
				onConnData: Mock,
				getRequestForResponse: Mock<(response: Response<any>) => SentRequest | undefined>
			) => Promise<void>
		) {
			const getRequestForResponse = vi.fn()
			const conn = new Connection('127.0.0.1', 5250, true, 0, getRequestForResponse)
			try {
				expect(conn).toBeTruthy()

				const onConnError = vi.fn()
				const onConnData = vi.fn()
				conn.on('error', onConnError)
				conn.on('data', onConnData)

				const sockets = SocketMock.openSockets()
				expect(sockets).toHaveLength(1)

				await fn(conn, sockets[0], onConnError, onConnData, getRequestForResponse)
			} finally {
				// Ensure cleaned up
				conn.disconnect()
			}
		}

		it('receive whole response', async () => {
			await runWithConnection(async (conn, socket, onConnError, onConnData, getRequestForResponse) => {
				// Dispatch a command
				const command: AMCPCommand = {
					command: Commands.Info,
					params: {},
				}
				const sendError = await conn.sendCommand(command)
				expect(sendError).toBeFalsy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)
				getRequestForResponse.mockReturnValue({ command })
				// Info was sent
				expect(onSocketWrite).toHaveBeenCalledTimes(1)
				expect(onSocketWrite).toHaveBeenLastCalledWith('INFO\r\n', 'utf-8')

				// Reply with a single blob
				socket.mockData(Buffer.from(`201 INFO OK\r\n1 720p5000 PLAYING\r\n\r\n`))

				// Wait for deserializer to run
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(1)

				// Check result looks good
				expect(onConnData).toHaveBeenLastCalledWith(
					{
						command: 'INFO',
						data: [PARSED_INFO_CHANNEL_720p50],
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
			await runWithConnection(async (conn, socket, onConnError, onConnData, getRequestForResponse) => {
				// Dispatch a command
				const command: AMCPCommand = {
					command: Commands.Info,
					params: {},
				}
				const sendError = await conn.sendCommand(command)
				expect(sendError).toBeFalsy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)
				getRequestForResponse.mockReturnValue({ command })

				// Info was sent
				expect(onSocketWrite).toHaveBeenCalledTimes(1)
				expect(onSocketWrite).toHaveBeenLastCalledWith('INFO\r\n', 'utf-8')

				// Reply with a fragmented message
				socket.mockData(Buffer.from(`201 INFO OK\r\n1 720p`))
				socket.mockData(Buffer.from(`5000 PLAYING\r\n\r\n`))

				// Wait for deserializer to run
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(1)

				// Check result looks good
				expect(onConnData).toHaveBeenLastCalledWith(
					{
						command: 'INFO',
						data: [PARSED_INFO_CHANNEL_720p50],
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
			await runWithConnection(async (conn, socket, onConnError, onConnData, getRequestForResponse) => {
				// Dispatch a command
				const command1: AMCPCommand = {
					command: Commands.Info,
					params: {},
				}
				const reqId1 = 'cmd1'
				const sendError = await conn.sendCommand(command1, reqId1)
				expect(sendError).toBeFalsy()
				const command2: AMCPCommand = {
					command: Commands.Play,
					params: {
						channel: 1,
						layer: 10,
					},
				}
				const reqId2 = 'cmd2'
				const sendError2 = await conn.sendCommand(command2, reqId2)
				expect(sendError2).toBeFalsy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Info was sent
				expect(onSocketWrite).toHaveBeenCalledTimes(2)
				expect(onSocketWrite).toHaveBeenNthCalledWith(1, 'REQ cmd1 INFO\r\n', 'utf-8')
				expect(onSocketWrite).toHaveBeenNthCalledWith(2, 'REQ cmd2 PLAY 1-10\r\n', 'utf-8')

				getRequestForResponse.mockImplementation((arg) => {
					if (arg.reqId === reqId1) return { command: command1 }
					return { command: command2 }
				})
				// Send replies
				socket.mockData(Buffer.from(`RES ${reqId1} 201 INFO OK\r\n1 720p5000 PLAYING\r\n\r\n`))
				socket.mockData(Buffer.from(`RES ${reqId2} 202 PLAY OK\r\n`))

				// Wait for deserializer to run
				await new Promise(setImmediate)

				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(2)

				// Check result looks good
				expect(onConnData).toHaveBeenNthCalledWith(
					2,
					{
						command: 'INFO',
						data: [PARSED_INFO_CHANNEL_720p50],
						message: 'The command has been executed and data is being returned.',
						reqId: reqId1,
						responseCode: 201,
						type: 'OK',
					},
					undefined
				)
				expect(onConnData).toHaveBeenNthCalledWith(
					1,
					{
						command: 'PLAY',
						data: undefined,
						message: 'The command has been executed.',
						reqId: reqId2,
						responseCode: 202,
						type: 'OK',
					},
					undefined
				)
			})
		})

		it('receive broken response', async () => {
			await runWithConnection(async (conn, socket, onConnError, onConnData, getRequestForResponse) => {
				// Dispatch a command
				const command1: AMCPCommand = {
					command: Commands.InfoChannel,
					params: { channel: 1 },
				}
				const sendError = await conn.sendCommand(command1, 'cmd1')
				expect(sendError).toBeFalsy()
				const command2: AMCPCommand = {
					command: Commands.Play,
					params: {
						channel: 1,
						layer: 10,
					},
				}
				const sendError2 = await conn.sendCommand(command2, 'cmd2')
				expect(sendError2).toBeFalsy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Info was sent
				expect(onSocketWrite).toHaveBeenCalledTimes(2)
				expect(onSocketWrite).toHaveBeenNthCalledWith(1, 'REQ cmd1 INFO 1\r\n', 'utf-8')
				expect(onSocketWrite).toHaveBeenNthCalledWith(2, 'REQ cmd2 PLAY 1-10\r\n', 'utf-8')

				getRequestForResponse.mockReturnValueOnce({ command: command1 })
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

				getRequestForResponse.mockReturnValueOnce({ command: command2 })
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
						data: undefined,
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

				const onConnError = vi.fn()
				// const onConnData = vi.fn()
				client.on('error', onConnError)
				// client.on('data', onConnData)

				const onCommandOk = vi.fn()
				const onCommandError = vi.fn()

				const sockets = SocketMock.openSockets()
				expect(sockets).toHaveLength(1)

				// Dispatch a command
				const sendError = await client.executeCommand({
					command: Commands.InfoChannel,
					params: { channel: 1 },
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
				expect(onSocketWrite).toHaveBeenNthCalledWith(1, expect.stringMatching(/REQ (\w+) INFO 1\r\n/), 'utf-8')
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
					data: undefined,
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
			await runWithConnection(async (conn, socket, onConnError, onConnData, getRequestForResponse) => {
				// Dispatch a command
				const command1: AMCPCommand = {
					command: Commands.InfoChannel,
					params: { channel: 1 },
				}
				const sendError = await conn.sendCommand(command1, 'cmd1')
				expect(sendError).toBeFalsy()
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				// Info was sent
				expect(onSocketWrite).toHaveBeenCalledTimes(1)
				expect(onSocketWrite).toHaveBeenNthCalledWith(1, 'REQ cmd1 INFO 1\r\n', 'utf-8')
				// expect(onSocketWrite).toHaveBeenNthCalledWith(2, 'REQ cmd2 PLAY 1-10\r\n', 'utf-8')
				onSocketWrite.mockClear()

				getRequestForResponse.mockReturnValue({ command: command1 })
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
				const command2: AMCPCommand = {
					command: Commands.Play,
					params: {
						channel: 1,
						layer: 10,
					},
				}
				const sendError2 = await conn.sendCommand(command2, 'cmd2')
				expect(sendError2).toBeFalsy()

				// Check was sent
				expect(onSocketWrite).toHaveBeenCalledTimes(1)
				expect(onSocketWrite).toHaveBeenNthCalledWith(1, 'REQ cmd2 PLAY 1-10\r\n', 'utf-8')

				await new Promise(setImmediate)
				expect(onConnError).toHaveBeenCalledTimes(0)
				expect(onConnData).toHaveBeenCalledTimes(0)

				getRequestForResponse.mockReturnValue({ command: command2 })
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
						data: undefined,
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
	describe('connection management', () => {
		let enablePingReplies = true
		const PING_INTERVAL = 10 // [ms] Something short to make the test run fast, but not too short to cause flakiness
		const RECONNECT_TIME = PING_INTERVAL * 3 // something short, but distinctly longer than the ping interval

		const onSocketCreate = vi.fn()
		const onConnection = vi.fn()
		const onSocketClose = vi.fn()
		const onSocketWrite = vi.fn((data) => {
			if (data === 'PING\r\n') {
				// Reply to ping
				const sockets = SocketMock.openSockets()
				if (sockets.length !== 1) throw new Error(`Expected 1 socket, got ${sockets.length}`)
				const socket = sockets[0]

				if (enablePingReplies) socket.mockData(Buffer.from(`PONG\r\n\r\n`)) // reply to PING
			}
		})
		const onConnectionChanged = vi.fn()
		const getRequestForResponse = vi.fn(() => {
			return undefined
		})
		function getPingCount() {
			return onSocketWrite.mock.calls.filter((call) => call[0] === 'PING\r\n').length
		}

		beforeEach(() => {
			for (let i = 0; i < 2; i++) {
				SocketMock.mockOnNextSocket((socket: any) => {
					onSocketCreate()

					socket.onConnect = onConnection
					socket.onWrite = onSocketWrite
					socket.onClose = onSocketClose
				})
			}
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
			if (sockets.length !== 0) throw new Error(`Expected 0 sockets, got ${sockets.length}`)
		})
		it('reconnects after socket close', async () => {
			const conn = new Connection('127.0.0.1', 5250, true, 0, getRequestForResponse, RECONNECT_TIME)
			try {
				expect(conn).toBeTruthy()

				const onConnError = vi.fn()
				const onConnConnect = vi.fn()
				const onConnDisconnect = vi.fn()
				conn.on('error', onConnError)
				conn.on('connect', onConnConnect)
				conn.on('disconnect', onConnDisconnect)

				expect(onSocketCreate).toHaveBeenCalledTimes(1)
				onSocketCreate.mockClear()

				const sockets = SocketMock.openSockets()
				expect(sockets).toHaveLength(1)
				const socket = sockets[0]

				// Wait for connection to be established:
				await new Promise<void>((resolve, reject) => {
					conn.once('connect', () => resolve())
					setTimeout(() => reject(new Error('Connection timeout in test')), 1000)
				})

				expect(conn.connected).toBeTruthy()
				expect(onConnConnect).toHaveBeenCalledTimes(1)
				onConnConnect.mockClear()
				expect(onConnDisconnect).toHaveBeenCalledTimes(0)
				onConnDisconnect.mockClear()
				expect(onSocketCreate).toHaveBeenCalledTimes(0)

				// Close socket and wait for 'disconnect' event to be emitted:
				await new Promise<void>((resolve, reject) => {
					conn.once('disconnect', () => resolve())
					setTimeout(() => reject(new Error('Disconnection timeout in test')), 1000)
					// Close socket:
					socket.mockClose()
				})

				expect(conn.connected).toBeFalsy()
				expect(onConnConnect).toHaveBeenCalledTimes(0)
				expect(onConnDisconnect).toHaveBeenCalledTimes(1)
				expect(onSocketCreate).toHaveBeenCalledTimes(0)
				onConnConnect.mockClear()
				onConnDisconnect.mockClear()
				onSocketCreate.mockClear()

				// Now, a reconnect should be attempted by the Connection:

				await waitFor(() => {
					expect(onSocketCreate).toHaveBeenCalledTimes(1)
					expect(onConnConnect).toHaveBeenCalledTimes(1)
				}, RECONNECT_TIME * 2.5)
				onSocketCreate.mockClear()
				onConnConnect.mockClear()

				expect(onConnDisconnect).toHaveBeenCalledTimes(0)
				onConnDisconnect.mockClear()

				// Last:
				expect(onConnError).toHaveBeenCalledTimes(0)
			} finally {
				// Ensure cleaned up
				conn.disconnect()
			}
		})
		it('reconnects after PING loss', async () => {
			const conn = new Connection('127.0.0.1', 5250, true, PING_INTERVAL, getRequestForResponse, RECONNECT_TIME)
			try {
				expect(conn).toBeTruthy()

				const onConnError = vi.fn()
				const onConnConnect = vi.fn()
				const onConnDisconnect = vi.fn()
				conn.on('error', onConnError)
				conn.on('connect', onConnConnect)
				conn.on('disconnect', onConnDisconnect)

				expect(onSocketCreate).toHaveBeenCalledTimes(1)
				onSocketCreate.mockClear()

				const sockets = SocketMock.openSockets()
				expect(sockets).toHaveLength(1)

				// Wait for connection to be established:
				await new Promise<void>((resolve, reject) => {
					conn.once('connect', () => resolve())
					setTimeout(() => reject(new Error('Connection timeout in test')), 1000)
				})

				// PING should have been sent by now:
				expect(getPingCount()).toBeGreaterThanOrEqual(1)
				onSocketWrite.mockClear()

				expect(conn.connected).toBeTruthy()
				expect(onConnConnect).toHaveBeenCalledTimes(1)
				onConnConnect.mockClear()
				expect(onConnDisconnect).toHaveBeenCalledTimes(0)
				onConnDisconnect.mockClear()
				expect(onSocketCreate).toHaveBeenCalledTimes(0)

				// Ensure that more PINGs are sent:
				await waitFor(() => {
					expect(getPingCount()).toBeGreaterThanOrEqual(2)
				}, PING_INTERVAL * 3)

				onSocketWrite.mockClear()

				// Now, stop replying to PINGs:
				enablePingReplies = false

				// Wait for disconnect to be emitted, which should happen after a PING is sent and not replied to:
				await new Promise<void>((resolve, reject) => {
					conn.once('disconnect', () => resolve())
					setTimeout(() => reject(new Error('Disconnection timeout in test')), 1000)
				})

				expect(getPingCount()).toBeGreaterThanOrEqual(1) // Ensure PING's has been sent

				expect(conn.connected).toBeFalsy()
				expect(onConnConnect).toHaveBeenCalledTimes(0)
				expect(onConnDisconnect).toHaveBeenCalledTimes(1)
				expect(onSocketCreate).toHaveBeenCalledTimes(0)
				onConnConnect.mockClear()
				onConnDisconnect.mockClear()
				onSocketCreate.mockClear()

				// Now, a reconnect should be attempted by the Connection:

				await waitFor(() => {
					expect(onSocketCreate).toHaveBeenCalledTimes(1)
				}, RECONNECT_TIME * 2.5)

				onSocketCreate.mockClear()

				// Allow PING replies again, so that the reconnect can succeed:
				enablePingReplies = true

				// Wait for the new connection to be established:
				await new Promise<void>((resolve, reject) => {
					conn.once('connect', () => resolve())
					setTimeout(() => reject(new Error('Connection timeout in test')), 1000)
				})

				expect(onConnConnect).toHaveBeenCalledTimes(1)
				expect(onConnDisconnect).toHaveBeenCalledTimes(0)
				onConnConnect.mockClear()
				onConnDisconnect.mockClear()

				// Last:
				expect(onConnError).toHaveBeenCalledTimes(0)
			} finally {
				// Ensure cleaned up
				conn.disconnect()
			}
		})
	})
})

/** Wait for a condition to be fulfilled, ie the callback to not throw anymore. */
async function waitFor(cb: () => void, timeout = 1000, testInterval?: number): Promise<void> {
	if (timeout <= 0) throw new Error('Timeout must be greater than 0')

	if (testInterval === undefined) testInterval = Math.max(1, Math.floor(timeout / 10))

	const startTime = Date.now()
	let lastError: any = undefined
	do {
		try {
			cb()
			return
		} catch (err) {
			lastError = err
			// Wait a bit and try again:
			await new Promise((resolve) => setTimeout(resolve, testInterval))
		}
	} while (Date.now() - startTime < timeout)

	console.error(`waitFor timed out after ${Date.now() - startTime}ms (limit: ${timeout}).`)

	if (lastError) throw lastError
	else throw new Error('waitFor timed out without throwing an error')
}
