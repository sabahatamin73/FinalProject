const { text } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name : {type: String, required : true},
        email :{type: String, required : true, unique: true}, 
        phone : text
    },
    { 
        timestamps: true, strict: false
    }
);

module.exports = mongoose.model('User', UserSchema);