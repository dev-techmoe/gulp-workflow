'use strict'

// gulp

var gulp = require('gulp');

// global plugins

var plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    browser_sync = require('browser-sync').create(),
    gulp_if = require('gulp-if');

// define path

var src_path = './src',
    dest_path = './build',
    temp_path = './_temp';

var src_path_less = src_path + '/**/*.less',
    src_path_css = src_path + '/**/*.css',
    src_path_pug = [src_path + '/*.pug', src_path + '/**/*.pug'],
    src_path_html = [src_path + '/*.html', src_path + '/**/*.html'],
    src_path_static = [src_path + '/static/*'];

var dest_path_html = dest_path,
    dest_path_pug = dest_path,
    dest_path_style = dest_path + '/style',
    dest_path_less = temp_path + '/less_output',
    dest_path_script = dest_path + '/script/',
    dest_path_static = dest_path + '/static/';

var all_tasks = ['style', 'html', 'static'];

// production mode

var production_mode = false;

gulp.task('style-less', function() {
    let less = require('gulp-less');
    return gulp.src(src_path_less)
                .pipe(plumber())
                .pipe(less())
                .pipe(gulp.dest(dest_path_less))
                .pipe(browser_sync.stream())
                .pipe(gulp_if(!production_mode, browser_sync.stream()));
});

gulp.task('style', ['style-less'], function() {
    let concat = require('gulp-concat');
    let clean = require('gulp-clean-css');
    return gulp.src([src_path_css, dest_path_less + '/**/*.css'])
                .pipe(plumber())
                .pipe(concat('style.css'))
                .pipe(gulp_if(production_mode, clean()))
                .pipe(gulp.dest(dest_path_style))
                .pipe(gulp_if(!production_mode, browser_sync.stream()));
})


gulp.task('html-pug', function() {
    let pug = require('gulp-pug');
    return gulp.src(src_path_pug)
                .pipe(plumber())
                .pipe(pug({ doctype: 'html' , pretty: true}))
                .pipe(gulp.dest(dest_path_html))
                .pipe(gulp_if(!production_mode, browser_sync.stream()));
})

// TODO: HTML support (with feature: header&footer auto append )

gulp.task('html', ['html-pug'], function(){
    return gulp.src(src_path_html)
                .pipe(plumber())
                .pipe(gulp.dest(dest_path_html))
                .pipe(gulp_if(!production_mode, browser_sync.stream()));
})

gulp.task('static', function() {
    return gulp.src(src_path_static)
                .pipe(gulp.dest(dest_path_static));
})

gulp.task('clean', function() {
    let clean = require('gulp-clean');
    return gulp.src(['./build/*', './_temp'])
                .pipe(clean());
})


gulp.task('default', all_tasks, function(){
    if (!production_mode) {
        browser_sync.init({
            server: {
                baseDir: "./build"
            }
        });
    }
    

    gulp.watch(src_path_less, ['style']);
    gulp.watch(src_path_html, ['html']);
    gulp.watch(src_path_pug, ['html-pug']);
    gulp.watch(src_path_static, ['static']);
})


gulp.task('build', function() {
    // enable Production mode to enable some feature that is useful in prod environment
    production_mode = true;

    gulp.start(all_tasks);
})