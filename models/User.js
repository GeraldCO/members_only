const mongoose = require("mongoose");



const schema = new mongoose.Schema({
    name : { type: String, required: true },
    lastname : { type: String, required: true },
    username : { type: String, required: true },
    password : { type: String, required: true },
    admin    : { type: Boolean, default: false }    
}, { timestamps: true });

const User = mongoose.model('User', schema);

module.exports = User;