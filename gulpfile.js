'use strict';

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');

gulp.task('styles', function () {
  return gulp.src('./src/assets/styles/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/styles'));
});

gulp.task('images', function () {
  gulp.src('./src/imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/imgs'))
});

gulp.task('clean', function () {
  return del(['./dist/']);
});


gulp.task('watch', function () {
  gulp.watch('./src/assets/styles/**/*.scss', gulp.series('styles'));
  gulp.watch('./src/imgs/*', gulp.series('images'));
});

gulp.task('build', gulp.series('clean', 'styles', 'images'));
gulp.task('default', gulp.series('build'));
