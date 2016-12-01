'use strict'

let packageJson = require('./package.json')
let version = packageJson.version


var gulp = require('gulp')
var webpack = require('webpack-stream')
var mocha = require('gulp-mocha')   // 用于单元测试
var babel = require('gulp-babel')   // 用于ES6转化ES5
// var browserify = require('browserify');
// var source = require('vinyl-source-stream');
// var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var gutil = require('gulp-util')


// websdk-{version}.js
gulp.task('sdk:umd', function () {
    return gulp.src('./index.js')
        .pipe(webpack({
                output: {
                    filename: 'websdk-' + version + '.js',
                    library: 'WebIM',
                    libraryTarget: 'umd'
                }
            })
        )
        .pipe(gulp.dest('dist/'))
})

// websdk-{version}.min.js
// websdk-{version}.min.js.map
gulp.task('sdk:umd:min', ['sdk:umd'], function () {
    return gulp.src('./dist/websdk-' + version + '.js')
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(rename('websdk-' + version + '.min.js'))
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'))
})

gulp.task('sdk', ['sdk:umd', 'sdk:umd:min'])

gulp.task('default', ['sdk'])

//
// gulp.task('watch', function() {
//     livereload.listen(); //要在这里调用listen()方法
//     gulp.watch('less/*.less', ['less']);
// });
