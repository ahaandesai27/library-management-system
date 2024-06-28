const express = require('express');
const Router = express.Router();
const {validateID }= require('./middleware/validateID');

Router.get('/addbook', (req, res) => {
    res.sendFile(__dirname + '/public/Books/addbook.html');
})

Router.get('/editbook/:id' , validateID, (req, res) => {  
    res.sendFile(__dirname + '/public/Books/editbook.html');
});

Router.get('/addmember', (req, res) => {
    res.sendFile(__dirname + '/public/Members/addmember.html');
});

Router.get('/editmember/:id' , validateID, (req, res) => {  
    res.sendFile(__dirname + '/public/Members/editmember.html');
});

Router.get('/transactions/add', (req, res) => {
    res.sendFile(__dirname + '/public/Transactions/addtransaction.html');
})

Router.get('/transactions/modify/:id', validateID, (req, res) => {
    res.sendFile(__dirname + '/public/Transactions/modifytransaction.html');
})

Router.get('/transactions/modify/', (req, res) => {
    res.sendFile(__dirname + '/public/Transactions/modifytransaction.html');
})

Router.get('/members/:id/transactions', validateID, (req, res) => {
    res.sendFile(__dirname + '/public/Members/membertransactions.html');
});

module.exports = Router;