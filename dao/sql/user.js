module.exports = {
    queryByName: 'SELECT * FROM ?? WHERE name = ?',
    queryByAccount: 'SELECT * FROM `user` WHERE account = ?',
    insertUser: 'INSERT INTO ?? SET ?',
    insertUserMulti: 'INSERT INTO user(name, age) VALUES ?'
};