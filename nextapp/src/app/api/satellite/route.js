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
        const satellite_probability = satelliteResponse.data.probability;
        
        // Fetch weather data
        const weatherResponse = await axios.get(`https://api.weather-wildfire.com?lat=${lat}&lng=${lng}`);
        const weather_status = weatherResponse.data.fire_risk;
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
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch wildfire prediction." }, { status: 500 });
    }
}
