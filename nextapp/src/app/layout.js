"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { Toaster } from "react-hot-toast";
import { LocationProvider } from "@/contexts/LocationContext";

// import { useState, useEffect } from "react";
// import Loader from "./components/common/Loader";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Artemis.",
//   description: "Created by Team Artemis.",
// };

export default function RootLayout({ children }) {
  
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false); // Simulate loading time
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) {
  //   return <Loader />;
  // }

  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LocationProvider>
          <Navbar />
          <Toaster />
          {children}
          <Footer />
        </LocationProvider>
      </body>
    </html>
  );
}
