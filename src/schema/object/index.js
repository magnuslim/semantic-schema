const BaseSchema = require('../base');
const State = require('./state');
const Switch = require('./switch');

module.exports = class extends BaseSchema {
    constructor() {
        super();
        this._schema.type = 'object';
        this._requiredAll = false;
        this._state = new State();
        this._switch = new Switch(this._state);
    }

    required(...propertyNameArr) {
        if (this._schema.required === undefined) this._schema.required = [];
        this._schema.required = this._schema.required.concat(propertyNameArr);
        return this;
    }

    requiredAll() {
        this._requiredAll = true;
        return this;
    }

    properties(properties) {
        if (this._state.lastKeyword !== Switch.Keyword.IF
            && this._state.lastKeyword !== Switch.Keyword.ELSEIF) {
            this._schema.additionalProperties = false;
        }
        this._schema.properties = {};
        Object.keys(properties).forEach((key) => {
            const property = require('../../sugar').resolve(properties[key]);
            this._schema.properties[key] = property.normalize();
        });
        return this;
    }

    patternProperties(patternProperties) {
        if (this._state.lastKeyword !== Switch.Keyword.IF
            && this._state.lastKeyword !== Switch.Keyword.ELSEIF) {
            this._schema.additionalProperties = false;
        }
        this._schema.patternProperties = {};
        Object.keys(patternProperties).forEach((key) => {
            const property = require('../../sugar').resolve(patternProperties[key]);
            this._schema.patternProperties[key] = property.normalize();
        });
        return this;
    }

    additionalProperties() {
        this._schema.additionalProperties = true;
        return this;
    }

    normalize() {
        if (this._requiredAll) {
            if (this._schema.properties) {
                this._schema.required = Object.keys(this._schema.properties);
            }
        }
        return super.normalize();
    }

    get if() {
        this._schema = this._switch.if(this.normalize());
        this._requiredAll = false;
        this._invalid = false;
        return this; // so user can still use keywords of ObjectSchema.
    }

    get then() {
        this._schema = this._switch.then(this.normalize());
        this._requiredAll = false;
        this._invalid = false;
        return this;
    }

    get elseIf() {
        this._schema = this._switch.elseIf(this.normalize());
        this._requiredAll = false;
        this._invalid = false;
        return this;
    }

    get else() {
        this._schema = this._switch.else(this.normalize());
        this._requiredAll = false;
        this._invalid = false;
        return this;
    }

    get endIf() {
        this._schema = this._switch.endIf(this.normalize());
        this._requiredAll = false;
        this._invalid = false;
        return this;
    }
    // ignored: dependencies, propertyNames, patternGroups (deprecated), patternRequired (proposed)
};
