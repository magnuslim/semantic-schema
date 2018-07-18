const NumberSchema = require('../number');

module.exports = class IntegerSchema extends NumberSchema {
    constructor() {
        super();
        this._current.set('type', 'integer');
    }
};
