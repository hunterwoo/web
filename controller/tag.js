/**
 * Created by Administrator on 2016/5/9 0009.
 */
var Tag = global.dbHelper.getModel("Tag");
var debug = require('debug')('Website:Tag');

module.exports = {
    add    : add,
    getList: getList,
    get    : get,
    update : update,
    remove : remove
}

function add(req, res) {
    debug(req.body);
    Tag.create({
        name: req.body.name
    }, function (err, tag) {
        if (err) {
            return res.sendStatus(500);
        }
        return res.status(200).send(tag);
    });
}

function getList(req, res, next) {
    debug(req.query);
    Tag.find({},"_id name")
        .exec(function (err, tags) {
            if (err) {
                debug(err);
                return res.sendStatus(500);
            }
            return res.status(200).send(tags);
        })
}

function get(req, res) {
    var _id = req.params._id || req.query._id;
    debug(_id);
    Tag.getOneById(_id, function (err, post) {
        if (err) {
            debug(err);
            return res.sendStatus(500);
        }
        if (!post) {
            return res.status(404).send({"msg": "post不存在"});
        }
        Post
            .find({_id: {"$gt": _id}}, "_id title")
            .sort({'updated_at': -1})
            .limit(1)
            .exec(function (err, nextPost) {
                if (err) {
                    debug(err);
                    return res.sendStatus(500);
                }
                post.nextPost = nextPost[0];
                debug(post.nextPost);
                return res.status(200).send(post);
            })
    })
}

function remove(req, res) {
    var _id = req.query._id || req.body._id;
    debug(_id);
    Tag.findByIdAndRemove(_id, function (err, doc) {
        if (err) {
            debug(err);
            return res.sendStatus(500);
        }
        if (doc) {
            return res.status(200).send({msg: '删除成功'})
        } else {
            return res.status(400).send({msg: 'post不存在'})
        }
    })
}

function update(req, res) {
    var _id = req.body._id;
    debug(_id);
    Tag.findOneAndUpdate({_id: _id}, {
        $set: {
            title           : req.body.title,
            markdown        : req.body.markdown,
            html            : converter.makeHtml(req.body.markdown || ""),
            image           : req.body.image,
            meta_title      : req.body.meta_title,
            meta_description: req.body.meta_description
        }
    }, function (err, doc) {
        if (err) {
            debug(err);
            return res.sendStatus(500);
        }
        if (doc) {
            return res.status(200).send(doc);
        } else {
            return res.status(400).send({msg: 'post不存在'})
        }
    })
}