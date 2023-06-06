'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    'first_name': {type: String},
    'last_name': {type: String},
    'email': {type: String, unique: true, index: true},
    'username': {type: String, unique: true, index: true},
    'password': {type: String},
    'token': {type: String, default: ''},
    'token_expires': {type: Date},
    'reset_password_token': {type: String},
    'reset_password_expires': {type: Date},
    'created_at': { type: Date, default: Date.now },
    'updated_at': { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) {return next();}

    user.password = generateHash(user.password);
    next();
});

let generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ApiUser', userSchema);