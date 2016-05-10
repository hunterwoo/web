/**
 * Created by keziyuan on 2016/1/5.
 */
var gulp        = require('gulp'),
    es          = require('event-stream'),
    clean       = require('gulp-clean'),
    less        = require('gulp-less'),
    nodemon     = require('gulp-nodemon'),
    uglify      = require('gulp-uglify'),
    gulpif      = require('gulp-if'),
    useref      = require("gulp-useref"),
    pkg         = require('./package.json'),
    header      = require('gulp-header'),
    cleanCss    = require("gulp-clean-css"),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;

var banner = ['/**',
    ' * <%= pkg.name %> - ' + new Date,
    ' * @version v<%= pkg.version %>',
    ' */',
    ''].join('\n');

var production = gulp.env.production;

function log(error) {
    console.error(error.toString && error.toString());
}

/**
 * 清理文件
 */
gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean({force: true}))
        .on('error', log);
});

/**
 * 清理打包之后编译的css
 */
gulp.task('clean-css', function () {
    return gulp.src('./common/css', {read: false})
        .pipe(clean({force: true}))
        .on('error', log);
});

/**
 * 编译less文件
 */
gulp.task('less', ['clean-css'], _less);
function _less() {
    return gulp.src('./common/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./common/css/'))
}

gulp.task('less-watch', ['less'], function () {
    reload();
});


var copyConfig = {
    html   : [
        "./views*/404*",
        './views*/error*',
        './admin*/views*/**/*'
    ],
    image  : [
        './common*/img*/**/*'
    ],
    node_js: [
        './bin*/*',
        './config*/*.js',
        './controller*/*.js',
        './routes*/*.js',
        './schema*/*.js',
        './app*.js',
        './admin*/*.js',
        './ember*/*.js'
    ],
    js     : [
        './libs*/**/*.js'
    ],
    fonts  : [
        './bower_components/bootstrap/fonts/*.*',
        './bower_components/font-awesome/fonts/*.*'
    ],
    css    : []
}
/**
 *  复制并压缩
 */
gulp.task('copy', function () {
    gulp.src(copyConfig.fonts).pipe(gulp.dest('./dist/common/fonts/'));
    gulp.src([]).pipe(gulp.dest('./dist/logs/'));
    return es.merge(
        gulp.src(copyConfig.node_js).pipe(uglify()).pipe(header(banner, {pkg: pkg})),
        gulp.src(copyConfig.css).pipe(cleanCss()),
        gulp.src(copyConfig.html),
        gulp.src(copyConfig.image)
    ).pipe(gulp.dest('./dist/')).on('error', log)
})


/**
 *  build
 */
gulp.task('build', ['clean'], function () {
    gulp.start('init', 'copy');
});

/**
 * 处理主文件打包
 */
gulp.task("init", ['less'], function () {
    return gulp.src([
        './view*/index.html',
        './admin*/index.html',
        './ember*/index.html'
    ]).pipe(useref({
        searchPath: './'
    }))
        .pipe(gulpif("*.js", uglify()))
        .pipe(gulpif("*.js", header(banner, {pkg: pkg})))
        .pipe(gulpif("*.css", cleanCss()))
        .pipe(gulp.dest('./dist/'))
})

/**
 *  启动自动刷新浏览器
 */
gulp.task('browser-sync', function () {
    browserSync.init({
        browser: "firefox",
        proxy  : "http://localhost:4222/",
        port   : "80"
    });
});

/**
 *  启动node服务
 */
gulp.task('start', ['browser-sync'], function () {
    return nodemon({
        script : './bin/www',
        ext    : 'js',
        verbose: true,
        ignore : ["common/*", "gulpfile.js", "ember/js/**/*", "admin/js/**/*", "admin/views/**/*", "package.json"],
        env    : {
            'NODE_ENV': 'development',
            'DEBUG'   : 'Website:*',
            "PORT"    : 4222
        }
    }).on('start', function () {
        reload();
    }).on('restart', function () {
        //console.log('restarted!')
    })
})

/**
 *  启动watch监听
 */
gulp.task('default', ['start', 'less'], function () {
    gulp.watch([
        './ember/js/**/*',
        './ember/index.html',
        './admin/**/*',
        './admin/index.html',
        './common/**/*.{js}',
        './views/*.{js,html,ejs}'
    ]).on('change', reload);
    gulp.watch('./common/**/*.less', ['less-watch']);
});