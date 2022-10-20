import { Commands } from './commands'
import { parseStringPromise } from 'xml2js'
import { Version } from './enums'

const deserializeClipInfo = (line: string) => {
	const groups = line.match(/"([\s\S]*)" +(MOVIE|STILL|AUDIO) +([\s\S]*)/i)

	if (!groups) {
		return undefined
	}

	const data = groups[3].split(' ')

	return {
		clip: groups[1],
		type: groups[2],
		size: data[0],
		datetime: data[1],
		frames: data[2],
		framerate: data[3],
	}
}

const deserializeXML = async (line: string): Promise<any> => {
	return await parseStringPromise(line) // todo - this seems to get stuck when we pass it non-xml
}

const deserializeVersion = async (line: string): Promise<any> => {
	let version = Version.Unsupported

	if (line.startsWith('2.1')) {
		version = Version.v21x
	} else if (line.startsWith('2.2')) {
		version = Version.v22x
	} else if (line.startsWith('2.3')) {
		version = Version.v23x
	}

	return {
		version,
		fullVersion: line,
	}
}

export const deserializers: Record<string, (data: string[]) => Promise<(Record<string, any> | undefined)[]>> = {
	[Commands.Cls]: async (data: string[]) => data.map(deserializeClipInfo),
	[Commands.Cinf]: async (data: string[]) => [deserializeClipInfo(data[0])],
	[Commands.Info]: async (data: string[]) => Promise.all(data.map(deserializeXML)),
	[Commands.Version]: async (data: string[]) => {
		return [deserializeVersion(data[0])]
	},
}
