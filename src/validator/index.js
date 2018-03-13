const Ajv = require('ajv');
const ajv = new Ajv();
require('ajv-keywords')(ajv, 'switch');

module.exports = class Validator {
    constructor(describer) {
        this._schema = require('../sugar').resolve(describer).normalize();
        this._validate = ajv.compile(this._schema);
    }
    
    static from(describer) {
        return new Validator(describer);
    }

    validate(instance) {
        return this._validate(instance);
    }
    
    errors() {
        return this._validate.errors;
    }
    errorsText(errors) {
        return errors ? ajv.errorsText(errors) : ajv.errorsText(this.errors());
    }
    get jsonSchema() {
        return this._schema;
    }
}