import { CasparCG } from '../index'

let conn = new CasparCG({ debug: true })

async function run() {
	let command = await conn.ping({ token: 'random42' })
	console.log('-->', command)
	let result = await command.result
	console.log('-->', result)
}

run().catch(console.error)
