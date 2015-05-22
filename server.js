var express = require('express'),
	app = express()
	path = require('path');

app.use(express.static(path.resolve('./')));

app.listen(3010)

console.log('Application started on http://localhost:3010');
