import { protocolLogic, paramProtocol, responseProtocol } from './AMCP'
import { CasparCGSocketResponse } from './CasparCGSocketResponse'
import { ResponseSignature } from './ResponseSignature'
import { IResponseValidator } from './ResponseValidators'
import { IResponseParser } from './ResponseParsers'
import { Payload, PayloadVO, Param, ParamData, IParamSignature } from './ParamSignature'
import { positiveNumberValidatorBetween } from './ParamValidators'
import { IProtocolLogic } from './ProtocolLogic'
import { ICommandStatusCallback } from './global/Callback'
import { Command } from './ServerStateEnum'

/**
 *
 */
export interface IAMCPResponse {
	command: Command
	code: number
	raw: string
	// data: CommandOptions
	toString(): string
}

/**
 *
 */
export class AMCPResponse implements IAMCPResponse {
	public command: Command
	public code: number
	public raw: string
	// public data: CommandOptions

	public toString(): string {
		return this.raw.replace(/\r?\n|\r/gi, '')
	}
}

export class AMCPError extends Error {
	public res: IAMCPResponse
	constructor (res: IAMCPResponse) {
		super(`Error response from CasparCG: ${res.raw}`)
		this.res = res
	}
	get code(): number {
		return this.res.code
	}
}

/**
 *
 */
export enum IAMCPStatus {
	Invalid = 'INVALID',
	New = 'NEW',
	Initialized = 'INITIALIZED',
	Queued = 'QUEUED',
	Sending = 'SENDING',
	Sent = 'SENT',
	Succeeded = 'SUCCEEDED',
	Failed = 'FAILED',
	Timeout = 'TIMEOUT'
}

/**
 *
 */
export interface IAMCPCommandData {
	address: string
	channel: number
	layer: number
	payload: PayloadVO
	response: IAMCPResponse
	status: IAMCPStatus
	id: string
	readonly name: string
}

/**
 *
 */
export interface IAMCPCommandVO extends IAMCPCommandData {
	_commandName: string
	_objectParams: Param
	_stringParamsArray: Array<string>
}

export interface CommandOptions {
	command?: Command
}

export interface Result<RES extends CommandOptions> {
	response: IAMCPResponse
	details: RES
}

/**
 *
 */
export interface IAMCPCommand<C extends Command, REQ extends CommandOptions, RES extends REQ> extends IAMCPCommandData {
	paramProtocol: Array<IParamSignature>
	protocolLogic: Array<IProtocolLogic>
	responseProtocol: ResponseSignature<RES>
	onStatusChanged: ICommandStatusCallback
	token: string
	params: REQ
	result: Promise<Result<RES>> // avoid clashes
	command: C
	resolveSent: (command: IAMCPCommand<C, REQ, RES>) => void
	rejectSent: (error: Error) => void
	resolveRcvd: (details: Result<RES>) => void
	rejectRcvd: (error: Error) => void
	getParam: (name: string) => string | number | boolean | Object | undefined
	validateParams(): boolean
	validateResponse(response: CasparCGSocketResponse): boolean | RES
	serialize(): IAMCPCommandVO
	populate(cmdVO: IAMCPCommandVO, id: string): void
}

/**
 *
 */
export class AMCPCommand<C extends Command, REQ extends CommandOptions, RES extends REQ> implements IAMCPCommand<C, REQ, RES> {
	response: IAMCPResponse = new AMCPResponse()
	paramProtocol: Array<IParamSignature>
	responseProtocol: ResponseSignature<RES> = new ResponseSignature()
	onStatusChanged: ICommandStatusCallback
	command: C
	resolveSent: (command: IAMCPCommand<C, REQ, RES>) => void
	rejectSent: (error: Error) => void
	resolveRcvd: (details: Result<RES>) => void
	rejectRcvd: (error: Error) => void
	params: REQ
	result: Promise<Result<RES>> = new Promise<Result<RES>>((resolve, reject) => {
		this.resolveRcvd = resolve
		this.rejectRcvd = reject
	})
	protected _channel: number
	protected _layer: number
	protected _id: string
	protected _payload: PayloadVO = {}
	protected _stringParamsArray: Array<string>
	protected _objectParams: Param
	protected _token: string
	private _status: IAMCPStatus = IAMCPStatus.New

