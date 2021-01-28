const browser = require("browser-sync");
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const terser = require('gulp-terser');

function makeCss() {
  return gulp.src("./src/style.scss")
    .pipe(sass())
    .pipe(gulp.dest("./www/css/"));
}


function minCss() {
  return gulp.src("./www/css/style.css")
    .pipe(cleanCSS())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./www/css/"));
}


function makeJS() {
  return gulp.src(["./src/components/**/*.js", "./src/pages/**/*.js", "./src/managers/**/*.js", "./src/main.js"])
    .pipe(concat('script.js'))
    .pipe(gulp.dest("./www/js"));

}


function minJS() {
  return gulp.src('./www/js/script.js')
    .pipe(rename("script.min.js"))
    .pipe(terser())
    .pipe(gulp.dest("./www/js"))

}



function watch() {
  browser.init({
    server: {
      baseDir: "./www"
    }
  });
  gulp.watch("./src/**/*.scss", seqcss);
  gulp.watch("./src/**/*.js", seqjs);
  gulp.watch("./www/css/").on("change", browser.reload);
  gulp.watch("./www/js/").on("change", browser.reload);
}


const seqcss = gulp.series(makeCss, minCss);
const seqjs = gulp.series(makeJS, minJS);
exports.makeCss = makeCss;
exports.minCss = minCss;
exports.seqcss = seqcss;
exports.makeJS = makeJS;
exports.minJS = minJS; 
exports.seqjs = seqjs;
exports.watch = watch;