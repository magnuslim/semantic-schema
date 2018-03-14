const assert = require('assert');

module.exports = class {
    constructor() {
        this._schema = {};
        this._invalid = false;
    }
    invalid() {
        this._invalid = true;
        return this;
    }
    desc(desc) {
        this._schema.description = desc;
        return this;
    }
    normalize() {
        return this._invalid ? false : this._schema;
    }
};
