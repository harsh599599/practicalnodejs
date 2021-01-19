const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    birth_date: { type: Number, required: true },
    user_mobile: Number

});

module.exports = mongoose.model('user', users)