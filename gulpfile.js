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
  CSS
************* */

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var postcssProcessors = [
    autoprefixer( { browsers: ['last 2 versions', 'ie > 10'] } )
];

gulp.task('prefixCss', function() {
    return gulp.src('src/css/inline.css')
        .pipe(
            postcss(postcssProcessors)
        )
        .pipe(gulp.dest('build/css/'));
});


var inlineCss = require('gulp-inline-css');

gulp.task('inlinecss', ['prefixCss', 'nunjucks'], function() {
    return gulp.src('build/*.html')
      /*// dont inline css automatically for now as it removes end tags /> for meta, img and br which leads to
        // HTML that doesn't pass the html validator anymore. Also strips out fallback background-image declarations.
        .pipe(
            inlineCss({
                applyStyleTags: false,
                removeStyleTags: false
            })
            .on('error', gutil.log)
        )*/
        .pipe(gulp.dest('build/'));
});





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
    gulp.watch(filesToWatch,['nunjucks', 'inlinecss']);
});


/* *************
    DEFAULT
************* */

gulp.task('default', ['nunjucks', 'inlinecss', 'watch']);


