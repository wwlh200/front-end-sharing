// import gulp
var gulp = require('gulp');
// import babel for transfer es6 to es5
var babel = require('gulp-babel');
// defaust task
gulp.task('default', done => {
    gulp.src('src/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'))
    done();
});