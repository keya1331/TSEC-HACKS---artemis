import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Blog from '@/models/blog';
import User from '@/models/user';

export async function POST(request, { params }) {
  const { id } = params;
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const blog = await Blog.findById(id);

  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  if (blog.userId.toString() !== user._id.toString()) {
    return NextResponse.json({ error: 'Not authorized to delete this blog' }, { status: 403 });
  }

  await Blog.findByIdAndDelete(id);

  return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
}
