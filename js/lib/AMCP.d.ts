import { Response as ResponseSignatureNS } from "./ResponseSignature";
import { Command as CommandNS } from "./AbstractCommand";
import IAMCPCommand = CommandNS.IAMCPCommand;
import IAMCPCommandVO = CommandNS.IAMCPCommandVO;
import AbstractCommand = CommandNS.AbstractCommand;
import AbstractOrChannelOrLayerCommand = CommandNS.AbstractOrChannelOrLayerCommand;
import AbstractChannelCommand = CommandNS.AbstractChannelCommand;
import AbstractChannelOrLayerCommand = CommandNS.AbstractChannelOrLayerCommand;
import AbstractLayerWithFallbackCommand = CommandNS.AbstractLayerWithFallbackCommand;
import AbstractLayerWithCgFallbackCommand = CommandNS.AbstractLayerWithCgFallbackCommand;
import { Param as ParamNS } from "./ParamSignature";
import Param = ParamNS.Param;
import { Protocol as ProtocolNS } from "./ProtocolLogic";
/**
 * Factory
 */
export declare namespace AMCPUtil {
    /**
     *
     */
    function deSerialize(cmd: IAMCPCommandVO, id: string): IAMCPCommand;
    /**
     *
     */
    class CasparCGSocketResponse {
        statusCode: number;
        responseString: string;
        items: Array<string>;
        /**
         *
         */
        constructor(responseString: string);
        /**
         *
         */
        static evaluateStatusCode(responseString: string): number;
    }
}
/**
 * Internal
 */
export declare namespace AMCP {
    class CustomCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
    }
}
/**
 * IVideo
 */
export declare namespace AMCP {
    /**
     *
     */
    class LoadbgCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
    }
    /**
     *
     */
    class LoadCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
    }
    /**
     *
     */
    class PlayCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
    }
    /**
     *
     */
    class PauseCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
    }
    /**
     *
     */
    class ResumeCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
    }
    /**
     *
     */
    class StopCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
    }
}
/**
 * ICG
 */
export declare namespace AMCP {
    /**
     *
     */
    class CGAddCommand extends AbstractLayerWithCgFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
    }
    /**
     *
     */
    class CGPlayCommand extends AbstractLayerWithCgFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
    }
    /**
     *
     */
    class CGStopCommand extends AbstractLayerWithCgFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
    }
    /**
     *
     */
    class CGNextCommand extends AbstractLayerWithCgFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
    }
    /**
     *
     */
    class CGRemoveCommand extends AbstractLayerWithCgFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
    }
    /**
     *
     */
    class CGClearCommand extends AbstractLayerWithCgFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class CGUpdateCommand extends AbstractLayerWithCgFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
    }
    /**
     * @todo: 201 response code, parsing???????
     */
    class CGInvokeCommand extends AbstractLayerWithCgFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
}
/**
 * IMixer
 * @todo: switch 201/202 based on mode
 */
