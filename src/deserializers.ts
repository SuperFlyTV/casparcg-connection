import { Commands } from './commands'

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

export const deserializer: Record<string, (data: string[]) => (Record<string, any> | undefined)[]> = {
	[Commands.Cls]: (data: string[]) => data.map(deserializeClipInfo),
	[Commands.Cinf]: (data: string[]) => [deserializeClipInfo(data[0])],
}
