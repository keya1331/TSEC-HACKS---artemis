import { NextResponse } from "next/server";
import Thread from "@/models/classification";
import dbConnect from "@/lib/db";

export async function POST(req) {
  await dbConnect();

  try {
    const data = await req.json(); // Get JSON data

    if (!data.latitude || !data.longitude) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 });
    }

    // Save thread in MongoDB
    const newThread = new Thread({
      name: data.name || "anonymous",
      type: data.type,
      detectionResults: data.detectionResults,
      location: { 
        latitude: parseFloat(data.latitude), 
        longitude: parseFloat(data.longitude) 
      },
      timestamp: data.timestamp
    });

    await newThread.save();

    return NextResponse.json(
      { message: "Flora and Fauna detection saved successfully", thread: newThread }, 
      { status: 201 }
    );

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
