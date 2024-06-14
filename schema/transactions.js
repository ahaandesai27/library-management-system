const mongoose = require('mongoose');   

const Transactions = new mongoose.Schema({
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books'
    },
    member_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'members'
    },
    issue_date: {
        type: Date,
        default: Date.now()
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
        default: () => {
            let date = new Date();
            let return_date = this.return_date;
            let diff = return_date - date;
            let days = diff/(1000*60*60*24);
            if (days > 7) {
                return (days - 7) * 5;
            }
            else {
                return 0;
            }
        }
    }
});


module.exports = mongoose.model('transactions', Transactions);