import {BaseEvent, SocketStatusOptions} from "../event/Events";
import {Command as CommandNS} from "../AbstractCommand";
import IAMCPResponse = CommandNS.IAMCPResponse;
import IAMCPStatus = CommandNS.IAMCPStatus;

/**
 * 
 */
export namespace Callback {

	/**
	 * 
	 */
	export interface IEventCallback {
		(event: BaseEvent): void;
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
		(value: SocketStatusOptions): void;
	}

	/**
	 * 
	 */
	export interface ICommandStatusCallback {
		(code: IAMCPStatus): void;
	}
}