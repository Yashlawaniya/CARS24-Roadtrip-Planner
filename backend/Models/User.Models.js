const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdTrips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoadTrip'
    }],
    savedTrips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoadTrip'
    }]
}, { timestamps: true }); 

const User = mongoose.model('User', UserSchema);
module.exports = User;