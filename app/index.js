var path = require('path');
var generators = require('yeoman-generator');


module.exports = generators.Base.extend({
	constructor: function () {
	    generators.Base.apply(this, arguments);
	    
	    this.argument('appname', { type: String, required: false });
	    this.templatedata = {};
	    
	},
  
	choosetemplatetype: function () {
		var done = this.async();

        var prompts = [{
            type: 'list',
            name: 'type',
            message: 'What type of application do you want to create?',
            choices: [
                {
                    name: 'Form Scripting',
                    value: 'formscripting'
                },
                {
                    name: 'Web Resource',
                    value: 'webresource'
                }
            ]
        }];

        this.prompt(prompts, function (props) {
            this.templatetype = props.type;
            done();
        }.bind(this));
        
        
    
    },
    askpublisher: function () {
		var done = this.async();

        var prompts = [{
            type: 'input',
            name: 'publisherprefix',
            message: 'What is your publisher prefix?',
           default : 'new_'
           
        }];

        this.prompt(prompts, function (props) {
            this.templatedata.publisherprefix = props.publisherprefix;
            done();
        }.bind(this));
        
        console.log('You chose template ' + this.templatetype);
    
    },
 
  writingtemplate: function () {
        this.sourceRoot(path.join(__dirname, './templates/projects'));

        switch (this.templatetype) {

        case 'formscripting':
            this.sourceRoot(path.join(__dirname, '../templates/' + this.templatetype));
            this.fs.copyTpl(this.templatePath('/src/FormContact.ts'), this.destinationPath('/src/FormContact.ts'),  this.templatedata); 
            this.fs.copyTpl(this.templatePath('/src/FormShared.ts'), this.destinationPath('/src/FormShared.ts'),  this.templatedata); 
            this.fs.copy(this.templatePath('/package.json'), this.destinationPath('/package.json'));
            this.fs.copy(this.templatePath('/tsconfig.json'), this.destinationPath('/tsconfig.json'));
            this.fs.copy(this.templatePath('/gulpfile.js'), this.destinationPath( '/gulpfile.js'));
            this.log('Preparing to install dependencies');
            this.npmInstall();          
            break;

        case 'webresource':
            this.log('project type is not ready yet');
            break;
        default:
            this.log('Unknown project type');
        }
    },
    end: function () {
        this.log('\r\n');
        this.log('Your project is now created, you can use the following commands to get going');        
        this.log('\r\n');
    }


 
});