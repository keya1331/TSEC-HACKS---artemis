"use client";
import { useLocation } from "@/contexts/LocationContext";
// ...existing imports...

export default function Navbar() {
  const { stopTracking } = useLocation();
  
  const handleLogout = async () => {
    try {
      // ...existing logout logic...
      stopTracking(); // Stop location tracking on logout
      // ...rest of logout handling...
    } catch (error) {
      // ...error handling...
    }
  };

  // ...rest of component...
}
