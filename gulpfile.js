var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssMin = require('gulp-minify-css'),
    imgMin = require('gulp-imagemin'),
    map = require('gulp-sourcemaps'),
    watch = require('gulp-watch'),
    htmlMin = require('gulp-minify-html'),
    jsMin = require('gulp-minify'),
    rename = require('gulp-rename');

var path = {
    build: {
        html: 'build/',
        css: 'build/css',
        js: 'build/js',
        img: 'build/img',
        fonts: 'build/fonts',
        vendor: 'build/vendor'
    },
    src: {
        html: 'src/*.html',
        sass: 'src/scss/main.scss',
        js: 'src/js/**/*.*',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        vendor: 'src/vendor/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        sass: 'src/scss/**/*.scss',
        js: 'src/js/**/*.*',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        vendor: 'src/vendor/**/*.*'
    }
};

gulp.task('html:build', function(){
    return gulp.src(path.src.html)
        .pipe(htmlMin())
        .pipe(gulp.dest(path.build.html))
});

gulp.task('style:build', function(){
    return gulp.src(path.src.sass)
        .pipe(map.init())
        .pipe(sass())
        .pipe(cssMin())
        .pipe(rename('style.css'))
        .pipe(map.write())
        .pipe(gulp.dest(path.build.css))
});

gulp.task('js:build', function(){
    return gulp.src(path.src.js)
        .pipe(jsMin({
            ext:{
                src:'.min.js',
                min:'.js'
            }
        }))
        .pipe(gulp.dest(path.build.js))
});

gulp.task('fonts:build', function(){
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


gulp.task('img:build', function(){
    return gulp.src(path.src.img)
        .pipe(imgMin())
        .pipe(gulp.dest(path.build.img))
});

gulp.task('vendor:build', function(){
    return gulp.src(path.src.vendor)
        .pipe(gulp.dest(path.build.vendor))
});

gulp.task('build', ['html:build', 'style:build', 'img:build', 'fonts:build', 'js:build', 'vendor:build']);

gulp.task('watch', function(){
    gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.sass, ['style:build']);
    gulp.watch(path.watch.img, ['img:build']);
    gulp.watch(path.watch.fonts, ['fonts:build']);
    gulp.watch(path.watch.js, ['js:build']);
    gulp.watch(path.watch.vendor, ['vendor:build']);
});

gulp.task('default', ['build', 'watch']);
