const BaseSchema = require('../base');

module.exports = class ArraySchema extends BaseSchema {
    constructor() {
        super();
        this._current.set('type', 'array');
        this._current.set('additionalItems', false);
    }

    maxItems(num) {
        this._current.set('maxItems', num);
        return this;
    }

    minItems(num) {
        this._current.set('minItems', num);
        return this;
    }

    length(num) {
        this.maxItems(num).minItems(num);
        return this;
    }

    uniqueItems() {
        this._current.set('uniqueItems', true);
        return this;
    }

    /**
     * Specify a schema for all items in the target array.
     * @param {*} schemaOrSugar
     */
    item(schemaOrSugar) {
        const schema = require('../../sugar').resolve(schemaOrSugar);
        this._current.set('items', schema.normalize());
        return this;
    }

    /**
     * The target array should contains at least one item that match the specified schema.
     * @param {*} schemaOrSugar
     */
    contains(schemaOrSugar) {
        const schema = require('../../sugar').resolve(schemaOrSugar);
        this._current.set('contains', schema.normalize());
        return this;
    }
};
