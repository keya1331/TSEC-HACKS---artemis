"use client";
import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

const WildfireAlertPage = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    const newMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 2,
    });
    
    const newMarker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([0, 0])
      .addTo(newMap);
    
    newMarker.on("dragend", () => {
      const lngLat = newMarker.getLngLat();
      setMapLocation([lngLat.lng, lngLat.lat]);
    });
    
    setMap(newMap);
    setMarker(newMarker);
  }, []);

  const fetchSuggestions = async (query) => {
    if (!query) return;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    setSuggestions(
      data.features.map((feature) => ({ label: feature.place_name, value: feature.center }))
    );
  };

  const setMapLocation = (coords) => {
    const [lng, lat] = coords;
    map.setCenter([lng, lat]);
    map.setZoom(15);
    marker.setLngLat([lng, lat]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const center = map.getCenter();
    if (!email || !center) {
      setMessage("Please provide your email and select a location.");
      return;
    }

    const response = await fetch("/api/alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, latitude: center.lat, longitude: center.lng }),
    });
    
    const data = await response.json();
    setMessage(
      data.success
        ? "Alert subscription successful! You will receive wildfire alerts."
        : "An error occurred. Please try again."
    );
  };

  return (
    <div className="text-center my-4">
      <h1 className="text-3xl font-bold mb-4">Wildfire Alert Service</h1>

      <div className="flex justify-center mb-4 relative">
        <input
          type="text"
          className="p-2 border rounded-l w-96"
          placeholder="Enter Location"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r"
          onClick={() => fetchSuggestions(searchQuery)}
        >
          Search
        </button>
        {suggestions.length > 0 && (
          <div className="absolute left-0 mt-1 w-96 bg-white border max-h-48 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setSearchQuery(suggestion.label);
                  setMapLocation(suggestion.value);
                  setSuggestions([]);
                }}
              >
                {suggestion.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <div id="map" className="w-full max-w-lg h-96 mx-auto mb-4 border-2 border-blue-500 rounded"></div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label className="block text-gray-700 font-bold mb-2">Your Email:</label>
        <input
          type="email"
          className="p-2 border rounded w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
          Receive Alerts
        </button>
      </form>

      {message && <div className="mt-4 text-lg font-bold">{message}</div>}
    </div>
  );
};

export default WildfireAlertPage;
