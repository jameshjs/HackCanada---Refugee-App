import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import search_icon from '../search.svg';
import '../App.css';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            navigate(`/result?query=${searchTerm}`); // Navigate to results page with the query
        }
    };

    return (
        <div className='app'>
            <h1>Search for Locations</h1>

            <div className='search'>
                <input
                    placeholder='Search for locations'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={search_icon}
                    alt="search"
                    onClick={handleSearch}
                />
            </div>

            <button 
                onClick={() => navigate('/map')} 
                className="mt-6 px-5 py-5 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition-all"
            >
                Switch to Map
            </button>
        </div>
    );
}

export default SearchPage;