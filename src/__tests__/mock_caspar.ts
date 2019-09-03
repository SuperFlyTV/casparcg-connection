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
	[ command: string ]: (req: string[] | null) => string
}

let responses218: Responses = {
	KILL: () => '202 KILL OK',
	PING: () => 'PONG'
}
