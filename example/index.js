const {object, string, integer, number, array, boolean, NULL} = require('../index').describer;
const validator = require('../index').validator;

let schema = array(
  object({
    type: [1, 2, 3, 4], // integer().enum(1, 2, 3, 4)
    a: /hello/, // string().pattern(/hello/)
    b: 9, // integer().enum(9)
    c: {
      c1: [false, true] // boolean() or boolean().enum(ture, false)
    }, // object().properties({c1: ...}).required('c1');
    d: integer(),
    e: number(),
    f: boolean(),
    g: NULL()
  })
    .if.properties({type: 1}).then.required('a')
    .elseIf.properties({type: 2}).then.required('b')
    .else.required('c')
    .endIf
);

let result = validator.validate(schema, [{
  type: 1,
  a: 'hello'
}, {
  type: 2,
  b: 9
}, {
  type: 3,
  c: {
    c1: false
  }
}, {
  type: 3,
  c: {
    c1: true
  },
  d: 1,
  e: 1.1,
  f: false,
  g: null
}])
console.log(result); // true

// if you want to use the schema file directly, just normalize it.
let jsonSchemaObj = schema.normalize();

console.log(JSON.stringify(jsonSchemaObj, null, 4));