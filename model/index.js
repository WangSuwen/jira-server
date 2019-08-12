const config      = require('../config/config.js');
const logger      = require('pomelo-logger').getLogger('log' , __filename , process.pid);
const path = require('path');
const fs = require('fs');

const mysql = require('mysql');
const pool = exports.pool = mysql.createPool(config.mysql);
 
/* pool.connect(err => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + pool.threadId);
}); */

exports.getModel = function (name) {
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
};