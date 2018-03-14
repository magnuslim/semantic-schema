const assert = require('assert');
const SemanticSchema = require('../../index');
const {string} = SemanticSchema.schema;
const Validator = SemanticSchema.validator;

describe('string', function() {
    it('string()', function() {
        let schema = string();
        let validator = Validator.from(schema);
        assert(validator.validate('')        === true);
        assert(validator.validate('1234')    === true);
        assert(validator.validate(1)         === false);
        assert(validator.validate(1.1)       === false);
        assert(validator.validate(true)      === false);
        assert(validator.validate(null)      === false);
        assert(validator.validate(undefined) === false);
        assert(validator.validate({})        === false);
        assert(validator.validate([])        === false);
    });
    it('.pattern()', function() {
        let schema = string().pattern(/^foo|bar$/);
        let validator = Validator.from(schema);
        assert(validator.validate('foo') === true);
        assert(validator.validate('bar') === true);
        assert(validator.validate('oof') === false);
    });
    it('.enum()', function() {
        let schema = string().enum('foo', 'bar');
        let validator = Validator.from(schema);
        assert(validator.validate('foo') === true);
        assert(validator.validate('bar') === true);
        assert(validator.validate('oof') === false);
    });
    it('.minLength() & maxLength()', function() {
        let schema = string().minLength(1).maxLength(5);
        let validator = Validator.from(schema);
        assert(validator.validate('1')      === true);
        assert(validator.validate('123')    === true);
        assert(validator.validate('12345')  === true);
        assert(validator.validate('')       === false);
        assert(validator.validate('123456') === false);
    });
    it('.length()', function() {
        let schema = string().length(5);
        let validator = Validator.from(schema);
        assert(validator.validate('hello')  === true);
        assert(validator.validate('hi')     === false);
        assert(validator.validate('')       === false);
        assert(validator.validate('hello ') === false);
    });
    it('.multipleOf()', function() {
        let schema = string().pattern(/^[0-9]{1,3}$/);
        let validator = Validator.from(schema);
        assert(validator.validate('1')    === true);
        assert(validator.validate('12')   === true);
        assert(validator.validate('123')  === true);
        assert(validator.validate('1234') === false);
        assert(validator.validate('abc')  === false);
        assert(validator.validate('')     === false);
    });
});