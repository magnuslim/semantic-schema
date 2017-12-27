const NumberDescriber = require('../number');
const assert = require('assert');

module.exports = class extends NumberDescriber {
    constructor() {
        super();
        this._schema.type = 'integer';
    }
}