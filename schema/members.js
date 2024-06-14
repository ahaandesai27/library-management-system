const mongoose = require('mongoose'); 
const {setRenewal} = require('../middleware/setRenewal');  

const Members = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true,
    },
    books: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    join_date: {
        type: Date,
        default: Date.now()
    },
    renewal_date: {
        type: Date,
        default: () => {
            let date = new Date();
            date.setMonth(date.getMonth() + 1);
            return date;
        }
    },
    renewal: {
        type: Boolean,
        default: false
    }
});

Members.pre('save', setRenewal);
module.exports = mongoose.model('members', Members);