const Base = require('../base');
const assert = require('assert');

module.exports = class extends Base {
    constructor() {
        super();
        this._schema.type = 'number';
    }
    enum(...enumArr) {
        this._schema.enum = enumArr;
        return this;
    }
    max(num) {
        this._schema.maximum = num;
        return this;
    }
    min(num) {
        this._schema.minimum = num;
        return this;
    }
    exclusiveMaximum(bool) {
        assert(this._schema.maximum !== undefined, 'Keyword `exclusiveMaximum` cannot be used without keyword `maximum`');
        this._schema.exclusiveMaximum = bool;
        return this;
    }
    exclusiveMinimum(bool) {
        assert(this._schema.maximum !== undefined, 'Keyword `exclusiveMinimum` cannot be used without keyword `minimum`');
        this._schema.exclusiveMinimum = bool;
        return this;
    }
    multipleOf(num) {
        this._schema.multipleOf = num;
        return this;
    }
}