module.exports = class Node {
    constructor() {
        /**
         * @type {Node}
         */
        this.parent = undefined;
        this.content = {};
        this.valid = true;
    }

    get keyInParent() {
        if (!this.parent) {
            return undefined;
        }
        return Object.keys(this.parent.content).find(key => this.parent.content[key] === this);
    }

    set(keyword, value) {
        if (!this.valid) {
            throw new Error(`can not set keyword to a false describer! keyword: ${keyword}, value: ${value}`);
        }
        this.content[keyword] = value;
    }

    get(keyword) {
        if (!this.valid) {
            throw new Error(`can not get keyword from a false describer! keyword: ${keyword}`);
        }
        return this.content[keyword];
    }

    normalize() {
        if (this.valid) {
            const result = {};
            Object.keys(this.content).forEach((key) => {
                if (this.content[key] instanceof Node) {
                    result[key] = this.content[key].normalize();
                }
                else {
                    result[key] = this.content[key];
                }
            });
            return result;
        }
        return false;
    }
};
