var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

gulp.task('sass', function () {
    gulp.src('scss/*.scss')
    	.pipe(plumber(plumberErrorHandler))
 		.pipe(sass())
 		.pipe(gulp.dest('css'))
 		.pipe(livereload());
});

gulp.task('js', function () {
	gulp.src('js/src/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('fail'))
		.pipe(concat('theme.js'))
		.pipe(gulp.dest('js'));
});
 
gulp.task('img', function() {
	gulp.src('img/src/*.{png,jpg,gif}')
 	.pipe(imagemin({
 		optimizationLevel: 7,
 		progressive: true
 	}))
 	.pipe(gulp.dest('img'))
});

gulp.task('watch', function() {
	livereload.listen();	
	gulp.watch('scss/*.scss', ['sass']);
	gulp.watch('js/src/*.js', ['js']);
	gulp.watch('img/src/*.{png,jpg,gif}', ['img']);
});

var plumberErrorHandler = { errorHandler: notify.onError({
	title: 'Gulp',
	message: 'Error: <%= error.message %>'
  })
};

gulp.task('default', ['sass', 'js', 'img', 'watch']);