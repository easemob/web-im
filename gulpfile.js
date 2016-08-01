var gulp = require('gulp'),
    mocha = require('gulp-mocha'); 


//test
gulp.task('test', function() {

    return gulp.src('demo/javascript/src/test.js')
        .pipe(mocha())
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });
});
