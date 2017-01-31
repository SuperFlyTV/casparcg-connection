import { Validation } from "./ParamValidators";
import IValidator = Validation.IValidator;
/**
 *
 */
export declare namespace Param {
    /**
     *
     */
    class Optional {
        /**
         *
         */
        static valueOf(): boolean;
    }
    /**
     *
     */
    class Required {
        /**
         *
         */
        static valueOf(): boolean;
    }
    /**
     *
     */
    interface IParamSignature {
        required: (Required | Optional);
        name: string;
        key: string | null;
        validation: IValidator;
        resolved: boolean;
        payload: Object | null;
    }
    /**
     *
     */
    type Param = {
        [k: string]: (string | number | boolean | Object | undefined);
    };
    type Payload = {
        key: string;
        value: (string | number | boolean | Object);
    };
    type PayloadVO = {
        [k: string]: Payload;
    };
    /**
     *
     */
    type ParamData = (string | boolean | number);
    /**
     *
     */
    type TemplateData = Object | String;
    /**
     *
     */
    class ParamSignature implements IParamSignature {
        required: (Required | Optional);
        name: string;
        key: string | null;
        validation: IValidator;
        payload: Object | null;
        /**
         *
         */
        constructor(required: (Required | Optional), name: string, key: string | null, validation: (IValidator | Object));
        /**
         *
         */
        readonly resolved: boolean;
    }
}
