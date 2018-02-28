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
    uniqueItems(bool) {
        this._schema.uniqueItems = bool;
        return this;
    }
    item(obj) {
        const sugar = require('../../syntactic_sugar');
        obj = sugar.parseDescriber(obj);
        this._schema.items = obj.normalize();
        return this;
    }
    additionalItem(obj) {
        if(obj == undefined) {
            this._schema.additionalItems = true;
        }else {
            const sugar = require('../../syntactic_sugar');
            obj = sugar.parseDescriber(obj);
            this._schema.additionalItems = obj.normalize();
        }
        return this;
    }
    contains(item) {
        const sugar = require('../../syntactic_sugar');
        item = sugar.parseDescriber(item);
        return this;
    }
};