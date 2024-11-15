const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/roles');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'filled must be a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    role: {
        type: String, // ['USER', 'ADMIN', 'MANAGER']
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
        default: userRoles.USER
    }
});

module.exports = mongoose.model('User', userSchema);