	// @todo: add concept of "variants", adding an ENUM to variants of the same (query) verb-command. INFO x INFO y, but not Thumbnail Retriece and thumbnail generate, different verbs
	// not LOG (action, not query)
	// INFO, HELP

	// @todo:
	// channel vs layer-specific vs layer-fallback addresses
	// NB.: INFO BOTH LAYER AND CHANNEL!!!!!!!!
	// INFO, SWAP, REMOVE, MIXER CLEAR, CLEAR,

	// param getter/setters
	// param list (dynamic)
	// media info/template file-type to generate param data for fields

	/**
	 *
	 */
	constructor(params: REQ, public context?: Object) {
		// parse params to objects
		if (params.command) {
			this.command = params.command as C
			this.paramProtocol = paramProtocol.has(this.command) ? paramProtocol.get(this.command) as IParamSignature[] : []
			if (responseProtocol.has(this.command)) {
				this.responseProtocol = responseProtocol.get(this.command) as ResponseSignature<RES>
			}
		}
		this.params = params
		this._stringParamsArray = []
		this._objectParams = {}
		this._token = Math.random().toString(35).substr(2, 7)

		this._objectParams = Object.assign({}, params)
	}

	/**
	 *
	 */
	public validateParams(): boolean {
		let required: Array<IParamSignature> = this.paramProtocol ? this.paramProtocol.filter(signature => signature.required.valueOf() === true) : []
		let optional: Array<IParamSignature> = this.paramProtocol ? this.paramProtocol.filter(signature => signature.required.valueOf() === false) : []

		console.log('<<< validating required')

		// check all required
		for (let signature of required) {
			if (!this.validateParam(signature)) {
				return false
			}
		}

		console.log('<<< validating optional')

		// add valid optionals
		optional.forEach((signature) => {
			this.validateParam(signature)
		})

		console.log('<<< validating protocol logic')

		if (!this.validateProtocolLogic()) {
			return false
		}

		console.log('<<< validated protocol logic')

		let validParams: Array<IParamSignature> = this.paramProtocol ? this.paramProtocol.filter((param) => param.resolved && param.payload !== null) : []
		let invalidParams: Array<IParamSignature> = this.paramProtocol ? this.paramProtocol.filter((param) => param.resolved && param.payload === null && param.required.valueOf() === true) : []

		if (invalidParams.length > 0) {
			return false
		}

		validParams.forEach((param) => {
			let payload: Payload = { key: '', value: {}, raw: null }
			payload.key = param.key || ''
			payload.value = param.payload !== null ? param.payload : {}
			payload.raw = param.raw
			this.payload[param.name] = payload
		})

		return true
	}

	public getParam(name: string): string | number | boolean | Object | undefined {
		if (this._objectParams[name]) {
			return this._objectParams[name]
		}
		return undefined
	}

	/**
	 *
	 */
	public validateResponse(response: CasparCGSocketResponse): RES | boolean {
		// assign raw response
		this.response.raw = response.responseString
		this.response.code = response.statusCode

		// code is correct
		if (this.responseProtocol.code !== -1 && response.statusCode !== this.responseProtocol.code) {
			// @todo: fallbacks? multiple valid codes?
			return false
		}
		// data is valid
		let validData: boolean | RES = false
		if (this.responseProtocol.validator) { // @todo: typechecking ("class that implements....")
			const validator: IResponseValidator = this.responseProtocol.validator
			debugger
			validData = validator(response, this.command)
			if (validData === false) {
				return false
			}
		}

		// data gets parsed
		if (this.responseProtocol.parser && validData) { // @todo: typechecking ("class that implements....")
			const parser: IResponseParser<RES> = this.responseProtocol.parser
			validData = parser(response, this.command, this.context)
			if (!validData) {
				return false
			}

		}

		return validData
	}

	/**
	 *
	 */
	get payload(): PayloadVO {
		return this._payload
	}

	/**
	 *
	 */
	get id(): string {
		return this._id || (new Date().getTime() + Math.random() * 100).toString()
	}

	/**
	 *
	 */
	get name(): string {
		return this.command
	}

	/**
	 *
	 */
	get protocolLogic(): Array<IProtocolLogic> {
		// TODO: I suspect an error here;
		return (this.command && protocolLogic.has(this.command)) ? protocolLogic.get(this.command) as IProtocolLogic[] : []
	}

