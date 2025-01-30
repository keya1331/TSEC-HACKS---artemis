'use client'
import React, { useState } from 'react';

const Page = () => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [description, setDescription] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const email = localStorage.getItem('rangerEmail');
  
    if (!email) {
      alert('Email not found in localStorage');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', image);
    formData.append('location', JSON.stringify(location));
    formData.append('email', email);
    formData.append('description', description);
  
    try {
      const response = await fetch('/api/ranger/saveproof', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Error submitting task');
    }
  };

  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Complete the Task</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Upload Image:</label>
            <input type="file" id="image" onChange={handleImageChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
            <textarea id="description" value={description} onChange={handleDescriptionChange} className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="mb-4">
            <button type="button" onClick={captureLocation} className="bg-blue-500 text-white px-4 py-2 rounded">
              Capture Location
            </button>
            {location.latitude && location.longitude && (
              <p className="mt-2 text-gray-700">
                Latitude: {location.latitude}, Longitude: {location.longitude}
              </p>
            )}
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Page;