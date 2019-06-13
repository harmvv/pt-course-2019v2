var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require("express-handlebars");
var app = express();
var expressValidator = require("express-validator")
var expressSession = require("express-session");
var mongoose = require("mongoose");
require('dotenv').config()

app.use(express.static(path.join(__dirname, '/public')));

var indexRouter = require('./routes/index');
var bucketlistRouter = require('./routes/bucketlist');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.engine("hbs", hbs({
  extname: "hbs",
  defaultLayout: "layout",
  layoutsDire: __dirname + "/views/layouts"
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(expressSession({
  secret: "harm",
  saveUninitialized: false,
  resave: false
}))

app.use('/', indexRouter);
app.use('/', bucketlistRouter);
app.use('/', registerRouter);
app.use('/', loginRouter);


// mongoose connection
mongoose.connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + process.env.DB_HOST + "Buckettest?retryWrites=true&w=majority", {
  useNewUrlParser: true
})
var db = mongoose.connection; // here i make a connection with mongodb my host, username and pw are in the .env file

db.once('open', function () {
  console.log("connected mongodb")
}); // check if we are connected to mongodb

db.on('error', console.error.bind(console, 'MongoDB connection error:')); // if we arent connected we get an error
//
//db check connection


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;