	/**
	 *
	 */
	get channel(): number {
		return -1
	}

	/**
	 *
	 */
	get layer(): number {
		return -1
	}

	/**
	 *
	 */
	get address(): string {
		return ''
	}

	get token(): string {
		return this._token
	}

	/**
	 *
	 */
	get status(): IAMCPStatus {
		return this._status
	}

	/**
	 *
	 */
	set status(code: IAMCPStatus) {
		if (code !== this._status) {
			this._status = code
			if (this.onStatusChanged) {
				this.onStatusChanged(this._status)
			}
		}
	}

	/**
	 *
	 */
	public serialize(): IAMCPCommandVO {
		return {
			channel: this.channel,
			layer: this.layer,
			payload: this.payload,
			response: this.response,
			status: this.status,
			_commandName: this.constructor['name'],
			_objectParams: this._objectParams,
			_stringParamsArray: this._stringParamsArray
		} as IAMCPCommandVO
	}

	/**
	 *
	 */
	populate(cmdVO: IAMCPCommandVO, id: string): void {
		this._stringParamsArray = cmdVO._stringParamsArray
		this._objectParams = cmdVO._objectParams
		this.response = cmdVO.response
		this._id = id
	}

	/**
	 *
	 */
	public toString(): string {
		let message: string = ''

		switch (this.status) {
			case IAMCPStatus.Invalid:
				message = 'Invalid command'
				break
			case IAMCPStatus.New:
				message = 'New command'
				break
			case IAMCPStatus.Queued:
				message = 'Queued command'
				break
			case IAMCPStatus.Sent:
				message = 'Sent command'
				break
			case IAMCPStatus.Succeeded:
				message = 'Succeeded command'
				break
			case IAMCPStatus.Failed:
				message = 'Failed command'
				break
		}

		return message
	}

	/**
	 *
	 */
	protected validateParam(signature: IParamSignature): boolean {
		let result: ParamData
		let param: Object | undefined

		debugger
		// objectParams parsing
		if (this._objectParams.hasOwnProperty(signature.name)) {
			param = this._objectParams[signature.name]
		} else {
			// stringParam parsing
			if (this._stringParamsArray.length > 0) {
				param = this._stringParamsArray
			} else {
				return false
			}
		}

		// filter out undefined object params
		if (param === undefined) {
			return false
		}
		result = signature.validation(param, (signature.key || signature.name))
		if (result !== false) {
			debugger
			signature.resolved = true
			if (typeof result === 'object' && result.hasOwnProperty('raw') && result.hasOwnProperty('payload')) {
				signature.payload = result.payload
				signature.raw = result.raw
			} else {
				signature.payload = result
			}
			return true
		} else {
			return false
		}
	}

	/**
	 *
	 */
	protected validateProtocolLogic(): boolean {

		if (!this.protocolLogic) {
			return true
		}

		let result: Array<IParamSignature>
		for (let rule of this.protocolLogic) {
			result = rule.resolve(this.paramProtocol)
			this.paramProtocol = result
		}
		return true
	}

	/**
	 *
	 */
	protected validateChannel(): number {
		let result: ParamData
		let validator = positiveNumberValidatorBetween(1, 9999)
		let param: number

		if (this._objectParams.hasOwnProperty('channel')) {
			param = Number(this._objectParams['channel'])
		} else {
			param = NaN
		}
		result = validator(param)
		if (result !== false) {
			return Number(result)
		}

		// @todo: dispatch error
		return NaN
	}

	/**
	 *
	 */
	protected validateLayer(fallback?: number): number {
		let result: ParamData
		let validator = positiveNumberValidatorBetween(0, 9999)
		let param: number

		if (this._objectParams.hasOwnProperty('layer')) {
			param = Number(this._objectParams['layer'])
		} else {
			param = fallback || NaN
		}
		result = validator(param)
		if (result !== false) {
			return Number(result)
		}

		// @todo: dispatch error
		return 0
	}
}

/**
 *
 */
export function isIAMCPCommand(object: any): object is IAMCPCommand<Command, CommandOptions, any> {
	// @todo: better inheritance type checking
	for (let prop in AMCPCommand.prototype) {
		if (object[prop] === undefined) {
			return false
		}
	}
	return true
}

