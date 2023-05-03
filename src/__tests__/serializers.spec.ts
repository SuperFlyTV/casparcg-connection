import { serializers, serializersV21 } from '../serializers'
import { CgAddCommand, Commands, LoadbgDecklinkCommand, PlayCommand, PlayHtmlCommand } from '../commands'
import { TransitionType } from '../enums'

describe('serializers', () => {
	it('should have serializers for every command', () => {
		for (const c of Object.values(Commands)) {
			expect(serializers[c]).toBeDefined()
		}
	})

	it('should have command for every serializers', () => {
		for (const c of Object.keys(serializers)) {
			expect(Object.values(Commands).includes(c as Commands)).toBeTruthy()
		}
	})

	it('should serialize a play command', () => {
		const command: PlayCommand = {
			command: Commands.Play,
			params: {
				channel: 1,
				layer: 10,
				clip: 'AMB',
			},
		}

		const serialized = serializers[Commands.Play].map((fn) => fn(command.command, command.params))

		expect(serialized).toHaveLength(serializers[Commands.Play].length)

		const result = serialized.filter((l) => l !== '').join(' ')

		expect(result).toBe('PLAY 1-10 "AMB"')
	})

	it('should serialize a play command with transition', () => {
		const command: PlayCommand = {
			command: Commands.Play,
			params: {
				channel: 1,
				layer: 10,
				clip: 'AMB',
				transition: {
					transitionType: TransitionType.Mix,
					duration: 10,
				},
			},
		}

		const serialized = serializers[Commands.Play].map((fn) => fn(command.command, command.params))

		expect(serialized).toHaveLength(serializers[Commands.Play].length)

		const result = serialized.filter((l) => l !== '').join(' ')

		expect(result).toBe('PLAY 1-10 "AMB" MIX 10')
	})

	it('should serialize a play [html] command', () => {
		const command: PlayHtmlCommand = {
			command: Commands.PlayHtml,
			params: {
				channel: 1,
				layer: 10,
				url: 'http://example.com',
			},
		}

		const serialized = serializers[Commands.PlayHtml].map((fn) => fn(command.command, command.params))

		expect(serialized).toHaveLength(serializers[Commands.Play].length)

		const result = serialized.filter((l) => l !== '').join(' ')

		expect(result).toBe('PLAY 1-10 [html] http://example.com')
	})

	it('should serialize a laodbg decklink command', () => {
		const command: LoadbgDecklinkCommand = {
			command: Commands.LoadbgDecklink,
			params: {
				channel: 1,
				layer: 10,
				device: 23,
			},
		}

		const serialized = serializers[Commands.LoadbgDecklink].map((fn) => fn(command.command, command.params))

		expect(serialized).toHaveLength(serializers[Commands.Play].length)

		const result = serialized.filter((l) => l !== '').join(' ')

		expect(result).toBe('LOADBG 1-10 DECKLINK 23')
	})

	it('v2.1 should serialize a play [html] command', () => {
		const command: PlayHtmlCommand = {
			command: Commands.PlayHtml,
			params: {
				channel: 1,
				layer: 10,
				url: 'http://example.com',
			},
		}

		const serialized = serializersV21[Commands.PlayHtml].map((fn) => fn(command.command, command.params))

		expect(serialized).toHaveLength(serializers[Commands.Play].length)

		const result = serialized.filter((l) => l !== '').join(' ')

		expect(result).toBe('PLAY 1-10 [html] http://example.com')
	})

	it('should serialize a cgAdd command with data', () => {
		const command: CgAddCommand = {
			command: Commands.CgAdd,
			params: {
				channel: 1,
				layer: 10,
				cgLayer: 1,
				playOnLoad: true,
				template: 'myFolder/myTemplate',
				data: {
					label: `These are difficult: "'&$\\/`,
				},
			},
		}

		const serialized = serializers[Commands.CgAdd].map((fn) => fn(command.command, command.params))

		expect(serialized).toHaveLength(serializers[Commands.CgAdd].length)

		const result = serialized.filter((l) => l !== '').join(' ')

		expect(result).toBe(
			`CG 1-10 ADD 1 "myFolder/myTemplate" 1 "{\\"label\\":\\"These are difficult: \\\\\\"'&\\$\\\\\\\\/\\"}"`
		)
	})
})
