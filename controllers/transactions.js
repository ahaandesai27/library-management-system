const Transactions = require('../schema/transactions.js');
const Books = require('../schema/books.js');
const Members = require('../schema/members.js');
const wrap = require('express-async-wrapper');


const addTransaction = wrap(async (req, res) => {
    //Setup as query string -> POST api/transactions/?book=[bookid]&member=[memberid]
    const {book_id, member_id} = req.query;
   
    const book = await Books.findById(book_id);
    if (!book) return res.status(404).json({"err": "Book not found"});
    else if (book.borrowed) return res.status(400).json({"err": "Book is already borrowed"});

    const member = await Members.findById(member_id);
    if (!member) return res.status(404).json({"err": "Member not found"});
    else if (member.books.length >= 3) return res.status(400).json({"err": "Member has already borrowed maximum books!"});

    const transaction = await Transactions.create({
        book_id: book_id,
        member_id: member_id
    });
    await Books.findByIdAndUpdate(book_id, {borrowed: true});
    await Members.findByIdAndUpdate(member_id, {$push: {books: book_id}});
    res.status(200).json(transaction);
});


const deleteTransaction = wrap(async(req, res) => {
    const transaction = await Transactions.findOneAndDelete({_id: req.params.id});
    if (!transaction) {
        return res.status(404).json({"msg": "Transaction not found"});
    }

    const {book_id, member_id} = transaction;
    try {
        await Books.findByIdAndUpdate(book_id, {borrowed: false});
    }  catch(error) {
        console.log("Error in updating book!");
    }
    try {
        await Members.findByIdAndUpdate(member_id, {$pull: {books: book_id}});
    } catch(error) {
        console.log("Error in updating member!");
    } 
    res.status(200).json(transaction);

});

const getTransactions = wrap(async(req, res) => {
    const transactions = await Transactions.find();
    const length = transactions.length;
    res.status(200).json({"transactions": transactions, "Number": length});
});

const getTransaction = wrap(async(req, res) => {
    const transaction = await Transactions.findById(req.params.id);
    if (!transaction) res.status(404).json({"msg": "Transaction not found"});
    res.status(200).json(transaction);
});

const getMemberTransaction = wrap(async(req, res) => {
    const memberId = req.params.id;   
    const memberTransactions = await Transactions.find({member_id: memberId});
    if (!memberTransactions) {return res.status(404).json({"msg": "Transaction not found"})};
    res.status(200).json(memberTransactions);
})

const updateTransaction = wrap(async(req, res) => {
    const transactionID = req.params.id;
    const transaction = await Transactions.findByIdAndUpdate(transactionID, req.body, {new: true, runValidators: true});
    if (!transaction) return res.status(404).json({"msg": "Transaction not found"});
    res.status(200).json(transaction);
})

module.exports = {
    addTransaction,
    deleteTransaction,
    getTransactions,
    getTransaction,
    getMemberTransaction,
    updateTransaction
};
