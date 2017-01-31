import { Event as BaseEventNS } from "../event/BaseEvent";
import { Command as CommandNS } from "../AbstractCommand";
import IAMCPResponse = CommandNS.IAMCPResponse;
import IAMCPStatus = CommandNS.IAMCPStatus;
import { SocketState } from "../CasparCGSocket";
/**
 *
 */
export declare namespace Callback {
    /**
     *
     */
    interface IEventCallback {
        (event: BaseEventNS.BaseEvent): void;
    }
    /**
     *
     */
    interface IBooleanCallback {
        (value: boolean): void;
    }
    /**
     *
     */
    interface IStringCallback {
        (value: string): void;
    }
    /**
     *
     */
    interface IResponseCallback {
        (value: IAMCPResponse): void;
    }
    /**
     * @todo implement
     */
    interface IErrorCallback {
        (error: Error): void;
    }
    /**
     *
     */
    interface ISocketStatusCallback {
        (value: SocketState): void;
    }
    /**
     *
     */
    interface ICommandStatusCallback {
        (code: IAMCPStatus): void;
    }
    interface IOSCCallback {
        (category: string, value: Object): void;
    }
}
