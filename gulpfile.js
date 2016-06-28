// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');
var del = require('del');

// 检查脚本
gulp.task('lint', function() {
    gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(rename({ suffix: '.min' })) //rename压缩后的文件名
        .pipe(cleancss()) //执行压缩        
        .pipe(gulp.dest('dist/css')) //输出文件夹;
});




// 压缩CSS
gulp.task('cleancss',['sass'], function() {
    return gulp.src('css/main.css') //压缩的文件
        .pipe(rename({ suffix: '.min' })) //rename压缩后的文件名
        .pipe(cleancss()) //执行压缩        
        .pipe(gulp.dest('dist/css')) //输出文件夹
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


//Copy html
gulp.task('html', function() {
    gulp.src('html/*.html')
        .pipe(gulp.dest('./dist/html'));
});

//lib
gulp.task('lib', function() {
    gulp.src('bower_components/jquery/jquery.js')
        .pipe(gulp.dest('./dist/lib/jquery'));
    gulp.src('bower_components/jquery/dist/jquery.min.map')
        .pipe(gulp.dest('./dist/lib/jquery'));
    gulp.src('bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js')
        .pipe(gulp.dest('./dist/lib/bs3'));
});

// 默认任务
gulp.task('default', function() {
    gulp.run('sass');
    gulp.run('lint', 'scripts', 'html', 'lib');

    // 监听文件变化
    gulp.watch('js/*.js', function() {
        gulp.run('lint', 'scripts');
    });

    gulp.watch('scss/*.scss', function() {
        gulp.run('sass');
    });

    gulp.watch('html/*.html', function() {
        gulp.run('html');
    });
});
