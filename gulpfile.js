var gulp = require('gulp'),
	connect = require('gulp-connect'),
	less = require('gulp-less'),
	path = require('path'),
	minifyCSS = require('gulp-minify-css');


gulp.task('default', ['less', 'webserver', 'watch']);


gulp.task('less', function () {
	return gulp.src('./static/less/**/*.less')
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./static/css'));
});

gulp.task('watch', function() {
	gulp.watch('./static/less/**/*.less', ['less']);
});


gulp.task('webserver', function() {
	connect.server({
		port: 3333
	});
});