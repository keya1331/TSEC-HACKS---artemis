"use client";

import { useState } from "react";
import { FaSatellite } from "react-icons/fa";

const SatelliteDetection = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("PREDICTION WILL BE SHOWN HERE");
  const [confidence, setConfidence] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePrediction = async () => {
    if (!image) {
      alert("Please upload a satellite image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5000/process_image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const probabilityMatch = data.result.match(/Probability: ([\d.]+)/);
      const probability = probabilityMatch ? parseFloat(probabilityMatch[1]) * 100 : 0;

      setPrediction(data.result);
      setConfidence(probability);
    } catch (error) {
      alert("Error processing image. Please try again.");
    }
  };

  const getPredictionStatus = (confidence) => {
    if (confidence > 75) {
      return { text: "HIGH RISK", color: "text-red-600", bgColor: "bg-red-500" };
    } else if (confidence > 50) {
      return { text: "MODERATE RISK", color: "text-orange-600", bgColor: "bg-orange-500" };
    } else if (confidence > 25) {
      return { text: "LOW RISK", color: "text-yellow-600", bgColor: "bg-yellow-500" };
    } else {
      return { text: "MINIMAL RISK", color: "text-green-600", bgColor: "bg-green-500" };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3f7935] to-[#BAD799] flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-extrabold text-[#BAD699] mb-8 animate-fade-in">
        Satellite Detection
      </h1>

      {/* Upload Button */}
      <label
        htmlFor="imageInput"
        className="cursor-pointer px-8 py-4 bg-[#2B7A0B] text-white font-semibold rounded-lg shadow-md flex items-center hover:bg-[#206409] transition-all duration-300 mb-6"
      >
        <FaSatellite className="w-6 h-6 mr-2" />
        Upload Satellite Image
      </label>
      <input type="file" id="imageInput" accept="image/*" className="hidden" onChange={handleImageUpload} />

      {/* Image Preview */}
      <div className="w-80 h-80 flex justify-center items-center border-4 border-dashed border-[#2B7A0B] bg-white rounded-lg shadow-md mb-6">
        {preview ? (
          <img src={preview} alt="Uploaded" className="w-full h-full object-cover rounded-md" />
        ) : (
          <p className="text-[#C9EFA3]">No Image Uploaded</p>
        )}
      </div>

      {/* Predict Button */}
      <button
        onClick={handlePrediction}
        disabled={!image}
        className={`px-6 py-3 bg-[#2B7A0B] text-white font-semibold rounded-lg shadow-md transition duration-300 ${
          !image ? "opacity-50 cursor-not-allowed" : "hover:bg-[#206409]"
        }`}
      >
        Detect Wildfire
      </button>

      {/* Prediction Results */}
      {confidence > 0 && (
        <div className="mt-10 text-center">
          <div
            className={`inline-block px-4 py-2 rounded-lg ${getPredictionStatus(confidence).bgColor} text-white text-lg font-bold`}
          >
            {getPredictionStatus(confidence).text}
          </div>

          {/* Confidence Progress Bar */}
          <div className="w-80 bg-[#C9EFA3] h-4 rounded-full mt-6 overflow-hidden mx-auto">
            <div
              className={`h-full ${getPredictionStatus(confidence).bgColor} transition-all duration-500`}
              style={{ width: `${confidence}%` }}
            />
          </div>

          {/* Confidence Percentage */}
          <p className="text-lg font-semibold text-[#2B7A0B] mt-4">{`Confidence: ${confidence.toFixed(1)}%`}</p>

          {/* Risk Description */}
          <p className="text-sm text-[#C9EFA3] mt-2">
            {confidence > 75
              ? "Immediate action required! High probability of wildfire."
              : confidence > 50
              ? "Caution needed. Moderate chance of wildfire development."
              : confidence > 25
              ? "Monitor conditions. Low but present risk of wildfire."
              : "Safe conditions. Keep monitoring for changes."}
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SatelliteDetection;
