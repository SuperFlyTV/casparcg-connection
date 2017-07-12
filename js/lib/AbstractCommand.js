// ResponseNS
import { Response as ResponseNS } from "./ResponseSignature";
var ResponseSignature = ResponseNS.ResponseSignature;
// Validation ND
import { Validation as ValidationNS } from "./ParamValidators";
var PositiveNumberValidatorBetween = ValidationNS.PositiveNumberRoundValidatorBetween;
/**
 *
 */
export var Command;
(function (Command) {
    /**
     *
     */
    class AMCPResponse {
        toString() {
            if (typeof this.raw === "string") {
                return this.raw.replace(/\r?\n|\r/gi, "");
            }
            return "";
        }
    }
    Command.AMCPResponse = AMCPResponse;
    /**
     *
     */
    let IAMCPStatus;
    (function (IAMCPStatus) {
        IAMCPStatus[IAMCPStatus["Invalid"] = -1] = "Invalid";
        IAMCPStatus[IAMCPStatus["New"] = 0] = "New";
        IAMCPStatus[IAMCPStatus["Initialized"] = 1] = "Initialized";
        IAMCPStatus[IAMCPStatus["Queued"] = 2] = "Queued";
        IAMCPStatus[IAMCPStatus["Sent"] = 3] = "Sent";
        IAMCPStatus[IAMCPStatus["Suceeded"] = 4] = "Suceeded";
        IAMCPStatus[IAMCPStatus["Failed"] = 5] = "Failed";
        IAMCPStatus[IAMCPStatus["Timeout"] = 6] = "Timeout";
    })(IAMCPStatus = Command.IAMCPStatus || (Command.IAMCPStatus = {}));
    /**
     *
     */
    function isIAMCPCommand(object) {
        // @todo: better inheritance type checking
        for (let prop in AbstractCommand.prototype) {
            if (object[prop] === undefined) {
                return false;
            }
        }
        return true;
    }
    Command.isIAMCPCommand = isIAMCPCommand;
    /**
     *
     */
    class AbstractCommand {
        // @todo: add concept of "variants", adding an ENUM to variants of the same (query) verb-command. INFO x INFO y, but not Thumbnail Retriece and thumbnail generate, different verbs
        // not LOG (action, not query)
        // INFO, HELP
        // @todo:
        // channel vs layer-specific vs layer-fallback addresses
        // NB.: INFO BOTH LAYER AND CHANNEL!!!!!!!!
        // INFO, SWAP, REMOVE, MIXER CLEAR, CLEAR, 
        // param getter/setters
        // param list (dynamic)
        // media info/template file-type to generate param data for fields
        /**
         *
         */
        constructor(params, context) {
            this.context = context;
            this.response = new AMCPResponse();
            this.responseProtocol = new ResponseSignature();
            this._status = IAMCPStatus.New;
            this._payload = {};
            // parse params to objects
            let paramsArray = [];
            // conform params to array
            if (Array.isArray(params)) {
                paramsArray = params;
            }
            else {
                paramsArray = [params];
            }
            this._stringParamsArray = [];
            this._objectParams = {};
            for (let element of paramsArray) {
                if (element === undefined) {
                    continue;
                }
                if (typeof element === "string") {
                    element = element.toString().trim();
                    this._stringParamsArray = this._stringParamsArray.concat([...element.toString().split(/\s+/)]); // @todo: string delimiter pairing (,;) -> objectArray
                }
                else if (typeof element === "object") {
                    for (let prop in element) {
                        this._objectParams[prop] = element[prop];
                    }
                }
            }
        }
        /**
         *
         */
        validateParams() {
            let required = this.paramProtocol ? this.paramProtocol.filter(signature => signature.required.valueOf() === true) : [];
            let optional = this.paramProtocol ? this.paramProtocol.filter(signature => signature.required.valueOf() === false) : [];
            // check all required
            for (let signature of required) {
                if (!this.validateParam(signature)) {
                    return false;
                }
            }
            // add valid optionals
            optional.forEach((signature) => {
                this.validateParam(signature);
            });
            if (!this.validateProtocolLogic()) {
                return false;
            }
            let validParams = this.paramProtocol ? this.paramProtocol.filter((param) => param.resolved && param.payload !== null) : [];
            let invalidParams = this.paramProtocol ? this.paramProtocol.filter((param) => param.resolved && param.payload === null && param.required.valueOf() === true) : [];
            if (invalidParams.length > 0) {
                return false;
            }
            validParams.forEach((param) => {
                let payload = { key: "", value: {}, raw: null };
                payload.key = param.key || "";
                payload.value = param.payload !== undefined && param.payload !== null ? param.payload : {};
                payload.raw = param.raw;
                this.payload[param.name] = payload;
            });
            return true;
        }
        /**
         *
         */
        validateParam(signature) {
            let result;
            let param;
            // objectParams parsing
            if (this._objectParams.hasOwnProperty(signature.name)) {
                param = this._objectParams[signature.name];
            }
            else {
                // stringParam parsing	
                if (this._stringParamsArray.length > 0) {
                    param = this._stringParamsArray;
                }
                else {
                    return false;
                }
            }
            // filter out undefined object params
            if (param === undefined) {
                return false;
            }
            if ((result = signature.validation.resolve(param, (signature.key || signature.name))) !== false) {
                signature.validation.resolved = true;
                if (typeof result === "object" && result.hasOwnProperty("raw") && result.hasOwnProperty("payload")) {
                    signature.payload = result.payload;
                    signature.raw = result.raw;
                }
                else {
                    signature.payload = result;
                }
                return true;
            }
            else {
                return false;
            }
        }
        /**
         *
         */
        validateProtocolLogic() {
            if (!this.protocolLogic) {
                return true;
            }
            let result;
            for (let rule of this.protocolLogic) {
                if ((result = rule.resolve(this.paramProtocol)) !== null) {
                    this.paramProtocol = result;
                }
                else {
                    return false;
                }
            }
            return true;
        }
        /**
         *
         */
        validateResponse(response) {
            // assign raw response
            this.response.raw = response.responseString;
            this.response.code = response.statusCode;
            // code is correct
            if (response.statusCode !== this.responseProtocol.code) {
                // @todo: fallbacks? multiple valid codes?
                return false;
            }
            // data is valid
            let validData = {};
            if (this.responseProtocol.validator) {
                let validator = Object.create(this.responseProtocol.validator["prototype"]);
                if ((validData = validator.resolve(response)) === false) {
                    return false;
                }
            }
            // data gets parsed
            if (this.responseProtocol.parser && validData) {
                let parser = Object.create(this.responseProtocol.parser["prototype"]);
                parser.context = this.context;
                if ((validData = parser.parse(validData)) === false) {
                    return false;
                }
            }
            this.response.data = validData;
            return true;
        }
        /**
         *
         */
        get payload() {
            return this._payload;
        }
        /**
         *
         */
        get id() {
            return this._id || (new Date().getTime() + Math.random() * 100).toString();
        }
        /**
         *
         */
        get name() {
            return this.constructor["name"];
        }
        /**
         *
         */
        validateChannel() {
            let result;
            let validator = new PositiveNumberValidatorBetween(1, 9999);
            let param;
            if (this._objectParams.hasOwnProperty("channel")) {
                param = this._objectParams["channel"];
            }
            else {
                param = NaN;
            }
            if ((result = validator.resolve(param)) !== false) {
                return Number(result);
            }
            // @todo: dispatch error
            return NaN;
        }
        /**
         *
         */
        validateLayer(fallback) {
            let result;
            let validator = new PositiveNumberValidatorBetween(0, 9999);
            let param;
            if (this._objectParams.hasOwnProperty("layer")) {
                param = this._objectParams["layer"];
            }
            else {
                param = fallback;
            }
            if ((result = validator.resolve(param)) !== false) {
                return Number(result);
            }
            // @todo: dispatch error
            return 0;
        }
        /**
         *
         */
        get protocolLogic() {
            return this.constructor["protocolLogic"] || [];
        }
        /**
         *
         */
        get channel() {
            return -1;
        }
        /**
         *
         */
        get layer() {
            return -1;
        }
        /**
         *
         */
        get address() {
            return "";
        }
        /**
         *
         */
        get status() {
            return this._status;
        }
        /**
         *
         */
        set status(code) {
            if (code !== this._status) {
                this._status = code;
                if (this.onStatusChanged) {
                    this.onStatusChanged(this._status);
                }
            }
        }
        /**
         *
         */
        serialize() {
            return {
                channel: this.channel,
                layer: this.layer,
                payload: this.payload,
                response: this.response,
                status: this.status,
                _commandName: this.constructor["name"],
                _objectParams: this._objectParams,
                _stringParamsArray: this._stringParamsArray
            };
        }
        /**
         *
         */
        populate(cmdVO, id) {
            this._stringParamsArray = cmdVO._stringParamsArray;
            this._objectParams = cmdVO._objectParams;
            this.response = cmdVO.response;
            this._id = id;
        }
        /**
         *
         */
        toString() {
            let message = "";
            switch (this.status) {
                case IAMCPStatus.Invalid:
                    message = "Invalid command";
                    break;
                case IAMCPStatus.New:
                    message = "New command";
                    break;
                case IAMCPStatus.Queued:
                    message = "Queued command";
                    break;
                case IAMCPStatus.Sent:
                    message = "Sent command";
                    break;
                case IAMCPStatus.Suceeded:
                    message = "Succeeded command";
                    break;
                case IAMCPStatus.Failed:
                    message = "Failed command";
                    break;
            }
            return message;
        }
    }
    Command.AbstractCommand = AbstractCommand;
    /**
     *
     */
    class AbstractOrChannelOrLayerCommand extends AbstractCommand {
        /**
         *
         */
        constructor(params, context) {
            super(params, context);
            let channel = this.validateChannel();
            let layer = this.validateLayer();
            if (channel) {
                this._channel = channel;
                if (layer) {
                    this._layer = layer;
                }
            }
        }
        /**
         *
         */
        get channel() {
            return this._channel || -1;
        }
        /**
         *
         */
        get layer() {
            return this._layer || -1;
        }
        /**
         *
         */
        get address() {
            let address = "";
            if (this.channel && (this.channel > -1)) {
                address = this.channel.toString();
            }
            else {
                return address;
            }
            if (this.layer && (this.layer > -1)) {
                address = `${address}-${this.layer}`;
            }
            return address;
        }
    }
    Command.AbstractOrChannelOrLayerCommand = AbstractOrChannelOrLayerCommand;
    /**
     *
     */
    class AbstractChannelCommand extends AbstractCommand {
        /**
         *
         */
        constructor(params, context) {
            super(params, context);
            let channel = this.validateChannel();
            if (channel) {
                this._channel = channel;
                this._layer = -1;
            }
            else {
                throw new Error("Needs channel"); // @todo: dispatch
            }
        }
        /**
         *
         */
        get channel() {
            return this._channel || -1;
        }
        /**
         *
         */
        get layer() {
            return -1;
        }
        /**
         *
         */
        get address() {
            if (this.channel) {
                return this.channel.toString();
            }
            else {
                return "";
                // @todo throw???
            }
        }
    }
    Command.AbstractChannelCommand = AbstractChannelCommand;
    /**
     *
     */
    class AbstractLayerCommand extends AbstractCommand {
        /**
         *
         */
        constructor(params, context) {
            super(params, context);
            let channel = this.validateChannel();
            let layer = this.validateLayer();
            if (channel && layer) {
                this._channel = channel;
                this._layer = layer;
            }
            else {
                throw new Error("Needs both channel and layer"); // @todo: dispatch
            }
        }
        /**
         *
         */
        get channel() {
            return this._channel || -1;
        }
        /**
         *
         */
        get layer() {
            return this._layer || -1;
        }
        /**
         *
         */
        get address() {
            let address;
            if (this.channel && (this.channel > -1)) {
                address = this.channel.toString();
            }
            else {
                return "";
                // @todo throw???
            }
            if (this.layer && (this.layer > -1)) {
                address = `${address}-${this.layer}`;
            }
            else {
                return "";
                // @todo throw???
            }
            return address;
        }
    }
    Command.AbstractLayerCommand = AbstractLayerCommand;
    /**
     *
     */
    class AbstractChannelOrLayerCommand extends AbstractCommand {
        /**
         *
         */
        constructor(params, context) {
            super(params, context);
            let channel = this.validateChannel();
            let layer = this.validateLayer();
            if (channel) {
                this._channel = channel;
                if (layer) {
                    this._layer = layer;
                }
            }
            else {
                throw new Error("Needs at least channel"); // @todo: dispatch
            }
        }
        /**
         *
         */
        get channel() {
            return this._channel || -1;
        }
        /**
         *
         */
        get layer() {
            return this._layer || -1;
        }
        /**
         *
         */
        get address() {
            let address;
            if (this.channel) {
                address = this.channel.toString();
            }
            else {
                return "";
                // @todo throw???
            }
            if (this.layer && (this.layer > -1)) {
                address = `${address}-${this.layer}`;
            }
            return address;
        }
    }
    Command.AbstractChannelOrLayerCommand = AbstractChannelOrLayerCommand;
    /**
     *
     */
    class AbstractLayerWithFallbackCommand extends AbstractCommand {
        /**
         *
         */
        constructor(params, context) {
            super(params, context);
            let channel = this.validateChannel();
            let layer = this.validateLayer(0);
            if (channel) {
                this._channel = channel;
                this._layer = layer;
            }
            else {
                throw new Error("Needs at least channel, layer will default to 0 if not specified"); // @todo: dispatch
            }
        }
        /**
         *
         */
        get channel() {
            return this._channel || -1;
        }
        /**
         *
         */
        get layer() {
            return this._layer || -1;
        }
        /**
         *
         */
        get address() {
            let address;
            if (this.channel) {
                address = this.channel.toString();
            }
            else {
                return "";
                // @todo throw???
            }
            if (this.layer && (this.layer > -1)) {
                address = `${address}-${this.layer}`;
            }
            return address;
        }
    }
    Command.AbstractLayerWithFallbackCommand = AbstractLayerWithFallbackCommand;
    /**
     *
     */
    class AbstractLayerWithCgFallbackCommand extends AbstractCommand {
        /**
         *
         */
        constructor(params, context) {
            super(params, context);
            let channel = this.validateChannel();
            let layer = this.validateLayer(9999);
            if (channel) {
                this._channel = channel;
                this._layer = layer;
            }
            else {
                throw new Error("Needs at least channel, layer will default to 9999 if not specified"); // @todo: dispatch
            }
        }
        /**
         *
         */
        get channel() {
            return this._channel || -1;
        }
        /**
         *
         */
        get layer() {
            return this._layer || -1;
        }
        /**
         *
         */
        get address() {
            let address;
            if (this.channel) {
                address = this.channel.toString();
            }
            else {
                return "";
                // @todo throw???
            }
            if (this.layer && (this.layer > -1)) {
                address = `${address}-${this.layer}`;
            }
            return address;
        }
    }
    Command.AbstractLayerWithCgFallbackCommand = AbstractLayerWithCgFallbackCommand;
})(Command || (Command = {}));
