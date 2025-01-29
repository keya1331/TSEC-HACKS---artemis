"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start submission process
    setIsSubmitting(true);
    toast.loading("Sending reset link...", { id: "forgot-password" });

    try {
      const res = await axios.post(
        "/api/auth/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.data?.success) {
        setEmail("");
        toast.success("Password reset email sent. Check your inbox.", {
          id: "forgot-password",
        });
      } else {
        toast.error(res?.data?.message || "Something went wrong.", {
          id: "forgot-password",
        });
      }
    } catch (err) {
      toast.error("Failed to send reset email.", { id: "forgot-password" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#BAD799] px-4">
      <div className="w-full max-w-md p-8 bg-[#F5F5F5] shadow-lg rounded-2xl border border-[#6DBE47]">
        <h2 className="text-3xl font-extrabold text-[#081707] mb-4 text-center">
          Forgot Password
        </h2>
        <p className="text-sm text-[#237414] mb-6 text-center">
          Enter your email, and we’ll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#081707]"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-[#6DBE47] rounded-lg shadow-sm focus:ring-2 focus:ring-[#8AAC8B] text-[#081707] placeholder-[#BAD799]"
              placeholder="you@example.com"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 font-semibold rounded-lg shadow-md transition-colors duration-300 ${
              isSubmitting
                ? "bg-[#BAD799] cursor-not-allowed text-[#8AAC8B]"
                : "bg-[#6DBE47] text-white hover:bg-[#237414] focus:ring-2 focus:ring-[#8AAC8B] focus:ring-opacity-50"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
