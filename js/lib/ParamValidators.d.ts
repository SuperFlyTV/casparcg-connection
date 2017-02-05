import { Param as ParamNS } from "./ParamSignature";
import ParamData = ParamNS.ParamData;
import { Enum } from "./ServerStateEnum";
import AbstractEnum = Enum.AbstractEnum;
export declare namespace Validation {
    /**
     *
     */
    interface IValidator {
        resolve(data: Object, key?: string): ParamData;
        resolved: boolean;
    }
    /**
     *
     */
    abstract class AbstractValidator implements IValidator {
        resolved: boolean;
        abstract resolve(value: number, key?: string): ParamData;
    }
    /**
     *
     */
    class StringValidator extends AbstractValidator {
        private lazy;
        /**
         *
         */
        constructor(lazy?: Boolean);
        /**
         *
         */
        resolve(data: Object): ParamData;
    }
    /** */
    class FilterValidator extends StringValidator {
    }
    /** */
    class ChannelLayoutValidator extends StringValidator {
    }
    /**
     *
     */
    class ClipNameValidator extends AbstractValidator {
        /**
         *
         */
        resolve(data: Object): ParamData;
    }
    /**
     *
     */
    class TemplateNameValidator extends ClipNameValidator {
    }
    /**
     *
     */
    class DataNameValidator extends ClipNameValidator {
    }
    /**
     *
     */
    class EnumValidator extends AbstractValidator {
        private _enumClass;
        /**
         *
         */
        constructor(_enumClass: typeof AbstractEnum);
        /**
         *
         */
        resolve(data: Object): ParamData;
    }
    /**
     *
     */
    class KeywordValidator extends AbstractValidator {
        private _keyword;
        private _caseSensitive;
        /**
         *
         */
        constructor(keyword: string, caseSensitive?: boolean);
        /**
         *
         */
        resolve(data: Object): ParamData;
    }
    /**
     *
     */
    class FrameValidator extends AbstractValidator {
        private _keyword;
        /**
         *
         */
        constructor(keyword: string);
        /**
         *
         */
        resolve(data: Object): ParamData;
    }
    /**
     *
     */
    class PositiveNumberValidatorBetween extends AbstractValidator {
        private _min;
        private _max;
        /**
         *
         */
        constructor(_min?: number, _max?: number);
        /**
         *
         */
        resolve(data: Object): ParamData;
    }
    /**
     *
     */
    class PositiveNumberValidator extends PositiveNumberValidatorBetween {
        /**
         *
         */
        constructor();
    }
    /**
     *
     */
    class PositiveNumberRoundValidatorBetween extends PositiveNumberValidatorBetween {
        /**
         *
         */
        resolve(data: Object | undefined): ParamData;
    }
    /**
     *
     */
    class NumberValidatorBetween extends AbstractValidator {
        private _min;
        private _max;
        /**
         *
         */
        constructor(_min?: number, _max?: number);
        /**
         *
         */
        resolve(data: Object): ParamData;
    }
    /**
     *
     */
    class NumberValidator extends NumberValidatorBetween {
        /**
         *
         */
        constructor();
    }
    /** */
    class DecklinkDeviceValidator extends PositiveNumberValidator {
    }
    /**
     *
     */
    class BooleanValidatorWithDefaults extends AbstractValidator {
        private _valueOnSuccess;
        private _valueOnFail;
        /**
         *
         */
        constructor(_valueOnSuccess?: (string | number | boolean), _valueOnFail?: (string | number | boolean));
        /**
         *
         */
        resolve(data: Object, key: string): ParamData;
    }
    /**
     *
     */
    class BooleanValidator extends BooleanValidatorWithDefaults {
        /**
         *
         */
        constructor();
    }
    /**
     *
     */
    class TemplateDataValidator extends AbstractValidator {
        /**
         *
         */
        resolve(data: Object): ParamData;
    }
}
