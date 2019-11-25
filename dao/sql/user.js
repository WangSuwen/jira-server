module.exports = {
    queryByName: 'SELECT * FROM ?? WHERE name = ?',
    queryByAccount: 'SELECT id, name, avatar, password FROM `user` WHERE account = ?',
    insertUser: 'INSERT INTO ?? SET ?',
    insertUserMulti: 'INSERT INTO user(name, age) VALUES ?'
};