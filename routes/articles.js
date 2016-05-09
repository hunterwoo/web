/**
 * Created by Administrator on 2016/5/8 0008.
 */
var express = require('express');
var router = express.Router();
var Articles = require('../controller/articles');
var User = require('../controller/user');

/* GET users listing. */
router.get('/list', Articles.getList);
router.get('/:id', Articles.getList);
router.post('/add', Articles.add);

module.exports = router;