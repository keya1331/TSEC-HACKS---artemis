"use client";

import { useState } from "react";
import { FaSatellite } from "react-icons/fa"; // Import Satellite Icon

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
      
      // Extract probability from result string
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
      return {
        text: "HIGH RISK OF WILDFIRE",
        color: "text-red-600",
        bgColor: "bg-red-500"
      };
    } else if (confidence > 50) {
      return {
        text: "MODERATE RISK OF WILDFIRE",
        color: "text-orange-600",
        bgColor: "bg-orange-500"
      };
    } else if (confidence > 25) {
      return {
        text: "LOW RISK OF WILDFIRE",
        color: "text-yellow-600",
        bgColor: "bg-yellow-500"
      };
    } else {
      return {
        text: "MINIMAL RISK OF WILDFIRE",
        color: "text-green-600",
        bgColor: "bg-green-500"
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#BAD799] to-[#8FCB81] flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Floating Satellite Icons */}
      <div className="absolute top-20 left-10 animate-floating">
        <FaSatellite className="text-[#237414] text-5xl opacity-60" />
      </div>
      <div className="absolute bottom-20 right-10 animate-floating-reverse">
        <FaSatellite className="text-[#237414] text-5xl opacity-60" />
      </div>

      <h1 className="text-4xl font-extrabold text-[#237414] mb-8 animate-fade-in">
        Satellite Detection
      </h1>

      {/* Upload Button */}
      <div className="flex flex-col items-center mb-6">
        <label
          htmlFor="imageInput"
          className="cursor-pointer px-6 py-3 bg-[#237414] text-[#BAD799] font-semibold rounded-md shadow-md flex items-center hover:bg-[#2B8C1B] transition duration-300"
        >
          <FaSatellite className="w-6 h-6 mr-2" />
          Upload Satellite Image
        </label>
        <input type="file" id="imageInput" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </div>

      {/* Image Preview */}
      <div className="flex justify-center items-center mb-6">
        <div className="relative w-96 h-80 flex justify-center items-center border-4 border-dashed border-[#237414] bg-white rounded-lg shadow-md">
          {preview ? (
            <img src={preview} alt="Uploaded" className="w-full h-full object-cover rounded-md" />
          ) : (
            <p className="text-gray-500">No Image Uploaded</p>
          )}
        </div>
      </div>

      {/* Predict Button */}
      <button
        onClick={handlePrediction}
        disabled={!image}
        className={`px-6 py-3 bg-[#237414] text-[#BAD799] font-semibold rounded-md shadow-md transition duration-300 ${
          !image ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2B8C1B]'
        }`}
      >
        IS THERE A WILDFIRE?
      </button>

      {/* Updated Prediction Result */}
      {confidence > 0 && (
        <div className="space-y-4 mt-6 mb-6 w-96">
          <div className={`text-2xl font-bold ${getPredictionStatus(confidence).color}`}>
            {getPredictionStatus(confidence).text}
          </div>
          
          {/* Circular Progress */}
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                className={`${getPredictionStatus(confidence).bgColor} stroke-current transition-all duration-500`}
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="none"
                transform="rotate(-90 50 50)"
                strokeDasharray={`${confidence * 2.51327}, 251.327`}
              />
              <text
                x="50"
                y="50"
                className="font-bold text-lg"
                textAnchor="middle"
                dy="0.3em"
                fill="#237414"
              >
                {`${confidence.toFixed(1)}%`}
              </text>
            </svg>
          </div>

          {/* Risk Level Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full ${getPredictionStatus(confidence).bgColor} transition-all duration-500`}
              style={{ width: `${confidence}%` }}
            />
          </div>
          
          {/* Risk Description */}
          <div className="text-sm text-gray-600 text-center mt-2">
            {confidence > 75 ? (
              "Immediate action required! High probability of wildfire."
            ) : confidence > 50 ? (
              "Caution needed. Moderate chance of wildfire development."
            ) : confidence > 25 ? (
              "Monitor conditions. Low but present risk of wildfire."
            ) : (
              "Safe conditions. Keep monitoring for changes."
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(15px); }
          100% { transform: translateY(0px); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-floating { animation: floating 3s infinite ease-in-out; }
        .animate-floating-reverse { animation: floating 3s infinite ease-in-out reverse; }
      `}</style>
    </div>
  );
};

export default SatelliteDetection;
