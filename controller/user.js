
const insertHandler = require('../dao/index').insertHandler;
exports.save = function (req, res) {
    insertHandler('user', { name: '赵武', age: 10 }).then(data => {
        if (data.success) {
            res.json({ok: data.success});
        } else {
            res.json({ ok: false, msg: data.msg });
        }
    }).catch(e => {
        console.error(e);
        res.json(e);
    });
};