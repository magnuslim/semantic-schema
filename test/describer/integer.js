const assert = require('power-assert');
const SemanticSchema = require('../../index');
const {integer} = SemanticSchema.describer;
const Validator = SemanticSchema.validator;

describe('integer', function() {
    it('plain describer', function() {
        let schema = integer();
        let validator = Validator.from(schema);
        assert(validator.validate(0)         === true);
        assert(validator.validate(1)         === true);
        assert(validator.validate(1.1)       === false);
        assert(validator.validate(Infinity)  === true);
        assert(validator.validate('1')       === false);
        assert(validator.validate(true)      === false);
        assert(validator.validate(null)      === false);
        assert(validator.validate(undefined) === false);
        assert(validator.validate({})        === false);
        assert(validator.validate([])        === false);
    });
    it('.enum()', function() {
        let schema = integer().enum(1, 2);
        let validator = Validator.from(schema);
        assert(validator.validate(1) === true);
        assert(validator.validate(2) === true);
        assert(validator.validate(3) === false);
    });
    it('.min() & .max()', function() {
        let schema = integer().min(1).max(5);
        let validator = Validator.from(schema);
        assert(validator.validate(1) === true);
        assert(validator.validate(2) === true);
        assert(validator.validate(5) === true);
        assert(validator.validate(0) === false);
        assert(validator.validate(6) === false);
    });
    it('.exclusiveMin() & .exclusiveMax()', function() {
        let schema = integer().exclusiveMin(1).exclusiveMax(5);
        let validator = Validator.from(schema);
        assert(validator.validate(2) === true);
        assert(validator.validate(4) === true);
        assert(validator.validate(1) === false);
        assert(validator.validate(6) === false);
        assert(validator.validate(0) === false);
        assert(validator.validate(6) === false);
    });
    it('.multipleOf()', function() {
        let schema = integer().multipleOf(2);
        let validator = Validator.from(schema);
        assert(validator.validate(2)        === true);
        assert(validator.validate(-2)       === true);
        assert(validator.validate(8)        === true);
        assert(validator.validate(0)        === true);
        assert(validator.validate(Infinity) === false);
    });
});