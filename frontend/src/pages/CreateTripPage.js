import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CreateTripPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // Success state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) {
            alert('Please fill in all fields');
            return;
        }
        const newTrip = {
            title: title,
            description: description,
            createdBy: '68b974dacef83a9956199160', // Yahan aapki user ID hi rahegi
        };
        try {
            await axios.post('/api/roadtrips', newTrip);
            setIsSuccess(true); // Form submit hone par success state true karein
        } catch (error) {
            console.error('Error creating trip:', error);
            alert('Failed to create trip.');
        }
    };

    // Agar trip successfully create ho gaya hai, to success message dikhayein
    if (isSuccess) {
        return (
            <div className="text-center p-16 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Trip Created Successfully!</h2>
                <Link 
                    to="/trips" 
                    className="bg-cars24-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
                >
                    Go to Your Trips
                </Link>
            </div>
        );
    }

    // Normal case mein form dikhayein
    return (
        <div className="container mx-auto mt-10 p-8 max-w-lg shadow-lg rounded-lg bg-white relative">
            {/* Back Button */}
            <button onClick={() => navigate(-1)} className="absolute top-4 left-4 text-cars24-blue hover:underline">
                ← Back
            </button>

            <h1 className="text-2xl font-bold mb-6 text-center">Create a New Road Trip</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter trip title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                
                <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        id="description"
                        rows="3"
                        placeholder="Describe your trip"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                
                <div className="flex items-center justify-center">
                    <button type="submit" className="bg-cars24-accent-orange text-white font-bold py-2 px-4 rounded hover:bg-orange-500 focus:outline-none focus:shadow-outline">
                        Publish Trip
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTripPage;