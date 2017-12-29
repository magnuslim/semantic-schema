# Semantic Schema

> Write Json Schema In a Graceful Way.

Json Schema is really a useful tool for validating the structure of json data. But it is also veeeeeerbose. So here comes the Semantic-schema. It let you write json schema in a semantic way, also, a simplified way, so you can get rid of the verbose grammar. 

This project is uncompleted. But all functionality mentioned below is reliable.

# example

```js
const {object, string, integer, number, array, boolean, NULL} = require('semantic-schema').describer;
const validator = require('semantic-schema').validator;

let schema = array(
  object({
    type: [1, 2, 3, 4], // integer().enum(1, 2, 3, 4)
    a: /hello/, // string().pattern(/hello/)
    b: 9, // integer().enum(9)
    c: {
      c1: [false, true] // boolean() or boolean().enum(ture, false)
    }, // object().properties({c1: ...}).requiredAll();
    d: integer(),
    e: number(),
    f: boolean(),
    g: NULL()
  }).if.properties({type: 1}).then.required('a')
    .elseIf.properties({type: 2}).then.required('b')
    .else.required('c')
    .endIf
);

// validator is implemented with ajv.
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

// If you want to use the schema file directly, just normalize it.
let jsonSchemaObj = schema.normalize();

```