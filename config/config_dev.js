const mysql = exports.mysql = {
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'jira',
    port     : 3306,
    connectionLimit : 10,
    insecureAuth : true
};

exports.settings = {
    cookie_name: 'jira_cookie',
    cookie_encrypt_secret: 'jira_cookie_20191112'
};

/* const generate_mysql_url = function (obj) {
    obj.hostname = obj.hostname || 'localhost';
    obj.port     = obj.port || 27017;
    obj.db       = obj.db || 'test';
    if (obj.username && obj.password) {
        return 'mongodb://' + obj.username + ':' + obj.password + '@' + obj.hostname + ':' + obj.port + '/' + obj.db;
    } else {
        return 'mongodb://' + obj.hostname + ':' + obj.port + '/' + obj.db;
    }
};

exports.db = generate_mysql_url(mysql); */