"use client";

import React from "react";
import { Crown } from "lucide-react"; // Install `lucide-react` for the crown icon.

const Loader = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-teal-900">
      {/* Breathing Effect for Crown */}
      <div className="crown-breathing">
        <Crown className="h-24 w-24 text-teal-200" />
      </div>
      {/* Loading Text */}
      <p className="mt-6 text-xl sm:text-2xl font-semibold text-teal-100">
        Hold tight, we’re loading your experience...
      </p>

      {/* Animation Styles */}
      <style jsx>{`
        .crown-breathing {
          animation: breathing 1.5s ease-in-out infinite;
        }

        @keyframes breathing {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
