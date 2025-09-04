import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TripsPage from './pages/TripsPage';
import CreateTripPage from './pages/CreateTripPage';

function App() {
    return (
        <Router>
            {/* Poori app mein light gray background add kiya */}
            <div className="bg-cars24-secondary min-h-screen">
                {/* Navbar ko style kiya */}
                <nav className="bg-white shadow-md p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link to="/" className="text-2xl font-bold text-cars24-blue">RoadTrip Planner</Link>
                        <div>
                            <Link to="/" className="text-gray-700 hover:text-cars24-blue mr-4">Home</Link>
                            <Link to="/trips" className="text-gray-700 hover:text-cars24-blue mr-4">Explore Trips</Link>
                            <Link to="/create-trip" className="bg-cars24-accent-orange text-white font-bold py-2 px-4 rounded hover:bg-orange-500">
    Create Trip
</Link>
                        </div>
                    </div>
                </nav>

                <main className="container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/trips" element={<TripsPage />} />
                        <Route path="/create-trip" element={<CreateTripPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;