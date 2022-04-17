const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const schema = new mongoose.Schema({
    title: { type: String, require:true },
    message: { type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Message = mongoose.model('Message', schema);

module.exports = Message;