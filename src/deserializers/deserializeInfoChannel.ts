import { deserializeXML } from './deserializeXML.js'
import { InfoChannelEntry } from '../parameters.js'
import { ensureArray, compact } from '../lib.js'

export const deserializeInfoChannel = async (line: string): Promise<InfoChannelEntry | undefined> => {
	if (!line.startsWith('<?xml')) return undefined

	const parsed = await deserializeXML(line)

	if (!parsed) return undefined

	const channel = ensureArray(parsed.channel)[0]
	// CasparCG 2.5+ omits <mixer> from the reply when it has no state to
	// report (e.g. a channel without consumers), so none of this can be
	// assumed to be present.
	const mixer = ensureArray(channel.mixer)[0]
	const audio = mixer ? ensureArray(mixer.audio)[0] : undefined
	const mixerStage = ensureArray(channel.stage)[0]
	const mixerLayer = ensureArray(mixerStage?.layer)[0] ?? {}

	const data: InfoChannelEntry = {
		channel: {
			framerate: parseInt(ensureArray(channel.framerate)[0], 10),
			mixer: {
				audio: {
					volumes: audio?.volume ? ensureArray(audio.volume).map((v: string) => parseInt(v, 10)) : [],
				},
			},

			layers: compact(
				Object.entries<any>(mixerLayer).map(([layerName, layer0]) => {
					const m = layerName.match(/layer_(\d+)/)
					if (!m) return undefined

					const layer = ensureArray(layer0)[0]
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
