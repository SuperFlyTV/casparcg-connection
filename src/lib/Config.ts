/* eslint @typescript-eslint/ban-types: 0 */
/* eslint @typescript-eslint/no-namespace: 0 */ // namespaces make sense here, I think.
import { create as XMLBuilder } from 'xmlbuilder'
import { CasparCGVersion } from './AMCPConnectionOptions'

export namespace v2xx {
	export class CasparCGConfigVO {
		public channelGrid = false
		public flash: v2xx.Flash = new v2xx.Flash()
		public templateHosts: Array<v2xx.TemplateHost> = []
	}

	export class Channel {
		public _type = 'channel'
		public videoMode = 'PAL' // @todo: literal
		public consumers: Array<Consumer> = []
		public straightAlphaOutput = false
		public channelLayout = 'stereo'
	}

	export class Consumer {
		public _type = ''
	}

	export class DecklinkConsumer extends Consumer {
		_type = 'decklink'
		public device = 1
		public keyDevice: number | null = null
		public embeddedAudio = false
		public channelLayout = 'stereo'
		public latency = 'normal' // @todo: literal
		public keyer = 'external' // @todo: literal
		public keyOnly = false
		public bufferDepth = 3
	}

	export class BluefishConsumer extends Consumer {
		_type = 'bluefish'
		public device = 1
		public embeddedAudio = false
		public channelLayout = 'stereo'
		public keyOnly = false
	}

	export class SystemAudioConsumer extends Consumer {
		_type = 'system-audio'
	}

	export class ScreenConsumer extends Consumer {
		_type = 'screen'
		public device = 1 // @todo: wrong default implemented in caspar, should be 0:::
		public aspectRatio = 'default' // @todo: literal
		public stretch = 'fill' // @todo: literal
		public windowed = true
		public keyOnly = false
		public autoDeinterlace = true
		public vsync = false
		public borderless = false
	}

	export class NewtekIvgaConsumer extends Consumer {
		_type = 'newtek-ivga'
	}

	export class Controller {
		public _type = 'tcp'
		public port: number | null = null
		public protocol = ''
	}

	export class Mixer {
		public blendModes = false
		public straightAlpha = false
		public mipmappingDefaultOn = false
	}

	export class OscClient {
		public _type = 'predefined-client'
		public address = ''
		public port: number | null = null
	}

	export class Thumbnails {
		public generateThumbnails = true
		public width = 256
		public height = 144
		public videoGrid = 2
		public scanIntervalMillis = 5000
		public generateDelayMillis = 2000
		public mipmap = false
		public videoMode = '720p5000' // @todo: literal
	}

	export class Flash {
		bufferDepth: string | number = 'auto'
	}

	export class TemplateHost {
		public _type = 'template-host'
		public videoMode = '' // @todo: literal
		public filename = ''
		public width: number | null = null
		public height: number | null = null
	}

	export class Osc {
		public defaultPort = 6250
		public predefinedClients: Array<OscClient> = []
	}

	export const defaultAMCPController: v2xx.Controller = {
		_type: new v2xx.Controller()._type,
		port: 5250,
		protocol: 'AMCP',
	}
}

export namespace v207 {
	export class CasparCGConfigVO extends v2xx.CasparCGConfigVO {
		public _version: number = CasparCGVersion.V207
		public paths: v207.Paths = new v207.Paths()
		public channels: Array<v207.Channel> = [new v2xx.Channel()]
		public controllers: Array<v2xx.Controller> = [v2xx.defaultAMCPController]
		public mixer: v207.Mixer = new v207.Mixer()
		public logLevel = 'trace' // @todo: literal
		public autoDeinterlace = true
		public autoTranscode = true
		public pipelineTokens = 2
		public thumbnails: v207.Thumbnails = new v207.Thumbnails()
		public osc: v2xx.Osc = new v2xx.Osc()
		public audio: v207.Audio = new v207.Audio()
	}

	export class Channel extends v2xx.Channel {
		public consumers: Array<v207.Consumer> = []
	}

	export class Paths {
		mediaPath = 'media\\'
		logPath = 'log\\'
		dataPath = 'data\\'
		templatePath = 'templates\\'
		thumbnailsPath = 'thumbnails\\'
	}

	export class Consumer extends v2xx.Consumer {}

	export class DecklinkConsumer extends v2xx.DecklinkConsumer {
		public customAllocator = true
	}

	export class BluefishConsumer extends v2xx.BluefishConsumer {}

	export class SystemAudioConsumer extends v2xx.SystemAudioConsumer {}

	export class ScreenConsumer extends v2xx.ScreenConsumer {
		public name = 'Screen Consumer'
	}

	export class NewtekIvgaConsumer extends v2xx.NewtekIvgaConsumer {
		public channelLayout = 'stereo'
		public provideSync = true
	}

	export class FileConsumer extends v2xx.Consumer {
		_type = 'file'
		public path = ''
		public vcodec = 'libx264'
		public separateKey = false
	}

	export class StreamConsumer extends v2xx.Consumer {
		_type = 'stream'
		public path = ''
		public args = ''
	}

	export class Thumbnails extends v2xx.Thumbnails {}

	export class Mixer extends v2xx.Mixer {
		public chromaKey = false
	}

	export class Osc extends v2xx.Osc {}

	export class ChannelLayout {
		public _type = 'channel-layout'
		public name = ''
		public type = ''
		public numChannels: number | null = null
		public channels = ''
	}

	export class MixConfig {
		public _type = 'mix-config'
		public from = ''
		public to = ''
		public mix = ''
		public mappings: Array<string> = []
	}

	export class Audio {
		public channelLayouts: Array<v207.ChannelLayout> = []
		public mixConfigs: Array<v207.MixConfig> = []
	}
}

