"use client";

import Chatbot from "./components/common/Chatbot";
import { useState, useEffect } from "react";
import Loader from "./components/common/Loader";
import FloraMap from "./features/florafauna/floramap/page";
import FaunaMap from "./features/florafauna/faunamap/page";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageUrls = [
    "https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?w=1080&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1545063914-a1a6ec821c88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1604417389023-3018ace0afbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#BAD799]">
      {/* Hero Section */}
      <main className="flex-grow">
        <div
          className="relative h-screen w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrls[currentImageIndex]})` }}
        >
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <div className="relative z-20 flex flex-col justify-center items-center h-full px-8 text-center text-white">
            <h1 className="text-6xl font-bold mb-6 tracking-wide">WildShield</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-6">
              Explore the beauty of wildlife and immerse yourself in the wonders
              of nature.
            </p>
            <button className="px-6 py-3 bg-[#BAD799] text-[#081707] font-semibold rounded-md hover:bg-[#237414] transition duration-300">
              See the Photo Gallery
            </button>
          </div>
        </div>

        {/* Flora & Fauna Section */}
        <section className="bg-[#BAD799] text-[#081707] py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Biodiversity Hotspots</h2>
          <div className="flex flex-wrap justify-between max-w-7xl mx-auto px-4">
            <div className="w-full md:w-1/2 p-4">
              <h3 className="text-2xl font-semibold mb-4 text-center">Flora Map</h3>
              <div className="bg-[#A6D8E3] rounded-lg overflow-hidden shadow-md">
                <FloraMap />
              </div>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h3 className="text-2xl font-semibold mb-4 text-center">Fauna Map</h3>
              <div className="bg-[#A6D8E3] rounded-lg overflow-hidden shadow-md">
                <FaunaMap />
              </div>
            </div>
          </div>
        </section>

        {/* Report Section */}
<section className="bg-[#237414] text-[#BAD799] py-16">
  <div className="text-center max-w-6xl mx-auto px-6">
    <h2 className="text-4xl font-bold mb-6">Report Threats</h2>
    <p className="text-lg mb-6">
      Your input plays a critical role in protecting wildlife and preserving their habitats. 
      If you encounter any unusual activities, environmental hazards, or threats to wildlife, 
      let us know anonymously. Every report helps us monitor, address, and mitigate risks effectively.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Feature 1 */}
      <div className="bg-[#BAD799] text-[#084C20] rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold mb-4">Easy Reporting</h3>
        <p className="text-base">
          Submit wildlife threats with ease. No personal details are required, ensuring your anonymity.
        </p>
      </div>
      {/* Feature 2 */}
      <div className="bg-[#BAD799] text-[#084C20] rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold mb-4">Geolocation Support</h3>
        <p className="text-base">
          Enable location services to include precise coordinates, allowing us to act quickly and accurately.
        </p>
      </div>
      {/* Feature 3 */}
      <div className="bg-[#BAD799] text-[#084C20] rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold mb-4">Upload Evidence</h3>
        <p className="text-base">
          Attach images or videos of the threats to provide additional evidence and context for our response team.
        </p>
      </div>
      {/* Feature 4 */}
      <div className="bg-[#BAD799] text-[#084C20] rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-2xl font-semibold mb-4">Real-Time Monitoring</h3>
        <p className="text-base">
          Your reports directly feed into our monitoring systems, ensuring rapid identification of high-risk areas.
        </p>
      </div>
    </div>

    <p className="text-sm text-[#BAD799] mt-8 italic">
      All reports are processed confidentially. Together, we can make a significant impact in conserving wildlife.
    </p>

    <button 
      className="mt-8 px-6 py-3 bg-[#6DBE47] text-[#237414] font-semibold rounded-md hover:bg-[#84C16B] transition duration-300"
      onClick={() => window.location.href = "/report"}
    >
      Report Now
    </button>
  </div>
</section>

        {/* Community Section */}
