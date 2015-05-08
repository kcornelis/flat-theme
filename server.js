var express = require('express'),
	app = express(),
	swig = require('swig')
	path = require('path');

app.engine('.html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use(express.static(path.resolve('./')));

app.get('/', function(req, res){ res.render('index'); });
app.get('/demo/:view', function(req, res){ res.render(req.params.view); });

app.listen(3010)

console.log('Application started on http://localhost:3010');
