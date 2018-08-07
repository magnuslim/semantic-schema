const Base = require('../base');

module.exports = class extends Base {
    constructor() {
        super();
        this._current.set('type', 'string');
    }

    format(format) {
        this._current.set('format', format);
        return this;
    }

    enum(...enumArr) {
        this._current.set('enum', enumArr);
        return this;
    }

    maxLength(len) {
        this._current.set('maxLength', len);
        return this;
    }

    minLength(len) {
        this._current.set('minLength', len);
        return this;
    }

    length(len) {
        this.minLength(len).maxLength(len);
        return this;
    }

    pattern(regex) {
        if (regex instanceof RegExp) this._current.set('pattern', regex.source);
        else this._current.set('pattern', regex);
        return this;
    }
};
