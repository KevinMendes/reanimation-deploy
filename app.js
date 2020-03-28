var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const enforce = require('express-sslify');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(enforce.HTTPS({ trustProtoHeader: true}));


app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
})

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'service-worker.js'));
})


app.listen(8001);

module.exports = app;