export namespace v21x {
	export const defaultLOGController: v2xx.Controller = {
		_type: new v2xx.Controller()._type,
		port: 3250,
		protocol: 'LOG',
	}

	export class CasparCGConfigVO extends v2xx.CasparCGConfigVO {
		public _version: number = CasparCGVersion.V2xx
		public paths: v21x.Paths = new v21x.Paths()
		public channels: Array<v21x.Channel> = [new v2xx.Channel()]
		public controllers: Array<v2xx.Controller> = [v2xx.defaultAMCPController, v21x.defaultLOGController]
		public lockClearPhrase = 'secret'
		public mixer: v21x.Mixer = new v21x.Mixer()
		public logLevel = 'info' // @todo: literal
		public logCategories = 'communication' // @todo: literal or strongtype
		public forceDeinterlace = false
		public accelerator = 'auto' // @todo: literal
		public thumbnails: v21x.Thumbnails = new v21x.Thumbnails()
		public html: v21x.Html = new v21x.Html()
		public osc: v21x.Osc = new v21x.Osc()
		public audio: v21x.Audio = new v21x.Audio()
	}

	export class Channel extends v2xx.Channel {
		public consumers: Array<v21x.Consumer> = []
	}

	export class Paths {
		mediaPath = 'media/'
		logPath = 'log/'
		dataPath = 'data/'
		templatePath = 'template/'
		thumbnailPath = 'thumbnail/'
		fontPath = 'font/'
	}

	export class Consumer extends v2xx.Consumer {}

	export class DecklinkConsumer extends v2xx.DecklinkConsumer {}

	export class BluefishConsumer extends v2xx.BluefishConsumer {}

	export class SystemAudioConsumer extends v2xx.SystemAudioConsumer {
		public channelLayout = 'stereo'
		public latency = 200
	}

	export class ScreenConsumer extends v2xx.ScreenConsumer {
		public interactive = true
	}

	export class NewtekIvgaConsumer extends v2xx.NewtekIvgaConsumer {}

	export class FfmpegConsumer extends v2xx.Consumer {
		_type = 'ffmpeg'
		public path = ''
		public args = ''
		public separateKey = false
		public monoStreams = false
	}

	export class SynctoConsumer extends v2xx.Consumer {
		_type = 'syncto'
		public channelId: number | null = null
	}

	export class Mixer extends v2xx.Mixer {}

	export class Thumbnails extends v2xx.Thumbnails {
		public mipmap = true
	}

	export class Html {
		remoteDebuggingPort: number | null = null
	}

	export class Osc extends v2xx.Osc {
		public disableSendToAmcpClients = false
	}

	export class ChannelLayout {
		public _type = 'channel-layout'
		public name = ''
		public type = ''
		public numChannels: number | null = null
		public channelOrder = ''
	}

	export class MixConfig {
		public _type = 'mix-config'
		public fromType = ''
		public toTypes = ''
		public mix = ''
	}

	export class Audio {
		public channelLayouts: Array<v21x.ChannelLayout> = []
		public mixConfigs: Array<v21x.MixConfig> = []
	}
}

export namespace Utils {
	export type factoryMembers =
		| 'config'
		| 'channel'
		| 'decklink'
		| 'bluefish'
		| 'system-audio'
		| 'screen'
		| 'newtek-ivga'
		| 'ffmpeg'
		| 'file'
		| 'ffmpeg'
		| 'stream'
		| 'syncto'
		| 'tcp'
		| 'predefined-client'
		| 'template-host'
		| 'channel-layout'
		| 'mix-config'
	export type FactyoryTypes =
		| v207.CasparCGConfigVO
		| v21x.CasparCGConfigVO
		| v2xx.Consumer
		| v2xx.Channel
		| v2xx.Controller
		| v2xx.OscClient
		| v2xx.TemplateHost
		| v207.ChannelLayout
		| v207.MixConfig
		| v21x.ChannelLayout
		| v21x.MixConfig
		| undefined

	export function configMemberFactory(
		version: CasparCGVersion,
		memberName: factoryMembers | string,
		initValues?: Object
	): FactyoryTypes {
		let member: FactyoryTypes = undefined

		switch (memberName) {
			case 'config':
				if (version < 2100) {
					member = new v207.CasparCGConfigVO()
				} else {
					member = new v21x.CasparCGConfigVO()
				}
				break

			case 'channel':
				if (version < 2100) {
					member = new v207.Channel()
				} else {
					member = new v21x.Channel()
				}
				break

			case 'decklink':
				if (version < 2100) {
					member = new v207.DecklinkConsumer()
				} else {
					member = new v21x.DecklinkConsumer()
				}
				break

			case 'bluefish':
				member = new v2xx.BluefishConsumer()
				break

			case 'system-audio':
				if (version < 2100) {
					member = new v207.SystemAudioConsumer()
				} else {
					member = new v21x.SystemAudioConsumer()
				}
				break

			case 'screen':
				if (version < 2100) {
					member = new v207.ScreenConsumer()
				} else {
					member = new v21x.ScreenConsumer()
				}
				break

			case 'newtek-ivga':
				if (version < 2100) {
					member = new v207.NewtekIvgaConsumer()
				} else {
					member = new v21x.NewtekIvgaConsumer()
				}
				break
			case 'ffmpeg':
				if (version > 2100) {
					member = new v21x.FfmpegConsumer()
				}
				break

			case 'file':
				if (version < 2100) {
					member = new v207.FileConsumer()
				}
				break

			case 'stream':
				if (version < 2100) {
					member = new v207.StreamConsumer()
				}
				break

			case 'syncto':
				if (version > 2100) {
					member = new v21x.SynctoConsumer()
				}
				break

			case 'tcp':
				member = new v2xx.Controller()
				break

			case 'predefined-client':
				member = new v2xx.OscClient()
				break

			case 'template-host':
				member = new v2xx.TemplateHost()
				break

			case 'channel-layout':
				if (version < 2100) {
					member = new v207.ChannelLayout()
				} else {
					member = new v21x.ChannelLayout()
				}
				break

			case 'mix-config':
				if (version < 2100) {
					member = new v207.MixConfig()
				} else {
					member = new v21x.MixConfig()
				}
				break
		}

		if (member && initValues) {
			for (const key in initValues) {
				if (key in member) {
					if (typeof (member as any)[key] === (typeof (initValues as any)[key] || undefined)) {
						;(member as any)[key] = (initValues as any)[key]
					}
				}
			}
		}
		return member
	}
}

