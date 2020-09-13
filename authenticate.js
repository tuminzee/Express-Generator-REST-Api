var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
const { serializeUser, deserializeUser } = require('passport');
var JwtStrategy = require('passport-jwt').Strategy; //jwt strategy by passort
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 
// serializeUser deserializeUser will config the app to store the session along with the user on the server



exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, 
        { expiresIn: 3600 });
};


var opts = {}; //optons for jqt strategy

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //similar to basic auth in the header file 
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, 
    (jwt_payload, done) => {
        console.log("Payload" + jwt_payload);
        User.findOne({ _id: jwt_payload._id}, (err, user) => {
            if(err) {
                return done(err, false); //callback passport passes 
            }
            else if(user) {
                return done(null, user); 
            } 
            else{
                return done(null, false);
            }
        })
    }));


exports.verifyUser = passport.authenticate('jwt', {session:false});


exports.verifyAdmin = (req, res, next ) => {
    if(req.user.admin){
        console.log('request from root')
        next();
    } else{
        var err = new Error('You are not     authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
}