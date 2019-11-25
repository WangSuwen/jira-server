module.exports = {
    queryByName: 'SELECT * FROM ?? WHERE name = ?',
    queryByAccount: 'SELECT id, name, avatar, password FROM `user` WHERE account = ?',
    // queryByAccount: 'SELECT id, Concat(name, "：{", account, "}") as co FROM `user` WHERE account = ?', // 计算字段，自定义拼接
    insertUser: 'INSERT INTO ?? SET ?',
    insertUserMulti: 'INSERT INTO user(name, age) VALUES ?'
};