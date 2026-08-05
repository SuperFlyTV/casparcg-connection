import { EventEmitter } from 'node:events'
import { Socket } from 'net'
import { Response } from './api.js'
import { AMCPCommand, Commands } from './commands.js'
import { deserializers } from './deserializers/index.js'
import { Version } from './enums.js'
import { serializers, serializersV21 } from './serializers.js'

const RESPONSE_REGEX = /(RES (?<ReqId>.+) )?(?<ResponseCode>\d{3}) ((?<Action>.+) )?(OK|ERROR|FAILED)/i

export enum ResponseTypes {
	Info = 'INFO',
	OK = 'OK',
	ClientError = 'ERROR',
	ServerError = 'FAILED',
}

const RESPONSES = {
	100: {
		type: ResponseTypes.Info,
		message: 'Information about an event.',
	},
	101: {
		type: ResponseTypes.Info,
		message: 'Information about an event. A line of data is being returned.',
	},
	200: {
		type: ResponseTypes.OK,
		message: 'The command has been executed and several lines of data are being returned',
	},
	201: {
		type: ResponseTypes.OK,
		message: 'The command has been executed and data is being returned.',
	},
	202: {
		type: ResponseTypes.OK,
		message: 'The command has been executed.',
	},
	400: {
		type: ResponseTypes.ClientError,
		message: 'Command not understood and data is being returned.',
	},
	401: {
		type: ResponseTypes.ClientError,
		message: 'Illegal video_channel',
	},
	402: {
		type: ResponseTypes.ClientError,
		message: 'Parameter missing',
	},
	403: {
		type: ResponseTypes.ClientError,
		message: 'Illegal parameter',
	},
	404: {
		type: ResponseTypes.ClientError,
		message: 'Media file not found',
	},
	500: {
		type: ResponseTypes.ServerError,
		message: 'Internal server error',
	},
	501: {
		type: ResponseTypes.ServerError,
		message: 'Internal server error',
	},
	502: {
		type: ResponseTypes.ServerError,
		message: 'Media file unreadable',
	},
	503: {
		type: ResponseTypes.ServerError,
		message: 'Access error',
	},
}

export type ConnectionEvents = {
	data: [response: Response<any>, error: Error | undefined]
	connect: []
	disconnect: []
	error: [error: Error]
}
export interface SentRequest {
	command: AMCPCommand
}

export class Connection extends EventEmitter<ConnectionEvents> {
	private _socket?: Socket
	private _unprocessedData = ''
	private _unprocessedLines: string[] = []
	private _reconnectTimeout?: NodeJS.Timeout
	private _socketConnected = false
	private _emittedConnected = false
	private _version = Version.v23x

	private _pingTimeout?: NodeJS.Timeout
	/**
	 * Timestamp when last PING (in reply to PING) was received.
	 * Is set to -1 before first PING is sent
	 */
	private _lastPongReceivedTime: number = -1

	/** Whether the Connection should be reconnecting or not */
	private _shouldBeConnected = false

	constructor(
		private host: string,
		private port = 5250,
		/** Set to true to initialize connection. (If set to false, changeConnection() must be called to connect later.) */
		autoConnect: boolean,
		/** Set to 0 to disable */
		private pingInterval: number,
		private _getRequestForResponse: (response: Response<any>) => SentRequest | undefined,
		/** Time until a reconnection is attempted[ms] */
		private reconnectTime = 5000
	) {
		super()
		if (autoConnect) this.changeConnection(host, port)
	}

	get connected(): boolean {
		if (!this._socketConnected) return false
		if (
			// Pinging is enabled:
			this.pingInterval > 0
		) {
			// If we haven't sent first PING yet, we consider the connection to be disconnected,
			// otherwise connection status will flicker on -> off -> on upon startup:
			if (this._lastPongReceivedTime === -1) return false

			// Ping connectivity is NOT established,
			// ie a PONG has not been received within 2x the ping interval, which is a reasonable time to expect a reply:

			if (Date.now() - this._lastPongReceivedTime > this.pingInterval * 2) return false
		}
		return true
	}

	set version(version: Version) {
		this._version = version
	}

	changeConnection(host: string, port = 5250): void {
		this.host = host
		this.port = port

		this._socket?.end()

		this._shouldBeConnected = true
		this._setupSocket()
	}

