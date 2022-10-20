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
	data: [response: Response]
	connect: []
	disconnect: []
	error: [error: Error]
}

export class Connection extends EventEmitter<ConnectionEvents> {
	private _socket?: Socket
	private _unprocessedLines: string[] = []
	private _reconnectTimeout?: NodeJS.Timeout
	private _connected = false
	private _version = Version.v23x

	constructor(private host: string, private port = 5250, autoConnect: boolean) {
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

	async sendCommand(cmd: AMCPCommand, reqId?: string): Promise<boolean> {
		if (!cmd.command) throw new Error('No command specified')
		if (!cmd.params) throw new Error('No parameters specified')
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

		return new Promise<boolean>((r) => {
			this._socket?.write(payload + '\r\n', (e) => (e ? r(false) : r(true)))
		})
	}

	private async _processIncomingData(data: Buffer) {
		const string = data.toString('utf-8')
		const newLines = string.split('\r\n')

		this._unprocessedLines.push(...newLines)

		while (this._unprocessedLines.length > 0) {
			const result = RESPONSE_REGEX.exec(this._unprocessedLines[0])
			let processedLines = 0

			if (result && result.groups?.['ResponseCode']) {
				// create a response object
				const responseCode = parseInt(result?.groups?.['ResponseCode'])
				const response = {
					reqId: result?.groups?.['ReqId'],
					command: result?.groups?.['Action'] as Commands,
					responseCode,
					data: [] as any[],
					...RESPONSES[responseCode as keyof typeof RESPONSES],
				}
				processedLines++

				// parse additional lines if needed
				if (response.responseCode === 200) {
					// multiple lines of data
					response.data = this._unprocessedLines.slice(1, this._unprocessedLines.indexOf(''))
					processedLines += response.data.length + 1 // data lines + 1 empty line
				} else if (response.responseCode === 201 || response.responseCode === 400) {
					response.data = [this._unprocessedLines[1]]
					processedLines++
				}

				const deserializers = this._getVersionedDeserializers()
				// attempt to deserialize the response if we can
				if (deserializers[response.command] && response.data.length) {
					response.data = await deserializers[response.command](response.data)
				}

				// now do something with response
				this.emit('data', response)
			} else {
				// well this is not happy, do we do something?
				// perhaps this is the infamous 100 or 101 response code, although that doesn't appear in casparcg source code
				processedLines++
			}

			// remove processed lines
			this._unprocessedLines.splice(0, processedLines)
		}
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
			this._processIncomingData(data).catch((e) => this.emit('error', e))
		})
		this._socket.on('connect', () => {
			this._setConnected(true)
		})
		this._socket.on('close', () => {
			this._setConnected(false)
			this._triggerReconnect()
		})
		this._socket.on('error', (e) => {
			if (`${e}`.match(/ECONNREFUSED/)) {
				// Unable to connect, no need to handle this error
				this._setConnected(false)
			} else {
				this.emit('error', e)
			}
		})

		this._socket.connect(this.port, this.host)
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

	private _getVersionedSerializers() {
		if (this._version <= Version.v21x) {
			return serializersV21
		}

		return serializers
	}

	private _getVersionedDeserializers() {
		return deserializers
	}
}
