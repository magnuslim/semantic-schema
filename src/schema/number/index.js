const Base = require('../base');

module.exports = class extends Base {
    constructor() {
        super();
        this._schema.type = 'number';
    }

    enum(...enumArr) {
        this._schema.enum = enumArr;
        return this;
    }

    max(num) {
        this._schema.maximum = num;
        return this;
    }

    min(num) {
        this._schema.minimum = num;
        return this;
    }

    exclusiveMax(num) {
        this._schema.exclusiveMaximum = num;
        return this;
    }

    exclusiveMin(num) {
        this._schema.exclusiveMinimum = num;
        return this;
    }

    multipleOf(num) {
        this._schema.multipleOf = num;
        return this;
    }
};