	disconnect(): void {
		this._shouldBeConnected = false

		this._socket?.end()
		clearInterval(this._pingTimeout)
		this._pingTimeout = undefined
	}

	async sendCommand(cmd: AMCPCommand, reqId?: string): Promise<Error | undefined> {
		if (!cmd.command) throw new Error('No command specified')
		if (!cmd.params) throw new Error('No parameters specified')

		const payload = this._serializeCommand(cmd, reqId)

		return new Promise<Error | undefined>((r) => {
			this._socket?.write(payload + '\r\n', (e) => (e ? r(e) : r(undefined)))
		})
	}

	private _processIncomingData(data: Buffer) {
		/**
		 * This is a simple strategy to handle receiving newline separated data, factoring in arbitrary TCP fragmentation.
		 * It is common for a long response to be split across multiple packets, most likely with the split happening in the middle of a line.
		 */
		this._unprocessedData += data.toString('utf-8')
		const newLines = this._unprocessedData.split('\r\n')
		// Pop and preserve the last fragment as unprocessed. In most cases this will be an empty string, but it could be the first portion of a line
		this._unprocessedData = newLines.pop() ?? ''
		this._unprocessedLines.push(...newLines)

		while (this._unprocessedLines.length > 0) {
			const line = this._unprocessedLines[0]

			// Special case: "PONG" reply:
			if (line === 'PONG') {
				// Note: "PONG" doesn't follow the usual response format,
				// and is sent by CasparCG in response to a PING command.

				this._lastPongReceivedTime = Date.now()
				this._handleChangedConnectionStatus()
				// remove processed lines
				this._unprocessedLines.splice(0, 1)
				continue
			}
			const result = RESPONSE_REGEX.exec(line)

			if (result?.groups?.['ResponseCode']) {
				let processedLines = 1

				// create a response object
				const responseCode = parseInt(result?.groups?.['ResponseCode'])
				const response: Response<unknown> = {
					reqId: result?.groups?.['ReqId'],
					command: result?.groups?.['Action'] as Commands,
					responseCode,
					data: undefined,
					...RESPONSES[responseCode as keyof typeof RESPONSES],
				}

				let responseData: string[] | undefined = undefined
				// parse additional lines if needed
				if (response.responseCode === 200) {
					const indexOfTerminationLine = this._unprocessedLines.indexOf('')
					if (indexOfTerminationLine === -1) break // No termination yet, try again later

					// multiple lines of data
					responseData = this._unprocessedLines.slice(1, indexOfTerminationLine)
					processedLines += responseData.length + 1 // data lines + 1 empty line
				} else if (response.responseCode === 201 || response.responseCode === 400) {
					if (this._unprocessedLines.length < 2) break // No data line, try again later

					responseData = [this._unprocessedLines[1]]
					processedLines++
				}

				// Assign the preliminary data, to be possibly deserialized later:
				response.data = responseData

				// remove processed lines
				this._unprocessedLines.splice(0, processedLines)

				// Deserialize the response
				this._deserializeAndEmitResponse(response, responseData)
			} else {
				// well this is not happy, do we do something?
				// perhaps this is the infamous 100 or 101 response code, although that doesn't appear in casparcg source code
				this._unprocessedLines.splice(0, 1)
			}
		}
	}

	private _deserializeAndEmitResponse(response: Response<unknown>, responseData: string[] | undefined) {
		Promise.resolve()
			.then(async () => {
				// Ask what the request was for this response:
				const previouslySentRequest = this._getRequestForResponse(response)
				if (previouslySentRequest) {
					const deserializers = this._getVersionedDeserializers()
					const deserializer = deserializers[previouslySentRequest.command.command] as
						| ((input: string[]) => Promise<any>)
						| undefined
					// attempt to deserialize the response if we can
					if (deserializer && responseData?.length) {
						response.data = await deserializer(responseData)
					}
				}

				// now do something with response
				this.emit('data', response, undefined)
			})
			.catch((e) => {
				this.emit('data', response, e)
			})
	}

