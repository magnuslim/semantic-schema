# Semantic Schema

> Write JSON Schema In a Graceful Way.

JSON Schema is an excellent tool for validating the structure of JSON data. However, it is also veeeeeerbose. So here comes the Semantic-schema. It let you semantically write JSON Schema so you can get rid of the verbose grammar.

This project attempt to achieve three goals:
1. Use JSON Schema as an underlying data structure describer;
2. Get rid of the verbose grammar of JSON Schema;
3. Block some confusing feature of JSON Schema.

OK, let's begin with a compare between semantic-schema and plain JSON Schema. If I want a data to be an object, and has 'name', 'age' and 'gender' as its properties. And there is also some limit on these properties.
Let's declare it in JSON Schema:
```js
let schema = {
    type: "object",
    additionalProperties: false,
    properties: {
        name: {
            type: "string",
            pattern: "^[A-Za-z]{5}$"
        },
        age: {
            type: "integer",
            minimum: 0,
            maximum: 120
        },
        gender: {
            type: "string",
            enum: ['m', 'f']
        }
    },
    required: ['name', 'age', 'gender']
}
```
In semantic-schema, we declare it like this: 
```js
const {integer} = require('semantic-schema').schema;
let schema = {
    name: /^[A-Za-z]{5}$/,
    age: integer().min(0).max(120),
    gender: ['m', 'f']
};
```

Hmmm.... I prefer the second one :)

So let talk about the semantic-schema. There are three critical concepts in Semantic Schema: `schema`, `sugar` and `validator`:

# schema

A `schema` is a describer describing what a data should be. It is a wrapper of JSON Schema providing a semantic way to declare it. Most of the time we don't directly use JSON Schema. But a method `.normalize()` is provided to convert `schema` to a JSON Schema object. 
There are four types of `schema`: 
- number
- integer
- string
- boolean
- null
- object
- array
- one_of: means that the data should match one of the declared schemas
- invalid: means that the data will always be invalid no matter what value it is.

declaring a schema: 
```js
const {integer, string, object} = require('semantic-schema').schema;

let schema = object().properties({
    foo: integer(),
    bar: string()
}).requiredAll();

// valid: {foo: 1, bar: '1'}
// invalid: {foo: 1}, {foo: '1', bar: '1'}, 1, '1', []...

schema.normalize(); // convert it to a JSON Schema object.
```

# Validator

A `validator` will compile a `schema` inside itself and provides a `.validate()` method for you to check your target data.

```js
const SemanticSchema = require('semantic-schema');
const {integer, string, object} = SemanticSchema.schema;
const Validator = SemanticSchema.validator;

let schema = object().properties({
    foo: integer(),
    bar: string()
}).requiredAll();

let validator = new Validator(schema); // or Validator.from(schema)
validator.validate({foo: 1, bar: '1'}); // true
validator.validate({foo: 1}); // false
validator.errorsText(); // error details for the last validation.
```

# Sugar

A `sugar` is just a way to simplify your declaration of `schema`. Your code will still work well without it. But it makes your code more clear.

Below is a collection of sugar: 

| sugar          | equivalent                                   |
| -------------- | -------------------------------------------- |
| 1              | integer().enum(1)                            |
| 1.1            | number().enum(1.1)                           |
| 'foo'          | string().enum('foo')                         |
| /^foo\|bar$/   | string().pattern(/^foo\|bar$/)               |
| true           | boolean().enum(true)                         |
| null           | NULL() or empty()                            |
| {foo: 1}       | object().properties({foo: 1}).requiredAll()  |
| [1, 2, 3]      | integer().enum(1, 2, 3)                      |
| [1.1, 2.2, 3]  | number().enum(1.1, 2.2, 3)                   |
| ['foo', 'bar'] | string().enum('foo', 'bar')                  |
| [true, false]  | boolean().enum(true, false)                  |

And you can use a `sugar` just like a `schema`:
```js
const Validator = require('semantic-schema').validator;

let schema = {
    foo: 1, 
    bar: ['hello', 'world'],
    tar: /^[0-9A-F]{8}$/
};
let validator = Validator.from(schema);
validator.validate({foo: 1, bar: 'hello', tar: 'ABC12345'}); // true
validator.validate({foo: 0, bar: 'hello', tar: 'ABC12345'}); // false
validator.validate({foo: 1, bar: 'hi', tar: 'ABC12345'}); // false
validator.validate({foo: 1, bar: 'hi', tar: 'ZZZ'}); // false
```

If your `schema` is complicated, I highly recommend you to use `sugar` in your code. Consider a schema of an object with an 'if' condition:
```js
const {integer, object, string} = require('semantic-schema').schema;

let schema = object()
    .if.properties({type: 'student'})
    .then.properties({
        type: 'student',
        major: ['music', 'math']
    }).requiredAll()
    .elseIf.properties({type: 'staff'})
    .then.properties({
        type: 'staff',
        major: ['music', 'math'],
        salary: integer()
    }).requiredAll()
    .else.invalid()
    .endIf;

// without sugar it would be:

let schema = object()
    .if.properties({type: string().enum('student')})
    .then.properties({
        type: string().enum('student'),
        major: string().enum(['music', 'math'])
    }).requiredAll()
    .elseIf.properties({type: string().enum('staff')})
    .then.properties({
        type: string().enum('staff'),
        major: string().enum(['music', 'math']),
        salary: integer()
    }).requiredAll()
    .else.invalid()
    .endIf;

// it also works, but obscure.

```
