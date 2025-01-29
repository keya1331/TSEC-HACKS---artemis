import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // Ensure you have a MongoDB connection helper
import { isValidEmail } from "@/utils/validators"; // Helper function for email validation

export async function POST(req) {
    try {
        const { email, latitude, longitude } = await req.json();

        // Validate email
        if (!isValidEmail(email)) {
            return NextResponse.json({ success: false, message: "Invalid email format." }, { status: 400 });
        }

        // Validate coordinates
        if (!latitude || !longitude) {
            return NextResponse.json({ success: false, message: "Invalid location data." }, { status: 400 });
        }

        // Connect to MongoDB (or any other database)
        const db = await connectToDatabase();
        const collection = db.collection("wildfire_alerts");

        // Store the alert subscription
        await collection.insertOne({ email, latitude, longitude, subscribedAt: new Date() });

        return NextResponse.json({ success: true, message: "Subscription successful!" });
    } catch (error) {
        console.error("Error in alert subscription:", error);
        return NextResponse.json({ success: false, message: "Server error. Please try again later." }, { status: 500 });
    }
}
