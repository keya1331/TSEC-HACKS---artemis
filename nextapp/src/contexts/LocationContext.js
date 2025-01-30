"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [isTracking, setIsTracking] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState('prompt');
  const [locationError, setLocationError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

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

        // Get user email from localStorage
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          console.error('No user email found');
          return;
        }

        const response = await axios.post('/api/user/update-location', {
          email: userEmail,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });

        if (response.status === 200) {
          setLastUpdate(new Date());
          toast.success('Location updated successfully', {
            id: 'location-update',
            icon: '📍',
            duration: 3000,
            position: 'bottom-right',
          });
        }

      } catch (error) {
        console.error('Error updating location:', error);
        setLocationError(error.message);
        toast.error('Failed to update location', {
          id: 'location-error',
          duration: 3000,
          position: 'bottom-right',
        });
        setIsTracking(false);
      }
    };

    if (isTracking) {
      // Initial update
      updateLocation();
      // Set up polling every 1 minute (for testing, adjust as needed)
      intervalId = setInterval(updateLocation, 60000);
      
      // Show tracking status
      toast.success('Location tracking started', {
        id: 'tracking-status',
        duration: 3000,
        icon: '🔄',
      });
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        toast.success('Location tracking stopped', {
          id: 'tracking-status',
          duration: 3000,
          icon: '⏹️',
        });
      }
    };
  }, [isTracking]);

  return (
    <LocationContext.Provider value={{ 
      startTracking, 
      stopTracking, 
      isTracking, 
      permissionStatus,
      locationError,
      lastUpdate 
    }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);
