"use client";

import { useState } from "react";
import "tailwindcss/tailwind.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPaw } from "react-icons/fa";

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
    if (
      !file ||
      !formData.name ||
      !formData.message ||
      !formData.latitude ||
      !formData.longitude
    ) {
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
      const res = await fetch("/api/threats", {
        method: "POST",
        body: data,
      });

      const response = await res.json();
      if (res.ok) {
        toast.success(response.message);
        setFormData({
          name: "",
          type: "Flora",
          message: "",
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
        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-[#6DBE47] focus:outline-none"
        />
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
    </div>
  );
}
