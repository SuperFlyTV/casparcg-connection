import * as Path from 'path'
import { CasparCGVersion } from './AMCPConnectionOptions'

// config NS
import { Config as ConfigNS } from './Config'
import CasparCGConfig = ConfigNS.Intermediate.CasparCGConfig

/***/
export class CasparCGPaths {
	media: string
	data: string
	log: string
	template: string
	thumbnail: string
	font?: string | undefined
	root: string

	/***/
	static ensureTrailingSlash(path: string): string {
		return ((path.slice(-1) === '/' || path.slice(-1) === '\\') ? path : path + '/')
	}

	/***/
	get thumbnails(): string {
		return this.thumbnail
	}

	/***/
	get absoluteMedia(): string {
		return this.absolutePath(this.media)
	}

	/***/
	get absoluteData(): string {
		return this.absolutePath(this.data)
	}

	/***/
	get absoluteLog(): string {
		return this.absolutePath(this.log)
	}

	/***/
	get absoluteTemplate(): string {
		return this.absolutePath(this.template)
	}

	/***/
	get absoluteThumbnail(): string {
		return this.absolutePath(this.thumbnail)
	}

	/***/
	get absoluteThumbnails(): string {
		return this.absolutePath(this.thumbnails)
	}

	/***/
	get absoluteFont(): string | undefined {
		return this.font ? this.absolutePath(this.font) : undefined
	}

	/***/
	private absolutePath(relativeOrAbsolutePath: string): string {
		if (relativeOrAbsolutePath.match(/\:\\|\:\//)) {
			return CasparCGPaths.ensureTrailingSlash(relativeOrAbsolutePath)
		}

		return CasparCGPaths.ensureTrailingSlash(Path.join(this.root, relativeOrAbsolutePath))
	}
}
/***/
export class ChannelRate {

	public channelRate: number
	public frameRate: number
	public isInterlaced: boolean

