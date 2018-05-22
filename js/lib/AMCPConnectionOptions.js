"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var Options;
(function (Options) {
    /**
     *
     */
    var QueueMode;
    (function (QueueMode) {
        QueueMode[QueueMode["SALVO"] = 1] = "SALVO";
        QueueMode[QueueMode["SEQUENTIAL"] = 2] = "SEQUENTIAL";
        // SMART 		= 3
    })(QueueMode = Options.QueueMode || (Options.QueueMode = {}));
    /**
     *
     */
    var CasparCGVersion;
    (function (CasparCGVersion) {
        CasparCGVersion[CasparCGVersion["V2xx"] = 2000] = "V2xx";
        CasparCGVersion[CasparCGVersion["V207"] = 2007] = "V207";
        CasparCGVersion[CasparCGVersion["V21x"] = 2100] = "V21x";
        CasparCGVersion[CasparCGVersion["V210"] = 2110] = "V210";
    })(CasparCGVersion = Options.CasparCGVersion || (Options.CasparCGVersion = {}));
})(Options = exports.Options || (exports.Options = {}));
/**
 *
 */
var ConnectionOptions = /** @class */ (function () {
    function ConnectionOptions(hostOrOptions, port) {
        this.host = 'localhost';
        this.port = 5250;
        this.autoConnect = true;
        this.autoReconnect = true;
        this.autoReconnectInterval = 1000;
        this.autoReconnectAttempts = Infinity;
        this.serverVersion = undefined;
        this.queueMode = Options.QueueMode.SALVO;
        this.virginServerCheck = false;
        this.debug = false;
        this.onLog = undefined;
        this.onConnectionStatus = undefined;
        this.onConnectionChanged = undefined;
        this.onConnected = undefined;
        this.onDisconnected = undefined;
        this.onError = undefined;
        // if object
        var hasSetHostOrPort = false;
        if (hostOrOptions && typeof hostOrOptions === 'object') {
            if (hostOrOptions.hasOwnProperty('host') && hostOrOptions.host !== undefined) {
                var host = hostOrOptions.host;
                var dnsValidation = /((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?)(?:\:([0-9]{4}))?/.exec(host);
                if (dnsValidation) {
                    // host
                    if (dnsValidation[1]) {
                        // port gets set directly, and we need to ignore it in the loop setting all other options
                        hasSetHostOrPort = true;
                        this.host = dnsValidation[1];
                    }
                    // port
                    if (dnsValidation[2]) {
                        // port gets set directly, and we need to ignore it in the loop setting all other options
                        hasSetHostOrPort = true;
                        this.port = parseInt(dnsValidation[2], 10);
                    }
                }
            }
            // @todo: object assign
            for (var key in hostOrOptions) {
                // host or port has been set directly and should not be overridden again
                if (hasSetHostOrPort && (key === 'host' || key === 'port')) {
                    continue;
                }
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
        if (typeof hostOrOptions === 'string') {
            var dnsValidation = /((?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?)(?:\:([0-9]{4}))?/.exec(hostOrOptions.toString());
            if (dnsValidation) {
                // host
                if (dnsValidation[1]) {
                    this.host = dnsValidation[1];
                }
                // port
                if (dnsValidation[2]) {
                    this.port = parseInt(dnsValidation[2], 10);
                }
            }
            if (port) {
                this.port = port;
            }
        }
    }
    return ConnectionOptions;
}());
exports.ConnectionOptions = ConnectionOptions;
