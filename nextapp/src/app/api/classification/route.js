import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Thread from "@/models/classification";
import fs from "fs";
import path from "path";

export async function POST(req) {
  await connectDB();

  try {
    const formData = await req.formData(); // Get form data

    // Extract fields
    const name = formData.get("name") || "anonymous";
    const type = formData.get("type");
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");
    const file = formData.get("image"); // Get the file

    if (!latitude || !longitude) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 });
    }

    if (!file) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Save the file to /public/uploads directory
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    const fileBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    // Store the file path (relative to public/)
    const imageUrl = `/uploads/${file.name}`;

    // Save thread in MongoDB
    const newThread = new Thread({
      name,
      type,
      image: imageUrl,
      location: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
    });

    await newThread.save();

    return NextResponse.json({ message: "Flora and Faunna is detected successfully", thread: newThread }, { status: 201 });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
