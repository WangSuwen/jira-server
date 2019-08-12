const mongo = {
    hostname: '127.0.0.1',
    port    : 20001,
    username: '',
    password: '',
    name    : '',
    db      : 'jira'
};

const generate_mongo_url = function (obj) {
    obj.hostname = obj.hostname || 'localhost';
    obj.port     = obj.port || 27017;
    obj.db       = obj.db || 'test';
    if (obj.username && obj.password) {
        return 'mongodb://' + obj.username + ':' + obj.password + '@' + obj.hostname + ':' + obj.port + '/' + obj.db;
    } else {
        return 'mongodb://' + obj.hostname + ':' + obj.port + '/' + obj.db;
    }
};

exports.db      = generate_mongo_url(mongo);