const mysql = exports.mysql = {
    host     : 'localhost',
    user     : 'me',
    password : 'secret',
    database : 'my_db',
    port: 3306
};

const generate_mysql_url = function (obj) {
    obj.hostname = obj.hostname || 'localhost';
    obj.port     = obj.port || 27017;
    obj.db       = obj.db || 'test';
    if (obj.username && obj.password) {
        return 'mongodb://' + obj.username + ':' + obj.password + '@' + obj.hostname + ':' + obj.port + '/' + obj.db;
    } else {
        return 'mongodb://' + obj.hostname + ':' + obj.port + '/' + obj.db;
    }
};

exports.db = generate_mysql_url(mysql);