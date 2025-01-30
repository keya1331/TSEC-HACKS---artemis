import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/user';

export async function POST(request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    await dbConnect();
    const user = await User.findOne({ email }).select('name');

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ name: user.name }, { status: 200 });

  } catch (error) {
    console.error('Error getting user name:', error);
    return NextResponse.json(
      { message: 'Error retrieving user name' },
      { status: 500 }
    );
  }
}
