import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import User from "@/models/user";
import connectDB from "@/lib/mongodb";

export async function POST(request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { latitude, longitude } = await request.json();
    await connectDB();

    await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        location: {
          latitude,
          longitude
        }
      }
    );

    return NextResponse.json(
      { message: "Location updated successfully" },
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
