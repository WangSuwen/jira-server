/**
 * TODO: 暂时 备份用
 */
const connectHandler = require('../model/index').connectHandle;
const bluebird = require('bluebird');
/**
 * 插入数据
 * @param {*} tablename 表名
 * @param {*} vals 要保存的字段
 */
const insertHandler = async (tablename, vals) => {
    const connection = await connectHandler(); // 得到链接
    //开启事务
    try {
        await connection.beginTransaction();
        //执行INSERT插入操作
        try {
            const query = bluebird.promisify(connection.query, {context: connection});
            // const insert = await query(`INSERT INTO ${tablename} SET ?`, vals);
            const insert = await query(`INSERT INTO ${tablename} SET name='五六七'`);
            connection.commit((error) => {
                if(error) {
                    console.log('事务提交失败');
                }
            });
            connection.release();  // 释放链接
            return { insert, success: true };  // 返回数据库操作结果这里数据格式可根据个人或团队规范来定制
        } catch (e) {
            connection.rollback(() => {
                console.log('插入失败数据回滚');
            });
            return { success: false, msg: e.message };
        };
    } catch (e) {
        return { msg: '开启事务失败' };
    }
};

module.exports = {
  insertHandler
};