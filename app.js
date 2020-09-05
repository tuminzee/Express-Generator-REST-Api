var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
mongoose.set('useCreateIndex', true)
const connect = mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false 
  });

connect.then((db) => {
  console.log('Connected to the server');
}, (err) => {
  console.log(err);
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321')); //signed cookie

//Basic Authenication middleware implementation
function auth(req, res, next){
  console.log(req.signedCookies)
  if(!req.signedCookies.user){
    var authHeader = req.headers.authorization;

      if( !authHeader ){
        var err = new Error('You are not authenticated');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
      }

      var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      //Decodes the authHeader
    
      var username = auth[0];
      var password = auth[1];
    
      if ( username === 'admin' && password === 'password'){
        res.cookie('user', 'admin', { signed: true })
        next();
      } 
      else {
          var err = new Error('You are not authenticated');

          res.setHeader('WWW-Authenticate', 'Basic');
          err.status = 401;
          return next(err);
        }
    }
    else{
      if(req.signedCookies.user === 'admin'){
        next();
      }
      else{
        var err = new Error('You are not authenticated');

        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return nedxt(err);

      }
    }
  }


app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

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
  res.status(err.status || 500); //this also handles the error thrown by the dishRouter.js file where the status is set to 404
  res.render('error');
});

module.exports = app;
