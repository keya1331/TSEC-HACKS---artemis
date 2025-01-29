import Thread from '@/models/Thread';
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
    const threads = await Thread.find({});
    console.log(threads);
    return new Response(JSON.stringify(threads), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response('Error fetching threads', { status: 500 });
  }
}
