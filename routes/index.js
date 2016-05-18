var express = require('express');
var router = express.Router();
var post = require('./post');
var tag = require('./tag');
var ember = require('../ember');
var admin = require('../admin');
var debug = require('debug')('Website:routes');
var userCtrl = require('../controller/user');
var visitorCtrl = require('../controller/visitor');

function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        ( req.connection && req.connection.remoteAddress ) ||
        ( req.socket && req.socket.remoteAddress ) ||
        ( req.connection && req.connection.socket && req.connection.socket.remoteAddress ) || null;
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'ZEEV的小站'});
});
router.get('/signin', userCtrl.showSignin);

router.post('/signin', userCtrl.signin);
router.get('/signout', userCtrl.signout);

module.exports = function (app) {

    app.use(function (req, res, next) {
        var _ip = getClientIp(req);
        if (!app.locals.ip || app.locals.ip != _ip) {
            app.locals.ip = _ip;
            debug(_ip);
            visitorCtrl.compareClientIp(_ip);
        }
        var _user = req.session && req.session.user;
        if (_user) {
            app.locals.user = _user;
        }
        return next();
    });

    app.use("/", router);
    app.use("/ember", ember);
    app.use("/admin", userCtrl.adminRequired, admin);
    app.use("/admin/", userCtrl.adminRequired, admin);
    app.use("/posts", post);
    app.use("/tag", tag);
};
