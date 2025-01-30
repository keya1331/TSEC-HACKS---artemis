"use client";

import { redirect } from "next/dist/server/api-utils";
import React, { useState } from "react";
import { FaPaw, FaMapMarkedAlt, FaBullhorn, FaFireExtinguisher } from "react-icons/fa";

export default function AdminDashboard() {
  const [patrolOfficers, setPatrolOfficers] = useState([]);

  const highlights = [
    {
      title: "Satellite-based Wildfire Monitoring",
      description: "Monitor wildlife movements and threats.",
      icon: <FaFireExtinguisher className="text-4xl text-[#081707]" />,
      bgGradient: "bg-gradient-to-r from-[#93d36b] to-[#7fc257]",
      redirect: "/",
    },
    {
      title: "Map Navigation",
      description: "Navigate and analyze wildlife hotspots.",
      icon: <FaMapMarkedAlt className="text-4xl text-black" />,
      bgGradient: "bg-gradient-to-r from-[#a7d97e] to-[#92c76b]",
      redirect: "/admin/threats",
    },
    {
      title: "Broadcast Alerts",
      description: "Share updates and conservation news.",
      icon: <FaBullhorn className="text-4xl text-[#081707]" />,
      bgGradient: "bg-gradient-to-r from-[#84c16b] to-[#72b059]",
      redirect: "/admin/broadcast",
    },
  ];

  const photos = [
    "https://images.unsplash.com/photo-1708495798460-f39291f80323?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aWxkbGlmZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    "https://images.unsplash.com/photo-1470770903676-69b98201ea1c",
    "https://images.unsplash.com/photo-1560807707-8cc77767d783",
    "https://images.unsplash.com/photo-1581852017103-68ac65514cf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlcGhhbnR8ZW58MHx8MHx8fDA%3D",
  ];

  const fetchPatrolOfficers = async () => {
    try {
      const response = await fetch("/api/admin/rangers/get");
      const data = await response.json();
      setPatrolOfficers(data.data);
    } catch (error) {
      console.error("Error fetching patrol officers:", error);
    }
  };

  const handleRangerSelect = async (ranger) => {
    console.log("Selected Ranger:", ranger);

    try {
      const response = await fetch("/api/admin/rangers/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: ranger.email }),
      });

      const result = await response.json();
      console.log("API Response:", result);
    } catch (error) {
      console.error("Error sending ranger data:", error);
    }
  };
  
  return (
    <div className="pt-32 min-h-screen bg-gradient-to-br from-[#21371a] via-[#c8d796] to-[#b0c578] p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-center text-[#081707]">
            ADMIN DASHBOARD
          </h1>
          <p className="text-center text-lg text-[#081707] mt-2">
            Manage wildlife tracking, reports, and conservation updates.
          </p>
        </header>

        {/* Highlights Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {highlights.map((highlight, index) => (
            <button onClick={() => (window.location.href = highlight.redirect)}
              key={index}
              className={`${highlight.bgGradient} p-6 rounded-xl shadow-lg flex items-center hover:scale-105 transform transition-all duration-300`}
            >
              <div className="mr-4">{highlight.icon}</div>
              <div>
                <h2 className="text-lg font-semibold text-[#081707]">
                  {highlight.title}
                </h2>
                <p className="text-sm text-[#081707]">
                  {highlight.description}
                </p>
              </div>
            </button>
          ))}
        </section>

        {/* Wildlife Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <button onClick={() => (window.location.href = "/features/florafauna/form")} className="bg-gradient-to-r from-[#93d36b] to-[#7fc257] text-[#081707] p-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300">
            <h2 className="text-lg font-semibold mb-4">
              Total Wildlife Sightings
            </h2>
            <p className="text-4xl font-bold mb-4">1,245</p>
            <p className="text-sm">
              Track recent wildlife activity and updates.
            </p>
          </button>
          <button onClick={() => (window.location.href = "/reports/threat")} className="bg-gradient-to-r from-[#a7d97e] to-[#92c76b] text-black p-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300">
            <h2 className="text-lg font-semibold mb-4">Threat Reports</h2>
            <p className="text-4xl font-bold mb-4">87</p>
            <p className="text-sm">
              Monitor potential threats to wildlife habitats.
            </p>
          </button>
          <button onClick={() => (window.location.href = "/admin/satellite")} className="bg-gradient-to-r from-[#84c16b] to-[#72b059] text-[#081707] p-6 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300">
            <h2 className="text-lg font-semibold mb-4">
              Satellite-based Wildfire Monitoring
            </h2>
            <p className="text-4xl font-bold mb-4">15</p>
            <p className="text-sm">Stay updated with conservation efforts.</p>
          </button>
        </section>

        {/* Fetch Patrol Officers Button */}
        <div className="text-center mb-10">
          <button
            onClick={fetchPatrolOfficers}
            className="px-6 py-3 bg-[#6DBE47] text-white font-semibold rounded-md hover:bg-[#237414] transition duration-300"
          >
            Fetch Patrol Officers
          </button>
        </div>

        {/* Display Patrol Officers */}
        {patrolOfficers.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-center text-[#081707] mb-4">
              Patrol Officers
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
                      Mobile No
                    </th>
                    <th className="py-2 px-4 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patrolOfficers.map((officer) => (
                    <tr
                      key={officer._id}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleRangerSelect(officer)}
                    >
                      <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">
                        {officer.name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">
                        {officer.email}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">
                        {officer.mobileno}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-700">
                        {officer.isBusy ? "Busy" : "Available"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Photo Highlights */}
        <section>
          <h2 className="text-2xl font-semibold text-[#081707] mb-6">
            Wildlife Highlights
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="relative h-40 bg-cover bg-center rounded-lg overflow-hidden shadow-md"
                style={{ backgroundImage: `url(${photo})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <p className="text-[white] font-semibold">Wildlife</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
