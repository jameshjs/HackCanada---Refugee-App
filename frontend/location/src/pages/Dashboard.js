import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationCard from '../components/LocationCard';
import '../App.css';

import search_icon from '../search.svg';

const API_URL = 'http://127.0.0.1:8000/locations';

const App = () => {
    const [locations, setLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const searchLocations = async(address) => {
        const response = await fetch(API_URL);
        const data = await response.json();
        // Correct the filter by using a string inside the includes method
        const filteredData = data.filter(location => location.address.includes(address));
        setLocations(filteredData); // Adjusted to set filtered data directly
    }

    useEffect(() => {
        searchLocations("Kitchener");
    }, []);

    return (
        <div className='app'>
            <h1>Immigration Helper</h1>

            <div className='search'>
                <input
                    placeholder='Search for locations'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={search_icon}
                    alt="search"
                    onClick={() => searchLocations(searchTerm)}
                />
            </div>
            
            <button 
                onClick={() => navigate('/map')} 
                className="mt-6 px-10 py-8 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition-all"
            >
                Switch to Map
            </button>

            {locations?.length > 0 ? (
                <div className="container">
                    {locations.map((location) => (
                        <LocationCard key={location.id} location={location} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No location found</h2>
                </div>
            )}
        </div>
    );
}

export default App;
