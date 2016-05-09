/**
 * Created by keziyuan on 2016/2/18.
 */

var express = require('express'),
    app     = express(),
    path    = require('path'),
    router  = require('./router');

app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, ''));

app.use("/", router);

module.exports = app;
