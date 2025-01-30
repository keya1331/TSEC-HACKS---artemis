"use client";

import React, { useState, useEffect } from "react";
import { Users, Target, Heart } from "lucide-react";
import Loader from "../components/common/Loader";

function AboutUs() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const imageUrls = [
    "https://example.com/image1.jpg", // Replace with your direct image URL
    "https://example.com/image2.jpg", // Replace with your direct image URL
    "https://example.com/image3.jpg", // Replace with your direct image URL
    "https://example.com/image4.jpg", // Replace with your direct image URL
    "https://example.com/image5.jpg", // Replace with your direct image URL
  ];
  return (
    <div className="bg-[#D8E3A6] text-[#14470D]">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6">
        <div className="absolute inset-0">
          {/* Floating Circles */}
          <div className="relative w-full h-full">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`absolute bg-[#BAD799] border-2 border-[#6DBE47] rounded-full shadow-md ${
                  i % 2 === 0 ? "w-32 h-32" : "w-40 h-40"
                } ${
                  i === 0
                    ? "top-10 left-10"
                    : i === 1
                    ? "top-20 right-20"
                    : i === 2
                    ? "bottom-20 left-1/4"
                    : i === 3
                    ? "bottom-10 right-1/3"
                    : "top-1/3 left-1/2"
                } flex items-center justify-center`}
                style={{
                  animation: `float ${4 + i}s ease-in-out infinite`,
                }}
              >
                <img
                  src={`/images/review-${i + 1}.jpg`}
                  alt={`Reviewer ${i + 1}`}
                  className="w-24 h-24 rounded-full border-4 border-[#6DBE47]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            About <span className="text-[#1A5F10]">Us</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-[#237414]">
            Empowering communities, fostering innovation, and addressing global
            challenges to build a brighter future.
          </p>
        </div>

        <style jsx>{`
          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}</style>
      </section>

      {/* Vision and Mission Section */}
      <section className="px-6 py-20 bg-[#BAD799]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#1A5F10] flex items-center space-x-3">
              <Target className="text-[#14470D] h-8 w-8" />
              <span>Our Vision</span>
            </h2>
            <p className="text-[#237414] text-lg leading-relaxed">
              To create a world where equality, sustainability, and community
              well-being thrive. A future where everyone has opportunities to
              succeed.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#1A5F10] flex items-center space-x-3">
              <Heart className="text-[#14470D] h-8 w-8" />
              <span>Our Mission</span>
            </h2>
            <p className="text-[#237414] text-lg leading-relaxed">
              Through collaboration and innovation, we address pressing issues
              to inspire meaningful change and transform lives globally.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#D8E3A6]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#1A5F10] mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {["Jane Doe", "John Smith", "Emily Johnson"].map((member, index) => (
              <div
                key={index}
                className="bg-[#BAD799] border border-[#6DBE47] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={`/images/team-member-${index + 1}.jpg`}
                  alt={member}
                  className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-[#6DBE47]"
                />
                <h3 className="text-xl font-semibold text-[#14470D]">
                  {member}
                </h3>
                <p className="text-[#237414] text-sm">
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
      <section className="px-6 py-20 text-center bg-[#1A5F10]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">
            Join Us in Creating Change
          </h2>
          <p className="text-lg leading-relaxed text-[#D8E3A6] mb-8">
            Your support matters. Volunteer, donate, or spread the word to make
            a lasting impact together.
          </p>
          <a
            href="#get-involved"
            className="inline-block px-8 py-4 bg-[#BAD799] text-[#1A5F10] rounded-lg text-lg font-medium shadow-md hover:bg-[#8FCB81] transition-transform duration-300"
          >
            Get Involved
          </a>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
