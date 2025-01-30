"use client";
import { useState } from "react";
import { FaCamera } from "react-icons/fa"; // Import Camera Icon

const CameraDetection = () => {
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
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("http://localhost:5000/camera_predict", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setPrediction(data.wildfire_prediction ? "🔥 THERE IS A WILDFIRE" : "✅ NO WILDFIRE DETECTED");
    setConfidence(data.confidence);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f582c] to-[#d8e3a6] flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Fixed Navbar Spacer */}
      <div className="h-16 w-full"></div>

      {/* Floating Camera Icons */}
      <div className="absolute top-20 left-10 animate-floating">
        <FaCamera className="text-[#237414] text-5xl opacity-60" />
      </div>
      <div className="absolute bottom-20 right-10 animate-floating-reverse">
        <FaCamera className="text-[#237414] text-5xl opacity-60" />
      </div>

      <h1 className="text-4xl font-extrabold text-[#BAD799] mb-8 animate-fade-in">
        Camera Detection
      </h1>

      {/* Upload Button */}
      <div className="flex flex-col items-center mb-6">
        <label
          htmlFor="imageInput"
          className="cursor-pointer px-6 py-3 bg-[#237414] text-[#BAD799] font-semibold rounded-md shadow-md flex items-center hover:bg-[#2B8C1B] transition duration-300"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 14v5m0 0v-5m0 5h5m-5 0H9a4 4 0 01-4-4V5a2 2 0 012-2h8a2 2 0 012 2v4m0 6.586a2 2 0 11-2-2 2 2 0 012 2zM14 14V9a2 2 0 00-2-2H6m8 5h-3a2 2 0 01-2-2V6m5 5V6a2 2 0 00-2-2h-5"
            ></path>
          </svg>
          Upload Image
        </label>
        <input type="file" id="imageInput" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </div>

      {/* Image Preview */}
      <div className="flex justify-center items-center mb-6">
        <div className="relative w-96 h-80 flex justify-center items-center border-4 border-solid border-[#237414] bg-white rounded-lg shadow-md">
          {preview ? (
            <img src={preview} alt="Uploaded" className="w-full h-full object-cover rounded-md" />
          ) : (
            <p className="text-gray-500">No Image Uploaded</p>
          )}
        </div>
      </div>

      {/* Predict Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handlePrediction}
          className="px-6 py-3 bg-[#237414] text-[#BAD799] font-semibold rounded-md hover:bg-[#2B8C1B] shadow-md transition duration-300"
        >
          IS THERE A WILDFIRE?
        </button>
      </div>

      {/* Prediction Result */}
      <div className="text-2xl font-bold text-[#237414] mb-6">{prediction}</div>

      {/* Confidence Bar */}
      <div className="w-96 bg-gray-300 h-8 rounded-lg relative shadow-inner">
        <div
          className="h-full rounded-lg bg-[#237414] transition-all duration-500"
          style={{ width: `${confidence}%` }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
          {confidence > 0 ? `Confidence: ${confidence}%` : ""}
        </div>
      </div>

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

        /* Floating Animation */
        @keyframes floating {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-floating {
          animation: floating 3s infinite ease-in-out;
        }
        .animate-floating-reverse {
          animation: floating 3s infinite ease-in-out reverse;
        }
      `}</style>
    </div>
  );
};

export default CameraDetection;
