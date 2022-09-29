import { Commands } from '../commands'
import { deserializer } from '../deserializers'

describe('serializers', () => {
	it('should deserialize CINF', async () => {
		const input = '"AMB" MOVIE size datetime frames rate'

		const output = await deserializer[Commands.Cinf]([input])

		expect(output).toHaveLength(1)
		expect(output[0]).toMatchObject({
			clip: 'AMB',
			type: 'MOVIE',
			size: 'size',
			datetime: 'datetime',
			frames: 'frames',
			framerate: 'rate',
		})
	})

	it('should deserialize CLS', async () => {
		const input = ['"AMB" MOVIE size datetime frames rate', '"AMB2" MOVIE size2 datetime2 frames2 rate2']

		const output = await deserializer[Commands.Cls](input)

		expect(output).toHaveLength(2)
		expect(output[0]).toMatchObject({
			clip: 'AMB',
			type: 'MOVIE',
			size: 'size',
			datetime: 'datetime',
			frames: 'frames',
			framerate: 'rate',
		})
		expect(output[1]).toMatchObject({
			clip: 'AMB2',
			type: 'MOVIE',
			size: 'size2',
			datetime: 'datetime2',
			frames: 'frames2',
			framerate: 'rate2',
		})
	})
})
