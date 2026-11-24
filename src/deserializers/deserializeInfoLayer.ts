import { InfoLayerEntry } from '../parameters.js'
import { deserializeInfoChannel } from './deserializeInfoChannel.js'

export const deserializeInfoLayer = async (line: string, layer?: number): Promise<InfoLayerEntry | undefined> => {
	// CasparCG (2.2+) replies to `INFO <channel>-<layer>` with the state of the
	// WHOLE channel — the layer argument is accepted but not filtered on by the
	// server. Without filtering here, `channel.layers[0]` is simply the
	// lowest-numbered occupied layer of the channel, not the one that was asked
	// for, which misleads any consumer of infoLayer().
	const channelInfo = await deserializeInfoChannel(line)
	if (!channelInfo || layer === undefined) return channelInfo

	return {
		channel: {
			...channelInfo.channel,
			layers: channelInfo.channel.layers.filter((l) => l.layer === layer),
		},
	}
}
