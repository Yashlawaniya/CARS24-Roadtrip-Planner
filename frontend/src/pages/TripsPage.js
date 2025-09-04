import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TripsPage = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTrips = async () => {
        try {
            const response = await axios.get('/api/roadtrips');
            setTrips(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching trips:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    // Delete function
    const handleDelete = async (id) => {
        // Confirmation dialog
        if (window.confirm("Are you sure you want to delete this trip?")) {
            try {
                await axios.delete(`/api/roadtrips/${id}`);
                setTrips(trips.filter(trip => trip._id !== id));
            } catch (error) {
                console.error("Error deleting trip:", error);
                alert("Failed to delete trip.");
            }
        }
    };

    if (loading) {
        return <div>Loading trips...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Explore Road Trips</h1>
            {trips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map(trip => (
                        <div key={trip._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                            <div className="p-6 flex-grow">
                                <h2 className="text-xl font-bold text-cars24-blue mb-2">{trip.title}</h2>
                                <p className="text-gray-600 truncate">{trip.description}</p>
                            </div>
                            <div className="p-4 bg-gray-50 flex justify-between">
                                <Link to={`/trips/${trip._id}`} className="text-cars24-blue font-semibold hover:underline">View Details →</Link>
                                <div>
                                    <button onClick={() => alert('Edit feature coming soon!')} className="text-sm font-medium text-green-600 hover:text-green-800 mr-3">Edit</button>
                                    <button onClick={() => handleDelete(trip._id)} className="text-sm font-medium text-red-600 hover:text-red-800">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <p>No trips found. Be the first to create one!</p>
                </div>
            )}
        </div>
    );
};

export default TripsPage;