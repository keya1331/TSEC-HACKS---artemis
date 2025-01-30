import nodemailer from 'nodemailer';

export async function POST(req) {
  const { email } = await req.json();
  console.log(email);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email credentials are missing');
    return new Response(JSON.stringify({ success: false, message: 'Email credentials are missing' }), { status: 500 });
  }

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
    subject: 'Alert',
    text: `A new threat has been reported. Look into matter fast`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true, otp }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ success: false, message: 'Error sending OTP' }), { status: 500 });
  }
}