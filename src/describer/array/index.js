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
    item(itemDescriber) {
        itemDescriber = require('../../sugar').resolve(itemDescriber);
        this._schema.items = itemDescriber.normalize();
        return this;
    }
    additionalItem(itemDescriber) {
        if(itemDescriber == undefined) {
            this._schema.additionalItems = true;
        }else {
            itemDescriber = require('../../sugar').resolve(itemDescriber);
            this._schema.additionalItems = itemDescriber.normalize();
        }
        return this;
    }
    contains(itemDescriber) {
        itemDescriber = require('../../sugar').resolve(itemDescriber);
        this._schema.contains = itemDescriber.normalize();
        return this;
    }
};