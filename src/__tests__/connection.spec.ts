import { Version } from '../enums'
import { Connection } from '../connection'
import { serializersV21, serializers } from '../serializers'
import { deserializers } from '../deserializers'
import { Socket as OrgSocket } from 'net'
import { Socket as MockSocket } from '../__mocks__/net'
import { Commands } from '../commands'

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
				await new Promise(process.nextTick.bind(process))

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
				await new Promise(process.nextTick.bind(process))

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
	})
})