<section className="bg-[#BAD799] text-[#081707] py-16">
  <div className="max-w-7xl mx-auto px-6">
    {/* Title and Introduction */}
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-4">Join the Community</h2>
      <p className="text-lg">
        Connect with wildlife enthusiasts and conservationists from around the globe. Explore, learn, and contribute to a better future for wildlife.
      </p>
    </div>

    {/* Interactive Sections */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Photo Gallery */}
      <div className="group relative">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#237414] to-[#6DBE47] opacity-20 rounded-lg group-hover:opacity-40 transition-opacity duration-300"
        ></div>
        <div className="relative z-10 p-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Photo Gallery</h3>
          <p className="text-sm mb-6">
            Immerse yourself in stunning wildlife imagery shared by community members.
          </p>
          <button
            onClick={() => window.location.href = "/gallery"}
            className="px-6 py-3 bg-[#237414] text-white rounded-md hover:bg-[#1D5D0F] transition duration-300"
          >
            Explore Gallery
          </button>
        </div>
      </div>

      {/* Wildlife Guides */}
      <div className="group relative">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#BAD799] to-[#84C16B] opacity-20 rounded-lg group-hover:opacity-40 transition-opacity duration-300"
        ></div>
        <div className="relative z-10 p-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Wildlife Guides</h3>
          <p className="text-sm mb-6">
            Access comprehensive guides on wildlife species and sustainable conservation practices.
          </p>
          <button
            onClick={() => window.location.href = "/guides"}
            className="px-6 py-3 bg-[#6DBE47] text-[#237414] rounded-md hover:bg-[#84C16B] transition duration-300"
          >
            View Guides
          </button>
        </div>
      </div>

      {/* Connect with Like-Minded People */}
      <div className="group relative">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#6DBE47] to-[#237414] opacity-20 rounded-lg group-hover:opacity-40 transition-opacity duration-300"
        ></div>
        <div className="relative z-10 p-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Connect with Others</h3>
          <p className="text-sm mb-6">
            Join discussions, share ideas, and collaborate with like-minded individuals passionate about wildlife conservation.
          </p>
          <button
            onClick={() => window.location.href = "/community"}
            className="px-6 py-3 bg-[#237414] text-white rounded-md hover:bg-[#1D5D0F] transition duration-300"
          >
            Join the Forum
          </button>
        </div>
      </div>
    </div>

    {/* Call-to-Action */}
    <div className="text-center mt-12">
      <p className="text-sm italic text-[#084C20]">
        Together, we can create a safe haven for wildlife. Be a part of the change.
      </p>
    </div>
  </div>
</section>


        {/* Features Section */}
<section className="bg-[#237414] text-[#BAD799] py-16">
  <div className="max-w-7xl mx-auto px-6 text-center">
    {/* Section Heading */}
    <div className="mb-12">
      <h2 className="text-4xl font-bold mb-6">Explore Features</h2>
      <p className="text-lg">
        Discover innovative tools to track wildlife, detect threats, and protect biodiversity with cutting-edge technology.
      </p>
    </div>

    {/* Feature Highlights */}
    <div className="relative">
      {/* Arched Path */}
      <div className="absolute inset-x-0 top-0 transform translate-y-10 md:translate-y-20 flex justify-between items-center">
        {/* Arcs */}
        <div className="w-32 h-32 bg-[#BAD799] rounded-full opacity-20"></div>
        <div className="w-64 h-64 bg-[#6DBE47] rounded-full opacity-30"></div>
        <div className="w-32 h-32 bg-[#BAD799] rounded-full opacity-20"></div>
      </div>

      {/* Feature 1: Flora and Fauna Detection */}
      <div className="relative flex flex-col items-center md:flex-row md:justify-between md:space-x-12 py-16">
        <div className="md:w-1/2 px-6 order-2 md:order-1">
          <h3 className="text-3xl font-bold mb-4">Flora and Fauna Detection</h3>
          <p className="text-lg mb-6">
            Use advanced detection tools to identify plant species and track animal populations. Help map biodiversity hotspots and protect habitats effectively.
          </p>
          <button
            onClick={() => window.location.href = "/features/florafauna"}
            className="px-6 py-3 bg-[#6DBE47] text-white font-semibold rounded-md hover:bg-[#1D5D0F] transition duration-300"
          >
            Explore Flora & Fauna
          </button>
        </div>
        <div className="md:w-1/2 order-1 md:order-2">
  <div className="relative w-100 h-64 bg-gradient-to-br from-[#6DBE47] to-[#237414] rounded-lg overflow-hidden shadow-lg mx-auto">
    <img
      src="https://images.unsplash.com/photo-1547581849-38ba650ad0de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvcnNlfGVufDB8MHwwfHx8MA%3D%3D"
      alt="Flora Fauna Detection"
      className="absolute inset-0 w-full h-full object-cover"
    />
  </div>
