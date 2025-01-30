import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/models/blog';
import User from '@/models/user';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' }, 
        { status: 400 }
      );
    }

    await dbConnect();

    // Find both user and blog
    const [user, blog] = await Promise.all([
      User.findOne({ email }),
      Blog.findById(id).populate('userId', 'email')
    ]);

    if (!user || !blog) {
      return NextResponse.json(
        { message: !user ? 'User not found' : 'Blog not found' }, 
        { status: 404 }
      );
    }

    // Check if the logged-in user is the blog author
    if (blog.userId.email !== email) {
      return NextResponse.json(
        { message: 'Not authorized to delete this blog' }, 
        { status: 403 }
      );
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json(
      { message: 'Blog deleted successfully' }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
