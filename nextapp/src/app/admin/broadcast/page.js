"use client";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BroadcastButton() {
  const [loading, setLoading] = useState(false);

  const handleBroadcast = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/broadcast', { method: 'POST' });
      const data = await res.json();
      
      if (res.ok) {
        toast.success('Broadcast sent successfully!');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed to send broadcast.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <ToastContainer />
      <button 
        onClick={handleBroadcast} 
        className={`p-3 text-white rounded-lg ${loading ? 'bg-gray-500' : 'bg-blue-500'}`}
        disabled={loading}
      >
        {loading ? "Sending..." : "Broadcast Announcement"}
      </button>
    </div>
  );
}