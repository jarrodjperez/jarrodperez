var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');

var scriptPaths = ['./public/app.js', './public/controllers/*.js', './public/services/*.js'];
var stylePaths = ['./public/assets/stylus/**/*.styl'];
var distPath = ['./public/dist'];

gulp.task('scripts', function() {
  gulp.src(scriptPaths)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(distPath + '/scripts'))
}).watch(scriptPaths, ['scripts']);

gulp.task('stylus', function(){
    gulp.src('./public/assets/stylus/main.styl')
        .pipe(stylus())
        .pipe(gulp.dest(distPath + '/css'));
}).watch(stylePaths, ['stylus']);

gulp.task('default', ['scripts','stylus']);