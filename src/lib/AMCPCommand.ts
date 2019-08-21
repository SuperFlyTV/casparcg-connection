// AMCPUtilNS
import { CasparCGSocketResponse } from './AMCP'
// ResponseNS
import { Response as ResponseNS } from './ResponseSignature'
import ResponseSignature = ResponseNS.ResponseSignature
import { Response as ResponseValidatorNS } from './ResponseValidators'
import IResponseValidator = ResponseValidatorNS.IResponseValidator
import { Response as ResponseParserNS } from './ResponseParsers'
import IResponseParser = ResponseParserNS.IResponseParser
// Param NS
import { Payload, PayloadVO, Param, ParamData, IParamSignature } from './ParamSignature'
// Validation ND
import { PositiveNumberValidatorBetween } from './ParamValidators'
// Protocol NS
import { IProtocolLogic } from './ProtocolLogic'
// Callback NS
import { Callback as CallbackNS } from './global/Callback'
import ICommandStatusCallback = CallbackNS.ICommandStatusCallback

import { Command } from './ServerStateEnum'

/**
 *
 */
export interface IAMCPResponse {
	command: Command
	code: number
	raw: string
	data: any
	toString(): string
}

/**
 *
 */
export class AMCPResponse implements IAMCPResponse {
	public command: Command
	public code: number
	public raw: string
	public data: any

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
	Invalid = -1,
	New = 0,
	Initialized = 1,
	Queued = 2,
	Sent = 3,
	Suceeded = 4,
	Failed = 5,
	Timeout = 6
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

/**
 *
 */
export interface IAMCPCommand<C extends Command, REQ extends CommandOptions, RES extends REQ> extends IAMCPCommandData {
	paramProtocol: Array<IParamSignature>
	protocolLogic: Array<IProtocolLogic>
	responseProtocol: ResponseSignature
	onStatusChanged: ICommandStatusCallback
	token: string
	params: REQ
	result: Promise<RES & IAMCPResponse>
	command: C
	resolve: (command: IAMCPCommand<C, REQ, RES>) => void
	reject: (command: IAMCPCommand<C, REQ, RES>) => void
	getParam: (name: string) => string | number | boolean | Object | undefined
	validateParams(): boolean
	validateResponse(response: CasparCGSocketResponse): boolean
	serialize(): IAMCPCommandVO
	populate(cmdVO: IAMCPCommandVO, id: string): void
}

/**
 *
 */
export class AMCPCommand<C extends Command, REQ extends CommandOptions, RES extends REQ> implements IAMCPCommand<C, REQ, RES> {
	response: IAMCPResponse = new AMCPResponse()
	paramProtocol: Array<IParamSignature>
	responseProtocol: ResponseSignature = new ResponseSignature()
	onStatusChanged: ICommandStatusCallback
	command: C
	resolve: (command: IAMCPCommand<C, REQ, RES>) => void
	reject: (command: IAMCPCommand<C, REQ, RES>) => void
	params: REQ
	result: Promise<RES & IAMCPResponse>
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
	constructor(params: CommandOptions, public context?: Object) {
		// parse params to objects
		let paramsArray: Array<string | Param> = []
		if (params.command) this.command = params.command as C
		// conform params to array
		if (Array.isArray(params)) {
			paramsArray = params
		} else {
			paramsArray = [params as string | Param]
		}
		this._stringParamsArray = []
		this._objectParams = {}
		this._token = Math.random().toString(35).substr(2, 7)

		for (let element of paramsArray) {
			if (typeof element === 'string') {
				element = element.toString().trim()
				this._stringParamsArray = this._stringParamsArray.concat([...element.toString().split(/\s+/)]) // @todo: string delimiter pairing (,;) -> objectArray
			} else {
				for (let prop in element) {
					this._objectParams[prop] = element[prop]
				}
			}
		}
	}

	/**
	 *
	 */
	public validateParams(): boolean {
		let required: Array<IParamSignature> = this.paramProtocol ? this.paramProtocol.filter(signature => signature.required.valueOf() === true) : []
		let optional: Array<IParamSignature> = this.paramProtocol ? this.paramProtocol.filter(signature => signature.required.valueOf() === false) : []

		// check all required
		for (let signature of required) {
			if (!this.validateParam(signature)) {
				return false
			}
		}

		// add valid optionals
		optional.forEach((signature) => {
			this.validateParam(signature)
		})

		if (!this.validateProtocolLogic()) {
			return false
		}

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
	public validateResponse(response: CasparCGSocketResponse): boolean {
		// assign raw response
		this.response.raw = response.responseString
		this.response.code = response.statusCode

		// code is correct
		if (response.statusCode !== this.responseProtocol.code) {
			// @todo: fallbacks? multiple valid codes?
			return false
		}
		// data is valid
		let validData: Object = {}
		if (this.responseProtocol.validator) { // @todo: typechecking ("class that implements....")
			const validator: IResponseValidator = new this.responseProtocol.validator()
			validData = validator.resolve(response)
			if (validData === false) {
				return false
			}
		}

		// data gets parsed
		if (this.responseProtocol.parser && validData) { // @todo: typechecking ("class that implements....")
			const parser: IResponseParser = new this.responseProtocol.parser()
			parser.context = this.context
			validData = parser.parse(validData)
			if (validData === false) {
				return false
			}
		}

		this.response.data = validData
		return true
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
		return this.constructor.name
	}

	/**
	 *
	 */
	get protocolLogic(): Array<IProtocolLogic> {
		// TODO: I suspect an error here;
		return (this.constructor as any).protocolLogic || []
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
			case IAMCPStatus.Suceeded:
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
		result = signature.validation.resolve(param, (signature.key || signature.name))
		if (result !== false) {
			signature.validation.resolved = true
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
		let validator = new PositiveNumberValidatorBetween(1, 9999)
		let param: number

		if (this._objectParams.hasOwnProperty('channel')) {
			param = Number(this._objectParams['channel'])
		} else {
			param = NaN
		}
		result = validator.resolve(param)
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
		let validator = new PositiveNumberValidatorBetween(0, 9999)
		let param: number

		if (this._objectParams.hasOwnProperty('layer')) {
			param = Number(this._objectParams['layer'])
		} else {
			param = fallback || NaN
		}
		result = validator.resolve(param)
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
	constructor(params: CommandOptions, context?: Object) {
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
	constructor(params: CommandOptions, context?: Object) {
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
	constructor(params: CommandOptions, context?: Object) {
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
	constructor(params: CommandOptions, context?: Object) {
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
	constructor(params: CommandOptions, context?: Object) {
		super(params, context)
		let channel: number = this.validateChannel()
		let layer: number = this.validateLayer(0)
		if (channel) {
			this._channel = channel
			this._layer = layer
		} else {
			throw new Error('Needs at least channel, layer will default to 0 if not specified') // @todo: dispatch
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
export class LayerWithCgFallbackCommand<C extends Command, REQ extends CommandOptions, RES extends REQ> extends AMCPCommand<C, REQ, RES> {

	/**
	 *
	 */
	constructor(params: CommandOptions, context?: Object) {
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
	[ Command.LOADBG, LayerWithFallbackCommand ]
])

export function createCommand<C extends Command, REQ extends CommandOptions, RES extends REQ>(command: C, options: REQ, context?: Object): IAMCPCommand<C, REQ, RES> | undefined {
	let ctor = constructors.get(command) as CommandConstructor<C, REQ, RES>
	return ctor ? new ctor(options, context) : undefined
}
