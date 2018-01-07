const ObjectDescriber = require('./src/describer/object');
const ArrayDescriber = require('./src/describer/array');
const StringDescriber = require('./src/describer/string');
const NumberDescriber = require('./src/describer/number');
const IntegerDescriber = require('./src/describer/integer');
const BooleanDescriber = require('./src/describer/boolean');
const NullDescriber = require('./src/describer/null');
module.exports = {
    describer: {
        object: (properties) => new ObjectDescriber().properties(properties), 
        array: (item = undefined) => item ? new ArrayDescriber().item(item) : new ArrayDescriber(), 
        string: (pattern) => new StringDescriber().pattern(pattern), 
        integer: (min, max) => new IntegerDescriber().min(min).max(max), 
        number: (min, max) => new NumberDescriber().min(min).max(max), 
        boolean: () => new BooleanDescriber(), 
        NULL: () => new NullDescriber(),
    },
    syntacticSugar: require('./src/syntactic_sugar'),
    validator: require('./src/validator')
}