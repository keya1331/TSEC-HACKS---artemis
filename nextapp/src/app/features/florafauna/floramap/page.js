'use client';
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

const FloraMap = () => {
  const [classifications, setClassifications] = useState([]);

  useEffect(() => {
    const fetchClassifications = async () => {
      try {
        const response = await fetch("/api/florafauna");
        const data = await response.json();
        console.log(data); // Log the fetched data
        setClassifications(data.filter((item) => item.type === "Flora"));
      } catch (error) {
        console.error("Error fetching classifications:", error);
      }
    };

    fetchClassifications();
  }, []);

  return (
    <div className="relative w-full h-screen bg-white rounded-lg shadow-lg overflow-hidden z-0">
      <div className="relative w-full h-full">
        <MapContainer 
          center={[20.5937, 78.9629]} 
          zoom={5} 
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {classifications.map((thread, index) => (
            <Marker
              key={index}
              position={[thread.location.latitude, thread.location.longitude]}
              icon={L.icon({
                iconUrl: "/images/leaf.png",
                iconSize: [41, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              })}
            >
              <Popup>
                <div className="p-2">
                  <strong className="block text-lg">Location:</strong>
                  <span><Link href={`https://maps.google.com/?q=${thread.location.latitude},${thread.location.longitude}`} target='_blank'>{thread.location.latitude}, {thread.location.longitude}</Link></span><br />
                  <strong className="block text-lg mt-2">Description:</strong>
                  <span>{thread.name}</span><br />
                  <strong className="block text-lg mt-2">Picture:</strong><br />
                  <img src={thread.image} alt="Thread" className="w-24 h-24 mt-2 rounded-lg shadow-md" />
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default FloraMap;