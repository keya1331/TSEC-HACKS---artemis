import React from "react";
import Link from "next/link";

function Unauthorised() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-teal-900 px-4">
      {/* Error Title */}
      <h1 className="text-4xl sm:text-6xl font-bold text-teal-200 mb-6 animate-pulse">
        401 Unauthorized Access
      </h1>

      {/* Error Message */}
      <p className="text-lg sm:text-xl text-teal-100 mb-8 text-center max-w-lg">
        Oops! You don't have permission to access this page. Please log in or
        sign up to continue.
      </p>

      {/* Login/Signup Link */}
      <Link href="/auth/login">
        <a className="px-6 py-3 bg-teal-700 text-teal-100 rounded-md text-lg sm:text-xl shadow-lg hover:bg-teal-800 hover:scale-105 transition-transform duration-300">
          Go to Login/Signup Page
        </a>
      </Link>
    </div>
  );
}

export default Unauthorised;
