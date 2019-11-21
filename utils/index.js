var crypto = require('crypto');
const settings = require('../config/config').settings;

//MD5签名
exports.md5 = function (str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};

//加密
const encrypt = exports.encrypt = function (str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};

//解密
exports.decrypt = function (str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};


exports.setCookie = function (data, settings, res) {
    const source = JSON.stringify(data);
    const code = encrypt(source, settings.cookie_encrypt_secret);
    res.cookie(settings.cookie_name, code);//, {maxAge: 1000 * 60 * 60 * 24}
}