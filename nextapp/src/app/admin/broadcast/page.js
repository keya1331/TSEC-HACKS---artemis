"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BroadcastButton() {
  const [loading, setLoading] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleBroadcast = async () => {
    console.log(announcement);
    if (!announcement.trim()) {
      toast.error("Please enter an announcement before broadcasting.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/broadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ announcement }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Broadcast sent successfully!");
        setAnnouncement(""); // Clear the input after successful broadcast
      } else {
        toast.error(data.error || "Failed to send broadcast.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3f7935] to-[#BAD799] flex flex-col justify-center items-center px-4">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#084C20] mb-4">
          Announce Something!
        </h2>
        <textarea
          placeholder="Type your announcement here..."
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6DBE47] focus:outline-none mb-4"
          rows={4}
        />
        <button
          onClick={handleBroadcast}
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-lg transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#6DBE47] hover:bg-[#96d87d]"
          }`}
        >
          {loading ? "Broadcasting..." : "Send Announcement"}
        </button>
      </div>
    </div>
  );
}
