import { CasparCG } from '../CasparCG'
import { Enum } from '../lib/ServerStateEnum'

let instance: CasparCG = undefined
beforeAll(() => {
	return new Promise(function (resolve, reject) {
		instance = new CasparCG({
			host: '52.208.248.56', onConnected: () => {
				resolve()
			}
		})
	})

})

afterAll(() => {
	instance.disconnect()
})
describe('AMCPProtocol_v2_1', () => {
	describe('basic signature', () => {

		it('version', () => {
			instance.version()
		})

		it('helpConsumer', () => {
			instance.helpConsumer(Enum.Consumer.SCREEN)
		})
	})
})
