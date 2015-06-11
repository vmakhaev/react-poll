import gulp from 'gulp';
import postcss from 'gulp-postcss';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import watchify from 'watchify';
import browserify from 'browserify';
import browserSync from 'browser-sync';

// Input file.
var bundler = watchify(browserify({entries: ['./lib/app.js'], debug: true}, watchify.args));

// React JSX transform
//bundler.transform(reactify, {es6: true});

// Babel, babelify transform
bundler.transform(babelify);

// On updates recompile
bundler.on('update', bundle);

function bundle() {

  gutil.log('Compiling JS...');

  bundler.bundle()
    .on('error', function (err) {
        gutil.log(err.message);
        browserSync.notify('Browserify Error!');
        this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({stream: true, once: true}));
}

gulp.task('bundle', bundle);

function styles() {

  gutil.log('Compiling CSS...');

  var processors = [];
  gulp.src('./styles/**/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({stream: true, once: false}));
}

gulp.task('css', styles);

gulp.task('bootstrap', function(){
  gulp.src('./node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('./dist'));
});

gulp.task('html', function(){
  gulp.src('index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('styles/**/*.css', ['css', browserSync.reload]);

	// Watch .js files
	//gulp.watch(['js/**/*.js','main.js'], ['scripts', browserSync.reload]);

	// Watch image files
	//gulp.watch('img/**/*', ['images']);

	// Watch any files in dist/, reload on change
	gulp.watch("./*.html", ['html', browserSync.reload]);

});

gulp.task('default', ['bootstrap', 'html', 'bundle', 'css', 'watch'], function () {
  browserSync({
    server: './dist'
  });
  //gulp.watch(['./styles/**/*.css'], {cwd: 'dist'}, browserSync.reload);
});
