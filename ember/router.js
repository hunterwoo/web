/**
 * Created by Administrator on 2016/5/8 0008.
 */
var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
    res.render("index")
});

module.exports = router;