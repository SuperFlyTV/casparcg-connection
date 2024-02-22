/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AMCPCommand, Commands } from './commands'
import { TransitionType } from './enums'
import {
	AddParameters,
	CallParameters,
	CgAddParameters,
	CGLayer,
	CgUpdateParameters,
	ClipParameters,
	DecklinkParameters,
	HtmlParameters,
	MixerTween,
	ProducerOptions,
	RemoveParameters,
	RouteParameters,
	TransitionParameters,
} from './parameters'

const commandNameSerializer = (command: Commands): string => command
const splitCommandSerializer = (command: Commands): string => command.split(' ')[0]
const splitCommandKeywordSerializer = (command: Commands): string => command.split(' ')[1]

const channelSerializer = (_command: Commands, { channel }: { channel: number }): string => channel + ''
const channelLayerSerializer = (_command: Commands, { channel, layer }: { channel: number; layer: number }): string =>
	`${channel}-${layer}`
const channelLayer2Serializer = (
	_command: Commands,
	{ channel2, layer2 }: { channel2: number; layer2: number }
): string => `${channel2}-${layer2}`
const channelLayerOptSerializer = (
	_command: Commands,
	{ channel, layer }: { channel: number; layer?: number }
): string => channel + (layer ? '-' + layer : '')

const clipCommandSerializer = (_command: Commands, { clip, loop, inPoint, seek, length, clearOn404 }: ClipParameters) =>
	(clip ? `"${clip}"` : '') +
	(loop === true ? ' LOOP' : '') +
	(inPoint !== undefined ? ' IN ' + inPoint : '') +
	(seek !== undefined ? ' SEEK ' + seek : '') +
	(length !== undefined ? ' LENGTH ' + length : '') +
	(clearOn404 === true ? ' CLEAR_ON_404' : '')
const decklinkCommandSerializer = (_: Commands, { device, format }: DecklinkParameters) =>
	'DECKLINK ' + device + (format ? ' FORMAT ' + format : '')
const htmlCommandSerializerr = (_: Commands, { url }: HtmlParameters) => '[html] ' + url
const routeCommandSerializer = (_: Commands, { route, mode, framesDelay }: RouteParameters) =>
	'route://' +
	route.channel +
	(route.layer !== undefined ? '-' + route.layer : '') +
	(mode ? '  ' + mode : '') +
	(framesDelay ? 'BUFFER ' + framesDelay : '')
const producerOptionsSerializer = (_: Commands, { vFilter, aFilter }: ProducerOptions) => {
	return [vFilter ? `VF "${vFilter}"` : undefined, aFilter ? `AF "${aFilter}"` : undefined]
		.filter((p) => p !== undefined)
		.join(' ')
}
const producerV21Serializer = (_: Commands, { channelLayout, vFilter }: ProducerOptions) => {
	return [vFilter ? 'FILTER ' + vFilter : undefined, channelLayout ? 'CHANNEL_LAYOUT ' + channelLayout : undefined]
		.filter((p) => p !== undefined)
		.join(' ')
}

const transitionOptSerializer = (_command: Commands, { transition }: { transition?: TransitionParameters }) =>
	(transition && transitionSerializer(transition)) || ''
const transitionSerializer = ({
	transitionType,
	duration,
	tween,
	direction,
	stingProperties,
}: TransitionParameters) => {
	if (transitionType === TransitionType.Sting) {
		const params = {
			MASK: stingProperties?.maskFile,
			OVERLAY: stingProperties?.overlayFile,
			TRIGGER_POINT: stingProperties?.delay,
			AUDIO_FADE_START: stingProperties?.audioFadeStart,
			AUDIO_FADE_DURATION: stingProperties?.audioFadeDuration,
		}

		return (
			'STING (' +
			Object.entries(params)
				.filter(([_, v]) => v !== undefined && v !== null)
				.map(([k, v]) => k + '=' + v)
				.join(' ') +
			')'
		)
	} else {
		return [transitionType, duration, tween, direction].filter((p) => p !== undefined).join(' ')
	}
}
const callAttributeSerializer = (_: Commands, { param, value }: CallParameters) =>
	param + (value !== undefined ? ' ' + value : '')
const consumerSerializer = (_: Commands, { consumer, parameters }: AddParameters) => consumer + ' ' + parameters
const removeSerializer = (_: Commands, { consumer }: RemoveParameters) => consumer + ''

