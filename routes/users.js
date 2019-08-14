var express = require('express');
var router = express.Router();
const userCtr = require('../controller/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  userCtr.save(req, res);
});
router.get('/search', function(req, res, next) {
  userCtr.search(req, res);
});

module.exports = router;
