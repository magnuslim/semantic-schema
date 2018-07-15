const assert = require('assert');
const SemanticSchema = require('../../index');

const { NULL } = SemanticSchema.schema;
const Validator = SemanticSchema.validator;

describe('null', () => {
    it('NULL() or empty()', () => {
        const schema = NULL();
        const validator = Validator.from(schema);
        assert(validator.validate(null) === true);
        assert(validator.validate(undefined) === false);
        assert(validator.validate(false) === false);
        assert(validator.validate(0) === false);
        assert(validator.validate('1.1') === false);
        assert(validator.validate({}) === false);
        assert(validator.validate([]) === false);
    });
});
