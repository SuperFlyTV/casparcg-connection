/***/
export namespace v2xx {
	/***/
	export namespace CasparCGProtocols {
		/***/
		export interface AMCP extends IVideo, ICG, IMixer, IChannel, IData, IThumbnail, IQuery, IOperation {
		}

		/**
		 *AMCP Media-commands
		 */
		export interface IVideo {
		}

		/**
		 *AMCP Template-commands
		 */
		export interface ICG {
		}

		/**
		 *AMCP Mixer-commands
		 */
		export interface IMixer {
		}

		/**
		 *AMCP Channel-commands
		 */
		export interface IChannel {
		}

		/**
		 *AMCP Template Data-commands
		 */
		export interface IData {
		}

		/**
		 *AMCP Thumbnail-commands
		 */
		export interface IThumbnail {
		}

		/**
		 *AMCP Query-commands
		 */
		export interface IQuery {
		}

		/**
		 *AMCP Operation-commands
		 */
		export interface IOperation {
		}
	}
}

/***/
export namespace v21x {
	/***/
	export namespace CasparCGProtocols {
		/***/
		export interface AMCP extends IVideo, ICG, IMixer, IChannel, IData, IThumbnail, IQuery, IOperation {
		}

		/**
		 *AMCP Media-commands
		 */
		export interface IVideo extends v2xx.CasparCGProtocols.IVideo {
		}

		/**
		 *AMCP Template-commands
		 */
		export interface ICG extends v2xx.CasparCGProtocols.ICG {
		}

		/**
		 *AMCP Mixer-commands
		 */
		export interface IMixer extends v2xx.CasparCGProtocols.IMixer {
		}

		/**
		 *AMCP Channel-commands
		 */
		export interface IChannel extends v2xx.CasparCGProtocols.IChannel {
		}

		/**
		 *AMCP Template Data-commands
		 */
		export interface IData extends v2xx.CasparCGProtocols.IData {
		}

		/**
		 *AMCP Thumbnail-commands
		 */
		export interface IThumbnail extends v2xx.CasparCGProtocols.IThumbnail {
		}

		/**
		 *AMCP Query-commands
		 */
		export interface IQuery extends v2xx.CasparCGProtocols.IQuery {
		}

		/**
		 *AMCP Operation-commands
		 */
		export interface IOperation extends v2xx.CasparCGProtocols.IOperation {
		}
	}
}