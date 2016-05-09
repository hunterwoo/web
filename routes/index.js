var express = require('express');
var router = express.Router();
var articles = require('./articles');
var post = require('./post');
var ember = require('../ember');
var admin = require('../admin');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'ZEEV的小站'});
});

module.exports = function (app) {
    app.use("/", router);
    app.use("/ember", ember);
    app.use("/admin", admin);
    app.use("/articles", articles);
    app.use("/posts", post);
};