export namespace Intermediate {
	import Config207VO = v207.CasparCGConfigVO
	import Config210VO = v21x.CasparCGConfigVO

	export class Audio {
		public channelLayouts: Array<v21x.ChannelLayout> = []
		public mixConfigs: Array<Intermediate.MixConfig> = []
	}

	export class MixConfig {
		public _type = 'mix-config'
		public fromType = ''
		public toTypes = ''
		public mix: {
			mixType: string
			destinations: { [destination: string]: Array<{ source: string; expression: string }> }
		} = {
			mixType: '',
			destinations: {},
		}
	}

	export class Mixer extends v207.Mixer {
		chromaKey = false
	}

	export interface ICasparCGConfig {
		paths: v21x.Paths
		channels: Array<v2xx.Channel>
		controllers: Array<v2xx.Controller>
		lockClearPhrase: string | null
		mixer: Intermediate.Mixer
		logLevel: string
		logCategories: string
		channelGrid: boolean
		forceDeinterlace: boolean
		autoDeinterlace: boolean
		autoTranscode: boolean
		pipelineTokens: number
		accelerator: string
		thumbnails: v21x.Thumbnails
		flash: v2xx.Flash
		html: v21x.Html
		templateHosts: Array<v2xx.TemplateHost>
		osc: v2xx.Osc
		audio: Intermediate.Audio
		readonly VO: v207.CasparCGConfigVO | v21x.CasparCGConfigVO
		readonly vo: v207.CasparCGConfigVO | v21x.CasparCGConfigVO
		readonly v207VO: v207.CasparCGConfigVO
		readonly v210VO: v21x.CasparCGConfigVO
		readonly XML: Object | null
		readonly xml: Object | null
		readonly v207XML: Object
		readonly v210XML: Object
		readonly XMLString: string
		readonly v207XMLString: string
		readonly v210XMLString: string
		readonly _version: CasparCGVersion | undefined
		import(configVO: Object): void
		importFromV207VO(configVO: Object): void
		importFromV210VO(configVO: Object): void
	}

	export class CasparCGConfig implements ICasparCGConfig {
		public paths: v21x.Paths = new v21x.Paths()
		public channels: Array<v2xx.Channel> = []
		public controllers: Array<v2xx.Controller> = []
		public lockClearPhrase: string | null = null
		public mixer: Intermediate.Mixer = new Intermediate.Mixer()
		public logLevel = 'info' // @todo literal
		public logCategories = 'communication' // @todo literal
		public channelGrid = false
		public forceDeinterlace = false
		public autoDeinterlace = true
		public autoTranscode = true
		public pipelineTokens = 2
		public accelerator = 'auto' // @todo literal
		public thumbnails: v21x.Thumbnails = new v21x.Thumbnails()
		public flash: v2xx.Flash = new v2xx.Flash()
		public html: v21x.Html = new v21x.Html()
		public templateHosts: Array<v2xx.TemplateHost> = []
		public osc: v21x.Osc = new v21x.Osc()
		public audio: Intermediate.Audio = new Intermediate.Audio()
		private __version: CasparCGVersion | undefined

		public constructor(initVersionOrConfigVO: Config207VO | Config210VO | {} | CasparCGVersion) {
			// is a version
			if (typeof initVersionOrConfigVO === 'number') {
				if (initVersionOrConfigVO >= 2100) {
					this.__version = CasparCGVersion.V210
				} else if (initVersionOrConfigVO === 2007) {
					this.__version = CasparCGVersion.V207
				}
				return
			}
			// is initVO
			if (initVersionOrConfigVO) {
				if (initVersionOrConfigVO instanceof Config207VO) {
					this.__version = CasparCGVersion.V207
				} else if (initVersionOrConfigVO instanceof Config210VO) {
					this.__version = CasparCGVersion.V210
				} else if (typeof initVersionOrConfigVO === 'object' && (initVersionOrConfigVO as any)['_version']) {
					if ((initVersionOrConfigVO as any)['_version'] >= 2100) {
						this.__version = CasparCGVersion.V210
					} else if ((initVersionOrConfigVO as any)['_version'] >= 2007) {
						this.__version = CasparCGVersion.V207
					}
				}
				this.import(initVersionOrConfigVO)
			}
		}

		static addFormattedXMLChildsFromObject(root: any, data: any, blacklist?: Array<string>): Object {
			blacklist && blacklist.push('arrayNo', 'array-no')
			for (let key in data) {
				if (key === 'constructor' || (blacklist && blacklist.indexOf(key) > -1)) {
					continue
				}
				const value: string = data[key]
				key = CasparCGConfig.mixedCaseToDashed(key)
				root.ele.call(root, key, value)
			}
			return root
		}

		static addFormattedXMLChildsFromArray(root: any, data: any, whitelist?: Array<string>): Object {
			if (whitelist) {
				whitelist.forEach((key) => {
					if (key in data) {
						const value: string = data[key]
						const keyBlocks: Array<string> = key.split(/(?=[A-Z])/)
						key = keyBlocks.map((i) => i.toLowerCase()).join('-')
						root.ele.call(root, key, value)
					}
				})
			}
			return root
		}

