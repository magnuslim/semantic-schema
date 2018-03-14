const assert = require('assert');
const isObject = require('isobject');

const BaseDescriber = require('../base');

module.exports = class extends BaseDescriber {
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
    item(describer) {
        describer = require('../../sugar').resolve(describer);
        this._schema.items = describer.normalize();
        return this;
    }
    contains(describer) {
        describer = require('../../sugar').resolve(describer);
        this._schema.contains = describer.normalize();
        return this;
    }
};