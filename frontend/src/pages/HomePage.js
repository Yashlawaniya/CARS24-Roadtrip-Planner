import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        // Main container jo video aur content ko hold karega
        // Note: Navbar ki height (approx 80px) ko viewport height se minus kiya hai
        <div className="relative h-[calc(100vh-80px)] flex items-center justify-center text-white overflow-hidden">

            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="/background-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Video par halki si kaali overlay taaki text aache se dikhe */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

            {/* Hero Section ka Content (video ke upar) */}
            <div className="relative z-20 text-center p-8">
                <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
                    Welcome to the Road Trip Planner
                </h1>
                <p className="text-xl mb-8 drop-shadow-md">
                    Discover, plan, and share your next great adventure on the road.
                </p>
                <Link
                    to="/trips"
                    className="bg-cars24-accent-orange text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-500 transition-colors duration-300 shadow-lg"
                >
                    Explore Trips Now
                </Link>
            </div>
            
        </div>
    );
};

export default HomePage;