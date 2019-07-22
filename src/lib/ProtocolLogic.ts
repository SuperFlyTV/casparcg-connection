// Enum NS
import * as EnumNS from './ServerStateEnum'
import AllEnums = EnumNS.AllEnums
// Param NS
import { Param as ParamNS } from './ParamSignature'
import IParamSignature = ParamNS.IParamSignature

/**
 *
 */
export namespace Protocol {
	/**
	 *
	 */
	export interface IProtocolLogic {
		resolve(protocol: Array<IParamSignature>): Array<IParamSignature>
	}

	/**
	 *
	 */
	export abstract class AbstractProtocolLogic implements IProtocolLogic {
		protected fields: Array<string | AllEnums>

		/**
		 *
		 */
		constructor(...fields: Array<string | AllEnums>) {
			this.fields = fields
		}

		/**
		 *
		 */
		abstract resolve(protocol: Array<IParamSignature>): Array<IParamSignature>
	}

	/**
	 *
	 */
	export class Depends extends AbstractProtocolLogic {
		/**
		 *
		 */
		constructor(dependant: string | AllEnums, dependee: string | AllEnums);
		constructor(...fields: Array<string | AllEnums>);
		constructor(...fields: Array<string | AllEnums>) {
			super(...fields)
		}

		/**
		 * This will apply the validation only when this condition is met
		 */
		public if(target: string, mustBe: AllEnums | string): IProtocolLogic {
			let resolveRef = this.resolve
			this.resolve = (protocol: Array<IParamSignature>): Array<IParamSignature> => {
				for (let param of protocol) {
					if (param.name === target && param.payload === mustBe.toString()) {
						return resolveRef.call(this, protocol)
					}
				}
				return protocol
			}

			return this
		}

		/**
		 * This will apply the validation only when this condition is not met
		 */
		public ifNot(target: string, cantBe: AllEnums | string): IProtocolLogic {
			let resolveRef = this.resolve
			this.resolve = (protocol: Array<IParamSignature>): Array<IParamSignature> => {
				for (let param of protocol) {
					if (param.name === target && param.payload === cantBe.toString()) {
						return protocol
					}
				}
				return resolveRef.call(this, protocol)
			}

			return this
		}

		/**
		 * This will only include the field when this condition is met
		 */
		public mustBe(target: string, mustBe: AllEnums | string): IProtocolLogic {
			let resolveRef = this.resolve
			this.resolve = (protocol: Array<IParamSignature>): Array<IParamSignature> => {
				for (let param of protocol) {
					if (param.name === target && param.payload === mustBe.toString()) {
						return resolveRef.call(this, protocol)
					}
				}

				return this.stripField(protocol)
			}

			return this
		}

		/**
		 * This will only include the field when this condition is not met
		 */
		public mustNotBe(target: string, cantBe: AllEnums | string): IProtocolLogic {
			let resolveRef = this.resolve
			this.resolve = (protocol: Array<IParamSignature>): Array<IParamSignature> => {
				for (let param of protocol) {
					if (param.name === target && (param.payload === cantBe.toString() || param.payload === null)) {
						return this.stripField(protocol)
					}
				}
				return resolveRef.call(this, protocol)
			}

			return this
		}

		/**
		 *
		 */
		public resolve(protocol: Array<IParamSignature>): Array<IParamSignature> {
			let valids: Array<IParamSignature> = protocol.filter((param) => param.resolved && param.name === this.fields[1])
			if (valids.length === 1) {
				return protocol
			} else {
				return this.stripField(protocol)
			}
		}

		private stripField(protocol: Array<IParamSignature>) {
			return protocol.map((param) => {
				if (param.name === this.fields[0]) {
					param.payload = null
				}
				return param
			})
		}
	}

	/**
	 *
	 */
	export class OneOf extends AbstractProtocolLogic {

		/**
		 *
		 */
		constructor(either: string | AllEnums, or: string | AllEnums);
		constructor(...fields: Array<string | AllEnums>);
		constructor(...fields: Array<string | AllEnums>) {
			super(...fields)
		}

		/**
		 *
		 */
		public resolve(protocol: Array<IParamSignature>): Array<IParamSignature> {
			let valids: Array<IParamSignature> = protocol.filter((param) => param.resolved && this.fields.indexOf(param.name) > -1)
			if (valids.length === 1) {
				return protocol
			}
			return []
		}
	}

	/**
	 *
	 */
	export class Coupled extends AbstractProtocolLogic {

		/**
		 *
		 */
		constructor(partnerA: string | AllEnums, partnerB: string | AllEnums);
		constructor(...fields: Array<string | AllEnums>);
		constructor(...fields: Array<string | AllEnums>) {
			super(...fields)
		}

		/**
		 *
		 */
		public resolve(protocol: Array<IParamSignature>): Array<IParamSignature> {

			let valids: Array<IParamSignature> = protocol.filter((param) => this.fields.indexOf(param.name) > -1 && param.resolved === true)
			if (valids.length >= this.fields.length) {
				return protocol
			} else {
				return protocol.map((param) => {
					if (this.fields.indexOf(param.name) > -1) {
						param.payload = null
					}
					return param
				})
			}
		}

	}
}
