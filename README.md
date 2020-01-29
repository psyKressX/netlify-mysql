# MySQL Netlify Lambda React

My first lambda serverless project. Create-User form in react that uses netlify lambda serverless functions to:

 - validate and post users to a MySQL DB
 - Fetch existing users and send them to the front end

# Requirements

Needs to be ran on and deployed through Netlify-CLI

> npm install netlify-cli -g

>netlify dev

>netlify deploy

needs its own **.env** enviroment variables set up, see **.env-sample** in root dir. Insert database information and remove **-sample** from the file name.

## Files and Folers

### /functions
Netlify lambda functions folder containing:

 - **create-profile**: POST's profiles to MySQL DB after validating with **accountValidation.js** component, then returns error messages to the front end
 - **profiles**: query selects all profiles from the DB and returns them to the front end

### netlify.toml

simple toml file that directs netlify where to look for functions and builds
