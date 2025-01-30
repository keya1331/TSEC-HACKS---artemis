'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Link from 'next/link';

// Add a component for displaying directions
const DirectionsPanel = ({ directions }) => {
  if (!directions) return null;

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md max-h-[60vh] overflow-y-auto w-80">
      <h3 className="font-bold mb-2 text-blue-600 border-b pb-2">Turn-by-Turn Directions</h3>
      <div className="flex flex-col gap-2">
        {directions.map((instruction, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm">
            <span className="font-bold min-w-[24px] text-blue-600">{idx + 1}.</span>
            <span dangerouslySetInnerHTML={{ __html: instruction.text }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const RoutingMachine = ({ waypoints }) => {
  const map = useMap();
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (!map || waypoints.length < 2) return;

    // Remove existing layers
    map.eachLayer((layer) => {
      if (layer._routing || layer._isRoutingArrow) {
        map.removeLayer(layer);
      }
    });

    const routingControl = L.Routing.control({
      waypoints: waypoints.map(wp => L.latLng(wp[0], wp[1])),
      router: new L.Routing.OSRMv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: 'driving'
      }),
      lineOptions: {
        styles: [{ color: '#2563eb', opacity: 0.8, weight: 5 }],
        missingRouteStyles: [{ color: '#dc2626', opacity: 0.8, weight: 5 }],
        extendToWaypoints: true,
        addWaypoints: false
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      createMarker: () => null,
      formatter: new L.Routing.Formatter({ language: 'en', units: 'metric' })
    }).addTo(map);

    routingControl.on('routesfound', function(e) {
      const routes = e.routes;
      const route = routes[0];

      if (route && route.instructions) {
        setDirections(route.instructions);
      }

      if (route && route.coordinates) {
        const coordinates = route.coordinates;
        
        // Calculate total route length for better arrow distribution
        let totalDistance = 0;
        for (let i = 0; i < coordinates.length - 1; i++) {
          totalDistance += map.distance(coordinates[i], coordinates[i + 1]);
        }
        
        // Place arrows every ~2km or at minimum 8 arrows on the route
        const arrowDistance = Math.min(2000, totalDistance / 8);
        let accDistance = 0;
        let lastArrowPos = coordinates[0];

        for (let i = 1; i < coordinates.length; i++) {
          const segmentDist = map.distance(coordinates[i-1], coordinates[i]);
          accDistance += segmentDist;

          if (accDistance >= arrowDistance) {
            const pos = coordinates[i];
            const prevPos = coordinates[i-1];
            
            // Calculate bearing for arrow rotation
            const bearing = Math.atan2(
              pos.lng - prevPos.lng,
              pos.lat - prevPos.lat
            ) * (180 / Math.PI);

            // Enhanced arrow icon with better visibility
            const arrowIcon = L.divIcon({
              html: `
                <div class="arrow-container">
                  <svg viewBox="0 0 24 24" class="route-arrow" style="transform: rotate(${bearing}deg)">
                    <path d="M12 2L8 12l4 2.5L16 12z" fill="#2563eb" stroke="white" stroke-width="1"/>
                    <circle cx="12" cy="12" r="2" fill="white"/>
                  </svg>
                </div>
              `,
              className: 'arrow-icon',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            });

            const marker = L.marker(pos, {
              icon: arrowIcon,
              zIndexOffset: 1000
            }).addTo(map);

            marker._isRoutingArrow = true;
            lastArrowPos = pos;
            accDistance = 0;
          }
        }

        // Always add an arrow at the last segment
        if (coordinates.length > 1) {
          const lastPos = coordinates[coordinates.length - 1];
          const prevPos = coordinates[coordinates.length - 2];
          const finalBearing = Math.atan2(
            lastPos.lng - prevPos.lng,
            lastPos.lat - prevPos.lat
          ) * (180 / Math.PI);

          const finalArrowIcon = L.divIcon({
            html: `
              <div class="arrow-container">
                <svg viewBox="0 0 24 24" class="route-arrow final-arrow" style="transform: rotate(${finalBearing}deg)">
                  <path d="M12 2L8 12l4 2.5L16 12z" fill="#dc2626" stroke="white" stroke-width="1.5"/>
                  <circle cx="12" cy="12" r="2" fill="white"/>
                </svg>
              </div>
            `,
            className: 'arrow-icon',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
          });

          const finalMarker = L.marker(lastPos, {
            icon: finalArrowIcon,
            zIndexOffset: 2000
          }).addTo(map);

          finalMarker._isRoutingArrow = true;
        }
      }
    });

    return () => {
      map.removeControl(routingControl);
      setDirections(null);
    };
  }, [map, waypoints]);

  return <DirectionsPanel directions={directions} />;
};

const MapComponent = () => {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await fetch('/api/map/threats');
        const data = await response.json();
        // Sort threads by priority and timestamp (assuming each thread has a timestamp)
        const sortedThreads = data.sort((a, b) => {
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          if (b.priority !== a.priority) {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          }
          // If same priority, sort by timestamp (newest first)
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setThreads(sortedThreads);
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, []);

  // Define marker colors based on priority
  const getMarkerIcon = (priority) => {
    const markerColors = {
      'High': 'red',
      'Medium': 'orange',
      'Low': 'green'
    };

    return L.icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${markerColors[priority]}.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      shadowSize: [41, 41],
      shadowAnchor: [12, 41]
    });
  };

  return (
    <div className="bg-[#D8E3A6] text-[#14470D] z-0">
      <div className="container mx-auto px-4">
        <div className="relative z-10 map-container h-screen pt-32 pb-32">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-5xl">Posted Threats</h2>
          
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
              
              {/* Legend overlay positioned over the map */}
              <div className="absolute top-20 left-4 z-[1000] bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md">
                <h3 className="font-bold mb-2">Priority Legend</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                    <span>High Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span>Medium Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                    <span>Low Priority</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <div className="w-8 h-0 border-t-2 border-blue-500"></div>
                      <span className="text-blue-500">➤</span>
                    </div>
                    <span>Recommended Route</span>
                  </div>
                </div>
              </div>

              {threads.map((thread, index) => (
                <Marker
                  key={index}
                  position={[thread.location.latitude, thread.location.longitude]}
                  icon={getMarkerIcon(thread.priority)}
                >
                  <Popup>
                    <div className="p-2">
                      <strong className="block text-lg">Location:</strong> 
                      <span><Link href={`https://maps.google.com/?q=${thread.location.latitude},${thread.location.longitude}`} target='_blank'>{thread.location.latitude}, {thread.location.longitude}</Link></span><br />
                      <strong className="block text-lg mt-2">Description:</strong> 
                      <span>{thread.message}</span><br />
                      <strong className="block text-lg mt-2">Priority:</strong> 
                      <span className={`font-bold ${
                        thread.priority === 'High' ? 'text-red-600' :
                        thread.priority === 'Medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>{thread.priority}</span><br />
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
    </div>
  );
};

export default MapComponent;