const assert = require('assert');
const SemanticSchema = require('../../index');

const { string } = SemanticSchema.schema;
const Validator = SemanticSchema.validator;

describe('string', () => {
    it('string()', () => {
        const schema = string();
        const validator = Validator.from(schema);
        assert(validator.validate('') === true);
        assert(validator.validate('1234') === true);
        assert(validator.validate(1) === false);
        assert(validator.validate(1.1) === false);
        assert(validator.validate(true) === false);
        assert(validator.validate(null) === false);
        assert(validator.validate(undefined) === false);
        assert(validator.validate({}) === false);
        assert(validator.validate([]) === false);
    });
    it('.pattern()', () => {
        const schema = string().pattern(/^foo|bar$/);
        const validator = Validator.from(schema);
        assert(validator.validate('foo') === true);
        assert(validator.validate('bar') === true);
        assert(validator.validate('oof') === false);
    });
    it('.enum()', () => {
        const schema = string().enum('foo', 'bar');
        const validator = Validator.from(schema);
        assert(validator.validate('foo') === true);
        assert(validator.validate('bar') === true);
        assert(validator.validate('oof') === false);
    });
    it('.minLength() & maxLength()', () => {
        const schema = string().minLength(1).maxLength(5);
        const validator = Validator.from(schema);
        assert(validator.validate('1') === true);
        assert(validator.validate('123') === true);
        assert(validator.validate('12345') === true);
        assert(validator.validate('') === false);
        assert(validator.validate('123456') === false);
    });
    it('.length()', () => {
        const schema = string().length(5);
        const validator = Validator.from(schema);
        assert(validator.validate('hello') === true);
        assert(validator.validate('hi') === false);
        assert(validator.validate('') === false);
        assert(validator.validate('hello ') === false);
    });
    it('.multipleOf()', () => {
        const schema = string().pattern(/^[0-9]{1,3}$/);
        const validator = Validator.from(schema);
        assert(validator.validate('1') === true);
        assert(validator.validate('12') === true);
        assert(validator.validate('123') === true);
        assert(validator.validate('1234') === false);
        assert(validator.validate('abc') === false);
        assert(validator.validate('') === false);
    });
});
