import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import WeatherWidget from '../components/WeatherWidget';
import MapComponent from '../components/MapComponent';
import SimpleImageViewer from 'react-simple-image-viewer';
import { BASE_URL } from '../api'; // 

const TripDetailPage = () => {
    const [trip, setTrip] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [routeData, setRouteData] = useState(null);
    const [places, setPlaces] = useState([]);

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const config = { headers: { 'x-auth-token': token } };

                const [tripRes, commentsRes] = await Promise.all([
                    axios.get(`${BASE_URL}/api/roadtrips/${id}`),
                    axios.get(`${BASE_URL}/api/comments/${id}`)
                ]);
                
                const tripData = tripRes.data;
                setTrip(tripData);
                setComments(commentsRes.data);

                if (token && tripData.route && tripData.route.length >= 2) {
                    const startDest = tripData.route[0].locationName;
                    const finalDest = tripData.route[1].locationName;

                    axios.post(`${BASE_URL}/api/route`, { startLocationName: startDest, endLocationName: finalDest }, config)
                        .then(res => setRouteData(res.data))
                        .catch(err => console.error("Error fetching route:", err));

                    axios.get(`${BASE_URL}/api/places?location=${finalDest}`, config)
                        .then(res => setPlaces(res.data))
                        .catch(err => console.error("Error fetching places:", err));
                }
            } catch (error) {
                console.error("Error fetching main details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            const res = await axios.post(`${BASE_URL}/api/comments/${id}`, { text: newComment }, config);
            const populatedComment = { ...res.data, user: { username: auth.user?.username || 'User' } };
            setComments([populatedComment, ...comments]);
            setNewComment('');
        } catch (err) {
            console.error("Error posting comment:", err);
        }
    };

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };


    if (loading) return <div>Loading details...</div>;
    if (!trip) return <div>Trip not found.</div>;

    const startDest = trip.route[0]?.locationName;
    const finalDest = trip.route[1]?.locationName;

    return (
        <div className="container mx-auto p-4">
            <button onClick={() => navigate(-1)} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-300 mb-6">
                ← Back
            </button>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <h1 className="text-4xl font-bold text-cars24-blue mb-4">{trip.title}</h1>
                        <p className="text-gray-600 mb-8">{trip.description}</p>
                        
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Route Details</h2>
                        {routeData ? (
                            <>
                                <div className="bg-gray-100 p-4 rounded-lg mb-4 flex justify-around text-center">
                                    <div><p className="font-bold">Distance</p><p>~ {routeData.distance} km</p></div>
                                    <div><p className="font-bold">Duration</p><p>~ {routeData.duration} hrs</p></div>
                                </div>
                                <MapComponent routeData={routeData} />
                            </>
                        ) : (<p className="text-gray-500">Login to view the route map.</p>)}
                    </div>

                    <div className="md:col-span-1">
                        {trip.coverImage && <img src={trip.coverImage} alt={trip.title} className="w-full h-auto object-cover rounded-lg shadow-md mb-8" />}
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Weather Forecast</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Start: {startDest}</h3>
                                <WeatherWidget location={startDest} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Final: {finalDest}</h3>
                                <WeatherWidget location={finalDest} />
                            </div>
                        </div>
                    </div>
                </div>
                 {trip.images && trip.images.length > 0 && ( 
                    <>
                        <hr className="my-8" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Gallery</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {trip.images.map((img, index) => (
                                <div key={index}>
                                    <img 
                                        src={img} 
                                        onClick={() => openImageViewer(index)} 
                                        alt={`Trip gallery ${index + 1}`} 
                                        className="w-full h-40 object-cover rounded-lg shadow-md cursor-pointer hover:opacity-80 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {/* Nearby Attractions Section */}
                {places.length > 0 && (
                    <>
                        <hr className="my-8" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nearby Attractions in {finalDest}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {places.map(place => (
                                <div key={place.id} className="border rounded-lg p-4 bg-gray-50">
                                    <p className="font-bold text-cars24-blue">{place.name}</p>
                                    <p className="text-sm text-gray-600">{place.category}</p>
                                    <p className="text-xs text-gray-500 mt-2">{place.address}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Comments Section */}
                <hr className="my-8" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Comments ({comments.length})</h2>
                {auth.isAuthenticated && (
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <textarea rows="3" placeholder="Add a public comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="shadow border rounded w-full py-2 px-3 text-gray-700"></textarea>
                        <button type="submit" className="mt-2 bg-cars24-blue text-white font-bold py-2 px-4 rounded">Comment</button>
                    </form>
                )}
                <div className="space-y-4">
                    {comments.map(comment => (
                        <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-bold text-gray-800">{comment.user?.username || "User"}</p>
                            <p className="text-gray-600">{comment.text}</p>
                        </div>
                    ))}
                </div>
            </div>
             {/* -- LIGHTBOX COMPONENT  -- */}
            {isViewerOpen && (
                <SimpleImageViewer
                    src={trip.images}
                    currentIndex={currentImage}
                    onClose={closeImageViewer}
                    backgroundStyle={{ backgroundColor: "rgba(0,0,0,0.9)" }}
                />
            )}
        </div>
    );
};

export default TripDetailPage;