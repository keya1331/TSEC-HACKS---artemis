import dbConnect from "@/lib/db";
import Admin from "@/models/admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { identifier, password } = await req.json();

    // Validate admin credentials
    await dbConnect();
    const admin = await Admin.findOne({ email: identifier });
    if (!admin) {
      return new Response(JSON.stringify({ message: "Admin not found.", success: false }), { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ message: "Incorrect password.", success: false }),
        { status: 401 }
      );
    }

    // Set admin as verified
    admin.isVerified = true;
    await admin.save();

    // Generate JWT
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    return new Response(JSON.stringify({ success: true, token }), { status: 200 });
  } catch (error) {
    console.error("Error logging in:", error);
    return new Response(JSON.stringify({ message: "Internal server error.", success: false }), { status: 500 });
  }
}