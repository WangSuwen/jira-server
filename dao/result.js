const Result   = {};
const code_msg = [];

/**
 * 请求成功，但是操作失败，json数据
 * @param code 错误码
 * @param msg 错误信息
 * @param res
 * @returns {*}
 */
Result.failed = function (code, res, msg) {
    return res.json({
        code: code,
        data: null,
        msg : (code_msg[code] || '') + (msg || '') || '操作失败'
    });
};

/**
 * 操作成功返回，json数据
 * @param data
 * @param res
 * @returns {*}
 */
Result.success = function (data, res) {
    return res.json({
        code: '200',
        data: data,
        msg : '操作成功'
    });
};


Result.PARAMS_ERROR                             = '10003';
code_msg[Result.PARAMS_ERROR]                   = '参数错误';
Result.SYSTEM_ERROR                             = '50000';
code_msg[Result.SYSTEM_ERROR]                   = '系统错误';
module.exports = Result;