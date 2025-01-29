"use client";
import { useState } from "react";

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

    const response = await fetch("/api/camera_predict", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setPrediction(data.wildfire_prediction ? "🔥 THERE IS A WILDFIRE" : "✅ NO WILDFIRE DETECTED");
    setConfidence(data.confidence);
  };

  return (
    <div className="text-center my-4">
      <h1 className="text-3xl font-bold mb-4">Camera Detection Page</h1>

      {/* Upload Button */}
      <div className="flex flex-col items-center mb-4">
        <label htmlFor="imageInput" className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md shadow-md flex items-center">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M14 14v5m0 0v-5m0 5h5m-5 0H9a4 4 0 01-4-4V5a2 2 0 012-2h8a2 2 0 012 2v4m0 6.586a2 2 0 11-2-2 2 2 0 012 2zM14 14V9a2 2 0 00-2-2H6m8 5h-3a2 2 0 01-2-2V6m5 5V6a2 2 0 00-2-2h-5">
            </path>
          </svg>
          Upload Image
        </label>
        <input type="file" id="imageInput" accept="image/*" className="hidden" onChange={handleImageUpload} />
      </div>

      {/* Image Preview */}
      <div className="flex justify-center items-center mb-4 h-80">
        <div className="relative w-96 h-80 flex justify-center items-center border-2 border-dashed border-blue-500 rounded">
          {preview ? <img src={preview} alt="Uploaded" className="max-w-full max-h-full" /> : <p className="text-gray-500">No Image Uploaded</p>}
        </div>
      </div>

      {/* Predict Button */}
      <div className="flex justify-center mb-4">
        <button onClick={handlePrediction} className="p-2 bg-blue-500 text-white rounded">IS THERE A WILDFIRE?</button>
      </div>

      {/* Prediction Result */}
      <div className="text-xl font-bold text-center mt-4">{prediction}</div>

      {/* Confidence Bar */}
      <div className="mt-4 flex items-center justify-center">
        <div className="w-96 bg-gray-300 h-8 rounded-lg relative">
          <div className="h-full rounded-lg bg-green-500" style={{ width: `${confidence}%` }}></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
            {confidence > 0 ? `Confidence: ${confidence}%` : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraDetection;
