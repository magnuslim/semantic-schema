const ObjectSchema = require('../schema/object');
const StringSchema = require('../schema/string');
const NumberSchema = require('../schema/number');
const IntegerSchema = require('../schema/integer');
const BooleanSchema = require('../schema/boolean');
const NullSchema = require('../schema/null');

const isRef = val => val && val.$ref;
const isObject = val => require('isobject')(val) && !(val instanceof RegExp) && !isRef(val);
const isArray = val => Array.isArray(val);
const isRegExp = val => val instanceof RegExp;
const isFloat = val => typeof val === 'number' && !Number.isInteger(val);
const isInteger = val => Number.isInteger(val);
const isString = val => typeof val === 'string';
const isBoolean = val => typeof val === 'boolean';
const isNull = val => val === null;
const isSchema = val => isObject(val) && isObject(val._current) && isObject(val._tree);

module.exports = {

    resolve: (sugar) => {
        if (isSchema(sugar)) {
            return sugar;
        }
        // treat array as enum
        if (isArray(sugar)) {
            const sugarSet = [...new Set(sugar)];
            if (sugarSet.length === 0) {
                throw new Error(`unrecognized definition: ${JSON.stringify(sugarSet)}`);
            }
            else if (sugarSet.every(isInteger)) {
                return new IntegerSchema().enum(...sugarSet);
            }
            else if (sugarSet.every(i => isInteger(i) || isFloat(i))) {
                return new NumberSchema().enum(...sugarSet);
            }
            else if (sugarSet.every(isString)) {
                return new StringSchema().enum(...sugarSet);
            }
            else if (sugarSet.every(isObject)) {
                return new ObjectSchema().enum(...sugarSet);
            }
            else if (sugarSet.every(isBoolean)) {
                if (sugarSet.length === 1) {
                    return new BooleanSchema().enum(sugarSet[0]);
                }
                if (sugarSet.length === 2) {
                    return new BooleanSchema();
                }

                throw new Error(`unrecognized definition: ${JSON.stringify(sugarSet)}`);
            }
            else {
                throw new Error(`unrecognized definition: ${JSON.stringify(sugarSet)}`);
            }
        }
        // treat object as object schema
        else if (isObject(sugar)) {
            return new ObjectSchema().properties(sugar).require(...Object.keys(sugar));
        }
        // treat regexp as string schema
        else if (isRegExp(sugar)) {
            return new StringSchema().pattern(sugar);
        }
        // treat other basic types as an certain value. (an enumeration that allow only one value)
        else if (isNull(sugar)) {
            return new NullSchema();
        }
        else if (isString(sugar)) {
            return new StringSchema().enum(sugar);
        }
        else if (isBoolean(sugar)) {
            return new BooleanSchema().enum(sugar);
        }
        else if (isFloat(sugar)) {
            return new NumberSchema().enum(sugar);
        }
        else if (isInteger(sugar)) {
            return new IntegerSchema().enum(sugar);
        }
        else {
            throw new Error(`unrecognized definition: ${sugar}`);
        }
    },
};
