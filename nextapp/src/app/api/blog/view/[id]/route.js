import dbConnect from '@/lib/db';
import Blog from '@/models/blog';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await dbConnect();

    const blog = await Blog.findById(id)
      .populate('userId', 'email name') // Add name to populated fields
      .lean();

    if (!blog) {
      return NextResponse.json(
        { message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...blog,
      userEmail: blog.userId.email,
      authorName: blog.userId.name // Include author name in response
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { message: 'Error fetching blog' },
      { status: 500 }
    );
  }
}
