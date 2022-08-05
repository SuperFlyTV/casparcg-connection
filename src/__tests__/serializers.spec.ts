import { serializers } from '../serializers'
import { Commands, PlayCommand } from '../commands'
import { TransitionType } from '../enums'

describe('serializers', () => {
	it('should have serializers for every command', () => {
		for (const c of Object.values(Commands)) {
			expect(serializers[c]).toBeDefined()
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
})
