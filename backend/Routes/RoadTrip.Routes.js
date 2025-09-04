const express = require('express');
const router = express.Router();
const roadTripController = require('../Controllers/RoadTrip.Controllers.js');

router.post('/', roadTripController.createRoadTrip);
router.get('/', roadTripController.getAllRoadTrips);
router.put('/:id', roadTripController.updateRoadTrip);
router.delete('/:id', roadTripController.deleteRoadTrip);

module.exports = router;