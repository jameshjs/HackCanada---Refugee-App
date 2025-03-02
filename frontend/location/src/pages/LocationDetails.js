import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './LocationDetails.css';

const API_URL = 'http://127.0.0.1:8000/locations';

const LocationDetails = () => {
    const { id } = useParams();
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                const data = await response.json();
                setLocation(data);
            } catch (error) {
                console.error("Error fetching location data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [id]);

    if (loading) return <div className="text-center text-xl font-semibold mt-10">Loading...</div>;
    if (!location) return <div className="text-center text-xl font-semibold mt-10 text-red-500">Location not found</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{location.name}</h1>
            {location.poster && <img src={location.poster} alt="Location Poster" className="location-poster" />}
            <p className="location-text"><strong>Address:</strong> {location.address}</p>
            <p className="location-text mt-2"><strong>Latitude:</strong> {location.latitude}</p>
            <p className="location-text mt-2"><strong>Longitude:</strong> {location.longitude}</p>
            {location.message && <p className="location-text mt-2"><strong>Message:</strong> {location.message}</p>}
            <button 
                onClick={() => window.history.back()} 
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
                Back
            </button>
        </div>
    );
};

export default LocationDetails;