		static dashedToMixedCase(rawString: string): string {
			const keyBlocks: Array<string> = rawString.split(/-/)
			if (keyBlocks.length > 1) {
				return keyBlocks
					.map((i, o) => {
						if (o > 0) {
							i = i.toLowerCase()
							i = i.slice(0, 1).toUpperCase() + i.slice(1)
						} else {
							i = i.toLowerCase()
						}
						return i
					})
					.join('')
			} else {
				return rawString
			}
		}

		static dashedToCamelCase(rawString: string): string {
			const keyBlocks: Array<string> = rawString.split(/-/)
			if (keyBlocks.length > 1) {
				return keyBlocks
					.map((i) => {
						i = i.toLowerCase()
						i = i.slice(0, 1).toUpperCase() + i.slice(1)
						return i
					})
					.join('')
			} else {
				return rawString
			}
		}

		static mixedCaseToDashed(mixedCased: string): string {
			const keyBlocks: Array<string> = mixedCased.split(/(?=[A-Z])/)
			return keyBlocks.map((i) => i.toLowerCase()).join('-')
		}

		public import(configVO: any): void {
			const version = configVO._version || this._version
			if (version === CasparCGVersion.V207) {
				this.importFromV207VO(configVO)
			} else if (version === CasparCGVersion.V210) {
				this.importFromV210VO(configVO)
			} else {
				throw new Error(`Unsupported CasparCGVersion in 'configVO': {$version}`)
			}
		}

		public importFromV207VO(configVO: any): void {
			// root level
			this.importValues(configVO, this, [
				'log-level',
				'channel-grid',
				'auto-deinterlace',
				'auto-transcode',
				'pipeline-tokens',
			])

			// paths
			this.importValues(configVO.paths, this.paths, [
				'media-path',
				'log-path',
				'data-path',
				'template-path',
				'thumbnails-path',
			])

			// channels
			this.findListMembers(configVO, 'channels').forEach((i) => {
				const channel: v2xx.Channel = new v2xx.Channel()
				this.importValues(i, channel, ['video-mode', 'channel-layout', 'straight-alpha-output'])
				this.findListMembers(i, 'consumers').forEach((o: any) => {
					const consumerName: string = CasparCGConfig.dashedToCamelCase(o['_type']) + 'Consumer'
					this.importListMembers(o, consumerName, v21x)
					channel.consumers.push(o as v2xx.Consumer)
				})
				this.channels.push(channel)
			})

			// controllers
			this.findListMembers(configVO, 'controllers').forEach((i) => {
				const controller: v2xx.Controller = new v2xx.Controller()
				this.importAllValues(i, controller)
				this.controllers.push(controller)
			})

			// mixer
			this.importValues(configVO.mixer, this.mixer, [
				'blend-modes',
				'mipmapping-default-on',
				'straight-alpha',
				'chroma-key',
			])

			// templatehosts
			this.findListMembers(configVO, 'template-hosts').forEach((i) => {
				const templateHost: v2xx.TemplateHost = new v2xx.TemplateHost()
				this.importAllValues(i, templateHost)
				this.templateHosts.push(templateHost)
			})

			// flash
			this.importValues(configVO.flash, this.flash, ['buffer-depth'])

			// thumbnails
			this.importValues(configVO.thumbnails, this.thumbnails, [
				'generate-thumbnails',
				'width',
				'height',
				'video-grid',
				'scan-interval-millis',
				'generate-delay-millis',
				'video-mode',
				'mipmap',
			])

			// osc
			this.importValues(configVO.osc, this.osc, ['default-port'])
			this.findListMembers(configVO.osc, 'predefined-clients').forEach((i) => {
				const client: v2xx.OscClient = new v2xx.OscClient()
				this.importAllValues(i, client)
				this.osc.predefinedClients.push(client)
			})

			// audio
			if ('audio' in configVO) {
				if ('channelLayouts' in configVO['audio']) {
					this.audio.channelLayouts = new Array<v21x.ChannelLayout>()
					configVO['audio']['channelLayouts'].forEach((i: v207.ChannelLayout) => {
						const channelLayout: v21x.ChannelLayout = new v21x.ChannelLayout()
						channelLayout._type = i._type
						channelLayout.channelOrder = i.channels
						channelLayout.name = i.name
						channelLayout.numChannels = i.numChannels
						channelLayout.type = i.type
						this.audio.channelLayouts.push(channelLayout)
					})
				}
				if ('mixConfigs' in configVO['audio']) {
					this.audio.mixConfigs = new Array<Intermediate.MixConfig>()
					configVO['audio']['mixConfigs'].forEach((i: v207.MixConfig) => {
						const mixConfig: Intermediate.MixConfig = new Intermediate.MixConfig()
						mixConfig._type = i._type
						mixConfig.fromType = i.from
						mixConfig.toTypes = i.to
						mixConfig.mix = { mixType: i.mix, destinations: {} }

						// convert 2.0.x mix-config to 2.1.x
						const destinations: { [destination: string]: Array<{ source: string; expression: string }> } =
							{}
						let mapSections: RegExpMatchArray | null
						for (let o = 0; o < i.mappings.length; o++) {
							mapSections = i.mappings[o].match(/(\S+)\s+(\S+)\s+(\S+)/)
							if (mapSections !== null) {
								const src: string = mapSections[1]
								const dst: string = mapSections[2]
								const expr: string = mapSections[3]

								if (!(dst in destinations)) {
									destinations[dst] = []
								}
								destinations[dst].push({ source: src, expression: expr })
							}
						}

						mixConfig.mix.destinations = destinations
						this.audio.mixConfigs.push(mixConfig)
					})
				}
			}
		}

