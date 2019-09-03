import { CasparCG } from '../index'

let conn = new CasparCG({ debug: true })
conn.cls().then(console.log, console.error)
