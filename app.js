var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var path = require('path');
var sassMiddleware = require('node-sass-middleware');

var index = require('./controllers/index');

app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'public/css'),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css'
}));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.index);
app.listen(process.env.PORT || 3000);
