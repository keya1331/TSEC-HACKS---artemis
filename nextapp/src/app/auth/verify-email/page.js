"use client"; // Mark this as a Client Component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmail = () => {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");

    if (token && email) {
      const verifyEmail = async () => {
        try {
          const response = await fetch(
            `/api/auth/verify-email/?token=${token}&email=${email}`,
            {
              method: "GET",
            }
          );

          if (response.ok) {
            toast.success("Email verified successfully! Redirecting to login...");
            setTimeout(() => router.push("/auth/login"), 3000); // Redirect to login
          } else {
            const errorData = await response.json();
            toast.error(errorData.message || "Verification failed.");
          }
        } catch (error) {
          toast.error(
            "An error occurred during verification. Please try again."
          );
        }
      };

      verifyEmail();
    } else {
      toast.error("Invalid verification link.");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#BAD799] text-[#081707] px-4">
      <Toaster />
      <div className="bg-[#F5F5F5] rounded-lg shadow-lg p-6 max-w-md text-center border border-[#6DBE47]">
        <h1 className="text-3xl font-semibold mb-4 text-[#237414]">Email Verification</h1>
        <p className="text-lg text-[#081707]">
          Processing your request... Please wait.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
