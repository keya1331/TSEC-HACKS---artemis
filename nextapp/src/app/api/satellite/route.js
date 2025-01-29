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
        
        // Fetch weather data
        const weatherResponse = await axios.get(`https://api.weather-wildfire.com?lat=${lat}&lng=${lng}`);
        const weather_status = weatherResponse.data.fire_risk;

        // Compute average risk status
        const average_status = satellite_status || weather_status;

        return NextResponse.json({
            satellite_status,
            weather_status,
            average_status
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch wildfire prediction." }, { status: 500 });
    }
}
