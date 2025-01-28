import Chatbot from "./components/common/Chatbot";

"use client";

import { useState, useEffect } from "react";
import Loader from "./components/common/Loader";
import { motion } from "framer-motion";

export default function Home() {
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
    <>
      <div className="relative h-screen">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{
            backgroundImage: "url('./images/smoke_hands.jpg')", // Replace this with your background image URL
          }}
        ></div>

        {/* Foreground Content with Animation */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 bg-black/60 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-teal-100">
            Join the <span className="text-teal-200">Movement</span>
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mb-6">
            Together, we can create a better tomorrow. Empower communities, save
            nature, and foster change for a brighter future.
          </p>
          <a
            href="#learn-more"
            className="px-6 py-3 bg-teal-600 text-lg font-semibold rounded-md hover:bg-teal-700 transition duration-300"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {/* Parallax Section with Animation */}
      <motion.section
        className="h-screen flex items-center justify-center bg-teal-950 text-white px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="max-w-3xl text-center">
          <h2 className="text-4xl font-semibold mb-4">Why We Care</h2>
          <p className="text-lg md:text-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            interdum suscipit dolor, non facilisis nisi varius in. Ut ut neque
            nec odio dictum aliquet. Nulla facilisi. Suspendisse id arcu at
            augue faucibus sodales a at quam. Vivamus at elit nunc. Integer
            elementum, nibh vel euismod fringilla, lorem felis bibendum nunc,
            nec commodo magna justo a metus. Nulla facilisi.
          </p>
        </div>
      </motion.section>

      {/* Another Parallax Section with Animation */}
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-center"
          style={{
            backgroundImage: "url('./images/smoke_hands.jpg')", // Replace this with your background image URL
          }}
        ></div>
        <motion.div
          className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 bg-black/50 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Together, We Can Make a Difference
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mb-6">
            Nulla facilisi. Suspendisse id arcu at augue faucibus sodales a at
            quam. Vivamus at elit nunc. Integer elementum, nibh vel euismod
            fringilla.
          </p>
          <a
            href="#donate-now"
            className="px-6 py-3 bg-teal-600 text-lg font-semibold rounded-md hover:bg-teal-700 transition duration-300"
          >
            Donate Now
          </a>
        </motion.div>
      </div>
    </>
  );
}
