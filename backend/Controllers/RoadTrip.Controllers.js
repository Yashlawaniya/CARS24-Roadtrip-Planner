const RoadTrip = require('../Models/RoadTrip.Models.js');
const cloudinary = require('../config/cloudinary.js'); 

// Create a new road trip
exports.createRoadTrip = async (req, res) => {
    try {
        const { title, description, createdBy, route } = req.body;
        let imageUrls = [];

        if (req.files) {
            const uploadPromises = req.files.map(file => {
                const b64 = Buffer.from(file.buffer).toString("base64");
                let dataURI = "data:" + file.mimetype + ";base64," + b64;
                return cloudinary.uploader.upload(dataURI, { folder: "roadtrips" });
            });
            const results = await Promise.all(uploadPromises);
            imageUrls = results.map(result => result.secure_url);
        }

        const newTrip = new RoadTrip({
            title,
            description,
            createdBy,
            route: JSON.parse(route),
            coverImage: imageUrls[0] || '/default_cover_image.jpg', 
            images: imageUrls
        });

        const trip = await newTrip.save();
        res.status(201).json(trip);

    } catch (err) {
        console.error("Create trip error:", err);
        res.status(500).send('Server Error');
    }
};

exports.updateRoadTrip = async (req, res) => {
    try {
        const { title, description, route } = req.body;
        let parsedRoute = route;

        if (route && typeof route === 'string') {
            try {
                parsedRoute = JSON.parse(route);
            } catch (e) {
                return res.status(400).json({ msg: 'Invalid route data format.' });
            }
        }

        const updateData = {
            title,
            description,
            route: parsedRoute 
        };

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => {
                const b64 = Buffer.from(file.buffer).toString("base64");
                let dataURI = "data:" + file.mimetype + ";base64," + b64;
                return cloudinary.uploader.upload(dataURI, { folder: "roadtrips" });
            });
            const results = await Promise.all(uploadPromises);
            const imageUrls = results.map(result => result.secure_url);

            if (imageUrls.length > 0) {
               updateData.images = imageUrls; 
               updateData.coverImage = imageUrls[0]; 
            }
        }

        const trip = await RoadTrip.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );

        if (!trip) {
            return res.status(404).json({ msg: 'Trip not found' });
        }
        res.json(trip);

    } catch (err) {
        console.error("Update trip error:", err);
        res.status(500).send('Server Error');
    }
};


// READ all road trips
exports.getAllRoadTrips = async (req, res) => {
    try {
        const trips = await RoadTrip.find().populate('createdBy', 'username');
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE a road trip by ID
// exports.updateRoadTrip = async (req, res) => {
//     try {
//         const updatedTrip = await RoadTrip.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.status(200).json(updatedTrip);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// DELETE a road trip by ID
exports.deleteRoadTrip = async (req, res) => {
    try {
        await RoadTrip.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET a single road trip by its ID
exports.getTripById = async (req, res) => {
    try {
        const trip = await RoadTrip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Like/Unlike a trip
exports.likeTrip = async (req, res) => {
    try {
        const trip = await RoadTrip.findById(req.params.id);

        if (trip.likes.some(like => like.toString() === req.user.id)) {
            trip.likes = trip.likes.filter(
                like => like.toString() !== req.user.id
            );
        } else {
            trip.likes.push(req.user.id);
        }

        await trip.save();
        res.json(trip.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// GET all trips for the logged-in user
exports.getMyTrips = async (req, res) => {
    try {
        const trips = await RoadTrip.find({ createdBy: req.user.id }).populate('createdBy', 'username');
        res.json(trips);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};