		public importFromV210VO(configVO: any): void {
			// root level
			this.importValues(configVO, this, [
				'lockClear-phrase',
				'log-level',
				'log-categories',
				'force-deinterlace',
				'channel-grid',
				'accelerator',
			])

			// paths
			this.importValues(configVO.paths, this.paths, [
				'media-path',
				'log-path',
				'data-path',
				'template-path',
				'thumbnail-path',
				'font-path',
			])

			// channels
			this.findListMembers(configVO, 'channels').forEach((i) => {
				const channel: v2xx.Channel = new v2xx.Channel()
				this.importValues(i, channel, ['video-mode', 'channel-layout', 'straight-alpha-output'])
				this.findListMembers(i, 'consumers').forEach((o: any) => {
					const consumerName: string = CasparCGConfig.dashedToCamelCase(o['_type']) + 'Consumer'
					this.importListMembers(o, consumerName, v21x)
					channel.consumers.push(o as v2xx.Consumer)
				})
				this.channels.push(channel)
			})

			// controllers
			this.findListMembers(configVO, 'controllers').forEach((i) => {
				const controller: v2xx.Controller = new v2xx.Controller()
				this.importAllValues(i, controller)
				this.controllers.push(controller)
			})

			// mixer
			this.importValues(configVO['mixer'], this.mixer, ['blend-modes', 'mipmapping-default-on', 'straight-alpha'])

			// templatehosts
			this.findListMembers(configVO, 'template-hosts').forEach((i) => {
				const templateHost: v2xx.TemplateHost = new v2xx.TemplateHost()
				this.importAllValues(i, templateHost)
				this.templateHosts.push(templateHost)
			})

			// flash
			this.importValues(configVO.flash, this.flash, ['buffer-depth'])

			// html
			this.importValues(configVO.html, this.html, ['remote-debugging-port'])

			// thumbnails
			this.importValues(configVO.thumbnails, this.thumbnails, [
				'generate-thumbnails',
				'width',
				'height',
				'video-grid',
				'scan-interval-millis',
				'generate-delay-millis',
				'video-mode',
				'mipmap',
			])

			// osc
			this.importValues(configVO.osc, this.osc, ['default-port', 'disable-send-to-amcp-clients'])
			this.findListMembers(configVO.osc, 'predefined-clients').forEach((i) => {
				const client: v2xx.OscClient = new v2xx.OscClient()
				this.importAllValues(i, client)
				this.osc.predefinedClients.push(client)
			})

			// audio
			if ('audio' in configVO) {
				if ('channelLayouts' in configVO['audio']) {
					this.audio.channelLayouts = configVO['audio']['channelLayouts']
				}
				if ('mixConfigs' in configVO['audio']) {
					this.audio.mixConfigs = new Array<Intermediate.MixConfig>()
					configVO['audio']['mixConfigs'].forEach((i: v21x.MixConfig) => {
						const mixConfig: Intermediate.MixConfig = new Intermediate.MixConfig()
						mixConfig._type = i._type
						mixConfig.fromType = i.fromType
						mixConfig.toTypes = i.toTypes

						const destinations: { [destination: string]: Array<{ source: string; expression: string }> } =
							{}
						const mixType: string = i.mix.match(/&lt;|</g) !== null ? 'average' : 'add'
						let src: string
						let dest: string
						let expr: string
						i.mix
							.split('|')
							.map((i) => i.replace(/^\s*|\s*$/g, ''))
							.forEach((o) => {
								const srcDstSplit = o.split(/&lt;|<|=/)
								dest = srcDstSplit[0].replace(/^\s*|\s*$/g, '')
								destinations[dest] = []
								srcDstSplit[1].split('+').forEach((u) => {
									const exprSplit: Array<string> = u.split('*')
									if (exprSplit.length > 1) {
										expr = exprSplit[0].replace(/^\s*|\s*$/g, '')
										src = exprSplit[1].replace(/^\s*|\s*$/g, '')
									} else {
										src = exprSplit[0].replace(/^\s*|\s*$/g, '')
										expr = '1.0'
									}
									destinations[dest].push({ source: src, expression: expr })
								})
							})
						mixConfig.mix = { mixType: mixType, destinations: destinations }
						this.audio.mixConfigs.push(mixConfig)
					})
				}
			}
		}

		public get VO(): Config207VO | Config210VO {
			if (this._version === CasparCGVersion.V207) {
				return this.v207VO
			} else if (this._version === CasparCGVersion.V210) {
				return this.v210VO
			}
			throw new Error('@todo') // @todo: throw
		}

		public get vo(): Config207VO | Config210VO {
			return this.VO
		}

