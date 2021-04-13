const config = require('../chain/config');

const dict = {
    chainType(value) {
        return value === config.chainType;
    }
}

const verify = (type, value) => {
    if (type && value && dict[type]) {
        return dict[type](value);
    }
    return false;
};

module.exports = {
    verify
}