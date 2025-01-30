import { useLocation } from "@/contexts/LocationContext";

export default function LocationTrackingIndicator() {
  const { isTracking, lastUpdate } = useLocation();

  if (!isTracking) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-[#6DBE47] text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
      <div className="animate-ping w-2 h-2 bg-white rounded-full"></div>
      <span>Tracking Location</span>
      {lastUpdate && (
        <span className="text-xs">
          Last update: {new Date(lastUpdate).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
