"use client";

import React from "react";
import { FaPaw, FaTree, FaTemperatureHigh, FaSkull, FaSmog } from "react-icons/fa";

export default function Community() {
  return (
    <div className="bg-gradient-to-br from-[#d8e3a6] to-[#b0c578] min-h-screen text-[#084C20]">
      {/* Section 1: Wildlife Species Spotlight */}
      <section className="py-16 bg-[#c8d796]">
      <h2 className="text-4xl font-bold text-center mb-12">Wildlife Species Spotlight</h2>
      
      <div className="flex flex-wrap justify-center gap-8">
        {[
          { name: "Asian Elephant", image: "/images/elephant.jpg", info: "Known for its intelligence and strength, found in dense forests across Asia." },
          { name: "Bengal Tiger", image: "/images/tiger.jpg", info: "A majestic predator, primarily found in India’s Sundarbans and national parks." },
          { name: "Green Sea Turtle", image: "/images/turtle.jpg", info: "A vital species for marine ecosystems, found in tropical and subtropical waters." },
          { name: "Scarlet Macaw", image: "/images/macaw.jpg", info: "Brightly colored parrot species, native to Central and South American rainforests." },
          { name: "Orchid Mantis", image: "/images/orchid-mantis.jpg", info: "An insect camouflaged as an orchid flower, found in tropical Asia." },
          { name: "Polar Bear", image: "/images/polar-bear.jpg", info: "An apex predator of the Arctic, affected by melting sea ice." },
          { name: "Baobab Tree", image: "/images/baobab-tree.jpg", info: "Known as the 'Tree of Life', found in Africa and capable of storing thousands of liters of water." },
          { name: "Axolotl", image: "/images/axolotl.jpg", info: "An aquatic salamander known for its unique ability to regenerate limbs, native to Mexico." },
          { name: "Coral Reefs", image: "/images/coral-reef.jpg", info: "Vital marine ecosystems that support a vast array of aquatic life, threatened by climate change." },
          { name: "Amur Leopard", image: "/images/amur-leopard.jpg", info: "One of the world's rarest big cats, found in the temperate forests of eastern Russia and northeastern China." }

        ].map((species, index) => (
          <div
            key={index}
            className={`relative bg-white shadow-lg rounded-lg w-60 p-4 transform transition-all duration-300 hover:scale-105
              ${index % 2 === 0 ? "rotate-3" : "-rotate-3"} group`}
          >
            <img
              src={species.image}
              alt={species.name}
              className="w-full h-60 object-cover rounded-lg border-4 border-[#6DBE47]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 p-4 rounded-lg">
              <p className="text-white text-center text-sm">{species.info}</p>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-bold text-[#084C20]">{species.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>

      {/* Section 2: Threats to Wildlife */}
      <section className="py-16 bg-[#b0c578]">
        <h2 className="text-4xl font-bold text-center mb-12">Threats to Wildlife</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Deforestation", icon: FaTree, info: "The large-scale clearing of forests for agriculture, urbanization, and industrialization." },
            { title: "Poaching", icon: FaSkull, info: "Illegal hunting or capturing of wildlife, leading to the extinction of many species." },
            { title: "Climate Change", icon: FaTemperatureHigh, info: "Global warming disrupts habitats, forcing animals to migrate or face extinction." },
            { title: "Pollution", icon: FaSmog, info: "Contamination of ecosystems due to plastics, chemicals, and industrial waste." },
          ].map((threat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6 transform transition-all duration-300 hover:scale-105"
            >
              <threat.icon className="text-5xl text-[#6DBE47] mb-4" />
              <h3 className="text-xl font-bold mb-2">{threat.title}</h3>
              <p className="text-sm text-gray-700">{threat.info}</p>
            </div>
          ))}
        </div>
      </section>

     {/* Section 3: Awareness Camps */}
<section className="py-16 bg-[#c8d796]">
  <h2 className="text-4xl font-bold text-center mb-12">Awareness Camps</h2>
  <div className="relative flex items-center justify-center">
    {/* Thinner Horizontal Line (Timeline) */}
    <div className="absolute w-full h-0.5 bg-[#84C16B] top-1/2 transform -translate-y-1/2 z-0"></div>
    {[
      { date: "2020", title: "Forest Rejuvenation", description: "Replanted 10,000 trees across degraded forest lands.", image: "/images/camp1.jpg", icon: "/icons/camp1.png" },
      { date: "2021", title: "Anti-Poaching Drive", description: "Engaged 50+ communities to combat illegal wildlife trade.", image: "/images/camp2.jpg", icon: "/icons/camp2.png" },
      { date: "2022", title: "Marine Cleanup", description: "Removed 5 tons of plastic from coastal regions.", image: "/images/camp3.jpg", icon: "/icons/camp3.png" },
      { date: "2023", title: "Climate Awareness", description: "Conducted climate education in 100 schools.", image: "/images/camp4.jpg", icon: "/icons/camp4.png" },
    ].map((event, index) => (
      <div key={index} className="relative z-10 w-40 text-center mx-8 group">
        {/* Custom Icon for Timeline */}
        <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
          <img src={event.icon} alt={event.title} className="w-10 h-10" />
        </div>
        {/* Pop-up Details on Hover */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-4 transition-all duration-300">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img
              src={event.image}
              alt={event.title}
              className="w-24 h-24 object-cover rounded-md mx-auto mb-4"
            />
            <h3 className="text-lg font-bold">{event.title}</h3>
            <p className="text-sm">{event.date}</p>
            <p className="text-sm text-gray-600 mt-2">{event.description}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>



      {/* Section 4: Sustainability Guides */}
<section className="py-16 bg-[#b0c578] text-[#084c20]">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-bold mb-8">Sustainability Guides</h2>
    <p className="text-lg mb-8">
      Explore engaging videos that teach sustainability practices and highlight
      steps to conserve wildlife and protect ecosystems.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        "https://www.youtube.com/embed/DtMjJIoUZXE", // Example video 1
        "https://www.youtube.com/embed/VbzyDgf6QvI", // Example video 2
        "https://www.youtube.com/embed/PLKpnaJwAQo", // Example video 3
        "https://www.youtube.com/embed/4VJHR3Jf7nk", // Example video 4
        "https://www.youtube.com/embed/1z60-LI1-rg", // Example video 5
        "https://www.youtube.com/embed/RW7GkFRe5ps", // Example video 6
      ].map((link, index) => (
        <div
          key={index}
          className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
        >
          <iframe
            src={link}
            title={`Sustainability Guide Video ${index + 1}`}
            className="w-full h-56"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Section 5: Projects and Campaigns */}
      <section className="py-16 bg-[#8FCB81] text-[#084c20]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Projects, Campaigns, and Petitions</h2>
          <p className="text-lg mb-8">
            Join hands with us! Volunteer, sign petitions, and donate to ongoing projects that aim to make a difference in wildlife conservation.
          </p>
          <a
            href="#"
            className="inline-block px-8 py-4 bg-[#6DBE47] text-white rounded-lg font-bold hover:bg-[#5CAA3F] transition-all"
          >
            Get Involved
          </a>
        </div>
      </section>
    </div>
  );
}
