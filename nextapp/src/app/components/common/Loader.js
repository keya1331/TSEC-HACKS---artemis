"use client";

import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#BAD799] text-[#081707]">
      {/* Animated Turtle Icon */}
      <div className="turtle-animation mb-6">
        🐢
      </div>

      {/* Smooth Rotating Ring */}
      <div className="loader mb-6">
        <div className="ring"></div>
      </div>

      {/* Loading Text */}
      <p className="text-xl sm:text-2xl font-semibold text-[#237414]">
        Hold tight, we’re loading your experience...
      </p>

      {/* Animation Styles */}
      <style jsx>{`
        .turtle-animation {
          font-size: 48px;
          animation: move-turtle 2s ease-in-out infinite;
        }

        .loader {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
        }

        .ring {
          width: 64px;
          height: 64px;
          border: 6px solid transparent;
          border-top: 6px solid #6DBE47; /* Apple color for the loader */
          border-radius: 50%;
          animation: spin 1.2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes move-turtle {
          0% {
            transform: translateX(-10px);
          }
          50% {
            transform: translateX(10px);
          }
          100% {
            transform: translateX(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
