'use client';

import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function SatelliteDetectionPage() {
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const [predictions, setPredictions] = useState({
        satellite: { status: 'SATELLITE PREDICTION WILL BE SHOWN HERE', confidence: 0 },
        weather: { status: 'WEATHER PREDICTION WILL BE SHOWN HERE', confidence: 0 },
        combined: { status: 'COMBINED PREDICTION WILL BE SHOWN HERE', confidence: 0 }
    });

    useEffect(() => {
        if (mapboxgl.supported()) {
            const mapInstance = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 0],
                zoom: 2,
                accessToken: MAPBOX_TOKEN
            });

            const markerInstance = new mapboxgl.Marker({ draggable: true })
                .setLngLat([0, 0])
                .addTo(mapInstance);

            markerInstance.on('dragend', () => {
                const lngLat = markerInstance.getLngLat();
                handleLocationUpdate([lngLat.lng, lngLat.lat]);
            });

            setMap(mapInstance);
            setMarker(markerInstance);
        }
    }, []);

    const fetchSuggestions = async (query) => {
        const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_TOKEN}`
        );
        const data = await response.json();
        return data.features.map(feature => ({
            label: feature.place_name,
            value: feature.center
        }));
    };

    const handleSearch = async () => {
        const suggestions = await fetchSuggestions(location);
        setSuggestions(suggestions);
    };

    const handleLocationUpdate = async (coords) => {
        map.setCenter(coords);
        map.setZoom(15);
        marker.setLngLat(coords);

        const response = await fetch('/api/satellite', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: coords })
        });

        const data = await response.json();
        setPredictions({
            satellite: { 
                status: data.satellite_status ? 'WILDFIRE DETECTED (SATELLITE)' : 'NO WILDFIRE DETECTED (SATELLITE)',
                confidence: data.satellite_probability || 0
            },
            weather: {
                status: data.weather_status ? 'WILDFIRE DETECTED (WEATHER)' : 'NO WILDFIRE DETECTED (WEATHER)',
                confidence: data.weather_probability || 0
            },
            combined: {
                status: data.average_status ? 'WILDFIRE DETECTED (COMBINED)' : 'NO WILDFIRE DETECTED (COMBINED)',
                confidence: data.average_probability || 0
            }
        });
    };

    return (
        <div className="text-center my-4">
            <h1 className="text-3xl font-bold mb-4">Satellite Detection Page</h1>

            {/* Search Section */}
            <div className="flex justify-center mb-4 relative">
                <div className="relative w-96">
                    <input 
                        type="text" 
                        className="p-2 border rounded-l w-full" 
                        placeholder="Search location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    {suggestions.length > 0 && (
                        <div className="absolute left-0 mt-1 w-full bg-white border border-gray-300">
                            {suggestions.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => setLocation(item.label)}
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded-r">Search</button>
            </div>

            {/* Map Display */}
            <div id="map" className="w-full max-w-lg h-96 mx-auto mb-4 border-2 border-blue-500 rounded"></div>

            {/* Prediction Sections */}
            {Object.entries(predictions).map(([key, { status, confidence }]) => (
                <div key={key} className="mt-8 mb-8">
                    <div className="text-2xl font-bold mb-4">{key.charAt(0).toUpperCase() + key.slice(1)} Prediction</div>
                    <div className="text-xl font-medium text-center">{status}</div>
                    <div className="mt-4 flex items-center justify-center mb-8">
                        <div className="w-96 bg-gray-300 h-8 rounded-lg relative">
                            <div 
                                style={{ width: `${confidence}%` }} 
                                className={`h-full rounded-lg ${confidence > 50 ? 'bg-red-500' : 'bg-green-500'}`}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                                {confidence}%
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="mt-8 text-center text-sm text-gray-600">
                <em>Note: These predictions may not be entirely accurate. They indicate the likelihood of a wildfire occurring and are not certain.</em>
            </div>
        </div>
    );
}
