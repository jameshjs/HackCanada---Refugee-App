import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LocationCard.css';

const LocationCard = ({ location }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/location/${location.id}`);
    };

    return (
        <div className="location" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className="location-name">
                <p>{location.name}</p>
            </div>

            <div className="location-image">
                <img src={location.poster} alt="Location Poster" />
            </div>

            <div className="location-address">
                <h3>{location.address}</h3>
            </div>
        </div>  
    );
};

export default LocationCard;
