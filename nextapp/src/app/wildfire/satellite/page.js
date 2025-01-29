'use client';

import { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function SatelliteDetectionPage() {
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [map, setMap] = useState(null);
    const [prediction, setPrediction] = useState('SATELLITE PREDICTION WILL BE SHOWN HERE');
    const [confidence, setConfidence] = useState(0);

    useEffect(() => {
        if (mapboxgl.supported()) {
            const mapInstance = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 0],
                zoom: 2,
                accessToken: MAPBOX_TOKEN
            });
            setMap(mapInstance);
        }
    }, []);

    const handleSearch = async () => {
        // Simulating API call for location search
        setSuggestions([`${location} Region 1`, `${location} Region 2`]);
    };

    const handlePredict = async () => {
        // Simulated prediction response
        setPrediction('Wildfire Risk Detected');
        setConfidence(80); // Example confidence level
    };

    return (
        <div className="text-center my-4">
            <h1 className="text-3xl font-bold mb-4">Satellite Detection Page</h1>

            {/* Search Bar */}
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
                                    onClick={() => setLocation(item)}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded-r">Search</button>
            </div>

            {/* Map Display */}
            <div id="map" className="w-full max-w-lg h-96 mx-auto mb-4 border-2 border-blue-500 rounded"></div>

            {/* Predict Button */}
            <button onClick={handlePredict} className="p-2 bg-blue-500 text-white rounded">IS THERE A WILDFIRE?</button>

            {/* Prediction Display */}
            <div className="mt-8 mb-8">
                <div className="text-2xl font-bold mb-4">Satellite Prediction</div>
                <div className="text-xl font-medium text-center">{prediction}</div>
                <div className="mt-4 flex items-center justify-center mb-8">
                    <div className="w-96 bg-gray-300 h-8 rounded-lg relative">
                        <div style={{ width: `${confidence}%` }} className="h-full rounded-lg bg-green-500"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                            {confidence}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-600">
                <em>Note: These predictions may not be entirely accurate. They indicate the likelihood of a wildfire occurring and are not certain.</em>
            </div>
        </div>
    );
}
