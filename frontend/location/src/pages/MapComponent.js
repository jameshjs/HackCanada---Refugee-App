import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const mapRef = useRef(null); // Ref for the div
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        if (!mapRef.current) return; // Ensure div exists

        // Initialize the Leaflet map
        const leafletMap = L.map(mapRef.current).setView([43.4643, -80.5204], 13);

        // Add tile layer
        L.tileLayer('https://api.maptiler.com/maps/outdoor-v2/{z}/{x}/{y}.png?key=BGW0EIBV4Hz7HowKCrdK', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a>',
            tileSize: 512,
            zoomOffset: -1,
        }).addTo(leafletMap);

        // Custom icon
        const customIcon = L.icon({
            iconUrl: 'https://static.thenounproject.com/png/9868-200.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        // Fetch emergency resources
        fetch('http://127.0.0.1:8000/locations')
            .then((response) => response.json())
            .then((data) => {
                data.forEach(element => { // Fix: data is an array, not an object with `elements`
                    const marker = L.marker([element.latitude, element.longitude], { icon: customIcon }).addTo(leafletMap);
                    marker.bindPopup(`
                        <b>${element.name || "Unnamed"}</b><br />
                        ${element.message || "No amenity"}<br />
                        <a href="/location/${element.id}">View Details</a>
                    `);
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        // Cleanup on unmount
        return () => {
            leafletMap.remove();
        };
    }, []); 
    
    return (
        <div>
            <button 
                onClick={() => navigate('/dashboard')} 
                className="center mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                Switch to Dashboard
            </button>
            <div ref={mapRef} style={{ height: '100vh' }} />
        </div>
    );
};

export default MapComponent;