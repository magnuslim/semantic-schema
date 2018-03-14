const Validator = require('../../index').validator;
const assert = require('assert');

describe('array', function() {
    it('string array:  data should be one of the allowed string', function() {
        let schema = ['hello', 'world'];
        let validator = Validator.from(schema);
        assert(validator.validate('hello') === true);
        assert(validator.validate('world') === true);
        assert(validator.validate('hi')    === false);
    });
    it('number array:  data should be one of the allowed number', function() {
        let schema = [1, 2.2];
        let validator = Validator.from(schema);
        assert(validator.validate(1)    === true);
        assert(validator.validate(2.2)  === true);
        assert(validator.validate(2.22) === false);
    });
    it('integer array: data should be one of the allowed integer', function() {
        let schema = [1, 2];
        let validator = Validator.from(schema);
        assert(validator.validate(1) === true);
        assert(validator.validate(2) === true);
        assert(validator.validate(0) === false);
    });
    it('boolean array: data should be one of the allowed boolean', function() {
        let schema = [true, false]; // Yes, it works... However consider using boolean() instead of it.
        let validator = Validator.from(schema);
        assert(validator.validate(true) === true);
        assert(validator.validate(false) === true);
    });
});