'use strict';

var gulp = require('gulp');
var install = require('gulp-install');

module.exports = function(options) {
  gulp.task('bower', function() {
    gulp.src('./bower.json')
      .pipe(install());
  });
};
