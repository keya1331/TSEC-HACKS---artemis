'use client';

import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function SatelliteDetectionPage() {
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
    const [predictions, setPredictions] = useState({
        satellite: { status: 'SATELLITE PREDICTION WILL BE SHOWN HERE', confidence: 0 },
        weather: { status: 'WEATHER PREDICTION WILL BE SHOWN HERE', confidence: 0 },
        combined: { status: 'COMBINED PREDICTION WILL BE SHOWN HERE', confidence: 0 }
    });

    useEffect(() => {
        if (!map.current && mapboxgl.supported()) {
            map.current = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [0, 0],
                zoom: 2,
                accessToken: MAPBOX_TOKEN
            });

            marker.current = new mapboxgl.Marker({ draggable: true })
                .setLngLat([0, 0])
                .addTo(map.current);

            marker.current.on('dragend', () => {
                const lngLat = marker.current.getLngLat();
                setMapLocation([lngLat.lng, lngLat.lat]);
            });
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

    const setMapLocation = (coords) => {
        const [lng, lat] = coords;
        map.current.setCenter([lng, lat]);
        map.current.setZoom(15);
        marker.current.setLngLat([lng, lat]);
    };

    const handleSearch = async () => {
        const suggestions = await fetchSuggestions(location);
        if (suggestions.length > 0) {
            setMapLocation(suggestions[0].value);
        }
        setSuggestions([]);
    };

    const handlePredict = async () => {
        const center = map.current.getCenter();
        const zoom = 15;
        map.current.setZoom(zoom);
        marker.current.setLngLat([center.lng, center.lat]);

        let mlData = null, satelliteData = null, weatherData = null;

        // ML Server prediction
        try {
            const mlResponse = await fetch('http://localhost:5000/satellite_predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    location: [center.lng, center.lat],
                    zoom: zoom
                })
            });
            if (!mlResponse.ok) throw new Error('ML Server response was not ok');
            mlData = await mlResponse.json();
        } catch (error) {
            console.error("ML Server Error:", error);
            alert("ML Server prediction failed. Using other available data.");
        }

        // Satellite API call
        try {
            const satelliteResponse = await axios.post("https://api.satellite-fire-detection.com", { 
                lat: center.lat, 
                lng: center.lng 
            });
            satelliteData = satelliteResponse.data;
        } catch (error) {
            console.error("Satellite API Error:", error);
            alert("Satellite data fetch failed. Using other available data.");
        }

        // Weather API call
        try {
            const weatherResponse = await axios.get(`https://api.weather-wildfire.com?lat=${center.lat}&lng=${center.lng}`);
            weatherData = weatherResponse.data;
        } catch (error) {
            console.error("Weather API Error:", error);
            alert("Weather data fetch failed. Using other available data.");
        }

        // Process available data and update predictions
        try {
            const predictions = {};
            
            if (satelliteData) {
                predictions.satellite = {
                    status: satelliteData.fire_detected ? 'THERE IS A WILDFIRE (SATELLITE)' : 'THERE IS NO WILDFIRE (SATELLITE)',
                    confidence: satelliteData.probability
                };
            }

            if (weatherData) {
                predictions.weather = {
                    status: weatherData.fire_risk ? 'THERE IS A WILDFIRE (WEATHER)' : 'THERE IS NO WILDFIRE (WEATHER)',
                    confidence: weatherData.probability
                };
            }

            if (mlData) {
                predictions.ml = {
                    status: mlData.prediction ? 'THERE IS A WILDFIRE (ML)' : 'THERE IS NO WILDFIRE (ML)',
                    confidence: mlData.probability
                };
            }

            // Calculate combined prediction if at least one data source is available
            const availableProbabilities = [
                satelliteData?.probability,
                weatherData?.probability,
                mlData?.probability
            ].filter(p => p !== undefined);

            if (availableProbabilities.length > 0) {
                const average_probability = availableProbabilities.reduce((a, b) => a + b, 0) / availableProbabilities.length;
                predictions.combined = {
                    status: average_probability > 50 ? 'THERE IS A WILDFIRE (COMBINED)' : 'THERE IS NO WILDFIRE (COMBINED)',
                    confidence: average_probability
                };
            }

            // Update state only if we have at least one prediction
            if (Object.keys(predictions).length > 0) {
                setPredictions(predictions);
            } else {
                throw new Error('No data available from any source');
            }

        } catch (error) {
            console.error("Error processing predictions:", error);
            alert("Failed to process wildfire predictions. Please try again.");
        }
    };

    return (
        <div className="text-center my-4">
            <h1 className="text-3xl font-bold mb-4">Satellite Detection Page</h1>

            <div className="flex justify-center mb-4 relative">
                <div className="relative w-96">
                    <input 
                        type="text"
                        className="p-2 border rounded-l w-full"
                        placeholder="Search location"
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                            if (e.target.value.length > 2) {
                                fetchSuggestions(e.target.value).then(setSuggestions);
                            } else {
                                setSuggestions([]);
                            }
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleSearch();
                        }}
                    />
                    {suggestions.length > 0 && (
                        <div className="absolute left-0 mt-1 w-full bg-white border border-gray-300 max-h-48 overflow-y-auto z-10">
                            {suggestions.map((item, index) => (
                                <div 
                                    key={index}
                                    className="p-2 cursor-pointer hover:bg-gray-200 text-left"
                                    onClick={() => {
                                        setLocation(item.label);
                                        setMapLocation(item.value);
                                        setSuggestions([]);
                                    }}
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded-r">Search</button>
            </div>

            <div id="map" className="w-full max-w-lg h-96 mx-auto mb-4 border-2 border-blue-500 rounded"></div>

            <button onClick={handlePredict} className="p-2 bg-blue-500 text-white rounded mb-8">
                IS THERE A WILDFIRE?
            </button>

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
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                                Confidence: {confidence}%
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
