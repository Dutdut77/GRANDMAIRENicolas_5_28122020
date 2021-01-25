const browser = require("browser-sync");
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const fileinclude = require("gulp-file-include");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es");


function makeCss() {
  return gulp.src("./src/scss/style.scss")
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
    .pipe(uglify(/* options */))
    .pipe(gulp.dest("./www/js"))

}



function include() {
  return gulp.src("./src/*.html")
    .pipe(fileinclude({
      prefix: "@@",
      basepath: "@file"
    }))
    .pipe(gulp.dest("./www/"));
}


function watch() {
  browser.init({
    server: {
      baseDir: "./www"
    }
  });
  gulp.watch("./src/scss/**/*.scss", seqdev);
  gulp.watch("./src/*.html", include);
  gulp.watch("./src/partial/*.html", include);
  gulp.watch("./www/").on("change", browser.reload);
}


const seqdev = gulp.series(makeCss, minCss);
exports.makeCss = makeCss;
exports.minCss = minCss;
exports.seqdev = seqdev;
exports.include = include;
exports.watch = watch;
exports.makeJS = makeJS;
exports.minJS = minJS; 