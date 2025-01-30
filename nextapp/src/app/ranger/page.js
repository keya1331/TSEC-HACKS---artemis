'use client';
import React, { useEffect } from 'react';

const RangerPage = () => {
  useEffect(() => {
    const email = localStorage.getItem('rangerEmail');
    if (!email) {
      window.location.href = '/ranger/login';
    }
  }, []);

  const checkIfBusy = async () => {
    const email = localStorage.getItem('rangerEmail');
    if (!email) {
      console.error('No ranger email found in local storage');
      return;
    }

    try {
      const response = await fetch('/api/ranger/isbusy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.isBusy) {
        window.location.href = 'ranger/complete/task';
      } else {
        alert('No work pending');
      }
    } catch (error) {
      console.error('Error checking if ranger is busy:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#d8e3a6] via-[#c8d796] to-[#b0c578] p-6">
      <h1 className="text-4xl font-bold text-center text-[#081707] mb-10">
        Ranger Dashboard
      </h1>
      <div className="flex space-x-4">
        <button
          onClick={() => window.location.href = '/admin/threats'}
          className="px-6 py-3 bg-[#6DBE47] text-white font-semibold rounded-md hover:bg-[#237414] transition duration-300"
        >
          Go to Threats
        </button>
        <button
          onClick={checkIfBusy}
          className="px-6 py-3 bg-[#6DBE47] text-white font-semibold rounded-md hover:bg-[#237414] transition duration-300"
        >
          Check If Busy
        </button>
      </div>
    </div>
  );
};

export default RangerPage;