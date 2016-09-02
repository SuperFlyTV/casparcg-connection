import {Event as BaseEventNS} from "../event/BaseEvent";
import {Command as CommandNS} from "../AbstractCommand";
import IAMCPResponse = CommandNS.IAMCPResponse;
import IAMCPStatus = CommandNS.IAMCPStatus;
import {SocketState} from "../CasparCGSocket";

/**
 * 
 */
export namespace Callback {

	/**
	 * 
	 */
	export interface IEventCallback {
		(event: BaseEventNS.BaseEvent): void;
	}

	/**
	 * 
	 */
	export interface IBooleanCallback {
		(value: boolean): void;
	}

	/**
	 * 
	 */
	export interface IStringCallback {
		(value: string): void;
	}

	/**
	 * 
	 */
	export interface IResponseCallback {
		(value: IAMCPResponse): void;
	}

	/**
	 * @todo implement
	 */
	export interface IErrorCallback {
		(error: Error): void;
	}

	/**
	 * 
	 */
	export interface ISocketStatusCallback {
		(value: SocketState): void;
	}

	/**
	 * 
	 */
	export interface ICommandStatusCallback {
		(code: IAMCPStatus): void;
	}
}