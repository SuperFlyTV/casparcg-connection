import { Event as BaseEventNS } from "./BaseEvent";
import { Command as CommandNS } from "../AbstractCommand";
import IAMCPCommand = CommandNS.IAMCPCommand;
import { AMCPUtil as AMCPUtilNS } from "../AMCP";
import CasparCGSocketResponse = AMCPUtilNS.CasparCGSocketResponse;
export declare namespace Event {
    /**
     *
     */
    class CasparCGSocketCommandEvent extends BaseEventNS.BaseEvent {
        command: IAMCPCommand;
        /**
         *
         */
        constructor(command: IAMCPCommand);
        /**
         *
         */
        valueOf(): IAMCPCommand;
        static RESPONSE: string;
    }
    /**
     *
     */
    class CasparCGSocketResponseEvent extends BaseEventNS.BaseEvent {
        response: CasparCGSocketResponse;
        /**
         *
         */
        constructor(response: CasparCGSocketResponse);
        /**
         *
         */
        valueOf(): CasparCGSocketResponse;
        static RESPONSE: string;
        static INVALID_RESPONSE: string;
    }
}
