
// const insertHandler = require('../dao/index').insertHandler;
const DB = require('../dao/index');
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
    const db = await DB.getInstance();
    try {
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
}