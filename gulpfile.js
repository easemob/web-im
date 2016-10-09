var gulp = require('gulp');
var mocha = require('gulp-mocha');   // 用于单元测试
var babel = require("gulp-babel");   // 用于ES6转化ES5
var uglify = require('gulp-uglify'); // 用于压缩 JS

// ES6转化为ES5
// 在命令行使用 gulp toes5 启动此任务
gulp.task("toes5", function () {
    return gulp.src("demo/javascript/dist/demo.js")// ES6 源码存放的路径
        .pipe(babel())
        .pipe(gulp.dest("demo/javascript/dist2")); //转换成 ES5 存放的路径
});

// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('min', function () {
    // 1. 找到文件
    gulp.src('demo/javascript/dist2/demo.js')
        // 2. 压缩文件
        .pipe(uglify())
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('demo/javascript/dist2_min'))
});

// 自动监控任务
// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 script 任务
    gulp.watch('demo/javascript/dist/demo.js', ['toes5']);
    gulp.watch('demo/javascript/dist2/demo.js', ['min']);

});

//单元测试
gulp.task('test', function () {

    return gulp.src('demo/javascript/src/test.js')
        .pipe(mocha())
        .once('error', function () {
            process.exit(1);
        })
        .once('end', function () {
            process.exit();
        });
});
