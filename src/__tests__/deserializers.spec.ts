import { Version } from '../enums'
import { Commands } from '../commands'
import { deserializers } from '../deserializers'

describe('serializers', () => {
	it('should deserialize CINF', async () => {
		const input = '"AMB" MOVIE size datetime frames rate'

		const output = await deserializers[Commands.Cinf]([input])

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

		const output = await deserializers[Commands.Cls](input)

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

	it('should deserialize VERSION for 2.1', async () => {
		const input = ['2.1.0.f207a33 STABLE']

		const output = await deserializers[Commands.Version](input)

		expect(output).toHaveLength(1)
		expect(output[0]).toMatchObject({
			version: Version.v21x,
			fullVersion: '2.1.0.f207a33 STABLE',
		})
	})
	it('should deserialize VERSION for 2.2', async () => {
		const input = ['2.2.0.f207a33 STABLE']

		const output = await deserializers[Commands.Version](input)

		expect(output).toHaveLength(1)
		expect(output[0]).toMatchObject({
			version: Version.v22x,
			fullVersion: '2.2.0.f207a33 STABLE',
		})
	})
	it('should deserialize VERSION for 2.3', async () => {
		const input = ['2.3.0.f207a33 STABLE']

		const output = await deserializers[Commands.Version](input)

		expect(output).toHaveLength(1)
		expect(output[0]).toMatchObject({
			version: Version.v23x,
			fullVersion: '2.3.0.f207a33 STABLE',
		})
	})
	it('should be unsupported VERSION for 2.0', async () => {
		const input = ['2.0.7.f207a33 STABLE']

		const output = await deserializers[Commands.Version](input)

		expect(output).toHaveLength(1)
		expect(output[0]).toMatchObject({
			version: Version.Unsupported,
			fullVersion: '2.0.7.f207a33 STABLE',
		})
	})
	it('should deserialize VERSION for 2.4 into 2.3', async () => {
		const input = ['2.4.0.f207a33 STABLE']

		const output = await deserializers[Commands.Version](input)

		expect(output).toHaveLength(1)
		expect(output[0]).toMatchObject({
			version: Version.v23x,
			fullVersion: '2.4.0.f207a33 STABLE',
		})
	})
})
