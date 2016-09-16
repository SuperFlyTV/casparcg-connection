// AMCPUtilNS
import {AMCPUtil as AMCPUtilNS} from "./AMCP";
import CasparCGSocketResponse = AMCPUtilNS.CasparCGSocketResponse;
// ResponseNS
import {Response as ResponseNS} from "./ResponseSignature";
import ResponseSignature = ResponseNS.ResponseSignature;
import {Response as ResponseValidatorNS} from "./ResponseValidators";
import IResponseValidator = ResponseValidatorNS.IResponseValidator;
import {Response as ResponseParserNS} from "./ResponseParsers";
import IResponseParser = ResponseParserNS.IResponseParser;
// Param NS
import {Param as ParamNS} from "./ParamSignature";
import optional = ParamNS.Optional;
import required = ParamNS.Required;
import Payload = ParamNS.Payload;
import PayloadVO = ParamNS.PayloadVO;
import Param = ParamNS.Param;
import ParamData = ParamNS.ParamData;
import IParamSignature = ParamNS.IParamSignature;
// Validation ND
import {Validation as ValidationNS} from "./ParamValidators";
import PositiveNumberValidatorBetween = ValidationNS.PositiveNumberRoundValidatorBetween;
import KeywordValidator = ValidationNS.KeywordValidator;
// Protocol NS
import {Protocol as ProtocolNS} from "./ProtocolLogic";
import IProtocolLogic = ProtocolNS.IProtocolLogic;
// Callback NS
import {Callback as CallbackNS} from "./global/Callback";
import ICommandStatusCallback = CallbackNS.ICommandStatusCallback;

/**
 * 
 */
export namespace Command {

	/**
	 * 
	 */
	export interface IAMCPResponse {
		code: number;
		raw: string;
		toString(): string;
		data: Object;

		// 1xx
		// 2xx
		// 3xx
		// 4xx
		// 5xx
		// payload 
			// -> raw string
			// -> object with string payload
			// -> object with array of string payloads
	}

	/**
	 * 
	 */
	export class AMCPResponse implements IAMCPResponse {
		public code: number;
		public raw: string;
		public data: Object;

		public toString(): string {
			if (typeof this.raw === "string") {
				return this.raw.replace(/\r?\n|\r/gi, "");
			}
			return "";
		}
	}

	/**
	 * 
	 */
	export enum IAMCPStatus {
		Invalid		= -1,
		New			= 0,
		Initialized	= 1,
		Queued 		= 2,
		Sent		= 3,
		Suceeded	= 4,
		Failed		= 5,
		Timeout		= 6
	}

	/**
	 * 
	 */
	export interface IAMCPCommandData {
		address: string;
		channel: number;
		layer: number;
		payload: PayloadVO;
		response: IAMCPResponse;
		status: IAMCPStatus;
		id: string;
	}

	/**
	 * 
	 */
	export interface IAMCPCommandVO extends IAMCPCommandData {
		_commandName: string;
		_objectParams: Param;
		_stringParamsArray: Array<string>;
	}

	/**
	 * 
	 */
	export interface IAMCPCommand extends IAMCPCommandData {
		validateParams(): boolean;
		validateResponse(response: CasparCGSocketResponse): boolean;
		serialize(): IAMCPCommandVO;
		populate(cmdVo: IAMCPCommandVO, id: string): void;
		paramProtocol: Array<IParamSignature>;
		protocolLogic: Array<IProtocolLogic>;
		responseProtocol: ResponseSignature;
		resolve?: any;
		reject?: any;
		onStatusChanged: ICommandStatusCallback;
	}

