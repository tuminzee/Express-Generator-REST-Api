var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
const user = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');


var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
})

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
  req.body.password, (err, user) => {
      if(err){
        res.status = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err})
      } 
      else{
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({
            success: true,
            status: 'Registration Successful'
          })
        })
      }
    })
});

router.post('/login', passport.authenticate('local'), (req,res) => {
  
  var token = authenticate.getToken({_id: req.user._id});

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: true,
    token: token,
    status: 'You are logged in!'
  })
});

router.get('/logout', (req,res,next) => {
  if(req.session){
    req.session.destroy(); //session is destroyed and removed from the server side
    res.clearCookie('session-id') //asks the client to delete the cookie from the client side
    res.redirect('/');
  }else{
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
