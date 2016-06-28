'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var exec = require("child_process").exec;


//编译sass,并放入到browsersync的流文件中
gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./css'));
});

//监控sass变化
gulp.task('sass:watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
});


gulp.task("browsersync-watch",function(){
    gulp.watch([
    	"./*.html",
    	'./js/**/*.js'
	]).on('change', browserSync.reload);
});



gulp.task("server",['sass:watch','browsersync-watch'],function(){
	browserSync.init({
        proxy: "127.0.0.1:9090"
    });
});
