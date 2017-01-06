/** */
export declare namespace v2xx {
    /** */
    namespace CasparCGProtocols {
        /** */
        interface AMCP extends IVideo, ICG, IMixer, IChannel, IData, IThumbnail, IQuery, IOperation {
        }
        /**
         * AMCP Media-commands
         */
        interface IVideo {
        }
        /**
         * AMCP Template-commands
         */
        interface ICG {
        }
        /**
         * AMCP Mixer-commands
         */
        interface IMixer {
        }
        /**
         * AMCP Channel-commands
         */
        interface IChannel {
        }
        /**
         * AMCP Template Data-commands
         */
        interface IData {
        }
        /**
         * AMCP Thumbnail-commands
         */
        interface IThumbnail {
        }
        /**
         * AMCP Query-commands
         */
        interface IQuery {
        }
        /**
         * AMCP Operation-commands
         */
        interface IOperation {
        }
    }
}
/** */
export declare namespace v21x {
    /** */
    namespace CasparCGProtocols {
        /** */
        interface AMCP extends IVideo, ICG, IMixer, IChannel, IData, IThumbnail, IQuery, IOperation {
        }
        /**
         * AMCP Media-commands
         */
        interface IVideo extends v2xx.CasparCGProtocols.IVideo {
        }
        /**
         * AMCP Template-commands
         */
        interface ICG extends v2xx.CasparCGProtocols.ICG {
        }
        /**
         * AMCP Mixer-commands
         */
        interface IMixer extends v2xx.CasparCGProtocols.IMixer {
        }
        /**
         * AMCP Channel-commands
         */
        interface IChannel extends v2xx.CasparCGProtocols.IChannel {
        }
        /**
         * AMCP Template Data-commands
         */
        interface IData extends v2xx.CasparCGProtocols.IData {
        }
        /**
         * AMCP Thumbnail-commands
         */
        interface IThumbnail extends v2xx.CasparCGProtocols.IThumbnail {
        }
        /**
         * AMCP Query-commands
         */
        interface IQuery extends v2xx.CasparCGProtocols.IQuery {
        }
        /**
         * AMCP Operation-commands
         */
        interface IOperation extends v2xx.CasparCGProtocols.IOperation {
        }
    }
}
