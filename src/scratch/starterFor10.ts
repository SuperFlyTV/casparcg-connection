import { CasparCG } from '../index'

let conn = new CasparCG({ debug: true })
debugger
conn.ping().then(console.log, console.error)