		public get v207VO(): Config207VO {
			// let configVO: Config207VO = {};
			const configVO: Config207VO = new Config207VO()
			configVO._version = this._version || CasparCGVersion.V207

			// paths
			configVO.paths = new v207.Paths()
			configVO.paths.dataPath = this.paths.dataPath
			configVO.paths.logPath = this.paths.logPath
			configVO.paths.mediaPath = this.paths.mediaPath
			configVO.paths.templatePath = this.paths.templatePath
			configVO.paths.thumbnailsPath = this.paths.thumbnailPath

			// channels
			configVO.channels = this.channels

			// controllers
			configVO.controllers = this.controllers

			// single values on root
			configVO.logLevel = this.logLevel
			configVO.autoDeinterlace = this.autoDeinterlace
			configVO.autoTranscode = this.autoTranscode
			configVO.pipelineTokens = this.pipelineTokens
			configVO.channelGrid = this.channelGrid

			// mixer
			configVO.mixer = new v207.Mixer()
			configVO.mixer.blendModes = this.mixer.blendModes
			if (this.mixer.chromaKey) configVO.mixer.chromaKey = this.mixer.chromaKey
			configVO.mixer.mipmappingDefaultOn = this.mixer.mipmappingDefaultOn
			configVO.mixer.straightAlpha = this.mixer.straightAlpha

			// flash
			configVO.flash = this.flash

			// template hosts
			configVO.templateHosts = this.templateHosts

			// thumbnails
			configVO.thumbnails = this.thumbnails

			// osc
			configVO.osc = new v2xx.Osc()
			if (this.osc.defaultPort) configVO.osc.defaultPort = this.osc.defaultPort
			if (this.osc.predefinedClients) configVO.osc.predefinedClients = this.osc.predefinedClients

			// audio
			configVO.audio = new v207.Audio()
			this.audio.channelLayouts.forEach((i) => {
				const channelLayout: v207.ChannelLayout = new v207.ChannelLayout()
				channelLayout.name = i.name
				channelLayout.numChannels = i.numChannels
				channelLayout.type = i.type
				channelLayout.channels = i.channelOrder
				configVO.audio.channelLayouts.push(channelLayout)
			})

			this.audio.mixConfigs.forEach((i) => {
				const mixConfig: v207.MixConfig = new v207.MixConfig()
				mixConfig.from = i.fromType
				mixConfig.to = i.toTypes
				mixConfig.mix = i.mix.mixType
				for (const o in i.mix.destinations) {
					i.mix.destinations[o].forEach((u) => {
						mixConfig.mappings.push([u.source, o, u.expression].join(' '))
					})
				}
				configVO.audio.mixConfigs.push(mixConfig)
			})

			return configVO
		}

		public get v210VO(): Config210VO {
			const configVO: Config210VO = new Config210VO()
			configVO._version = this._version || CasparCGVersion.V210

			// paths
			configVO.paths = this.paths

			// channels
			configVO.channels = this.channels

			// controllers
			configVO.controllers = this.controllers

			// single values on root
			if (typeof this.lockClearPhrase === 'string') configVO.lockClearPhrase = this.lockClearPhrase
			configVO.logLevel = this.logLevel
			configVO.logCategories = this.logCategories
			configVO.forceDeinterlace = this.forceDeinterlace
			configVO.channelGrid = this.channelGrid
			configVO.accelerator = this.accelerator

			// mixer
			configVO.mixer = new v21x.Mixer()
			configVO.mixer.blendModes = this.mixer.blendModes
			configVO.mixer.mipmappingDefaultOn = this.mixer.mipmappingDefaultOn
			configVO.mixer.straightAlpha = this.mixer.straightAlpha

			// flash
			configVO.flash = this.flash

			// html
			configVO.html = this.html

			// template hosts
			configVO.templateHosts = this.templateHosts

			// thumbnails
			configVO.thumbnails = this.thumbnails

			// osc
			configVO.osc = this.osc

			// audio
			configVO.audio = new v21x.Audio()
			configVO.audio.channelLayouts = this.audio.channelLayouts
			this.audio.mixConfigs.forEach((i) => {
				const mixConfig: v21x.MixConfig = new v21x.MixConfig()
				mixConfig.fromType = i.fromType
				mixConfig.toTypes = i.toTypes
				let mixOperator: string
				const destinationStrings: Array<string> = []
				for (const o in i.mix.destinations) {
					const destinationSubStrings: Array<string> = []
					const destinations = i.mix.destinations[o]
					mixOperator = destinations.length > 1 && i.mix.mixType === 'average' ? '<' : '='
					destinations.forEach((u) => {
						destinationSubStrings.push(u.expression === '1.0' ? u.source : u.expression + '*' + u.source)
					})
					destinationStrings.push(o + ' ' + mixOperator + ' ' + destinationSubStrings.join(' + '))
				}
				mixConfig.mix = destinationStrings.join(' | ')
				configVO.audio.mixConfigs.push(mixConfig)
			})

			return configVO
		}

		public get XML(): Object | null {
			if (this._version === CasparCGVersion.V207) {
				return this.v207XML
			} else if (this._version === CasparCGVersion.V210) {
				return this.v210XML
			}
			return null // @todo: throw error
		}

		public get xml(): Object | null {
			return this.XML
		}

		public get v207XML(): any {
			const xml = XMLBuilder('configuration')

			// paths
			const paths: v207.Paths = new v207.Paths()
			paths.dataPath = this.paths.dataPath
			paths.logPath = this.paths.logPath
			paths.mediaPath = this.paths.mediaPath
			paths.templatePath = this.paths.templatePath
			paths.thumbnailsPath = this.paths.thumbnailPath
			CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele('paths'), paths) // , ["mediaPath", "logPath", "dataPath", "templatesPath", "thumbnailPath"]);

			// channels
			const channels = xml.ele('channels')
			this.channels.forEach((i) => {
				const channel = channels.ele('channel')
				CasparCGConfig.addFormattedXMLChildsFromObject(channel, i, ['_type', 'consumers', '_consumers'])

				// consumer
				const consumers = channel.ele('consumers')
				i.consumers.forEach((i) => {
					const consumer = consumers.ele(i._type)
					CasparCGConfig.addFormattedXMLChildsFromObject(consumer, i, ['_type'])
				})
			})

			// controllers
			const controllers = xml.ele('controllers')
			this.controllers.forEach((i) => {
				const controller = controllers.ele(i._type)
				CasparCGConfig.addFormattedXMLChildsFromObject(controller, i, ['_type'])
			})

