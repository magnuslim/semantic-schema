const Ajv = require('ajv');

const ajv = new Ajv();

module.exports = class Validator {
    constructor(schema) {
        this._schema = require('../sugar').resolve(schema).normalize();
        this._validate = ajv.compile(this._schema);
    }

    static from(schema) {
        return new Validator(schema);
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
};
