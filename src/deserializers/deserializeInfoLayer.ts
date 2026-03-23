import { InfoLayerEntry } from '../parameters.js'
import { deserializeInfoChannel } from './deserializeInfoChannel.js'

export const deserializeInfoLayer = async (line: string): Promise<InfoLayerEntry | undefined> => {
	// Is this actually correct?
	// The data seems to be equal to info channel in 2.3.2
	return deserializeInfoChannel(line)
}
