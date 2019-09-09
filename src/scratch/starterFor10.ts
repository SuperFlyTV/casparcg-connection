import { CasparCG } from '../index'

let conn = new CasparCG({ debug: true })

async function run() {
	let command = conn.ping()
	console.log('-->', command)
	console.log('-->', await command)
	console.log('-->', await (await command).result)
}

run().catch(console.error)
