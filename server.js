var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./config/database");
// because we're not exporting anything from database.js, we don't need to assign
// this invocation to a variable; just need it to run (i.e. connect to database)

var indexRouter = require('./routes/index');
var flightsRouter = require('./routes/flights');
var destsRouter = require("./routes/destinations");
var ticketsRouter = require("./routes/tickets");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/flights', flightsRouter);
// this just means that all FLIGHT-RELATED routes will start with /flights
app.use("/", destsRouter);
app.use("/", ticketsRouter);
// again, we need the FLEXIBILITY for ticketsRouter (because one of the RESTful routes)
// begins with "/flights" (which !== "/tickets")

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
