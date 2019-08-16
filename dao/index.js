const config      = require('../config/config.js');

const mysql = require('mysql');
const pool = mysql.createPool(config.mysql);
 
//返回一个Promise链接
const connectHandle = exports.connectHandle = () => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
        if(err) {
            console.error('链接错误：' + err.stack + '\n' + '链接ID：' + connection.threadId);
            reject(err)
        } else {
            resolve(connection);
        }
    });
});
