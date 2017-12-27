const assert = require('assert');

module.exports = class State {
    constructor() {
        this._schemaStack = [];
        this._keywordStack = [];
    }

    push(keyword, schema = undefined) {
        switch(keyword){
            case State.Keyword.IF: 
                if(schema.switch === undefined) schema.switch = [];
                var switchItem = {if: {}, then: {}};
                schema.switch.push(switchItem);
                this._schemaStack.push(schema);
                this._keywordStack.push(keyword);
                return switchItem.if;
            case State.Keyword.THEN:
                var switchItem = schema.switch[schema.switch.length-1];
                this._schemaStack.push(schema);
                this._keywordStack.push(keyword);
                return switchItem.then;
            case State.Keyword.ELSE:
                var switchItem = {then: {}};
                schema.switch.push(switchItem);
                this._schemaStack.push(schema);
                this._keywordStack.push(keyword);
                return switchItem.then;
            default: 
                throw new Error(`unknown keyword: ${keyword}`);
        }
    }
    
    pop(subSchema = undefined) {
        assert(this._schemaStack.length > 0 && this._keywordStack.length > 0, `State error, schemaStack.length: ${this._schemaStack.length}, keywordStack.length: ${this._keywordStack.length}`);
        let keyword = this._keywordStack.pop();
        let schema = this._schemaStack.pop();
        switch(keyword) {
            case State.Keyword.IF: 
                schema.switch[schema.switch.length-1].if = subSchema;
                return schema;
            case State.Keyword.THEN:
                if(Array.isArray(subSchema.required) && Array.isArray(schema.required)) {
                    subSchema.required = schema.required.concat(subSchema.required);
                }
                schema.switch[schema.switch.length-1].then = subSchema;
                return schema;
            case State.Keyword.ELSE:
                if(Array.isArray(subSchema.required) && Array.isArray(schema.required)) {
                    subSchema.required = schema.required.concat(subSchema.required);
                }
                schema.switch[schema.switch.length-1].then = subSchema;
                return schema;
            default: 
                throw new Error(`unknown keyword: ${keyword}`);
        }
    }
    
    get lastKeyword() {
        if(this._keywordStack.length == 0 ) return undefined;
        else return this._keywordStack[this._keywordStack.length-1];
    }

    static get Keyword() {
        return {
            IF: 'if',
            THEN: 'then',
            ELSE: 'else',
            ONEOF: 'oneOf',
            ALLOF: 'allOf',
            ANYOF: 'anyOf',
            DEPENDENCIES: 'dependencies'
        };
    }
}