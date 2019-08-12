const mongoose    = require('mongoose');
const config      = require('../config/config.js');
const logger      = require('pomelo-logger').getLogger('log' , __filename , process.pid);
const path = require('path');
const fs = require('fs');

mongoose.Promise = global.Promise;
const mongoConnection = exports.mongoConnection = mongoose.connect(config.db , function (err) {
    if (err) {
        logger.error('connect to %s error: ' , config.db , err.message);
        connected = false;
    } else {
        logger.info('connect to %s succeed!' , config.db);
        connected = true;
        var db    = mongoose.connection;
        db.on('error' , function () {
            logger.error('connection error:');
        });
    }
});

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