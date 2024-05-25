const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('user',userSchema);

module.exports = User;