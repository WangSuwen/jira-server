module.exports = {
    "env": {
        "browser": true,
        "node"   : true,
        "es6"    : true
    },
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": 0,
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};