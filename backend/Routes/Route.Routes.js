const express = require('express');
const router = express.Router();
const routeController = require('../Controllers/Route.Controllers.js');
const authMiddleware = require('../Middlewares/auth.Middlewares.js');

// POST request to get route data
router.post('/', authMiddleware, routeController.getRoute);

module.exports = router;