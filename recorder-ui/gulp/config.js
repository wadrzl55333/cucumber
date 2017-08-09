'use strict';

var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');
var foreach = require('gulp-foreach');

module.exports = function(options) {
  gulp.task('config:dev', function() {
    gulp.src('./constants.json')
      .pipe(gulpNgConfig('trinity.config', {
        wrap: '\'use strict\';\n<%= module %>',
        environment: 'dev'
      }))
      .pipe(gulp.dest(options.src + '/app/scripts'));
  });

  gulp.task('config:pro', function() {
    gulp.src('./constants.json')
      .pipe(gulpNgConfig('trinity.config', {
        wrap: '\'use strict\';\n<%= module %>',
        environment: 'production'
      }))
      .pipe(gulp.dest(options.src + '/app/scripts'));
  });
};
