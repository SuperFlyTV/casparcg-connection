import { CasparCG } from '../../CasparCG'
import { CasparCGSocket } from '../CasparCGSocket'

describe('CasparCG', () => {

	beforeAll(() => {
		this.intance = new CasparCG()
	})

	afterEach(() => {
		this.intance.disconnect()
	})

	describe('object instatination', () => {
		it('should instantiats correctly', () => {
			this.instance = new CasparCG()
			expect(this.instance).toEqual(jasmine.any(CasparCG))
		})

		it('should set host from string', () => {
			this.hostString = 'stringHost'
			this.instance = new CasparCG(this.hostString)
			expect(this.instance.host).toBe(this.hostString)
		})

		it('should set host from options', () => {
			this.hostString = 'stringHost'
			this.instance = new CasparCG({ host: this.hostString })
			expect(this.instance.host).toBe(this.hostString)
		})

		it('should allow valid options', () => {
			this.data = 22
			this.optionKey = 'autoReconnectAttempts'
			this.options = {}
			this.options[this.optionKey] = this.data
			this.instance = new CasparCG(this.options)
			expect(this.instance[this.optionKey]).toBe(this.data)
		})

		it('should not allow invalid options', () => {
			this.data = 22
			this.optionKey = 'invalidOption'
			this.options = {}
			this.options[this.optionKey] = this.data
			this.instance = new CasparCG(this.options)
			expect(this.instance[this.optionKey]).not.toBe(this.data)
		})

		it('should use port param over options.port if both are defined', () => {
			this.portNumber = 5678
			this.options = { port: 1234 }
			this.instance = Object.create(CasparCG.prototype)
			this.instance.constructor.apply(this.instance, [this.options, this.portNumber])
			expect(this.instance.port).toBe(this.portNumber)
		})
	})
	describe('connection logic', () => {
		it('should change options if passed to connection', () => {
			this.newAutoReconnectAttempts = 2
			this.instance = new CasparCG()
			this.oldaAutoReconnectAttempts = this.instance.autoReconnectAttempts
			this.instance.connect({ autoReconnectAttempts: this.newAutoReconnectAttempts })
			expect(this.instance.autoReconnectAttempts).toBe(this.newAutoReconnectAttempts)
		})

		it('should not create new socket if new options match the old ones', () => {
			this.optionKey = 'autoReconnectAttempts'
			this.optionValue = 4
			this.options = {}
			this.options[this.optionKey] = this.optionValue
			this.instance = new CasparCG(this.options)
			spyOn(this.instance['_socket'], 'dispose').and.callThrough()
			this.instance.connect(this.options)
			expect(this.instance['_socket'].dispose).not.toHaveBeenCalled()
			expect(this.instance[this.optionKey]).toBe(this.optionValue)
		})

		it('should create a new socket if host change', () => {
			this.host1 = 'host1'
			this.host2 = 'host2'
			this.instance = new CasparCG(this.host1)
			this.oldSocket = this.instance['_socket']
			spyOn(this.oldSocket, 'dispose').and.callThrough()
			this.instance.host = this.host2
			spyOn(this.instance['_socket'], 'dispose').and.callThrough()
			expect(this.oldSocket.dispose).toHaveBeenCalled()
			expect(this.instance['_socket']).not.toBe(this.oldSocket)
			expect(this.instance.host).toBe(this.host2)
		})

		it('should have the new socket after host-change reconnect if the old one was connected', () => {
			this.host1 = 'host1'
			this.host2 = 'host2'
			this.instance = new CasparCG(this.host1)
			spyOn(this.instance, 'connect')
			this.instance['_connected'] = true
			this.instance.host = this.host2
			expect(this.instance.connect).toHaveBeenCalled()
		})

		it('should have the new socket after host-change reconnect if the old one was reconnecting', () => {
			this.host1 = 'host1'
			this.host2 = 'host2'
			this.instance = new CasparCG(this.host1)
			spyOn(this.instance, 'connect')
			this.instance['_socket']['_startReconnection']()
			this.instance.host = this.host2
			expect(this.instance.connect).toHaveBeenCalled()
		})

		it('should create a new socket if port change', () => {
			this.port1 = 1234
			this.port2 = 5678
			this.instance = new CasparCG('host1', this.port1)
			this.oldSocket = this.instance['_socket']
			spyOn(this.oldSocket, 'dispose').and.callThrough()
			this.instance.port = this.port2
			spyOn(this.instance['_socket'], 'dispose').and.callThrough()
			expect(this.oldSocket.dispose).toHaveBeenCalled()
			expect(this.instance['_socket']).not.toBe(this.oldSocket)
			expect(this.instance.port).toBe(this.port2)
		})

		it('should have the new socket after port-change reconnect if the old one was connected', () => {
			this.port1 = 1234
			this.port2 = 5678
			this.instance = new CasparCG('', this.port1)
			spyOn(this.instance, 'connect')
			this.instance['_connected'] = true
			this.instance.port = this.port2
			expect(this.instance.connect).toHaveBeenCalled()
		})

		it('should have the new socket after port-change reconnect if the old one was reconnecting', () => {
			this.port1 = 1234
			this.port2 = 5678
			this.instance = new CasparCG({ port: this.port1, autoReconnect: false })
			spyOn(this.instance, 'connect')
			this.instance['_socket']['_startReconnection']()
			this.instance.port = this.port2
			expect(this.instance.connect).toHaveBeenCalled()
		})

		it('should delete the old socket if a new one is created and enforced to recreate', () => {
			this.instance = new CasparCG('host1')
			this.oldSocket = this.instance['_socket']
			spyOn(this.oldSocket, 'dispose').and.callThrough()
			this.instance['_createNewSocket'](null, true)
			expect(this.oldSocket.dispose).toHaveBeenCalled()
			expect(this.instance['_socket']).not.toBe(this.oldSocket)
		})

		it('should autoconnect by default', () => {
			spyOn(CasparCGSocket.prototype, 'connect')
			let cgTest = new CasparCG()
			expect(cgTest).toBeTruthy()
			expect(CasparCGSocket.prototype.connect).toHaveBeenCalled()
		})

		it('should autoconnect if told to', () => {
			spyOn(CasparCGSocket.prototype, 'connect')
			let cgTest = new CasparCG({ autoConnect: true })
			expect(cgTest).toBeTruthy()
			expect(CasparCGSocket.prototype.connect).toHaveBeenCalled()
		})

		it('should not autoconnect if not told to', () => {
			spyOn(CasparCGSocket.prototype, 'connect')
			let cgTest = new CasparCG({ autoConnect: false })
			expect(cgTest).toBeTruthy()
			expect(CasparCGSocket.prototype.connect).not.toHaveBeenCalled()
		})

		xit('should stop reconnecting if autoReconnect-option changes during reconnect attempts', () => {
			fail('test not implemented yet')
		})

		xit('should change pace if autoReconnectInterval-option changes during reconnect attempts', () => {
			fail('test not implemented yet')
		})

		xit('should [do the right thing] if autoReconnectAttempts-option changes during reconnect attempts', () => {
			fail('test not implemented yet')
		})
	})
	describe('events and logging', () => {
		xit('should log', () => {
			fail('test not implemented yet')
		})
	})
})
