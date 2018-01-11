const assert = require('assert');

module.exports = class {
    constructor() {
        this._schema = {};
    }
    desc(desc) {
        this._schema.description = desc;
        return this;
    }
    enum(...enumArr) {
        this._schema.enum = enumArr;
        return this;
    }
    normalize() {
        return this._schema;
    }
};
