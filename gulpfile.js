var gulp 	   = require("gulp"),
	merge 	   = require("merge-stream"),
	minifyCss  = require("gulp-minify-css"),
	uncss	   = require("gulp-uncss"),
	gulpCopy   = require('gulp-copy'),
	uglify	   = require("gulp-uglify"),
	rename	   = require("gulp-rename"),
	concat	   = require("gulp-concat"),
	minifyHtml = require("gulp-minify-html"),
	inject = require('gulp-inject'),
	watch = require('gulp-watch');

gulp.task('inject:libs', function () {
  var target = gulp.src('./app/views/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./app/lib/**/*.js', './app/lib/**/*.css'], {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./app/views/'));
});

gulp.task("minimizeHtml", function(){
		var views = gulp.src("./app/views/*.html")
			.pipe(minifyHtml({empty: true}))
			.pipe(gulp.dest("./production/app/views"));
		var directives = gulp.src("./app/js/directives/*.html")
			.pipe(minifyHtml({empty: true}))
			.pipe(gulp.dest("./production/app/js/directives/"));
		return merge(views,directives);
	});

gulp.task("minifyCss", function(){
		var style = gulp.src("./app/styles/*.css")
			.pipe(minifyCss({compatibility: 'ie8'}))
			.pipe(gulp.dest("./production/app/styles"));
		var libs = gulp.src("./app/lib/**/*.css")
			.pipe(minifyCss({compatibility: 'ie8'}))
			.pipe(gulp.dest("./production/app/lib"));
		return merge(style, libs);
	});

gulp.task("minifyJs", function(){
		var services = gulp.src("./app/js/services/*.js")
			.pipe(uglify({mangle: false}))
			.pipe(gulp.dest("./production/app/js/services/"))
		var directives = gulp.src("./app/js/directives/*.js")
			.pipe(uglify({mangle: false}))
			.pipe(gulp.dest("./production/app/js/directives/"))
		var controller = gulp.src("./app/js/controller/*.js")
			.pipe(uglify({mangle: false}))
			.pipe(gulp.dest("./production/app/js/controller/"))
		var scripts = gulp.src("./app/js/*.js")
			.pipe(uglify({mangle: false}))
			.pipe(gulp.dest("./production/app/js/"))
		var libs = gulp.src("./app/lib/**/*.js")
			.pipe(uglify({mangle: false}))
			.pipe(gulp.dest("./production/app/lib/"))
		merge(controller, services, scripts, libs, directives);
	});

gulp.task("moveResources", function(){
		var images = gulp.src("./app/resources/*")
			.pipe(gulpCopy("./production"));
		var packages = gulp.src("./package.json")
			.pipe(gulpCopy("./production"));
		var server = gulp.src("./server.js")
			.pipe(gulpCopy("./production/"));
		/*var modules = gulp.src("./node_modules/**\/*")
			.pipe(gulpCopy("./production/"))*/
		merge(images,packages,server/*,modules*/);
	});

gulp.task("concat", function(){
		var js = gulp.src(["./production/app/js/services/*.js","./production/app/js/*.js",
		"./production/app/lib/**/*.js", "./production/app/js/directives/*.js", "./production/app/js/controller/*.js"])
			.pipe(concat("main.js"))
			.pipe(gulp.dest("./production/concat"));
		merge(js);
	})

gulp.task("production", ["minimizeHtml", "minifyCss", "moveResources", "minifyJs", "concat"]);
gulp.task("build", ["inject:libs"])
