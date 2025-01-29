import connectDB from "@/lib/db";
import Thread from "@/models/Thread";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { search = "", page = 1, limit = 10 } = req.nextUrl.searchParams;

  try {
    await connectDB();

    // Define skip and limit for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const threads = await Thread.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
      ],
    })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 }); // Sorting by most recent

    const totalThreads = await Thread.countDocuments({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
      ],
    });

    return NextResponse.json({
      threads,
      totalPages: Math.ceil(totalThreads / parseInt(limit)),
      totalThreads,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
