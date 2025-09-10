const axios = require('axios');

exports.getNearbyPlaces = async (req, res) => {
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ msg: 'Location is required' });
    }

    try {
        const apiKey = process.env.GEOAPIFY_API_KEY;

        const geoResponse = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${location}&apiKey=${apiKey}`);
        
        if (!geoResponse.data.features || geoResponse.data.features.length === 0) {
            return res.status(404).json({ msg: `Could not find location: ${location}` });
        }
        
        const lon = geoResponse.data.features[0].properties.lon;
        const lat = geoResponse.data.features[0].properties.lat;

        const placesResponse = await axios.get(`https://api.geoapify.com/v2/places?categories=tourism.attraction&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=6&apiKey=${apiKey}`);

        const places = placesResponse.data.features.map(place => ({
            id: place.properties.place_id,
            name: place.properties.name,
            address: place.properties.address_line2,
            category: place.properties.categories.find(c => c.startsWith('tourism')) || 'Attraction'
        }));

        res.json(places);

    } catch (error) {
        console.error('Geoapify API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ msg: 'Error fetching nearby places' });
    }
};