const BaseSchema = require('./src/schema/base');
const ObjectSchema = require('./src/schema/object');
const ArraySchema = require('./src/schema/array');
const StringSchema = require('./src/schema/string');
const NumberSchema = require('./src/schema/number');
const IntegerSchema = require('./src/schema/integer');
const BooleanSchema = require('./src/schema/boolean');
const NullSchema = require('./src/schema/null');
const OneOfSchema = require('./src/schema/one_of');
const AllOfSchema = require('./src/schema/all_of');
const AnyOfSchema = require('./src/schema/any_of');
const RefSchema = require('./src/schema/ref');

const schema = {
    object: (properties) => {
        const objectSchema = new ObjectSchema();
        if (properties) objectSchema.properties(properties);
        return objectSchema;
    },
    array: (item) => {
        const arraySchema = new ArraySchema();
        if (item) arraySchema.item(item);
        return arraySchema;
    },
    string: (pattern) => {
        const stringsSchema = new StringSchema();
        if (pattern) stringsSchema.pattern(pattern);
        return stringsSchema;
    },
    integer: (min, max) => {
        const integerSchema = new IntegerSchema();
        if (min) integerSchema.min(min);
        if (max) integerSchema.max(max);
        return integerSchema;
    },
    number: (min, max) => {
        const numberSchema = new NumberSchema();
        if (min) numberSchema.min(min);
        if (max) numberSchema.max(max);
        return numberSchema;
    },
    boolean: () => new BooleanSchema(),
    NULL: () => new NullSchema(),
    empty: () => new NullSchema(),
    oneOf: (...items) => new OneOfSchema(...items),
    anyOf: (...items) => new AnyOfSchema(...items),
    allOf: (...items) => new AllOfSchema(...items),
    ref: path => new RefSchema(path),
    invalid: () => new BaseSchema().invalid(),
};

module.exports = {
    schema,
    validator: require('./src/validator'),
};
