'use strict'

var gulp = require('gulp');
var plug = require('gulp-load-plugins')();

// WebServer
gulp.task('webserver', function() {
	return gulp.src('app/')
		.pipe(plug.webserver({
			livereload: true,
			directoryListing: true,
			open: 'http://localhost:8000/index.html'
		}));
});

gulp.task('default', ['webserver']);