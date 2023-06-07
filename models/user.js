const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../models/user')
const session = require('express-session');


const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id) {
    User.findById(id);
}

module.exports.getUserByUsername = function (username) {
    const query = { username: username }
    return User.findOne(query).exec();
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save();
        });
    });
}

module.exports.comparePassword = function (candiatePassword, hash, callback) {
    bcrypt.compare(candiatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch)
    });
}