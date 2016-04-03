var gulp 	   = require("gulp"),
	merge 	   = require("merge-stream"),
	minifyCss  = require("gulp-minify-css"),
	uncss	   = require("gulp-uncss"),
	gulpCopy   = require('gulp-copy'),
	uglify	   = require("gulp-uglify"),
	rename	   = require("gulp-rename"),
	concat	   = require("gulp-concat"),
	minifyHtml = require("gulp-minify-html");

gulp.task("minimizeHtml", function(){
		var index = gulp.src("./*.html")
			.pipe(minifyHtml({empty: true}))
			.pipe(gulp.dest("./production"));
		var error = gulp.src("./app/views/*.html")
			.pipe(minifyHtml({empty: true}))
			.pipe(gulp.dest("./production/app/views"));
		var pages = gulp.src("./app/views/projekte/*.html")
			.pipe(minifyHtml({empty: true}))
			.pipe(gulp.dest("./production/app/views/projekte"));
		return merge(index,error,pages);
	});

gulp.task("minifyCss", function(){
		var style = gulp.src("./app/styles/*.css")
			.pipe(uncss({
				html: ["./*.html","./app/views/*.html","./app/views/projekte/*.html"]
				}))
			.pipe(minifyCss({compatibility: 'ie8'}))
			.pipe(gulp.dest("./production/app/styles"));
		var materialize = gulp.src("./app/styles/materialize/css/materialize.css")
			.pipe(uncss({
				html: ["./*.html","./app/views/*.html","./app/views/projekte/*.html"]
				}))
			.pipe(minifyCss({compatibility: 'ie8'}))
			.pipe(rename("/materialize.min.css"))
			.pipe(gulp.dest("./production/app/styles/materialize/css"));
		return merge(style, materialize);
	});

gulp.task("minifyJs", function(){
		var materialize = gulp.src("./app/styles/materialize/js/materialize.js")
			.pipe(uglify())
			.pipe(rename("/materialize.min.js"))
			.pipe(gulp.dest("./production/app/styles/materialize/js"))
		var routes = gulp.src("./routes/*.js")
			.pipe(uglify())
			.pipe(gulp.dest("./production/routes"))
		var service = gulp.src("./app/js/services/*.js")
			.pipe(uglify({mangle: false}))
			.pipe(gulp.dest("./production/app/js/services/"))
		var scripts = gulp.src("./app/js/*.js")
			.pipe(uglify({mangle: false}))
			.pipe(gulp.dest("./production/app/js/"))
		merge(routes, service, scripts, materialize);
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
		var fonts = gulp.src("./app/styles/materialize/font/**/*")
			.pipe(gulpCopy("./production/"))
		merge(images,packages,server/*,modules*/);
	});

gulp.task("concat", function(){
		var js = gulp.src(["./production/app/js/services/*.js","./production/app/js/*.js","./production/app/styles/materialize/**/*.js"])
			.pipe(concat("main.js"))
			.pipe(gulp.dest("./production/concat"));
		merge(js);
	})

gulp.task("production", ["minimizeHtml", "minifyCss", "moveResources", "minifyJs", "concat"]);