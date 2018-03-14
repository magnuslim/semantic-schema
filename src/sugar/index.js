const ObjectSchema = require('../schema/object');
const ArraySchema = require('../schema/array');
const StringSchema = require('../schema/string');
const NumberSchema = require('../schema/number');
const IntegerSchema = require('../schema/integer');
const BooleanSchema = require('../schema/boolean');
const NullSchema = require('../schema/null');
const BaseSchema = require('../schema/base');

const isObject    = val => require('isobject')(val) && !(val instanceof RegExp);
const isArray     = val => Array.isArray(val);
const isRegExp    = val => val instanceof RegExp;
const isFloat     = val => typeof val === 'number' && !Number.isInteger(val);
const isInteger   = val => Number.isInteger(val);
const isString    = val => typeof val === 'string';
const isBoolean   = val => typeof val === 'boolean';
const isNull      = val => val === null;
const isSchema = val => isObject(val) && isObject(val._schema);

module.exports = {
    /**
     * @returns {BaseSchema}
     */
    resolve: (sugar) => {
        if(isSchema(sugar)) {
            return sugar;
        }
        // treat array as enum
        else if(isArray(sugar)) {
            sugar = [...new Set(sugar)];
            if(sugar.length === 0) {
                throw new Error(`unrecognized definition: ${sugar}`);
            }
            else if(sugar.every(isInteger)) {
                return new IntegerSchema().enum(...sugar);
            }
            else if(sugar.every(i => isInteger(i) || isFloat(i))) {
                return new NumberSchema().enum(...sugar);
            }
            else if(sugar.every(isString)) {
                return new StringSchema().enum(...sugar);
            }
            else if(sugar.every(isObject)) {
                return new ObjectSchema().enum(...sugar);
            }
            else if(sugar.every(isBoolean)) {
                if(sugar.length === 1) {
                    return new BooleanSchema().enum(sugar[0]);
                }
                else if(sugar.length === 2) {
                    return new BooleanSchema();
                }
                else {
                    throw new Error(`unrecognized definition: ${sugar}`);
                }
            }
            else {
                throw new Error(`unrecognized definition: ${sugar}`);
            }
        }
        // treat object as object schema
        else if(isObject(sugar)) {
            return new ObjectSchema().properties(sugar).requiredAll();
        }
        // treat regexp as string schema
        else if(isRegExp(sugar)) {
            return new StringSchema().pattern(sugar);
        }
        // treat other basic types as an certain value. (an enumeration that allow only one value)
        else if(isNull(sugar)) {
            return new NullSchema();
        }
        else if(isString(sugar)) {
            return new StringSchema().enum(sugar);
        }
        else if(isBoolean(sugar)) {
            return new BooleanSchema().enum(sugar);
        }
        else if(isFloat(sugar)) {
            return new NumberSchema().enum(sugar);
        }
        else if(isInteger(sugar)) {
            return new IntegerSchema().enum(sugar);
        }
        else {
            throw new Error(`unrecognized definition: ${sugar}`);
        }
    }
};