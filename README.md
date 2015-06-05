# Flat-Theme

A flat theme based on bootstrap i use for my personal projects.  
Visit [kcornelis.github.io/flat-theme](http://kcornelis.github.io/flat-theme) for a demo (work in progress)
   
## Usage
   
#### jQuery
   
Reference /dist/bootstrap.min.css file, /dist/flat-theme.min.css and /dist/flat-theme.jquery.min.js on your website, also reference all required jQuery libraries.
   
#### Angular
   
Reference /dist/bootstrap.min.css file, /dist/flat-theme.min.css and /dist/flat-theme.angular.min.js on your website, also reference all required angular libraries.
   
```
// Add the ft module and all required modules
angular.module('ftApp', ['ft', 'LocalStorageModule']);
```
   
## Example
   
First install or update your local project's **npm** tools:
   
```bash
# First install all the NPM tools:
npm install
```
   
Then run the **grunt** tasks:
   
```bash
grunt
```
   
The default grunt task will open a webserver on port 3010. 
Visit [http://localhost:3010](http://localhost:3010) to open the demo website.
   
## Dependencies
   
### Required
   
#### jQuery
   
[jQuery](https://jquery.com/)
   
#### Angular
   
[jQuery](https://jquery.com/)
[Angular](https://angularjs.org/)
[Angular-local-storage](https://github.com/grevory/angular-local-storage)
   
### Optional
   
[Font awesome](http://fortawesome.github.io/Font-Awesome/)
[Simple line icons](http://thesabbir.github.io/simple-line-icons/)
   
[Chosen](http://harvesthq.github.io/chosen/)
[Bootstrap-Datepicker](https://github.com/eternicode/bootstrap-datepicker)
   
   
## MIT License
   
Copyright (c) 2015 Kevin Cornelis
