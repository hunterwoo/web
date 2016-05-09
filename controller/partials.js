/**
 * Created by Administrator on 2016/3/2.
 */


var Post = global.dbHelper.getModel("Post");
var User = global.dbHelper.getModel("User");
var Log = global.dbHelper.getModel("Log");
var Visitor = global.dbHelper.getModel("Visitor");
var Message = global.dbHelper.getModel("Message");

module.exports = {
    getHome: getHome
}

function getHome(req, res) {
    var count = 5;
    var data = {}
    var isComplete = function () {
        if (count === 0) {
            return res.status(200).send(data)
        }
    }
    Post.count(function (err, c) {
        --count;
        if (!err) {
            data['articles'] = c;
        }
        isComplete();
    })
    User.count(function (err, c) {
        --count;
        if (!err) {
            data['user'] = c;
        }
        isComplete();
    })
    Log.find({})
        .limit(7)
        .sort({'date': -1})
        .exec(function (err, log) {
            --count;
            if (!err) {
                data['logs'] = log;
            }
            isComplete();
        })
    Visitor.count(function (err, c) {
        --count;
        if (!err) {
            data['visitor'] = c;
        }
        isComplete();
    })
    Message.count(function (err, c) {
        --count;
        if (!err) {
            data['message'] = c;
        }
        isComplete();
    })
}