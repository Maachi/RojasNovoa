var gulp = require('gulp'),
	connect = require('gulp-connect'),
	less = require('gulp-less'),
	path = require('path'),
	minifyCSS = require('gulp-minify-css'),
	htmlmin = require('gulp-htmlmin'),
	minify = require('gulp-minify'),
	awspublish = require('gulp-awspublish'),
	s3 = require("gulp-s3"),
	autoprefixer = require('gulp-autoprefixer');


gulp.task('default', ['less', 'webserver', 'watch']);
gulp.task('publish', ['less', 'minify', 'compress', 'movefiles']);

gulp.task('publish-no-images', ['less', 'minify', 'compress', 'movefiles', 'publishS3_noImages']);


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
		.pipe(gulp.dest('./Publish'))
});

gulp.task('movefiles', function() {
	gulp.src('./static/css/*.css')
	.pipe(gulp.dest('./Publish/static/css'));
	gulp.src('./static/fonts/**/*')
	.pipe(gulp.dest('./Publish/static/fonts'));
	gulp.src('./static/images/**/*')
	.pipe(gulp.dest('./Publish/static/images'));
});


gulp.task('compress', function() {
	gulp.src('./static/javascript/*.js')
		.pipe(minify({
			exclude: ['tasks'],
			ignoreFiles: ['-min.js']
	}))
	.pipe(gulp.dest('./Publish/static/javascript'))
});



gulp.task('publishS3_noImages', function() { 
	gulp.src('./Publish/static/css/**')
		.pipe(s3({
			"key": "AKIAIO6OZES6DLPA775Q",
			"secret": "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",
			"bucket": "rojasnovoa.com",
			"region": "us-west-2"
		}));

	gulp.src('./Publish/static/javascript/**')
		.pipe(s3({
			"key": "AKIAIO6OZES6DLPA775Q",
			"secret": "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",
			"bucket": "rojasnovoa.com",
			"region": "us-west-2"
		}));
	gulp.src('./Publish/static/fonts/**')
		.pipe(s3({
			"key": "AKIAIO6OZES6DLPA775Q",
			"secret": "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",
			"bucket": "rojasnovoa.com",
			"region": "us-west-2"
		}));
	gulp.src('./Publish/index.html')
		.pipe(s3({
			"key": "AKIAIO6OZES6DLPA775Q",
			"secret": "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",
			"bucket": "rojasnovoa.com",
			"region": "us-west-2"
		}));
});

gulp.task('publishS3', function() { 
	gulp.src('./Publish/**')
		.pipe(s3({
			"key": "AKIAIO6OZES6DLPA775Q",
			"secret": "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",
			"bucket": "rojasnovoa.com",
			"region": "us-west-2"
		}));
});