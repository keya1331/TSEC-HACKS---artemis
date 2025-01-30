const mongoose = require('mongoose');

const rangerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileno: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit mobile number'],
    },
    password: {
        type: String,
        required: true
    },
    isBusy: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

const Ranger = mongoose.models.Ranger || mongoose.model('Ranger', rangerSchema);
module.exports = Ranger;