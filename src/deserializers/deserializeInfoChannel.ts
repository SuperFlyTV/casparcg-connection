import { deserializeXML } from './deserializeXML'
import { InfoChannelEntry } from '../parameters'
import { ensureArray, compact } from '../lib'

export const deserializeInfoChannel = async (line: string): Promise<InfoChannelEntry | undefined> => {
	if (!line.startsWith('<?xml')) return undefined

	const parsed = await deserializeXML(line)

	if (!parsed) return undefined

	const channel = ensureArray(parsed.channel)[0]
	const mixer = ensureArray(channel.mixer)[0]
	const mixerStage = ensureArray(channel.stage)[0]

	const data: InfoChannelEntry = {
		channel: {
			framerate: parseInt(ensureArray(channel.framerate)[0], 10),
			mixer: {
				audio: {
					volumes: ensureArray(mixer.audio)[0].volume.map((v: string) => parseInt(v, 10)),
				},
			},

			layers: compact(
				Object.entries(ensureArray(mixerStage.layer)[0]).map(([layerName, layer0]) => {
					const m = layerName.match(/layer_(\d+)/)
					if (!m) return undefined

					const layer = ensureArray(layer0 as any)[0]
					return {
						layer: parseInt(m[1], 10),
						// perhaps parse these later:
						background: ensureArray(layer.background)[0],
						foreground: ensureArray(layer.foreground)[0],
					}
				})
			),
		},
	}

	return data
}