const cgLayerSerializer = (_: Commands, { cgLayer }: CGLayer) => (cgLayer === undefined ? '1' : `${cgLayer}`)
const cgDataSerializer = (_: Commands, { data }: CgUpdateParameters | CgAddParameters) => {
	if (!data) {
		return ''
	} else if (typeof data === 'string') {
		return data
	} else {
		// Escape the data so that CasparCG can process it and send into templates:
		// * Escape \, $ and "
		// * Wrap in "-quotes
		return `"${JSON.stringify(data).replace(/[\\$"]/g, '\\$&')}"`
	}
}

const mixerTweenSerializer = (_: Commands, { tween, duration }: MixerTween) =>
	(duration || '') + (tween ? ' ' + tween : '')
const mixerSimpleValueSerializer = (_: Commands, { value }: { value: number | boolean | string }) =>
	value !== undefined ? (typeof value === 'boolean' ? (value ? '1' : '0') : value + '') : ''

const optional: <T, Y extends object>(fn: (command: T, params: Y) => string) => (command: T, params: Y) => string =
	(fn) => (command, params) => {
		const keys = Object.keys(params)

		if (keys.length > 2) {
			return fn(command, params)
		} else {
			return ''
		}
	}

type Serializers<C extends AMCPCommand> = {
	[command in C as command['command']]: Array<(c: command['command'], p: command['params']) => string>
}

