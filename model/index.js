const config      = require('../config/config.js');
// const logger      = require('pomelo-logger').getLogger('log' , __filename , process.pid);
// const path = require('path');
// const fs = require('fs');

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

/* exports.getModel = function (name) {
    var file = path.join(__dirname , name + '.js');

    //noinspection JSUnresolvedFunction
    if (fs.existsSync(file)) {
        var schema = require(file).schema;
        if (schema) {
            return mongoose.model(name , schema);
        }
        else {
            logger.warn('NO Schema');
        }
    }
    return undefined;
}; */