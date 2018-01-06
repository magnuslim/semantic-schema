const BaseDescriber = require('../base');
const State = require('../../lib/state');
const Switch = require('../../feature/switch');
const assert = require('assert');

module.exports = class extends BaseDescriber {
    constructor() {
        super();
        this._schema.type = 'object';
        this._schema.additionalProperties = false;
        this._requiredAll = false;
        this._state = new State();
        this._switch = new Switch(this._state);
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
    requiredAll() {
        this._requiredAll = true;
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

    normalize() {
        if(this._requiredAll) {
            if(this._schema.properties) this._schema.required = Object.keys(this._schema.properties);
        }
        return super.normalize();
    }

    get if() {
        this._schema = this._switch.if(this._schema);
        return this; // so user can still use keywords of ObjectDescriber.
    }

    get then() {
        this._schema = this._switch.then(this._schema);
        return this;
    }

    get elseIf() {
        this._schema = this._switch.elseIf(this._schema);
        return this;
    }

    get else() {
        this._schema = this._switch.else(this._schema);
        return this;
    }

    get endIf() {
        this._schema = this._switch.endIf(this._schema);
        return this;
    }
    // ignored: dependencies, propertyNames, patternGroups (deprecated), patternRequired (proposed)
};
