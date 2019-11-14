const connectHandler = require('./index').connectHandle;
const bluebird = require('bluebird');
const mysql = require('mysql');

/**
 * 查询语句预处理   https://www.npmjs.com/package/mysql#preparing-queries
 *  var sql = "SELECT * FROM ?? WHERE ?? = ?";
    var inserts = ['users', 'id', userId];
    sql = mysql.format(sql, inserts);
 */


/**
 * 插入数据
 * @param {*} tablename 表名
 * @param {*} vals 要保存的字段
 */
class DB {
    constructor () {
        this.instance = null;
        this.connection = null;
        this.query = null;
        this.getConnection = this.getConnection.bind(this);
        this.beginTransaction = this.beginTransaction.bind(this);
        this.commit = this.commit.bind(this);
        this.rollback = this.rollback.bind(this);
        this.release = this.release.bind(this);
        // this.getQuery = this.getQuery.bind(this);
        // this.insertOne = this.insertOne.bind(this);
        // this.queryAllFieldNoCriteria = this.queryAllFieldNoCriteria.bind(this);
        this.init = this.init.bind(this);
    }
    async init () {
        this.connection = await connectHandler();
        this.query = bluebird.promisify(this.connection.query, {context: this.connection});
    }
    // 得到链接
    async getConnection () {
        return this.connection;
    }
    // 开启事务
    async beginTransaction () {
        try {
            await this.connection.beginTransaction();
        } catch (e) {
            throw e;
        }
    }
    // 提交事务
    async commit () {
        try {
            await this.connection.commit();
        } catch (e) {
            throw e;
        }
    }
    // 回滚事务
    async rollback () {
        try {
            await this.connection.rollback();
        } catch (e) {
            throw e;
        }
    }
    // 释放链接
    release () {
        try {
            this.connection.release();
        } catch (e) {
            throw e;
        }
    }
    // 获取 query ， 自定义 sql 语句
    /* getQuery () {
        return this.query;
    } */

    // --------------- SQL -----------------
    /**
     * 插入单条数据
     * @param {String} tableName 表名
     * @param {Object} val 需要插入的字段  {name: '张三', age: 12}
     */
    async insertOne (tableName, val) {
        return await this.query(`INSERT INTO ${tableName} SET ?`, val);
    }
    /**
     * 查询 -- 不带任何查询条件
     * @param {String} fields 字段名 'name, age' 或 '*'
     * @param {String} tableName 表名
     */
    async queryAllFieldNoCriteria (fields, tableName) {
        return await this.query({
            sql: `SELECT ${fields} FROM ${tableName}`,
            timeout: 3000
        });
    }
    // 参数转义
    escapingParams (params) {
        return mysql.escape(params);
    }
};

DB.getInstance = async () => {
    // 没有实例化的时候创建一个该类的实例
    if (!this.instance) {
        this.instance = new DB();
    }
    await this.instance.init();
    // 已经实例化了，返回第一次实例化对象的引用
    return this.instance;
}
module.exports = DB;
