const gulp = require('gulp')
const formatHtml = require('gulp-format-html')
const diffableHtml = require('gulp-diffable-html')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const del = require('del')

const cssFiles = [
    'src/_site/css/main.css',
    'src/_site/css/youtube/youtube.css',
    'src/_site/css/pygments-css-themes/monokai.css'
]

const jsFiles = [
    'src/_site/js/main.js',
    'src/_site/js/main.js'
]

function diffable() {
  return gulp
    .src('src/_site/**/*.html')
    .pipe(diffableHtml())
    .pipe(gulp.dest('src/_dist'))
}

function formatting() {
  return gulp
    .src('src/_dist/**/*.html')
    .pipe(formatHtml())
    .pipe(gulp.dest('dist'))
}

function styles() {
  return gulp
    .src(cssFiles)
    .pipe(autoprefixer({cascade: false}))
    .pipe(concat('styles.css'))
    .pipe(cleanCSS({level:{2:{restructureRules: true}}}))
    .pipe(gulp.dest('dist/css'))
}

function scripts() {
  return gulp
    .src(jsFiles)
    .pipe(concat('all_scripts.js'))
    .pipe(uglify({toplevel: true}))
    .pipe(gulp.dest('dist/js'))
}

function clean() {
  return del(['build/*'])
}

// Use: gulp watch | End: ('Ctrl + C') * 2 
function watch() {
  gulp.watch('src/_site/**/*.css', styles)
  gulp.watch('src/_site/**/*.js', scripts)
}

gulp.task('pre-formatting', diffable)
gulp.task('finalHTMLformatting', formatting)
gulp.task('styles', styles)
gulp.task('scripts', scripts)
gulp.task('watch', watch)

gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)))
gulp.task('dev', gulp.series('build', 'watch'))