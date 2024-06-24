const express = require('express');
const Router = express.Router();    
const {addTransaction, deleteTransaction, getTransactions, 
    getTransaction, updateTransaction} = require('../controllers/transactions.js');

Router.route('/').get(getTransactions);
Router.route('/add?').post(addTransaction);
Router.route('/:id').delete(deleteTransaction).get(getTransaction).patch(updateTransaction);

module.exports = Router;