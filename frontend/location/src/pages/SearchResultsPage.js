import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LocationCard from '../components/LocationCard';

const API_URL = 'http://127.0.0.1:8000/locations';

const SearchResultsPage = () => {
    const [locations, setLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    const searchLocations = async (address) => {
        const response = await fetch(API_URL);
        const data = await response.json();
        const filteredData = data.filter(location => location.address.includes(address));
        setLocations(filteredData);
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');
        setSearchTerm(query);
        if (query) {
            searchLocations(query); // Trigger search with the query from URL
        }
    }, [location]);

    return (
        <div className='app'>
            <h1>Search Results</h1>
            <h2>Results for: "{searchTerm}"</h2>

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

export default SearchResultsPage;