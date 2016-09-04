'use strict';
var gulp        = require('gulp'),
    typescript  = require('typescript'),
    ts          = require('gulp-typescript'),
	  sourcemaps  = require('gulp-sourcemaps'),
    del         = require('del'),
    typedoc     = require('gulp-typedoc'),
    zip         = require('gulp-zip'),
    gitignore   = require('gulp-gitignore');

var project = ts.createProject('tsconfig.json', {typescript: typescript});
var DIST_DIR = 'js/';

//statics
gulp.task('static', function () {
	//gulp
    //.src(['assets/**/*.*'])
    //.pipe(gulp.dest(DIST_DIR + '/assets'));
});

//compile
gulp.task('compile', function () {
  var tsResult = project.src() 
		.pipe(sourcemaps.init())     
        .pipe(ts(project));

         tsResult.dts
			.pipe(gulp.dest(DIST_DIR));
            
    return tsResult.js
			.pipe(sourcemaps.write('maps'))
			.pipe(gulp.dest(DIST_DIR));
});

//watch
gulp.task('watch', function() {
  gulp.watch('src/**/*{.ts,.tsx}', ['compile']); 
});

//clean
gulp.task('clean', function () {
  return del([
    'js/**/*' 
  ]);
});

//dist zip
gulp.task('dist', function () {
  gulp.src(['js', 'js/**/*.**', 'license', 'readme.md'], {base: '.'})
        .pipe(zip('casparcg-connection-js.zip'))
        .pipe(gulp.dest('tmp'));
  return gulp.src('**/**/**.*', {base: '.'})
        .pipe(gitignore())
        .pipe(zip('casparcg-connection-src.zip'))
        .pipe(gulp.dest('tmp'));
});

//dfault
gulp.task('default', ['watch', 'compile']); 

gulp.task('build', ['compile', 'static'])
    

//createProject
gulp.task("typedoc", function() {
    
	return gulp.src(['src/**/*.ts', 'typings/'])
		.pipe(typedoc({
            target: "es5",
            mode: 'file',
            module: 'commonjs',
            out: 'docs',
            readme: 'none',
            gaID: 'UA-83648715-1',
            disableOutputCheck: true,
            ignoreCompilerErrors: true,
		}))
	;
});