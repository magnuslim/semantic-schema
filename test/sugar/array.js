const assert = require('assert');
const Validator = require('../../index').validator;

describe('array', () => {
    it('string array:  data should be one of the allowed string', () => {
        const schema = ['hello', 'world'];
        const validator = Validator.from(schema);
        assert(validator.validate('hello') === true);
        assert(validator.validate('world') === true);
        assert(validator.validate('hi') === false);
    });
    it('number array:  data should be one of the allowed number', () => {
        const schema = [1, 2.2];
        const validator = Validator.from(schema);
        assert(validator.validate(1) === true);
        assert(validator.validate(2.2) === true);
        assert(validator.validate(2.22) === false);
    });
    it('integer array: data should be one of the allowed integer', () => {
        const schema = [1, 2];
        const validator = Validator.from(schema);
        assert(validator.validate(1) === true);
        assert(validator.validate(2) === true);
        assert(validator.validate(0) === false);
    });
    it('boolean array: data should be one of the allowed boolean', () => {
        // Yes, it works... However consider using boolean() instead of it.
        const schema = [true, false];
        const validator = Validator.from(schema);
        assert(validator.validate(true) === true);
        assert(validator.validate(false) === true);
    });
});
