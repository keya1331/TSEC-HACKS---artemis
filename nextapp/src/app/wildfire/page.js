'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Welcome to our Fire Detection System</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Camera Detection Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
                    <Image 
<<<<<<< HEAD
                        src="/images/forest-fire-fire-smoke-conservation-51951.jpeg"
=======
                        src="https://images.pexels.com/photos/51951/forest-fire-fire-smoke-conservation-51951.jpeg"
>>>>>>> 4de7757a08193fe93d142779f85985d2ac03fddd
                        alt="Camera Detection" 
                        width={500} 
                        height={300} 
                        className="w-full h-72 object-cover"
                    />
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Camera Detection</h2>
                        <p className="text-gray-700 mb-6">
                            Detect wildfires using images uploaded from cameras. Our advanced algorithms analyze 
                            uploaded footage to identify potential fire outbreaks, enabling prompt response 
                            and mitigation measures to be taken.
                        </p>
<<<<<<< HEAD
                        <Link href="wildfire/camera" className="block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
=======
                        <Link href="/detect-camera" className="block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
>>>>>>> 4de7757a08193fe93d142779f85985d2ac03fddd
                            Go to Camera Detection
                        </Link>
                    </div>
                </div>
                
                {/* Satellite Detection Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
                    <Image 
<<<<<<< HEAD
                        src="/images/104887722-ventura_fires_nasa_image.webp"
=======
                        src="https://image.cnbcfm.com/api/v1/image/104887722-ventura_fires_nasa_image.jpg?v=1529476976&w=740&h=416&ffmt=webp&vtcrop=y"
>>>>>>> 4de7757a08193fe93d142779f85985d2ac03fddd
                        alt="Satellite Detection" 
                        width={500} 
                        height={300} 
                        className="w-full h-72 object-cover"
                    />
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Satellite Detection</h2>
                        <p className="text-gray-700 mb-6">
                            Detect wildfires using satellite imagery. Our system utilizes high-resolution satellite data 
                            combined with machine learning techniques to accurately identify and monitor fire hotspots, 
                            aiding in early detection and prevention efforts.
                        </p>
<<<<<<< HEAD
                        <Link href="wildfire/satellite" className="block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
=======
                        <Link href="/detect-satellite" className="block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
>>>>>>> 4de7757a08193fe93d142779f85985d2ac03fddd
                            Go to Satellite Detection
                        </Link>
                    </div>
                </div>
                
                {/* Wildfire Alert Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
                    <Image 
<<<<<<< HEAD
                        src="/images/HD-wallpaper-smokey-the-bear-fall-autumn-smokey-washington-fire-danger.jpg"
=======
                        src="https://w0.peakpx.com/wallpaper/1014/635/HD-wallpaper-smokey-the-bear-fall-autumn-smokey-washington-fire-danger.jpg"
>>>>>>> 4de7757a08193fe93d142779f85985d2ac03fddd
                        alt="Wildfire Alert Service" 
                        width={500} 
                        height={300} 
                        className="w-full h-72 object-cover"
                    />
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Wildfire Alert Service</h2>
                        <p className="text-gray-700 mb-6">
                            Subscribe to receive wildfire alerts. Our system monitors fire risk levels in your area 
                            and sends timely notifications to keep you informed, allowing you to take necessary 
                            precautions and stay safe.
                        </p>
<<<<<<< HEAD
                        <Link href="wildfire/alert" className="block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
=======
                        <Link href="/alert" className="block text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
>>>>>>> 4de7757a08193fe93d142779f85985d2ac03fddd
                            Subscribe to Alerts
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
