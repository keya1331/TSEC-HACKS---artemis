"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

let debounceTimeout;

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileno: "",
    password: "",
    repassword: "",
    aadharno: "",
  });
  const [errors, setErrors] = useState({});
  const [debouncedData, setDebouncedData] = useState(formData);
  const [loading, setLoading] = useState(false); // Track loading state
  const [otp, setOtp] = useState(""); // Store OTP input
  const [isOtpSent, setIsOtpSent] = useState(false); // Track if OTP is sent
  const [otpError, setOtpError] = useState(""); // Track OTP errors
  const validateForm = (data) => {
    const newErrors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;
    const mobileRegex = /^\d{10}$/;
    const aadharRegex = /^\d{12}$/;

    if (!data.name.trim()) newErrors.name = "Name is required";
    if (!emailRegex.test(data.email)) newErrors.email = "Invalid email address";
    if (!mobileRegex.test(data.mobileno))
      newErrors.mobileno = "Invalid 10-digit mobile number";
    if (data.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (data.password !== data.repassword)
      newErrors.repassword = "Passwords do not match";
    if (!aadharRegex.test(data.aadharno))
      newErrors.aadharno = "Invalid 12-digit Aadhar number";

    return newErrors;
  };

  useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      setErrors(validateForm(debouncedData));
    }, 1000); // Debounce delay of 1000ms

    return () => clearTimeout(debounceTimeout);
  }, [debouncedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setDebouncedData({ ...debouncedData, [name]: value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleGetOtp = async (e) => {
    e.preventDefault();
    const finalErrors = validateForm(formData);
    if (Object.keys(finalErrors).length === 0) {
      try {
        toast.loading("Sending OTP...", { id: "otp" });
        const response = await axios.post("/api/auth/send-otp", {
          email: formData.email,
        });
        if (response.status === 200) {
          setIsOtpSent(true);
          sessionStorage.setItem("otp", response.data.otp);
          sessionStorage.setItem("otpExpiry", Date.now() + 2 * 60 * 1000); // 2 minutes expiry
          toast.success("OTP sent to your email.", { id: "otp" });
        } else {
          toast.error("Failed to send OTP. Please try again.", { id: "otp" });
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "An error occurred. Please try again.",
          { id: "otp" }
        );
      }
    } else {
      setErrors(finalErrors);
      toast.error("Please fix the errors in the form");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedOtp = sessionStorage.getItem("otp");
    const otpExpiry = sessionStorage.getItem("otpExpiry");

    if (Date.now() > otpExpiry) {
      setOtpError("OTP has expired. Please request a new one.");
      return;
    }

    if (otp !== storedOtp) {
      setOtpError("Invalid OTP. Please try again.");
      return;
    }

    const finalErrors = validateForm(formData);
    if (Object.keys(finalErrors).length === 0) {
      setLoading(true); // Start loading
      toast.loading("Creating account...", { id: "signup" });
      try {
        const response = await axios.post("/api/auth/signup", formData);
        if (response.status === 201) {
          toast.success("Signup successful!", { id: "signup" });
          setFormData({
            name: "",
            email: "",
            mobileno: "",
            password: "",
            repassword: "",
            aadharno: "",
          });
          setErrors({});
          setIsOtpSent(false);
          setOtp("");
        } else {
          toast.error("Signup failed. Please try again.", { id: "signup" });
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "An error occurred. Please try again.",
          { id: "signup" }
        );
      } finally {
        setLoading(false); // End loading
      }
    } else {
      setErrors(finalErrors);
      toast.error("Please fix the errors in the form");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      <div className="container max-w-5xl bg-white rounded-xl shadow-lg flex flex-row overflow-hidden">
        {/* Left Section */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-800 text-white p-8 md:p-10 flex-1 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Welcome to the Portal!
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-6">
            Register to gain access to all government services.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="inline-block w-3.5 h-3.5 bg-white rounded-full mr-3 mt-1"></span>
              <p>Secure access to official services</p>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-3.5 h-3.5 bg-white rounded-full mr-3 mt-1"></span>
              <p>Easy-to-use interface</p>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-3.5 h-3.5 bg-white rounded-full mr-3 mt-1"></span>
              <p>Fast and reliable support</p>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="p-6 md:p-8 flex-1">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
            Sign Up
          </h2>
          <form onSubmit={isOtpSent ? handleSubmit : handleGetOtp} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-2">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="example@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobileno"
                value={formData.mobileno}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="1234567890"
              />
              {errors.mobileno && (
                <p className="text-red-500 text-xs mt-2">{errors.mobileno}</p>
              )}
            </div>

            {/* Aadhaar Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Aadhaar Number
              </label>
              <input
                type="text"
                name="aadharno"
                value={formData.aadharno}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="1234567890"
              />
              {errors.aadharno && (
                <p className="text-red-500 text-xs mt-2">{errors.aadharno}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="********"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-2">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="repassword"
                value={formData.repassword}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="********"
              />
              {errors.repassword && (
                <p className="text-red-500 text-xs mt-2">{errors.repassword}</p>
              )}
            </div>

            {/* OTP Input */}
            {isOtpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter OTP"
                />
                {otpError && (
                  <p className="text-red-500 text-xs mt-2">{otpError}</p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg font-semibold text-white ${
                loading ? "bg-gray-500" : "bg-blue-600"
              } hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
              disabled={loading}
            >
              {loading ? "Signing up..." : isOtpSent ? "Sign Up" : "Get OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;