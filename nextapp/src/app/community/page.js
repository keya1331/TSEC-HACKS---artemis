"use client";

import React from "react";
import { FaPaw, FaTree, FaTemperatureHigh, FaSkull, FaSmog } from "react-icons/fa";

export default function Community() {
  return (
    <div className="bg-gradient-to-br from-[#d8e3a6] to-[#b0c578] min-h-screen text-[#084C20]">
      {/* Section 1: Wildlife Species Spotlight */}
      <section className="py-16 bg-gradient-to-b from-[#4a803d] to-[#c8d796]">
      <h2 className="text-4xl font-bold text-center mb-12">Wildlife Species Spotlight</h2>
      
      <div className="flex flex-wrap justify-center gap-8">
        {[
          { name: "Asian Elephant", image: "https://images.unsplash.com/photo-1603860785202-70ee34aa7b68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGVsZXBoYW50c3xlbnwwfHwwfHx8MA%3D%3D", info: "Known for its intelligence and strength, found in dense forests across Asia." },
          { name: "Bengal Tiger", image: "https://images.unsplash.com/photo-1598214325784-4b28e27e64e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVuZ2FsJTIwdGlnZXJ8ZW58MHx8MHx8fDA%3D", info: "A majestic predator, primarily found in India’s Sundarbans and national parks." },
          { name: "Green Sea Turtle", image: "https://images.unsplash.com/photo-1558216629-a2f7fe856792?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjBzZWElMjB0dXJ0bGV8ZW58MHx8MHx8fDA%3D", info: "A vital species for marine ecosystems, found in tropical and subtropical waters." },
          { name: "Scarlet Macaw", image: "https://images.unsplash.com/photo-1616902509409-a624c4f31a56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2NhcmxldCUyMG1hY2F3fGVufDB8fDB8fHww", info: "Brightly colored parrot species, native to Central and South American rainforests." },
          { name: "Orchid Mantis", image: "https://www.sunnysports.com/blog/wp-content/uploads/2015/12/orchid-mantis-feature.jpg", info: "An insect camouflaged as an orchid flower, found in tropical Asia." },
          { name: "Polar Bear", image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9sYXIlMjBiZWFyfGVufDB8fDB8fHww", info: "An apex predator of the Arctic, affected by melting sea ice." },
          { name: "Baobab Tree", image: "https://images.unsplash.com/photo-1618754141737-4b59b3130ab1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFvYmFiJTIwdHJlZXxlbnwwfHwwfHx8MA%3D%3D", info: "Known as the 'Tree of Life', found in Africa and capable of storing thousands of liters of water." },
          { name: "Axolotl", image: "https://www.journee-mondiale.com/en/wp-content/uploads/2024/10/msg_01KCnPgW74LQHnmmNKLuJS3J.webp", info: "An aquatic salamander known for its unique ability to regenerate limbs, native to Mexico." },
          { name: "Coral Reefs", image: "https://images.unsplash.com/photo-1515555585025-54136276b6e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29yYWwlMjByZWVmc3xlbnwwfHwwfHx8MA%3D%3D", info: "Vital marine ecosystems that support a vast array of aquatic life, threatened by climate change." },
          { name: "Amur Leopard", image: "https://images.unsplash.com/photo-1544985361-b420d7a77043?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW11ciUyMGxlb3BhcmR8ZW58MHx8MHx8fDA%3D", info: "One of the world's rarest big cats, found in the temperate forests of eastern Russia and northeastern China." }

        ].map((species, index) => (
          <div
            key={index}
            className={`relative bg-[#084C20] shadow-lg rounded-lg w-60 p-4 transform transition-all duration-300 hover:scale-105
              ${index % 2 === 0 ? "rotate-3" : "-rotate-3"} group`}
          >
            <img
              src={species.image}
              alt={species.name}
              className="w-full h-60 object-cover rounded-lg border-4 border-[#c8d796]"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 p-4 rounded-lg">
              <p className="text-white text-center text-sm">{species.info}</p>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-bold text-[#c8d796]">{species.name}</h3>
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
      { date: "2020", title: "Forest Rejuvenation", description: "Replanted 10,000 trees across degraded forest lands.", image: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9yZXN0JTIwcmVqdXZpbmF0aW9ufGVufDB8fDB8fHww", icon: "/icons/camp1.png" },
      { date: "2021", title: "Anti-Poaching Drive", description: "Engaged 50+ communities to combat illegal wildlife trade.", image: "https://images.unsplash.com/photo-1535338454770-8be927b5a00b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW50aSUyMHBvYWNoaW5nfGVufDB8fDB8fHww", icon: "/icons/camp2.png" },
      { date: "2022", title: "Marine Cleanup", description: "Removed 5 tons of plastic from coastal regions.", image: "https://sanctuaries.noaa.gov/media/img/20170823-papahanaumokuakea-marine-debris-cleanup-1200.jpg", icon: "/icons/camp3.png" },
      { date: "2023", title: "Climate Awareness", description: "Conducted climate education in 100 schools.", image: "https://images.unsplash.com/photo-1552799446-159ba9523315?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2xpbWF0ZSUyMGF3YXJlbmVzc3xlbnwwfHwwfHx8MA%3D%3D", icon: "/icons/camp4.png" },
    ].map((event, index) => (
      <div key={index} className="relative z-10 w-40 text-center mx-8 group">
        {/* Custom Icon for Timeline */}
        <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
          <img src={event.icon} alt={event.title} className="w-10 h-10" />
        </div>
        {/* Pop-up Details on Hover */}
<div className="absolute top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-4 transition-all duration-300">
  <div className="bg-white p-4 rounded-lg shadow-lg w-60 h-60 flex flex-col items-center justify-center">
    <img
      src={event.image}
      alt={event.title}
      className="w-16 h-16 object-cover rounded-md mb-2"
    />
    <h3 className="text-lg font-bold text-center">{event.title}</h3>
    <p className="text-sm text-center">{event.date}</p>
    <p className="text-sm text-gray-600 mt-1 text-center">{event.description}</p>
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
    {
  [
    "Xx9pc9c-mGQ", // Example video 1
    "E4JKRaxr8zE", // Example video 2
    "Zyq4-OW7-jM", // Example video 3
    "pq6XDdzMK-8", // Example video 4
    "2MmIWQJ0820", // Example video 5
    "IJordrkQaWM", // Example video 6
  ].map((videoId, index) => (
    <div
      key={index}
      className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
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
