'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require('gulp-rimraf'),
    browserify = require('gulp-browserify'),
    Config = require('./gulpfile.config');
    
var config = new Config();
    
 /**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src([config.allTypeScriptForms], { read: false });    
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
     var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src([config.allTypeScriptLib], { read: false });    
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});


/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(config.allTypeScriptForms).pipe(tslint()).pipe(tslint.report('prose'));
});
gulp.task('ts-lint-lib', function () {
    return gulp.src(config.allTypeScriptLib).pipe(tslint()).pipe(tslint.report('prose'));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    console.log('compile-ts starting');
        
    
    var sourceTsFiles = [config.allTypeScriptForms,                //path to typescript files
                         config.allTypeScriptLib,
                         config.libraryTypeScriptDefinitions, //reference to library .d.ts files
                         config.appTypeScriptReferences];     //reference to app.d.ts files

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc({
                           target: 'ES5',
                           declarationFiles: false,
                           noExternalResolve: true
                       }));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function () {
  var typeScriptGenFiles = [config.tsOutputPath,            // path to generated JS files
                            config.sourceForms +'**/*.js',    // path to all JS files auto gen'd by editor
                            config.sourceForms + '**/*.js.map', // path to all sourcemap files auto gen'd by editor                            
                            config.sourceLib +'**/*.js',    // path to all JS files auto gen'd by editor
                            config.sourceLib +'**/*.js.map' // path to all sourcemap files auto gen'd by editor
                           ];

  // delete the files
  return gulp.src(typeScriptGenFiles, {read: false})
      .pipe(rimraf());
});

gulp.task('browserify', function() {
  var production = 'production';
  console.log(config.allJavaScriptForms);
  gulp.src(config.allJavaScriptForms, {read: false})

    // Browserify, and add source maps if this isn't a production build
    .pipe(browserify({
      debug: !production,
    }))

    .on('prebundle', function(bundler) {
      // Make React available externally for dev tools
     
    })
    // Output to the build directory
    .pipe(gulp.dest('.dist/'));
});

gulp.task('watch', function () {
    var typeScriptWatchFiles = [config.allTypeScriptForms,
                            config.allTypeScriptLib
                           ];
    gulp.watch(typeScriptWatchFiles, ['ts-lint', 'compile-ts', 'gen-ts-refs','ts-lint-lib','browserify']);
});

gulp.task('default', ['ts-lint', 'compile-ts', 'gen-ts-refs','ts-lint-lib', 'browserify',  'watch']);
   