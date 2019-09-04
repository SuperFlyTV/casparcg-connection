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
			// console.log(result)
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
		let responseFn = responses218[command[0]]
		let response: string | null = null
		if (typeof responseFn === 'function') {
			response = responseFn(command)
		} else {
			if (responseFn.none && command.length === 1) {
				response = (responseFn.none as (req: string[]) => string | null)(command)
			}	else if (responseFn.number && command.length >= 2) {
				response = (responseFn.number as (req: string[]) => string | null)(command)
			} else if (responseFn.layer && command.length >= 3) {
				response = ((responseFn.layer as Responses)[command[2]] as (req: string[]) => string | null)(command)
			} else if (command.length >= 2 && responseFn[command[1]]) {
				response = (responseFn[command[1]] as (req: string[]) => string | null)(command)
			}
			if (response == null && responseFn.string && command.length >= 2) {
				response = (responseFn.string as (req: string[]) => string | null)(command)
			}
		}
		if (response) return token ? `REQ ${token} ${response}` : response
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
		layer: {
			ADD: () => 'CG ADD',
			PLAY: () => 'CG PLAY',
			STOP: () => 'CG STOP',
			NEXT: () => 'CG NEXT',
			REMOVE: () => 'CG REMOVE',
			CLEAR: () => 'CG CLEAR',
			UPDATE: () => 'CG UPDATE',
			INVOKE: () => 'CG INVOKE',
			INFO: () => 'CG INFO'
		}
	},
	MIXER: {
		layer: {
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
		}
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
	VERSION: () => '201 VERSION OK\r\n2.1.8.12205 62ea2b24d NRK',
	INFO: {
		none: () => 'INFO',
		number: () => 'INFO channel',
		TEMPLATE: () => 'INFO TEMPLATE',
		CONFIG: () => 'INFO CONFIG',
		PATHS: () => 'INFO PATHS',
		SYSTEM: () => 'INFO SYSTEM',
		SERVER: () => 'INFO SERVER',
		THREADS: () => 'INFO THREADS',
		DELAY: () => 'INFO DELAY'
	},
	DIAG: () => '202 DIAG OK',
	// BYE: () => 'BYE',
	KILL: () => '202 KILL OK',
	RESTART: () => '202 RESTART OK',
	PING: () => 'PONG',
	HELP: {
		none: () => 'HELP', // commands
		string: () => 'HELP command',
		PRODUCER: () => 'HELP PRODUCER',
		CONSUMER: () => 'HELP CONSUMER'
	},
	TIME: () => 'TIME',
	SCHEDULE: {
		SET: () => 'SCHEDULE_SET',
		LIST: () => 'SCHEDULE_LIST',
		CLEAR: () => 'SCHEDULE_CLEAR',
		REMOVE: () => 'SCHEDULE_REMOVE',
		INFO: () => 'SCHEDULE_INFO'
	},
	TIMECODE: {
		layer: {
			SOURCE: () => 'TIMECODE_SOURCE'
		}
	}
}

let responses207: Responses = Object.assign({}, responses218, {
	VERSION: () => '201 VERSION OK\r\n2.0.7.e9fc25a Stable',
	ROUTE: () => 'ROUTE',
	GL_INFO: () => 'GL INFO',
	GL_GC: () => 'GL GC'
})

responses207.LOG = Object.assign({}, responses218.LOG)
delete (responses207.LOG as Responses).CATEGORY
let mixerLayer = Object.assign({}, (responses218.MIXER as Responses).layer)
delete (mixerLayer as Responses).INVERT
responses207.MIXER = Object.assign({}, { layer: mixerLayer })
delete responses207.FLS
delete responses207.HELP
delete responses207.TIME
delete responses207.PING
delete responses207.SCHEDULE
delete responses207.TIMECODE

let info = Object.assign({}, responses218.INFO as Responses)
info.QUEUES = () => 'INFO QUEUES'
responses207.INFO = info

let responses220: Responses = Object.assign({}, responses218, {
	VERSION: () => '201 VERSION OK\r\n2.2.0 66a9e3e2 Stable'
})

responses220.LOG = Object.assign({}, responses218.LOG)
delete (responses220.LOG as Responses).CATEGORY
let cgLayer = Object.assign({}, (responses218.CG as Responses).layer)
delete (cgLayer as Responses).INFO
responses220.CG = Object.assign({}, { layer: cgLayer })
delete ((responses220.CG as Responses).layer as Responses).INFO
mixerLayer = Object.assign({}, (responses218.MIXER as Responses).layer)
delete (mixerLayer as Responses).INVERT
delete (mixerLayer as Responses).STRAIGHT_ALPHA_OUTPUT
responses220.MIXER = Object.assign({}, { layer: mixerLayer })
responses220.INFO = {
	none: (responses218.INFO as Responses).none,
	number: (responses218.INFO as Responses).number
}
delete responses220.HELP
delete responses220.TIME
delete responses220.SCHEDULE
delete responses220.TIMECODE

console.log(responses207)
