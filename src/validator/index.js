const Ajv = require('ajv');
const ajv = new Ajv();
require('ajv-keywords')(ajv, 'switch');

const sugar = require('../syntactic_sugar');

module.exports = {
    validate(schemaDescriber, instance) {
        schemaDescriber = sugar.parseDescriber(schemaDescriber);
        return ajv.validate(schemaDescriber._schema, instance);
    },
    errors() {
        return ajv.errors;
    },
    errorsText(errors, options) {
        return ajv.errorsText(errors, options);
    }
}