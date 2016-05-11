/**
 * Created by Administrator on 2016/5/8 0008.
 */

var debug = require('debug')('Website:user');
var User = global.dbHelper.getModel("User");

module.exports = {
    adminRequired: adminRequired,
    showSignin   : showSignin,
    signin       : signin
}
function adminRequired(req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.render('signin', {title: '登录'});
    }
    //if (user.role <= 10) {
    //    return res.status(404).send({msg: '用户权限不够'});
    //}
    next();
}

function showSignin(req, res, next) {
    return res.render('signin', {title: '登录'});
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
            res.status(403).send({"msg": "帐号不存在"});
        } else {
            user.compare(_user, function (err, isMatch) {
                if (err) {
                    res.sendStatus(500);
                }
                if (isMatch) {
                    req.session.user = user;
                    res.cookie('active', 'true');
                    res.cookie('name', user.name);
                    res.cookie('role', user.role);
                    if (user.role >= 10) {
                        res.status(300).send({"url": '/admin'})
                    } else {
                        res.status(300).send({"url": '/'})
                    }
                } else {
                    res.sendStatus(403);
                }
            })
        }
    })
}