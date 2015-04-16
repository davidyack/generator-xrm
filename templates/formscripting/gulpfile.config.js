'use strict';
var GulpConfig = (function () {
    function GulpConfig() {
              
        this.source = './';
        this.sourceForms = this.source + 'forms';
        this.sourceLib = this.source + 'lib';
        this.tsOutputPath = './.js';
                
        this.allJavaScriptForms = './.js/Form*.js';
        this.allTypeScriptForms = this.sourceForms + '/**/*.ts';
                       
        this.allTypeScriptLib = this.sourceLib + '/**/*.ts';
        
        this.allTypeScriptWatch =  '**/*.ts';

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';
        this.appTypeScriptReferences = this.typings + 'typescriptApp.d.ts';
    }
    return GulpConfig;
})();
module.exports = GulpConfig;

