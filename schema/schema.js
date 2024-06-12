const mongoose = require('mongoose');   

const Books = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    borrowed: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('books', Books);
