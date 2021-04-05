var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var cors = require('cors');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var productManageRouter = require ('./routes/products');
var ordersRouter = require ('./routes/orders');
var menuadminRouter = require ('./routes/menuadmin');
var roledistRouter = require ('./routes/roles');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/products', productManageRouter);
app.use('/orders', ordersRouter);
app.use('/menuadmin', menuadminRouter);
app.use('/roledist', roledistRouter);

app.use((req, res, next) => {
  //console.log(Date.now() + '-' + req.method + '-' + req.url);
  var string_log = Date.now() + '-' + req.method + '-' + req.url + '\n';
  fs.appendFileSync('./data_log/request.log', string_log);
  next();
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  var string_log = Date.now() + '-' + req.url + '-500-Server Internal Error-' + err.message + '\n';
  fs.appendFileSync('./data_log/error.log', string_log);

  // render the error page
  res.status(err.status || 500);
  res.send("Server Error")
  //res.render('error');
});

module.exports = app;