export const serializers: Readonly<Serializers<AMCPCommand>> = {
	[Commands.Loadbg]: [
		commandNameSerializer,
		channelLayerSerializer,
		clipCommandSerializer,
		(_, { auto }) => (auto ? 'AUTO' : ''),
		producerOptionsSerializer,
		transitionOptSerializer,
	],
	[Commands.LoadbgDecklink]: [
		splitCommandSerializer,
		channelLayerSerializer,
		decklinkCommandSerializer,
		producerOptionsSerializer,
		transitionOptSerializer,
	],
	[Commands.LoadbgHtml]: [
		splitCommandSerializer,
		channelLayerSerializer,
		htmlCommandSerializerr,
		producerOptionsSerializer,
		transitionOptSerializer,
	],
	[Commands.LoadbgRoute]: [
		splitCommandSerializer,
		channelLayerSerializer,
		routeCommandSerializer,
		producerOptionsSerializer,
		transitionOptSerializer,
	],
	[Commands.Load]: [
		commandNameSerializer,
		channelLayerSerializer,
		clipCommandSerializer,
		producerOptionsSerializer,
		transitionOptSerializer,
	],
	[Commands.Play]: [
		commandNameSerializer,
		channelLayerSerializer,
		clipCommandSerializer,
		producerOptionsSerializer,
		transitionOptSerializer,
	],
	[Commands.PlayDecklink]: [
		splitCommandSerializer,
		channelLayerSerializer,
		decklinkCommandSerializer,
		producerOptionsSerializer,
		transitionOptSerializer,
	],
	[Commands.PlayHtml]: [
		splitCommandSerializer,
		channelLayerSerializer,
		htmlCommandSerializerr,
		producerOptionsSerializer,
		transitionOptSerializer,
	],
	[Commands.PlayRoute]: [
		splitCommandSerializer,
		channelLayerSerializer,
		routeCommandSerializer,
		producerOptionsSerializer,
		transitionOptSerializer,
	],
	[Commands.Pause]: [commandNameSerializer, channelLayerSerializer],
	[Commands.Resume]: [commandNameSerializer, channelLayerSerializer],
	[Commands.Stop]: [commandNameSerializer, channelLayerSerializer],
	[Commands.Clear]: [commandNameSerializer, channelLayerOptSerializer],
	[Commands.Call]: [commandNameSerializer, channelLayerSerializer, callAttributeSerializer],
	[Commands.Swap]: [commandNameSerializer, channelLayerSerializer, channelLayer2Serializer],

	[Commands.Add]: [commandNameSerializer, channelSerializer, consumerSerializer],
	[Commands.Remove]: [commandNameSerializer, channelSerializer, removeSerializer],
	[Commands.Print]: [commandNameSerializer, channelSerializer],

	[Commands.LogLevel]: [commandNameSerializer, (_, { level }) => level],
	[Commands.LogCategory]: [
		commandNameSerializer,
		(_: Commands, { category, enable }) => category + '' + (enable ? '1' : '0'),
	],
	[Commands.Set]: [
		commandNameSerializer,
		channelSerializer,
		(_: Commands, { variable, value }) => variable + ' ' + value,
	],
	[Commands.Lock]: [
		commandNameSerializer,
		channelSerializer,
		(_: Commands, { action, secret }) => action + (secret ? ' ' + secret : ''),
	],

	[Commands.DataStore]: [commandNameSerializer, (_, { name, data }) => name + ' ' + data],
	[Commands.DataRetrieve]: [commandNameSerializer, (_, { name }) => name],
	[Commands.DataList]: [commandNameSerializer, (_, { subDirectory }) => subDirectory || ''],
	[Commands.DataRemove]: [commandNameSerializer, (_, { name }) => name],

	[Commands.CgAdd]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		cgLayerSerializer,
		(_, { template, playOnLoad }) => `"${template}" ${playOnLoad ? '1' : '0'}`,
		cgDataSerializer,
	],
	[Commands.CgPlay]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		cgLayerSerializer,
	],
	[Commands.CgStop]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		cgLayerSerializer,
	],
	[Commands.CgNext]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		cgLayerSerializer,
	],
	[Commands.CgRemove]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		cgLayerSerializer,
	],
	[Commands.CgClear]: [splitCommandSerializer, channelLayerSerializer, splitCommandKeywordSerializer],
	[Commands.CgUpdate]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		cgLayerSerializer,
		cgDataSerializer,
	],
	[Commands.CgInvoke]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		cgLayerSerializer,
		(_, { method }) => method,
	],
	[Commands.CgInfo]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		cgLayerSerializer,
	],

	[Commands.MixerKeyer]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		(_, { keyer }) => (keyer ? '1' : '0'),
	],
	[Commands.MixerChroma]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		optional(
			(_, params) =>
				`${params.enable ? 1 : 0} ${params.targetHue} ${params.hueWidth} ${params.minSaturation} ${
					params.minBrightness
				} ${params.softness} ${params.spillSuppress} ${params.spillSuppressSaturation} ${params.showMask}`
		),
		mixerTweenSerializer,
	],
	[Commands.MixerBlend]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		mixerSimpleValueSerializer,
	],
	[Commands.MixerInvert]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		mixerSimpleValueSerializer,
	],
	[Commands.MixerOpacity]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		mixerSimpleValueSerializer,
		mixerTweenSerializer,
	],
	[Commands.MixerBrightness]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		mixerSimpleValueSerializer,
		mixerTweenSerializer,
	],
	[Commands.MixerSaturation]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		mixerSimpleValueSerializer,
		mixerTweenSerializer,
	],
	[Commands.MixerContrast]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		mixerSimpleValueSerializer,
		mixerTweenSerializer,
	],
	[Commands.MixerLevels]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		optional((_, params) =>
			[params.minInput, params.maxInput, params.gamma, params.minOutput, params.maxOutput].join(' ')
		),
		mixerTweenSerializer,
	],
	[Commands.MixerFill]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		optional((_, params) => [params.x, params.y, params.xScale, params.yScale].join(' ')),
		mixerTweenSerializer,
	],
	[Commands.MixerClip]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		optional((_, params) => [params.x, params.y, params.width, params.height].join(' ')),
		mixerTweenSerializer,
	],
	[Commands.MixerAnchor]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		optional((_, params) => [params.x, params.y].join(' ')),
		mixerTweenSerializer,
	],
	[Commands.MixerCrop]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		optional((_, params) => [params.left, params.top, params.right, params.bottom].join(' ')),
		mixerTweenSerializer,
	],
	[Commands.MixerRotation]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		mixerSimpleValueSerializer,
		mixerTweenSerializer,
	],
	[Commands.MixerPerspective]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		optional((_, params) =>
			[
				params.topLeftX,
				params.topLeftY,
				params.topRightX,
				params.topRightY,
				params.bottomRightX,
				params.bottomRightY,
				params.bottomLeftX,
				params.bottomLeftY,
			].join(' ')
		),
		mixerTweenSerializer,
	],
	[Commands.MixerMipmap]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		mixerSimpleValueSerializer,
	],
	[Commands.MixerVolume]: [
		splitCommandSerializer,
		channelLayerSerializer,
		splitCommandKeywordSerializer,
		mixerSimpleValueSerializer,
		mixerTweenSerializer,
	],
	[Commands.MixerMastervolume]: [
		splitCommandSerializer,
		channelSerializer,
		splitCommandKeywordSerializer,
		mixerSimpleValueSerializer,
		mixerTweenSerializer,
	],
	[Commands.MixerStraightAlphaOutput]: [
		splitCommandSerializer,
		channelSerializer,
		splitCommandKeywordSerializer,
		mixerSimpleValueSerializer,
	],
	[Commands.MixerGrid]: [
		splitCommandSerializer,
		channelSerializer,
		splitCommandKeywordSerializer,
		mixerSimpleValueSerializer,
		mixerTweenSerializer,
	],
	[Commands.MixerCommit]: [splitCommandSerializer, channelSerializer, splitCommandKeywordSerializer],
	[Commands.MixerClear]: [splitCommandSerializer, channelLayerOptSerializer, splitCommandKeywordSerializer],

	[Commands.ChannelGrid]: [commandNameSerializer],

	[Commands.ThumbnailList]: [commandNameSerializer, (_, { subDirectory }) => subDirectory ?? ''],
	[Commands.ThumbnailRetrieve]: [commandNameSerializer, (_, { filename }) => filename],
	[Commands.ThumbnailGenerate]: [commandNameSerializer, (_, { filename }) => filename],
	[Commands.ThumbnailGenerateAll]: [commandNameSerializer],

	[Commands.Cinf]: [commandNameSerializer, (_, { filename }) => filename],
	[Commands.Cls]: [commandNameSerializer, (_, { subDirectory }) => subDirectory ?? ''],
	[Commands.Fls]: [commandNameSerializer],
	[Commands.Tls]: [commandNameSerializer, (_, { subDirectory }) => subDirectory ?? ''],
	[Commands.Version]: [commandNameSerializer],
	[Commands.Info]: [commandNameSerializer],
	[Commands.InfoChannel]: [splitCommandSerializer, channelSerializer],
	[Commands.InfoLayer]: [splitCommandSerializer, channelLayerSerializer],
	[Commands.InfoTemplate]: [commandNameSerializer, (_, { template }) => template],
	[Commands.InfoConfig]: [commandNameSerializer],
	[Commands.InfoPaths]: [commandNameSerializer],
	[Commands.InfoSystem]: [commandNameSerializer],
	[Commands.InfoServer]: [commandNameSerializer],
	[Commands.InfoQueues]: [commandNameSerializer],
	[Commands.InfoThreads]: [commandNameSerializer],
	[Commands.InfoDelay]: [commandNameSerializer, channelLayerOptSerializer],
	[Commands.Diag]: [commandNameSerializer],
	[Commands.GlInfo]: [commandNameSerializer],
	[Commands.GlGc]: [commandNameSerializer],
	[Commands.Bye]: [commandNameSerializer],
	[Commands.Kill]: [commandNameSerializer],
	[Commands.Restart]: [commandNameSerializer],
	[Commands.Ping]: [commandNameSerializer],
	[Commands.Begin]: [commandNameSerializer],
	[Commands.Commit]: [commandNameSerializer],
	[Commands.Discard]: [commandNameSerializer],
}

