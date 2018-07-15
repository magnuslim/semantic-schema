const BaseSchema = require('../base');

module.exports = class extends BaseSchema {
    constructor() {
        super();
        this._schema.type = 'null';
    }
};
