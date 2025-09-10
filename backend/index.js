const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Route files import
const userRoutes = require('./Routes/User.Routes.js');
const roadTripRoutes = require('./Routes/RoadTrip.Routes.js');
const reviewRoutes = require('./Routes/Review.Routes.js');
const weatherRoutes = require('./Routes/Weather.Routes.js'); 
const authRoutes = require('./Routes/Auth.Routes.js');
const commentRoutes = require('./Routes/Comment.Routes.js');
const routeRoutes = require('./Routes/Route.Routes.js');
const placesRoutes = require('./Routes/Places.Routes.js');

// Logger middleware 
const logger = require('./Middlewares/logger.Middelwares.js'); 

// Express app initialize 
const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware to parse JSON
app.use(express.json());


app.use(logger); 

// Database Connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

// API Routes use 
app.use('/api/users', userRoutes);
app.use('/api/roadtrips', roadTripRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/comments', commentRoutes);
app.use('/api/route', routeRoutes);
app.use('/api/places', placesRoutes);

// Server listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});