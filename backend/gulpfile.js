const addsrc           = require('gulp-add-src');
const cleanCSS         = require('gulp-clean-css');
const concat           = require('gulp-concat');
const expect           = require('gulp-expect-file');
const gulp             = require('gulp');
const less             = require('gulp-less');
const livereload       = require('gulp-livereload');
const minify           = require('gulp-minify');
const path             = require('path');
const plumber          = require('gulp-plumber');
const replace          = require('gulp-replace');
const runSequence      = require('run-sequence');
const stripCssComments = require('gulp-strip-css-comments');
const watch            = require('gulp-watch');

const gulp_src = gulp.src;
gulp.src       = function () {
    // @formatter:off
    return gulp_src.apply(gulp, arguments)
        .pipe(
            plumber(
                function (error) {
                    console.log('Error (' + error.plugin + '): ' + error.message);

                    this.emit('end');
                }
            )
        )
    ;
    // @formatter:on
};

gulp.task('build', function () {
    return runSequence
    (
        'less',
        'copyFonts',
        'copyCss',
        'generateJs',
        'copyJs',
        'liveReload'
    );
});

gulp.task('copyCss', function () {
    const sources = [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/components-font-awesome/css/fontawesome-all.min.css'
    ];

    // @formatter:off
    return gulp.src(sources)
        .pipe(expect({ checkRealFile: true, errorOnFailure: true }, sources))
        .pipe(addsrc.append('public/css/*'))
        .pipe(concat('app.min.css'))
        .pipe(stripCssComments({
            preserve: false
        }))
        .pipe(replace(/\.\.\/webfonts/g, '/fonts'))
        .pipe(gulp.dest('public'))
    ;
    // @formatter:on
});

gulp.task('copyFonts', function () {
    // @formatter:off
    return gulp.src([
        'bower_components/components-font-awesome/webfonts/**'
    ])
        .pipe(gulp.dest('public/fonts'))
    ;
    // @formatter:on
});

gulp.task('copyJs', function () {
    const sources = [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/moment/min/moment.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js'
    ];

    // @formatter:off
    return gulp.src(sources)
        .pipe(expect({ checkRealFile: true, errorOnFailure: true }, sources))
        .pipe(addsrc.append('tmp/app.min.js'))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('public'))
    ;
    // @formatter:on
});

gulp.task('dev', function () {
    livereload.listen();

    gulp.start('build');

    return watch([
        'public/less/**/',
        'public/js/*/*'
    ], function () {
        gulp.start('build');
    });
});

gulp.task('less', function () {
    // @formatter:off
    return gulp.src(
        [
            'public/less/*.less'
        ])
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/css'))
    ;
    // @formatter:on
});

gulp.task('liveReload', function () {
    return gulp.src('./gulpfile.js').pipe(livereload());
});

gulp.task('generateJs', function () {
    // @formatter:off
    return gulp.src([
            'public/js/*'
        ])
        .pipe(minify({
            exclude:     ['tasks'],
            ignoreFiles: ['.min.js', '-min.js'],
            noSource:    true
        }))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('tmp'))
    ;
    // @formatter:on
});