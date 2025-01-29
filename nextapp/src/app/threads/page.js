"use client";
import { useState } from "react";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Flora",
    message: "",
    latitude: "",
    longitude: "",
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (!file || !formData.name || !formData.message || !formData.latitude || !formData.longitude) {
      return toast.error("All fields are required!");
    }

    const data = new FormData();
    data.append("image", file);
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("message", formData.message);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);

    try {
      const res = await fetch("/api/thread", {
        method: "POST",
        body: data,
      });

      const response = await res.json();
      if (res.ok) {
        toast.success(response.message);
        // Clear form data after successful upload
        setFormData({
          name: "",
          type: "Fire",
          message: "",
          latitude: "",
          longitude: "",
        });
        setFile(null); // Clear file input
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

  console.log("UploadForm -> formData", formData);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <form onSubmit={handleUpload} className="bg-white p-6 rounded shadow-md mt-10 w-full max-w-md">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        >
          
          <option value="Flora">Flora</option>
          <option value="Faunna">Faunna</option>
        </select>
        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button
          type="button"
          onClick={getLocation}
          className="mb-4 p-2 bg-blue-500 text-white rounded w-full"
        >
          Get Location
        </button>
        <p className="mb-4">Latitude: {formData.latitude}, Longitude: {formData.longitude}</p>
        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded w-full"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
