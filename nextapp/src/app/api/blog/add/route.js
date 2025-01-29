import { NextResponse } from 'next/server';
import Blog from '@/models/blog';
import User from '@/models/user';
import dbConnect from '@/lib/db';

export async function POST(req) {
  const { email, title, content } = await req.json();

  if (!email || !title || !content) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    await dbConnect();
    // console.log(email);
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const newBlog = new Blog({
      userId: user._id,
      title,
      content,
    });

    await newBlog.save();

    return NextResponse.json({ message: 'Blog created successfully', blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
