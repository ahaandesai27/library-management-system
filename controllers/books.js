const Books = require('../schema/books.js');
const wrap = require('express-async-wrapper');

const getBooks = wrap(async (req, res) => {
    const books = await Books.find({});
    const length = books.length;
    res.status(200).json(
        {"books": books, "quantity": length});
});

const getUnborrowedBooks = wrap(async (req, res) => {
    const books = await Books.find({borrowed: false});
    res.status(200).json({"books": books});
})

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
    if (title) query.title = new RegExp(title, 'i'); // Using regex for partial match
    if (author) query.author = new RegExp(author, 'i'); // Using regex for partial match
    if (genre) query.genre = genre;

    let books = await Books.find(query);
    if (books.length == 0) {
       return res.status(404).json({"message": "No books found"});
    }
    res.status(200).json(books);
});

const sortBooksBy = wrap(async (req, res) => {
    const {query} = req.query;
    let books;
    if (query == "title") {
        books = await Books.find({}).sort({title: 1});
    }
    else if (query == "author") {
        books = await Books.find({}).sort({author: 1});
    }
    else if (query == "genre") {
        books = await Books.find({}).sort({genre: 1});
    }
    else {
        res.status(404).json({"message": "Invalid query"});
    }
    res.status(200).json({"books": books});
})  




module.exports = {
    getBooks,
    createBook,
    getBookByID,
    updateBookByID,
    deleteBookByID,
    searchBook,
    sortBooksBy,
    getUnborrowedBooks
}

//ID functions work with the _id field that MongoDB automatically generates for each document.
