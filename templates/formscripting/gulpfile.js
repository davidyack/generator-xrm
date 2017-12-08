var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var concat = require('gulp-concat')
var webresource = require('gulp-webresource')

gulp.task("transpile", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("tscoutput"));
});

gulp.task('combinecontactformscripts',['transpile'], function() {
    return gulp.src([        
          './tscoutput/FormShared.js',
          './tscoutput/FormContact.js'
          ])
      .pipe(concat('FormContactCombined.js'))
      .pipe(gulp.dest('./FormScriptsCombined/'));
  });

  var config = {
    Server:process.env.crmserver,
    User: process.env.crmuser,
    Password: process.env.crmpassword,
    AccessToken:null,
    WebResources:[
     { Path:'FormScriptsCombined\\FormContactCombined.js',
       UniqueName:'contoso_FormContactCombined.js',
       Type:'JavaScript', 
       Solution:'ContosoSolution'}     
    ]
}

gulp.task('upload', ['combinecontactformscripts'], function(){
    console.log('upload task starting');
    gulp.src('./FormScriptsCombined/*.js')  
    .pipe(webresource.Upload(config,true));
});

gulp.task('watch', function() {
    gulp.watch('./src/*.ts', ['transpile','combinecontactformscripts']);
});

gulp.task('publish', ['transpile','combinecontactformscripts','upload']);

gulp.task('default', ['transpile','combinecontactformscripts']);