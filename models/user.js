var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
    firstname:{
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    facebookId: String,
    admin: {
        type: Boolean,
        required: false,
        default: false
    }
});

User.plugin(passportLocalMongoose) //this plugin will create a filed of username and hashed storage of passport in the given Schema

module.exports = mongoose.model('User', User);