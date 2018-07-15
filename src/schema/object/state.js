const assert = require('assert');

module.exports = class {
    constructor() {
        this._schemaStack = [];
        this._keywordStack = [];
    }

    push(keyword, schema) {
        this._keywordStack.push(keyword);
        this._schemaStack.push(schema);
    }

    pop() {
        assert(this._schemaStack.length > 0 && this._keywordStack.length > 0,
            `state error, schemaStack.length: ${this._schemaStack.length}, keywordStack.length: ${this._keywordStack.length}`);
        return {
            keyword: this._keywordStack.pop(),
            schema: this._schemaStack.pop(),
        };
    }

    get lastKeyword() {
        if (this._keywordStack.length === 0) return undefined;
        return this._keywordStack[this._keywordStack.length - 1];
    }
};
