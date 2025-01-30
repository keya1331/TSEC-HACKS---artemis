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

  const [reports, setReports] = useState([]);

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

        setReports((prev) => [
          ...prev,
          { name: formData.name, message: formData.message, type: formData.type },
        ]);
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

  const placeholderImages = [
    "/public/avatar1.png",
    "/public/avatar2.png",
    "/public/avatar3.png",
    "/public/avatar4.png",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d8e3a6] via-[#c8d796] to-[#b0c578] flex flex-col items-center justify-start pt-10 relative">
      <ToastContainer />

      <form
        onSubmit={handleUpload}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg mb-10"
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
          <option value="Wildfire">Wildfire</option>
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

      {/* Wall of Threats */}
      <div className="w-full max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-[#084C20] mb-6 text-center">
          Anonymous Wildlife Threats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.length > 0 ? (
            reports.map((report, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-start gap-4"
              >
                <img
                  src={placeholderImages[index % placeholderImages.length]}
                  alt={`Profile ${index + 1}`}
                  className="w-12 h-12 rounded-full border-2 border-[#6DBE47]"
                />
                <div>
                  <h3 className="text-lg font-bold text-[#084C20]">
                    {report.name}
                  </h3>
                  <p className="text-sm text-[#237414] italic">{report.type}</p>
                  <p className="text-gray-700 mt-2">{report.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              No threats reported yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
