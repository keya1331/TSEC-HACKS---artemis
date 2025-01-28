import dbConnect from '@/lib/db'; // Adjust the path to your dbConnect file
import User from '@/models/user'; // Adjust the path to your User model
import bcrypt from 'bcrypt';
import { sendEmail } from '@/utils/sendEmail'; // Import your email utility

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { name, email, mobileno, password, aadharno } = body;

    // Connect to the database
    await dbConnect();

    // Validate input fields
    if (!name || !email || !mobileno || !password || !aadharno) {
      return new Response(
        JSON.stringify({ message: 'All fields are required', success: false }),
        { status: 400 }
      );
    }

    // Step 1: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User already exists with this email', success: false }),
        { status: 400 }
      );
    }

    // Step 2: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 3: Generate an OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Step 4: Create a new user (initially unverified)
    const user = await User.create({
      name,
      email,
      mobileno,
      password: hashedPassword,
      aadharno,
      isVerified: false, // Add an `isVerified` field in your User model
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000, // OTP valid for 10 minutes
    });

    // Step 5: Send the OTP email
    await sendEmail({
      to: email,
      subject: 'Email Verification OTP',
      text: `Hello ${name},\n\nYour OTP for email verification is ${otp}.`,
      html: `<p>Hello ${name},</p>
             <p>Your OTP for email verification is <strong>${otp}</strong>.</p>`,
    });

    // Step 6: Return success response
    return new Response(
      JSON.stringify({
        message: 'User created successfully. Please check your email for the OTP to verify your account.',
        userId: user._id,
        success: true
      }),
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Server error', error: error.message, success: false }),
      { status: 500 }
    );
  } 
}
