const {object, string, integer, number, array, boolean, NULL, oneOf} = require('../index').describer;
const Validator = require('../index').validator;

let schema = array().item(
  object().properties({
    type: integer().enum(1, 2, 3, 4), // [1, 2, 3, 4]
    a: string().pattern(/hello/), // /hello/
    b: integer().enum(9), // 9 or [9]
    c: boolean(),
    d: NULL(),
    e: object().properties({
      e1: boolean()
    }).requiredAll(),
  })
    .if.properties({type: 1}).then.required('a')
    .elseIf.properties({type: 2}).then.required('b')
    .else.required('c')
    .endIf
);

let validator = new Validator(schema);
let result = validator.validate([{
  type: 1,
  a: 'hello'
}, {
  type: 2,
  b: 9
}, {
  type: 3,
  c: true
}, {
  type: 3,
  a: 'hello',
  b: 9,
  c: false,
  d: null,
  e: {
    e1: true
  }
}])
console.log(result); // true

// if you want to use the schema file directly, just normalize it.
let jsonSchemaObj = schema.normalize(); // or let jsonSchemaObj = validator.jsonSchema;
//console.log(JSON.stringify(jsonSchemaObj, null, 2))