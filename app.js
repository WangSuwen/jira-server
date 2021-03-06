var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const settings = require('./config/config').settings;
const eventSourceCtr = require('./controller/eventSrouce');

var app = express();
var cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);  
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret           : settings.cookie_encrypt_secret,
  name             : settings.cookie_name + '_session',
  cookie           : {maxAge: 30 * 60 * 1000},
  resave           : false ,
  saveUninitialized: true
}));
/**
 * 跨域设置 -- START
 */
let getterOrigin;
const whitelist = ['http://localhost:9000', 'http://127.0.0.1:9000'];
var corsOptions = {
  origin: function (origin, callback) {
    let reg;
    let isCORS = false;
    for (let i = 0; i < whitelist.length; i++) {
      if (reg = new RegExp(whitelist[i]), reg.test(getterOrigin)) {
        isCORS = false;
        callback(null, true);
        break;
      } else {
        isCORS = true;
      }
    }
    isCORS && callback(new Error('Not allowed by CORS'))  
  },
  methods: ['OPTION', 'GET', 'PUT', 'POST'],
  credentials: true
};

app.use(function (req, res, next) {
  getterOrigin = req.headers.origin || req.headers.referer;
  next();
}, cors(corsOptions));

/**
 * 跨域设置 -- END
 */

app.use('/', indexRouter);
app.use('/users', usersRouter);

// EventSource 实现消息推送 --START
app.get('/eventSource', eventSourceCtr.sendMsg);
app.get('/test', (req, res) => {
  res.send('99999');
});
// EventSource 实现消息推送 --END

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
  console.error(err);
  res.json({ msg: err.message, stack: err.stack });
});

module.exports = app;
