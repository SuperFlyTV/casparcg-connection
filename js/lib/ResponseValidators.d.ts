import { AMCPUtil as AMCPUtilNS } from './AMCP';
import CasparCGSocketResponse = AMCPUtilNS.CasparCGSocketResponse;
export declare namespace Response {
    /**
     *
     */
    interface IResponseValidator {
        resolve(response: CasparCGSocketResponse): Object;
    }
    /**
     *
     */
    class StatusValidator implements IResponseValidator {
        /**
         *
         */
        resolve(response: CasparCGSocketResponse): Object;
    }
    /**
     *
     */
    class StringValidator implements IResponseValidator {
        /**
         *
         */
        resolve(response: CasparCGSocketResponse): Object;
    }
    /**
     *
     */
    class XMLValidator implements IResponseValidator {
        /**
         *
         */
        resolve(response: CasparCGSocketResponse): Object;
    }
    /**
     *
     */
    class ListValidator implements IResponseValidator {
        /**
         *
         */
        resolve(response: CasparCGSocketResponse): Object;
    }
    /**
     *
     */
    class DataValidator implements IResponseValidator {
        /**
         *
         */
        resolve(response: CasparCGSocketResponse): Object;
    }
    /**
     *
     */
    class Base64Validator implements IResponseValidator {
        /**
         *
         */
        resolve(response: CasparCGSocketResponse): Object;
    }
    /**
     *
     */
    class MixerStatusValidator implements IResponseValidator {
        /**
         *
         */
        resolve(response: CasparCGSocketResponse): Object;
    }
}
