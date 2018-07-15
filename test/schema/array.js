const assert = require('assert');
const SemanticSchema = require('../../index');

const { array, string } = SemanticSchema.schema;
const Validator = SemanticSchema.validator;

describe('array', () => {
    it('array()', () => {
        const schema = array();
        const validator = Validator.from(schema);
        assert(validator.validate([]) === true);
        assert(validator.validate([1, '2']) === true);
        assert(validator.validate(null) === false);
        assert(validator.validate(undefined) === false);
        assert(validator.validate(false) === false);
        assert(validator.validate(0) === false);
        assert(validator.validate('1.1') === false);
        assert(validator.validate({}) === false);
    });
    it('.item()', () => {
        const schema = array().item(string());
        const validator = Validator.from(schema);
        assert(validator.validate([]) === true);
        assert(validator.validate(['1', '2']) === true);
        assert(validator.validate(['1', 2]) === false);
    });
    it('.minItems().maxItems()', () => {
        const schema = array().minItems(1).maxItems(3);
        const validator = Validator.from(schema);
        assert(validator.validate([1]) === true);
        assert(validator.validate([1, 2]) === true);
        assert(validator.validate([1, 2, 3]) === true);
        assert(validator.validate([]) === false);
        assert(validator.validate([1, 2, 3, 4]) === false);
    });
    it('.length()', () => {
        const schema = array().length(3);
        const validator = Validator.from(schema);
        assert(validator.validate([1, 2, 3]) === true);
        assert(validator.validate([1]) === false);
        assert(validator.validate([1, 2, 3, 4]) === false);
    });
    it('.uniqueItems()', () => {
        const schema = array().uniqueItems();
        const validator = Validator.from(schema);
        assert(validator.validate([1, 2, 3]) === true);
        assert(validator.validate([1, 2, 3, 3]) === false);
    });
    it('.contains()', () => {
        const schema = array().contains(string());
        const validator = Validator.from(schema);
        assert(validator.validate([1, 2, '3']) === true);
        assert(validator.validate([1, '2', '3']) === true);
        assert(validator.validate([1, 2, 3]) === false);
        assert(validator.validate([]) === false);
    });
});
