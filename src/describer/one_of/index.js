const Base = require('../base');

module.exports = class extends Base {
    constructor(...items) {
        super();
        this._schema = {
            oneOf: items.map(item => require('../../sugar').resolve(item).normalize())
        };
    }
}