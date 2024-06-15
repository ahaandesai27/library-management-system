const mongoose = require('mongoose');   
const {setFineAmount} = require('../middleware/setFineAmount');

const Transactions = new mongoose.Schema({
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books',
        required: true
    },
    member_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members',
        required: true
    },
    issue_date: {
        type: Date,
        default: Date.now
    },
    return_date: {
        type: Date,
        default: () => {
            let date = new Date();
            date.setDate(date.getDate() + 7);
            return date;
        }
    },
    fine_amount: {
        type: Number,
        default: setFineAmount
    }
});


module.exports = mongoose.model('transactions', Transactions);