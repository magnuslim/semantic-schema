const BaseSchema = require('../base');

module.exports = class extends BaseSchema {
    constructor() {
        super();
        this._schema.type = 'array';
        this._schema.additionalItems = false;
    }

    maxItems(num) {
        this._schema.maxItems = num;
        return this;
    }

    minItems(num) {
        this._schema.minItems = num;
        return this;
    }

    length(num) {
        this.maxItems(num).minItems(num);
        return this;
    }

    uniqueItems() {
        this._schema.uniqueItems = true;
        return this;
    }

    item(schemaOrSugar) {
        const schema = require('../../sugar').resolve(schemaOrSugar);
        this._schema.items = schema.normalize();
        return this;
    }

    contains(schemaOrSugar) {
        const schema = require('../../sugar').resolve(schemaOrSugar);
        this._schema.contains = schema.normalize();
        return this;
    }
};
