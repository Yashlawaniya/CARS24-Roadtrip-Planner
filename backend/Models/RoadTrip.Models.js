const mongoose = require('mongoose');

const RoadTripSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        default: 'default_cover_image_url.jpg'
    },
    route: [{
        locationName: String,
        description: String,
    }],
    tags: [String],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
}, { timestamps: true });

const RoadTrip = mongoose.model('RoadTrip', RoadTripSchema);
module.exports = RoadTrip;