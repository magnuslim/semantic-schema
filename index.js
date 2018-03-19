const BaseSchema    = require('./src/schema/base');
const ObjectSchema  = require('./src/schema/object');
const ArraySchema   = require('./src/schema/array');
const StringSchema  = require('./src/schema/string');
const NumberSchema  = require('./src/schema/number');
const IntegerSchema = require('./src/schema/integer');
const BooleanSchema = require('./src/schema/boolean');
const NullSchema    = require('./src/schema/null');
const OneOfSchema   = require('./src/schema/one_of');

const schema = {
    object: (properties) => {
        let schema = new ObjectSchema();
        if (properties) schema.properties(properties);
        return schema;
    }, 
    array: (item) => {
        let schema = new ArraySchema();
        if (item) schema.item(item);
        return schema;
    }, 
    string: (pattern) => {
        let schema = new StringSchema();
        if (pattern) schema.pattern(pattern);
        return schema;
    }, 
    integer: (min, max) => {
        let schema = new IntegerSchema();
        if(min) schema.min(min);
        if(max) schema.max(max);
        return schema;
    }, 
    number: (min, max) => {
        let schema = new NumberSchema();
        if(min) schema.min(min);
        if(max) schema.max(max);
        return schema;
    }, 
    boolean: () => new BooleanSchema(), 
    NULL: () => new NullSchema(),
    empty: () => new NullSchema(),
    oneOf: (...items) => new OneOfSchema(...items),
    invalid: () => new BaseSchema().invalid()
};


module.exports = {
    schema,
    validator: require('./src/validator'),
}
