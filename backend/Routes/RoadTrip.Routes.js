const express = require('express');
const router = express.Router();
const roadTripController = require('../Controllers/RoadTrip.Controllers.js');
const authMiddleware = require('../Middlewares/auth.Middlewares.js');
const upload = require('../config/multer.js'); // Multer config ko import karein


// GET all trips
router.get('/', roadTripController.getAllRoadTrips);

// GET all trips for a user (Protected Route)
router.get('/mytrips', authMiddleware, roadTripController.getMyTrips);

// GET a single trip by ID
router.get('/:id', roadTripController.getTripById);

// CREATE a new trip (Protected, with multiple image upload)
router.post('/', authMiddleware, upload.array('images', 5), roadTripController.createRoadTrip);

// UPDATE a trip (Protected, with multiple image upload)
router.put('/:id', authMiddleware, upload.array('images', 5), roadTripController.updateRoadTrip);

// Like/Unlike a trip (Protected Route)
router.put('/:id/like', authMiddleware, roadTripController.likeTrip);

// DELETE a trip (Protected)
router.delete('/:id', authMiddleware, roadTripController.deleteRoadTrip);


module.exports = router;