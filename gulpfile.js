'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

//编译sass,并放入到browsersync的流文件中
gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
});

//监控sass变化
gulp.task('sass:watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
});


gulp.task("browsersync-watch",function(){
    gulp.watch([
    	"./*.html",
    	'./css/*.css',
    	'./js/*.js'
	]).on('change', browserSync.reload);

});

gulp.task("server",['sass:watch','browsersync-watch'],function(){
	browserSync.init({
		//在package.json配置的端口9090
        proxy: "127.0.0.1:9090"
    });
});
