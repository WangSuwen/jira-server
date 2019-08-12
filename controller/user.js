
// const UserModel = require('../model/index').getModel('user');

const pool = require('../model/index').pool;
exports.save = function (req, res) {
    pool.query('INSERT INTO user SET ?', {
        name: '张三', // https://msd.misuland.com/pd/3255817963235710452
        age: 12
    }, (err, data) => {
        console.log(err, data);
        res.json(err);
    });
};