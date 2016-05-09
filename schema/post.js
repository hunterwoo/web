/**
 * Created by keziyuan on 2016/2/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var debug = require('debug')('Website:schema');

var PostSchema = new mongoose.Schema({
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

PostSchema.pre('save', function (next) {
    debug("save");
    next();
})

PostSchema.pre('update', function (next) {
    debug("update");
    next();
});

PostSchema.statics = {}

module.exports = PostSchema;