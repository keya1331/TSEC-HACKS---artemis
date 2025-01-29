"use client";

import { useState } from "react";
import "tailwindcss/tailwind.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPaw } from "react-icons/fa";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Flora",
    latitude: "",
    longitude: "",
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    if (
      !file ||
      !formData.name ||
      !formData.latitude ||
      !formData.longitude
    ) {
      return toast.error("All fields are required!");
    }

    const data = new FormData();
    data.append("image", file);
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);

    try {
      // Different API endpoints based on type
      const apiEndpoint = formData.type === "Flora" 
        ? "http://localhost:5000/detect_flora"
        : "http://localhost:5000/detect_faunna";
      console.log(apiEndpoint);
      const res = await fetch(apiEndpoint, {
        method: "POST",
        body: data,
      });

      const response = await res.json();
      if (res.ok) {
        setDetectionResults(response);
        
        // Store results in MongoDB - updated to match API expectations
        const mongoData = {
          name: formData.name,
          type: formData.type,
          latitude: formData.latitude,
          longitude: formData.longitude,
          detectionResults: response,
          timestamp: new Date().toISOString()
        };

        const mongoRes = await fetch('/api/classification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mongoData),
        });

        if (!mongoRes.ok) {
          throw new Error('Failed to save to database');
        }

        toast.success("Upload and detection successful!");
        
        // Reset form
        setFormData({
          name: "",
          type: "Flora",
          latitude: "",
          longitude: "",
        });
        setFile(null);
      } else {
        toast.error(response.error || "An error occurred!");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    }
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      });
    } else {
      toast.error("Geolocation not supported by your browser.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#d8e3a6] via-[#c8d796] to-[#b0c578] relative">
      <ToastContainer />

      {/* Wildlife Icons on Sides */}
      <div className="absolute top-20 left-10 hidden lg:block">
        <FaPaw className="text-8xl text-[#6DBE47] animate-pulse" />
      </div>
      <div className="absolute bottom-20 right-10 hidden lg:block">
        <FaPaw className="text-8xl text-[#84C16B] animate-bounce" />
      </div>

      <div className="w-full max-w-lg space-y-6">
        {/* Form Section */}
        <form
          onSubmit={handleUpload}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold text-center text-[#084C20] mb-6">
            Wildlife Upload Form
          </h2>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#6DBE47] focus:outline-none"
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#6DBE47] focus:outline-none"
          >
            <option value="Flora">Flora</option>
            <option value="Faunna">Faunna</option>
          </select>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#6DBE47] focus:outline-none"
          />
          <button
            type="button"
            onClick={getLocation}
            className="mb-4 p-3 bg-[#6DBE47] text-white rounded-lg w-full hover:bg-[#5CAA3F] transition duration-300"
          >
            Get Location
          </button>
          <p className="mb-4 text-[#084C20] text-center">
            Latitude: {formData.latitude}, Longitude: {formData.longitude}
          </p>
          <button
            type="submit"
            className="p-3 bg-[#6DBE47] text-white rounded-lg w-full hover:bg-[#5CAA3F] transition duration-300"
          >
            Upload
          </button>
        </form>

        {/* Results Display */}
        {detectionResults && (
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <h3 className="text-xl font-bold text-center text-[#084C20] mb-4">
              Detection Results
            </h3>
            {formData.type === "Flora" ? (
              <div>
                <h4 className="font-semibold mb-2">Detected Plants:</h4>
                {detectionResults.detections.map((detection, index) => (
                  <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                    <p>Species: {detection.class_name}</p>
                    <p>Confidence: {detection.confidence.toFixed(2)}%</p>
                  </div>
                ))}
                <p className="mt-2">Total Detections: {detectionResults.total_detections}</p>
              </div>
            ) : (
              <div>
                <h4 className="font-semibold mb-2">Detected Wildlife:</h4>
                <p>Species: {detectionResults.wildlife_class}</p>
                <p>Classification ID: {detectionResults.class_id}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
