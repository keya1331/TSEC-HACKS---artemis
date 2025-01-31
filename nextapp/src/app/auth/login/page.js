"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocation } from "@/contexts/LocationContext";
import LocationPermissionModal from '@/components/LocationPermissionModal';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [actualOtp, setActualOtp] = useState("");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);

  const router = useRouter();
  const { startTracking } = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const mobileRegex = /^\d{10}$/;

    if (!formData.identifier) {
      newErrors.identifier = "Email or Mobile Number is required.";
    } else if (
      !emailRegex.test(formData.identifier) &&
      !mobileRegex.test(formData.identifier)
    ) {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.identifier }),
      });
      const data = await response.json();
      toast.dismiss();
      if (data.success) {
        setIsOtpSent(true);
        setActualOtp(data.otp); // Store the actual OTP sent
        toast.success("OTP sent to your email.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleLocationAllow = async () => {
    const success = await startTracking();
    if (success) {
      setLocationGranted(true);
      setShowLocationModal(false);
      // Proceed with login
      completeLogin();
    }
  };

  const handleLocationDeny = () => {
    toast.error('Location access is required to use this application');
    setShowLocationModal(false);
    // Optionally redirect to homepage or show error state
    router.push('/');
  };

  const completeLogin = async () => {
    // Existing login logic
    toast.success("Login successful!");
    localStorage.setItem("userEmail", formData.identifier);
    router.push("/");
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otp !== actualOtp) {
      setOtpError("Invalid OTP. Please try again.");
      return;
    }

    // Show location permission modal after OTP verification
    setShowLocationModal(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081707] text-[#081707] px-4">
      <div className="bg-[#F5F5F5] p-8 rounded-lg shadow-xl w-full max-w-md border border-[#6DBE47]">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-[#237414] tracking-wide">
          Welcome Back
        </h2>
        <p className="text-sm text-[#081707] text-center mb-8">
          Log in to your account and start your journey.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#081707]">
              Email or Mobile
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 bg-[#BAD799] border border-[#6DBE47] rounded-lg focus:ring-2 focus:ring-[#8AAC8B] text-[#081707]"
              placeholder="Enter Email or Mobile Number"
              required
            />
            {errors.identifier && (
              <p className="text-red-500 text-xs mt-2">{errors.identifier}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#081707]">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 bg-[#BAD799] border border-[#6DBE47] rounded-lg focus:ring-2 focus:ring-[#8AAC8B] text-[#081707]"
              placeholder="Enter Password"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-2">{errors.password}</p>
            )}
          </div>
          {!isOtpSent && (
            <button
              type="submit"
              className="w-full py-3 bg-[#6DBE47] text-white font-semibold rounded-lg shadow hover:bg-[#237414] focus:ring-2 focus:ring-[#8AAC8B] transition"
            >
              Send OTP
            </button>
          )}
        </form>

        {isOtpSent && (
          <form onSubmit={handleOtpSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#081707]">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-2 block w-full px-4 py-3 bg-[#BAD799] border border-[#6DBE47] rounded-lg focus:ring-2 focus:ring-[#8AAC8B] text-[#081707]"
                placeholder="Enter OTP"
                required
              />
              {otpError && (
                <p className="text-red-500 text-xs mt-2">{otpError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#6DBE47] text-white font-semibold rounded-lg shadow hover:bg-[#237414] focus:ring-2 focus:ring-[#8AAC8B] transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-[#081707]">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-[#237414] hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="text-sm mt-2">
            <Link
              href="/auth/forgot-password"
              className="text-[#237414] hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
      {showLocationModal && (
        <LocationPermissionModal
          onAllow={handleLocationAllow}
          onDeny={handleLocationDeny}
        />
      )}
    </div>
  );
}