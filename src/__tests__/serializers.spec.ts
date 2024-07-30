import { serializers, serializersV21 } from '../serializers'
import {
	CgAddCommand,
	Commands,
	CustomCommand,
	InfoChannelCommand,
	InfoCommand,
	InfoLayerCommand,
	LoadbgDecklinkCommand,
	MixerFillCommand,
	PlayCommand,
	PlayHtmlCommand,
} from '../commands'
import { TransitionTween, TransitionType } from '../enums'

describe('serializers', () => {
	it('should have serializers for every command', () => {
		for (const c of Object.values<Commands>(Commands)) {
			expect(serializers[c]).toBeDefined()
		}
	})

	it('should have command for every serializers', () => {
		for (const c of Object.keys(serializers)) {
			expect(Object.values<Commands>(Commands).includes(c as Commands)).toBeTruthy()
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

	it('should serialize a play command with filters', () => {
		const command: PlayCommand = {
			command: Commands.Play,
			params: {
				channel: 1,
				layer: 10,
				clip: 'AMB',
				vFilter: 'A B C',
				aFilter: 'D E F',
			},
		}

		const serialized = serializers[Commands.Play].map((fn) => fn(command.command, command.params))

		expect(serialized).toHaveLength(serializers[Commands.Play].length)

		const result = serialized.filter((l) => l !== '').join(' ')

		expect(result).toBe('PLAY 1-10 "AMB" VF "A B C" AF "D E F"')
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
	it('should serialize a INFO command', () => {
		const command: InfoCommand = {
			command: Commands.Info,
			params: {},
		}
		const serialized = serializers[Commands.Info].map((fn) => fn(command.command, command.params))
		expect(serialized).toHaveLength(serializers[Commands.Info].length)
		const result = serialized.filter((l) => l !== '').join(' ')

		expect(result).toBe(`INFO`)
	})
	it('should serialize a INFO Channel command', () => {
		const command: InfoChannelCommand = {
			command: Commands.InfoChannel,
			params: {
				channel: 1,
			},
		}
		const serialized = serializers[Commands.InfoChannel].map((fn) => fn(command.command, command.params))
		expect(serialized).toHaveLength(serializers[Commands.InfoChannel].length)
		const result = serialized.filter((l) => l !== '').join(' ')

		expect(result).toBe(`INFO 1`)
	})
	it('should serialize a INFO Channel Layer command', () => {
		const command: InfoLayerCommand = {
			command: Commands.InfoLayer,
			params: {
				channel: 1,
				layer: 10,
			},
		}
		const serialized = serializers[Commands.InfoLayer].map((fn) => fn(command.command, command.params))
		expect(serialized).toHaveLength(serializers[Commands.InfoLayer].length)
		const result = serialized.filter((l) => l !== '').join(' ')

		expect(result).toBe(`INFO 1-10`)
	})

	it('should serialize a MIXER FILL with tweening properties', () => {
		const command: MixerFillCommand = {
			command: Commands.MixerFill,
			params: {
				channel: 1,
				layer: 10,
				x: 0.1,
				y: 0.2,
				xScale: 0.7,
				yScale: 0.8,

				duration: 20,
				tween: TransitionTween.IN_CIRC,
			},
		}
		const serialized = serializers[Commands.MixerFill].map((fn) => fn(command.command, command.params))
		expect(serialized).toHaveLength(serializers[Commands.MixerFill].length)
		const result = serialized.filter((l) => l !== '').join(' ')

		expect(result).toBe(`MIXER 1-10 FILL 0.1 0.2 0.7 0.8 20 EASEINCIRC`)
	})

	it('should serialize a MIXER FILL with duration', () => {
		const command: MixerFillCommand = {
			command: Commands.MixerFill,
			params: {
				channel: 1,
				layer: 10,
				x: 0.1,
				y: 0.2,
				xScale: 0.7,
				yScale: 0.8,

				duration: 20,
			},
		}
		const serialized = serializers[Commands.MixerFill].map((fn) => fn(command.command, command.params))
		expect(serialized).toHaveLength(serializers[Commands.MixerFill].length)
		const result = serialized.filter((l) => l !== '').join(' ')

		expect(result).toBe(`MIXER 1-10 FILL 0.1 0.2 0.7 0.8 20`)
	})

	it('should serialize a custom', () => {
		const command: CustomCommand = {
			command: Commands.Custom,
			params: {
				command: 'INFO 1',
			},
		}

		const serialized = serializers[Commands.Custom].map((fn) => fn(command.command, command.params))

		expect(serialized).toHaveLength(serializers[Commands.Custom].length)

		const result = serialized.filter((l) => l !== '').join(' ')

		expect(result).toBe('INFO 1')
	})
})
