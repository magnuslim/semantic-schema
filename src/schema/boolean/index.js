const BaseSchema = require('../base');

module.exports = class BooleanSchema extends BaseSchema {
    constructor() {
        super();
        this._current.set('type', 'boolean');
    }

    enum(...enumArr) {
        this._current.set('enum', enumArr);
        return this;
    }
};
