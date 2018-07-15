const assert = require('assert');
const Validator = require('../../index').validator;

describe('primitive type', () => {
    it('string:  data should be the declared string', () => {
        const schema = 'hello world';
        const validator = Validator.from(schema);
        assert(validator.validate('hello world') === true);
        assert(validator.validate('hi world') === false);
    });
    it('number:  data should be the declared number', () => {
        const schema = 12.3;
        const validator = Validator.from(schema);
        assert(validator.validate(12.3) === true);
        assert(validator.validate(12) === false);
    });
    it('integer: data should be the declared integer', () => {
        const schema = 123;
        const validator = Validator.from(schema);
        assert(validator.validate(123) === true);
        assert(validator.validate(12) === false);
    });
    it('boolean: data should be the declared boolean', () => {
        const schema = true;
        const validator = Validator.from(schema);
        assert(validator.validate(true) === true);
        assert(validator.validate(false) === false);
    });
    it('null:    data should be null', () => {
        const schema = null;
        const validator = Validator.from(schema);
        assert(validator.validate(null) === true);
        assert(validator.validate(undefined) === false);
        assert(validator.validate(0) === false);
        assert(validator.validate('') === false);
    });
});
