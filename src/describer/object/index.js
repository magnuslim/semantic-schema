const BaseDescriber = require('../base');
const State = require('../../lib/state');
const assert = require('assert');

module.exports = class extends BaseDescriber {
    constructor() {
        super();
        this._schema.type = 'object';
        this._schema.additionalProperties = false;
        this._schemaStack = [];
        this._functionStack = [];
        this._state = new State();
    }
    maxProperties(num) {
        this._schema.maxProperties = num;
        return this;
    }
    minProperties(num) {
        this._schema.minProperties = num;
        return this;
    }
    required(...propertyNameArr) {
        if(this._schema.required === undefined) this._schema.required = []; 
        this._schema.required = this._schema.required.concat(propertyNameArr);
        return this;
    }
    properties(properties) {
        this._schema.properties = {};
        for(let key in properties) {
            const sugar = require('../../syntactic_sugar');
            let property = sugar.parseDescriber(properties[key]);
            this._schema.properties[key] = property.normalize();
        }
        return this;
    }
    patternProperties(patternProperties) {
        this._schema.patternProperties = {};
        for(let key in patternProperties) {
            const sugar = require('../../syntactic_sugar');
            let property = sugar.parseDescriber(properties[key]);
            this._schema.properties[key] = property.normalize();
        }
        return this;
    }
    additionalProperties(obj) {
        if(obj === undefined) {
            this._schema.additionalProperties = true;
        }
        else {
            const sugar = require('../../syntactic_sugar');
            obj = sugar.parseDescriber(obj);
            this._schema.additionalProperties = obj.normalize();
        }
        return this;
    }

    get if() {
        assert(this._state.lastKeyword === undefined, 'unexpected keyword if');
        this._schema = this._state.push(State.Keyword.IF, this._schema);
        return this;
    }

    get then() {
        assert(this._state.lastKeyword === State.Keyword.IF, 'unexpected keyword `then`');
        this._schema = this._state.pop(this._schema);
        this._schema = this._state.push(State.Keyword.THEN, this._schema);
        return this;
    }

    get elseIf() {
        assert(this._state.lastKeyword === State.Keyword.THEN, 'unexpected keyword `elseIf`');
        this._schema = this._state.pop(this._schema);
        assert(this._state.lastKeyword === undefined, 'unexpected keyword if');
        this._schema = this._state.push(State.Keyword.IF, this._schema);
        return this;
    }

    get else() {
        assert(this._state.lastKeyword === State.Keyword.THEN, 'unexpected keyword `elseIf`');
        this._schema = this._state.pop(this._schema);
        this._schema = this._state.push(State.Keyword.ELSE, this._schema);
        return this;
    }

    get endIf() {
        assert(this._state.lastKeyword === State.Keyword.THEN || this._state.lastKeyword === State.Keyword.ELSE, 'unexpected keyword `endIf`');
        this._schema = this._state.pop(this._schema);
        return this;
    }

    // ignored: dependencies, propertyNames, patternGroups (deprecated), patternRequired (proposed)
};
