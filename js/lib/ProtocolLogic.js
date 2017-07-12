/**
 *
 */
export var Protocol;
(function (Protocol) {
    /**
     *
     */
    class AbstractProtocolLogic {
        /**
         *
         */
        constructor(...fields) {
            this.fields = fields;
        }
    }
    Protocol.AbstractProtocolLogic = AbstractProtocolLogic;
    /**
     *
     */
    class Depends extends AbstractProtocolLogic {
        constructor(...fields) {
            super(...fields);
        }
        /**
         *
         */
        if(target, mustBe) {
            let resolveRef = this.resolve;
            this.resolve = (protocol) => {
                for (let param of protocol) {
                    if (param.name === target && param.payload === mustBe.toString()) {
                        return resolveRef.call(this, protocol);
                    }
                }
                return protocol;
            };
            return this;
        }
        /**
         *
         */
        ifNot(target, cantBe) {
            let resolveRef = this.resolve;
            this.resolve = (protocol) => {
                for (let param of protocol) {
                    if (param.name === target && param.payload === cantBe.toString()) {
                        return protocol;
                    }
                }
                return resolveRef.call(this, protocol);
            };
            return this;
        }
        /**
         *
         */
        resolve(protocol) {
            let valids = protocol.filter((param) => param.resolved && param.name === this.fields[1]);
            if (valids.length === 1) {
                return protocol;
            }
            else {
                return protocol.map((param) => {
                    if (param.name === this.fields[0]) {
                        param.payload = null;
                    }
                    return param;
                });
            }
        }
    }
    Protocol.Depends = Depends;
    /**
     *
     */
    class OneOf extends AbstractProtocolLogic {
        constructor(...fields) {
            super(...fields);
        }
        /**
         *
         */
        resolve(protocol) {
            let valids = protocol.filter((param) => param.resolved && this.fields.indexOf(param.name) > -1);
            if (valids.length === 1) {
                return protocol;
            }
            return [];
        }
    }
    Protocol.OneOf = OneOf;
    /**
     *
     */
    class Coupled extends AbstractProtocolLogic {
        constructor(...fields) {
            super(...fields);
        }
        /**
         *
         */
        resolve(protocol) {
            let valids = protocol.filter((param) => this.fields.indexOf(param.name) > -1 && param.resolved === true);
            if (valids.length >= this.fields.length) {
                return protocol;
            }
            else {
                return protocol.map((param) => {
                    if (this.fields.indexOf(param.name) > -1) {
                        param.payload = null;
                    }
                    return param;
                });
            }
        }
    }
    Protocol.Coupled = Coupled;
})(Protocol || (Protocol = {}));
