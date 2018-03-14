const Validator = require('../../index').validator;
const assert = require('assert');

describe('RegExp', function() {
    it('data should match the regular expression.', function() {
        let schema = /^foo|bar$/;
        let validator = Validator.from(schema);
        assert(validator.validate('foo') === true);
        assert(validator.validate('bar') === true);
        assert(validator.validate('hi')  === false);
    });
});