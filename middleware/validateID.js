const mongoose = require('mongoose');

function validateID(req, res, next) {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID');
    }

    next();
}

module.exports = {
    validateID
}