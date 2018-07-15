const assert = require('assert');
const { integer } = require('../../index').schema;
const Validator = require('../../index').validator;

describe('object', () => {
    it('data should have all of the declared properties matching their schema', () => {
        const schema = {
            type: ['dog', 'cat'],
            age: integer(),
            name: /^[A-Za-z]{1,10}$/,
        };
        const validator = Validator.from(schema);
        assert(validator.validate({ type: 'dog', age: 10, name: 'doggy' }) === true);
        assert(validator.validate({ type: 'pig', age: 10, name: 'piggy' }) === false);
        assert(validator.validate({ type: 'dog', age: 10 }) === false);
        assert(validator.validate({ type: 'dog', age: 10, name: '123' }) === false);
    });
});
