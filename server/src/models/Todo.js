const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Todo = mongoose.model('user',todoSchema);

module.exports = Todo;