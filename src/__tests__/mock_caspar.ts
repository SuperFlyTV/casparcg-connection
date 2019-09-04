import * as net from 'net'
import { Responses, responses207, responses218, responses220 } from './commands'

const server = net.createServer((c) => {
	console.log('client connected')
	c.on('end', () => {
		console.log('client disconnected')
	})
})
server.on('error', (err) => {
	throw err
})

export async function start (): Promise<string> {
	return new Promise((resolve, reject) => {
		let resolved = false
		server.once('error', e => {
			if (!resolved) reject(e)
		})
		server.listen(5250, () => {
			resolved = true
			resolve('Mock CasparCG server AMCP protocol running on port 5250')
		})
	})
}

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
			// console.log(command)
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

export async function stop (): Promise<string> {
	return new Promise((resolve, reject) => {
		let resolved = false
		server.once('error', err => {
			if (!resolved) reject(err)
		})
		server.close(e => {
			if (e) return reject(e)
			resolved = true
			resolve('Mock CasparCG server closed')
		})
	})
}

let ccgResponses = responses218

function processCommand(command: string[] | null, token = ''): string {
	if (!command) {
		return '400 ERROR'
	}
	if (command[0] === 'REQ') {
		return processCommand(command.slice(2), command[1])
	}
	if (command[0] === 'SWITCH') {
		if (command[1] === '207') {
			ccgResponses = responses207
		 	return '202 SWITCH 207 OK'
		}
		if (command[1] === '218') {
			ccgResponses = responses218
			return '202 SWITCH 218 OK'
		}
		if (command[1] === '220') {
			ccgResponses = responses220
			return '202 SWITCH 220 OK'
		}
		return '400 SWITCH ERROR'
	}
	if (command[0] === 'BYE') {
		return '***BYE***'
	}
	if (ccgResponses[command[0]]) {
		let responseFn = ccgResponses[command[0]]
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
			if (response === null && responseFn.string && command.length >= 2) {
				response = (responseFn.string as (req: string[]) => string | null)(command)
			}
		}
		if (response) return token ? `REQ ${token} ${response}` : response
	}
	return token ? `REQ ${token} 400 ERROR` : '400 ERROR'
}
