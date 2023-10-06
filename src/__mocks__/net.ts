import { EventEmitter } from 'events'
const sockets: Array<Socket> = []
const onNextSocket: Array<(socket: Socket) => void> = []

const orgSetImmediate = setImmediate

export class Socket extends EventEmitter {
	public onWrite?: (buff: Buffer, encoding: string) => void
	public onConnect?: (port: number, host: string) => void
	public onClose?: () => void

	// private _port: number
	// private _host: string
	private _connected = false

	public destroyed = false

	constructor() {
		super()

		const cb = onNextSocket.shift()
		if (cb) {
			cb(this)
		}

		sockets.push(this)
	}

	public static mockSockets(): Socket[] {
		return sockets
	}
	public static openSockets(): Socket[] {
		return sockets.filter((s) => !s.destroyed)
	}
	public static mockOnNextSocket(cb: (s: Socket) => void): void {
		onNextSocket.push(cb)
	}
	public static clearMockOnNextSocket(): void {
		onNextSocket.splice(0, 99999)
	}
	// this.emit('connect')
	// this.emit('close')
	// this.emit('end')

	public connect(port: number, host = 'localhost', cb?: () => void): void {
		// this._port = port
		// this._host = host

		if (this.onConnect) this.onConnect(port, host)
		orgSetImmediate(() => {
			if (cb) {
				cb()
			}
			this.setConnected()
		})
	}
	public write(buf: Buffer, cb?: () => void): void
	public write(buf: Buffer, encoding?: BufferEncoding, cb?: () => void): void
	public write(buf: Buffer, encodingOrCb?: BufferEncoding | (() => void), cb?: () => void): void {
		const DEFAULT_ENCODING = 'utf-8'
		cb = typeof encodingOrCb === 'function' ? encodingOrCb : cb
		const encoding = typeof encodingOrCb === 'function' ? DEFAULT_ENCODING : encodingOrCb
		if (this.onWrite) {
			this.onWrite(buf, encoding ?? DEFAULT_ENCODING)
		}
		if (cb) cb()
	}
	public end(): void {
		this.setEnd()
		this.setClosed()
	}

	public mockClose(): void {
		this.setClosed()
	}
	public mockData(data: Buffer): void {
		this.emit('data', data)
	}

	public setNoDelay(_noDelay?: boolean): void {
		// noop
	}

	public setEncoding(_encoding?: BufferEncoding): void {
		// noop
	}

	public destroy(): void {
		this.destroyed = true
	}

	private setConnected() {
		if (this._connected !== true) {
			this._connected = true
		}
		this.emit('connect')
	}
	private setClosed() {
		if (this._connected !== false) {
			this._connected = false
		}
		this.destroyed = true
		this.emit('close')
		if (this.onClose) this.onClose()
	}
	private setEnd() {
		if (this._connected !== false) {
			this._connected = false
		}
		this.emit('end')
	}
}
