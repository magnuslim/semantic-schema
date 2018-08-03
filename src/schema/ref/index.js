const BaseSchema = require('../base');

module.exports = class extends BaseSchema {
    constructor(path) {
        super();
        this._current.set('$ref', path);
    }
};