/**
 *
 */
export class OrChannelOrLayerCommand<C extends Command, REQ extends CommandOptions, RES extends REQ> extends AMCPCommand<C, REQ, RES> {

	/**
	 *
	 */
	constructor(params: REQ, context?: Object) {
		super(params, context)
		let channel: number = this.validateChannel()
		let layer: number = this.validateLayer()
		if (channel) {
			this._channel = channel
			if (layer) {
				this._layer = layer
			}
		}
	}

	/**
	 *
	 */
	get channel(): number {
		return this._channel || -1
	}

	/**
	 *
	 */
	get layer(): number {
		return this._layer || -1
	}

	/**
	 *
	 */
	get address(): string {
		let address: string = ''

		if (this.channel && (this.channel > -1)) {
			address = this.channel.toString()
		} else {
			return address
		}
		if (this.layer && (this.layer > -1)) {
			address = `${address}-${this.layer}`
		}

		return address
	}
}

/**
 *
 */
export class ChannelCommand<C extends Command, REQ extends CommandOptions, RES extends REQ> extends AMCPCommand<C, REQ, RES> {
	/**
	 *
	 */
	constructor(params: REQ, context?: Object) {
		super(params, context)
		let channel: number = this.validateChannel()
		if (channel) {
			this._channel = channel
			this._layer = -1
		} else {
			throw new Error('Needs channel') // @todo: dispatch
		}
	}

	/**
	 *
	 */
	get channel(): number {
		return this._channel || -1
	}

	/**
	 *
	 */
	get layer(): number {
		return -1
	}

	/**
	 *
	 */
	get address(): string {
		if (this.channel) {
			return this.channel.toString()
		} else {
			return ''
			// @todo throw???
		}
	}
}

/**
 *
 */
export class LayerCommand<C extends Command, REQ extends CommandOptions, RES extends REQ> extends AMCPCommand<C, REQ, RES> {

	/**
	 *
	 */
	constructor(params: REQ, context?: Object) {
		super(params, context)
		let channel: number = this.validateChannel()
		let layer: number = this.validateLayer()
		if (channel && layer) {
			this._channel = channel
			this._layer = layer
		} else {
			throw new Error('Needs both channel and layer') // @todo: dispatch
		}
	}

	/**
	 *
	 */
	get channel(): number {
		return this._channel || -1
	}

	/**
	 *
	 */
	get layer(): number {
		return this._layer || -1
	}

	/**
	 *
	 */
	get address(): string {
		let address: string
		if (this.channel && (this.channel > -1)) {
			address = this.channel.toString()
		} else {
			return ''
			// @todo throw???
		}
		if (this.layer && (this.layer > -1)) {
			address = `${address}-${this.layer}`
		} else {
			return ''
			// @todo throw???
		}

		return address
	}
}

/**
 *
 */
export class ChannelOrLayerCommand<C extends Command, REQ extends CommandOptions, RES extends REQ> extends AMCPCommand<C, REQ, RES> {

	/**
	 *
	 */
	constructor(params: REQ, context?: Object) {
		super(params, context)
		let channel: number = this.validateChannel()
		let layer: number = this.validateLayer()

		if (channel) {
			this._channel = channel
			if (layer) {
				this._layer = layer
			}

		} else {
			throw new Error('Needs at least channel') // @todo: dispatch
		}
	}

	/**
	 *
	 */
	get channel(): number {
		return this._channel || -1
	}

	/**
	 *
	 */
	get layer(): number {
		return this._layer || -1
	}

	/**
	 *
	 */
	get address(): string {
		let address: string
		if (this.channel) {
			address = this.channel.toString()
		} else {
			return ''
			// @todo throw???
		}
		if (this.layer && (this.layer > -1)) {
			address = `${address}-${this.layer}`
		}

		return address
	}
}

/**
 *
 */
export class LayerWithFallbackCommand<C extends Command, REQ extends CommandOptions, RES extends REQ> extends AMCPCommand<C, REQ, RES> {

