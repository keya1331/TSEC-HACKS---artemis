import React from "react";
import Link from "next/link";

function Unauthorised() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#BAD799] text-[#081707] px-4">
      {/* Error Title */}
      <h1 className="text-4xl sm:text-6xl font-bold text-[#6DBE47] mb-6 animate-pulse">
        401 Unauthorized Access
      </h1>

      {/* Error Message */}
      <p className="text-lg sm:text-xl text-[#237414] mb-8 text-center max-w-lg">
        Oops! You don't have permission to access this page. Please log in or
        sign up to continue.
      </p>

      {/* Login/Signup Link */}
      <Link href="/auth/login">
        <a className="px-6 py-3 bg-[#6DBE47] text-white rounded-md text-lg sm:text-xl shadow-lg hover:bg-[#237414] hover:scale-105 transition-transform duration-300">
          Go to Login/Signup Page
        </a>
      </Link>
    </div>
  );
}

export default Unauthorised;
