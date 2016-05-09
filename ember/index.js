/**
 * Created by Administrator on 2016/5/8 0008.
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