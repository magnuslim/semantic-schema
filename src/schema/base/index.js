const assert = require('assert');
const Node = require('./node');

const keyword = {
    DESCRIPTION: 'description',
    IF: 'if',
    THEN: 'then',
    ELSE: 'else',
};

module.exports = class {
    constructor() {
        // Because nodes can be nested, eg: oneOf, if-then-else.
        // So the whole schema is a tree. When some nesting keyword
        // are set, this._current points to the nested node.
        this._tree = new Node();
        /**
         * @type {Node}
         */
        this._current = this._tree;
    }

    invalid() {
        this._current.valid = false;
        return this;
    }

    desc(desc) {
        this._current.set(keyword.DESCRIPTION, desc);
        return this;
    }

    example(value) {
        this._current.set('example', value);
        return this;
    }

    nullable() {
        const type = this._current.get('type');
        if (typeof type === 'string') {
            this._current.set('type', [type, 'null']);
        }
        else if (Array.isArray(type)) {
            if (type.includes('null')) {
                throw new Error('cannot set nullable twice');
            }
            type.push('null');
            this._current.set('type', type);
        }
        this._current.set('nullable', true);
        return this;
    }

    custom(key, value) {
        assert(typeof key === 'string', 'expect a string key for .custom()');
        this._current.set(key, value);
        return this;
    }

    get if() {
        const ifNode = new Node();
        ifNode.parent = this._current;
        this._current.set(keyword.IF, ifNode);
        this._current = ifNode;
        return this;
    }

    get then() {
        if (this._current.keyInParent === keyword.IF) {
            this._current = this._current.parent;
            const thenNode = new Node();
            thenNode.parent = this._current;
            this._current.set(keyword.THEN, thenNode);
            this._current = thenNode;
            return this;
        }
        throw new Error('unexpected keyword: then');
    }

    get else() {
        if (this._current.keyInParent === keyword.THEN) {
            this._current = this._current.parent;
            const elseNode = new Node();
            elseNode.parent = this._current;
            this._current.set(keyword.ELSE, elseNode);
            this._current = elseNode;
            return this;
        }
        throw new Error('unexpected keyword: else');
    }

    get elseIf() {
        if (this._current.keyInParent === keyword.THEN) {
            this._current = this._current.parent;
            const elseNode = new Node();
            elseNode.parent = this._current;
            this._current.set(keyword.ELSE, elseNode);
            this._current = elseNode;
            return this.if;
        }
        throw new Error('unexpected keyword: elseIf');
    }

    get endIf() {
        let valid = false;
        while (this._current.keyInParent === keyword.THEN
            || this._current.keyInParent === keyword.ELSE) {
            this._current = this._current.parent;
            valid = true;
        }
        if (valid) return this;
        throw new Error('unexpected keyword: endIf');
    }

    normalize() {
        // if current describer doesn't point to the tree root,
        // it means some expression may not be completed.
        // eg: if-then-else without endIf.
        if (this._current !== this._tree) {
            throw new Error('uncompleted expression detected');
        }
        return this._current.normalize();
    }
};
