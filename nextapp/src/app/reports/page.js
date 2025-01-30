"use client";

import React from "react";
import { FaLeaf, FaFire, FaNewspaper, FaCat } from "react-icons/fa";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3c6e38] to-[#d8e3a6] flex flex-col items-center text-[#084C20] pt-20 px-8">
      <h1 className="text-5xl font-extrabold text-center mb-12">Log an Incident</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full mb-12">
        {/* Anonymous Threats */}
        <Link href="/reports/threat" passHref>
          <div className="border border-black bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <FaNewspaper className="text-6xl text-[#2F6B2F] mb-4" />
              <h2 className="text-2xl font-bold mb-2">Anonymous Threats</h2>
              <p className="text-lg text-gray-700">
                Report anonymous threats to wildlife and contribute to safeguarding biodiversity without revealing your identity.
              </p>
            </div>
          </div>
        </Link>

        {/* NGO - Animal Disease Detection */}
        <Link href="/reports/disease" passHref>
          <div className="border border-black bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105">
            <div className="flex flex-col items-center text-center">
              <FaCat className="text-6xl text-[#2F6B2F] mb-4" />
              <h2 className="text-2xl font-bold mb-2">NGO - Animal Disease Detection</h2>
              <p className="text-lg text-gray-700">
                Safeguarding animal health through early disease detection and proactive care.
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Blogs Section */}
      <h2 className="text-4xl font-bold text-center mb-8">Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl w-full">
        {[...Array(15)].map((_, index) => (
          <div key={index} className="border border-black bg-white p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">Wildlife Blog {index + 1}</h3>
            <p className="text-sm text-gray-700">
              Insights and updates on wildlife conservation, threats, and sustainable initiatives.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
