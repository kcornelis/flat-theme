# Flat-Theme

A flat theme based on bootstrap i use for my personal projects.  
Visit [kcornelis.github.io/flat-theme](http://kcornelis.github.io/flat-theme) for a demo (work in progress)
   
## Usage
   
#### jQuery
   
```html
<!-- flat theme boostrap css (normalize included) -->
<link rel="stylesheet" href="dist/bootstrap.min.css" />

<!-- vendor css -->

<!-- flat theme -->
<link rel="stylesheet" href="dist/flat-theme.min.css" >

<!-- scripts -->
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
<script src="dist/flat-theme.jquery.min.js"></script>
```
   
   
#### Angular

```html
<!-- flat theme boostrap css (normalize included) -->
<link rel="stylesheet" href="dist/bootstrap.min.css" />

<!-- vendor css -->

<!-- flat theme -->
<link rel="stylesheet" href="dist/flat-theme.min.css" >

<!-- scripts -->
<script src="vendor/jquery/jquery.min.js"></script>
<script src="vendor/bootstrap/js/bootstrap.min.js"></script>

<script src="vendor/angular/angular.min.js"></script>
<script src="vendor/angular-local-storage/angular-local-storage.min.js"></script>
<script src="dist/flat-theme.angular.min.js"></script>
```
   
```javascript
// Add the ft module and all required modules
angular.module('ftApp', ['ft', 'LocalStorageModule']);
```
   
## Demo
   
First install or update the local project's **npm** dependencies:
   
```bash
# First install all the NPM tools:
npm install
```
   
Then run the **grunt** default task:
   
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
