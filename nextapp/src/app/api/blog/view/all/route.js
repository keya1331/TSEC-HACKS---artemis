import { NextResponse } from 'next/server';
import Blog from '@/models/blog';
import dbConnect from '@/lib/db';
import User from '@/models/user';

export async function GET() {
  try {
    await dbConnect();

    const blogs = await Blog.find({});
    const blogsWithUserObjects = await Promise.all(
      blogs.map(async (blog) => {
        const user = await User.findById(blog.userId).select('name');
        return { ...blog.toObject(), userName: user ? user.name : 'Unknown' };
      })
    );

    return NextResponse.json({ blogs: blogsWithUserObjects }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}