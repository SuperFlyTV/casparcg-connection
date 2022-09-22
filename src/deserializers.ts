import { Commands } from './commands'
import { parseStringPromise } from 'xml2js'

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
	return await parseStringPromise(line)
}

export const deserializer: Record<string, (data: string[]) => Promise<(Record<string, any> | undefined)[]>> = {
	[Commands.Cls]: async (data: string[]) => data.map(deserializeClipInfo),
	[Commands.Cinf]: async (data: string[]) => [deserializeClipInfo(data[0])],
	[Commands.Info]: async (data: string[]) => Promise.all(data.map(deserializeXML)),
}
