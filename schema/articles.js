/**
 * Created by keziyuan on 2016/2/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var debug = require('debug')('Website:schema');

var ArticlesSchema = new mongoose.Schema({
    title           : {type: String, required: true},
    slug            : {type: String, max: 150, unique: false},
    markdown        : {type: String, max: 16777215, required: false},
    html            : {type: String, max: 16777215, required: false},
    image           : {type: String},
    featured        : {type: Boolean, required: false, default: false},
    page            : {type: Boolean, required: false, default: false},
    status          : {type: String, max: 150, required: true, default: 'draft'},
    meta_title      : {type: String, max: 150, required: false},
    meta_description: {type: String, max: 200, required: false},
    author          : {type: ObjectId, ref: "User"},
    created_at      : {type: Date, default: Date.now()},
    updated_at      : {type: Date, default: Date.now()},
    published_at    : {type: Date, default: Date.now()},
    review          : {type: Number, default: 0}
})

ArticlesSchema.pre('save', function (next) {
    debug("save");
    next();
})

ArticlesSchema.pre('update', function (next) {
    debug("update");
    this.updated_at = Date.now();
    next();
});

ArticlesSchema.statics = {
    fetch           : function (cb) {
        return this
            .find({})
            .populate('author', 'name')
            .sort('updated_at')
            .exec(cb)
    },
    findById        : function (id, cb) {
        return this
            .findOne({_id: id})
            .populate('author', 'name')
            .exec(cb)
    },
    findByIdForViews: function (id, cb) {
        return this
            .findOne({_id: id})
            .populate('author', 'name')
            .exec(cb)
    }
}

module.exports = ArticlesSchema;