var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

import config from 'config-lite';
import router from './routes/index.js';
import session from 'express-session';
import history from 'connect-history-api-fallback';


// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// 解决跨域问题
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.Origin || req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POTS, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentails', true); // 可以携带cookies
  // res.header('X-Powered-By', '3.2.1');

  // 该方法用于查看客户端发送给服务端的请求，服务端返回告知支持那些请求方法
  if(req.method == 'OPOTIONS') {
    res.sendStatus(200);
  } else {  // 上面处理完，继续去执行下面的路由
    next();
  }
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

router(app);

// app.use(cookieParser());


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
