const Ajv = require('ajv');
const ajv = new Ajv();
require('ajv-keywords')(ajv, 'switch');

const sugar = require('../syntactic_sugar');

module.exports = class {
    constructor(describer) {
        this._describer = sugar.parseDescriber(describer);
        this._schema = this._describer.normalize();
        this._validate = ajv.compile(this._schema);
    }
    validate(instance) {
        return this._validate(instance);
    }
    errors() {
        return this._validate.errors;
    }
    errorsText(errors) {
        return ajv.errorsText(errors);
    }
    get jsonSchema() {
        return this._schema;
    }
}