</div>

      </div>

      {/* Feature 2: Wildfire Camera Detection */}
      <div className="relative flex flex-col items-center md:flex-row md:justify-between md:space-x-12 py-16">
        <div className="md:w-1/2 px-6">
          <div className="relative w-100 h-64 bg-gradient-to-br from-[#BAD799] to-[#6DBE47] rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1536245344390-dbf1df63c30a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2lsZGZpcmV8ZW58MHwwfDB8fHww"
              alt="Wildfire Detection"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="md:w-1/2 px-6">
          <h3 className="text-3xl font-bold mb-4">Wildfire Camera Detection</h3>
          <p className="text-lg mb-6">
            Leverage cutting-edge camera systems to monitor and detect wildfires in real-time. Protect ecosystems from the devastating impacts of wildfires.
          </p>
          <button
            onClick={() => window.location.href = "/features/wildfire"}
            className="px-6 py-3 bg-[#6DBE47] text-white font-semibold rounded-md hover:bg-[#1D5D0F] transition duration-300"
          >
            Learn About Wildfire Detection
          </button>
        </div>
      </div>
    </div>

    {/* Call-to-Action */}
    <div className="mt-12">
      <p className="text-sm italic">
        These features are designed to empower individuals and organizations to safeguard biodiversity and wildlife. Join us in this mission today!
      </p>
    </div>
  </div>
</section>


        {/* About Us Section */}
<section className="bg-gradient-to-br from-[#BAD799] to-[#8AAC8B] text-[#081707] py-16">
  <div className="text-center max-w-5xl mx-auto px-6">
    {/* Section Heading */}
    <h2 className="text-4xl font-bold mb-6">About Us</h2>
    <p className="text-lg mb-8">
      We are a passionate team of conservationists, technologists, and nature enthusiasts
      dedicated to protecting wildlife and preserving biodiversity for future generations.
    </p>

    {/* Core Values */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      <div className="rounded-lg shadow-lg p-6 bg-gradient-to-br from-[#6DBE47] to-[#84C16B]">
        <h3 className="text-2xl font-bold text-[#081707] mb-4">Our Mission</h3>
        <p>
          To build a world where humans and wildlife coexist harmoniously by fostering awareness,
          implementing innovative tools, and enabling global conservation efforts.
        </p>
      </div>
      <div className="rounded-lg shadow-lg p-6 bg-gradient-to-br from-[#84C16B] to-[#BAD799]">
        <h3 className="text-2xl font-bold text-[#081707] mb-4">Our Approach</h3>
        <p>
          Combining cutting-edge technology, community engagement, and research-driven solutions
          to tackle the challenges of habitat loss, climate change, and wildlife protection.
        </p>
      </div>
      <div className="rounded-lg shadow-lg p-6 bg-gradient-to-br from-[#8AAC8B] to-[#6DBE47]">
        <h3 className="text-2xl font-bold text-[#081707] mb-4">Our Impact</h3>
        <p>
          With every project, we aim to restore ecosystems, protect endangered species, and inspire
          a global movement for sustainable coexistence.
        </p>
      </div>
    </div>

    {/* Call-to-Action */}
    <div className="mt-12">
      <p className="text-lg mb-6">
        Join us on this journey to create a greener, safer planet for all living beings.
      </p>
      <button className="px-8 py-4 bg-[#237414] text-[#BAD799] font-bold rounded-lg hover:bg-[#1D5D0F] transition duration-300">
        Get to Know Us
      </button>
    </div>
  </div>
</section>

      </main>

      <Chatbot />
    </div>
  );
}
