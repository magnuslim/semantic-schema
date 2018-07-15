const assert = require('assert');
const Validator = require('../../index').validator;

describe('RegExp', () => {
    it('data should match the regular expression.', () => {
        const schema = /^foo|bar$/;
        const validator = Validator.from(schema);
        assert(validator.validate('foo') === true);
        assert(validator.validate('bar') === true);
        assert(validator.validate('hi') === false);
    });
});
