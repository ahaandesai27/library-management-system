const Books = require('../schema/schema.js');
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
    const {title, author, genre} = req.query;
    let p = await Books.find({});
    if (title) {
        p = p.filter(book => book.title == title);
    }
    if (author) {
        p = p.filter(book => book.author == author);
    }
    if (genre) {
        p = p.filter(book => book.genre == genre);
    }
    if (p.length < 1) {
        res.status(404).json({message: "No books found"});
    }
    res.status(200).json(p);
});

// const searchAuthor = wrap(async (req, res) => {
//     const author = req.query.author;
//     const books = await Books.find({author: author});
//     res.status(200).json(books);
// });



module.exports = {
    getBooks,
    createBook,
    getBookByID,
    updateBookByID,
    deleteBookByID,
    searchBook
}

//ID functions work with the _id field that MongoDB automatically generates for each document.
