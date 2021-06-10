const path = require('path');
const gulp = require('gulp');
const { series } = require('gulp');

const autoprefixer = require('autoprefixer');
const clean = require('gulp-clean');
const cleanCss = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require("gulp-rename");

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const wp = require('webpack-stream');

const entryPoints = {};
entryPoints['main'] = path.resolve(__dirname, 'src/scripts', 'main.ts');

const uglify = require('gulp-uglify');

const sync = require('browser-sync').create();

exports.styles = styles = () => {
  return gulp.src('src/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(cleanCss())
    .pipe(rename((p) => {
      p.dirname = '';
      p.basename += '.min';
      p.extname = '.css';
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
}

const imgmin = () => {
  return gulp.src('src/img/*.*')
    .pipe(imagemin())
    .pipe(rename((p) => {
      p.basename += ".min"
    }))
    .pipe(gulp.dest('src/img'))
    .pipe(sync.stream());
}

const movesvg = () => {
  return gulp.src('src/img/*.min.svg', { read: true })
    .pipe(clean())
    .pipe(gulp.dest('dist/img'));
}

const towebp = () => {
  return gulp.src('src/img/*.min.{jpg,png}', { read: true })
    .pipe(clean())
    .pipe(webp({
      quality: 50
    }))
    .pipe(gulp.dest('dist/img'))
}

exports.webpack = webpack = () => {
  return gulp.src('src/scripts/*.ts')
    .pipe(wp({
      mode: 'production',
      entry: entryPoints,
      output: {
        filename: '[name].js'
      },
      resolve: {
        extensions: ['.ts']
      },
      module: {
        rules: [
          { test: /\.ts$/, loader: 'ts-loader' }
        ]
      },
      optimization: {
        minimize: true,
        nodeEnv: 'production'
      },
      watch: false
    }))
    .pipe(gulp.dest('src/scripts'));
}

exports.jsmin = jsmin = () => {
  return gulp.src('src/**/*.js', { read: true })
    .pipe(clean())
    .pipe(uglify())
    .pipe(rename((p) => {
      p.dirname = '';
      p.basename += ".min";
    }))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
}

exports.html = html = () => {
  return gulp.src('src/**/*.html')
    .pipe(rename((p) => {
      p.dirname = '';
    }))
    .pipe(gulp.dest('dist'))
    .pipe(sync.stream());
}

const browsersync = (start) => {
  sync.init({
    server: {
      baseDir: 'dist'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  start();
}

const watcher = () => {
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/**/*.scss', gulp.series('styles'));
  gulp.watch('src/**/*.ts', gulp.series('webpack'));
  gulp.watch('src/**/*.js', gulp.series('jsmin'));
}

exports.images = series(imgmin, movesvg, towebp);
exports.default = series(styles, webpack, jsmin, html, browsersync, watcher);

