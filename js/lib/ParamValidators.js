import { Enum } from "./ServerStateEnum";
export var Validation;
(function (Validation) {
    /**
     *
     */
    class AbstractValidator {
        constructor() {
            this.resolved = false;
        }
    }
    Validation.AbstractValidator = AbstractValidator;
    /**
     *
     */
    class StringValidator extends AbstractValidator {
        /**
         *
         */
        constructor(lazy = true) {
            super();
            this.lazy = lazy;
        }
        /**
         *
         */
        resolve(data) {
            let textstring = "";
            function checkTextstring(rawClipNameString) {
                if (rawClipNameString == null) {
                    return "";
                }
                // trim all non-textual content
                rawClipNameString = rawClipNameString.replace(/(^[\s\W]+|[\s\W]+$)/gi, "");
                // check length
                if (rawClipNameString.length === 0) {
                    return "";
                }
                return rawClipNameString;
            }
            if (Array.isArray(data)) {
                let i = 0;
                // switch lazy/greedy mode
                if (this.lazy) {
                    // lazy = return first valid hit
                    do {
                        textstring = checkTextstring(data[i]);
                        i++;
                    } while (textstring == null);
                }
                else {
                    // greedy 
                    textstring = "";
                    data.forEach(i => {
                        let o = checkTextstring(i);
                        textstring += (o) ? o + " " : "";
                    });
                }
            }
            else if (typeof data === "object" || typeof data === "string") {
                textstring = data !== null ? data.toString() : "";
            }
            if (!checkTextstring(textstring)) {
                return false;
            }
            return textstring;
        }
    }
    Validation.StringValidator = StringValidator;
    /** */
    class FilterValidator extends StringValidator {
    }
    Validation.FilterValidator = FilterValidator;
    /** */
    class URLValidator extends StringValidator {
        resolve(data) {
            let url = super.resolve(data).toString();
            // add quotation
            let quotedUrl = `"${url}"`;
            return { raw: url, payload: quotedUrl };
        }
    }
    Validation.URLValidator = URLValidator;
    /** */
    class ChannelLayoutValidator extends StringValidator {
    }
    Validation.ChannelLayoutValidator = ChannelLayoutValidator;
    /**
     *
     */
    class ClipNameValidator extends AbstractValidator {
        /**
         *
         */
        resolve(data) {
            let clipName = "";
            function checkClipNameString(rawClipNameString) {
                if (rawClipNameString == null) {
                    return "";
                }
                // trim all non-textual content
                rawClipNameString = rawClipNameString.replace(/(^[\s\W]+|[\s\W]+$)/gi, "");
                // check length
                if (rawClipNameString.length === 0) {
                    return "";
                }
                return rawClipNameString;
            }
            if (Array.isArray(data)) {
                let i = 0;
                do {
                    clipName = checkClipNameString(data[i]);
                    i++;
                } while (clipName == null);
            }
            else if (typeof data === "object" || typeof data === "string") {
                clipName = data !== null ? data.toString() : "";
            }
            if (!checkClipNameString(clipName)) {
                return false;
            }
            // add quotation
            let quotedClipName = `"${clipName}"`;
            return { raw: clipName, payload: quotedClipName };
        }
    }
    Validation.ClipNameValidator = ClipNameValidator;
    /**
     *
     */
    class TemplateNameValidator extends ClipNameValidator {
    }
    Validation.TemplateNameValidator = TemplateNameValidator;
    /**
     *
     */
    class DataNameValidator extends ClipNameValidator {
    }
    Validation.DataNameValidator = DataNameValidator;
    /**
     *
     */
    class EnumValidator extends AbstractValidator {
        /**
         *
         */
        constructor(_enumClass) {
            super();
            this._enumClass = _enumClass;
        }
        /**
         *
         */
        resolve(data) {
            if (data instanceof this._enumClass) {
                return data.value;
            }
            else if (typeof data === "string") {
                let stringCast = data !== null ? data.toString() : "";
                // format stringy enum value
                stringCast = stringCast.toUpperCase();
                stringCast = stringCast.replace(" ", "_");
                if (this._enumClass.hasOwnProperty(stringCast)) {
                    return this._enumClass[stringCast].value;
                }
            }
            return false;
        }
    }
    Validation.EnumValidator = EnumValidator;
    /**
     *
     */
    class ChannelFormatValidator extends AbstractValidator {
        /**
         *
         */
        constructor() {
            super();
        }
        /**
         *
         */
        resolve(data) {
            if (data instanceof Enum.ChannelFormat) {
                return data.value;
            }
            else if (typeof data === "string") {
                let stringCast = data !== null ? data.toString() : "";
                // format stringy enum value
                stringCast = stringCast.toUpperCase();
                stringCast = stringCast.replace(" ", "_");
                if (Enum.ChannelFormat.hasOwnProperty(stringCast)) {
                    return Enum.ChannelFormat[stringCast].value;
                }
                else if (Enum.ChannelFormat.hasOwnProperty("SD_" + stringCast)) {
                    return Enum.ChannelFormat["SD_" + stringCast].value;
                }
                else if (Enum.ChannelFormat.hasOwnProperty("HD_" + stringCast)) {
                    return Enum.ChannelFormat["HD_" + stringCast].value;
                }
                else if (Enum.ChannelFormat.hasOwnProperty("UHD_" + stringCast)) {
                    return Enum.ChannelFormat["UHD_" + stringCast].value;
                }
            }
            return false;
        }
    }
    Validation.ChannelFormatValidator = ChannelFormatValidator;
    /**
     *
     */
    class KeywordValidator extends AbstractValidator {
        /**
         *
         */
        constructor(keyword, caseSensitive = false) {
            super();
            this._keyword = keyword;
            this._caseSensitive = caseSensitive;
        }
        /**
         *
         */
        resolve(data) {
            let keywordCopy = this._keyword;
            if (!this._caseSensitive) {
                keywordCopy = keywordCopy.toLowerCase();
            }
            if (Array.isArray(data)) {
                if (!this._caseSensitive) {
                    data = data.map(value => String(value).toLowerCase());
                }
                if (data.indexOf(keywordCopy) > -1) {
                    return this._keyword;
                }
            }
            else if (typeof data === "object" && data !== null) {
                let objectCast = data;
                if (!this._caseSensitive) {
                    for (let key in objectCast) {
                        objectCast[key] = String(objectCast[key]).toLowerCase();
                    }
                }
                if (objectCast.hasOwnProperty(keywordCopy)) {
                    return this._keyword;
                }
            }
            else if (typeof data === "string") {
                if (!this._caseSensitive) {
                    data = String(data).toLowerCase();
                }
                if (data === keywordCopy) {
                    return this._keyword;
                }
            }
            return false;
        }
    }
    Validation.KeywordValidator = KeywordValidator;
    /**
     *
     */
    class FrameValidator extends AbstractValidator {
        /**
         *
         */
        constructor(keyword) {
            super();
            this._keyword = keyword;
        }
        /**
         *
         */
        resolve(data) {
            if (Array.isArray(data)) {
                let index;
                data = data.map(element => String(element).toLowerCase());
                if ((index = data.indexOf(this._keyword.toLowerCase())) > -1) {
                    data = parseInt(data[index + 1], 10);
                }
            }
            else if (typeof data === "object" && data !== null) {
                let objectCast = data;
                if (objectCast.hasOwnProperty(this._keyword)) {
                    (data = objectCast[this._keyword]);
                }
            }
            else if (typeof data === "string") {
                data = Number(data);
            }
            if (typeof data === "number") {
                let numberCast;
                if ((numberCast = data) >= 0) {
                    return numberCast;
                }
            }
            return false;
        }
    }
    Validation.FrameValidator = FrameValidator;
    /**
     *
     */
    class PositiveNumberValidatorBetween extends AbstractValidator {
        /**
         *
         */
        constructor(_min = Number.NEGATIVE_INFINITY, _max = Number.POSITIVE_INFINITY) {
            super();
            this._min = _min;
            this._max = _max;
        }
        /**
         *
         */
        resolve(data) {
            if (typeof data === "number") {
                let numberCast = Math.max(Math.min(data, this._max), this._min);
                if (numberCast >= 0) {
                    return numberCast;
                }
            }
            return false;
        }
    }
    Validation.PositiveNumberValidatorBetween = PositiveNumberValidatorBetween;
    /**
     *
     */
    class PositiveNumberValidator extends PositiveNumberValidatorBetween {
        /**
         *
         */
        constructor() {
            super();
        }
    }
    Validation.PositiveNumberValidator = PositiveNumberValidator;
    /**
     *
     */
    class PositiveNumberRoundValidatorBetween extends PositiveNumberValidatorBetween {
        /**
         *
         */
        resolve(data) {
            if (data) {
                return Number(super.resolve(data)).toFixed();
            }
            return NaN;
        }
    }
    Validation.PositiveNumberRoundValidatorBetween = PositiveNumberRoundValidatorBetween;
    /**
     *
     */
    class NumberValidatorBetween extends AbstractValidator {
        /**
         *
         */
        constructor(_min = Number.NEGATIVE_INFINITY, _max = Number.POSITIVE_INFINITY) {
            super();
            this._min = _min;
            this._max = _max;
        }
        /**
         *
         */
        resolve(data) {
            if (typeof data === "number") {
                let numberCast = Math.max(Math.min(data, this._max), this._min);
                return numberCast;
            }
            return false;
        }
    }
    Validation.NumberValidatorBetween = NumberValidatorBetween;
    /**
     *
     */
    class NumberValidator extends NumberValidatorBetween {
        /**
         *
         */
        constructor() {
            super();
        }
    }
    Validation.NumberValidator = NumberValidator;
    /** */
    class DecklinkDeviceValidator extends PositiveNumberValidator {
    }
    Validation.DecklinkDeviceValidator = DecklinkDeviceValidator;
    /**
     *
     */
    class BooleanValidatorWithDefaults extends AbstractValidator {
        /**
         *
         */
        constructor(_valueOnSuccess, _valueOnFail) {
            super();
            this._valueOnSuccess = _valueOnSuccess;
            this._valueOnFail = _valueOnFail;
        }
        /**
         *
         */
        resolve(data, key) {
            if (Array.isArray(data)) {
                let index;
                data = data.map(element => String(element).toLowerCase());
                if ((index = data.indexOf(key.toLowerCase())) > -1) {
                    data = data[index + 1];
                    if (data === undefined) {
                        data = data[index];
                    }
                }
                else {
                    // can't resolve array
                    data = false;
                }
            }
            let isValid = false;
            if (typeof data === "string") {
                if (data === "true") {
                    isValid = true;
                }
                else if (data === "1") {
                    isValid = true;
                }
                else if (data === key) {
                    isValid = true;
                }
            }
            else {
                isValid = (!!data.valueOf());
            }
            if (isValid) {
                return (this._valueOnSuccess !== undefined) ? this._valueOnSuccess : isValid;
            }
            else {
                return (this._valueOnFail !== undefined) ? this._valueOnFail : isValid;
            }
        }
    }
    Validation.BooleanValidatorWithDefaults = BooleanValidatorWithDefaults;
    /**
     *
     */
    class BooleanValidator extends BooleanValidatorWithDefaults {
        /**
         *
         */
        constructor() {
            super();
        }
    }
    Validation.BooleanValidator = BooleanValidator;
    /**
     *
     */
    class TemplateDataValidator extends AbstractValidator {
        /**
         *
         */
        resolve(data) {
            let stringCast = data.toString();
            // data is object: serialize
            if (typeof data === "object" && data !== null) {
                stringCast = JSON.stringify(data);
            }
            /*	// data is string, try to de-serialize to validate as JSON
                try {
                    let objectCast = JSON.parse(stringCast);
                    return stringCast;
                } catch (e) {}
    
                // data is string, try to de-serialize to validate as XML
                let xmlCast;
                parseString(stringCast, {async: false}, (err, res) => {
                    if (res) {
                        xmlCast = res;
                    }
                });
                if (xmlCast) {
                    return stringCast;
                }*/
            // add qoutation 
            stringCast = stringCast.replace(/\"/g, "\\\"");
            let quotedString = `"${stringCast}"`;
            return { raw: stringCast, payload: quotedString };
        }
    }
    Validation.TemplateDataValidator = TemplateDataValidator;
})(Validation || (Validation = {}));
