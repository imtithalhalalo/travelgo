const mongoose = require('mongoose');
// userSchema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'first_name is required'
    },
    last_name: {
        type: String,
        required: 'last_name is required'
    },
    email: {
        type: String,
        required: 'email is required',
        unique: true,
        validate: {
            validator: (value) => {
              const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              return value.match(re);
            },
            message: "Please enter a valid email address",
        },
        trim: true,
    },
    password: {
        type: String,
        required: 'password is required',
        select: false
    },
    confirm_pass: {
        type: String,
        required: 'confirm_pass is required',
        select: false
    },
    type: {
        type: String,
        default: 'User',
        enum: ['Admin', 'User']
    },
    profilePicture: {
        type: String,
        default: "profile.jpg",
    },
    banned: {
        type: Boolean,
        default: false
    },
    
})

module.exports = mongoose.model('User', userSchema);