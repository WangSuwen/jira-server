const settings = require('../config/config').settings;
const result = require('../dao/result');
const utils = require('../utils/index');


exports.authUser = function (req, res, next) {
    const cookie = req.cookies[settings.cookie_name];
    if (cookie) {
        let code = '';
        try {
            code = utils.decrypt(cookie, settings.cookie_name);
        } catch (e) {
            utils.setCookie(null, res);
            return result.failed(result.USER_LOGIN_ERROR, res);
        }
        const data = JSON.parse(code);
        if (data && data.id) {
            const lapse = (Date.now() - data.time);
            //超过2小时没有动作则过期
            if (lapse < (60 * 1000 * 60 * 2)) {
                //每一分钟更新一次
                if (lapse >= (60 * 1000 * 1)) {
                    data.time = Date.now();
                    utils.setCookie(data, res);
                }
                req.user             = data;
                res.locals.auth_user = req.user;
            } else {
                //清理cookie
                utils.setCookie(null, res);
            }
        }
    }
    if (req.user && req.user.id) {
        next();
    } else {
        return result.failed(result.USER_LOGIN_ERROR, res);
    }
};

exports.getUserFromCookie = function (cookie) {
    let user;
    try {
        user = JSON.parse(utils.decrypt(cookie, settings.cookie_encrypt_secret));
    } catch (e) {
        return null;
    }
    return user;
};