	/**
	 *
	 */
	constructor(params: REQ, context?: Object) {
		super(params, context)
		let channel: number = this.validateChannel()
		let layer: number = this.validateLayer(0)
		if (channel) {
			this._channel = channel
			this._layer = layer
		} else {
			throw new Error('Needs at least channel, layer will default to 0 if not specified') // @todo: dispatch
		}
		console.log('+++', this)
	}

	/**
	 *
	 */
	get channel(): number {
		return this._channel || -1
	}

	/**
	 *
	 */
	get layer(): number {
		return this._layer || -1
	}

	/**
	 *
	 */
	get address(): string {
		let address: string
		if (this.channel) {
			address = this.channel.toString()
		} else {
			return ''
			// @todo throw???
		}
		if (this.layer && (this.layer > -1)) {
			address = `${address}-${this.layer}`
		}

		return address
	}
}

/**
 *
 */
export class LayerWithCgFallbackCommand<C extends Command, REQ extends CommandOptions, RES extends REQ> extends AMCPCommand<C, REQ, RES> {

	/**
	 *
	 */
	constructor(params: REQ, context?: Object) {
		super(params, context)
		let channel: number = this.validateChannel()
		let layer: number = this.validateLayer(9999)
		if (channel) {
			this._channel = channel
			this._layer = layer
		} else {
			throw new Error('Needs at least channel, layer will default to 9999 if not specified') // @todo: dispatch
		}
	}

	/**
	 *
	 */
	get channel(): number {
		return this._channel || -1
	}

	/**
	 *
	 */
	get layer(): number {
		return this._layer || -1
	}

	/**
	 *
	 */
	get address(): string {
		let address: string
		if (this.channel) {
			address = this.channel.toString()
		} else {
			return ''
			// @todo throw???
		}
		if (this.layer && (this.layer > -1)) {
			address = `${address}-${this.layer}`
		}

		return address
	}
}

interface CommandConstructor<C extends Command, REQ extends CommandOptions, RES extends REQ> {
	new (options: REQ, context?: Object): IAMCPCommand<C, REQ, RES>
}

