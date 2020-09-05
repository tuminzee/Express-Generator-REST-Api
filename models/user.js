var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({

    admin: {
        type: Boolean,
        required: false,
        default: false
    }
});

User.plugin(passportLocalMongoose) //this plugin will create a filed of username and hashed storage of passport in the given Schema

module.exports = mongoose.model('User', User);