import * as net from 'net'

const server = net.createServer((c) => {
	console.log('client connected')
	c.on('end', () => {
		console.log('client disconnected')
	})
})
server.on('error', (err) => {
	throw err
})
server.listen(5250, () => {
	console.log('server bound')
})
server.on('listening', () => {
	console.log('Mock CasparCG server AMCP protocol running on port 5250')
})

server.on('connection', sock => {
	sock.write('Its hell from him')
	let chunk = ''
	sock.on('data', input => {
		chunk += input.toString()
		let eol = chunk.indexOf('\r\n')

		while (eol > -1) {
			let command = chunk.substring(0, eol)
			let result = processCommand(command.match(/"[^"]+"|""|\S+/g) )
			if (result === '***BYE***') {
				sock.destroy()
				break
			}
			sock.write(result.toString() + '\r\n')
			console.log(result)
			if (result === '202 KILL OK') {
				sock.destroy()
				break
			}
			chunk = chunk.substring(eol + 2)
			eol = chunk.indexOf('\r\n')
		}
	})
})

function processCommand(command: string[] | null, token = ''): string {
	if (!command) {
		return '400 ERROR'
	}
	if (command[0] === 'REQ') {
		return processCommand(command.slice(2), command[1])
	}
	if (command[0] === 'BYE') {
		return '***BYE***'
	}
	if (responses218[command[0]]) {
		return token ? `REQ ${token} ${responses218[command[0]](command)}` : responses218[command[0]](command)
	}
	return token ? `REQ ${token} 400 ERROR` : '400 ERROR'
}

interface Responses {
	[ command: string ]: ((req: string[] | null) => string) | Responses
}

let responses218: Responses = {
	LOADBG: () => '202 LOADBG OK',
	LOAD: () => '202 LOAD OK',
	PLAY: () => '202 PLAY OK',
	PAUSE: () => '202 PAUSE OK',
	RESUME: () => '202 RESUME OK',
	STOP: () => '202 STOP OK',
	CLEAR: () => '202 CLEAR OK',
	CALL: () => 'CALL', // TODO
	SWAP: () => 'SWAP', // TODO
	ADD: () => '202 ADD OK',
	REMOVE: () => '202 REMOVE OK',
	PRINT: () => '202 PRINT OK',
	LOG: {
		LEVEL: (c) => (c && c.length === 3 &&
			c[2].toLowerCase() in ['trace','debug','info','warning','error','fatal']) ? '202 LOG OK' : '400 ERROR',
		CATEGORY: (c) => (c && (c.length === 4)) ? '202 LOG OK' : '400 ERROR' // TODO
	},
	SET: () => 'SET',
	LOCK: () => 'LOCK',
	DATA: {
		STORE: () => 'DATA STORE',
		RETRIEVE: () => 'DATA RETRIEVE',
		LIST: () => 'DATA LIST',
		REMOVE: () => 'DATA REMOVE'
	},
	CG: {
		ADD: () => 'CG ADD',
		PLAY: () => 'CG PLAY',
		STOP: () => 'CG STOP',
		NEXT: () => 'CG NEXT',
		REMOVE: () => 'CG REMOVE',
		CLEAR: () => 'CG CLEAR',
		UPDATE: () => 'CG UPDATE',
		INVOKE: () => 'CG INVOKE',
		INFO: () => 'CG INFO'
	},
	MIXER: {
		KEYER: () => 'MIXER KEYER',
		CHROMA: () => 'MIXER CHROMA',
		BLEND: () => 'MIXER BLEND',
		INVERT: () => 'MIXER_INVERT',
		OPACITY: () => 'MIXER OPACITY',
		BRIGHTNESS: () => 'MIXER BRIGHTNESS',
		SATURATION: () => 'MIXER SATURATION',
		CONTRAST: () => 'MIXER CONTRAST',
		LEVELS: () => 'MIXER LEVELS',
		FILL: () => 'MIXER FILL',
		CLIP: () => 'MIXER CLIP',
		ANCHOR: () => 'MIXER ANCHOR',
		CROP: () => 'MIXER CROP',
		ROTATION: () => 'MIXER ROTATION',
		PERSPECTIVE: () => 'MIXER PERSPECTIVE',
		MIPMAP: () => 'MIXER MIPMAP',
		VOLUME: () => 'MIXER VOLUME',
		MASTERVOLUME: () => 'MIXER MASTERVOLUME',
		STRAIGHT_ALPHA_OUTPUT: () => 'MIXER STRAIGHT_ALPHA_OUTPUT',
		GRID: () => 'MIXER GRID',
		COMMIT: () => 'MIXER COMMIT',
		CLEAR: () => 'MIXER CLEAR'
	},
	CHANNEL_GRID: () => '202 CHANNEL_GRID OK',
	THUMBNAIL: {
		LIST: () => 'THUMBNAIL LIST',
		RETRIEVE: () => 'THUMBNAIL RETRIEVE',
		GENERATE: () => 'THUMBNAIL GENERATE',
		GENERATE_ALL: () => 'THUMBNAIL GENERATE_ALL'
	},
	CINF: () => 'CINF',
	CLS: () => 'CLS',
	FLS: () => 'FLS',
	TLS: () => 'TLS',
	VERSION: () => 'VERSION',
	INFO: () => 'INFO',
	INFO_TEMPLATE: () => 'INFO TEMPLATE',
	INFO_CONFIG: () => 'INFO CONFIG',
	INFO_PATHS: () => 'INFO PATHS',
	INFO_SYSTEM: () => 'INFO SYSTEM',
	INFO_SERVER: () => 'INFO SERVER',
	INFO_QUEUES: () => 'INFO QUEUES',
	INFO_THREADS: () => 'INFO THREADS',
	INFO_DELAY: () => 'INFO DELAY',
	DIAG: () => '202 DIAG OK',
	GL_INFO: () => 'GL INFO',
	GL_GC: () => 'GL GC',
	// BYE: () => 'BYE',
	KILL: () => '202 KILL OK',
	RESTART: () => '202 RESTART OK',
	PING: () => 'PONG',
	HELP: () => 'HELP',
	HELP_PRODUCER: () => 'HELP PRODUCER',
	HELP_CONSUMER: () => 'HELP CONSUMER',
	TIME: () => 'TIME',
	SCHEDULE_SET: () => 'SCHEDULE_SET',
	SCHEDULE_LIST: () => 'SCHEDULE_LIST',
	SCHEDULE_CLEAR: () => 'SCHEDULE_CLEAR',
	SCHEDULE_REMOVE: () => 'SCHEDULE_REMOVE',
	SCHEDULE_INFO: () => 'SCHEDULE_INFO',
	TIMECODE_SOURCE: () => 'TIMECODE_SOURCE'
	// TODO Command list?
}