	private _setupSocket() {
		if (this._socket) {
			this._socket.removeAllListeners()
			if (!this._socket.destroyed) {
				this._socket.destroy()
			}
		}

		this._socket = new Socket()
		this._socket.setEncoding('utf-8')
		this._socket.setKeepAlive(true)

		this._socket.on('data', (data) => {
			try {
				this._processIncomingData(data)
			} catch (e: any) {
				this.emit('error', e)
			}
		})
		this._socket.on('connect', () => {
			this._socketConnected = true
			this._handleChangedConnectionStatus()

			// Any data which hasn't been parsed yet is now incomplete, and can be discarded
			this._discardUnprocessed()

			this.setupPing()
		})
		this._socket.on('close', () => {
			this._discardUnprocessed()

			this._socketConnected = false
			this._handleChangedConnectionStatus()
		})
		this._socket.on('error', (e) => {
			this._discardUnprocessed()

			const errorString =
				// Simple Error:
				`${e}` +
					// Error object with code property (such as AggregateError):
					(e instanceof Error && (e as any).code) || ''

			if (errorString.match(/ECONNREFUSED/) || errorString.match(/ECONNRESET/)) {
				// Unable to connect, handle this as a disconnect event:
				this._socketConnected = false
				this._handleChangedConnectionStatus()
				return
			}

			this.emit('error', e)
		})

		this._socket.connect(this.port, this.host)
	}

	private _discardUnprocessed() {
		this._unprocessedData = ''
		this._unprocessedLines = []
	}

	private _handleChangedConnectionStatus() {
		const actuallyConnected = this.connected

		// If the status has changed, emit the appropriate event:
		if (actuallyConnected !== this._emittedConnected) {
			this._emittedConnected = actuallyConnected
			if (actuallyConnected) this.emit('connect')
			else this.emit('disconnect')
		}

		// Handle reconnection logic:
		if (actuallyConnected) {
			// Is connected, so cancel any pending reconnections:
			if (this._reconnectTimeout) {
				clearTimeout(this._reconnectTimeout)
				this._reconnectTimeout = undefined
			}
		} else if (this._shouldBeConnected && !this._reconnectTimeout) {
			// Is disconnected, so schedule a reconnect if not already scheduled
			this._reconnectTimeout = setTimeout(() => {
				this._reconnectTimeout = undefined
				if (!this._shouldBeConnected) return

				// Check if we're already connected, in which case we don't need to reconnect:
				if (!this.connected) this._setupSocket()
			}, this.reconnectTime)
		}
	}

	private _serializeCommand(cmd: AMCPCommand, reqId?: string): string {
		const serializers = this._getVersionedSerializers()

		// use a cheeky type assertion here to easen up a bit, TS doesn't let us use just cmd.command
		const serializer = serializers[cmd.command] as ((
			c: AMCPCommand['command'],
			p: AMCPCommand['params']
		) => string)[]
		let payload = serializer
			.map((fn) => fn(cmd.command, cmd.params).trim())
			.filter((p) => p !== '')
			.join(' ')

		if (reqId) payload = 'REQ ' + reqId + ' ' + payload

		return payload
	}

	private _getVersionedSerializers() {
		if (this._version <= Version.v21x) {
			return serializersV21
		}

		return serializers
	}

	private _getVersionedDeserializers(): {
		[key: string]: (input: string[]) => Promise<any>
	} {
		return deserializers
	}
	private setupPing() {
		if (this._pingTimeout !== undefined) {
			clearInterval(this._pingTimeout)
			this._pingTimeout = undefined
		}

		if (this.pingInterval > 0) {
			const sendPing = () => {
				if (!this._socketConnected) {
					// Socket not connected, setupPing() will be called when the socket connects, so we can just return here.
					this._lastPongReceivedTime = -1 // reset
					return
				}
				// Trigger _maybeEmitConnectionEvent() to update connection status based on last pong received time:
				this._handleChangedConnectionStatus()

				if (this._lastPongReceivedTime === -1) this._lastPongReceivedTime = 0 // Signal that first ping has been sent

				// Send PING command:
				// Note: We're bypassing the normal sendCommand function here,
				// because in CasparCG the PING command is parsed and handled before the normal command queue,
				// therefore it doesn't support the usual REQ/RES-wrapping.
				this._socket?.write('PING' + '\r\n', (e) => {
					if (e) this.emit('error', e)
				})
			}

			this._pingTimeout = setInterval(sendPing, this.pingInterval)
			sendPing()
		}
	}
}
