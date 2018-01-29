const Base = require('../base');

module.exports = class extends Base {
    constructor(...items) {
        super();
        const sugar = require('../../syntactic_sugar');
        this._schema = {
            oneOf: items.map(item => sugar.parseDescriber(item).normalize())
        };
    }
}