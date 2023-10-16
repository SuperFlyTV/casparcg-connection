import { ClipInfo } from '../parameters'

export function deserializeClipInfo(line: string): ClipInfo | undefined {
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
