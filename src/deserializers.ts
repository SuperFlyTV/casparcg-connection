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

const deserializeInfo = async (line: string): Promise<any> => {
	if (line.startsWith('<?xml')) {
		// parse as xml
		return deserializeXML(line)
	}

	// parse as generic info (no params)
	const info = line.match(/(?<ChannelNo>\d) (?<Format>\d+(?<Interlaced>p|i)(?<Channelrate>\d+)) .*/i)
	if (info) {
		return {
			channel: info.groups?.ChannelNo,
			format: info.groups?.Format,
			channelRate: parseInt(info.groups?.Channelrate || '') / 100,
			frameRate: parseInt(info.groups?.Channelrate || '') / 100, // note - under 2.3 the 50i channels should use 50p calculations
			interlaced: info.groups?.Interlaced === 'i',
		}
	}

	// no idea what it is - just return
	return line
}

const deserializeVersion = (line: string): any => {
	let version = Version.Unsupported
	const v = line.split('.')
	const major = Number(v[0])
	const minor = Number(v[1])

	if (major <= 2) {
		if (minor === 1) {
			version = Version.v21x
		} else if (minor === 2) {
			version = Version.v22x
		} else if (minor >= 3) {
			// just parse anything newer as v2.3 as it's most likely closest
			version = Version.v23x
		}
	} else {
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
	[Commands.Info]: async (data: string[]) => Promise.all(data.map(deserializeInfo)),
	[Commands.Version]: async (data: string[]) => [deserializeVersion(data[0])],
}
