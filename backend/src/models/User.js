const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    joined: { type: Date, default: Date.now },
    description: { type: String, default: '' }
});

module.exports = mongoose.model('User', userSchema);
