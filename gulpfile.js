"use strict"

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var server = require("browser-sync").create();

gulp.task("css", function buildCSS () {
  return gulp.src("source/less/**/*.less")
    .pipe(gulp.plumber())
    .pipe(gulp.sourcemap.init())
    .pipe(gulp.less())
    .pipe(gulp.sourcemap.write())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", function buildHtml() {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
})

gulp.task("server", function runServer() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    iu: false
  });

  gulp.task("refresh", function(done) {
    server.reload();
    done();
  })

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
})
