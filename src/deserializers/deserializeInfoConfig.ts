import { deserializeXML } from './deserializeXML'

import { LogLevel } from '../enums'
import { InfoConfig, ConsumerConfigAny, ConsumerType, ProducerConfig } from '../parameters'
import { parseString, parseNumber, parseBoolean } from './deserializeXML'

export const deserializeInfoConfig = async (line: string): Promise<InfoConfig> => {
	if (!line.startsWith('<?xml')) return { rawXml: line }

	const parsed = await deserializeXML(line, { explicitCharkey: true })
	if (!parsed?.configuration) return { raw: parsed, rawXml: line }

	const config = parsed.configuration

	return {
		logLevel: parseString(config, 'log-level') as LogLevel,
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
