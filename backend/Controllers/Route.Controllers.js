const axios = require('axios');
const polyline = require('@mapbox/polyline');

exports.getRoute = async (req, res) => {
    const { startLocationName, endLocationName } = req.body;

    if (!startLocationName || !endLocationName) {
        return res.status(400).json({ msg: 'Start and end location names are required' });
    }

    try {
        const apiKey = process.env.ORS_API_KEY;

        const getCoords = async (locationName) => {
            const geoResponse = await axios.get(`https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${locationName}`);
            if (!geoResponse.data.features || geoResponse.data.features.length === 0) {
                throw new Error(`Could not find coordinates for ${locationName}`);
            }
            return geoResponse.data.features[0].geometry.coordinates;
        };

        const startCoords = await getCoords(startLocationName);
        const endCoords = await getCoords(endLocationName);

        const response = await axios.post(
            'https://api.openrouteservice.org/v2/directions/driving-car',
            { coordinates: [startCoords, endCoords] },
            { headers: { 'Authorization': apiKey, 'Content-Type': 'application/json' } }
        );
        
        if (!response.data.routes || response.data.routes.length === 0) {
            return res.status(404).json({ msg: 'Route could not be calculated between these points.' });
        }

        const route = response.data.routes[0];
        
        const decodedPolyline = polyline.decode(route.geometry);

        const processedData = {
            distance: (route.summary.distance / 1000).toFixed(2),
            duration: (route.summary.duration / 3600).toFixed(2),
            polyline: decodedPolyline
        };

        res.json(processedData);

    } catch (error) {
        console.error('OpenRouteService Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ msg: 'Error fetching route data' });
    }
};