var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    streamqueue = require('streamqueue'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var paths = {
  scripts: ['src/js/**/*.js'],
  css: ['src/css/**/*.css'],
  scss: ['src/scss/**/*.scss']
};

gulp.task('sass', function () {
  gulp.src(paths.scss)
    .pipe(sass())
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('src/css'));
});

gulp.task('scripts', function () {
  //Minify and copy all Javascript
  return streamqueue({objectMode: true},
    gulp.src('src/js/vendor/modernizr-custom.js'),
    gulp.src('src/js/hero-banner.js'),
    gulp.src('src/js/index.js')
  )
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', function () {
  return streamqueue({objectMode: true},
    gulp.src('src/css/normalize.css'),
    gulp.src('src/css/style.css')
  )
    .pipe(minifyCss())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('build/*.html', reload);
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('browser-sync', function () {
  browserSync.init(['./build/css/**.*', './build/js/**.*'], {
    server: {
      baseDir: "./build"
    }
  });
});

gulp.task('default', ['sass', 'css', 'scripts', 'watch', 'browser-sync']);
