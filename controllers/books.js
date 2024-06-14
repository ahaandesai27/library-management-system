const Books = require('../schema/books.js');
const wrap = require('express-async-wrapper');

const getBooks = wrap(async (req, res) => {
    const books = await Books.find({});
    const length = books.length;
    res.status(200).json(
        {"books": books, "quantity": length});
});

const createBook = wrap(async (req, res) => {
    const book = await Books.create(req.body);
    res.status(201).json(book);
});

const getBookByID = wrap(async (req, res) => {
    const book = await Books.findOne({_id: req.params.id});
    res.status(200).json(book);
});

const updateBookByID = wrap(async (req, res) => {   
    const book  = await Books.findOneAndUpdate({_id: req.params.id}, req.body , {new: true, runValidators: true});
    res.status(200).json(book);
});

const deleteBookByID = wrap(async (req, res) => {
    const book = await Books.findByIdAndDelete({_id: req.params.id});
    res.status(200).json(book);
});

const searchBook = wrap(async (req, res) => {
    //Query string setup
    const {title, author, genre} = req.query;
    let query = {};
    if (title) query.title = title;
    if (author) query.author = author;
    if (genre) query.genre = genre;

    let books = await Books.find(query);
    if (books.length == 0) {
        res.status(404).json({"message": "No books found"});
    }
    res.status(200).json(books);
});




module.exports = {
    getBooks,
    createBook,
    getBookByID,
    updateBookByID,
    deleteBookByID,
    searchBook
}

//ID functions work with the _id field that MongoDB automatically generates for each document.