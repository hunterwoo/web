/**
 * Created by Administrator on 2016/5/9 0009.
 */
var Post = global.dbHelper.getModel("Post");
var debug = require('debug')('Website:posts');

var showdown  = require('showdown'),
    converter = new showdown.Converter();
//html : converter.makeHtml(req.body.markdown || ""),

//var markdown = require('markdown').markdown;
//html : markdown.toHTML(req.body.markdown || ""),

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
        html            : converter.makeHtml(req.body.markdown || ""),
        image           : req.body.image,
        author          : req.session.user,
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
        //.populate('author', 'name')
        .populate({path: 'author', select: 'name'})
        .exec(function (err, posts) {
            if (err) {
                debug(err);
                return res.sendStatus(500);
            }
            if (typeof req.query.part == "string") {
                var reg = /(<[/]+(.*?)>)|(<(.*?)>)|(\n)/g;
                posts.map(function (post) {
                    var index;
                    if (post.html.length > 100) {
                        index = post.html.indexOf(' ', 100);
                        index = index > 200 ? 100 : index;
                    }else{
                        index = post.html.length;
                    }
                    post.html = post.html.replace(reg, '').substring(0, index);
                    post.markdown = "";
                })
            }
            return res.status(200).send(posts);
        })
}

function get(req, res) {
    var _id = req.params._id || req.query._id;
    debug(_id);
    Post.findById(_id, function (err, post) {
        if (err) {
            debug(err);
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
    Post.findOneAndUpdate({_id: _id}, {
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