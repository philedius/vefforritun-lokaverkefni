'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: 'localhost:3000',
        port: 5000,
    });

    // gulp.watch(['./*.html', './*.js']).on('change', browserSync.reload);
    gulp.watch('./sass/**/*.scss', ['sass']);
});

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
    
    var started = false;
    
    return nodemon({
        script: 'app.js',
        ext: 'js html css',
        env: { 'NODE_ENV': 'development' },
        watch: ['app.js', 'public/**/*']
    }).on('start', function () {
        if (!started) {
            cb();
            started = true; 
        } 
    });
}).on('restart', function onRestart() {
    reloadBrowser(BROWSER_SYNC_RELOAD_DELAY);
});

function reloadBrowser(delay) {
    if(delay) {
        setTimeout(function reload() {
            browserSync.reload();
        }, delay);
    } else {
        browserSync.reload();
    }
}

gulp.task('inspect', function() {
  return gulp.src('./*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['inspect', 'sass', 'browser-sync']);