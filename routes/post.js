/**
 * Created by Administrator on 2016/5/9 0009.
 */
var express = require('express');
var router = express.Router();
var Post = require('../controller/post');

/* GET users listing. */
router
    .get('/', Post.getList)
    .post('/', Post.add)
    .put('/', Post.update)
    .get('/:_id', Post.get)
    .delete('/:_id', Post.remove);

module.exports = router;