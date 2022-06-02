var gulp = require('gulp');
var replace = require('gulp-replace');

var baseUrl = '';

function mainPage () {
	return gulp.src('_site/**/*.html')
		   .pipe(replace('{baseUrl}', ''))
		   .pipe(replace(/<a href="(.*?)"/g, '<a href="$1.html"')) 
		   .pipe(replace(/<a href="(page\d)(.*?)"/g, '<a href="$1/index.html"')) 
		   .pipe(replace(/<a href="(topics.*\/)(.*?)"/g, '<a href="$1index.html"')) 
		   .pipe(replace(/<a href=".html"/g, '<a href="index.html"')) 
		   .pipe(gulp.dest('dist'));
}

function pages (num) {
	return gulp.src('_site/page{num}/index.html')
		   .pipe(replace('{baseUrl}', '../'))
		   .pipe(replace(/<a href="(.*?)"/g, '<a href="$1.html"')) 
		   .pipe(replace(/<a href="(.*?)(page\d)(.*?)"/g, '<a href="$2/index.html"')) 
		   .pipe(replace(/<a href="(topics.*\/)(.*?)"/g, '<a href="$1index.html"')) 
		   .pipe(replace(/<a href="..\/.html"/g, '<a href="../index.html"')) 
		   .pipe(gulp.dest('dist/page{num}/'));
}

gulp.task('build', mainPage);
gulp.task('build2', 2);
