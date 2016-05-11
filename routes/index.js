var express = require('express');
var router = express.Router();
var articles = require('./articles');
var post = require('./post');
var ember = require('../ember');
var admin = require('../admin');
var userCtrl = require('../controller/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'ZEEV的小站'});
});
router.get('/signin', userCtrl.showSignin);

router.post('/signin', userCtrl.signin);

module.exports = function (app) {
    app.use("/", router);
    app.use("/ember", ember);
    app.use("/admin", userCtrl.adminRequired, admin);
    app.use("/articles", articles);
    app.use("/posts", post);
};
