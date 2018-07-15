module.exports = {
    "extends": "airbnb-base",
    "env": {
        "jest/globals": true
    },
    "plugins": ["jest"],
    "rules": {
        "no-underscore-dangle": "off",
        "global-require": "off",
        "indent": ["error", 4],
        'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
        "no-param-reassign": "off"
    }
};