/**
 * Created by keziyuan on 2016/1/5.
 *
 *
 *
 */
var gulp        = require('gulp'),
    clean       = require('gulp-clean'),
    less        = require('gulp-less'),
    nodemon     = require('gulp-nodemon'),
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
        ignore : ["common/*", "gulpfile.js", "ember/js/**/*", "admin/js/**/*", "admin/views/**/*"],
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