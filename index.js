var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var app = express();

var index = require('./routes/index');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname + '.../public')));

app.get('/', index.view);

app.listen(3000);
