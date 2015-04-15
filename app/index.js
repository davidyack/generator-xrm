var path = require('path');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	constructor: function () {
	    generators.Base.apply(this, arguments);
	    
	    this.argument('appname', { type: String, required: false });
	    
	    
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
        console.log('I see you want to create ' + this.options.appname);
        console.log('You chose template ' + this.templatetype);
    console.log('This is not done yet, in the future it will let you choose one of the templates to generate');
    },
  reviewtemplatetype: function () {
		
        console.log('I see you want to create ' + this.options.appname);
        console.log('You chose template ' + this.templatetype);
        console.log('This is not done yet, in the future it will let you choose one of the templates to generate');
    },
  writingtemplate: function () {
        this.sourceRoot(path.join(__dirname, './templates/projects'));

        switch (this.templatetype) {

        case 'formscripting':
            this.sourceRoot(path.join(__dirname, '../templates/' + this.templatetype));
            this.fs.copyTpl(this.templatePath('/forms/FormContact.ts'), this.destinationPath('/forms/FormContact.ts'),  this.templatedata); 
            this.fs.copyTpl(this.templatePath('/lib/SharedFormLogic.ts'), this.destinationPath('/lib/SharedFormLogic.ts'),  this.templatedata);
            this.fs.copy(this.templatePath('/project.json'), this.destinationPath( '/project.json'));            
            this.fs.copy(this.templatePath('/forms'), this.destinationPath('/forms'));
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