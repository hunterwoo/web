/**
 * Created by Administrator on 2016/5/9 0009.
 */
var Post = global.dbHelper.getModel("Post");
var debug = require('debug')('Website:http');
var markdown = require('markdown').markdown;

module.exports = {
    add    : add,
    getList: getList,
    get    : get,
    update : update,
    remove : remove
}

function add(req, res) {
    debug(req.body);
    Post.create({
        title           : req.body.title,
        markdown        : req.body.markdown,
        html            : markdown.toHTML(req.body.markdown || ""),
        image           : req.body.coverImg,
        meta_title      : req.body.meta_title,
        meta_description: req.body.meta_description
    }, function (err, post) {
        if (err) {
            return res.sendStatus(500);
        }
        return res.status(200).send(post);
    });
}

function getList(req, res, next) {
    debug(req.query);
    var limit = parseInt(req.query.limit) || 0;
    Post
        .find({})
        .sort({'updated_at': -1})
        .limit(limit)
        .populate('author', 'name')
        .exec(function (err, post) {
            if (err) {
                console.log(err)
                return res.sendStatus(500);
            }
            if (!post) {
                post = []
            }
            return res.status(200).send(post);
        })
}

function get(req, res) {
    var _id = req.params._id || req.query._id;
    debug(_id);
    Post.findById(_id, function (err, post) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!post) {
            return res.status(404).send({"msg": "post不存在"});
        }
        return res.status(200).send(post);
    })
}

function remove(req, res) {
    var _id = req.query._id || req.body._id;
    debug(_id);
    Post.findByIdAndRemove(_id, function (err, doc) {
        if (err) {
            console.log(err);
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
    Post.findOneAndUpdate({_id: _id}, {
        $set: {
            title           : req.body.title,
            markdown        : req.body.markdown,
            html            : markdown.toHTML(req.body.markdown || ""),
            image           : req.body.coverImg,
            meta_title      : req.body.meta_title,
            meta_description: req.body.meta_description
        }
    }, function (err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (doc) {
            return res.status(200).send(doc);
        } else {
            return res.status(400).send({msg: 'post不存在'})
        }
    })
}