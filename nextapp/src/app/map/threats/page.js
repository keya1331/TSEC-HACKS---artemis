'use client';  // Use client-side rendering

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchThreads = async () => {
      try {
        const response = await fetch('/api/map/threats');
        const data = await response.json();
        setThreads(data);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="h-screen">
      {/* Set the default map center to India */}
      <MapContainer center={[20.5937, 78.9629]} zoom={5} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {threads.map((thread, index) => (
          <Marker
            key={index}
            position={[thread.location.latitude, thread.location.longitude]}
            icon={L.icon({
              iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            })}
          >
            <Popup>
              <div className="p-2">
                <strong className="block text-lg">Location:</strong> 
                <span>{thread.location.latitude}, {thread.location.longitude}</span><br />
                <strong className="block text-lg mt-2">Description:</strong> 
                <span>{thread.message}</span><br />
                <strong className="block text-lg mt-2">Picture:</strong><br />
                <img src={thread.image} alt="Thread" className="w-24 h-24 mt-2 rounded-lg shadow-md" />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;