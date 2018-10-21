const gulp        = require('gulp');
const runSequence = require('run-sequence');
const imageResize = require('gulp-image-resize');
const rename      = require('gulp-rename');
const fs          = require('fs');
const appConfig   = require('./app.json');
const clean       = require('gulp-clean');
const imagemin    = require('gulp-imagemin');

const APP_IMAGES         = [
    './{android,ios,app}/**/*.{png,jpg,jpeg,gif,svg}',
    '!./android/app/build/**',
    '!./ios/build/**',
    '!./ios/DerivedData/**',
];
const APPICON            = 'app/assets/images/appIcon.png';
const IOS_SIZES          = [
    {
        name:  'ios-40',
        size:  { width: 40, height: 40 },
        scale: 1,
        idiom: 'ipad'
    },
    {
        name:  'ios-40',
        size:  { width: 40, height: 40 },
        scale: 2,
        idiom: 'ipad'
    },
    {
        name:  'ios-40',
        size:  { width: 40, height: 40 },
        scale: 2,
        idiom: 'iphone'
    },
    {
        name:  'ios-40',
        size:  { width: 40, height: 40 },
        scale: 3,
        idiom: 'iphone'
    },
    {
        name:  'ios-60',
        size:  { width: 60, height: 60 },
        scale: 2,
        idiom: 'iphone'
    },
    {
        name:  'ios-60',
        size:  { width: 60, height: 60 },
        scale: 3,
        idiom: 'iphone'
    },
    {
        name:  'ios-72',
        size:  { width: 72, height: 72 },
        scale: 1,
        idiom: 'ipad'
    },
    {
        name:  'ios-72',
        size:  { width: 72, height: 72 },
        scale: 2,
        idiom: 'ipad'
    },
    {
        name:  'ios-76',
        size:  { width: 76, height: 76 },
        scale: 1,
        idiom: 'ipad'
    },
    {
        name:  'ios-76',
        size:  { width: 76, height: 76 },
        scale: 2,
        idiom: 'ipad'
    },
    {
        name:  'ios-50',
        size:  { width: 50, height: 50 },
        scale: 1,
        idiom: 'ipad'
    },
    {
        name:  'ios-50',
        size:  { width: 50, height: 50 },
        scale: 2,
        idiom: 'ipad'
    },
    {
        name:  'ios-29',
        size:  { width: 29, height: 29 },
        scale: 1,
        idiom: 'iphone'
    },
    {
        name:  'ios-29',
        size:  { width: 29, height: 29 },
        scale: 2,
        idiom: 'iphone'
    },
    {
        name:  'ios-29',
        size:  { width: 29, height: 29 },
        scale: 3,
        idiom: 'iphone'
    },
    {
        name:  'ios-29',
        size:  { width: 29, height: 29 },
        scale: 1,
        idiom: 'ipad'
    },
    {
        name:  'ios-29',
        size:  { width: 29, height: 29 },
        scale: 2,
        idiom: 'ipad'
    },
    {
        name:  'ios-57',
        size:  { width: 57, height: 57 },
        scale: 1,
        idiom: 'iphone'
    },
    {
        name:  'ios-57',
        size:  { width: 57, height: 57 },
        scale: 2,
        idiom: 'iphone'
    },
    {
        name:  'ios-83.5',
        size:  { width: 83.5, height: 83.5 },
        scale: 2,
        idiom: 'ipad'
    },
    {
        name:  'NotificationIcon',
        size:  { width: 20, height: 20 },
        scale: 2,
        idiom: 'iphone'
    },
    {
        name:  'NotificationIcon',
        size:  { width: 20, height: 20 },
        scale: 3,
        idiom: 'iphone'
    },
    {
        name:  'NotificationIconIpad',
        size:  { width: 20, height: 20 },
        scale: 1,
        idiom: 'ipad'
    },
    {
        name:  'NotificationIconIpad',
        size:  { width: 20, height: 20 },
        scale: 2,
        idiom: 'ipad'
    },
    {
        name:  'ios-marketing',
        size:  { width: 1024, height: 1024 },
        scale: 1,
        idiom: 'ios-marketing'
    }
];
const IOS_APP_ICONS_PATH = `ios/${appConfig.name}/Images.xcassets/Appicon.appiconset`;
const IOS_CONTENTS_FILE  = {
    'info':   {
        'author':  'xcode',
        'version': 1
    },
    'images': []
};

const ANDROID_RES_PREFIX   = 'mipmap';
const ANDROID_RES_PATH     = 'android/app/src/main/res';
const ANDROID_APPICON_NAME = 'ic_launcher.png';
const ANDROID_SIZES        = [
    {
        name:   'hdpi',
        width:  36,
        height: 36
    },
    {
        name:   'mdpi',
        width:  48,
        height: 48
    },
    {
        name:   'hdpi',
        width:  72,
        height: 72
    },
    {
        name:   'xhdpi',
        width:  96,
        height: 96
    },
    {
        name:   'xxhdpi',
        width:  144,
        height: 144
    },
    {
        name:   'xxxhdpi',
        width:  196,
        height: 196
    }
];
let contents               = { ...IOS_CONTENTS_FILE };

gulp.task('build', function () {
    return runSequence
    (
        'cleanIosAssets',
        'createIosIcons',
        'createAndroidIcons',
    );
});

gulp.task('cleanIosAssets', function () {
    return gulp.src(IOS_APP_ICONS_PATH + '/*', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('createIosIcons', function (done) {

    IOS_SIZES.forEach(
        (iosSize) => {

            let iconName = iosSize.name || `ios-${iosSize.width}`;

            if (iosSize.scale > 1) {
                iconName += `@${iosSize.scale}x`
            }

            let width    = iosSize.size.width * iosSize.scale;
            let height   = iosSize.size.height * iosSize.scale;
            let filename = iconName + '.png';

            contents.images.push(
                {
                    filename: filename,
                    size:     `${iosSize.size.width}x${iosSize.size.height}`,
                    idiom:    iosSize.idiom,
                    scale:    `${iosSize.scale}x`
                }
            );

            gulp.src(APPICON)
                .pipe(imageResize({
                    width:   width,
                    height:  height,
                    crop:    true,
                    upscale: true
                }))
                .pipe(rename(filename))
                .pipe(gulp.dest(IOS_APP_ICONS_PATH));
        }
    );

    fs.writeFileSync(
        `${IOS_APP_ICONS_PATH}/Contents.json`,
        JSON.stringify(contents, null, 2)
    );

    done();
});

gulp.task('createAndroidIcons', function () {
    ANDROID_SIZES.forEach(
        (androidSize) => {
            let width  = androidSize.width;
            let height = androidSize.height;
            let path   = `${ANDROID_RES_PATH}/${ANDROID_RES_PREFIX}-${androidSize.name}`;

            gulp.src(APPICON)
                .pipe(imageResize({
                    width:   width,
                    height:  height,
                    crop:    true,
                    upscale: false
                }))
                .pipe(rename(ANDROID_APPICON_NAME))
                .pipe(gulp.dest(path));
        }
    );
});

gulp.task('optimizeImages', function () {
    // @formatter:off
    return gulp.src(APP_IMAGES, {
        base: './'
    })
        .pipe(imagemin())
        .pipe(gulp.dest('./'))
    ;
    // @formatter:on
});

gulp.task('exportImages', function () {
    // @formatter:off
    return gulp.src(APP_IMAGES, {
        base: './'
    })
        .pipe(gulp.dest('image_export'))
    ;
    // @formatter:on
});