const express = require('express');
const Router = express.Router();    
const {getBooks, createBook, getBookByID, updateBookByID, deleteBookByID, 
    searchBook, sortBooksBy, getUnborrowedBooks
} = require('../controllers/books');

Router.route('/').get(getBooks).post(createBook);
Router.route('/search').get(searchBook);
Router.route('/sort').get(sortBooksBy);
Router.route('/inlibrary').get(getUnborrowedBooks)
Router.route('/:id').get(getBookByID).patch(updateBookByID).delete(deleteBookByID);


module.exports = Router;


//! IMP: SETUP QUERY STRINGS BEFORE ROUTE PARAMS
