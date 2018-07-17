const gulp = require('gulp');
const shell = require('gulp-shell');
const watch = require('gulp-watch');

const src = [
  './routes',
  './test',
  './db.js',
  './server.js',
];

gulp.task('test:dev', () => {
  watch(src, () => gulp.run('test'));
});

gulp.task('test', shell.task('npm test'));
