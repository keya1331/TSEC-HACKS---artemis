'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import Link from 'next/link';

const RoutingMachine = ({ waypoints }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: waypoints.map((wp) => L.latLng(wp[0], wp[1])),
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }],
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      createMarker: () => null, // Hide the markers for the waypoints
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, waypoints]);

  return null;
};

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
    <div className="bg-[#D8E3A6] text-[#14470D] z-0">
      <div className="container mx-auto px-4">
        <div className="relative z-10 map-container h-screen pt-32 pb-32">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-5xl">Posted Threats</h2>
          {/* Set the default map center to India */}
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="w-full h-full"
          >
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
                    <span><Link href={`https://maps.google.com/?q=${thread.location.latitude},${thread.location.longitude}`} target='_blank'>{thread.location.latitude}, {thread.location.longitude}</Link></span><br />
                    <strong className="block text-lg mt-2">Description:</strong> 
                    <span>{thread.message}</span><br />
                    <strong className="block text-lg mt-2">Picture:</strong><br />
                    <img src={thread.image} alt="Thread" className="w-24 h-24 mt-2 rounded-lg shadow-md" />
                  </div>
                </Popup>
              </Marker>
            ))}
            {threads.length > 1 && (
              <RoutingMachine
                waypoints={threads.map(thread => [thread.location.latitude, thread.location.longitude])}
              />
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;