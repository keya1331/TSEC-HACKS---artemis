import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Ranger from '@/models/ranger';
import { sendEmail } from '@/utils/sendEmail';

export async function POST(req) {
  await dbConnect();

  try {
    const { email } = await req.json();

    // Find the ranger by email
    const ranger = await Ranger.findOneAndUpdate(
        { email },
        { $set: { isBusy: true } },
        { new: true, runValidators: true, strict: false }
      );      

    if (!ranger) {
      return NextResponse.json({ success: false, error: 'Ranger not found' }, { status: 404 });
    }

    // Send an email to the ranger
    await sendEmail({
      to: ranger.email,
      subject: 'You have been assigned a new task',
      text: 'You have been assigned a new task. Please check your dashboard for more details.',
    });

    return NextResponse.json({ success: true, data: ranger });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}