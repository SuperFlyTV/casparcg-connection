import { Event as BaseEventNS } from './BaseEvent';
import { Command as CommandNS } from '../AbstractCommand';
import IAMCPCommand = CommandNS.IAMCPCommand;
import { AMCPUtil as AMCPUtilNS } from '../AMCP';
import CasparCGSocketResponse = AMCPUtilNS.CasparCGSocketResponse;
export declare namespace Event {
    /**
     *
     */
    class CasparCGSocketCommandEvent extends BaseEventNS.BaseEvent {
        command: IAMCPCommand;
        static readonly RESPONSE: string;
        /**
         *
         */
        constructor(command: IAMCPCommand);
        /**
         *
         */
        valueOf(): IAMCPCommand;
    }
    /**
     *
     */
    class CasparCGSocketResponseEvent extends BaseEventNS.BaseEvent {
        response: CasparCGSocketResponse;
        static readonly RESPONSE: string;
        static readonly INVALID_RESPONSE: string;
        /**
         *
         */
        constructor(response: CasparCGSocketResponse);
        /**
         *
         */
        valueOf(): CasparCGSocketResponse;
    }
}
