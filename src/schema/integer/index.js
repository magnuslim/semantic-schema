const NumberSchema = require('../number');
const assert = require('assert');

module.exports = class extends NumberSchema {
    constructor() {
        super();
        this._schema.type = 'integer';
    }
    enum(...enumArr) {
        this._schema.enum = enumArr;
        return this;
    }
}