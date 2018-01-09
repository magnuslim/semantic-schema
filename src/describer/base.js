const assert = require('assert');

module.exports = class {
    constructor() {
        this._schema = {};
    }
    description(desc) {
        this._schema.description = desc;
        return this;
    }
    desc(desc) {
        return this.description(desc);
    }
    enum(...enumArr) {
        assert(Array.isArray(enumArr), 'expect enum to be an array');
        this._schema.enum = enumArr;
        return this;
    }
    const() {
        
    }
    normalize() {
        return this._schema;
    }
};
