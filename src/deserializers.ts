import { CReturnType, Commands } from './commands'
import { Version } from './enums'
import { ClipInfo, InfoEntry } from './parameters'
import { parseStringPromise } from 'xml2js'

function deserializeClipInfo(line: string): ClipInfo | undefined {
	const groups = line.match(/"([\s\S]*)" +(MOVIE|STILL|AUDIO) +([\s\S]*)/i)

	if (!groups) {
		return undefined
	}
	const data = groups[3].split(' ')

	let datetime = 0
	{
		// Handle datetime on the form "20230609071314"
		const m = `${data[1]}`.match(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/)
		if (m) {
			const d = new Date(
				parseInt(m[1], 10),
				parseInt(m[2], 10) - 1,
				parseInt(m[3], 10),
				parseInt(m[4], 10),
				parseInt(m[5], 10),
				parseInt(m[6], 10)
			)
			// is valid?
			if (d.getTime() > 0) datetime = d.getTime()
		}
	}

	let framerate = 0
	{
		// Handle framerate on the form "1/25"
		const m = `${data[3]}`.match(/(\d+)\/(\d+)/)
		if (m) {
			framerate = parseInt(m[2], 10)
		}
	}

	return {
		clip: groups[1],
		type: groups[2] as 'MOVIE' | 'STILL' | 'AUDIO',
		size: parseInt(data[0], 10),
		datetime,
		frames: parseInt(data[2]) || 0,
		framerate,
	}
}

const deserializeXML = async (line: string): Promise<any> => {
	return await parseStringPromise(line) // todo - this seems to get stuck when we pass it non-xml
}

const deserializeInfo = (line: string): InfoEntry | undefined => {
	// 1 720p5000 PLAYING

	const info = line.match(/(?<ChannelNo>\d) (?<Format>\d+(?<Interlaced>p|i)(?<Channelrate>\d+))(?<Status>.*)/i)
	if (info && info.groups) {
		return {
			channel: parseInt(info.groups.ChannelNo, 10),
			format: parseInt(info.groups.Format, 10),
			channelRate: parseInt(info.groups.Channelrate || '', 10) / 100,
			frameRate: parseInt(info.groups.Channelrate || '', 10) / 100, // note - under 2.3 the 50i channels should use 50p calculations
			interlaced: info.groups.Interlaced === 'i',
			status: info.groups.Status.trim(),
		}
	}
	return undefined
}

const deserializeVersion = (
	line: string
): {
	version: Version
	fullVersion: string
} => {
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

function compact<T>(array: (T | undefined)[]): T[] {
	return array.filter((item) => item !== undefined) as T[]
}
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
}
