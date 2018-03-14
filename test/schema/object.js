const assert = require('assert');
const SemanticSchema = require('../../index');
const {object, string, integer} = SemanticSchema.schema;
const Validator = SemanticSchema.validator;

describe('object', function() {

    it('object()', function() {
        let schema = object();
        let validator = Validator.from(schema);
        assert(validator.validate({})        === true);
        assert(validator.validate({foo: ''}) === true);
        assert(validator.validate(null)      === false);
        assert(validator.validate(undefined) === false);
        assert(validator.validate(false)     === false);
        assert(validator.validate(0)         === false);
        assert(validator.validate('1.1')     === false);
        assert(validator.validate([])        === false);
    });

    it('.properties()', function() {
        let schema = object().properties({
            foo: string(),
            bar: integer()
        });
        let validator = Validator.from(schema);
        assert(validator.validate({foo: 'foo'})                     === true);
        assert(validator.validate({foo: 'foo', bar: 123})           === true);
        assert(validator.validate({foo: 'foo', bar: 123, tar: 123}) === false);
        assert(validator.validate({foo: 'foo', bar: 'bar'})         === false);
    });

    it('.required()', function() {
        let schema = object().required('foo');
        let validator = Validator.from(schema);
        assert(validator.validate({foo: 'foo'}) === true);
        assert(validator.validate({}) === false);
        assert(validator.validate({bar: 'bar'}) === false);
    });
    
    it('.requiredAll()', function() {
        let schema = object().properties({
            foo: string(),
            bar: integer()
        }).requiredAll();
        let validator = Validator.from(schema);
        assert(validator.validate({foo: 'foo', bar: 123})           === true);
        assert(validator.validate({foo: 'foo'})                     === false);
        assert(validator.validate({bar: 'bar'})                     === false);
        assert(validator.validate({foo: 'foo', bar: 123, tar: 123}) === false);
        assert(validator.validate({foo: 'foo', bar: 'bar'})         === false);
    });

    it('.patternProperties()', function() {
        let schema = object().patternProperties({
            '^foo|bar$': string()
        });
        let validator = Validator.from(schema);
        assert(validator.validate({})                               === true);
        assert(validator.validate({foo: 'foo', bar: 'bar'})         === true);
        assert(validator.validate({foo: 'foo'})                     === true);
        assert(validator.validate({bar: 'bar'})                     === true);
        assert(validator.validate({foo: 'foo', bar: 123})           === false);
        assert(validator.validate({foo: 'foo', bar: 'bar', tar: 1}) === false);
    });

    it('.patternProperties()', function() {
        let schema = object().patternProperties({
            '^foo|bar$': string()
        });
        let validator = Validator.from(schema);
        assert(validator.validate({})                               === true);
        assert(validator.validate({foo: 'foo', bar: 'bar'})         === true);
        assert(validator.validate({foo: 'foo'})                     === true);
        assert(validator.validate({bar: 'bar'})                     === true);
        assert(validator.validate({foo: 'foo', bar: 123})           === false);
        assert(validator.validate({foo: 'foo', bar: 'bar', tar: 1}) === false);
    });

    it('.additionalProperties()', function() {
        let schema = object().properties({
            foo: string(),
            bar: string()
        }).additionalProperties();
        let validator = Validator.from(schema);
        assert(validator.validate({foo: 'foo', bar: 'bar', tar: 123}) === true);
        assert(validator.validate({foo: 'foo', bar: 'bar'})           === true);
    });

    describe('if statement', function() {
        it('.if.properties().then.properties()', function() {
            let schema = object()
                .if.properties({type: string().enum('student')}) // equivalent : .if.properties({type: 'student'})
                .then.properties({
                    type: string().enum('student'),
                    grade: integer(),
                }).requiredAll()
                .elseIf.properties({type: string().enum('staff')})
                .then.properties({
                    type: string().enum('staff'),
                    salary: integer(),
                }).requiredAll()
                .else.invalid()
                .endIf;
            let validator = Validator.from(schema);
            assert(validator.validate({type: 'student', grade: 12})              === true);
            assert(validator.validate({type: 'staff', salary: 12000})            === true);
            assert(validator.validate({type: 'staff', salary: '12000'})          === false);
            assert(validator.validate({type: 'student', grade: 12, major: 'cs'}) === false);
            assert(validator.validate({type: 'housewife', salary: 12000})        === false);
        });
    
        it('.if.properties().then.required()', function() {
            let schema = object().properties({
                type: string().enum('student', 'staff'),
                grade: integer(),
                salary: integer(),
            }).if.properties({type: 'student'}).then.required('type', 'grade')
              .elseIf.properties({type: 'staff'}).then.required('type', 'salary').else.invalid().endIf;
            let validator = Validator.from(schema);
            assert(validator.validate({type: 'student', grade: 12})              === true);
            assert(validator.validate({type: 'staff', salary: 12000})            === true);
            assert(validator.validate({type: 'staff', salary: '12000'})          === false);
            assert(validator.validate({type: 'student', grade: 12, major: 'cs'}) === false);
            assert(validator.validate({type: 'housewife', salary: 12000})        === false);
        });
    });
    
});