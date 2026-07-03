const mongoose = require('mongoose');
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 24*60*60 // Token will be removed from the database after 1 day
    }
});

module.exports = mongoose.model('blacklistToken', blacklistTokenSchema);