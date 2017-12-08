# generator-xrm

This is an experimental yeoman generator to setup XRM projects.  

Currently only the Form Scripting template is working

# To use:

## Install yeoman

npm install -g yo

## Install generator-xrm

npm install -g generator-xrm

## Use the templates:

yo xrm

## After Generating the template:
The template is setup to have a FormContact.ts (Example Script for Contact Form) and FormShared.ts (Example of code that could be shared across multiple forms).

Gulp is setup to combine these two files by simply typing gulp <enter>

Publishing to Dynamics 365 is also possible by simply setting the following environment variables

set crmserver=https://orgname.crm.dynamics.com
set crmuser=useremail
set crmpassword=userpwd

Administrator must consent to allowing the task to talk to CRM - navigate to the following link, this will prompt for administrator login and then will ask it to agree to allow gulp-webresource to talk to your CRM
 http://bit.ly/1Vpj6O2

then to run the publish type gulp publish <enter>

You can also use the gulp watch <enter> and it will automatically publish changes after you save the files