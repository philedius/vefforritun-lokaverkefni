'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['./*.html', './*.js']).on('change', browserSync.reload);
    gulp.watch('./sass/**/*.scss', ['sass']);
});


gulp.task('inspect', function() {
  return gulp.src('./*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['inspect', 'sass', 'serve']);