var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
const { serializeUser, deserializeUser } = require('passport');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 
// serializeUser deserializeUser will config the app to store the session along with the user on the server



