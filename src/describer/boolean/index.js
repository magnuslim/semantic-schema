const BaseDescriber = require('../base');
const assert = require('assert');

module.exports = class extends BaseDescriber {
    constructor() {
        super();
        this._schema.type = 'boolean';
    }
}