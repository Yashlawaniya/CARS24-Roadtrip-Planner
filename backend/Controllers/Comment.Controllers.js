const Comment = require('../Models/Comment.Models.js');
const RoadTrip = require('../Models/RoadTrip.Models.js');

// Get all comments for a trip
exports.getCommentsForTrip = async (req, res) => {
    try {
        const comments = await Comment.find({ roadTrip: req.params.tripId })
            .populate('user', 'username') 
            .sort({ createdAt: -1 }); 
        res.json(comments);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        const roadTrip = await RoadTrip.findById(req.params.tripId);
        if (!roadTrip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }

        const newComment = new Comment({
            text: req.body.text,
            user: req.user.id,
            roadTrip: req.params.tripId,
        });

        const comment = await newComment.save();

        roadTrip.comments.unshift(comment.id);
        await roadTrip.save();

        res.json(comment);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error');
    }
};