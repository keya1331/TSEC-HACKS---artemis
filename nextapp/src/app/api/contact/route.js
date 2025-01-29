import Contact from '@/models/contact';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
  }

  try {
    await dbConnect();

    const contact = new Contact({ name, email, message });
    await contact.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'New Contact Form Submission',
      text: `Thanks for contacting us . Will repsonse to the query soon`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Query received' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}