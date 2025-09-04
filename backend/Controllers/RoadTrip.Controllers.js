const RoadTrip = require('../Models/RoadTrip.Models');

// CREATE a new road trip
exports.createRoadTrip = async (req, res) => {
    try {
        const newTrip = await RoadTrip.create(req.body);
        res.status(201).json(newTrip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ all road trips
exports.getAllRoadTrips = async (req, res) => {
    try {
        const trips = await RoadTrip.find().populate('createdBy', 'username'); // createdBy field me user ka username dikhayega
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE a road trip by ID
exports.updateRoadTrip = async (req, res) => {
    try {
        const updatedTrip = await RoadTrip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTrip);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a road trip by ID
exports.deleteRoadTrip = async (req, res) => {
    try {
        await RoadTrip.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};