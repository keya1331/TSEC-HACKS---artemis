"use client";
import { useState } from "react";
import { FaDisease } from "react-icons/fa6"; // Import Disease Icon

const DiseaseDetection = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("Upload an image to detect disease");

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

    try {
      const response = await fetch("http://localhost:5000/detect_disease", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setPrediction(`Disease Detected: ${data.disease_name}`);
      } else {
        setPrediction("Error in disease detection");
      }
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error in disease detection");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#48843d] to-[#BAD799] flex flex-col items-center justify-center px-4 py-12 relative">
      {/* Fixed Navbar Spacer */}
      <div className="h-16 w-full"></div>

      {/* Floating Disease Icons */}
      <div className="absolute top-20 left-10 animate-floating">
        <FaDisease className="text-[#237414] text-5xl opacity-60" />
      </div>
      <div className="absolute bottom-20 right-10 animate-floating-reverse">
        <FaDisease className="text-[#237414] text-5xl opacity-60" />
      </div>

      <h1 className="text-4xl font-extrabold text-[#084C20] mb-8 animate-fade-in">
        Disease Detection
      </h1>

      {/* Upload Button */}
      <div className="flex flex-col items-center mb-6">
        <label
          htmlFor="imageInput"
          className="cursor-pointer px-6 py-3 bg-[#237414] text-[#BAD799] font-semibold rounded-md shadow-md flex items-center hover:bg-[#1A5F10] transition duration-300"
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
              d="M12 4v16m8-8H4"
            />
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


      {/* Detect Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={handlePrediction}
          className="px-6 py-3 bg-[#237414] text-[#BAD799] font-semibold rounded-md hover:bg-[#1A5F10] shadow-md transition duration-300"
        >
          Detect Disease
        </button>
      </div>

      {/* Prediction Result */}
      <div className="text-2xl font-bold text-[#084C20] mb-6">{prediction}</div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
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

export default DiseaseDetection;
