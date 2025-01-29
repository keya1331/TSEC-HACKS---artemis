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
      style: "mapbox://styles/mapbox/outdoors-v11",
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
      data.features.map((feature) => ({
        label: feature.place_name,
        value: feature.center,
      }))
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

    const response = await fetch("http://localhost:5000/alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, latitude: center.lat, longitude: center.lng }),
    });

    const data = await response.json();
    setMessage(
      data.success
        ? "✅ Alert subscription successful! You will receive wildfire alerts."
        : "❌ An error occurred. Please try again."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D8E3A6] to-[#BAD799] flex flex-col items-center justify-center px-4 py-12">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-[#237414] mb-6">Wildfire Alert Service</h1>

      {/* Search Location */}
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          className="w-full p-3 border-2 border-[#237414] rounded-md text-[#081707] placeholder-[#476C29] focus:ring-2 focus:ring-[#6DBE47] focus:outline-none"
          placeholder="📍 Enter Location"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            fetchSuggestions(e.target.value);
          }}
        />
        {suggestions.length > 0 && (
          <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto z-10">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-3 cursor-pointer hover:bg-[#BAD799] transition"
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

      {/* Map */}
      <div className="w-full max-w-lg h-96 mb-6 border-4 border-[#237414] rounded-lg shadow-lg relative overflow-hidden">
        <div id="map" className="absolute inset-0"></div>
      </div>

      {/* Subscription Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <label className="block text-[#081707] font-bold mb-2">📧 Your Email:</label>
        <input
          type="email"
          className="w-full p-3 border-2 border-[#237414] rounded-md text-[#081707] placeholder-[#476C29] focus:ring-2 focus:ring-[#6DBE47] focus:outline-none mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-[#237414] text-[#D8E3A6] font-semibold rounded-md shadow-md hover:bg-[#1A5F10] transition duration-300"
        >
          🔥 Receive Alerts
        </button>
      </form>

      {/* Confirmation Message */}
      {message && <div className="mt-4 text-lg font-bold text-[#237414]">{message}</div>}
    </div>
  );
};

export default WildfireAlertPage;
