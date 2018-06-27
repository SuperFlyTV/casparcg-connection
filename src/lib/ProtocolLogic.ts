// Enum NS
import { Enum as EnumNS } from './ServerStateEnum'
import AbstractEnum = EnumNS.AbstractEnum
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
		protected fields: Array<string | AbstractEnum>

		/**
		 *
		 */
		constructor(...fields: Array<string | AbstractEnum>) {
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
		constructor(dependant: string | AbstractEnum, dependee: string | AbstractEnum);
		constructor(...fields: Array<string | AbstractEnum>);
		constructor(...fields: Array<string | AbstractEnum>) {
			super(...fields)
		}

		/**
		 *
		 */
		public if(target: string, mustBe: AbstractEnum | string): IProtocolLogic {
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
		 *
		 */
		public ifNot(target: string, cantBe: AbstractEnum | string): IProtocolLogic {
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
		 *
		 */
		public resolve(protocol: Array<IParamSignature>): Array<IParamSignature> {
			let valids: Array<IParamSignature> = protocol.filter((param) => param.resolved && param.name === this.fields[1])
			if (valids.length === 1) {
				return protocol
			} else {
				return protocol.map((param) => {
					if (param.name === this.fields[0]) {
						param.payload = null
					}
					return param
				})
			}
		}
	}

	/**
	 *
	 */
	export class OneOf extends AbstractProtocolLogic {

		/**
		 *
		 */
		constructor(either: string | AbstractEnum, or: string | AbstractEnum);
		constructor(...fields: Array<string | AbstractEnum>);
		constructor(...fields: Array<string | AbstractEnum>) {
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
		constructor(partnerA: string | AbstractEnum, partnerB: string | AbstractEnum);
		constructor(...fields: Array<string | AbstractEnum>);
		constructor(...fields: Array<string | AbstractEnum>) {
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
