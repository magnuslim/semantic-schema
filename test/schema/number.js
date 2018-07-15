const assert = require('assert');
const SemanticSchema = require('../../index');

const { number } = SemanticSchema.schema;
const Validator = SemanticSchema.validator;

describe('number', () => {
    it('number()', () => {
        const schema = number();
        const validator = Validator.from(schema);
        assert(validator.validate(0) === true);
        assert(validator.validate(1) === true);
        assert(validator.validate(1.1) === true);
        assert(validator.validate(-1.1) === true);
        assert(validator.validate(Infinity) === true);
        assert(validator.validate('1.1') === false);
        assert(validator.validate(true) === false);
        assert(validator.validate(null) === false);
        assert(validator.validate(undefined) === false);
        assert(validator.validate({}) === false);
        assert(validator.validate([]) === false);
    });
    it('.enum()', () => {
        const schema = number().enum(1, 2, 3.3);
        const validator = Validator.from(schema);
        assert(validator.validate(1) === true);
        assert(validator.validate(3.3) === true);
        assert(validator.validate(4) === false);
    });
    it('.min() & .max()', () => {
        const schema = number().min(0.9).max(3.1);
        const validator = Validator.from(schema);
        assert(validator.validate(0.9) === true);
        assert(validator.validate(2.2) === true);
        assert(validator.validate(3.1) === true);
        assert(validator.validate(0) === false);
        assert(validator.validate(4) === false);
    });
    it('.exclusiveMin() & .exclusiveMax()', () => {
        const schema = number().exclusiveMin(0.9).exclusiveMax(3.1);
        const validator = Validator.from(schema);
        assert(validator.validate(2.2) === true);
        assert(validator.validate(0) === false);
        assert(validator.validate(0.9) === false);
        assert(validator.validate(3.1) === false);
        assert(validator.validate(4) === false);
    });
    it('.multipleOf()', () => {
        const schema = number().multipleOf(1.11);
        const validator = Validator.from(schema);
        assert(validator.validate(1.11) === true);
        assert(validator.validate(-2.22) === true);
        assert(validator.validate(2.22) === true);
        assert(validator.validate(3.1) === false);
        assert(validator.validate(Infinity) === false);
    });
});
