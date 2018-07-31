var gulp = require('gulp');
var gutil = require('gulp-util');


/* *************
  TEMPLATING
************* */

var nunjucksRender = require('gulp-nunjucks-render');

gulp.task('nunjucks', function() {
    return gulp.src('src/emails/*.nunjucks')
        .pipe(
            nunjucksRender({
                path: ['src/templates/', 'build/css/']
            })
            .on('error', gutil.log)
        )
        .pipe(gulp.dest('build/'));
});


/* *************
    WATCH
************* */

var filesToWatch = [
    'src/css/**/*.css',
    'src/emails/*.nunjucks',
    'src/templates/**/*.nunjucks'
];

gulp.task('watch', function() {
    gulp.watch(filesToWatch, gulp.series('nunjucks'));
});


/* *************
    DEFAULT
************* */

gulp.task('default', gulp.series('nunjucks', 'watch'));