	/***/
	constructor(rateExpression: string) {
		this.isInterlaced = rateExpression.indexOf('i') > -1
		let rateMatch: RegExpMatchArray | null = rateExpression.match(/[0-9]+$/)
		let rate: number = 0
		if (rateMatch) {
			rate = +rateMatch[0]
		}

		if (rate === 5994) {
			this.channelRate = 60 * 1000 / 1001
			this.frameRate = this.isInterlaced ? 30 * 1000 / 1001 : this.channelRate
		} else if (rateExpression.toLowerCase() === 'pal') {
			this.isInterlaced = true
			this.channelRate = 50
			this.frameRate = 25
		} else if (rateExpression.toLowerCase() === 'ntsc') {
			this.isInterlaced = true
			this.channelRate = 60 * 1000 / 1001
			this.frameRate = 30 * 1000 / 1001
		} else {
			this.channelRate = rate / 100
			this.frameRate = this.isInterlaced ? rate / 200 : this.channelRate
		}
	}
}

/**
 *
 */
export interface IResponseParser {
	(data: Object, context?: any): Object
}

/**
 *
 */
export abstract class AbstractParser {
	context?: any
}

/**
 *
 */
export const channelParser: IResponseParser =
	(data: any): Object => {
		data = [].concat(data)
		let result: Array<Object> = [];
		(data as Array<Object>).forEach((channel) => {
			let components: Array<string> = channel.toString().split(/\s|,/)

			let i: number = +components.shift()!
			let format: string = components.shift() || ''
			let rates: ChannelRate = new ChannelRate(format)

			result.push({ channel: i, format: format.toLowerCase(), channelRate: rates.channelRate, frameRate: rates.frameRate, interlaced: rates.isInterlaced })
		})

		if (result.length > 0) {
			return result
		}

		return {}
	}

/***/
export const configParser: IResponseParser =
	(data: any, context?: any): Object => {
		let serverVersion: CasparCGVersion
		if (context && context.hasOwnProperty('serverVersion') && context.serverVersion > CasparCGVersion.V21x) {
			serverVersion = CasparCGVersion.V210
		} else {
			serverVersion = CasparCGVersion.V207
		}

		let configResult: CasparCGConfig = new CasparCGConfig(serverVersion)
		configResult.import(data)
		return configResult
	}

const nopParser: IResponseParser = (data: any): Object => data

/**
 *
 */
export const dataParser: IResponseParser = nopParser

/**
 *
 */
export const dataListParser: IResponseParser = nopParser

/**
 *
 */
export const infoTemplateParser: IResponseParser = nopParser

/**
 *
 */
export const helpParser: IResponseParser = nopParser

/**
 *
 */
export const glParser: IResponseParser = nopParser

/**
 *
 */
export const infoDelayParser: IResponseParser = nopParser

/**
 *
 */
export const infoParser: IResponseParser = nopParser

/**
 *
 */
export const infoThreadsParser: IResponseParser = nopParser

/**
 *
 */
export const thumbnailParser: IResponseParser = nopParser

/**
 *
 */
export const versionParser: IResponseParser = nopParser

function parseTimeString(timeDateString: string): number {

	timeDateString = timeDateString.replace(/[tT]/g, '')

	let year: number = parseInt(timeDateString.slice(0, 4), 10)
	let month: number = parseInt(timeDateString.slice(4, 6), 10)
	let date: number = parseInt(timeDateString.slice(6, 8), 10)
	let hours: number = parseInt(timeDateString.slice(8, 10), 10)
	let minutes: number = parseInt(timeDateString.slice(10, 12), 10)
	let seconds: number = parseInt(timeDateString.slice(12, 14), 10)
	return new Date(year, month, date, hours, minutes, seconds).getTime()
}

/**
 *
 */
export const contentParser: IResponseParser =
	(data: Array<string>): Object => {
		return data.map((i: string) => {
			let components: RegExpMatchArray | null = i.match(/\"([\s\S]*)\" +([\s\S]*)/)

			if (components === null) {
				return null
			}

			let name: string = components[1].replace(/\\/g, '/')
			let typeData: Array<string> = components[2].split(/\s+/)

			// is font
			if (typeData.length === 1) {
				return {
					name: name,
					type: 'font',
					fileName: typeData[0].replace(/\"/g, '')
				}
			}

			// is 2.1.0 template
			if (typeData.length === 3) {
				return {
					name: name,
					type: 'template',
					size: parseInt(typeData[0], 10),
					changed: parseTimeString(typeData[1]),
					format: typeData[2]
				}
			}

			// is 2.0.7 template
			if (typeData.length === 2) {
				return {
					name: name,
					type: 'template',
					size: parseInt(typeData[0], 10),
					changed: parseTimeString(typeData[1])
				}
			}

			// is media

			let frames: number = parseInt(typeData[3], 10)
			let frameRate: number = 0
			let duration: number = 0
			let frameTimeSegments: Array<string> = typeData[4].split('/')
			if (frameTimeSegments[0] !== '0') {
				frameRate = +(parseInt(frameTimeSegments[1], 10) / parseInt(frameTimeSegments[0], 10)).toFixed(2)
				duration = Math.round((frames / frameRate) * 100) / 100
			}

			return {
				name: name,
				type: typeData[0].toLowerCase() === 'movie' ? 'video' : typeData[0].toLowerCase() === 'still' ? 'image' : typeData[0].toLowerCase(),
				size: parseInt(typeData[1], 10),
				changed: parseTimeString(typeData[2]),
				frames: frames,
				frameTime: typeData[4],
				frameRate: frameRate,
				duration: duration
			}
		})
	}

/**
 *
 */
export const thumbnailListParser: IResponseParser =
	(data: Array<string>): Object => data.map((i: string) => {
		let components: RegExpMatchArray | null = i.match(/\"([\s\S]*)\" +([\s\S]*)/)

		if (components === null) {
			return null
		}

		let name: string = components[1].replace(/\\/g, '/')
		let typeData: Array<string> = components[2].split(/\s+/)

		return {
			name: name,
			type: 'thumbnail',
			changed: parseTimeString(typeData[0]),
			size: parseInt(typeData[1], 10)
		}
	})

/**
 *
 */
export const cinfParser: IResponseParser =
	(data: Object): Object => {
		if (data && Array.isArray(data)) {
			let components: RegExpMatchArray | null = data[0].match(/\"([\s\S]*)\" +([\s\S]*)/)

			if (components === null) {
				return {}
			}

			// let name: string = components[1].replace(/\\/g, "/");
			let typeData: Array<string> = components[2].split(/\s+/)
			return { size: parseInt(typeData[1], 10), changed: typeData[2], duration: parseInt(typeData[3], 10), fps: typeData[4] }
		}
		return {}
	}

/**
 *
 */
export const infoQueuesParser: IResponseParser = nopParser

/**
 *
 */
export const infoServerParser: IResponseParser = nopParser

/**
 *
 */
export const infoPathsParser: IResponseParser =
	(data: any): Object => {
		let paths = new CasparCGPaths()

		if (data.hasOwnProperty('initial-path')) {
			paths.root = data['initial-path']
		}

		if (data.hasOwnProperty('media-path')) {
			paths.media = data['media-path']
		}

		if (data.hasOwnProperty('data-path')) {
			paths.data = data['data-path']
		}

		if (data.hasOwnProperty('log-path')) {
			paths.log = data['log-path']
		}

		if (data.hasOwnProperty('template-path')) {
			paths.template = data['template-path']
		}

		if (data.hasOwnProperty('thumbnails-path')) {
			paths.thumbnail = data['thumbnails-path']
		}

		if (data.hasOwnProperty('thumbnail-path')) {
			paths.thumbnail = data['thumbnail-path']
		}

		if (data.hasOwnProperty('font-path')) {
			paths.font = data['font-path']
		}

		return paths
	}

/**
 *
 */
export const infoSystemParser: IResponseParser =
	(data: any): Object => {
		// wrap devices in arrays (if single device of a type)
		if (data.hasOwnProperty('decklink') && data.decklink.hasOwnProperty('device')) {
			if (!Array.isArray(data.decklink.device)) {
				data.decklink.device = [data.decklink.device]
			}
		}
		if (data.hasOwnProperty('bluefish') && data.bluefish.hasOwnProperty('device')) {
			if (!Array.isArray(data.bluefish.device)) {
				data.bluefish.device = [data.bluefish.device]
			}
		}
		return data
	}

/**
 *
 */
export const mixerStatusKeyerParser: IResponseParser =
	(data: Array<number>): Object => ({
		keyer: !!data[0]
	})

/**
 *
 */
export const mixerStatusChromaParser: IResponseParser =
	(data: Array<number>): Object => ({
		chroma: {
			enable: !!data[0],
			targetHue: data[1],
			hueWidth: data[2],
			minSaturation: data[3],
			minBrightness: data[4],
			softness: data[5],
			spillSuppress: data[6],
			spillSuppressSaturation: data[7],
			showMask: !!data[8]
		}
	})

/**
 *
 */
export const mixerStatusBlendParser: IResponseParser =
	(data: Array<number>): Object => ({
		blend: data
	})

/**
 *
 */
export const mixerStatusInvertParser: IResponseParser = mixerStatusKeyerParser

/**
 *
 */
export const mixerStatusOpacityParser: IResponseParser =
	(data: Array<number>): Object => ({
		opacity: data[0]
	})

/**
 *
 */
export const mixerStatusBrightnessParser: IResponseParser =
	(data: Array<number>): Object => ({
		brightness: data[0]
	})

/**
 *
 */
export const mixerStatusSaturationParser: IResponseParser =
	(data: Array<number>): Object => ({
		saturation: data[0]
	})

/**
 *
 */
export const mixerStatusContrastParser: IResponseParser =
	(data: Array<number>): Object => ({
		contrast: data[0]
	})

/**
 *
 */
export const mixerStatusLevelsParser: IResponseParser =
	(data: Array<number>): Object => ({
		levels: {
			minInput: data[0],
			maxInput: data[1],
			gamma: data[2],
			minOutput: data[3],
			maxOutput: data[4]
		}
	})

/**
 *
 */
export const mixerStatusFillParser: IResponseParser =
	(data: Array<number>): Object => ({
		fill: {
			x: data[0],
			y: data[1],
			xScale: data[2],
			yScale: data[3]
		}
	})

/**
 *
 */
export const mixerStatusClipParser: IResponseParser =
	(data: Array<number>): Object => ({
		clip: {
			x: data[0],
			y: data[1],
			width: data[2],
			height: data[3]
		}
	})

/**
 *
 */
export const mixerStatusAnchorParser: IResponseParser =
	(data: Array<number>): Object => ({
		anchor: {
			x: data[0],
			y: data[1]
		}
	})

/**
 *
 */
export const mixerStatusCropParser: IResponseParser =
	(data: Array<number>): Object => ({
		crop: {
			left: data[0],
			top: data[1],
			right: data[2],
			bottom: data[3]
		}
	})

/**
 *
 */
export const mixerStatusRotationParser: IResponseParser =
	(data: Array<number>): Object => ({
		rotation: data[0]
	})

/**
 *
 */
export const mixerStatusPerspectiveParser: IResponseParser =
	(data: Array<number>): Object => ({
		perspective: {
			topLeftX: data[0],
			topLeftY: data[1],
			topRightX: data[2],
			topRightY: data[3],
			bottomRightX: data[6],
			bottomRightY: data[7],
			bottomLeftX: data[4],
			bottomLeftY: data[5]
		}
	})

/**
 *
 */
export const mixerStatusMipmapParser: IResponseParser =
	(data: Array<number>): Object => ({
		mipmap: !!data[0]
	})

/**
 *
 */
export const mixerStatusVolumeParser: IResponseParser =
	(data: Array<number>): Object => ({
		volume: data[0]
	})

/**
 *
 */
export const mixerStatusMastervolumeParser: IResponseParser =
	(data: Array<number>): Object => ({
		mastervolume: data[0]
	})

/**
 *
 */
export const mixerStatusStraightAlphaOutputParser: IResponseParser =
	(data: Array<number>): Object => ({
		straightAlphaOutput: !!data[0]
	})
