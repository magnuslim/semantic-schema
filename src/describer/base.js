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
        this._schema.enum = enumArr;
        return this;
    }
    normalize() {
        return this._schema;
    }
};
