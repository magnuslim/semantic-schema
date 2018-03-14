const Validator = require('../../index').validator;
const assert = require('assert');

describe('primitive type', function() {
    it('string:  data should be the declared string', function() {
        let schema = 'hello world';
        let validator = Validator.from(schema);
        assert(validator.validate('hello world') === true);
        assert(validator.validate('hi world')    === false);
    });
    it('number:  data should be the declared number', function() {
        let schema = 12.3;
        let validator = Validator.from(schema);
        assert(validator.validate(12.3) === true);
        assert(validator.validate(12)   === false);
    });
    it('integer: data should be the declared integer', function() {
        let schema = 123;
        let validator = Validator.from(schema);
        assert(validator.validate(123) === true);
        assert(validator.validate(12)  === false);
    });
    it('boolean: data should be the declared boolean', function() {
        let schema = true;
        let validator = Validator.from(schema);
        assert(validator.validate(true)   === true);
        assert(validator.validate(false)  === false);
    });
    it('null:    data should be null', function() {
        let schema = null;
        let validator = Validator.from(schema);
        assert(validator.validate(null)       === true);
        assert(validator.validate(undefined)  === false);
        assert(validator.validate(0)          === false);
        assert(validator.validate('')         === false);
    });
});