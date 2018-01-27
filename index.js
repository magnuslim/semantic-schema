const BaseDescriber    = require('./src/describer/base'); // vscode's type hinting with fail without this line...
const ObjectDescriber  = require('./src/describer/object');
const ArrayDescriber   = require('./src/describer/array');
const StringDescriber  = require('./src/describer/string');
const NumberDescriber  = require('./src/describer/number');
const IntegerDescriber = require('./src/describer/integer');
const BooleanDescriber = require('./src/describer/boolean');
const NullDescriber    = require('./src/describer/null');
const OneOfDescriber   = require('./src/describer/one_of');
const syntacticSugar   = require('./src/syntactic_sugar');

module.exports = {
    describer: {
        object: (properties) => {
            let describer = new ObjectDescriber();
            if (properties) describer.properties(properties);
            return describer;
        }, 
        array: (item) => {
            let describer = new ArrayDescriber();
            if (item) describer.item(item);
            return describer;
        }, 
        string: (pattern) => {
            let describer = new StringDescriber();
            if (pattern) describer.pattern(pattern);
            return describer;
        }, 
        integer: (min, max) => {
            let describer = new IntegerDescriber();
            if(min) describer.min(min);
            if(max) describer.max(max);
            return describer;
        }, 
        number: (min, max) => {
            let describer = new NumberDescriber();
            if(min) describer.min(min);
            if(max) describer.max(max);
            return describer;
        }, 
        boolean: () => new BooleanDescriber(), 
        NULL: () => new NullDescriber(),
        empty: () => new NullDescriber(),
        //oneOf: (...items) => new OneOfDescriber(...items)
    },
    validator: require('./src/validator'),
    normalize: (describer) => {
        describer = syntacticSugar.parseDescriber(describer);
        return describer.normalize();
    }
}
