var basePaths = {
        src: 'static/',
        dest: 'static/dist/'
    },
    paths = {
        images: {
            src: basePaths.src + 'img/',
            dest: basePaths.dest + 'img/'
        },
        scripts: {
            src: basePaths.src + 'js/',
            dest: basePaths.dest + 'js/'
        },
        styles: {
            src: basePaths.src + 'css/less/',
            dest: basePaths.dest + 'css/'
        },
        templates: {
            src: basePaths.src + '',
            dest: basePaths.dest + ''
        }
    };

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        pattern: '*',
        camelize: true
    }),
    browserSync = $.browserSync.create();

/* CSS - LESS */
function processCss(inputStream, taskType) {
    return inputStream
        .pipe($.plumber())
        .pipe($.less({ paths: [$.path.join(__dirname, 'less', 'includes')] }))
        .pipe($.autoprefixer({
            browsers: ['last 3 versions', 'ie 9'],
            cascade: false
        }))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.minifyCss({advanced:false}))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
        .pipe($.notify({ message: taskType + ' task complete' }));
}

gulp.task('styles', ['less:main', 'less:responsive']);
gulp.task('less:main', function() {
    return processCss(gulp.src(paths.styles.src + 'styles.less'), 'Styles');
});
gulp.task('less:responsive', function() {
    return processCss(gulp.src(paths.styles.src + 'styles-responsive.less'), 'Responsive styles');
});

/* JS */
gulp.task('scripts', function() {
  return gulp.src(paths.scripts.src + '*.js')
    .pipe($.plumber())
    .pipe($.bytediff.start())
    .pipe($.newer(paths.scripts.dest))
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('default'))
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe($.bytediff.stop())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream())
    .pipe($.notify({ message: 'Scripts task complete' }));
});

/* Images */
gulp.task('images', function() {
  return gulp.src(paths.images.src + '**/*')
    .pipe($.plumber())
    .pipe($.bytediff.start())
    .pipe($.newer(paths.images.dest))
    .pipe($.cache($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe($.bytediff.stop())
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browserSync.stream())
    .pipe($.notify({ message: 'Images task complete' }));
});

/* BrowserSync */
gulp.task('browser-sync', ['styles', 'scripts', 'images'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
        //Use if you don't want BS to open a tab in your browser when it starts up
        //open: false
        // Will not attempt to determine your network status, assumes you're OFFLINE
        //online: false
    });

    gulp.watch(paths.styles.src + '*.less', ['styles']);
    gulp.watch(paths.scripts.src + '*.js', ['scripts']);
    gulp.watch(paths.images.src + '**/*', ['images']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

/* Clean up stray files */
gulp.task('clean', function(cb) {
    $.del([paths.styles.dest, paths.scripts.dest, paths.images.dest], cb)
});


/* Default task */
gulp.task('default', ['clean'], function() {
    gulp.start('browser-sync');
});
