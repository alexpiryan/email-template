var gulp = require('gulp');
var gutil = require('gulp-util');


/* *************
  Config
************* */
/*
var globalData = {
    mailchimp: require('./src/data/mailchimp.json')
};
*/


/* *************
  TEMPLATING
************* */

var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');

gulp.task('nunjucks', function() {
    return gulp.src('src/emails/*.nunjucks')
/*        .pipe(
            data(function() {
                return globalData;
            })
            .on('error', gutil.log)
        ) */
        .pipe(
            nunjucksRender({
                path: ['src/templates/', 'build/css/']
            })
            .on('error', gutil.log)
        )
        .pipe(gulp.dest('build/'));
});


/* *************
    ZIP
************* */

var zip = require('gulp-zip');

gulp.task('zip', function () {
    return gulp.src('build/**')
        .pipe(zip('build.zip'))
        .pipe(gulp.dest('./'));
});



/* *************
    WATCH
************* */

var filesToWatch = [
    'src/css/**/*.css',
    'src/emails/*.nunjucks',
    'src/templates/**/*.nunjucks',
    'src/data/*.json'
];

gulp.task('watch', function() {
    gulp.watch(filesToWatch,['nunjucks']);
});


/* *************
    DEFAULT
************* */

gulp.task('default', ['nunjucks', 'watch']);
