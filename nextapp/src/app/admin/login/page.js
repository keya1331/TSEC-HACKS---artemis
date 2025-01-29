"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    identifier: false,
    password: false,
  });

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const mobileRegex = /^\d{10}$/;

    if (!formData.identifier) {
      newErrors.identifier = "Email or Mobile Number is required.";
    } else if (!emailRegex.test(formData.identifier) && !mobileRegex.test(formData.identifier)) {
      newErrors.identifier = "Invalid Email or Mobile Number.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors.");
      return;
    }

    try {
      toast.loading("Sending OTP...");
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.identifier }),
      });
      const data = await response.json();
      toast.dismiss();
      if (data.success) {
        setIsOtpSent(true);
        localStorage.setItem("otp", data.otp);
        localStorage.setItem("otpExpiry", Date.now() + 2 * 60 * 1000); // 2 minutes expiry
        toast.success("OTP sent to your email.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#BAD799] to-[#8FCB81] px-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#1A5F10] text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Identifier Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email or Mobile</label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A5F10] focus:outline-none"
              placeholder="Enter Email or Mobile Number"
            />
            {errors.identifier && <p className="text-red-500 text-xs mt-1">{errors.identifier}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A5F10] focus:outline-none"
              placeholder="Enter Password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Send OTP Button */}
          {!isOtpSent && (
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#1A5F10] text-[#BAD799] font-semibold rounded-lg shadow-md hover:bg-[#14470D] transition-all duration-300"
            >
              Send OTP
            </button>
          )}
        </form>

        {/* OTP Verification */}
        {isOtpSent && (
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A5F10] focus:outline-none"
                placeholder="Enter OTP"
              />
              {otpError && <p className="text-red-500 text-xs mt-1">{otpError}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#1A5F10] text-[#BAD799] font-semibold rounded-lg shadow-md hover:bg-[#14470D] transition-all duration-300"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* Signup & Forgot Password */}
        <p className="text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-[#1A5F10] hover:text-[#14470D] font-semibold">
            Sign Up
          </Link>
        </p>
        <p className="text-center mt-2 text-sm">
          <Link href="/auth/forgot-password" className="text-[#1A5F10] hover:text-[#14470D] font-semibold">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}
