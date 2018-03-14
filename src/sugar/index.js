const ObjectDescriber = require('../describer/object');
const ArrayDescriber = require('../describer/array');
const StringDescriber = require('../describer/string');
const NumberDescriber = require('../describer/number');
const IntegerDescriber = require('../describer/integer');
const BooleanDescriber = require('../describer/boolean');
const NullDescriber = require('../describer/null');
const BaseDescriber = require('../describer/base');

const isObject    = val => require('isobject')(val) && !(val instanceof RegExp);
const isArray     = val => Array.isArray(val);
const isRegExp    = val => val instanceof RegExp;
const isFloat     = val => typeof val === 'number' && !Number.isInteger(val);
const isInteger   = val => Number.isInteger(val);
const isString    = val => typeof val === 'string';
const isBoolean   = val => typeof val === 'boolean';
const isNull      = val => val === null;
const isDescriber = val => isObject(val) && isObject(val._schema);

module.exports = {
    /**
     * @returns {BaseDescriber}
     */
    resolve: (sugar) => {
        if(isDescriber(sugar)) {
            return sugar;
        }
        // treat array as enum
        else if(isArray(sugar)) {
            sugar = [...new Set(sugar)];
            if(sugar.length === 0) {
                throw new Error(`unrecognized definition: ${sugar}`);
            }
            else if(sugar.every(isInteger)) {
                return new IntegerDescriber().enum(...sugar);
            }
            else if(sugar.every(i => isInteger(i) || isFloat(i))) {
                return new NumberDescriber().enum(...sugar);
            }
            else if(sugar.every(isString)) {
                return new StringDescriber().enum(...sugar);
            }
            else if(sugar.every(isObject)) {
                return new ObjectDescriber().enum(...sugar);
            }
            else if(sugar.every(isBoolean)) {
                if(sugar.length === 1) {
                    return new BooleanDescriber().enum(sugar[0]);
                }
                else if(sugar.length === 2) {
                    return new BooleanDescriber();
                }
                else {
                    throw new Error(`unrecognized definition: ${sugar}`);
                }
            }
            else {
                throw new Error(`unrecognized definition: ${sugar}`);
            }
        }
        // treat object as object describer
        else if(isObject(sugar)) {
            return new ObjectDescriber().properties(sugar).requiredAll();
        }
        // treat regexp as string describer
        else if(isRegExp(sugar)) {
            return new StringDescriber().pattern(sugar);
        }
        // treat other basic types as an certain value. (an enumeration that allow only one value)
        else if(isNull(sugar)) {
            return new NullDescriber();
        }
        else if(isString(sugar)) {
            return new StringDescriber().enum(sugar);
        }
        else if(isBoolean(sugar)) {
            return new BooleanDescriber().enum(sugar);
        }
        else if(isFloat(sugar)) {
            return new NumberDescriber().enum(sugar);
        }
        else if(isInteger(sugar)) {
            return new IntegerDescriber().enum(sugar);
        }
        else {
            throw new Error(`unrecognized definition: ${sugar}`);
        }
    }
};