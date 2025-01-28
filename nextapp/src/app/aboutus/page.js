"use client";

import React from "react";
import { Users, Target, Heart } from "lucide-react"; // For icons
import { useState, useEffect } from "react";
import Loader from "../components/common/Loader";  

function AboutUs() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Simulate loading time
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-900 text-teal-100">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 bg-cover bg-center" style={{ backgroundImage: 'url("./images/smoke_hands.jpg")' }}>
        {/* Overlay to improve text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-teal-100">
            About <span className="text-teal-200">Us</span>
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl leading-relaxed animate-fadeIn text-teal-100">
            We are a team committed to making a difference. By empowering
            communities, fostering innovation, and addressing global challenges,
            we aim to create a better tomorrow for everyone.
          </p>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="px-6 py-16 bg-teal-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="flex flex-col justify-center items-start text-left space-y-6 animate-slideLeft">
            <h2 className="text-3xl font-semibold text-teal-200 flex items-center space-x-3">
              <Target className="text-teal-300 h-8 w-8" /> 
              <span>Our Vision</span>
            </h2>
            <p className="text-lg leading-relaxed text-teal-100">
              To create a world where equality, sustainability, and community
              well-being thrive. We envision a future where no one is left
              behind, and everyone has access to opportunities.
            </p>
          </div>

          {/* Mission */}
          <div className="flex flex-col justify-center items-start text-left space-y-6 animate-slideRight">
            <h2 className="text-3xl font-semibold text-teal-200 flex items-center space-x-3">
              <Heart className="text-teal-300 h-8 w-8" />
              <span>Our Mission</span>
            </h2>
            <p className="text-lg leading-relaxed text-teal-100">
              Through collaboration, innovation, and advocacy, we aim to tackle
              pressing issues and deliver impactful solutions. Our mission is to
              inspire change and transform lives across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-teal-700">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-teal-100 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member */}
            {["Jane Doe", "John Smith", "Emily Johnson"].map((member, index) => (
              <div
                key={index}
                className="bg-teal-600 rounded-lg shadow-lg p-6 hover:scale-105 transform transition duration-300 animate-fadeIn"
              >
                <img
                  src={`/images/team-member-${index + 1}.jpg`}
                  alt={member}
                  className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-teal-200"
                />
                <h3 className="text-xl font-semibold text-teal-100">{member}</h3>
                <p className="text-teal-200 text-sm">
                  {index === 0
                    ? "Founder & CEO"
                    : index === 1
                    ? "Project Lead"
                    : "Community Manager"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 text-center bg-teal-600">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-teal-100 mb-4">
            Join Us in Creating Change
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-teal-200 mb-8 animate-fadeIn">
            Whether you want to volunteer, donate, or simply spread the word,
            your support matters. Together, we can make an impact that lasts
            generations.
          </p>
          <a
            href="#get-involved"
            className="px-8 py-4 bg-teal-800 text-teal-100 rounded-lg text-lg font-semibold shadow-md hover:bg-teal-700 transition-transform duration-300"
          >
            Get Involved
          </a>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
