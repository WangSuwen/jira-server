var express = require('express');
var router = express.Router();
const userCtr = require('../controller/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  userCtr.save(req, res);
});
// 登录
router.post('/login', userCtr.login);
// 注册
router.post('/register', userCtr.register);




router.get('/preparingInsert', function(req, res, next) {
  userCtr.preparingInsert(req, res);
});
router.get('/preparingInsertMulti', function(req, res, next) {
  userCtr.preparingInsertMulti(req, res);
});
router.get('/search', function(req, res, next) {
  userCtr.search(req, res);
});
router.get('/preparingQuery', function(req, res, next) {
  userCtr.preparingQuery(req, res);
});

module.exports = router;
