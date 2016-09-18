'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const argv = require('yargs').argv;

/**
 * Istanbul coverage
 */
gulp.task('pre-test', () => {
  return gulp.src([
    '**/*.js',
    '!gulpfile.js',
    '!coverage/**',
    '!test/**',
    '!node_modules/**',
    '!public/**',
    '!views/**',
    '!misc/**',
    '!api-doc/**',
    '!doc/**'
  ]).pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

/**
 * Mocha tests and coverage report
 */
gulp.task('test', ['pre-test'], () => {
  const stream = gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({
      ui: 'bdd',
      timeout: 5000,
      slow: 50,
      reporter: 'spec',
      recursive: true,
      require: ['./test/common']
    }));

  if (!argv.noReport) stream.pipe(istanbul.writeReports());

  return stream.pipe(istanbul.enforceThresholds({ thresholds: { global: 100 } }))
    .once('error', err => {
      console.error(err); // eslint-disable-line no-console
      return process.exit(1);
    })
    .once('end', () => {
      return process.exit(0);
    });
});

/**
 * Default task
 */
gulp.task('default', ['test']);