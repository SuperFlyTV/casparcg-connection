import { EventEmitter } from 'eventemitter3'
import { Socket } from 'net'
import { Response } from './api'
import { AMCPCommand, Commands } from './commands'
import { deserializers } from './deserializers'
import { Version } from './enums'
import { serializers, serializersV21 } from './serializers'

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
	private _connected = false
	private _version = Version.v23x

	constructor(
		private host: string,
		private port = 5250,
		autoConnect: boolean,
		private _getRequestForResponse: (response: Response<any>) => SentRequest | undefined
	) {
		super()
		if (autoConnect) this._setupSocket()
	}

	get connected(): boolean {
		return this._connected
	}

	set version(version: Version) {
		this._version = version
	}

	changeConnection(host: string, port = 5250): void {
		this.host = host
		this.port = port

		this._socket?.end()

		this._setupSocket()
	}

	disconnect(): void {
		this._socket?.end()
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
			const result = RESPONSE_REGEX.exec(this._unprocessedLines[0])

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

	private _triggerReconnect() {
		if (!this._reconnectTimeout) {
			this._reconnectTimeout = setTimeout(() => {
				this._reconnectTimeout = undefined

				if (!this._connected) this._setupSocket()
			}, 5000)
		}
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

		this._socket.on('data', (data) => {
			try {
				this._processIncomingData(data)
			} catch (e: any) {
				this.emit('error', e)
			}
		})
		this._socket.on('connect', () => {
			this._setConnected(true)

			// Any data which hasn't been parsed yet is now incomplete, and can be discarded
			this._discardUnprocessed()
		})
		this._socket.on('close', () => {
			this._discardUnprocessed()

			this._setConnected(false)
			this._triggerReconnect()
		})
		this._socket.on('error', (e) => {
			this._discardUnprocessed()

			if (`${e}`.match(/ECONNREFUSED/)) {
				// Unable to connect, no need to handle this error
				this._setConnected(false)
			} else {
				this.emit('error', e)
			}
		})

		this._socket.connect(this.port, this.host)
	}

	private _discardUnprocessed() {
		this._unprocessedData = ''
		this._unprocessedLines = []
	}

	private _setConnected(connected: boolean) {
		if (connected) {
			if (!this._connected) {
				this._connected = true
				this.emit('connect')
			}
		} else {
			if (this._connected) {
				this._connected = false
				this.emit('disconnect')
			}
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
}
