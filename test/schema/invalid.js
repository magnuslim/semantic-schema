const assert = require('assert');
const SemanticSchema = require('../../index');
const {invalid} = SemanticSchema.schema;
const Validator = SemanticSchema.validator;

describe('invalid', function() {
    it('invalid()', function() {
        let schema = invalid();
        let validator = Validator.from(schema);
        assert(validator.validate(null)      === false);
        assert(validator.validate(undefined) === false);
        assert(validator.validate(false)     === false);
        assert(validator.validate(0)         === false);
        assert(validator.validate('1.1')     === false);
        assert(validator.validate({})        === false);
        assert(validator.validate([])        === false);
    });
});