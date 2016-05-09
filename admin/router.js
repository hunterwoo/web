/**
 * Created by Administrator on 2016/2/23.
 */

var express = require('express');
var router = express.Router();
var Partials = require('../controller/partials');
var Message = require('../controller/message');
var Visitor = require('../controller/visitor');
var Log = require('../controller/log');

router.get("/", function (req, res) {
    res.render("index")
});
router.get('/home', Partials.getHome);
router.get('/message/remind', Message.getRemind);
router.get('/client/count', Visitor.getClientIpCount);
router.get('/log/count', Log.getLogs);


module.exports = router;