"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [isTracking, setIsTracking] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState('prompt');
  const [locationError, setLocationError] = useState(null);

  const checkPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      setPermissionStatus(result.state);
      
      // Listen for permission changes
      result.addEventListener('change', () => {
        setPermissionStatus(result.state);
        if (result.state === 'denied') {
          setIsTracking(false);
          setLocationError('Location permission was denied');
        }
      });
    } catch (error) {
      console.error('Error checking permission:', error);
      setLocationError('Could not check location permissions');
    }
  };

  const startTracking = async () => {
    await checkPermission();
    
    if (permissionStatus === 'denied') {
      toast.error('Location access is required to use this application');
      return false;
    }

    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return false;
    }

    setIsTracking(true);
    toast.success('Location tracking enabled');
    return true;
  };

  const stopTracking = () => {
    setIsTracking(false);
    toast.success('Location tracking disabled');
  };

  useEffect(() => {
    let intervalId;

    const updateLocation = async () => {
      if (!isTracking) return;

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });

        await axios.post('/api/user/update-location', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

        // Show location indicator
        toast.success('Location updated', {
          id: 'location-update',
          duration: 2000,
          icon: '📍'
        });

      } catch (error) {
        console.error('Error updating location:', error);
        setLocationError(error.message);
        toast.error('Failed to update location');
        setIsTracking(false);
      }
    };

    if (isTracking) {
      // Initial update
      updateLocation();
      // Set up polling every 5 minutes
      intervalId = setInterval(updateLocation, 5 * 60 * 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isTracking]);

  return (
    <LocationContext.Provider value={{ 
      startTracking, 
      stopTracking, 
      isTracking, 
      permissionStatus,
      locationError 
    }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);
