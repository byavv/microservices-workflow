'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        default: "user"
    }
});

module.exports = mongoose.model('User', UserSchema);