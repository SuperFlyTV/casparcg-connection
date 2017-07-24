import { BaseEvent, SocketStatusOptions } from '../event/Events';
import { Command as CommandNS } from '../AbstractCommand';
import IAMCPResponse = CommandNS.IAMCPResponse;
import IAMCPStatus = CommandNS.IAMCPStatus;
/**
 *
 */
export declare namespace Callback {
    /**
     *
     */
    interface IEventCallback {
        (event: BaseEvent): void;
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
        (value: SocketStatusOptions): void;
    }
    /**
     *
     */
    interface ICommandStatusCallback {
        (code: IAMCPStatus): void;
    }
}
