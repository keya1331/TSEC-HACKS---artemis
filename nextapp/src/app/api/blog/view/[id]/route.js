import dbConnect from '@/lib/db';
import Blog from '@/models/blog';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;

  await dbConnect();

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
