const mongoose = require('mongoose');
const uniqueValidator  = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);