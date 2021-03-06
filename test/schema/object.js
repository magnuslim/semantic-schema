const assert = require('assert');
const SemanticSchema = require('../../index');

const { object, string, integer } = SemanticSchema.schema;
const Validator = SemanticSchema.validator;

describe('object', () => {
    it('object()', () => {
        const schema = object();
        const validator = Validator.from(schema);
        assert(validator.validate({}) === true);
        assert(validator.validate({ foo: '' }) === true);
        assert(validator.validate(null) === false);
        assert(validator.validate(undefined) === false);
        assert(validator.validate(false) === false);
        assert(validator.validate(0) === false);
        assert(validator.validate('1.1') === false);
        assert(validator.validate([]) === false);
    });

    it('.properties()', () => {
        const schema = object().properties({
            foo: string(),
            bar: integer(),
        });
        const validator = Validator.from(schema);
        assert(validator.validate({ foo: 'foo' }) === true);
        assert(validator.validate({ foo: 'foo', bar: 123 }) === true);
        assert(validator.validate({ foo: 'foo', bar: 'bar' }) === false);
    });

    it('.require()', () => {
        const schema = object().require('foo');
        const validator = Validator.from(schema);
        assert(validator.validate({ foo: 'foo' }) === true);
        assert(validator.validate({}) === false);
        assert(validator.validate({ bar: 'bar' }) === false);
    });

    it('.patternProperties()', () => {
        const schema = object().patternProperties({
            '^foo|bar$': string(),
        });
        const validator = Validator.from(schema);
        assert(validator.validate({}) === true);
        assert(validator.validate({ foo: 'foo', bar: 'bar' }) === true);
        assert(validator.validate({ foo: 'foo' }) === true);
        assert(validator.validate({ bar: 'bar' }) === true);
        assert(validator.validate({ foo: 'foo', bar: 123 }) === false);
        assert(validator.validate({ foo: 'foo', bar: 'bar', tar: 1 }) === true);
    });

    it('.patternProperties().additionalProperties()', () => {
        const schema = object().patternProperties({
            '^foo|bar$': string(),
        }).additionalProperties(false);
        const validator = Validator.from(schema);
        assert(validator.validate({}) === true);
        assert(validator.validate({ foo: 'foo', bar: 'bar' }) === true);
        assert(validator.validate({ foo: 'foo' }) === true);
        assert(validator.validate({ bar: 'bar' }) === true);
        assert(validator.validate({ foo: 'foo', bar: 123 }) === false);
        assert(validator.validate({ foo: 'foo', bar: 'bar', tar: 1 }) === false);
    });

    it('.additionalProperties()', () => {
        const schema = object().properties({
            foo: string(),
            bar: string(),
        }).additionalProperties();
        const validator = Validator.from(schema);
        assert(validator.validate({ foo: 'foo', bar: 'bar', tar: 123 }) === true);
        assert(validator.validate({ foo: 'foo', bar: 'bar' }) === true);
    });

    describe('if statement', () => {
        it('.if.properties().then.properties()', () => {
            const schema = object()
                .if.properties({ type: string().enum('student') }) // equivalent : .if.properties({type: 'student'})
                .then.properties({
                    type: string().enum('student'),
                    grade: integer(),
                }).require('type', 'grade').additionalProperties(false)
                .elseIf.properties({ type: string().enum('staff') })
                .then.properties({
                    type: string().enum('staff'),
                    salary: integer(),
                }).require('type', 'salary').additionalProperties(false)
                .else.invalid()
                .endIf;
            const validator = Validator.from(schema);
            assert(validator.validate({ type: 'student', grade: 12 }) === true);
            assert(validator.validate({ type: 'staff', salary: 12000 }) === true);
            assert(validator.validate({ type: 'staff', salary: '12000' }) === false);
            assert(validator.validate({ type: 'student', grade: 12, major: 'cs' }) === false);
            assert(validator.validate({ type: 'housewife', salary: 12000 }) === false);
        });

        it('.if.properties().then.require()', () => {
            const schema = object().properties({
                type: string().enum('student', 'staff'),
                grade: integer(),
                salary: integer(),
            }).additionalProperties(false)
                .if.properties({ type: 'student' })
                .then.require('type', 'grade')
                .elseIf.properties({ type: 'staff' })
                .then.require('type', 'salary')
                .else.invalid()
                .endIf;
            const validator = Validator.from(schema);
            assert(validator.validate({ type: 'student', grade: 12 }) === true);
            assert(validator.validate({ type: 'staff', salary: 12000 }) === true);
            assert(validator.validate({ type: 'staff', salary: '12000' }) === false);
            assert(validator.validate({ type: 'student', grade: 12, major: 'cs' }) === false);
            assert(validator.validate({ type: 'housewife', salary: 12000 }) === false);
        });
    });
});
