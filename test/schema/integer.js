const assert = require('assert');
const SemanticSchema = require('../../index');

const { integer } = SemanticSchema.schema;
const Validator = SemanticSchema.validator;

describe('integer', () => {
    it('integer()', () => {
        const schema = integer();
        const validator = Validator.from(schema);
        assert(validator.validate(0) === true);
        assert(validator.validate(1) === true);
        assert(validator.validate(1.1) === false);
        assert(validator.validate(Infinity) === true);
        assert(validator.validate('1') === false);
        assert(validator.validate(true) === false);
        assert(validator.validate(null) === false);
        assert(validator.validate(undefined) === false);
        assert(validator.validate({}) === false);
        assert(validator.validate([]) === false);
    });
    it('.enum()', () => {
        const schema = integer().enum(1, 2);
        const validator = Validator.from(schema);
        assert(validator.validate(1) === true);
        assert(validator.validate(2) === true);
        assert(validator.validate(3) === false);
    });
    it('.min() & .max()', () => {
        const schema = integer().min(1).max(5);
        const validator = Validator.from(schema);
        assert(validator.validate(1) === true);
        assert(validator.validate(2) === true);
        assert(validator.validate(5) === true);
        assert(validator.validate(0) === false);
        assert(validator.validate(6) === false);
    });
    it('.exclusiveMin() & .exclusiveMax()', () => {
        const schema = integer().exclusiveMin(1).exclusiveMax(5);
        const validator = Validator.from(schema);
        assert(validator.validate(2) === true);
        assert(validator.validate(4) === true);
        assert(validator.validate(1) === false);
        assert(validator.validate(6) === false);
        assert(validator.validate(0) === false);
        assert(validator.validate(6) === false);
    });
    it('.multipleOf()', () => {
        const schema = integer().multipleOf(2);
        const validator = Validator.from(schema);
        assert(validator.validate(2) === true);
        assert(validator.validate(-2) === true);
        assert(validator.validate(8) === true);
        assert(validator.validate(0) === true);
        assert(validator.validate(Infinity) === false);
    });
});
