
const DB = require('../dao/db');
const result = require('../dao/result');
const userSql = require('../dao/sql/user');
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

exports.search = async function (req, res) {
    try {
        const db = await DB.getInstance();
        const queries = await db.queryAllFieldNoCriteria('name, age', 'user');
        res.json({ ok: true, queries });
    } catch (e) {
        res.json({ ok: false, msg: e.message, stack: e.stack })
    }
};

exports.preparingQuery = async function (req, res) {
    try {
        const db = await DB.getInstance();
        const queries = await db.query(userSql.queryByName, ['user', '赵武']);
        res.json({ ok: true, queries });
    } catch (e) {
        res.json({ ok: false, msg: e.message, stack: e.stack })
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
        const db = await DB.getInstance();
        const user = await db.insertOne('user', { id, account, password, name, avatar });
        console.log(user);
        return result.success(user, res);
    } catch (e) {
        console.error(e);
        return result.failed(result.SYSTEM_ERROR, res);
    } finally {
        db.release();
    }
};