const assert = require('assert');

module.exports = class Switch {
    constructor(hostState) {
        this._hostState = hostState;
        this._ifable = true;
    }

    if(hostSchema) {
        assert(this._hostState.lastKeyword === undefined, 'unexpected keyword if');
        return this.push(Switch.Keyword.IF, hostSchema);
    }

    then(hostSchema) {
        assert(this._hostState.lastKeyword === Switch.Keyword.IF || this._hostState.lastKeyword === Switch.Keyword.ELSEIF, 'unexpected keyword `then`');
        hostSchema = this.pop(hostSchema);
        return this.push(Switch.Keyword.THEN, hostSchema);
    }

    elseIf(hostSchema) {
        assert(this._hostState.lastKeyword === Switch.Keyword.THEN, 'unexpected keyword `elseIf`');
        hostSchema = this.pop(hostSchema);
        assert(this._hostState.lastKeyword === undefined, 'unexpected keyword `elseIf`');
        return this.push(Switch.Keyword.ELSEIF, hostSchema);
    }

    else(hostSchema) {
        assert(this._hostState.lastKeyword === Switch.Keyword.THEN, 'unexpected keyword `elseIf`');
        hostSchema = this.pop(hostSchema);
        return this.push(Switch.Keyword.ELSE, hostSchema);
    }

    endIf(hostSchema) {
        assert(this._hostState.lastKeyword === Switch.Keyword.THEN || this._hostState.lastKeyword === Switch.Keyword.ELSE, 'unexpected keyword `endIf`');
        return this.pop(hostSchema);
    }

    push(keyword, schema = undefined) {
        switch(keyword){
            case Switch.Keyword.IF: 
                assert(this._ifable, 'cannot use keyword `if` twice in a schema');
                this._ifable = false;
                if(schema.switch === undefined) schema.switch = [];
                var switchItem = {if: {}, then: {}};
                schema.switch.push(switchItem);
                this._hostState.push(keyword, schema);
                return switchItem.if;
            case Switch.Keyword.ELSEIF:
                var switchItem = {if: {}, then: {}};
                schema.switch.push(switchItem);
                this._hostState.push(keyword, schema);
                return switchItem.if;
            case Switch.Keyword.THEN:
                var switchItem = schema.switch[schema.switch.length-1];
                this._hostState.push(keyword, schema);
                return switchItem.then;
            case Switch.Keyword.ELSE:
                var switchItem = {then: {}};
                schema.switch.push(switchItem);
                this._hostState.push(keyword, schema);
                return switchItem.then;
            default: 
                throw new Error(`unknown keyword: ${keyword}`);
        }
    }
    
    pop(subSchema = undefined) {
        let {keyword, schema} = this._hostState.pop();
        switch(keyword) {
            case Switch.Keyword.IF: 
                schema.switch[schema.switch.length-1].if = subSchema;
                return schema;
            case Switch.Keyword.ELSEIF: 
                schema.switch[schema.switch.length-1].if = subSchema;
                return schema;
            case Switch.Keyword.THEN:
                if(Array.isArray(subSchema.required) && Array.isArray(schema.required)) {
                    subSchema.required = schema.required.concat(subSchema.required);
                }
                schema.switch[schema.switch.length-1].then = subSchema;
                return schema;
            case Switch.Keyword.ELSE:
                if(Array.isArray(subSchema.required) && Array.isArray(schema.required)) {
                    subSchema.required = schema.required.concat(subSchema.required);
                }
                schema.switch[schema.switch.length-1].then = subSchema;
                return schema;
            default: 
                throw new Error(`unknown keyword: ${keyword}`);
        }
    }
    
    static get Keyword() {
        return {
            IF: 'if',
            ELSEIF: 'elseIf',
            THEN: 'then',
            ELSE: 'else',
            ENDIF: 'endIf'
        };
    }
}