			// all root-level single values
			CasparCGConfig.addFormattedXMLChildsFromArray(xml, this, [
				'logLevel',
				'autoDeinterlace',
				'autoTranscode',
				'pipelineTokens',
				'channelGrid',
			])

			// mixer
			if (this.mixer) {
				CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele('mixer'), this.mixer)
			}

			// flash
			if (this.flash) {
				CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele('flash'), this.flash)
			}

			// template hosts
			if (this.templateHosts && this.templateHosts.length > 0) {
				const templateHosts = xml.ele('template-hosts')
				this.templateHosts.forEach((i) => {
					const templatehost = templateHosts.ele(i._type)
					CasparCGConfig.addFormattedXMLChildsFromObject(templatehost, i, ['_type'])
				})
			}

			// thumbnails
			if (this.thumbnails) {
				CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele('thumbnails'), this.thumbnails)
			}

			// osc
			if (this.osc) {
				const osc = xml.ele('osc')
				osc.ele('default-port', this.osc.defaultPort)
				// predefined clients
				if (this.osc.predefinedClients && this.osc.predefinedClients.length > 0) {
					const predefinedClients = osc.ele('predefined-clients')
					this.osc.predefinedClients.forEach((i) => {
						// predefinedClients
						const client = predefinedClients.ele(i._type)
						CasparCGConfig.addFormattedXMLChildsFromObject(client, i, ['_type'])
					})
				}
			}

			// audio
			if (
				this.audio &&
				((this.audio.channelLayouts && this.audio.channelLayouts.length > 0) ||
					(this.audio.mixConfigs && this.audio.mixConfigs.length > 0))
			) {
				const audio = xml.ele('audio')
				if (this.audio.channelLayouts && this.audio.channelLayouts.length > 0) {
					const channelLayouts = audio.ele('channel-layouts')
					this.audio.channelLayouts.forEach((i) => {
						const channelLayout = channelLayouts.ele('channel-layout')
						if (i.name) channelLayout.att('name', i.name)
						if (i.type) channelLayout.att('type', i.type)
						if (i.numChannels) channelLayout.att('num-channels', i.numChannels)
						if (i.channelOrder) channelLayout.att('channels', i.channelOrder)
					})
				}

				if (this.audio.mixConfigs && this.audio.mixConfigs.length > 0) {
					const mixConfigs = audio.ele('mix-configs')
					this.audio.mixConfigs.forEach((i) => {
						const mixConfig = mixConfigs.ele('mix-config')
						mixConfig.ele('from', i.fromType)
						mixConfig.ele('to', i.toTypes)
						mixConfig.ele('mix', i.mix.mixType)
						const mappings = mixConfig.ele('mappings')
						for (const o in i.mix.destinations) {
							const destination: Array<{ source: string; expression: string }> = i.mix.destinations[o]
							destination.forEach((u) => {
								mappings.ele('mapping', u.source + ' ' + o + ' ' + u.expression)
							})
						}
					})
				}
			}
			return xml
		}

		public get v210XML(): any {
			const xml = XMLBuilder('configuration')
			// paths
			CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele('paths'), this.paths) // , ["mediaPath", "logPath", "dataPath", "templatePath", "thumbnailPath", "fontpath"]);

			// channels
			const channels = xml.ele('channels')
			this.channels.forEach((i) => {
				const channel = channels.ele('channel')
				CasparCGConfig.addFormattedXMLChildsFromObject(channel, i, ['_type', 'consumers', '_consumers'])

				// consumer
				const consumers = channel.ele('consumers')
				i.consumers.forEach((i) => {
					const consumer = consumers.ele(i._type)
					CasparCGConfig.addFormattedXMLChildsFromObject(consumer, i, ['_type'])
				})
			})

			// controllers
			const controllers = xml.ele('controllers')
			this.controllers.forEach((i) => {
				const controller = controllers.ele(i._type)
				CasparCGConfig.addFormattedXMLChildsFromObject(controller, i, ['_type'])
			})

			// all root-level single values
			CasparCGConfig.addFormattedXMLChildsFromArray(xml, this, [
				'lockClearPhrase',
				'logLevel',
				'logCategories',
				'forceDeinterlace',
				'channelGrid',
				'accelerator',
			])

			// mixer
			if (this.mixer) {
				const mixer = xml.ele('mixer')
				mixer.ele('blend-modes', this.mixer.blendModes)
				mixer.ele('mipmapping-default-on', this.mixer.mipmappingDefaultOn)
				mixer.ele('straight-alpha', this.mixer.straightAlpha)
			}

			// flash
			if (this.flash) {
				CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele('flash'), this.flash)
			}

			// html
			if (this.html) {
				CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele('html'), this.html)
			}

			// template hosts
			if (this.templateHosts && this.templateHosts.length > 0) {
				const templateHosts = xml.ele('template-hosts')
				this.templateHosts.forEach((i) => {
					const templatehost = templateHosts.ele(i._type)
					CasparCGConfig.addFormattedXMLChildsFromObject(templatehost, i, ['_type'])
				})
			}

			// thumbnails
			if (this.thumbnails) {
				CasparCGConfig.addFormattedXMLChildsFromObject(xml.ele('thumbnails'), this.thumbnails)
			}

			// osc
			if (this.osc) {
				const osc = xml.ele('osc')
				CasparCGConfig.addFormattedXMLChildsFromArray(osc, this.osc, [
					'defaultPort',
					'disableSendToAmcpClients',
				])
				// predefined clients
				if (this.osc.predefinedClients && this.osc.predefinedClients.length > 0) {
					const predefinedClients = osc.ele('predefined-clients')
					this.osc.predefinedClients.forEach((i) => {
						// predefinedClients
						const client = predefinedClients.ele(i._type)
						CasparCGConfig.addFormattedXMLChildsFromObject(client, i, ['_type'])
					})
				}
			}

			// audio
			if (
				this.audio &&
				((this.audio.channelLayouts && this.audio.channelLayouts.length > 0) ||
					(this.audio.mixConfigs && this.audio.mixConfigs.length > 0))
			) {
				const audio = xml.ele('audio')
				if (this.audio.channelLayouts && this.audio.channelLayouts.length > 0) {
					const channelLayouts = audio.ele('channel-layouts')
					this.audio.channelLayouts.forEach((i) => {
						const channelLayout = channelLayouts.ele('channel-layout')
						if (i.name) channelLayout.att('name', i.name)
						if (i.type) channelLayout.att('type', i.type)
						if (i.numChannels) channelLayout.att('num-channels', i.numChannels)
						if (i.channelOrder) channelLayout.att('channel-order', i.channelOrder)
					})
				}
				if (this.audio.mixConfigs && this.audio.mixConfigs.length > 0) {
					const mixConfigs = audio.ele('mix-configs')
					this.audio.mixConfigs.forEach((i) => {
						const mixStrings: Array<string> = []
						const mixOperator: string =
							i.mix.mixType === 'average' ? '<' : i.mix.mixType === 'add' ? '=' : ''
						let destination: Array<{ source: string; expression: string }>
						for (const o in i.mix.destinations) {
							destination = i.mix.destinations[o]
							if (destination.length > 1) {
								const subSourceStrings: Array<string> = []
								destination.forEach((u) => {
									subSourceStrings.push(
										u.expression === '1.0' ? u.source : u.expression.toString() + '*' + u.source
									)
								})
								mixStrings.push(o + ' ' + mixOperator + ' ' + subSourceStrings.join(' + '))
							} else {
								mixStrings.push(
									o +
										' = ' +
										(destination[0].expression === '1.0'
											? destination[0].source
											: destination[0].expression.toString() + '*' + destination[0].source)
								)
							}
						}

						mixConfigs
							.ele('mix-config')
							.att('from-type', i.fromType)
							.att('to-types', i.toTypes)
							.att('mix', mixStrings.join(' | '))
					})
				}
			}
			return xml
		}

		public get XMLString(): string {
			if (this._version === CasparCGVersion.V207) {
				return this.v207XMLString
			} else if (this._version === CasparCGVersion.V210) {
				return this.v210XMLString
			}
			return '' // @todo: throw error
		}

		public get v207XMLString(): string {
			return this.v207XML.end({ pretty: true })
		}

		public get v210XMLString(): string {
			return this.v210XML.end({ pretty: true })
		}

		public get _version(): CasparCGVersion | undefined {
			return this.__version
		}

		private importAllValues(sourceRoot: Object, destRoot: Object): void {
			const keys: Array<string> = []
			for (const i in sourceRoot) {
				keys.push(i)
			}
			this.importValues(sourceRoot, destRoot, keys)
		}

		private importValues(sourceRoot: any, destRoot: any, values: Array<string>): void {
			values.forEach((dashedKey) => {
				const camelKey = CasparCGConfig.dashedToMixedCase(dashedKey)
				// sets value if key is valid
				if (
					sourceRoot &&
					dashedKey in sourceRoot &&
					sourceRoot[dashedKey] !== undefined &&
					sourceRoot[dashedKey] !== null
				) {
					if (destRoot && camelKey in destRoot) {
						destRoot[camelKey] = sourceRoot[dashedKey] // @todo: type checking/reflection/cast??
					}
				} else if (
					sourceRoot &&
					camelKey in sourceRoot &&
					sourceRoot[camelKey] !== undefined &&
					sourceRoot[camelKey] !== null
				) {
					if (destRoot && camelKey in destRoot) {
						destRoot[camelKey] = sourceRoot[camelKey] // @todo: type checking/reflection/cast??
					}
				}
			})
		}

		private findListMembers(root: any, childKey: string): Array<Object> {
			const pairs: Array<Array<any>> = []
			for (const i in root) {
				pairs.push([i, root[i]])
			}
			childKey = CasparCGConfig.dashedToMixedCase(childKey)
			for (const i of pairs) {
				const outerKey: string = CasparCGConfig.dashedToMixedCase(i[0].toString())
				const outerValue: any = i[1]
				// filter top-level possible arrays
				if (childKey === outerKey) {
					const flatArray: Array<Object> = []
					for (const innerKey in outerValue) {
						const innerValue: any = outerValue[innerKey]
						if (typeof innerValue === 'object') {
							if (Array.isArray(innerValue)) {
								// multiple innervalues
								innerValue.forEach((o: any) => {
									if (typeof o !== 'object') {
										// "" string values, i.e. empty screen consumers
										o = {}
									}
									if (!o['_type']) {
										o['_type'] = innerKey
									}
									flatArray.push(o)
								})
							} else {
								// single inner object
								if (!innerValue['_type']) {
									innerValue['_type'] = innerKey
								}
								flatArray.push(innerValue)
							}
							// update outer member with transformed array of inner members
						} else {
							flatArray.push({ _type: innerKey })
						}
					}
					return flatArray
				}
			}
			return []
		}

		private importListMembers(root: Object, memberName: string, restrictedNamespace?: Object) {
			let namespace: any | undefined
			if (restrictedNamespace) {
				namespace = restrictedNamespace
			} else {
				if ((v21x as any)[memberName]) {
					namespace = v2xx
				} else if ((v207 as any)[memberName]) {
					namespace = v207
				} else if ((v2xx as any)[memberName]) {
					namespace = v2xx
				}
			}
			if (namespace && memberName in namespace) {
				const member: v2xx.Consumer = new namespace[memberName]()
				this.importAllValues(root, member)
			}
		}
	}
}
