import { Enum as EnumNS } from './ServerStateEnum';
import AbstractEnum = EnumNS.AbstractEnum;
import { Param as ParamNS } from './ParamSignature';
import IParamSignature = ParamNS.IParamSignature;
/**
 *
 */
export declare namespace Protocol {
    /**
     *
     */
    interface IProtocolLogic {
        resolve(protocol: Array<IParamSignature>): Array<IParamSignature>;
    }
    /**
     *
     */
    abstract class AbstractProtocolLogic implements IProtocolLogic {
        protected fields: Array<string | AbstractEnum>;
        /**
         *
         */
        constructor(...fields: Array<string | AbstractEnum>);
        /**
         *
         */
        abstract resolve(protocol: Array<IParamSignature>): Array<IParamSignature>;
    }
    /**
     *
     */
    class Depends extends AbstractProtocolLogic {
        /**
         *
         */
        constructor(dependant: string | AbstractEnum, dependee: string | AbstractEnum);
        constructor(...fields: Array<string | AbstractEnum>);
        /**
         *
         */
        if(target: string, mustBe: AbstractEnum | string): IProtocolLogic;
        /**
         *
         */
        ifNot(target: string, cantBe: AbstractEnum | string): IProtocolLogic;
        /**
         *
         */
        resolve(protocol: Array<IParamSignature>): Array<IParamSignature>;
    }
    /**
     *
     */
    class OneOf extends AbstractProtocolLogic {
        /**
         *
         */
        constructor(either: string | AbstractEnum, or: string | AbstractEnum);
        constructor(...fields: Array<string | AbstractEnum>);
        /**
         *
         */
        resolve(protocol: Array<IParamSignature>): Array<IParamSignature>;
    }
    /**
     *
     */
    class Coupled extends AbstractProtocolLogic {
        /**
         *
         */
        constructor(partnerA: string | AbstractEnum, partnerB: string | AbstractEnum);
        constructor(...fields: Array<string | AbstractEnum>);
        /**
         *
         */
        resolve(protocol: Array<IParamSignature>): Array<IParamSignature>;
    }
}
