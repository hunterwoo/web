/**
 * Created by Administrator on 2016/5/9 0009.
 */
var express = require('express');
var router = express.Router();
var Tag = require('../controller/tag');

/* GET users listing. */
router
    .get('/', Tag.getList)
    .post('/', Tag.add)
    .put('/', Tag.update)
    .get('/:_id', Tag.get)
    .delete('/:_id', Tag.remove)
    .delete('/', Tag.remove);

module.exports = router;