'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var usersSchema = new Schema({
    fname: {
        type: String,
        Required: 'Please provide first name for the user.'
    },
    lname: {
            type: String,
            Required: 'Please provide first name for the user.'
    },
    username: {
        type: String,
        message: 'Please provide username for the user.'
    },
    password: {
        type: String,
        message: 'Please provide password for the user.'
    },
    active: {
        type: Boolean,
        message: 'Please provide status for the user.'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['active', 'disabled', 'hold']
        }],
        default: ['pending']
    }
    },
    {
        collection: 'Users'
    });

module.exports = mongoose.model('Users', usersSchema);