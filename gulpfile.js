const gulp = require('gulp'),
	connect = require('gulp-connect'),
	less = require('gulp-less'),
	path = require('path'),
	minifyCSS = require('gulp-minify-css'),
	htmlmin = require('gulp-htmlmin'),
	minify = require('gulp-minify'),
	s3 = require("gulp-s3"),
  autoprefixer = require('gulp-autoprefixer'),
  config = require('./config.js'),
  configObject = {
    'key': config.AWS_ACCESS_KEY_ID,
    'secret': config.AWS_SECRET_ACCESS_KEY,
    'bucket': config.BucketName,
    'region': config.AWS_REGION
  };


gulp.task('default', ['less', 'webserver', 'watch']);
gulp.task('publish', ['less', 'minify', 'compress', 'movefiles']);
gulp.task('deploy', ['less', 'minify', 'compress', 'movefiles', 'publishS3_noImages']);




gulp.task('less', function () {
	return gulp.src('./Source/static/less/main.less')
		.pipe(less({
			paths: [ path.join(__dirname, 'less', 'includes') ]
		}))
		.pipe(autoprefixer())
		.pipe(minifyCSS())
		.pipe(gulp.dest('./Source/static/css'));
});

gulp.task('watch', function() {
	gulp.watch('./Source/static/less/**/*.less', ['less']);
});


gulp.task('webserver', function() {
	connect.server({
		port: 3333
	});
});


gulp.task('minify', function() {
	return gulp.src('./index.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./publish'))
});

gulp.task('movefiles', function() {
	gulp.src('./static/css/*.css')
	.pipe(gulp.dest('./publish/static/css'));
	gulp.src('./static/fonts/**/*')
	.pipe(gulp.dest('./publish/static/fonts'));
	gulp.src('./static/images/**/*')
	.pipe(gulp.dest('./publish/static/images'));
});


gulp.task('compress', function() {
	gulp.src('./static/javascript/*.js')
		.pipe(minify({
			exclude: ['tasks'],
			ignoreFiles: ['-min.js']
	}))
	.pipe(gulp.dest('./publish/static/javascript'))
});



gulp.task('publishS3_noImages', function() { 
	gulp.src('./publish/static/css/**')
		.pipe(s3(configObject));

	gulp.src('./publish/static/javascript/**')
		.pipe(s3(configObject));
	gulp.src('./publish/static/fonts/**')
		.pipe(s3(configObject));
	gulp.src('./publish/index.html')
		.pipe(s3(configObject));
});

gulp.task('publishS3', function() { 
	gulp.src('./publish/**')
		.pipe(s3(configObject));
});