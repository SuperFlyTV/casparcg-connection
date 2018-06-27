import { CasparCG } from '../CasparCG'
import { Enum } from '../lib/ServerStateEnum'

let instance: CasparCG = undefined
beforeAll(() => {
	return new Promise(function (resolve) {
		resolve()
		instance = new CasparCG({
			host: '10.0.1.111', onConnected: () => {
				resolve()
			}
		})
	})

})

describe('nothing', () => {
	it('should do nothing', (dn) => {
		let enums = Enum
		enums = enums
		dn()
	})
})

afterAll(() => {
	instance.disconnect()
})
// describe('AMCPProtocol_v2_1', () => {
// 	describe('basic signature', () => {

// 		it('version', () => {
// 			instance.version().catch((e) => {
// 				throw new Error(e)
// 			})
// 		})

// 		it('helpConsumer', () => {
// 			instance.helpConsumer(Enum.Consumer.SCREEN).catch((e) => {
// 				throw new Error(e)
// 			})
// 		})
// 	})
// })
