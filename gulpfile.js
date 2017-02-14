'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();
    
gulp.task('serve', ['sass', 'compile'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("js/*.js", ['compile']);
    gulp.watch("js/*.js").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('compile', () => {
    return gulp.src('js/scripts.js')
        .pipe(babel({presets: ['es2015']}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('js'));
});

gulp.task('sass', function() {
    return gulp.src('scss/main.scss') 
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);