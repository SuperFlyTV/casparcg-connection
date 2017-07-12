/**
 *
 */
export var Options;
(function (Options) {
    /**
     *
     */
    let QueueMode;
    (function (QueueMode) {
        // SALVO 		= 1,
        QueueMode[QueueMode["SEQUENTIAL"] = 2] = "SEQUENTIAL";
        // SMART 		= 3
    })(QueueMode = Options.QueueMode || (Options.QueueMode = {}));
    /**
     *
     */
    let ServerVersion;
    (function (ServerVersion) {
        ServerVersion[ServerVersion["V2xx"] = 2000] = "V2xx";
        ServerVersion[ServerVersion["V207"] = 2007] = "V207";
        ServerVersion[ServerVersion["V21x"] = 2100] = "V21x";
        ServerVersion[ServerVersion["V210"] = 2110] = "V210";
    })(ServerVersion = Options.ServerVersion || (Options.ServerVersion = {}));
})(Options || (Options = {}));
/**
 *
 */
export class ConnectionOptions {
    constructor(hostOrOptions, port) {
        this.host = "localhost";
        this.port = 5250;
        this.autoConnect = true;
        this.autoReconnect = true;
        this.autoReconnectInterval = 1000;
        this.autoReconnectAttempts = Infinity;
        this.autoServerVersion = true;
        this.serverVersion = Options.ServerVersion.V2xx;
        this.queueMode = Options.QueueMode.SEQUENTIAL; // @todo: change to SALVO once server has command UIDs https://github.com/CasparCG/Server/issues/475
        this.debug = false;
        this.onLog = undefined;
        this.onConnectionStatus = undefined;
        this.onConnectionChanged = undefined;
        this.onConnected = undefined;
        this.onDisconnected = undefined;
        this.onError = undefined;
        // if object
        if (hostOrOptions && typeof hostOrOptions === "object") {
            if (hostOrOptions.hasOwnProperty("host") && hostOrOptions.host !== undefined) {
                let host = hostOrOptions.host;
                let dnsValidation = /((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?)(?:\:([0-9]{4}))?/.exec(host);
                if (dnsValidation) {
                    delete hostOrOptions["host"];
                    // host
                    if (!!dnsValidation[1]) {
                        this.host = dnsValidation[1];
                    }
                    // port
                    if (!!dnsValidation[2]) {
                        this.port = parseInt(dnsValidation[2], 10);
                    }
                }
            }
            // @todo: object assign
            for (let key in hostOrOptions) {
                if (!hostOrOptions.hasOwnProperty(key)) {
                    continue;
                }
                if (this.hasOwnProperty(key)) {
                    this[key] = hostOrOptions[key];
                }
            }
            return;
        }
        // else
        if (typeof hostOrOptions === "string") {
            let dnsValidation = /((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?)(?:\:([0-9]{4}))?/.exec(hostOrOptions.toString());
            if (dnsValidation) {
                // host
                if (!!dnsValidation[1]) {
                    this.host = dnsValidation[1];
                }
                // port
                if (!!dnsValidation[2]) {
                    this.port = parseInt(dnsValidation[2], 10);
                }
            }
            if (port) {
                this.port = port;
            }
        }
    }
}
