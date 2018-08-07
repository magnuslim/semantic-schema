const BaseSchema = require('../base');

module.exports = class extends BaseSchema {
    constructor(...items) {
        super();
        this._current.set('anyOf', items.map(item => require('../../sugar').resolve(item).normalize()));
    }
};
