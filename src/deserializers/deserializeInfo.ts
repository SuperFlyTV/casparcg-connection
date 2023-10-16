import { InfoEntry } from '../parameters'

export const deserializeInfo = (line: string): InfoEntry | undefined => {
	// 1 720p5000 PLAYING
	const info = line.match(/(?<ChannelNo>\d) (?<Format>\d+(?<Interlaced>p|i)(?<Channelrate>\d+))(?<Status>.*)/i)
	if (info && info.groups) {
		return {
			channel: parseInt(info.groups.ChannelNo, 10),
			format: parseInt(info.groups.Format, 10),
			channelRate: parseInt(info.groups.Channelrate || '', 10) / 100,
			frameRate: parseInt(info.groups.Channelrate || '', 10) / 100,
			interlaced: info.groups.Interlaced === 'i',
			status: info.groups.Status.trim(),
		}
	}
	return undefined
}