// TODO vary this with version
export const constructors: Map<Command, CommandConstructor<Command, CommandOptions, CommandOptions>> = new Map([
	[ Command.LOADBG, LayerWithFallbackCommand ],
	[ Command.LOAD, LayerWithFallbackCommand ],
	[ Command.PLAY, LayerWithFallbackCommand ],
	[ Command.PAUSE, LayerWithFallbackCommand ],
	[ Command.RESUME, LayerWithFallbackCommand ],
	[ Command.STOP, LayerWithFallbackCommand ],
	[ Command.CG_ADD, LayerWithCgFallbackCommand ],
	[ Command.CG_PLAY, LayerWithCgFallbackCommand ],
	[ Command.CG_STOP, LayerWithCgFallbackCommand ],
	[ Command.CG_NEXT, LayerWithCgFallbackCommand ],
	[ Command.CG_NEXT, LayerWithCgFallbackCommand ],
	[ Command.CG_REMOVE, LayerWithCgFallbackCommand ],
	[ Command.CG_CLEAR, LayerWithCgFallbackCommand ],
	[ Command.CG_UPDATE, LayerWithCgFallbackCommand ],
	[ Command.CG_INVOKE, LayerWithCgFallbackCommand ],
	[ Command.MIXER_KEYER, LayerWithFallbackCommand ],
	[ Command.MIXER_CHROMA, LayerWithFallbackCommand ],
	[ Command.MIXER_BLEND, LayerWithFallbackCommand ],
	[ Command.MIXER_INVERT, LayerWithFallbackCommand ],
	[ Command.MIXER_OPACITY, LayerWithFallbackCommand ],
	[ Command.MIXER_BRIGHTNESS, LayerWithFallbackCommand ],
	[ Command.MIXER_SATURATION, LayerWithFallbackCommand ],
	[ Command.MIXER_CONTRAST, LayerWithFallbackCommand ],
	[ Command.MIXER_LEVELS, LayerWithFallbackCommand ],
	[ Command.MIXER_FILL, LayerWithFallbackCommand ],
	[ Command.MIXER_CLIP, LayerWithFallbackCommand ],
	[ Command.MIXER_ANCHOR, LayerWithFallbackCommand ],
	[ Command.MIXER_CROP, LayerWithFallbackCommand ],
	[ Command.MIXER_ROTATION, LayerWithFallbackCommand ],
	[ Command.MIXER_PERSPECTIVE, LayerWithFallbackCommand ],
	[ Command.MIXER_MIPMAP, LayerWithFallbackCommand ],
	[ Command.MIXER_VOLUME, LayerWithFallbackCommand ],
	[ Command.MIXER_MASTERVOLUME, ChannelCommand ],
	[ Command.MIXER_STRAIGHT_ALPHA_OUTPUT, ChannelCommand ],
	[ Command.MIXER_GRID, ChannelCommand ],
	[ Command.MIXER_COMMIT, ChannelCommand ],
	[ Command.MIXER_COMMIT, ChannelCommand ],
	[ Command.MIXER_CLEAR, ChannelOrLayerCommand ],
	[ Command.CLEAR, ChannelOrLayerCommand ],
	[ Command.CALL, LayerWithFallbackCommand ],
	[ Command.SWAP, ChannelOrLayerCommand ],
	[ Command.ADD, ChannelCommand ],
	[ Command.REMOVE, ChannelCommand ],
	[ Command.PRINT, ChannelCommand ],
	[ Command.SET, ChannelCommand ],
	[ Command.LOCK, ChannelCommand ],
	[ Command.CHANNEL_GRID, AMCPCommand ],
	[ Command.GL_GC, AMCPCommand ],
	[ Command.DATA_STORE, AMCPCommand ],
	[ Command.DATA_RETRIEVE, AMCPCommand ],
	[ Command.DATA_LIST, AMCPCommand ],
	[ Command.DATA_REMOVE, AMCPCommand ],
	[ Command.THUMBNAIL_LIST, AMCPCommand ],
	[ Command.THUMBNAIL_RETRIEVE, AMCPCommand ],
	[ Command.THUMBNAIL_GENERATE, AMCPCommand ],
	[ Command.THUMBNAIL_GENERATE_ALL, AMCPCommand ],
	[ Command.CINF, AMCPCommand ],
	[ Command.CLS, AMCPCommand ],
	[ Command.FLS, AMCPCommand ],
	[ Command.TLS, AMCPCommand ],
	[ Command.VERSION, AMCPCommand ],
	[ Command.INFO, OrChannelOrLayerCommand ],
	[ Command.INFO_TEMPLATE, AMCPCommand ],
	[ Command.INFO_CONFIG, AMCPCommand ],
	[ Command.INFO_PATHS, AMCPCommand ],
	[ Command.INFO_SYSTEM, AMCPCommand ],
	[ Command.INFO_QUEUES, AMCPCommand ],
	[ Command.INFO_THREADS, AMCPCommand ],
	[ Command.INFO_DELAY, ChannelOrLayerCommand ],
	[ Command.CG_INFO, LayerWithCgFallbackCommand ],
	[ Command.GL_INFO, AMCPCommand ],
	[ Command.LOG_LEVEL, AMCPCommand ],
	[ Command.LOG_CATEGORY, AMCPCommand ],
	[ Command.DIAG, AMCPCommand ],
	[ Command.HELP, AMCPCommand ],
	[ Command.HELP_PRODUCER, AMCPCommand ],
	[ Command.HELP_CONSUMER, AMCPCommand ],
	[ Command.BYE, AMCPCommand ],
	[ Command.KILL, AMCPCommand ],
	[ Command.RESTART, AMCPCommand ],
	[ Command.PING, AMCPCommand ],
	[ Command.TIME, AMCPCommand ],
	[ Command.SCHEDULE_SET, AMCPCommand ],
	[ Command.SCHEDULE_LIST, AMCPCommand ],
	[ Command.SCHEDULE_CLEAR, AMCPCommand ],
	[ Command.SCHEDULE_REMOVE, AMCPCommand ],
	[ Command.SCHEDULE_INFO, AMCPCommand ],
	[ Command.TIMECODE_SOURCE, AMCPCommand ]
])

export function createCommand<C extends Command, REQ extends CommandOptions, RES extends REQ>(command: C, options: REQ, context?: Object): IAMCPCommand<C, REQ, RES> | undefined {
	let ctor = constructors.get(command) as CommandConstructor<C, REQ, RES>
	return ctor ? new ctor(options, context) : undefined
}
