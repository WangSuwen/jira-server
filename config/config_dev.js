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