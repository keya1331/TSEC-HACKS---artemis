import { NextResponse } from "next/server";
import User from "@/models/user";
import dbConnect from "@/lib/db";

export async function POST(request) {
  try {
    const { email, latitude, longitude } = await request.json();

    if (!email || !latitude || !longitude) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await dbConnect();

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { 
        location: {
          latitude,
          longitude
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Location updated successfully",
        timestamp: new Date(),
        coordinates: {
          latitude,
          longitude
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating location:', error);
    return NextResponse.json(
      { message: "Error updating location" },
      { status: 500 }
    );
  }
}
