// api/satellite/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
    try {
        const { location } = await req.json();
        const [lng, lat] = location;
        
        // Fetch satellite data
        const satelliteResponse = await axios.post("https://api.satellite-fire-detection.com", { lat, lng });
        const satellite_status = satelliteResponse.data.fire_detected;
<<<<<<< HEAD
        const satellite_probability = satelliteResponse.data.probability;
=======
>>>>>>> 4de7757a08193fe93d142779f85985d2ac03fddd
        
        // Fetch weather data
        const weatherResponse = await axios.get(`https://api.weather-wildfire.com?lat=${lat}&lng=${lng}`);
        const weather_status = weatherResponse.data.fire_risk;
<<<<<<< HEAD
        const weather_probability = weatherResponse.data.probability;

        // Compute average values
        const average_probability = (satellite_probability + weather_probability) / 2;
        const average_status = average_probability > 50;

        return NextResponse.json({
            satellite_status,
            satellite_probability,
            weather_status,
            weather_probability,
            average_status,
            average_probability
=======

        // Compute average risk status
        const average_status = satellite_status || weather_status;

        return NextResponse.json({
            satellite_status,
            weather_status,
            average_status
>>>>>>> 4de7757a08193fe93d142779f85985d2ac03fddd
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch wildfire prediction." }, { status: 500 });
    }
}
