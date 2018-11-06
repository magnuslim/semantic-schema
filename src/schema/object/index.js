const BaseSchema = require('../base');

module.exports = class ObjectSchema extends BaseSchema {
    constructor() {
        super();
        this._current.set('type', 'object');
    }

    require(...propertyNameArr) {
        let required = this._current.get('required');
        if (required === undefined) {
            required = [];
        }
        required = required.concat(propertyNameArr);
        this._current.set('required', required);
        return this;
    }

    properties(properties) {
        const finalProperties = {};
        Object.keys(properties).forEach((key) => {
            const property = require('../../sugar').resolve(properties[key]);
            finalProperties[key] = property.normalize();
        });
        this._current.set('properties', finalProperties);
        return this;
    }

    patternProperties(patternProperties) {
        const finalProperties = {};
        Object.keys(patternProperties).forEach((key) => {
            const property = require('../../sugar').resolve(patternProperties[key]);
            finalProperties[key] = property.normalize();
        });
        this._current.set('patternProperties', finalProperties);
        return this;
    }

    minProperties(num) {
        this._current.set('minProperties', num);
        return this;
    }

    maxProperties(num) {
        this._current.set('maxProperties', num);
        return this;
    }

    additionalProperties(isAllow) {
        this._current.set('additionalProperties', isAllow);
        return this;
    }

    // ignored: dependencies, propertyNames, patternGroups (deprecated), patternRequired (proposed)
};
