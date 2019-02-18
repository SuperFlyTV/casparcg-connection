import { Priority } from './Priority'
import { IConnectionOptions, ConnectionOptions, Options as OptionsNS } from './AMCPConnectionOptions'
import { SocketStatusOptions } from './event/Events'
import { Config as ConfigNS } from './Config'
import CasparCGConfig = ConfigNS.Intermediate.CasparCGConfig
import { Response as ResponseNS } from './ResponseParsers'
import CasparCGPaths = ResponseNS.CasparCGPaths
import CasparCGVersion = OptionsNS.CasparCGVersion
import { Command as CommandNS } from './AbstractCommand'
import IAMCPCommand = CommandNS.IAMCPCommand
import { Param as ParamNS } from './ParamSignature'
import Param = ParamNS.Param

export interface CasparCGConnection {
	connectionOptions: ConnectionOptions
	connected: boolean
	connectionStatus: SocketStatusOptions
	readonly commandQueueLength: number
	getCasparCGConfig(refresh: boolean): Promise<CasparCGConfig>
	getCasparCGPaths(refresh: boolean): Promise<CasparCGPaths>
	getCasparCGVersion(refresh: boolean): Promise<CasparCGVersion>
	removeQueuedCommand(id: string): boolean
	connect(options?: IConnectionOptions): void // what is the point of this? Why not just require the ConnectionOption class?
	disconnect(): void
	createCommand(command: IAMCPCommand): IAMCPCommand | undefined
	createCommand(commandString: string, ...params: (string | Param)[]): IAMCPCommand | undefined
	queueCommand(command: IAMCPCommand, priority: Priority): Promise<IAMCPCommand>
	do(command: IAMCPCommand): Promise<IAMCPCommand>
	do(commandString: string, ...params: (string | Param)[]): Promise<IAMCPCommand>
	doNow(command: IAMCPCommand): Promise<IAMCPCommand>
	doNow(commandString: string, ...params: (string | Param)[]): Promise<IAMCPCommand>
	doLater(command: IAMCPCommand): Promise<IAMCPCommand>
	doLater(commandString: string, ...params: (string | Param)[]): Promise<IAMCPCommand>
}
