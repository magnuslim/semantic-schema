const NumberSchema = require('../number');

module.exports = class extends NumberSchema {
    constructor() {
        super();
        this._schema.type = 'integer';
    }
};
