import Thread from '@/models/Thread';
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
    const threads = await Thread.find({});

    // Call ML server to get priorities
    const mlResponse = await fetch('http://localhost:5000/classify_threats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(threads.map(t => t.toObject()))
    });

    if (!mlResponse.ok) {
      throw new Error('Failed to get priorities from ML server');
    }

    const threadsWithPriorities = await mlResponse.json();
    return new Response(JSON.stringify(threadsWithPriorities), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response('Error fetching threads', { status: 500 });
  }
}
