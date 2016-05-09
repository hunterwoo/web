var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var dbConfig = require('./config/db.js');
var fs = require('fs');
//var accessLog = fs.createWriteStream('./log/access.log', {flags: 'a'});
//var errorLog = fs.createWriteStream('./log/error.log', {flags: 'a'});
/**
 * Connect to mongoose.
 */
mongoose.connect(dbConfig.mongodb);
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {
    console.log("连接成功！");
});
global.dbHelper = require('./schema');

var app = express();

app.use(session({
    secret           : 'website',
    key              : "website",
    store            : new MongoStore({
        url       : dbConfig.mongodb,
        collection: 'sessions'
    }),
    cookie           : {
        maxAge: 1000 * 60 * 60 * 6
    },
    resave           : false,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(logger({stream: accessLog}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/bower_components', express.static(path.join(__dirname, './bower_components')));
app.use('/common', express.static(path.join(__dirname, './common')));
app.use('/libs', express.static(path.join(__dirname, './libs')));
app.use('/ember', express.static(path.join(__dirname, './ember')));
app.use('/angular', express.static(path.join(__dirname, './angular')));
app.use('/admin', express.static(path.join(__dirname, './admin')));
app.use(function (err, req, res, next) {
    var meta = '[' + new Date() + '] ' + req.url + '\n';
    errorLog.write(meta + err.stack + '\n');
    next();
});

require('./routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error  : err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error  : {}
    });
});


module.exports = app;
