import { parseString as xmlParser } from "xml2js";
export var Response;
(function (Response) {
    /**
     *
     */
    class StatusValidator {
        /**
         *
         */
        resolve(response) {
            return response.statusCode < 400;
        }
    }
    Response.StatusValidator = StatusValidator;
    /**
     *
     */
    class StringValidator {
        /**
         *
         */
        resolve(response) {
            let result = response.items[0].toString();
            return result.length > 0 ? result : false;
        }
    }
    Response.StringValidator = StringValidator;
    /**
     *
     */
    class XMLValidator {
        /**
         *
         */
        resolve(response) {
            let parseNumbers = function (str) {
                if (!isNaN(str)) {
                    str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
                }
                return str;
            };
            let parseBooleans = function (str) {
                if (str === true || str.toString().toLowerCase() === "true") {
                    return true;
                }
                else if (str === false || str.toString().toLowerCase() === "false") {
                    return false;
                }
                return str;
            };
            let parseLowerCase = function (str) {
                return str.toString().toLowerCase();
            };
            let returnFalse;
            let returnData;
            xmlParser(response.items[0].replace("\n", ""), { explicitRoot: false, async: false, trim: true, explicitArray: false, mergeAttrs: true, attrValueProcessors: [parseNumbers], valueProcessors: [parseNumbers, parseBooleans], tagNameProcessors: [parseLowerCase], attrNameProcessors: [parseLowerCase] }, (error, result) => {
                returnFalse = error;
                returnData = result;
            });
            return returnFalse ? {} : returnData || {};
        }
    }
    Response.XMLValidator = XMLValidator;
    /**
     *
     */
    class ListValidator {
        /**
         *
         */
        resolve(response) {
            // filters on stringitems in items-list and validates if any items present
            let stringItems = response.items.filter((i) => typeof i === "string");
            return stringItems;
        }
    }
    Response.ListValidator = ListValidator;
    /**
     *
     */
    class DataValidator {
        /**
         *
         */
        resolve(response) {
            let result = response.items[0].toString();
            return result.length > 0 ? result : false;
        }
    }
    Response.DataValidator = DataValidator;
    /**
     *
     */
    class Base64Validator {
        /**
         *
         */
        resolve(response) {
            return response.items[0];
        }
    }
    Response.Base64Validator = Base64Validator;
})(Response || (Response = {}));
