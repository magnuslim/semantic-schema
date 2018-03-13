const assert = require('power-assert');
const SemanticSchema = require('../../index');
const {NULL} = SemanticSchema.describer;
const Validator = SemanticSchema.validator;

describe('NULL (empty)', function() {
    it('plain describer', function() {
        let schema = NULL();
        let validator = Validator.from(schema);
        assert(validator.validate(null)      === true);
        assert(validator.validate(undefined) === false);
        assert(validator.validate(false)     === false);
        assert(validator.validate(0)         === false);
        assert(validator.validate('1.1')     === false);
        assert(validator.validate({})        === false);
        assert(validator.validate([])        === false);
    });
});