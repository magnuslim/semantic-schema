const Base = require('../base');
const assert = require('assert');

module.exports = class extends Base {
    constructor() {
        super();
        this._schema.type = 'string';
    }
    enum(...enumArr) {
        this._schema.enum = enumArr;
        return this;
    }
    maxLength(len) {
        this._schema.maxLength = len;
        return this;
    }
    minLength(len) {
        this._schema.minLength = len;
        return this;
    }
    length(len) {
        this.minLength(len).maxLength(len);
        return this;
    }
    pattern(regex) {
        if(regex instanceof RegExp) this._schema.pattern = regex.source;
        else this._schema.pattern = regex;
        return this;
    }
}