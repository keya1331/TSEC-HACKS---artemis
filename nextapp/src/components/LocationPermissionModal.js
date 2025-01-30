import React from 'react';

export default function LocationPermissionModal({ onAllow, onDeny }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-[#237414] mb-4">Location Access Required</h2>
        <p className="text-[#081707] mb-6">
          For security reasons and to provide better services, we need access to your location. 
          This helps us:
          <ul className="list-disc ml-5 mt-2">
            <li>Verify your login location</li>
            <li>Track wildlife incidents in your area</li>
            <li>Provide emergency response if needed</li>
          </ul>
        </p>
        <div className="flex items-center space-x-4 justify-end">
          <button
            onClick={onDeny}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Deny & Exit
          </button>
          <button
            onClick={onAllow}
            className="px-4 py-2 bg-[#6DBE47] text-white rounded hover:bg-[#237414]"
          >
            Allow Location
          </button>
        </div>
      </div>
    </div>
  );
}
