const assert = require('assert');
const SemanticSchema = require('../../index');
const {boolean} = SemanticSchema.schema;
const Validator = SemanticSchema.validator;

describe('boolean', function() {
    it('boolean()', function() {
        let schema = boolean();
        let validator = Validator.from(schema);
        assert(validator.validate(true)      === true);
        assert(validator.validate(false)     === true);
        assert(validator.validate('foo')     === false);
        assert(validator.validate(1.1)       === false);
        assert(validator.validate(null)      === false);
        assert(validator.validate(undefined) === false);
        assert(validator.validate({})        === false);
        assert(validator.validate([])        === false);
    });
    it('.enum()', function() {
        let schema = boolean().enum(true);
        let validator = Validator.from(schema);
        assert(validator.validate(true)  === true);
        assert(validator.validate(false) === false);
    });
});