export declare namespace AMCP {
    /**
     *
     */
    class MixerKeyerCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     * @todo	Validata/clamp lamp number range?
     */
    class MixerChromaCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.IProtocolLogic[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerBlendCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerOpacityCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerBrightnessCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerSaturationCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerContrastCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     * @todo:	verify `gamma` value range
     */
    class MixerLevelsCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Coupled[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerFillCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Coupled[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerClipCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Coupled[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerAnchorCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Coupled[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerCropCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Coupled[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerRotationCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerPerspectiveCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Coupled[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerMipmapCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerVolumeCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerMastervolumeCommand extends AbstractChannelCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerStraightAlphaOutputCommand extends AbstractChannelCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.Depends[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerGridCommand extends AbstractChannelCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerCommitCommand extends AbstractChannelCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class MixerClearCommand extends AbstractChannelOrLayerCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
}
/**
 * IChannel
 */
export declare namespace AMCP {
    /**
     *
     */
    class ClearCommand extends AbstractChannelOrLayerCommand {
        static commandString: string;
    }
    /**
     *
     */
    class CallCommand extends AbstractLayerWithFallbackCommand {
        static commandString: string;
    }
    /**
     *
     */
    class SwapCommand extends AbstractChannelOrLayerCommand {
        static commandString: string;
        /**
         *
         */
        constructor();
    }
    /**
     *
     */
    class AddCommand extends AbstractChannelCommand {
        static commandString: string;
    }
    /**
     *
     */
    class RemoveCommand extends AbstractChannelOrLayerCommand {
        static commandString: string;
    }
    /**
     *
     */
    class PrintCommand extends AbstractChannelCommand {
        static commandString: string;
    }
    /**
     *
     */
    class SetCommand extends AbstractChannelCommand {
        static commandString: string;
    }
    /**
     *
     */
    class LockCommand extends AbstractChannelCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.IProtocolLogic[];
    }
    /**
     *
     */
    class ChannelGridCommand extends AbstractCommand {
        static commandString: string;
    }
    /**
     *
     */
    class GlGCCommand extends AbstractCommand {
        static commandString: string;
    }
}
/**
 * IData
 */
export declare namespace AMCP {
    /**
     *
     */
    class DataStoreCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
    }
    /**
     *
     */
    class DataRetrieveCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class DataListCommand extends AbstractCommand {
        static commandString: string;
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class DataRemoveCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
    }
}
/**
 * IThumbnail
 */
export declare namespace AMCP {
    /**
     *
     */
    class ThumbnailListCommand extends AbstractCommand {
        static commandString: string;
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class ThumbnailRetrieveCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class ThumbnailGenerateCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
    }
    /**
     *
     */
    class ThumbnailGenerateAllCommand extends AbstractCommand {
        static commandString: string;
    }
}
/**
 * IInfo
 */
export declare namespace AMCP {
    /**
     *
     */
    class CinfCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class ClsCommand extends AbstractCommand {
        static commandString: string;
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class FlsCommand extends AbstractCommand {
        static commandString: string;
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class TlsCommand extends AbstractCommand {
        static commandString: string;
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class VersionCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class InfoCommand extends AbstractOrChannelOrLayerCommand {
        static commandString: string;
        responseProtocol: ResponseSignatureNS.ResponseSignature;
        /**
         *
         */
        constructor(params?: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class InfoTemplateCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class InfoConfigCommand extends AbstractCommand {
        static commandString: string;
        responseProtocol: ResponseSignatureNS.ResponseSignature;
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]), context?: Object);
    }
    /**
     *
     */
    class InfoPathsCommand extends AbstractCommand {
        static commandString: string;
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class InfoSystemCommand extends AbstractCommand {
        static commandString: string;
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class InfoServerCommand extends AbstractCommand {
        static commandString: string;
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class InfoQueuesCommand extends AbstractCommand {
        static commandString: string;
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class InfoThreadsCommand extends AbstractCommand {
        static commandString: string;
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class InfoDelayCommand extends AbstractChannelOrLayerCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        responseProtocol: ResponseSignatureNS.ResponseSignature;
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     * @todo: response validator/parser
     */
    class CGInfoCommand extends AbstractLayerWithCgFallbackCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        responseProtocol: ResponseSignatureNS.ResponseSignature;
        /**
         *
         */
        constructor(params: (string | Param | (string | Param)[]));
    }
    /**
     *
     */
    class GlInfoCommand extends AbstractCommand {
        static commandString: string;
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class LogLevelCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
    }
    /**
     * @protocol	Needs either `calltrace` or `communication` parameter.
     */
    class LogCategoryCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        static protocolLogic: ProtocolNS.OneOf[];
    }
    /**
     *
     */
    class DiagCommand extends AbstractCommand {
        static commandString: string;
    }
    /**
     * @todo: mixed mode!!!!
     * 202/201
     */
    class HelpCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class HelpProducerCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
    /**
     *
     */
    class HelpConsumerCommand extends AbstractCommand {
        static commandString: string;
        paramProtocol: ParamNS.ParamSignature[];
        responseProtocol: ResponseSignatureNS.ResponseSignature;
    }
}
/**
 * IOperation
 */
export declare namespace AMCP {
    /**
     * @todo: response
     */
    class ByeCommand extends AbstractCommand {
        static commandString: string;
    }
    /**
     * @todo: response
     */
    class KillCommand extends AbstractCommand {
        static commandString: string;
    }
    /**
     * @todo: response
     */
    class RestartCommand extends AbstractCommand {
        static commandString: string;
    }
}
