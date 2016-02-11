var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    streamqueue = require('streamqueue'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;

var paths = {
  scripts: ['src/js/**/*.js'],
  css: ['src/css/**/*.css'],
  scss: ['src/scss/**/*.scss']
};

// Sass task
gulp.task('sass', function () {
  gulp.src(paths.scss)
    .pipe(sass())
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('./build'))
    .pipe(reload({stream: true}));
});

// CSS task
gulp.task('minify-css', function () {
  return streamqueue({objectMode: true},
    gulp.src('src/css/normalize.css'),
    gulp.src('src/css/style.css')
  )
    .pipe(minifyCss())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('./build/css'));
});

// JS task
gulp.task('js', function () {
  return streamqueue({objectMode: true},
    gulp.src('src/js/vendor/modernizr.js'),
    gulp.src('src/js/index.js')
  )
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./build/js'))
})

// Watch files for changes
gulp.task('watch', ['browser-sync'], function () {
  // Watch HTML files
  gulp.watch('build/*.thml', reload);
  // Watch Sass files
  gulp.watch(paths.scss, ['scss']);
  // Watch CSS files
  gulp.watch(paths.css, ['minify-css']);
  // Watch JS files
  gulp.watch(paths.js, ['js']);
});

gulp.task('browser-sync', function() {
  browserSync.init(['./build/css/**.*', './build/js/**.*'], {
    server: {
      baseDir: "./build"
    }
  });
});

// Default task
gulp.task('default', ['watch', 'browser-sync', 'js', 'sass', 'minify-css'])
