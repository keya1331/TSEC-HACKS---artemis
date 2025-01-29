import Classification from '@/models/classification';
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
    const classification = await Classification.find({});
    console.log(classification);
    return new Response(JSON.stringify(classification), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response('Error fetching classification', { status: 500 });
  }
}
