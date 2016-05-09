/**
 * Created by Administrator on 2016/5/8 0008.
 */

var debug = require('debug')('Website:http');

module.exports = {
    add    : add,
    getList: getList
}

function add(req, res) {
    debug(req.body);
}

function getList(req, res, next) {
    debug(req.query);
}