	/**
	 * 
	 */
	export function isIAMCPCommand(object: Object): object is IAMCPCommand {
		// @todo: better inheritance type checking
		for (let prop in AbstractCommand.prototype) {
			if (object[prop] === undefined) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 
	 */
	export abstract class AbstractCommand implements IAMCPCommand {
		response: IAMCPResponse = new AMCPResponse();
		paramProtocol: Array<IParamSignature>;
		responseProtocol: ResponseSignature = new ResponseSignature();
		onStatusChanged: ICommandStatusCallback;
		private _status: IAMCPStatus = IAMCPStatus.New;
		protected _channel: number;
		protected _layer: number;
		protected _id: string;
		protected _payload: PayloadVO = {};
		protected _stringParamsArray: Array<string>;
		protected _objectParams: Param;

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
		constructor(params?: (string|Param|(string|Param)[])) {
			// parse params to objects
			let paramsArray: Array<string|Param> = [];

			// conform params to array
			if (params instanceof Array) {
				paramsArray = params as Array<string|Param>;
			}else {
				paramsArray = [<string|Param>params];
			}
			this._stringParamsArray = [];
			this._objectParams = {};

			for (let element of paramsArray){
				if (element === undefined) {
					continue;
				}
				if (typeof element === "string") {
					element = element.toString().trim();
					this._stringParamsArray = this._stringParamsArray.concat([...element.toString().split(/\s+/)]); // @todo: string delimiter pairing (,;) -> objectArray
				}else if (typeof element === "object") {
					for (let prop in element) {
						this._objectParams[prop] = element[prop];
					}
				}
			}
		}

		/**
		 * 
		 */
		public validateParams(): boolean {
			let required: Array<IParamSignature> = this.paramProtocol ? this.paramProtocol.filter(signature => signature.required.valueOf() === true) : [];
			let optional: Array<IParamSignature> = this.paramProtocol ? this.paramProtocol.filter(signature => signature.required.valueOf() === false) : [];

			// check all required
			for (let signature of required){
				if (!this.validateParam(signature)) {
					return false;
				}
			}

			// add valid optionals
			for (let signature of optional){
				this.validateParam(signature);
			}

			if (!this.validateProtocolLogic()) {
				return false;
			}

			let validParams: Array<IParamSignature> = this.paramProtocol ? this.paramProtocol.filter((param) => param.resolved && param.payload !== null) : [];
			let invalidParams: Array<IParamSignature> = this.paramProtocol ? this.paramProtocol.filter((param) => param.resolved && param.payload === null && param.required.valueOf() === true) : [];

			if (invalidParams.length > 0) {
				return false;
			}

			for (let param of validParams){
				let payload: Payload = {key: "", value: null};
				payload.key = param.key || "";
				payload.value = param.payload;
				this.payload[param.name] = payload;
			}

			return true;
		}

		/**
		 * 
		 */
		protected validateParam(signature: IParamSignature): boolean {
			let result: ParamData;
			let key: string;
			let param: Object;

			// objectParams parsing
			if (this._objectParams.hasOwnProperty(signature.name)) {
				param = this._objectParams[signature.name];
			}else {
				// stringParam parsing	
				if (this._stringParamsArray.length > 0) {
					param = this._stringParamsArray;
				}else {
					return false;
				}
			}

			// filter out undefined object params
			if (param === undefined) {
				return false;
			}

			if ((result = signature.validation.resolve(param, (signature.key ||  signature.name))) !== false) {
				signature.validation.resolved = true;
				signature.payload = result;
				return true;
			}else {
				return false;
			}
		}

		/**
		 * 
		 */
		protected validateProtocolLogic(): boolean {

			if (!this.protocolLogic) {
				return true;
			}

			let result: Array<IParamSignature>;
			for (let rule of this.protocolLogic){
				if ((result = rule.resolve(this.paramProtocol)) !== null) {
					this.paramProtocol = result;
				}else {
					return false;
				}
			}
			return true;
		}

		/**
		 * 
		 */
		public validateResponse(response: CasparCGSocketResponse): boolean {
			// code is correct
			if (response.statusCode !== this.responseProtocol.code) {
				// @todo: fallbacks? multiple valid codes?
				return false;
			}
			// data is valid
			let validData: Object;
			if (this.responseProtocol.validator) { // @todo: typechecking ("class that implements....")
				let validator: IResponseValidator = Object.create(this.responseProtocol.validator["prototype"]);
				if ((validData = validator.resolve(response)) === false) {
					return false;
				}
			}

			// data gets parsed
			if (this.responseProtocol.parser && validData) { // @todo: typechecking ("class that implements....")
				let parser: IResponseParser = Object.create(this.responseProtocol.parser["prototype"]);
				if ((validData = parser.parse(validData)) === false) {
					return false;
				}
			}
			this.response.raw = response.responseString;
			this.response.code = response.statusCode;
			this.response.data = validData;
			return true;
		}

		/**
		 * 
		 */
		get payload(): PayloadVO{
			return this._payload;
		}

		/**
		 * 
		 */
		get id(): string{
			return this._id || (new Date().getTime() + Math.random() * 100).toString();
		}

		/**
		 * 
		 */
		protected validateChannel(override?: number): number {
			let result: ParamData;
			let validator = new PositiveNumberValidatorBetween(1, 9999);
			let param: Object;

			if (this._objectParams.hasOwnProperty("channel")) {
				param = this._objectParams["channel"];
			}else {
				// @todo: dispatch error
				return override;
			}

			if ((result = validator.resolve(param)) !== false) {
				return Number(result);
			}else {
				// @todo: dispatch error
			}

			return null;
		}

		/**
		 * 
		 */
		protected validateLayer(override?: number): number {
			let result: ParamData;
			let validator = new PositiveNumberValidatorBetween(0, 9999);
			let param: Object;

			if (this._objectParams.hasOwnProperty("layer")) {
				param = this._objectParams["layer"];
			}else {
				// @todo: dispatch error
				return override;
			}
			if ((result = validator.resolve(param)) !== false) {
				return Number(result);
			}else {
				// @todo: dispatch error
			}

			return null;
		}

		/**
		 * 
		 */
		get protocolLogic(): Array<IProtocolLogic>{
			return this.constructor["protocolLogic"] ||  [];
		}

		/**
		 * 
		 */
		get channel(): number{
			return -1;
		}

		/**
		 * 
		 */
		get layer(): number{
			return -1;
		}

		/**
		 * 
		 */
		get address(): string{
			return "";
		}

		/**
		 * 
		 */
		get status(): IAMCPStatus{
			return this._status;
		}

		/**
		 * 
		 */
		set status(code: IAMCPStatus) {
			if (code !== this._status) {
				this._status = code;
				if (this.onStatusChanged) {
					this.onStatusChanged(this._status);
				}
			}
		}

		/**
		 * 
		 */
		public serialize(): IAMCPCommandVO {
			return{
				channel: this.channel,
				layer: this.layer,
				payload: this.payload,
				response: this.response,
				status: this.status,
				_commandName: this.constructor["name"],
				_objectParams: this._objectParams,
				_stringParamsArray: this._stringParamsArray
			} as IAMCPCommandVO;
		}

		/**
		 * 
		 */
		populate(cmdVo: IAMCPCommandVO, id): void {
			this._stringParamsArray = cmdVo._stringParamsArray;
			this._objectParams = cmdVo._objectParams;
			this.response = cmdVo.response;
			this._id = id;
		}

		/**
		 * 
		 */
		public toString(): string {
			let message: string = "";

			switch (this.status) {
				case IAMCPStatus.Invalid:
					message = "Invalid command";
					break;
				case IAMCPStatus.New:
					message = "New command";
					break;
				case IAMCPStatus.Queued:
					message = "Queued command";
					break;
				case IAMCPStatus.Sent:
					message = "Sent command";
					break;
				case IAMCPStatus.Suceeded:
					message = "Succeeded command";
					break;
				case IAMCPStatus.Failed:
					message = "Failed command";
					break;
			}

			return message;
		}
	}

	/**
	 * 
	 */
	export abstract class AbstractOrChannelOrLayerCommand extends AbstractCommand {

		/**
		 * 
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			let channel: number = this.validateChannel();
			let layer: number = this.validateLayer();
			if (channel) {
				this._channel = channel;
				if (layer) {
					this._layer = layer;
				}
			}
		}

		/**
		 * 
		 */
		get channel(): number{
	return this._channel ||  -1;
		}

		/**
		 * 
		 */
		get layer(): number{
	return this._layer ||  -1;
		}

		/**
		 * 
		 */
		get address(): string{
	let address: string = "";

	if (this.channel && (this.channel > -1)) {
	address = this.channel.toString();
	}else {
	return address;
	}
	if (this.layer && (this.layer > -1)) {
	address = `${address}-${this.layer}`;
	}

	return address;
		}
	}

	/**
	 * 
	 */
	export abstract class AbstractChannelCommand extends AbstractCommand {
		/**
		 * 
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			let channel: number = this.validateChannel();
			if (channel) {
				this._channel = channel;
				this._layer = -1;
			}else {
				throw new Error("Needs channel"); // @todo: dispatch
			}
		}

		/**
		 * 
		 */
		get channel(): number{
	return this._channel ||  -1;
		}

		/**
		 * 
		 */
		get layer(): number{
	return -1;
		}

		/**
		 * 
		 */
		get address(): string{
	if (this.channel) {
	return this.channel.toString();
	}else {
	return null;
				// @todo throw???
	}
		}
	}

	/**
	 * 
	 */
	export abstract class AbstractLayerCommand extends AbstractCommand {

		/**
		 * 
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			let channel: number = this.validateChannel();
			let layer: number = this.validateLayer();
			if (channel && layer) {
				this._channel = channel;
				this._layer = layer;
			}else {
				throw new Error("Needs both channel and layer"); // @todo: dispatch
			}
		}

		/**
		 * 
		 */
		get channel(): number{
	return this._channel ||  -1;
		}

		/**
		 * 
		 */
		get layer(): number{
	return this._layer ||  -1;
		}

		/**
		 * 
		 */
		get address(): string{
	let address: string;

	if (this.channel && (this.channel > -1)) {
	address = this.channel.toString();
	}else {
	return null;
				// @todo throw???
	}
	if (this.layer && (this.layer > -1)) {
	address = `${address}-${this.layer}`;
	}else {
	return null;
				// @todo throw???
	}

	return address;
		}
	}

	/**
	 * 
	 */
	export abstract class AbstractChannelOrLayerCommand extends AbstractCommand {

		/**
		 * 
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			let channel: number = this.validateChannel();
			let layer: number = this.validateLayer();

			if (channel) {
				this._channel = channel;
				if (layer) {
					this._layer = layer;
				}


			}else {
				throw new Error("Needs at least channel"); // @todo: dispatch
			}
		}

		/**
		 * 
		 */
		get channel(): number{
			return this._channel ||  -1;
		}

		/**
		 * 
		 */
		get layer(): number{
			return this._layer ||  -1;
		}

		/**
		 * 
		 */
		get address(): string{
			let address: string;

			if (this.channel) {
				address = this.channel.toString();
			}else {
				return null;
						// @todo throw???
			}
			if (this.layer && (this.layer > -1)) {
				address = `${address}-${this.layer}`;
			}

			return address;
		}
	}

	/**
	 * 
	 */
	export abstract class AbstractLayerWithFallbackCommand extends AbstractCommand {

		/**
		 * 
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			let channel: number = this.validateChannel();
			let layer: number = this.validateLayer(0);
			if (channel) {
				this._channel = channel;
				this._layer = layer;
			}else {
				throw new Error("Needs at least channel, layer will default to 0 if not specified"); // @todo: dispatch
			}
		}

		/**
		 * 
		 */
		get channel(): number{
	return this._channel ||  -1;
		}

		/**
		 * 
		 */
		get layer(): number{
	return this._layer ||  -1;
		}

		/**
		 * 
		 */
		get address(): string{
			let address: string;

			if (this.channel) {
				address = this.channel.toString();
			}else {
				return null;
						// @todo throw???
			}
			if (this.layer && (this.layer > -1)) {
				address = `${address}-${this.layer}`;
			}

			return address;
		}
	}

	/**
	 * 
	 */
	export abstract class AbstractLayerWithCgFallbackCommand extends AbstractCommand {

		/**
		 * 
		 */
		constructor(params?: (string|Param|(string|Param)[])) {
			super(params);
			let channel: number = this.validateChannel();
			let layer: number = this.validateLayer(9999);
			if (channel) {
				this._channel = channel;
				this._layer = layer;
			}else {
				throw new Error("Needs at least channel, layer will default to 9999 if not specified"); // @todo: dispatch
			}
		}

		/**
		 * 
		 */
		get channel(): number{
	return this._channel ||  -1;
		}

		/**
		 * 
		 */
		get layer(): number{
	return this._layer ||  -1;
		}

		/**
		 * 
		 */
		get address(): string{
	let address: string;

	if (this.channel) {
	address = this.channel.toString();
	}else {
	return null;
				// @todo throw???
	}
	if (this.layer && (this.layer > -1)) {
	address = `${address}-${this.layer}`;
	}

	return address;
		}
	}
}