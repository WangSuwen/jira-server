
const DB = require('../dao/db');
const result = require('../dao/result');
const userSql = require('../dao/sql/user');
const utils = require('../utils/index');
const settings = require('../config/config').settings;

// 登录
exports.login = async function (req, res) {
    let db;
    try {
        const account = req.body.account;
        const password = req.body.password;
        if (!account || !password) return result.failed(result.PARAMS_ERROR, res);
        db = await DB.getInstance();
        const user = await db.query(userSql.queryByAccount, account);
        if (!user) return result.failed(result.USER_NOT_EXIST, res);
        if (user[0].password == utils.md5(password)) {
            delete user[0].password;
            const data = {
                id      : user[0].id,
                name    : user[0].name,
                time    : Date.now()
            };
            utils.setCookie(data, res);
            return result.success(user[0], res);
        } else {
            return result.failed(result.USER_LOGIN_PASSWORD_ERROR, res);
        }
    } catch (e) {
        console.error(e);
        return result.failed(result.SYSTEM_ERROR, res);
    } finally {
        db.release();
    }
};

// 注册
exports.register = async function (req, res) {
    const account = req.body.account; // | VARCHAR | not null | 账号 |
    let password = req.body.password; // | VARCHAR | not null | 密码 |
    const name = req.body.name; // | VARCHAR | not null | 姓名 |
    const avatar = req.body.avatar;
    if (!account || !password || !name) {
        return result.failed(result.PARAMS_ERROR, res);
    }
    let db;
    try {
        db = await DB.getInstance();
        password = utils.md5(password);
        const user = await db.insertOne('user', { account, password, name, avatar });
        console.log(user);
        return result.success(user, res);
    } catch (e) {
        console.error(e);
        return result.failed(result.SYSTEM_ERROR, res);
    } finally {
        db.release();
    }
};
exports.getAllUsers = async function (req, res) {
    let db;
    try {
        db = await DB.getInstance();
        const userList = await db.queryAllFieldNoCriteria('user', 'name, age');
        return result.success(userList, res);
    } catch (e) {
        console.log(e.stack);
        return result.failed(result.SYSTEM_ERROR, res);
    } finally {
        db.release();
    }
};










exports.save = async function (req, res) {
    const db = await DB.getInstance();
    try {
        await db.beginTransaction();
        // 并行的数据库操作
        const insert1 = db.insertOne('user', { name: '十九', age: 19 });
        const insert2 = db.insertOne('user', { name: '二十', age: 20 });
        const inserted = await Promise.all([insert1, insert2]);
        console.log(inserted);
        db.commit();
        res.json({ ok: true, inserted });
        /*
        // 串行的 数据库操作
        const inserted1 = await db.insertOne('user', { name: '十九', age: 19 });
        const inserted2 = await db.insertOne('user', { name: '二十', age: 20 });
        console.log(inserted1, inserted2); 
        db.commit();
        res.json({ ok: true, inserted1, inserted2 });
        */
    } catch (e) {
        db.rollback();
        console.error(e);
        res.json({ ok: false, msg: e.message, stack: e.stack });
    } finally {
        db.release();
    }
};


exports.preparingQuery = async function (req, res) {
    try {
        const db = await DB.getInstance();
        const queries = await db.query(userSql.queryByName, ['user', '赵武']);
        res.json({ ok: true, queries });
    } catch (e) {
        res.json({ ok: false, msg: e.message, stack: e.stack })
    } finally {
        db.release();
    }
};
exports.preparingInsert = async function (req, res) {
    try {
        const db = await DB.getInstance();
        const queries = await db.query(userSql.insertUser, ['user', { name: '李四', age: 20 }]);
        res.json({ ok: true, queries });
    } catch (e) {
        console.error(e);
        res.json({ ok: false, msg: e.message, stack: e.stack })
    } finally {
        db.release();
    }
};
exports.preparingInsertMulti = async function (req, res) {
    try {
        const db = await DB.getInstance();
        // const sql = userSql.insertUserMulti + db.escapingParams([["王五2", 21],["赵六2", 22]]);
        // const queries = await db.query(sql);
        const queries = await db.query(userSql.insertUserMulti, db.escapingParams([["王五3", 21],["赵六3", 22]]));
        res.json({ ok: true, queries });
    } catch (e) {
        console.error(e);
        res.json({ ok: false, msg: e.message, stack: e.stack })
    } finally {
        db.release();
    }
};
