import { CReturnType, Commands } from './commands'
import { LogLevel, Version } from './enums'
import {
	ClipInfo,
	ConsumerConfigAny,
	ConsumerType,
	InfoChannelEntry,
	InfoConfig,
	InfoEntry,
	InfoLayerEntry,
	ProducerConfig,
} from './parameters'
import { ParserOptions, parseStringPromise } from 'xml2js'

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

const deserializeXML = async (line: string, options?: ParserOptions): Promise<any> => {
	return await parseStringPromise(line, options) // todo - this seems to get stuck when we pass it non-xml
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
function ensureArray<T>(v: T | T[]): T[] {
	return Array.isArray(v) ? v : [v]
}
const deserializeInfoChannel = async (line: string): Promise<InfoChannelEntry | undefined> => {
	if (!line.startsWith('<?xml')) return undefined

	const parsed = await deserializeXML(line)

	if (!parsed) return undefined

	const channel = ensureArray(parsed.channel)[0]
	const mixer = ensureArray(channel.mixer)[0]
	const mixerStage = ensureArray(channel.stage)[0]

	const data: InfoChannelEntry = {
		channel: {
			framerate: parseInt(ensureArray(channel.framerate)[0], 10),
			mixer: {
				audio: {
					volumes: ensureArray(mixer.audio)[0].volume.map((v: string) => parseInt(v, 10)),
				},
			},

			layers: compact(
				Object.entries(ensureArray(mixerStage.layer)[0]).map(([layerName, layer0]) => {
					const m = layerName.match(/layer_(\d+)/)
					if (!m) return undefined

					const layer = ensureArray(layer0 as any)[0]
					return {
						layer: parseInt(m[1], 10),
						// perhaps parse these later:
						background: ensureArray(layer.background)[0],
						foreground: ensureArray(layer.foreground)[0],
					}
				})
			),
		},
	}

	return data
}
const deserializeInfoLayer = async (line: string): Promise<InfoLayerEntry | undefined> => {
	// Is this actually correct?
	// The data seems to be equal to info channel in 2.3.2
	return deserializeInfoChannel(line)
}
const deserializeInfoConfig = async (line: string): Promise<InfoConfig> => {
	if (!line.startsWith('<?xml')) return { rawXml: line }

	const parsed = await deserializeXML(line, { explicitCharkey: true })
	if (!parsed?.configuration) return { raw: parsed, rawXml: line }

	const config = parsed.configuration

	return {
		logLevel: parseString(config, 'log-level') as LogLevel, // TODO: validate?
		paths: parseConfigPaths(config),
		channels: parseConfigChannels(config),
		lockClearPhrase: parseString(config, 'lock-clear-phrase'),
		amcp: parseAmcp(config),
		controllers: parseControllers(config),
		ffmpeg: parseFFmpeg(config),
		html: parseHtml(config),
		ndi: parseNdi(config),
		osc: parseOsc(config),
		templateHosts: parseTemplateHosts(config),
		videoModes: parseVideoModes(config),
		raw: parsed,
		rawXml: line,
	}
}
function parseConfigPaths(config: any): InfoConfig['paths'] | undefined {
	const paths = config.paths?.[0]
	return paths
		? {
				media: parseString(paths, 'media-path'),
				logs: parseString(paths, 'log-path'),
				data: parseString(paths, 'data-path'),
				templates: parseString(paths, 'template-path'),
		  }
		: undefined
}
function parseConfigChannels(config: any): InfoConfig['channels'] | undefined {
	const channels = config.channels?.[0]?.channel
	if (!Array.isArray(channels)) return undefined
	return channels.map((channel) => ({
		videoMode: parseString(channel, 'video-mode'),
		consumers: parseConsumers(channel.consumers?.[0]),
		producers: parseProducers(channel.producers?.[0]),
	}))
}
function parseConsumers(consumers: any): ConsumerConfigAny[] {
	if (!consumers) return []
	return [
		ConsumerType.DECKLINK,
		ConsumerType.BLUEFISH,
		ConsumerType.FFMPEG,
		ConsumerType.NDI,
		ConsumerType.NEWTEK_IVGA,
		ConsumerType.SCREEN,
		ConsumerType.SYSTEM_AUDIO,
	].flatMap((consumerType: ConsumerType) => {
		const matchingConsumers = consumers[consumerType]
		return Array.isArray(matchingConsumers)
			? matchingConsumers.flatMap((consumer) => parseConsumer(consumerType, consumer))
			: []
	})
}
function parseConsumer(type: ConsumerType, consumer: any): ConsumerConfigAny {
	switch (type) {
		case ConsumerType.DECKLINK: {
			const subregion = consumer['subregion']?.[0]
			return {
				type,
				device: parseNumber(consumer, 'device'),
				latency: parseString(consumer, 'latency'),
				bufferDepth: parseNumber(consumer, 'buffer-depth'),
				embeddedAudio: parseBoolean(consumer, 'embedded-audio'),
				keyDevice: parseNumber(consumer, 'key-device'),
				keyer: parseString(consumer, 'keyer'),
				keyOnly: parseBoolean(consumer, 'key-only'),
				subregion: subregion
					? {
							srcX: parseNumber(consumer, 'src-x'),
							srcY: parseNumber(consumer, 'src-y'),
							destX: parseNumber(consumer, 'dest-x'),
							destY: parseNumber(consumer, 'dest-y'),
							width: parseNumber(consumer, 'width'),
							height: parseNumber(consumer, 'height'),
					  }
					: undefined,
				videoMode: parseString(consumer, 'video-mode'),
			}
		}
		case ConsumerType.BLUEFISH:
			return {
				type,
				device: parseNumber(consumer, 'device'),
				embeddedAudio: parseBoolean(consumer, 'embedded-audio'),
				internalKeyerAudioSource: parseString(consumer, 'internal-keyer-audio-source'),
				keyer: parseString(consumer, 'keyer'),
				sdiStream: parseNumber(consumer, 'sdi-stream'),
				uhdMode: parseNumber(consumer, 'uhd-mode'),
				watchdog: parseNumber(consumer, 'watchdog'),
			}
		case ConsumerType.FFMPEG:
			return {
				type,
				args: parseString(consumer, 'args'),
				path: parseString(consumer, 'path'),
			}
		case ConsumerType.NDI:
			return {
				type,
				allowFields: parseBoolean(consumer, 'allow-fields'),
				name: parseString(consumer, 'name'),
			}
		case ConsumerType.NEWTEK_IVGA:
			return {
				type,
			}
		case ConsumerType.SYSTEM_AUDIO:
			return {
				type,
				channelLayout: parseString(consumer, 'channel-layout'),
				latency: parseNumber(consumer, 'latency'),
			}
		case ConsumerType.SCREEN:
			return {
				type,
				alwaysOnTop: parseBoolean(consumer, 'always-on-top'),
				aspectRatio: parseString(consumer, 'aspect-ratio'),
				borderless: parseBoolean(consumer, 'borderless'),
				colourSpace: parseString(consumer, 'colour-space'),
				device: parseNumber(consumer, 'device'),
				interactive: parseBoolean(consumer, 'interactive'),
				keyOnly: parseBoolean(consumer, 'key-only'),
				sbsKey: parseBoolean(consumer, 'sbs-key'),
				stretch: parseString(consumer, 'stretch'),
				vsync: parseBoolean(consumer, 'vsync'),
				width: parseNumber(consumer, 'width'),
				height: parseNumber(consumer, 'height'),
				windowed: parseBoolean(consumer, 'windowed'),
				x: parseNumber(consumer, 'x'),
				y: parseNumber(consumer, 'y'),
			}
	}
}
function parseProducers(producers: any): ProducerConfig[] {
	if (!Array.isArray(producers?.producer)) return []
	return producers.producer.map((producer: any) => ({
		id: parseFloat(producer?.$?.id),
		producer: producer?._,
	}))
}

function parseAmcp(config: any): InfoConfig['amcp'] | undefined {
	const mediaServer = config?.amcp?.[0]?.['media-server']?.[0]
	return mediaServer
		? {
				mediaServer: {
					host: parseString(mediaServer, 'host'),
					port: parseNumber(mediaServer, 'port'),
				},
		  }
		: undefined
}
function parseControllers(config: any): InfoConfig['controllers'] | undefined {
	const tcp = config?.controllers?.[0]?.['tcp']?.[0]
	return tcp
		? {
				tcp: {
					port: parseNumber(tcp, 'port'),
					protocol: parseString(tcp, 'protocol'),
				},
		  }
		: undefined
}
function parseFFmpeg(config: any): InfoConfig['ffmpeg'] | undefined {
	const producer = config?.ffmpeg?.[0]?.['producer']?.[0]
	return producer
		? {
				producer: {
					threads: parseNumber(producer, 'threads'),
					autoDeinterlace: parseString(producer, 'auto-deinterlace'),
				},
		  }
		: undefined
}
function parseHtml(config: any): InfoConfig['html'] | undefined {
	const html = config?.html?.[0]
	return html
		? {
				enableGpu: parseBoolean(html, 'enable-gpu'),
				remoteDebuggingPort: parseNumber(html, 'remote-debugging-port'),
		  }
		: undefined
}
function parseNdi(config: any): InfoConfig['ndi'] | undefined {
	const ndi = config?.ndi?.[0]
	return ndi
		? {
				autoLoad: parseBoolean(ndi, 'auto-load'),
		  }
		: undefined
}
function parseOsc(config: any): InfoConfig['osc'] | undefined {
	const osc = config?.osc?.[0]
	const clients = osc?.['predefined-clients']?.[0]?.['predefined-client']
	return osc
		? {
				defaulPort: parseNumber(osc, 'default-port'),
				disableSendToAmcpClients: parseBoolean(osc, 'disable-send-to-amcp-clients'),
				predefinedClients: Array.isArray(clients)
					? clients.map((client) => ({
							address: parseString(client, 'address'),
							port: parseNumber(client, 'port'),
					  }))
					: undefined,
		  }
		: undefined
}
function parseTemplateHosts(config: any): InfoConfig['templateHosts'] | undefined {
	const hosts = config?.['template-hosts']?.[0]?.['template-host']
	return Array.isArray(hosts)
		? hosts.map((host) => ({
				videoMode: parseString(host, 'video-mode'),
				fileName: parseString(host, 'filename'),
				width: parseNumber(host, 'width'),
				height: parseNumber(host, 'height'),
		  }))
		: undefined
}
function parseVideoModes(config: any): InfoConfig['videoModes'] | undefined {
	const modes = config?.['video-modes']?.[0]?.['video-mode']
	return Array.isArray(modes)
		? modes.map((mode) => ({
				id: parseString(mode, 'id'),
				width: parseNumber(mode, 'width'),
				height: parseNumber(mode, 'height'),
				timeScale: parseNumber(mode, 'time-scale'),
				duration: parseNumber(mode, 'duration'),
				cadence: parseNumber(mode, 'cadence'),
		  }))
		: undefined
}

function parseString(object: any, key: string): string | undefined
function parseString(object: any, key: string, defaultValue: string): string
function parseString(object: any, key: string, defaultValue?: string): string | undefined {
	const value = object?.[key]?.[0]?._
	return value?.toString() ?? defaultValue
}
function parseNumber(object: any, key: string): number | undefined
function parseNumber(object: any, key: string, defaultValue: number): number
function parseNumber(object: any, key: string, defaultValue?: number): number | undefined {
	const value = object?.[key]?.[0]?._
	if (value === undefined) return defaultValue
	if (typeof value === 'number') return value
	const parsed = parseFloat(value)
	return isNaN(parsed) ? defaultValue : parsed
}
function parseBoolean(object: any, key: string): boolean | undefined
function parseBoolean(object: any, key: string, defaultValue?: boolean): boolean
function parseBoolean(object: any, key: string, defaultValue?: boolean): boolean | undefined {
	const value = object?.[key]?.[0]?._
	if (value === undefined) return defaultValue
	return value?.toString()?.trim()?.toLowerCase() === 'true'
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
	[Commands.InfoChannel]: deserializer<Commands.InfoChannel>(async (data: string[]) =>
		deserializeInfoChannel(data[0])
	),
	[Commands.InfoLayer]: deserializer<Commands.InfoLayer>(async (data: string[]) => deserializeInfoLayer(data[0])),
	[Commands.InfoConfig]: deserializer<Commands.InfoConfig>(async (data: string[]) => deserializeInfoConfig(data[0])),
}
