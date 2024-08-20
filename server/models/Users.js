const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Username: { type: String, required: true },
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Phone: { type: String, required: true }
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
