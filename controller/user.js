
// const insertHandler = require('../dao/index').insertHandler;
const DB = require('../dao/db');
const result = require('../dao/result');
exports.save = async function (req, res) {
    /* insertHandler('user', { name: '赵武', age: 10 }).then(data => {
        if (data.success) {
            res.json({ok: data.success});
        } else {
            res.json({ ok: false, msg: data.msg });
        }
    }).catch(e => {
        console.error(e);
        res.json(e);
    }); */
    let db;
    try {
        db = await DB.getInstance();
        // const connections = await db.getConnection();
        await db.beginTransaction();
        // 并行的数据库操作
        const insert1 = db.insert('user', { name: '十九', age: 19 });
        const insert2 = db.insert('user', { name: '二十', age: 20 });
        const inserted = await Promise.all([insert1, insert2]);
        console.log(inserted);
        /*  串行的 数据库操作
        const inserted1 = await db.insert('user', { name: '十九', age: 19 });
        const inserted2 = await db.insert('user', { name: '二十', age: 20 });
        console.log(inserted1, inserted2); */
        db.commit();
        // res.json({ ok: true, inserted1, inserted2 });
        res.json({ ok: true, inserted });
    } catch (e) {
        db.rollback();
        console.error(e);
        res.json({ ok: false, msg: e.message, stack: e.stack });
    } finally {
        db.release();
    }
};

exports.search = async function (req, res) {
    try {
        const db = await DB.getInstance();
        const queries = await db.queryAllFieldNoCriteria('user');
        res.json({ ok: true, queries });
    } catch (e) {
        res.json({ ok: false, msg: e.message, stack: e.stack })
    }
};

exports.register = async function (req, res) {
    const id = req.body.id; // | INT | not null | ID |
    const account = req.body.account; // | VARCHAR | not null | 账号 |
    const password = req.body.password; // | VARCHAR | not null | 密码 |
    const name = req.body.name; // | VARCHAR | not null | 姓名 |
    const avatar = req.body.avatar;
    if (!id || !account || !password || !name || !avatar) {
        return result.failed(result.PARAMS_ERROR, res);
    }
    let db;
    try {
        db = await DB.getInstance();
        const user = await db.insert('user', { id, account, password, name, avatar });
        console.log(user);
        return result.success(user, res);
    } catch (e) {
        console.error(e);
        return result.failed(result.SYSTEM_ERROR, res);
    } finally {
        db.release();
    }
};