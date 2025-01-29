'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#BAD799] to-[#8FCB81] flex flex-col justify-center items-center py-12">
            <h1 className="text-5xl font-extrabold text-center text-[#081707] mb-12">
                Welcome to our Wildfire Detection System
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-11/12">
                {/* Camera Detection Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl fade-in">
                    <div className="relative w-full h-72 border-4 border-[#081707] rounded-t-xl">
                        <Image
                            src="/images/forest-fire-fire-smoke-conservation-51951.jpeg"
                            alt="Camera Detection"
                            layout="fill"
                            className="object-cover rounded-t-lg"
                        />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="text-3xl">📷</span>
                            <h2 className="text-2xl font-bold text-[#237414]">Camera Detection</h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Detect wildfires using images uploaded from cameras. Our advanced algorithms analyze 
                            uploaded footage to identify potential fire outbreaks, enabling prompt response 
                            and mitigation measures to be taken.
                        </p>
                        <Link
                            href="wildfire/camera"
                            className="block text-center bg-gradient-to-r from-[#6DBE47] to-[#8FCB81] text-white font-semibold px-4 py-3 rounded-md hover:from-[#5AA83C] hover:to-[#76BF58] transition duration-300"
                        >
                            Go to Camera Detection
                        </Link>
                    </div>
                </div>

                {/* Satellite Detection Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl fade-in">
                    <div className="relative w-full h-72 border-4 border-[#081707] rounded-t-xl">
                        <Image
                            src="/images/104887722-ventura_fires_nasa_image.webp"
                            alt="Satellite Detection"
                            layout="fill"
                            className="object-cover rounded-t-lg"
                        />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="text-3xl">🛰️</span>
                            <h2 className="text-2xl font-bold text-[#237414]">Satellite Detection</h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Detect wildfires using satellite imagery. Our system utilizes high-resolution satellite data 
                            combined with machine learning techniques to accurately identify and monitor fire hotspots, 
                            aiding in early detection and prevention efforts.
                        </p>
                        <Link
                            href="wildfire/satellite"
                            className="block text-center bg-gradient-to-r from-[#6DBE47] to-[#8FCB81] text-white font-semibold px-4 py-3 rounded-md hover:from-[#5AA83C] hover:to-[#76BF58] transition duration-300"
                        >
                            Go to Satellite Detection
                        </Link>
                    </div>
                </div>

                {/* Wildfire Alert Card */}
                {/* <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl fade-in">
                    <div className="relative w-full h-72 border-4 border-[#081707] rounded-t-xl">
                        <Image
                            src="/images/HD-wallpaper-smokey-the-bear-fall-autumn-smokey-washington-fire-danger.jpg"
                            alt="Wildfire Alert Service"
                            layout="fill"
                            className="object-cover rounded-t-lg"
                        />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <span className="text-3xl">🔥</span>
                            <h2 className="text-2xl font-bold text-[#237414]">Wildfire Alert Service</h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Subscribe to receive wildfire alerts. Our system monitors fire risk levels in your area 
                            and sends timely notifications to keep you informed, allowing you to take necessary 
                            precautions and stay safe.
                        </p>
                        <Link
                            href="wildfire/alert"
                            className="block text-center bg-gradient-to-r from-[#6DBE47] to-[#8FCB81] text-white font-semibold px-4 py-3 rounded-md hover:from-[#5AA83C] hover:to-[#76BF58] transition duration-300"
                        >
                            Subscribe to Alerts
                        </Link>
                    </div>
                </div> */}
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .fade-in {
                    animation: fadeIn 0.6s ease-out;
                }
            `}</style>
        </div>
    );
}
