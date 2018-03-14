const assert = require('assert');
const isObject = require('isobject');

const BaseSchema = require('../base');

module.exports = class extends BaseSchema {
    constructor() {
        super();
        this._schema.type = 'array';
        this._schema.additionalItems = false;
    }
    maxItems(num) {
        this._schema.maxItems = num;
        return this;
    }
    minItems(num) {
        this._schema.minItems = num;
        return this;
    }
    length(num) {
        this.maxItems(num).minItems(num);
        return this;
    }
    uniqueItems() {
        this._schema.uniqueItems = true;
        return this;
    }
    item(schema) {
        schema = require('../../sugar').resolve(schema);
        this._schema.items = schema.normalize();
        return this;
    }
    contains(schema) {
        schema = require('../../sugar').resolve(schema);
        this._schema.contains = schema.normalize();
        return this;
    }
};