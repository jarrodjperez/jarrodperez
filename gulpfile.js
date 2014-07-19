var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus', function(){
    gulp.src('./public/assets/stylus/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./public/assets/css'));
});

var watcher = gulp.watch('./public/assets/stylus/**/*.styl', ['stylus']);

gulp.task('default', ['stylus']);