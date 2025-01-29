"use client";

import React from "react";
import Link from "next/link";

function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#BAD799] text-[#081707] px-4">
      <div className="text-center">
        {/* 404 Graphic */}
        <div className="mb-6">
          <span className="text-9xl md:text-[10rem] font-extrabold text-[#6DBE47] select-none animate-pulse">
            404
          </span>
        </div>
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
          Oops! Page Not Found
        </h2>
        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#237414] mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        {/* Button */}
        <Link href="/" legacyBehavior>
          <a className="px-8 py-4 bg-[#6DBE47] text-white rounded-full text-lg sm:text-xl md:text-2xl shadow-lg hover:bg-[#237414] hover:shadow-xl transition-all duration-300">
            Back to Home
          </a>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
