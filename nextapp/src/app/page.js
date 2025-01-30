"use client";

import Chatbot from "./components/common/Chatbot";
import { useState, useEffect } from "react";
import Loader from "./components/common/Loader";
import FloraMap from "./features/florafauna/floramap/page";
import FaunaMap from "./features/florafauna/faunamap/page";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [classifications, setClassifications] = useState([]);

  const imageUrls = [
    "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?w=1080&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1545063914-a1a6ec821c88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1604417389023-3018ace0afbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1588878497864-24269ed778ba?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1606795614647-ac52e8ea4565?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1518443855757-dfadac7101ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [imageUrls.length]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchClassifications = async () => {
      try {
        const response = await fetch("/api/florafauna"); // Adjust the URL if necessary
        const data = await response.json();
        setClassifications(data);
      } catch (error) {
        console.error("Error fetching classifications:", error);
      }
    };

    fetchClassifications();
  }, []);

  const floraClassifications = classifications.filter(
    (classification) => classification.type === "Flora"
  );

  const faunaClassifications = classifications.filter(
    (classification) => classification.type === "Fauna"
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow">
        <div
          className="relative h-screen w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrls[currentImageIndex]})` }}
        >
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="relative z-20 flex flex-col justify-center items-center h-full px-8 text-center text-white">
            <h1 className="text-6xl font-bold mb-6 tracking-wide">
              WildShield
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-6">
              Explore the beauty of wildlife and immerse yourself in the wonders
              of nature.
            </p>
            <button className="px-6 py-3 bg-[#6DBE47] text-white font-semibold rounded-md hover:bg-[#237414] transition duration-300">
              See the Photo Gallery
            </button>
          </div>
        </div>

        {/* Additional Content Sections */}
        <div className="p-6 mt-16">
          <h2 className="text-3xl font-bold text-center text-[#084C20] mb-8">
            Biodiversity Hotspots
          </h2>
          <div className="flex flex-wrap justify-between p-4">
            {/* Flora Map */}
            <div className="w-full md:w-1/2 p-2">
              <div className="relative w-[85%] h-[700px] mx-auto bg-white rounded-lg overflow-hidden">
                <h3 className="text-xl font-bold text-center text-[#084C20] mb-4">
                  Flora Map
                </h3>
                <FloraMap />
              </div>
            </div>

            {/* Fauna Map */}
            <div className="w-full md:w-1/2 p-2">
              <div className="relative w-[85%] h-[700px] mx-auto bg-white rounded-lg overflow-hidden">
                <h3 className="text-xl font-bold text-center text-[#084C20] mb-4">
                  Fauna Map
                </h3>
                <FaunaMap />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  );
}
