/**
 * Created by keziyuan on 2016/2/21.
 */

var Message = global.dbHelper.getModel("Message");
var debug = require('debug')('Website:message');

module.exports = {
    addMessage: addMessage,
    getRemind: getRemind,
    getMessages: getMessages
}

function addMessage(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var content = req.body.content;

    var message = new Message({
        name: name,
        email: email,
        content: content
    });
    message.save(function (err, doc) {
        if (err) {
            return res.sendStatus(500);
        }
        res.status(200).send(doc);
    })
}

function getRemind(req, res) {
    Message
        .find({status: 0})
        .sort({'created_at': -1})
        .exec(function (err, messages) {
            if (err) {
                console.log(err)
                return res.sendStatus(500);
            }
            if (!messages) {
                messages = []
            }
            return res.status(200).send( messages);
        })
}

function getMessages(req, res) {
    Message
        .find()
        .sort('created_at')
        .exec(function (err, messages) {
            if (err) {
                console.log(err)
                return res.sendStatus(500);
            }
            if (!messages) {
                messages = []
            }
            return res.status(200).send(messages);
        })
}