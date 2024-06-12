const express = require('express');
const Router = express.Router();    
const {getBooks, createBook, getBookByID, updateBookByID, deleteBookByID, 
    searchBook, searchAuthor
} = require('../controllers/books');

Router.route('/').get(getBooks).post(createBook);
Router.route('/search').get(searchBook);
Router.route('/:id').get(getBookByID).patch(updateBookByID).delete(deleteBookByID);


module.exports = Router;


//! IMP: SETUP QUERY STRINGS BEFORE ROUTE PARAMS
