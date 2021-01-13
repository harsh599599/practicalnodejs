const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
    user_name: { type: String, required: true },
    full_name: String,
    user_email: { type: String, required: true },
    user_mobile: Number

});

module.exports = mongoose.model('user', users)