import twilio from 'twilio';
import dbConnect from '@/lib/db';
import User from '@/models/user';

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const twilioPhoneNumber = "whatsapp:+14155238886"; // Replace with your Twilio phone number

const client = new twilio(accountSid, authToken);

const messageBody = "Hello guys! Valentine’s Day is coming, get ready with gifts for your girlfriend! 🎁💝";

export async function POST(req) {
  try {
    await dbConnect();

    // Fetch all users' mobile numbers
    const users = await User.find({}, 'mobileno');
    const phoneNumbers = users.map(user => `whatsapp:+91${user.mobileno}`);

    // Send messages one by one
    for (const number of phoneNumbers) {
      try {
        const message = await client.messages.create({
          body: messageBody,
          from: twilioPhoneNumber,
          to: number,
        });
        console.log(`Message sent to ${number}: ${message.sid}`);
      } catch (error) {
        console.error(`Failed to send message to ${number}:`, error);
      }
    }

    return new Response(JSON.stringify({ message: 'Broadcast sent successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error sending messages:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), { status: 500 });
  }
}