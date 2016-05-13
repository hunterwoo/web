/**
 * Created by Administrator on 2016/5/8 0008.
 */

var debug = require('debug')('Website:user');
var User = global.dbHelper.getModel("User");

module.exports = {
    adminRequired: adminRequired,
    showSignin   : showSignin,
    signin       : signin,
    signout      : signout
}
function adminRequired(req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('signin', {title: '登录'});
    }
    //if (user.role <= 10) {
    //    return res.status(404).send({msg: '用户权限不够'});
    //}
    next();
}

function showSignin(req, res, next) {
    return res.redirect('signin', {title: '登录'});
}

function signin(req, res) {
    var _user = {
        name    : req.body.name,
        password: req.body.password
    }
    debug(_user);
    User.findOne({name: _user.name}, function (err, user) {
        if (err) {
            res.sendStatus(500);
        }
        if (!user) {
            res.sendStatus(403);
        } else {
            user.compare(_user, function (err, isMatch) {
                if (err) {
                    res.sendStatus(500);
                }
                if (isMatch && user.role >= 10) {
                    req.session.user = user;
                    res.cookie('active', 'true');
                    res.cookie('name', user.name);
                    res.cookie('role', user.role);
                    res.sendStatus(200);
                } else {
                    res.sendStatus(403);
                }
            })
        }
    })
}

function signout(req, res) {
    delete req.session.user;
    res.clearCookie('active');
    res.clearCookie('name');
    res.clearCookie('role');
    return res.sendStatus(200);
}