export const serializersV21: Readonly<Serializers<AMCPCommand>> = {
	...serializers,
	[Commands.Loadbg]: [
		commandNameSerializer,
		channelLayerSerializer,
		clipCommandSerializer,
		(_, { auto }) => (auto ? 'AUTO' : ''),
		producerV21Serializer,
		transitionOptSerializer,
	],
	[Commands.LoadbgDecklink]: [
		splitCommandSerializer,
		channelLayerSerializer,
		decklinkCommandSerializer,
		producerV21Serializer,
		transitionOptSerializer,
	],
	[Commands.LoadbgHtml]: [
		splitCommandSerializer,
		channelLayerSerializer,
		htmlCommandSerializerr,
		producerV21Serializer,
		transitionOptSerializer,
	],
	[Commands.LoadbgRoute]: [
		splitCommandSerializer,
		channelLayerSerializer,
		routeCommandSerializer,
		producerV21Serializer,
		transitionOptSerializer,
	],
	[Commands.Load]: [
		commandNameSerializer,
		channelLayerSerializer,
		clipCommandSerializer,
		producerV21Serializer,
		transitionOptSerializer,
	],
	[Commands.Play]: [
		commandNameSerializer,
		channelLayerSerializer,
		clipCommandSerializer,
		producerV21Serializer,
		transitionOptSerializer,
	],
	[Commands.PlayDecklink]: [
		splitCommandSerializer,
		channelLayerSerializer,
		decklinkCommandSerializer,
		producerV21Serializer,
		transitionOptSerializer,
	],
	[Commands.PlayHtml]: [
		splitCommandSerializer,
		channelLayerSerializer,
		htmlCommandSerializerr,
		producerV21Serializer,
		transitionOptSerializer,
	],
	[Commands.PlayRoute]: [
		splitCommandSerializer,
		channelLayerSerializer,
		routeCommandSerializer,
		producerV21Serializer,
		transitionOptSerializer,
	],
}
