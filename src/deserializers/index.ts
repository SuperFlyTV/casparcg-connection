import { CReturnType, Commands } from '../commands.js'
import { deserializeInfoConfig } from './deserializeInfoConfig.js'
import { deserializeInfoChannel } from './deserializeInfoChannel.js'
import { deserializeInfoLayer } from './deserializeInfoLayer.js'
import { deserializeInfo } from './deserializeInfo.js'
import { deserializeClipInfo } from './deserializeClipInfo.js'
import { deserializeVersion } from './deserializeVersion.js'
import { compact } from '../lib.js'

export type Deserializer<C extends Commands> = (data: string[]) => Promise<CReturnType<C>>
/** Just a type guard to ensure that the inner function returns a value as defined in AllInternalCommands */
function deserializer<C extends Commands>(fcn: Deserializer<C>): Deserializer<C> {
	return fcn
}

export const deserializers = {
	[Commands.Cls]: deserializer<Commands.Cls>(async (data: string[]) => compact(data.map(deserializeClipInfo))),
	[Commands.Cinf]: deserializer<Commands.Cinf>(async (data: string[]) => deserializeClipInfo(data[0])),
	[Commands.Version]: deserializer<Commands.Version>(async (data: string[]) => deserializeVersion(data[0])),
	[Commands.Info]: deserializer<Commands.Info>(async (data: string[]) => compact(data.map(deserializeInfo))),
	[Commands.InfoChannel]: deserializer<Commands.InfoChannel>(async (data: string[]) =>
		deserializeInfoChannel(data[0])
	),
	[Commands.InfoLayer]: deserializer<Commands.InfoLayer>(async (data: string[]) => deserializeInfoLayer(data[0])),
	[Commands.InfoConfig]: deserializer<Commands.InfoConfig>(async (data: string[]) => deserializeInfoConfig(data[0])),
}
