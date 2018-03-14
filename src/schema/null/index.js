const BaseSchema = require('../base');
const assert = require('assert');

module.exports = class extends BaseSchema {
    constructor() {
        super();
        this._schema.type = 'null';
    }
}