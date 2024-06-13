const mongoose = require('mongoose');   

const Members = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true,
        
        validate: {
            validator: async (v) => {
                const x = await mongoose.models.Members.findOne({contact: v});
                return !x;
            },
            message: props => `Contact number ${props.value} already exists`
        }
    },
    books: {
        type: [String],
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
            date.setDate(date.getMonth() + 1);
            return date;
        }
    },
    renewal: {
        type: Boolean,
        default: true
    }
});

Members.statics.isThisContact = async function(Contact) {
    if (!Contact) {
        throw new Error("invalid contact");
    }
    try {
        const member = await this.findOne({contact: Contact});
        if (member) return false;
        return true;
    }
    catch(error) {
        console.log(`Error inside: ${error}`);
        return false;
    }
}

Members.pre('save', (next) => {
    const currentDate = new Date();
    if (this.renewal_date && currentDate > this.renewal_date) {
        this.status = false;
    }
    next();
})

module.exports = mongoose.model('members', Members);